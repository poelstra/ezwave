/**
 * Command Class Door Lock, version 2.
 *
 * Auto-generated, do not edit.
 */

import { CommandClasses, CommandClassPacket, CommandPacket, Packet } from "@ezwave/codec";
import { CommandDefinition, convertFromJsonCommand, JsonCommandDefinition } from "@ezwave/spec";

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
	public static readonly commandClass: number = CommandClasses.DoorLock; // 0x62 (98)
	public static readonly version: number = 2;

	public static matches(packet: Packet): boolean {
		return packet.commandClass === this.commandClass;
	}

	public constructor(commandAndPayload: Buffer) {
		super(DoorLockV2, commandAndPayload);
	}
}

export class DoorLockConfigurationGet extends CommandPacket<void> {
	public static readonly CommandClass: typeof DoorLockV2 = DoorLockV2;
	public static readonly command: number = 0x05; // 5
	public static readonly definition: CommandDefinition = convertFromJsonCommand({
		"command": 5,
		"name": "DoorLockConfigurationGet",
		"help": "Door Lock Configuration Get",
		"status": "Active",
		"params": []
	} as JsonCommandDefinition);

	public static matches(packet: Packet): boolean {
		return packet.tryAs(DoorLockV2)?.command === this.command;
	}

	public constructor(data: Buffer | void) {
		super(DoorLockConfigurationGet, data);
	}
};

export class DoorLockConfigurationReport extends CommandPacket<DoorLockV2DoorLockConfigurationReportData> {
	public static readonly CommandClass: typeof DoorLockV2 = DoorLockV2;
	public static readonly command: number = 0x06; // 6
	public static readonly definition: CommandDefinition = convertFromJsonCommand({
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
	} as JsonCommandDefinition);

	public static matches(packet: Packet): boolean {
		return packet.tryAs(DoorLockV2)?.command === this.command;
	}

	public constructor(data: Buffer | DoorLockV2DoorLockConfigurationReportData) {
		super(DoorLockConfigurationReport, data);
	}
};

export class DoorLockConfigurationSet extends CommandPacket<DoorLockV2DoorLockConfigurationSetData> {
	public static readonly CommandClass: typeof DoorLockV2 = DoorLockV2;
	public static readonly command: number = 0x04; // 4
	public static readonly definition: CommandDefinition = convertFromJsonCommand({
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
	} as JsonCommandDefinition);

	public static matches(packet: Packet): boolean {
		return packet.tryAs(DoorLockV2)?.command === this.command;
	}

	public constructor(data: Buffer | DoorLockV2DoorLockConfigurationSetData) {
		super(DoorLockConfigurationSet, data);
	}
};

export class DoorLockOperationGet extends CommandPacket<void> {
	public static readonly CommandClass: typeof DoorLockV2 = DoorLockV2;
	public static readonly command: number = 0x02; // 2
	public static readonly definition: CommandDefinition = convertFromJsonCommand({
		"command": 2,
		"name": "DoorLockOperationGet",
		"help": "Door Lock Operation Get",
		"status": "Active",
		"params": []
	} as JsonCommandDefinition);

	public static matches(packet: Packet): boolean {
		return packet.tryAs(DoorLockV2)?.command === this.command;
	}

	public constructor(data: Buffer | void) {
		super(DoorLockOperationGet, data);
	}
};

export class DoorLockOperationReport extends CommandPacket<DoorLockV2DoorLockOperationReportData> {
	public static readonly CommandClass: typeof DoorLockV2 = DoorLockV2;
	public static readonly command: number = 0x03; // 3
	public static readonly definition: CommandDefinition = convertFromJsonCommand({
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
	} as JsonCommandDefinition);

	public static matches(packet: Packet): boolean {
		return packet.tryAs(DoorLockV2)?.command === this.command;
	}

	public constructor(data: Buffer | DoorLockV2DoorLockOperationReportData) {
		super(DoorLockOperationReport, data);
	}
};

export class DoorLockOperationSet extends CommandPacket<DoorLockV2DoorLockOperationSetData> {
	public static readonly CommandClass: typeof DoorLockV2 = DoorLockV2;
	public static readonly command: number = 0x01; // 1
	public static readonly definition: CommandDefinition = convertFromJsonCommand({
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
	} as JsonCommandDefinition);

	public static matches(packet: Packet): boolean {
		return packet.tryAs(DoorLockV2)?.command === this.command;
	}

	public constructor(data: Buffer | DoorLockV2DoorLockOperationSetData) {
		super(DoorLockOperationSet, data);
	}
};
