/**
 * Command Class Door Lock, version 2.
 *
 * Auto-generated, do not edit.
 */

import { CommandClassPacket, CommandPacket } from "../commands/command";
import * as jsonSpec from "../commands/jsonSpec";
import { Packet } from "../commands/packet";
import { convertFromJsonCommand } from "../commands/specHelpers";
import CommandClasses from "../generated/CommandClasses";

export enum DoorLockV2Commands {
	DoorLockConfigurationGet = 0x05,
	DoorLockConfigurationReport = 0x06,
	DoorLockConfigurationSet = 0x04,
	DoorLockOperationGet = 0x02,
	DoorLockOperationReport = 0x03,
	DoorLockOperationSet = 0x01,
}

export interface DoorLockV2DoorLockConfigurationReportData {
	operationType: OperationTypeEnum; // 1 byte enum value
	outsideDoorHandlesState: number; // properties1[7..4]
	insideDoorHandlesState: number; // properties1[3..0]
	lockTimeoutMinutes: number; // 1 byte unsigned integer
	lockTimeoutSeconds: number; // 1 byte unsigned integer
}

export interface DoorLockV2DoorLockConfigurationSetData {
	operationType: OperationTypeEnum; // 1 byte enum value
	outsideDoorHandlesState: number; // properties1[7..4]
	insideDoorHandlesState: number; // properties1[3..0]
	lockTimeoutMinutes: number; // 1 byte unsigned integer
	lockTimeoutSeconds: number; // 1 byte unsigned integer
}

export interface DoorLockV2DoorLockOperationReportData {
	doorLockMode: DoorLockModeEnum; // 1 byte enum value
	outsideDoorHandlesMode: number; // properties1[7..4]
	insideDoorHandlesMode: number; // properties1[3..0]
	doorCondition: number; // 1 byte unsigned integer
	lockTimeoutMinutes: number; // 1 byte unsigned integer
	lockTimeoutSeconds: number; // 1 byte unsigned integer
}

export interface DoorLockV2DoorLockOperationSetData {
	doorLockMode: DoorLockModeEnum; // 1 byte enum value
}

export enum OperationTypeEnum {
	ConstantOperation = 0x1,
	TimedOperation = 0x2,
}

export enum DoorLockModeEnum {
	DoorUnsecured = 0x0,
	DoorUnsecuredWithTimeout = 0x1,
	DoorUnsecuredForInsideDoorHandles = 0x10,
	DoorUnsecuredForInsideDoorHandlesWithTimeout = 0x11,
	DoorUnsecuredForOutsideDoorHandles = 0x20,
	DoorUnsecuredForOutsideDoorHandlesWithTimeout = 0x21,
	DoorLockStateUnknown = 0xfe,
	DoorSecured = 0xff,
}

export class DoorLockV2 extends CommandClassPacket<DoorLockV2Commands> {
	public static readonly commandClass = CommandClasses.DoorLock; // 0x62 (98)

	public static matches(packet: Packet): boolean {
		return packet.commandClass === this.commandClass;
	}

	constructor(commandAndPayload: Buffer) {
		super(DoorLockV2, commandAndPayload);
	}

	public static readonly DoorLockConfigurationGet = class DoorLockConfigurationGet extends CommandPacket<void> {
		public static readonly CommandClass = DoorLockV2;
		public static readonly command = 0x05;
		public static readonly definition = convertFromJsonCommand({
			"command": 5,
			"name": "DoorLockConfigurationGet",
			"help": "Door Lock Configuration Get",
			"status": "active",
			"params": []
		} as jsonSpec.CommandDefinition);

		static matches(packet: Packet): boolean {
			return packet.tryAs(DoorLockV2)?.command === this.command;
		}

		constructor(data: Buffer | void) {
			super(DoorLockConfigurationGet, data);
		}
	};

	public static readonly DoorLockConfigurationReport = class DoorLockConfigurationReport extends CommandPacket<DoorLockV2DoorLockConfigurationReportData> {
		public static readonly CommandClass = DoorLockV2;
		public static readonly command = 0x06;
		public static readonly definition = convertFromJsonCommand({
			"command": 6,
			"name": "DoorLockConfigurationReport",
			"help": "Door Lock Configuration Report",
			"status": "active",
			"params": [
				{
					"type": "enum",
					"name": "operationType",
					"help": "Operation Type",
					"length": 1,
					"values": {
						"1": {
							"name": "ConstantOperation",
							"help": "Constant operation"
						},
						"2": {
							"name": "TimedOperation",
							"help": "Timed operation"
						}
					}
				},
				{
					"type": "bitfield",
					"name": "properties1",
					"help": "Properties1",
					"length": 1,
					"fields": [
						{
							"fieldType": "integer",
							"name": "outsideDoorHandlesState",
							"mask": 240,
							"shift": 4
						},
						{
							"fieldType": "integer",
							"name": "insideDoorHandlesState",
							"mask": 15,
							"shift": 0
						}
					]
				},
				{
					"type": "integer",
					"name": "lockTimeoutMinutes",
					"help": "Lock Timeout Minutes",
					"length": 1
				},
				{
					"type": "integer",
					"name": "lockTimeoutSeconds",
					"help": "Lock Timeout Seconds",
					"length": 1
				}
			]
		} as jsonSpec.CommandDefinition);

		static matches(packet: Packet): boolean {
			return packet.tryAs(DoorLockV2)?.command === this.command;
		}

		constructor(data: Buffer | DoorLockV2DoorLockConfigurationReportData) {
			super(DoorLockConfigurationReport, data);
		}
	};

	public static readonly DoorLockConfigurationSet = class DoorLockConfigurationSet extends CommandPacket<DoorLockV2DoorLockConfigurationSetData> {
		public static readonly CommandClass = DoorLockV2;
		public static readonly command = 0x04;
		public static readonly definition = convertFromJsonCommand({
			"command": 4,
			"name": "DoorLockConfigurationSet",
			"help": "Door Lock Configuration Set",
			"status": "active",
			"params": [
				{
					"type": "enum",
					"name": "operationType",
					"help": "Operation Type",
					"length": 1,
					"values": {
						"1": {
							"name": "ConstantOperation",
							"help": "Constant operation"
						},
						"2": {
							"name": "TimedOperation",
							"help": "Timed operation"
						}
					}
				},
				{
					"type": "bitfield",
					"name": "properties1",
					"help": "Properties1",
					"length": 1,
					"fields": [
						{
							"fieldType": "integer",
							"name": "outsideDoorHandlesState",
							"mask": 240,
							"shift": 4
						},
						{
							"fieldType": "integer",
							"name": "insideDoorHandlesState",
							"mask": 15,
							"shift": 0
						}
					]
				},
				{
					"type": "integer",
					"name": "lockTimeoutMinutes",
					"help": "Lock Timeout Minutes",
					"length": 1
				},
				{
					"type": "integer",
					"name": "lockTimeoutSeconds",
					"help": "Lock Timeout Seconds",
					"length": 1
				}
			]
		} as jsonSpec.CommandDefinition);

		static matches(packet: Packet): boolean {
			return packet.tryAs(DoorLockV2)?.command === this.command;
		}

		constructor(data: Buffer | DoorLockV2DoorLockConfigurationSetData) {
			super(DoorLockConfigurationSet, data);
		}
	};

	public static readonly DoorLockOperationGet = class DoorLockOperationGet extends CommandPacket<void> {
		public static readonly CommandClass = DoorLockV2;
		public static readonly command = 0x02;
		public static readonly definition = convertFromJsonCommand({
			"command": 2,
			"name": "DoorLockOperationGet",
			"help": "Door Lock Operation Get",
			"status": "active",
			"params": []
		} as jsonSpec.CommandDefinition);

		static matches(packet: Packet): boolean {
			return packet.tryAs(DoorLockV2)?.command === this.command;
		}

		constructor(data: Buffer | void) {
			super(DoorLockOperationGet, data);
		}
	};

	public static readonly DoorLockOperationReport = class DoorLockOperationReport extends CommandPacket<DoorLockV2DoorLockOperationReportData> {
		public static readonly CommandClass = DoorLockV2;
		public static readonly command = 0x03;
		public static readonly definition = convertFromJsonCommand({
			"command": 3,
			"name": "DoorLockOperationReport",
			"help": "Door Lock Operation Report",
			"status": "active",
			"params": [
				{
					"type": "enum",
					"name": "doorLockMode",
					"help": "Door Lock Mode",
					"length": 1,
					"values": {
						"0": {
							"name": "DoorUnsecured",
							"help": "Door Unsecured"
						},
						"1": {
							"name": "DoorUnsecuredWithTimeout",
							"help": "Door Unsecured with timeout"
						},
						"16": {
							"name": "DoorUnsecuredForInsideDoorHandles",
							"help": "Door Unsecured for inside Door Handles"
						},
						"17": {
							"name": "DoorUnsecuredForInsideDoorHandlesWithTimeout",
							"help": "Door Unsecured for inside Door Handles with timeout"
						},
						"32": {
							"name": "DoorUnsecuredForOutsideDoorHandles",
							"help": "Door Unsecured for outside Door Handles"
						},
						"33": {
							"name": "DoorUnsecuredForOutsideDoorHandlesWithTimeout",
							"help": "Door Unsecured for outside Door Handles with timeout"
						},
						"254": {
							"name": "DoorLockStateUnknown",
							"help": "Door/Lock State Unknown"
						},
						"255": {
							"name": "DoorSecured",
							"help": "Door Secured"
						}
					}
				},
				{
					"type": "bitfield",
					"name": "properties1",
					"help": "Properties1",
					"length": 1,
					"fields": [
						{
							"fieldType": "integer",
							"name": "outsideDoorHandlesMode",
							"mask": 240,
							"shift": 4
						},
						{
							"fieldType": "integer",
							"name": "insideDoorHandlesMode",
							"mask": 15,
							"shift": 0
						}
					]
				},
				{
					"type": "integer",
					"name": "doorCondition",
					"help": "Door Condition",
					"length": 1
				},
				{
					"type": "integer",
					"name": "lockTimeoutMinutes",
					"help": "Lock Timeout Minutes",
					"length": 1
				},
				{
					"type": "integer",
					"name": "lockTimeoutSeconds",
					"help": "Lock Timeout Seconds",
					"length": 1
				}
			]
		} as jsonSpec.CommandDefinition);

		static matches(packet: Packet): boolean {
			return packet.tryAs(DoorLockV2)?.command === this.command;
		}

		constructor(data: Buffer | DoorLockV2DoorLockOperationReportData) {
			super(DoorLockOperationReport, data);
		}
	};

	public static readonly DoorLockOperationSet = class DoorLockOperationSet extends CommandPacket<DoorLockV2DoorLockOperationSetData> {
		public static readonly CommandClass = DoorLockV2;
		public static readonly command = 0x01;
		public static readonly definition = convertFromJsonCommand({
			"command": 1,
			"name": "DoorLockOperationSet",
			"help": "Door Lock Operation Set",
			"status": "active",
			"params": [
				{
					"type": "enum",
					"name": "doorLockMode",
					"help": "Door Lock Mode",
					"length": 1,
					"values": {
						"0": {
							"name": "DoorUnsecured",
							"help": "Door Unsecured"
						},
						"1": {
							"name": "DoorUnsecuredWithTimeout",
							"help": "Door Unsecured with timeout"
						},
						"16": {
							"name": "DoorUnsecuredForInsideDoorHandles",
							"help": "Door Unsecured for inside Door Handles"
						},
						"17": {
							"name": "DoorUnsecuredForInsideDoorHandlesWithTimeout",
							"help": "Door Unsecured for inside Door Handles with timeout"
						},
						"32": {
							"name": "DoorUnsecuredForOutsideDoorHandles",
							"help": "Door Unsecured for outside Door Handles"
						},
						"33": {
							"name": "DoorUnsecuredForOutsideDoorHandlesWithTimeout",
							"help": "Door Unsecured for outside Door Handles with timeout"
						},
						"254": {
							"name": "DoorLockStateUnknown",
							"help": "Door/Lock State Unknown"
						},
						"255": {
							"name": "DoorSecured",
							"help": "Door Secured"
						}
					}
				}
			]
		} as jsonSpec.CommandDefinition);

		static matches(packet: Packet): boolean {
			return packet.tryAs(DoorLockV2)?.command === this.command;
		}

		constructor(data: Buffer | DoorLockV2DoorLockOperationSetData) {
			super(DoorLockOperationSet, data);
		}
	};
}

export namespace DoorLockV2 {
	export type DoorLockConfigurationGet = InstanceType<typeof DoorLockV2.DoorLockConfigurationGet>;
	export type DoorLockConfigurationReport = InstanceType<typeof DoorLockV2.DoorLockConfigurationReport>;
	export type DoorLockConfigurationSet = InstanceType<typeof DoorLockV2.DoorLockConfigurationSet>;
	export type DoorLockOperationGet = InstanceType<typeof DoorLockV2.DoorLockOperationGet>;
	export type DoorLockOperationReport = InstanceType<typeof DoorLockV2.DoorLockOperationReport>;
	export type DoorLockOperationSet = InstanceType<typeof DoorLockV2.DoorLockOperationSet>;
}
