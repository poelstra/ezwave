/**
 * Command Class Door Lock, version 4.
 *
 * Auto-generated, do not edit.
 */

import { CommandClassPacket, CommandPacket } from "../commands/command";
import { Packet } from "../commands/packet";
import { CommandDefinition } from "../commands/types";
import CommandClasses from "../generated/CommandClasses";

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
	// TODO param supportedOperationTypeBitMask type blob
	// TODO param supportedDoorLockMode type blob
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
	public static readonly commandClass = CommandClasses.DoorLock; // 0x62 (98)

	public static matches(packet: Packet): boolean {
		return packet.commandClass === this.commandClass;
	}

	constructor(commandAndPayload: Buffer) {
		super(DoorLockV4, commandAndPayload);
	}

	public static readonly DoorLockConfigurationGet = class DoorLockConfigurationGet extends CommandPacket<void> {
		public static readonly CommandClass = DoorLockV4;
		public static readonly command = 0x05;
		public static readonly definition = {
			"command": 5,
			"name": "DoorLockConfigurationGet",
			"help": "Door Lock Configuration Get",
			"status": "active",
			"params": []
		} as CommandDefinition;

		static matches(packet: Packet): boolean {
			return packet.tryAs(DoorLockV4)?.command === this.command;
		}

		constructor(data: Buffer | void) {
			super(DoorLockConfigurationGet, data);
		}
	};

	public static readonly DoorLockConfigurationReport = class DoorLockConfigurationReport extends CommandPacket<DoorLockV4DoorLockConfigurationReportData> {
		public static readonly CommandClass = DoorLockV4;
		public static readonly command = 0x06;
		public static readonly definition = {
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
							"type": "integer",
							"name": "outsideDoorHandlesState",
							"mask": 240,
							"shift": 4
						},
						{
							"type": "integer",
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
				},
				{
					"type": "integer",
					"name": "autoRelockTime",
					"help": "Auto-relock time",
					"length": 2
				},
				{
					"type": "integer",
					"name": "holdAndReleaseTime",
					"help": "Hold and release time",
					"length": 2
				},
				{
					"type": "bitfield",
					"name": "properties2",
					"help": "Properties2",
					"length": 1,
					"fields": [
						{
							"type": "integer",
							"name": "reserved",
							"mask": 252,
							"shift": 2,
							"reserved": true
						},
						{
							"type": "boolean",
							"name": "btb",
							"mask": 2,
							"shift": 1
						},
						{
							"type": "boolean",
							"name": "ta",
							"mask": 1,
							"shift": 0
						}
					]
				}
			]
		} as CommandDefinition;

		static matches(packet: Packet): boolean {
			return packet.tryAs(DoorLockV4)?.command === this.command;
		}

		constructor(data: Buffer | DoorLockV4DoorLockConfigurationReportData) {
			super(DoorLockConfigurationReport, data);
		}
	};

	public static readonly DoorLockConfigurationSet = class DoorLockConfigurationSet extends CommandPacket<DoorLockV4DoorLockConfigurationSetData> {
		public static readonly CommandClass = DoorLockV4;
		public static readonly command = 0x04;
		public static readonly definition = {
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
							"type": "integer",
							"name": "outsideDoorHandlesState",
							"mask": 240,
							"shift": 4
						},
						{
							"type": "integer",
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
		} as CommandDefinition;

		static matches(packet: Packet): boolean {
			return packet.tryAs(DoorLockV4)?.command === this.command;
		}

		constructor(data: Buffer | DoorLockV4DoorLockConfigurationSetData) {
			super(DoorLockConfigurationSet, data);
		}
	};

	public static readonly DoorLockOperationGet = class DoorLockOperationGet extends CommandPacket<void> {
		public static readonly CommandClass = DoorLockV4;
		public static readonly command = 0x02;
		public static readonly definition = {
			"command": 2,
			"name": "DoorLockOperationGet",
			"help": "Door Lock Operation Get",
			"status": "active",
			"params": []
		} as CommandDefinition;

		static matches(packet: Packet): boolean {
			return packet.tryAs(DoorLockV4)?.command === this.command;
		}

		constructor(data: Buffer | void) {
			super(DoorLockOperationGet, data);
		}
	};

	public static readonly DoorLockOperationReport = class DoorLockOperationReport extends CommandPacket<DoorLockV4DoorLockOperationReportData> {
		public static readonly CommandClass = DoorLockV4;
		public static readonly command = 0x03;
		public static readonly definition = {
			"command": 3,
			"name": "DoorLockOperationReport",
			"help": "Door Lock Operation Report",
			"status": "active",
			"params": [
				{
					"type": "enum",
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
					"type": "bitfield",
					"name": "properties1",
					"help": "Properties1",
					"length": 1,
					"fields": [
						{
							"type": "integer",
							"name": "outsideDoorHandlesMode",
							"mask": 240,
							"shift": 4
						},
						{
							"type": "integer",
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
				},
				{
					"type": "enum",
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
					"type": "enum",
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
		} as CommandDefinition;

		static matches(packet: Packet): boolean {
			return packet.tryAs(DoorLockV4)?.command === this.command;
		}

		constructor(data: Buffer | DoorLockV4DoorLockOperationReportData) {
			super(DoorLockOperationReport, data);
		}
	};

	public static readonly DoorLockOperationSet = class DoorLockOperationSet extends CommandPacket<DoorLockV4DoorLockOperationSetData> {
		public static readonly CommandClass = DoorLockV4;
		public static readonly command = 0x01;
		public static readonly definition = {
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
		} as CommandDefinition;

		static matches(packet: Packet): boolean {
			return packet.tryAs(DoorLockV4)?.command === this.command;
		}

		constructor(data: Buffer | DoorLockV4DoorLockOperationSetData) {
			super(DoorLockOperationSet, data);
		}
	};

	public static readonly DoorLockCapabilitiesGet = class DoorLockCapabilitiesGet extends CommandPacket<void> {
		public static readonly CommandClass = DoorLockV4;
		public static readonly command = 0x07;
		public static readonly definition = {
			"command": 7,
			"name": "DoorLockCapabilitiesGet",
			"help": "Door Lock Capabilities Get",
			"status": "active",
			"params": []
		} as CommandDefinition;

		static matches(packet: Packet): boolean {
			return packet.tryAs(DoorLockV4)?.command === this.command;
		}

		constructor(data: Buffer | void) {
			super(DoorLockCapabilitiesGet, data);
		}
	};

	public static readonly DoorLockCapabilitiesReport = class DoorLockCapabilitiesReport extends CommandPacket<DoorLockV4DoorLockCapabilitiesReportData> {
		public static readonly CommandClass = DoorLockV4;
		public static readonly command = 0x08;
		public static readonly definition = {
			"command": 8,
			"name": "DoorLockCapabilitiesReport",
			"help": "Door Lock Capabilities Report",
			"status": "active",
			"params": [
				{
					"type": "bitfield",
					"name": "properties1",
					"help": "Properties1",
					"length": 1,
					"fields": [
						{
							"type": "integer",
							"name": "reserved",
							"mask": 224,
							"shift": 5,
							"reserved": true
						},
						{
							"type": "integer",
							"name": "supportedOperationTypeBitMaskLength",
							"mask": 31,
							"shift": 0,
							"lengthOf": {
								"refs": [
									{
										"name": "supportedOperationTypeBitMask"
									}
								]
							}
						}
					]
				},
				{
					"type": "blob",
					"name": "supportedOperationTypeBitMask",
					"help": "Supported Operation Type Bit Mask",
					"length": {
						"ref": "properties1",
						"bitfield": {
							"mask": 31,
							"shift": 0,
							"name": "supportedOperationTypeBitMaskLength"
						}
					}
				},
				{
					"type": "integer",
					"name": "supportedDoorLockModeListLength",
					"help": "Supported Door Lock Mode List Length",
					"length": 1,
					"lengthOf": {
						"refs": [
							{
								"name": "supportedDoorLockMode"
							}
						]
					}
				},
				{
					"type": "blob",
					"name": "supportedDoorLockMode",
					"help": "Supported Door Lock Mode",
					"length": {
						"ref": "supportedDoorLockModeListLength"
					}
				},
				{
					"type": "bitfield",
					"name": "properties2",
					"help": "Properties2",
					"length": 1,
					"fields": [
						{
							"type": "integer",
							"name": "supportedOutsideHandleModesBitmask",
							"mask": 240,
							"shift": 4
						},
						{
							"type": "integer",
							"name": "supportedInsideHandleModesBitmask",
							"mask": 15,
							"shift": 0
						}
					]
				},
				{
					"type": "integer",
					"name": "supportedDoorComponents",
					"help": "Supported door components",
					"length": 1
				},
				{
					"type": "bitfield",
					"name": "properties3",
					"help": "Properties3",
					"length": 1,
					"fields": [
						{
							"type": "integer",
							"name": "reserved",
							"mask": 240,
							"shift": 4,
							"reserved": true
						},
						{
							"type": "boolean",
							"name": "ars",
							"mask": 8,
							"shift": 3
						},
						{
							"type": "boolean",
							"name": "hrs",
							"mask": 4,
							"shift": 2
						},
						{
							"type": "boolean",
							"name": "tas",
							"mask": 2,
							"shift": 1
						},
						{
							"type": "boolean",
							"name": "btbs",
							"mask": 1,
							"shift": 0
						}
					]
				}
			]
		} as CommandDefinition;

		static matches(packet: Packet): boolean {
			return packet.tryAs(DoorLockV4)?.command === this.command;
		}

		constructor(data: Buffer | DoorLockV4DoorLockCapabilitiesReportData) {
			super(DoorLockCapabilitiesReport, data);
		}
	};
}

export namespace DoorLockV4 {
	export type DoorLockConfigurationGet = InstanceType<typeof DoorLockV4.DoorLockConfigurationGet>;
	export type DoorLockConfigurationReport = InstanceType<typeof DoorLockV4.DoorLockConfigurationReport>;
	export type DoorLockConfigurationSet = InstanceType<typeof DoorLockV4.DoorLockConfigurationSet>;
	export type DoorLockOperationGet = InstanceType<typeof DoorLockV4.DoorLockOperationGet>;
	export type DoorLockOperationReport = InstanceType<typeof DoorLockV4.DoorLockOperationReport>;
	export type DoorLockOperationSet = InstanceType<typeof DoorLockV4.DoorLockOperationSet>;
	export type DoorLockCapabilitiesGet = InstanceType<typeof DoorLockV4.DoorLockCapabilitiesGet>;
	export type DoorLockCapabilitiesReport = InstanceType<typeof DoorLockV4.DoorLockCapabilitiesReport>;
}
