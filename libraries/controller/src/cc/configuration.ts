import {
	ConfigurationV1,
	ConfigurationV2,
	ConfigurationV4,
} from "@ezwave/commands";
import { FormatEnum } from "@ezwave/commands/lib/generated/ConfigurationV4";
import {
	namedSessionRunner,
	SessionRunner,
	waitForAll,
	waitForFiltered,
} from "..";

export interface InterviewConfigurationRequest {
	supportedVersion: number;
}

export interface ConfigurationInfo {
	parameters: Map<number, ParameterInfo>;
}

export interface ParameterFormatInfo {
	/**
	 * Size (in bytes) of parameter as stored in device.
	 */
	size: number;

	/**
	 * Format of configuration parameter.
	 *
	 * Note: V1/V2 parameters will always be `SignedInteger`.
	 */
	format: FormatEnum;
}

export interface ParameterInfo extends ParameterFormatInfo {
	/**
	 * Current value of parameter.
	 */
	value: number;

	/**
	 * Name of parameter (if supported by device).
	 */
	name?: string;

	/**
	 * More detailed description about parameter (if supported by device).
	 */
	description?: string;

	/**
	 * Additional parameter properties (if supported by device).
	 */
	properties?: ParameterProperties;
}

export interface ParameterProperties {
	alteringCapabilities: boolean;
	readonly: boolean;
	minValue: number;
	maxValue: number;
	defaultValue: number;
	noBulkSupport: boolean;
	advanced: boolean;
}

export function buildInterviewConfiguration(
	request: InterviewConfigurationRequest
): SessionRunner<ConfigurationInfo> {
	return namedSessionRunner(
		"InterviewConfiguration",
		request,
		async (session) => {
			if (!(request.supportedVersion >= 1)) {
				throw new Error(
					"Cannot interview configuration: invalid supported version"
				);
			}
			if (request.supportedVersion <= 2) {
				// V1/V2 devices don't support interviewing capabilities.
				// There's also no way to scan for available parameters, as devices
				// will just respond with e.g. a 1-byte 0 value for non-existent params.
				// Do return an empty map, such that params can later be cached if/when
				// they're manually added.
				return {
					parameters: new Map(),
				};
			}

			const parameters = new Map<number, ParameterInfo>();
			let parameterNumber = 0;
			do {
				const paramResult = await session.execute(
					buildInterviewConfigurationParameter({
						parameterNumber,
						supportedVersion: request.supportedVersion,
					})
				);

				if (paramResult.info) {
					parameters.set(parameterNumber, paramResult.info);
				}
				paramResult.nextParameterNumber ??= 0;

				if (paramResult.nextParameterNumber === 0) {
					// done
					break;
				} else if (paramResult.nextParameterNumber <= parameterNumber) {
					throw new Error(
						`invalid nextParameterNumber: ${paramResult.nextParameterNumber} must be larger than current ${parameterNumber}`
					);
				} else {
					parameterNumber = paramResult.nextParameterNumber;
				}
			} while (parameterNumber > 0);

			return {
				parameters,
			};
		}
	);
}

export interface InterviewConfigurationParameterRequest {
	/**
	 * Parameter number to interview.
	 *
	 * Parameter index usually starts at 1.
	 */
	parameterNumber: number;

	/**
	 * Supported version of Configuration command class.
	 *
	 * This is used to look up detailed parameter info if possible when
	 * `info` is not given.
	 * Note that version 1 and 2 don't have capabilities to determine
	 * parameter info, so only basic size and existing value can be
	 * determined, and format is always SignedInteger.
	 * If not given, version 1 is assumed.
	 */
	supportedVersion?: number;
}

export interface ParameterInfoResult {
	/**
	 * Information about parameter, if it was determined to exist.
	 *
	 * Note that V1/V2 Configuration commandclasses have no reliable way
	 * to determine parameter existence.
	 */
	info?: ParameterInfo;

	/**
	 * Index of next valid parameter.
	 *
	 * For V1/V2 commandclasses, this will be index of the first available
	 * parameter number, if the requested parameter does not exist (i.e.
	 * `info` will be undefined).
	 * For V3 and higher, this will be index (16-bit) of the next available
	 * parameter number (also when `info` exists). It will be 0 when this
	 * was the last parameter.
	 */
	nextParameterNumber?: number;
}

export function buildInterviewConfigurationParameter(
	request: InterviewConfigurationParameterRequest
): SessionRunner<ParameterInfoResult> {
	return namedSessionRunner(
		"InterviewConfigurationParameter",
		request,
		async (session): Promise<ParameterInfoResult> => {
			const supportedVersion = request.supportedVersion ?? 1;
			if (!(supportedVersion >= 1)) {
				throw new Error(
					"Cannot interview configuration: invalid supported version"
				);
			}

			if (supportedVersion <= 2 && request.parameterNumber <= 0xff) {
				await session.send(
					new ConfigurationV1.ConfigurationGet({
						parameterNumber: request.parameterNumber,
					})
				);
				// Note: ConfigurationGet V1 specifies: A node receiving this command for an unsupported
				// parameter SHOULD return a Report advertising the value of the first available
				// parameter in the node.
				const param = await waitForFiltered(
					session,
					ConfigurationV1.ConfigurationReport,
					(report) =>
						report.parameterNumber <= request.parameterNumber
				);
				if (param.parameterNumber !== request.parameterNumber) {
					// Parameter does not exist
					return {
						info: undefined,
						nextParameterNumber: param.parameterNumber,
					};
				}
				return {
					info: {
						value: decodeValue(param.configurationValue),
						size: param.configurationValue.length,
						format: FormatEnum.SignedInteger,
					},
				};
			}

			if (supportedVersion === 1) {
				throw new Error(
					`invalid parameter number for V1 Configuration commandclass, index ${request.parameterNumber} out of range`
				);
			}

			if (request.supportedVersion === 2) {
				// Version 2, and parameterNumber > 0xff, use BulkGet
				await session.send(
					new ConfigurationV2.ConfigurationBulkGet({
						parameterOffset: request.parameterNumber,
						numberOfParameters: 1,
					})
				);
				const report = await waitForFiltered(
					session,
					ConfigurationV2.ConfigurationBulkReport,
					(report) =>
						report.parameterOffset === request.parameterNumber
				);
				if (report.vg.length < 1) {
					throw new Error(`invalid ConfigurationBulkReport received`);
				}
				// Note: non-existing params will apparently be reported having some size and value of 0,
				// so there's no reliable way to detect their presence.
				const param = report.vg[0];
				return {
					info: {
						value: decodeValue(param.parameter),
						size: param.parameter.length,
						format: FormatEnum.SignedInteger,
					},
				};
			}

			// Configuration V3 and higher below
			await session.send(
				new ConfigurationV4.ConfigurationPropertiesGet({
					parameterNumber: request.parameterNumber,
				})
			);

			// Can't use waitForFiltered, because need to look at raw packet for backwards compatibility case...
			const properties = (
				await session.waitFor((packet) => {
					const parsed = packet.tryAs(
						ConfigurationV4.ConfigurationPropertiesReport
					);
					if (!parsed) {
						return undefined;
					}
					if (
						supportedVersion === 3 &&
						parsed.data.parameterNumber === 0 &&
						parsed.data.nextParameterNumber === 0
					) {
						// Z-Wave Specification AWG V1.0.pdf - 2.2.32.1.2 Configuration Properties Report
						// Controlling nodes SHOULD be aware that some legacy nodes supporting version 3 could by error
						// include the “Min Value”, “Max Value” and “Default Value” fields and set them to 0x00 with an
						// arbitrary size. If a controlling node receives a Report in which the “Next Parameter Number” field
						// seems to be set to 0x0000 when requesting parameter number 0, the controlling node SHOULD inspect
						// the last 2 bytes of the command frame in order to find out what is the Next Parameter Number.
						parsed.data.nextParameterNumber =
							packet.commandAndPayload.slice(-2).readUInt16BE(0);
					}
					return parsed;
				})
			).data;

			const paramSize = properties.minValue.length;
			const paramExists = paramSize > 0;
			if (!paramExists) {
				return {
					info: undefined,
					nextParameterNumber: properties.nextParameterNumber,
				};
			}

			await session.send(
				new ConfigurationV4.ConfigurationGet({
					parameterNumber: request.parameterNumber,
				})
			);
			const paramValue = await waitForFiltered(
				session,
				ConfigurationV4.ConfigurationReport,
				(data) => data.parameterNumber === request.parameterNumber
			);

			await session.send(
				new ConfigurationV4.ConfigurationNameGet({
					parameterNumber: request.parameterNumber,
				})
			);
			const paramName = await waitForAll(
				session,
				ConfigurationV4.ConfigurationNameReport,
				(data) => data.parameterNumber === request.parameterNumber,
				(data) => data.reportsToFollow
			);

			await session.send(
				new ConfigurationV4.ConfigurationInfoGet({
					parameterNumber: request.parameterNumber,
				})
			);
			const paramInfoReport = await waitForAll(
				session,
				ConfigurationV4.ConfigurationInfoReport,
				(data) => data.parameterNumber === request.parameterNumber,
				(data) => data.reportsToFollow
			);

			const paramInfo: ParameterInfo = {
				value: decodeValue(
					paramValue.configurationValue,
					properties.format
				),
				size: paramValue.configurationValue.length,
				format: properties.format,
				name: Buffer.concat(
					paramName.map((name) => name.name)
				).toString("utf8"),
				description: Buffer.concat(
					paramInfoReport.map((info) => info.info)
				).toString("utf8"),
				properties: {
					alteringCapabilities: properties.alteringCapabilities,
					readonly: properties.readonly,
					minValue: decodeValue(
						properties.minValue,
						properties.format
					),
					maxValue: decodeValue(
						properties.maxValue,
						properties.format
					),
					defaultValue: decodeValue(
						properties.defaultValue,
						properties.format
					),
					noBulkSupport: properties.noBulkSupport,
					advanced: properties.advanced,
				},
			};
			return {
				info: paramInfo,
				nextParameterNumber: properties.nextParameterNumber,
			};
		}
	);
}

function decodeValue(
	buffer: Buffer,
	format: FormatEnum = FormatEnum.SignedInteger
): number {
	switch (buffer.length) {
		case 1:
			switch (format) {
				case FormatEnum.SignedInteger:
					return buffer.readInt8();
				case FormatEnum.BitField:
				case FormatEnum.UnsignedInteger:
				case FormatEnum.Enumerated:
					return buffer.readUInt8();
			}
			break;
		case 2:
			switch (format) {
				case FormatEnum.SignedInteger:
					return buffer.readInt16BE();
				case FormatEnum.BitField:
				case FormatEnum.UnsignedInteger:
				case FormatEnum.Enumerated:
					return buffer.readUInt16BE();
			}
			break;
		case 4:
			switch (format) {
				case FormatEnum.SignedInteger:
					return buffer.readInt16BE();
				case FormatEnum.BitField:
				case FormatEnum.UnsignedInteger:
				case FormatEnum.Enumerated:
					return buffer.readUInt16BE();
			}
	}
	throw new Error(
		`unsupported buffer size (${buffer.length}) or format (${format})`
	);
}

function encodeValue(
	value: number,
	size: number,
	format: FormatEnum = FormatEnum.SignedInteger
): Buffer {
	const buffer = Buffer.alloc(size);
	let written = 0;
	switch (size) {
		case 1:
			switch (format) {
				case FormatEnum.SignedInteger:
					written = buffer.writeInt8(value);
					break;
				case FormatEnum.BitField:
				case FormatEnum.UnsignedInteger:
				case FormatEnum.Enumerated:
					written = buffer.writeUInt8(value);
					break;
			}
			break;
		case 2:
			switch (format) {
				case FormatEnum.SignedInteger:
					written = buffer.writeInt16BE(value);
					break;
				case FormatEnum.BitField:
				case FormatEnum.UnsignedInteger:
				case FormatEnum.Enumerated:
					written = buffer.writeUInt16BE(value);
					break;
			}
			break;
		case 4:
			switch (format) {
				case FormatEnum.SignedInteger:
					written = buffer.writeInt16BE(value);
					break;
				case FormatEnum.BitField:
				case FormatEnum.UnsignedInteger:
				case FormatEnum.Enumerated:
					written = buffer.writeUInt16BE(value);
					break;
			}
	}
	if (written !== size) {
		throw new Error(
			`unsupported buffer size (${buffer.length}) or format (${format})`
		);
	}
	return buffer;
}

export interface SetConfigurationParameterBaseRequest {
	/**
	 * Parameter number to update.
	 *
	 * Parameter index usually starts at 1.
	 */
	parameterNumber: number;

	/**
	 * Parameter configuration info.
	 *
	 * Used to encode value into correct format and size.
	 */
	info: ParameterFormatInfo;
}

export interface SetConfigurationParameterValueRequest
	extends SetConfigurationParameterBaseRequest {
	/**
	 * New value to write.
	 *
	 * Value is written in the format/size specified
	 */
	newValue: number;
}

export interface SetConfigurationParameterDefaultRequest
	extends SetConfigurationParameterBaseRequest {
	/**
	 * Change the parameter back to default value.
	 */
	default: true;
}

export type SetConfigurationParameterRequest =
	| SetConfigurationParameterValueRequest
	| SetConfigurationParameterDefaultRequest;

/**
 * Change given parameter.
 */
export function buildSetConfigurationParameter(
	request: SetConfigurationParameterRequest
): SessionRunner<void> {
	return namedSessionRunner(
		"SetConfigurationParameter",
		request,
		async (session) => {
			const isResetToDefaultRequest = "default" in request;
			const value = encodeValue(
				isResetToDefaultRequest ? 0 : request.newValue,
				request.info.size,
				request.info.format
			);
			if (request.parameterNumber <= 0xff) {
				await session.send(
					new ConfigurationV4.ConfigurationSet({
						parameterNumber: request.parameterNumber,
						configurationValue: value,
						default: isResetToDefaultRequest,
					})
				);
			} else {
				await session.send(
					new ConfigurationV4.ConfigurationBulkSet({
						parameterOffset: request.parameterNumber,
						default: false,
						handshake: false,
						vg: [{ parameter: value }],
					})
				);
			}
		}
	);
}

export interface GetConfigurationParameterRequest {
	/**
	 * Parameter number to update.
	 *
	 * Parameter index usually starts at 1.
	 */
	parameterNumber: number;

	/**
	 * Parameter configuration info.
	 *
	 * Used to decode value from correct format and size.
	 */
	info: ParameterFormatInfo;
}

/**
 * Get current value of given parameter.
 */
export function buildGetConfigurationParameter(
	request: GetConfigurationParameterRequest
): SessionRunner<number> {
	return namedSessionRunner(
		"GetConfigurationParameter",
		request,
		async (session) => {
			if (request.parameterNumber <= 0xff) {
				await session.send(
					new ConfigurationV4.ConfigurationGet({
						parameterNumber: request.parameterNumber,
					})
				);
				const result = await waitForFiltered(
					session,
					ConfigurationV4.ConfigurationReport,
					(report) =>
						report.parameterNumber === request.parameterNumber
				);
				return decodeValue(
					result.configurationValue,
					request.info.format
				);
			} else {
				await session.send(
					new ConfigurationV4.ConfigurationBulkGet({
						parameterOffset: request.parameterNumber,
						numberOfParameters: 1,
					})
				);
				const result = await waitForFiltered(
					session,
					ConfigurationV4.ConfigurationBulkReport,
					(report) =>
						report.parameterOffset === request.parameterNumber &&
						report.vg.length > 0
				);
				return decodeValue(result.vg[0].parameter, request.info.format);
			}
		}
	);
}
