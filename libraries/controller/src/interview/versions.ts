import {
	CommandClasses,
	CommandClassInfo,
	parseCommandClassInfo,
} from "@ezwave/codec";
import { SecurityV1, VersionV2 } from "@ezwave/commands";
import { SecurityV1SecurityCommandsSupportedReportData } from "@ezwave/commands/lib/generated/SecurityV1";
import { VersionV2VersionCommandClassReportData } from "@ezwave/commands/lib/generated/VersionV2";
import { NodeInfoResponse, ZwLibraryType } from "@ezwave/serialapi";
import debug from "debug";
import { namedSessionRunner } from "..";
import { SendOptions, Session, SessionRunner, waitForAll } from "../session";

export interface FirmwareVersion {
	version: number; // 1 byte unsigned integer
	subVersion: number; // 1 byte unsigned integer
}

export interface VersionInfo {
	zWaveLibraryType: ZwLibraryType; // 1 byte unsigned integer
	zWaveProtocolVersion: number; // 1 byte unsigned integer
	zWaveProtocolSubVersion: number; // 1 byte unsigned integer
	hardwareVersion?: number; // 1 byte unsigned integer

	/**
	 * There will always be at least one firmware version (firmware 0),
	 * which will contain the version of the firmware of the app that
	 * contains the Z-Wave protocol stack.
	 *
	 * @see SDS13782 Z-Wave Management Command Class Specification, section 4.41.1
	 */
	firmwareVersions: Array<FirmwareVersion>;
}

export interface InterviewedVersions {
	versionInfo: VersionInfo | undefined;

	supportedNonSecure: Set<CommandClasses>;
	controlledNonSecure: Set<CommandClasses>;
	supportedSecureS0: Set<CommandClasses>;
	controlledSecureS0: Set<CommandClasses>;
	supportedVersions: Map<CommandClasses, number>;
	controlledVersions: Map<CommandClasses, number>;
	isSecureS0: boolean;
}

/**
 * Basic interview of protocol info, security status and supported
 * command classes.
 */
export function buildInterviewVersions(
	nif: NodeInfoResponse
): SessionRunner<InterviewedVersions> {
	return namedSessionRunner(
		"InterviewVersions",
		nif,
		async (session: Session): Promise<InterviewedVersions> => {
			const log: debug.Debugger = debug(
				`zwave:interview:versions:${nif.nodeId}`
			);

			// Obtain list of supported/controller classes from NIF
			const supportedNonSecure: Set<CommandClasses> = new Set(
				nif.commandClasses.supported
			);
			const controlledNonSecure: Set<CommandClasses> = new Set(
				nif.commandClasses.controlled
			);

			//start checking S0 supported stuff, then multi-channel supported stuff
			// Check Security S0 state of node.
			// According to SDS13783-Z-Wave-Transport-Encapsulation-Command-Class-Specification, section 3.5.1.1:
			// - "A supporting node MUST advertise the Security 0 Command Class in its NIF after successful S0
			//   security bootstrapping."
			// - "A supporting node MAY advertise the Security 0 Command Class in its NIF after inclusion
			//   without Security bootstrapping"
			// So:
			// - if it's not advertised, it's not secure.
			// - if it IS advertised, it may be secure, and we need to check (by sending SECURITY_COMMANDS_SUPPORTED_GET)

			// TODO Use external knowledge about security status if already known,
			// and cache it separately as it's expensive (due to timeout waiting)
			// if device isn't secure
			let isSecureS0 = supportedNonSecure.has(CommandClasses.Security);
			const supportedSecureS0 = new Set<CommandClasses>();
			const controlledSecureS0 = new Set<CommandClasses>();
			if (isSecureS0) {
				try {
					const classes = await session.execute(
						getSecurityCommandsSupported
					);
					classes.supported.forEach((cc) =>
						supportedSecureS0.add(cc)
					);
					classes.controlled.forEach((cc) =>
						controlledSecureS0.add(cc)
					);
					log(
						"secure supported names",
						[...supportedSecureS0.values()].map(
							(cc) => CommandClasses[cc]
						)
					);
					log(
						"secure controlled names",
						[...controlledSecureS0.values()].map(
							(cc) => CommandClasses[cc]
						)
					);
				} catch (err) {
					// Don't throw as an error, as this is a 'normal' situation
					// TODO Perhaps add a retry in case it fails?
					log(
						"warn can't fetch SecurityCommandsSupportedReport, assuming S0 inclusion failed:",
						err
					);
					isSecureS0 = false;
				}
			}
			log("isSecureS0", isSecureS0);
			const secureOptions: SendOptions = {
				secure: isSecureS0,
			};

			// Exclude S0/S2 from supportedSecure,
			// See e.g. SDS13783-Z-Wave-Transport-Encapsulation-Command-Class-Specification, CC:009F.01.00.21.00C
			supportedSecureS0.delete(CommandClasses.Security);
			supportedSecureS0.delete(CommandClasses.Security2);

			// According to CC:0086.01.00.41.002, the device should not even report Version CC when asked
			// on non-secure level, so make sure to check against secure command classes.
			const versionCCSupported =
				supportedSecureS0.has(CommandClasses.Version) ||
				supportedNonSecure.has(CommandClasses.Version);

			let versionInfo: VersionInfo | undefined;
			if (versionCCSupported) {
				let versionCCversion: number;
				if (!versionCCSupported) {
					versionCCversion = 1;
				} else {
					await session.send(
						new VersionV2.VersionCommandClassGet({
							requestedCommandClass: CommandClasses.Version,
						}),
						secureOptions
					);
					const report = await session.waitFor(
						VersionV2.VersionCommandClassReport
					);
					versionCCversion = report.commandClassVersion;
				}
				log("versionCCversion", versionCCversion);

				await session.send(new VersionV2.VersionGet(), secureOptions);
				const rawVersion = await session.waitFor(
					VersionV2.VersionReport
				);
				const firmwareVersions: FirmwareVersion[] = [
					{
						version: rawVersion.firmware0Version,
						subVersion: rawVersion.firmware0SubVersion,
					},
					...rawVersion.vg.map(
						(v): FirmwareVersion => ({
							version: v.firmwareVersion,
							subVersion: v.firmwareSubVersion,
						})
					),
				];
				versionInfo = {
					zWaveLibraryType: rawVersion.zWaveLibraryType,
					zWaveProtocolVersion: rawVersion.zWaveProtocolVersion,
					zWaveProtocolSubVersion: rawVersion.zWaveProtocolSubVersion,
					hardwareVersion:
						versionCCversion >= 2
							? rawVersion.hardwareVersion
							: undefined,
					firmwareVersions,
				};
				log("versionInfo", versionInfo);
			}

			const supportedVersions: Map<CommandClasses, number> = new Map();
			const controlledVersions: Map<CommandClasses, number> = new Map();

			// Add known-supported versions, even if not advertised in NIF
			// Note: these will return version 0 (not supported) when asked through Version CC.
			supportedVersions.set(CommandClasses.NoOperation, 1);

			if (versionCCSupported) {
				// Ask Version command class on root for supported command class version
				// of root and multi-channel endpoints.
				// See CC:0086.01.00.21.001 / CC:0086.01.00.22.001 in SDS13782 Z-Wave Management Command Class Specification
				// CC:0086.01.00.21.002

				// We have to fetch supported versions on highest security level, otherwise
				// the device MUST not advertise/support the Version CC (CC:0086.01.00.41.002).

				// Version CC v2 adds additional stuff to request firmware versions, and the hardware version
				// Version CC v3 adds requesting detailed version numbers of the Z-Wave stack.

				// Only versions from the command classes shown in the NIF, in the Security Command Supported Report
				// or in the Multi Channel Capability Report can be requested. It will return 0x00 if the CC is not supported/controlled.
				const fetchVersion = async (
					cc: CommandClasses
				): Promise<number> => {
					await session.send(
						new VersionV2.VersionCommandClassGet({
							requestedCommandClass: cc,
						}),
						secureOptions
					);
					let report: VersionV2VersionCommandClassReportData;
					do {
						// Note: other nodes *might* also be asking for version info at same
						// time, so we have to be careful to wait for the expected response,
						// not just 'any' response.
						report = await session.waitFor(
							VersionV2.VersionCommandClassReport
						);
					} while (report.requestedCommandClass !== cc);
					return report.commandClassVersion;
				};

				// TODO Merge supported+controlled versions into one
				for (const cc of supportedNonSecure) {
					supportedVersions.set(cc, await fetchVersion(cc));
				}
				for (const cc of controlledNonSecure) {
					controlledVersions.set(cc, await fetchVersion(cc));
				}
			} else {
				// If Version CC is not supported, any supported classes may be assumed to be version 1.
				// Section 4.40.1 in SDS13782 Z-Wave Management Command Class Specification
				for (const cc of supportedNonSecure) {
					supportedVersions.set(cc, 1);
				}
				for (const cc of controlledNonSecure) {
					controlledVersions.set(cc, 1);
				}
			}

			// TODO Retry on (limited amount of) failures?
			const result: InterviewedVersions = {
				versionInfo,
				supportedNonSecure,
				controlledNonSecure,
				supportedSecureS0,
				controlledSecureS0,
				supportedVersions,
				controlledVersions,
				isSecureS0,
			};
			log("complete", result);
			return result;
		}
	);
}

// TODO Move this somewhere else for re-use, preferably close to the commandclass
export async function getSecurityCommandsSupported(
	session: Session
): Promise<CommandClassInfo> {
	// TODO Make this smarter, e.g. based on device RTT.
	// For now, it needs to be (much) smaller than the WakeUp timeout
	// to prevent a device going back to sleep before we complete
	// our interview...
	const timeout = 5000;

	await session.send(new SecurityV1.SecurityCommandsSupportedGet(), {
		secure: true,
		timeout,
	});

	const reports: SecurityV1SecurityCommandsSupportedReportData[] =
		await waitForAll(
			session,
			SecurityV1.SecurityCommandsSupportedReport,
			() => true,
			(report) => report.reportsToFollow,
			{
				timeout,
			}
		);
	const rawClasses = Buffer.concat(
		reports.map((report) => report.commandClasses)
	);
	return parseCommandClassInfo(rawClasses);
}
