/**
 * Command Class Door Lock, version 4.
 *
 * Auto-generated, do not edit.
 */

import { CommandClasses, CommandClassPacket, CommandPacket, Packet } from "@ezwave/codec";
import { CommandDefinition, convertFromJsonCommand, JsonCommandDefinition } from "@ezwave/spec";

export enum DoorLockV4Commands {
	DoorLockConfigurationGet = 0x05,
	DoorLockConfigurationReport = 0x06,
	DoorLockConfigurationSet = 0x04,
	DoorLockOperationGet = 0x02,
	DoorLockOperationReport = 0x03,
	DoorLockOperationSet = 0x01,
	DoorLockCapabilitiesGet = 0x07,
	DoorLockCapabilitiesReport = 0x08,
}

export interface DoorLockV4DoorLockConfigurationReportData {
	operationType: OperationTypeEnum; // 1 byte enum value
	outsideDoorHandlesState: number; // properties1[7..4]
	insideDoorHandlesState: number; // properties1[3..0]
	lockTimeoutMinutes: number; // 1 byte unsigned integer
	lockTimeoutSeconds: number; // 1 byte unsigned integer
	autoRelockTime: number; // 2 byte unsigned integer
	holdAndReleaseTime: number; // 2 byte unsigned integer
	btb: boolean; // properties2[1]
	ta: boolean; // properties2[0]
}

export interface DoorLockV4DoorLockConfigurationSetData {
	operationType: OperationTypeEnum; // 1 byte enum value
	outsideDoorHandlesState: number; // properties1[7..4]
	insideDoorHandlesState: number; // properties1[3..0]
	lockTimeoutMinutes: number; // 1 byte unsigned integer
	lockTimeoutSeconds: number; // 1 byte unsigned integer
}

export interface DoorLockV4DoorLockOperationReportData {
	currentDoorLockMode: CurrentDoorLockModeEnum; // 1 byte enum value
	outsideDoorHandlesMode: number; // properties1[7..4]
	insideDoorHandlesMode: number; // properties1[3..0]
	doorCondition: number; // 1 byte unsigned integer
	lockTimeoutMinutes: number; // 1 byte unsigned integer
	lockTimeoutSeconds: number; // 1 byte unsigned integer
	targetDoorLockMode: TargetDoorLockModeEnum; // 1 byte enum value
	duration: DurationEnum; // 1 byte enum value
}

export interface DoorLockV4DoorLockOperationSetData {
	doorLockMode: DoorLockModeEnum; // 1 byte enum value
}

export interface DoorLockV4DoorLockCapabilitiesReportData {
	supportedOperationTypeBitMask: Buffer; // variable length
	supportedDoorLockMode: Buffer; // variable length
	supportedOutsideHandleModesBitmask: number; // properties2[7..4]
	supportedInsideHandleModesBitmask: number; // properties2[3..0]
	supportedDoorComponents: number; // 1 byte unsigned integer
	ars: boolean; // properties3[3]
	hrs: boolean; // properties3[2]
	tas: boolean; // properties3[1]
	btbs: boolean; // properties3[0]
}

export enum OperationTypeEnum {
	ConstantOperation = 0x1,
	TimedOperation = 0x2,
}

export enum CurrentDoorLockModeEnum {
	DoorUnsecured = 0x0,
	DoorUnsecuredWithTimeout = 0x1,
	DoorUnsecuredForInsideDoorHandles = 0x10,
	DoorUnsecuredForInsideDoorHandlesWithTimeout = 0x11,
	DoorUnsecuredForOutsideDoorHandles = 0x20,
	DoorUnsecuredForOutsideDoorHandlesWithTimeout = 0x21,
	DoorLockStateUnknown = 0xfe,
	DoorSecured = 0xff,
}

export enum TargetDoorLockModeEnum {
	DoorUnsecured = 0x0,
	DoorUnsecuredWithTimeout = 0x1,
	DoorUnsecuredForInsideDoorHandles = 0x10,
	DoorUnsecuredForInsideDoorHandlesWithTimeout = 0x11,
	DoorUnsecuredForOutsideDoorHandles = 0x20,
	DoorUnsecuredForOutsideDoorHandlesWithTimeout = 0x21,
	DoorLockStateUnknown = 0xfe,
	DoorSecured = 0xff,
}

export enum DurationEnum {
	AlreadyAtTheTargetValue = 0x0,
	UnknownDuration = 0xfe,
	Reserved = 0xff,
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

export class DoorLockV4 extends CommandClassPacket<DoorLockV4Commands> {
	public static readonly commandClass: number = CommandClasses.DoorLock; // 0x62 (98)
	public static readonly version: number = 4;

	public static matches(packet: Packet): boolean {
		return packet.commandClass === this.commandClass;
	}

	public constructor(commandAndPayload: Buffer) {
		super(DoorLockV4, commandAndPayload);
	}
}

export class DoorLockConfigurationGet extends CommandPacket<void> {
	public static readonly CommandClass: typeof DoorLockV4 = DoorLockV4;
	public static readonly command: number = 0x05; // 5
	public static readonly definition: CommandDefinition = convertFromJsonCommand({
		"command": 5,
		"name": "DoorLockConfigurationGet",
		"help": "Door Lock Configuration Get",
		"status": "Active",
		"params": []
	} as JsonCommandDefinition);

	public static matches(packet: Packet): boolean {
		return packet.tryAs(DoorLockV4)?.command === this.command;
	}

	public constructor(data: Buffer | void) {
		super(DoorLockConfigurationGet, data);
	}
};

export class DoorLockConfigurationReport extends CommandPacket<DoorLockV4DoorLockConfigurationReportData> {
	public static readonly CommandClass: typeof DoorLockV4 = DoorLockV4;
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
			},
			{
				"type": "Integer",
				"name": "autoRelockTime",
				"help": "Auto-relock time",
				"length": 2
			},
			{
				"type": "Integer",
				"name": "holdAndReleaseTime",
				"help": "Hold and release time",
				"length": 2
			},
			{
				"type": "Bitfield",
				"name": "properties2",
				"help": "Properties2",
				"length": 1,
				"fields": [
					{
						"fieldType": "Integer",
						"name": "reserved",
						"mask": 252,
						"shift": 2,
						"reserved": true
					},
					{
						"fieldType": "Boolean",
						"name": "btb",
						"mask": 2,
						"shift": 1
					},
					{
						"fieldType": "Boolean",
						"name": "ta",
						"mask": 1,
						"shift": 0
					}
				]
			}
		]
	} as JsonCommandDefinition);

	public static matches(packet: Packet): boolean {
		return packet.tryAs(DoorLockV4)?.command === this.command;
	}

	public constructor(data: Buffer | DoorLockV4DoorLockConfigurationReportData) {
		super(DoorLockConfigurationReport, data);
	}
};

export class DoorLockConfigurationSet extends CommandPacket<DoorLockV4DoorLockConfigurationSetData> {
	public static readonly CommandClass: typeof DoorLockV4 = DoorLockV4;
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
		return packet.tryAs(DoorLockV4)?.command === this.command;
	}

	public constructor(data: Buffer | DoorLockV4DoorLockConfigurationSetData) {
		super(DoorLockConfigurationSet, data);
	}
};

export class DoorLockOperationGet extends CommandPacket<void> {
	public static readonly CommandClass: typeof DoorLockV4 = DoorLockV4;
	public static readonly command: number = 0x02; // 2
	public static readonly definition: CommandDefinition = convertFromJsonCommand({
		"command": 2,
		"name": "DoorLockOperationGet",
		"help": "Door Lock Operation Get",
		"status": "Active",
		"params": []
	} as JsonCommandDefinition);

	public static matches(packet: Packet): boolean {
		return packet.tryAs(DoorLockV4)?.command === this.command;
	}

	public constructor(data: Buffer | void) {
		super(DoorLockOperationGet, data);
	}
};

export class DoorLockOperationReport extends CommandPacket<DoorLockV4DoorLockOperationReportData> {
	public static readonly CommandClass: typeof DoorLockV4 = DoorLockV4;
	public static readonly command: number = 0x03; // 3
	public static readonly definition: CommandDefinition = convertFromJsonCommand({
		"command": 3,
		"name": "DoorLockOperationReport",
		"help": "Door Lock Operation Report",
		"status": "Active",
		"params": [
			{
				"type": "Enum",
				"name": "currentDoorLockMode",
				"help": "Current Door Lock Mode",
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
			},
			{
				"type": "Enum",
				"name": "targetDoorLockMode",
				"help": "Target Door Lock Mode",
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
				"type": "Enum",
				"name": "duration",
				"help": "Duration",
				"length": 1,
				"values": {
					"0": {
						"name": "AlreadyAtTheTargetValue",
						"help": "Already at the Target Value"
					},
					"254": {
						"name": "UnknownDuration",
						"help": "Unknown duration"
					},
					"255": {
						"name": "Reserved",
						"help": "Reserved"
					}
				}
			}
		]
	} as JsonCommandDefinition);

	public static matches(packet: Packet): boolean {
		return packet.tryAs(DoorLockV4)?.command === this.command;
	}

	public constructor(data: Buffer | DoorLockV4DoorLockOperationReportData) {
		super(DoorLockOperationReport, data);
	}
};

export class DoorLockOperationSet extends CommandPacket<DoorLockV4DoorLockOperationSetData> {
	public static readonly CommandClass: typeof DoorLockV4 = DoorLockV4;
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
		return packet.tryAs(DoorLockV4)?.command === this.command;
	}

	public constructor(data: Buffer | DoorLockV4DoorLockOperationSetData) {
		super(DoorLockOperationSet, data);
	}
};

export class DoorLockCapabilitiesGet extends CommandPacket<void> {
	public static readonly CommandClass: typeof DoorLockV4 = DoorLockV4;
	public static readonly command: number = 0x07; // 7
	public static readonly definition: CommandDefinition = convertFromJsonCommand({
		"command": 7,
		"name": "DoorLockCapabilitiesGet",
		"help": "Door Lock Capabilities Get",
		"status": "Active",
		"params": []
	} as JsonCommandDefinition);

	public static matches(packet: Packet): boolean {
		return packet.tryAs(DoorLockV4)?.command === this.command;
	}

	public constructor(data: Buffer | void) {
		super(DoorLockCapabilitiesGet, data);
	}
};

export class DoorLockCapabilitiesReport extends CommandPacket<DoorLockV4DoorLockCapabilitiesReportData> {
	public static readonly CommandClass: typeof DoorLockV4 = DoorLockV4;
	public static readonly command: number = 0x08; // 8
	public static readonly definition: CommandDefinition = convertFromJsonCommand({
		"command": 8,
		"name": "DoorLockCapabilitiesReport",
		"help": "Door Lock Capabilities Report",
		"status": "Active",
		"params": [
			{
				"type": "Bitfield",
				"name": "properties1",
				"help": "Properties1",
				"length": 1,
				"fields": [
					{
						"fieldType": "Integer",
						"name": "reserved",
						"mask": 224,
						"shift": 5,
						"reserved": true
					},
					{
						"fieldType": "Integer",
						"name": "supportedOperationTypeBitMaskLength",
						"mask": 31,
						"shift": 0,
						"lengthOf": {
							"refs": [
								"supportedOperationTypeBitMask"
							]
						},
						"isAutogenerated": true
					}
				]
			},
			{
				"type": "Blob",
				"name": "supportedOperationTypeBitMask",
				"help": "Supported Operation Type Bit Mask",
				"length": {
					"lengthType": "Ref",
					"from": {
						"ref": "properties1.supportedOperationTypeBitMaskLength"
					}
				}
			},
			{
				"type": "Integer",
				"name": "supportedDoorLockModeListLength",
				"help": "Supported Door Lock Mode List Length",
				"length": 1,
				"lengthOf": {
					"refs": [
						"supportedDoorLockMode"
					]
				},
				"isAutogenerated": true
			},
			{
				"type": "Blob",
				"name": "supportedDoorLockMode",
				"help": "Supported Door Lock Mode",
				"length": {
					"lengthType": "Ref",
					"from": {
						"ref": "supportedDoorLockModeListLength"
					}
				}
			},
			{
				"type": "Bitfield",
				"name": "properties2",
				"help": "Properties2",
				"length": 1,
				"fields": [
					{
						"fieldType": "Integer",
						"name": "supportedOutsideHandleModesBitmask",
						"mask": 240,
						"shift": 4
					},
					{
						"fieldType": "Integer",
						"name": "supportedInsideHandleModesBitmask",
						"mask": 15,
						"shift": 0
					}
				]
			},
			{
				"type": "Integer",
				"name": "supportedDoorComponents",
				"help": "Supported door components",
				"length": 1
			},
			{
				"type": "Bitfield",
				"name": "properties3",
				"help": "Properties3",
				"length": 1,
				"fields": [
					{
						"fieldType": "Integer",
						"name": "reserved",
						"mask": 240,
						"shift": 4,
						"reserved": true
					},
					{
						"fieldType": "Boolean",
						"name": "ars",
						"mask": 8,
						"shift": 3
					},
					{
						"fieldType": "Boolean",
						"name": "hrs",
						"mask": 4,
						"shift": 2
					},
					{
						"fieldType": "Boolean",
						"name": "tas",
						"mask": 2,
						"shift": 1
					},
					{
						"fieldType": "Boolean",
						"name": "btbs",
						"mask": 1,
						"shift": 0
					}
				]
			}
		]
	} as JsonCommandDefinition);

	public static matches(packet: Packet): boolean {
		return packet.tryAs(DoorLockV4)?.command === this.command;
	}

	public constructor(data: Buffer | DoorLockV4DoorLockCapabilitiesReportData) {
		super(DoorLockCapabilitiesReport, data);
	}
};
