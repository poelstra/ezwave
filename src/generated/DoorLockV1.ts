/**
 * Command Class Door Lock, version 1.
 *
 * Auto-generated, do not edit.
 */

import { CommandClassPacket, CommandPacket } from "../commands/command";
import * as jsonSpec from "../commands/jsonSpec";
import { Packet } from "../commands/packet";
import { convertFromJsonCommand } from "../commands/specHelpers";
import CommandClasses from "../generated/CommandClasses";

export enum DoorLockV1Commands {
	DoorLockConfigurationGet = 0x05,
	DoorLockConfigurationReport = 0x06,
	DoorLockConfigurationSet = 0x04,
	DoorLockOperationGet = 0x02,
	DoorLockOperationReport = 0x03,
	DoorLockOperationSet = 0x01,
}

export interface DoorLockV1DoorLockConfigurationReportData {
	operationType: OperationTypeEnum; // 1 byte enum value
	outsideDoorHandlesState: number; // properties1[7..4]
	insideDoorHandlesState: number; // properties1[3..0]
	lockTimeoutMinutes: number; // 1 byte unsigned integer
	lockTimeoutSeconds: number; // 1 byte unsigned integer
}

export interface DoorLockV1DoorLockConfigurationSetData {
	operationType: OperationTypeEnum; // 1 byte enum value
	outsideDoorHandlesState: number; // properties1[7..4]
	insideDoorHandlesState: number; // properties1[3..0]
	lockTimeoutMinutes: number; // 1 byte unsigned integer
	lockTimeoutSeconds: number; // 1 byte unsigned integer
}

export interface DoorLockV1DoorLockOperationReportData {
	doorLockMode: DoorLockModeEnum; // 1 byte enum value
	outsideDoorHandlesMode: number; // properties1[7..4]
	insideDoorHandlesMode: number; // properties1[3..0]
	doorCondition: number; // 1 byte unsigned integer
	lockTimeoutMinutes: number; // 1 byte unsigned integer
	lockTimeoutSeconds: number; // 1 byte unsigned integer
}

export interface DoorLockV1DoorLockOperationSetData {
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
	DoorSecured = 0xff,
}

export class DoorLockV1 extends CommandClassPacket<DoorLockV1Commands> {
	public static readonly commandClass = CommandClasses.DoorLock; // 0x62 (98)

	public static matches(packet: Packet): boolean {
		return packet.commandClass === this.commandClass;
	}

	constructor(commandAndPayload: Buffer) {
		super(DoorLockV1, commandAndPayload);
	}

	public static readonly DoorLockConfigurationGet = class DoorLockConfigurationGet extends CommandPacket<void> {
		public static readonly CommandClass = DoorLockV1;
		public static readonly command = 0x05;
		public static readonly definition = convertFromJsonCommand({
			"command": 5,
			"name": "DoorLockConfigurationGet",
			"help": "Door Lock Configuration Get",
			"status": "Active",
			"params": []
		} as jsonSpec.CommandDefinition);

		static matches(packet: Packet): boolean {
			return packet.tryAs(DoorLockV1)?.command === this.command;
		}

		constructor(data: Buffer | void) {
			super(DoorLockConfigurationGet, data);
		}
	};

	public static readonly DoorLockConfigurationReport = class DoorLockConfigurationReport extends CommandPacket<DoorLockV1DoorLockConfigurationReportData> {
		public static readonly CommandClass = DoorLockV1;
		public static readonly command = 0x06;
		public static readonly definition = convertFromJsonCommand({
			"command": 6,
			"name": "DoorLockConfigurationReport",
			"help": "Door Lock Configuration Report",
			"status": "Active",
			"params": [
				{
					"type": "Enum",
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
					"type": "Bitfield",
					"name": "properties1",
					"help": "Properties1",
					"length": 1,
					"fields": [
						{
							"fieldType": "Integer",
							"name": "outsideDoorHandlesState",
							"mask": 240,
							"shift": 4
						},
						{
							"fieldType": "Integer",
							"name": "insideDoorHandlesState",
							"mask": 15,
							"shift": 0
						}
					]
				},
				{
					"type": "Integer",
					"name": "lockTimeoutMinutes",
					"help": "Lock Timeout Minutes",
					"length": 1
				},
				{
					"type": "Integer",
					"name": "lockTimeoutSeconds",
					"help": "Lock Timeout Seconds",
					"length": 1
				}
			]
		} as jsonSpec.CommandDefinition);

		static matches(packet: Packet): boolean {
			return packet.tryAs(DoorLockV1)?.command === this.command;
		}

		constructor(data: Buffer | DoorLockV1DoorLockConfigurationReportData) {
			super(DoorLockConfigurationReport, data);
		}
	};

	public static readonly DoorLockConfigurationSet = class DoorLockConfigurationSet extends CommandPacket<DoorLockV1DoorLockConfigurationSetData> {
		public static readonly CommandClass = DoorLockV1;
		public static readonly command = 0x04;
		public static readonly definition = convertFromJsonCommand({
			"command": 4,
			"name": "DoorLockConfigurationSet",
			"help": "Door Lock Configuration Set",
			"status": "Active",
			"params": [
				{
					"type": "Enum",
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
					"type": "Bitfield",
					"name": "properties1",
					"help": "Properties1",
					"length": 1,
					"fields": [
						{
							"fieldType": "Integer",
							"name": "outsideDoorHandlesState",
							"mask": 240,
							"shift": 4
						},
						{
							"fieldType": "Integer",
							"name": "insideDoorHandlesState",
							"mask": 15,
							"shift": 0
						}
					]
				},
				{
					"type": "Integer",
					"name": "lockTimeoutMinutes",
					"help": "Lock Timeout Minutes",
					"length": 1
				},
				{
					"type": "Integer",
					"name": "lockTimeoutSeconds",
					"help": "Lock Timeout Seconds",
					"length": 1
				}
			]
		} as jsonSpec.CommandDefinition);

		static matches(packet: Packet): boolean {
			return packet.tryAs(DoorLockV1)?.command === this.command;
		}

		constructor(data: Buffer | DoorLockV1DoorLockConfigurationSetData) {
			super(DoorLockConfigurationSet, data);
		}
	};

	public static readonly DoorLockOperationGet = class DoorLockOperationGet extends CommandPacket<void> {
		public static readonly CommandClass = DoorLockV1;
		public static readonly command = 0x02;
		public static readonly definition = convertFromJsonCommand({
			"command": 2,
			"name": "DoorLockOperationGet",
			"help": "Door Lock Operation Get",
			"status": "Active",
			"params": []
		} as jsonSpec.CommandDefinition);

		static matches(packet: Packet): boolean {
			return packet.tryAs(DoorLockV1)?.command === this.command;
		}

		constructor(data: Buffer | void) {
			super(DoorLockOperationGet, data);
		}
	};

	public static readonly DoorLockOperationReport = class DoorLockOperationReport extends CommandPacket<DoorLockV1DoorLockOperationReportData> {
		public static readonly CommandClass = DoorLockV1;
		public static readonly command = 0x03;
		public static readonly definition = convertFromJsonCommand({
			"command": 3,
			"name": "DoorLockOperationReport",
			"help": "Door Lock Operation Report",
			"status": "Active",
			"params": [
				{
					"type": "Enum",
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
						"255": {
							"name": "DoorSecured",
							"help": "Door Secured"
						}
					}
				},
				{
					"type": "Bitfield",
					"name": "properties1",
					"help": "Properties1",
					"length": 1,
					"fields": [
						{
							"fieldType": "Integer",
							"name": "outsideDoorHandlesMode",
							"mask": 240,
							"shift": 4
						},
						{
							"fieldType": "Integer",
							"name": "insideDoorHandlesMode",
							"mask": 15,
							"shift": 0
						}
					]
				},
				{
					"type": "Integer",
					"name": "doorCondition",
					"help": "Door Condition",
					"length": 1
				},
				{
					"type": "Integer",
					"name": "lockTimeoutMinutes",
					"help": "Lock Timeout Minutes",
					"length": 1
				},
				{
					"type": "Integer",
					"name": "lockTimeoutSeconds",
					"help": "Lock Timeout Seconds",
					"length": 1
				}
			]
		} as jsonSpec.CommandDefinition);

		static matches(packet: Packet): boolean {
			return packet.tryAs(DoorLockV1)?.command === this.command;
		}

		constructor(data: Buffer | DoorLockV1DoorLockOperationReportData) {
			super(DoorLockOperationReport, data);
		}
	};

	public static readonly DoorLockOperationSet = class DoorLockOperationSet extends CommandPacket<DoorLockV1DoorLockOperationSetData> {
		public static readonly CommandClass = DoorLockV1;
		public static readonly command = 0x01;
		public static readonly definition = convertFromJsonCommand({
			"command": 1,
			"name": "DoorLockOperationSet",
			"help": "Door Lock Operation Set",
			"status": "Active",
			"params": [
				{
					"type": "Enum",
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
						"255": {
							"name": "DoorSecured",
							"help": "Door Secured"
						}
					}
				}
			]
		} as jsonSpec.CommandDefinition);

		static matches(packet: Packet): boolean {
			return packet.tryAs(DoorLockV1)?.command === this.command;
		}

		constructor(data: Buffer | DoorLockV1DoorLockOperationSetData) {
			super(DoorLockOperationSet, data);
		}
	};
}

export namespace DoorLockV1 {
	export type DoorLockConfigurationGet = InstanceType<typeof DoorLockV1.DoorLockConfigurationGet>;
	export type DoorLockConfigurationReport = InstanceType<typeof DoorLockV1.DoorLockConfigurationReport>;
	export type DoorLockConfigurationSet = InstanceType<typeof DoorLockV1.DoorLockConfigurationSet>;
	export type DoorLockOperationGet = InstanceType<typeof DoorLockV1.DoorLockOperationGet>;
	export type DoorLockOperationReport = InstanceType<typeof DoorLockV1.DoorLockOperationReport>;
	export type DoorLockOperationSet = InstanceType<typeof DoorLockV1.DoorLockOperationSet>;
}
