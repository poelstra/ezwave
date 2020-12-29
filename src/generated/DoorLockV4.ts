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
	// TODO param properties1 type bitfield
	lockTimeoutMinutes: number; // 1 byte unsigned integer
	lockTimeoutSeconds: number; // 1 byte unsigned integer
	autoRelockTime: number; // 2 byte unsigned integer
	holdAndReleaseTime: number; // 2 byte unsigned integer
	// TODO param properties2 type bitfield
}

export interface DoorLockV4DoorLockConfigurationSetData {
	operationType: OperationTypeEnum; // 1 byte enum value
	// TODO param properties1 type bitfield
	lockTimeoutMinutes: number; // 1 byte unsigned integer
	lockTimeoutSeconds: number; // 1 byte unsigned integer
}

export interface DoorLockV4DoorLockOperationReportData {
	currentDoorLockMode: CurrentDoorLockModeEnum; // 1 byte enum value
	// TODO param properties1 type bitfield
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
	// TODO param properties1 type bitfield
	// TODO param supportedOperationTypeBitMask type blob
	supportedDoorLockModeListLength: number; // 1 byte unsigned integer
	// TODO param supportedDoorLockMode type blob
	// TODO param properties2 type bitfield
	supportedDoorComponents: number; // 1 byte unsigned integer
	// TODO param properties3 type bitfield
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
						"1": "Constant operation",
						"2": "Timed operation"
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
							"name": "Inside Door Handles State",
							"mask": 15,
							"shift": 0
						},
						{
							"type": "integer",
							"name": "Outside Door Handles State",
							"mask": 240,
							"shift": 4
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
							"type": "boolean",
							"name": "TA",
							"mask": 1,
							"shift": 0
						},
						{
							"type": "boolean",
							"name": "BTB",
							"mask": 2,
							"shift": 1
						},
						{
							"type": "integer",
							"name": "Reserved",
							"mask": 252,
							"shift": 2
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
						"1": "Constant operation",
						"2": "Timed operation"
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
							"name": "Inside Door Handles State",
							"mask": 15,
							"shift": 0
						},
						{
							"type": "integer",
							"name": "Outside Door Handles State",
							"mask": 240,
							"shift": 4
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
						"0": "Door Unsecured",
						"1": "Door Unsecured with timeout",
						"16": "Door Unsecured for inside Door Handles",
						"17": "Door Unsecured for inside Door Handles with timeout",
						"32": "Door Unsecured for outside Door Handles",
						"33": "Door Unsecured for outside Door Handles with timeout",
						"254": "Door/Lock State Unknown",
						"255": "Door Secured"
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
							"name": "Inside Door Handles Mode",
							"mask": 15,
							"shift": 0
						},
						{
							"type": "integer",
							"name": "Outside Door Handles Mode",
							"mask": 240,
							"shift": 4
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
						"0": "Door Unsecured",
						"1": "Door Unsecured with timeout",
						"16": "Door Unsecured for inside Door Handles",
						"17": "Door Unsecured for inside Door Handles with timeout",
						"32": "Door Unsecured for outside Door Handles",
						"33": "Door Unsecured for outside Door Handles with timeout",
						"254": "Door/Lock State Unknown",
						"255": "Door Secured"
					}
				},
				{
					"type": "enum",
					"name": "duration",
					"help": "Duration",
					"length": 1,
					"values": {
						"0": "Already at the Target Value",
						"254": "Unknown duration",
						"255": "Reserved"
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
						"0": "Door Unsecured",
						"1": "Door Unsecured with timeout",
						"16": "Door Unsecured for inside Door Handles",
						"17": "Door Unsecured for inside Door Handles with timeout",
						"32": "Door Unsecured for outside Door Handles",
						"33": "Door Unsecured for outside Door Handles with timeout",
						"254": "Door/Lock State Unknown",
						"255": "Door Secured"
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
							"name": "Supported Operation type Bit Mask Length",
							"mask": 31,
							"shift": 0
						},
						{
							"type": "integer",
							"name": "Reserved",
							"mask": 224,
							"shift": 5
						}
					]
				},
				{
					"type": "blob",
					"name": "supportedOperationTypeBitMask",
					"help": "Supported Operation Type Bit Mask",
					"length": {
						"name": "Properties1",
						"mask": 31,
						"shift": 0
					}
				},
				{
					"type": "integer",
					"name": "supportedDoorLockModeListLength",
					"help": "Supported Door Lock Mode List Length",
					"length": 1
				},
				{
					"type": "blob",
					"name": "supportedDoorLockMode",
					"help": "Supported Door Lock Mode",
					"length": {
						"name": "Supported Door Lock Mode List Length",
						"mask": 255,
						"shift": 0
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
							"name": "Supported Inside Handle Modes Bitmask",
							"mask": 15,
							"shift": 0
						},
						{
							"type": "integer",
							"name": "Supported Outside Handle Modes Bitmask",
							"mask": 240,
							"shift": 4
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
							"type": "boolean",
							"name": "BTBS",
							"mask": 1,
							"shift": 0
						},
						{
							"type": "boolean",
							"name": "TAS",
							"mask": 2,
							"shift": 1
						},
						{
							"type": "boolean",
							"name": "HRS",
							"mask": 4,
							"shift": 2
						},
						{
							"type": "boolean",
							"name": "ARS",
							"mask": 8,
							"shift": 3
						},
						{
							"type": "integer",
							"name": "Reserved",
							"mask": 240,
							"shift": 4
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
