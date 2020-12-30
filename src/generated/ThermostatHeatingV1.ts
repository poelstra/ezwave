/**
 * Command Class Thermostat Heating, version 1.
 *
 * Auto-generated, do not edit.
 */

import { CommandClassPacket, CommandPacket } from "../commands/command";
import { Packet } from "../commands/packet";
import { CommandDefinition } from "../commands/types";
import CommandClasses from "../generated/CommandClasses";

export enum ThermostatHeatingV1Commands {
	ThermostatHeatingStatusReport = 0x0d,
	ThermostatHeatingModeGet = 0x02,
	ThermostatHeatingModeReport = 0x03,
	ThermostatHeatingModeSet = 0x01,
	ThermostatHeatingRelayStatusGet = 0x09,
	ThermostatHeatingRelayStatusReport = 0x0a,
	ThermostatHeatingSetpointGet = 0x05,
	ThermostatHeatingSetpointReport = 0x06,
	ThermostatHeatingSetpointSet = 0x04,
	ThermostatHeatingStatusGet = 0x0c,
	ThermostatHeatingStatusSet = 0x0b,
	ThermostatHeatingTimedOffSet = 0x11,
}

export interface ThermostatHeatingV1ThermostatHeatingStatusReportData {
	status: StatusEnum; // 1 byte enum value
}

export interface ThermostatHeatingV1ThermostatHeatingModeReportData {
	mode: ModeEnum; // 1 byte enum value
}

export interface ThermostatHeatingV1ThermostatHeatingModeSetData {
	mode: ModeEnum; // 1 byte enum value
}

export interface ThermostatHeatingV1ThermostatHeatingRelayStatusReportData {
	relayStatus: RelayStatusEnum; // 1 byte enum value
}

export interface ThermostatHeatingV1ThermostatHeatingSetpointGetData {
	setpointNr: number; // 1 byte unsigned integer
}

export interface ThermostatHeatingV1ThermostatHeatingSetpointReportData {
	setpointNr: number; // 1 byte unsigned integer
	precision: number; // properties1[7..5]
	scale: number; // properties1[4..3]
	size: number; // properties1[2..0]
	// TODO param value type blob
}

export interface ThermostatHeatingV1ThermostatHeatingSetpointSetData {
	setpointNr: number; // 1 byte unsigned integer
	precision: number; // properties1[7..5]
	scale: number; // properties1[4..3]
	size: number; // properties1[2..0]
	// TODO param value type blob
}

export interface ThermostatHeatingV1ThermostatHeatingStatusSetData {
	status: StatusEnum; // 1 byte enum value
}

export interface ThermostatHeatingV1ThermostatHeatingTimedOffSetData {
	minutes: number; // 1 byte unsigned integer
	hours: number; // 1 byte unsigned integer
}

export enum StatusEnum {
	Heating = 0x0,
	Cooling = 0x1,
}

export enum ModeEnum {
	Off = 0x0,
	OffTimed = 0x1,
	Off3Hours = 0x2,
	AntiFreeze = 0x3,
	Manual = 0x4,
	TemporaryManual = 0x5,
	Automatic = 0x6,
	ManualTimed = 0x7,
}

export enum RelayStatusEnum {
	Off = 0x0,
	On = 0x1,
}

export class ThermostatHeatingV1 extends CommandClassPacket<ThermostatHeatingV1Commands> {
	public static readonly commandClass = CommandClasses.ThermostatHeating; // 0x38 (56)

	public static matches(packet: Packet): boolean {
		return packet.commandClass === this.commandClass;
	}

	constructor(commandAndPayload: Buffer) {
		super(ThermostatHeatingV1, commandAndPayload);
	}

	public static readonly ThermostatHeatingStatusReport = class ThermostatHeatingStatusReport extends CommandPacket<ThermostatHeatingV1ThermostatHeatingStatusReportData> {
		public static readonly CommandClass = ThermostatHeatingV1;
		public static readonly command = 0x0d;
		public static readonly definition = {
			"command": 13,
			"name": "ThermostatHeatingStatusReport",
			"help": "Thermostat Heating Heating Status Report",
			"status": "active",
			"params": [
				{
					"type": "enum",
					"name": "status",
					"help": "Status",
					"length": 1,
					"values": {
						"0": {
							"name": "Heating",
							"help": "Heating"
						},
						"1": {
							"name": "Cooling",
							"help": "Cooling"
						}
					}
				}
			]
		} as CommandDefinition;

		static matches(packet: Packet): boolean {
			return packet.tryAs(ThermostatHeatingV1)?.command === this.command;
		}

		constructor(data: Buffer | ThermostatHeatingV1ThermostatHeatingStatusReportData) {
			super(ThermostatHeatingStatusReport, data);
		}
	};

	public static readonly ThermostatHeatingModeGet = class ThermostatHeatingModeGet extends CommandPacket<void> {
		public static readonly CommandClass = ThermostatHeatingV1;
		public static readonly command = 0x02;
		public static readonly definition = {
			"command": 2,
			"name": "ThermostatHeatingModeGet",
			"help": "Thermostat Heating Mode Get",
			"status": "active",
			"params": []
		} as CommandDefinition;

		static matches(packet: Packet): boolean {
			return packet.tryAs(ThermostatHeatingV1)?.command === this.command;
		}

		constructor(data: Buffer | void) {
			super(ThermostatHeatingModeGet, data);
		}
	};

	public static readonly ThermostatHeatingModeReport = class ThermostatHeatingModeReport extends CommandPacket<ThermostatHeatingV1ThermostatHeatingModeReportData> {
		public static readonly CommandClass = ThermostatHeatingV1;
		public static readonly command = 0x03;
		public static readonly definition = {
			"command": 3,
			"name": "ThermostatHeatingModeReport",
			"help": "Thermostat Heating Mode Report",
			"status": "active",
			"params": [
				{
					"type": "enum",
					"name": "mode",
					"help": "Mode",
					"length": 1,
					"values": {
						"0": {
							"name": "Off",
							"help": "Off"
						},
						"1": {
							"name": "OffTimed",
							"help": "Off timed"
						},
						"2": {
							"name": "Off3Hours",
							"help": "Off 3 hours"
						},
						"3": {
							"name": "AntiFreeze",
							"help": "Anti freeze"
						},
						"4": {
							"name": "Manual",
							"help": "Manual"
						},
						"5": {
							"name": "TemporaryManual",
							"help": "Temporary Manual"
						},
						"6": {
							"name": "Automatic",
							"help": "Automatic"
						},
						"7": {
							"name": "ManualTimed",
							"help": "Manual timed"
						}
					}
				}
			]
		} as CommandDefinition;

		static matches(packet: Packet): boolean {
			return packet.tryAs(ThermostatHeatingV1)?.command === this.command;
		}

		constructor(data: Buffer | ThermostatHeatingV1ThermostatHeatingModeReportData) {
			super(ThermostatHeatingModeReport, data);
		}
	};

	public static readonly ThermostatHeatingModeSet = class ThermostatHeatingModeSet extends CommandPacket<ThermostatHeatingV1ThermostatHeatingModeSetData> {
		public static readonly CommandClass = ThermostatHeatingV1;
		public static readonly command = 0x01;
		public static readonly definition = {
			"command": 1,
			"name": "ThermostatHeatingModeSet",
			"help": "Thermostat Heating Mode Set",
			"status": "active",
			"params": [
				{
					"type": "enum",
					"name": "mode",
					"help": "Mode",
					"length": 1,
					"values": {
						"0": {
							"name": "Off",
							"help": "Off"
						},
						"1": {
							"name": "OffTimed",
							"help": "Off timed"
						},
						"2": {
							"name": "Off3Hours",
							"help": "Off 3 hours"
						},
						"3": {
							"name": "AntiFreeze",
							"help": "Anti freeze"
						},
						"4": {
							"name": "Manual",
							"help": "Manual"
						},
						"5": {
							"name": "TemporaryManual",
							"help": "Temporary Manual"
						},
						"6": {
							"name": "Automatic",
							"help": "Automatic"
						},
						"7": {
							"name": "ManualTimed",
							"help": "Manual timed"
						}
					}
				}
			]
		} as CommandDefinition;

		static matches(packet: Packet): boolean {
			return packet.tryAs(ThermostatHeatingV1)?.command === this.command;
		}

		constructor(data: Buffer | ThermostatHeatingV1ThermostatHeatingModeSetData) {
			super(ThermostatHeatingModeSet, data);
		}
	};

	public static readonly ThermostatHeatingRelayStatusGet = class ThermostatHeatingRelayStatusGet extends CommandPacket<void> {
		public static readonly CommandClass = ThermostatHeatingV1;
		public static readonly command = 0x09;
		public static readonly definition = {
			"command": 9,
			"name": "ThermostatHeatingRelayStatusGet",
			"help": "Thermostat Heating Relay Status Get",
			"status": "active",
			"params": []
		} as CommandDefinition;

		static matches(packet: Packet): boolean {
			return packet.tryAs(ThermostatHeatingV1)?.command === this.command;
		}

		constructor(data: Buffer | void) {
			super(ThermostatHeatingRelayStatusGet, data);
		}
	};

	public static readonly ThermostatHeatingRelayStatusReport = class ThermostatHeatingRelayStatusReport extends CommandPacket<ThermostatHeatingV1ThermostatHeatingRelayStatusReportData> {
		public static readonly CommandClass = ThermostatHeatingV1;
		public static readonly command = 0x0a;
		public static readonly definition = {
			"command": 10,
			"name": "ThermostatHeatingRelayStatusReport",
			"help": "Thermostat Heating Relay Status Report",
			"status": "active",
			"params": [
				{
					"type": "enum",
					"name": "relayStatus",
					"help": "Relay Status",
					"length": 1,
					"values": {
						"0": {
							"name": "Off",
							"help": "off"
						},
						"1": {
							"name": "On",
							"help": "on"
						}
					}
				}
			]
		} as CommandDefinition;

		static matches(packet: Packet): boolean {
			return packet.tryAs(ThermostatHeatingV1)?.command === this.command;
		}

		constructor(data: Buffer | ThermostatHeatingV1ThermostatHeatingRelayStatusReportData) {
			super(ThermostatHeatingRelayStatusReport, data);
		}
	};

	public static readonly ThermostatHeatingSetpointGet = class ThermostatHeatingSetpointGet extends CommandPacket<ThermostatHeatingV1ThermostatHeatingSetpointGetData> {
		public static readonly CommandClass = ThermostatHeatingV1;
		public static readonly command = 0x05;
		public static readonly definition = {
			"command": 5,
			"name": "ThermostatHeatingSetpointGet",
			"help": "Thermostat Heating Setpoint Get",
			"status": "active",
			"params": [
				{
					"type": "integer",
					"name": "setpointNr",
					"help": "Setpoint Nr",
					"length": 1
				}
			]
		} as CommandDefinition;

		static matches(packet: Packet): boolean {
			return packet.tryAs(ThermostatHeatingV1)?.command === this.command;
		}

		constructor(data: Buffer | ThermostatHeatingV1ThermostatHeatingSetpointGetData) {
			super(ThermostatHeatingSetpointGet, data);
		}
	};

	public static readonly ThermostatHeatingSetpointReport = class ThermostatHeatingSetpointReport extends CommandPacket<ThermostatHeatingV1ThermostatHeatingSetpointReportData> {
		public static readonly CommandClass = ThermostatHeatingV1;
		public static readonly command = 0x06;
		public static readonly definition = {
			"command": 6,
			"name": "ThermostatHeatingSetpointReport",
			"help": "Thermostat Heating Setpoint Report",
			"status": "active",
			"params": [
				{
					"type": "integer",
					"name": "setpointNr",
					"help": "Setpoint Nr",
					"length": 1
				},
				{
					"type": "bitfield",
					"name": "properties1",
					"help": "Properties1",
					"length": 1,
					"fields": [
						{
							"type": "integer",
							"name": "precision",
							"mask": 224,
							"shift": 5
						},
						{
							"type": "integer",
							"name": "scale",
							"mask": 24,
							"shift": 3
						},
						{
							"type": "integer",
							"name": "size",
							"mask": 7,
							"shift": 0
						}
					]
				},
				{
					"type": "blob",
					"name": "value",
					"help": "Value",
					"length": {
						"name": "Properties1",
						"bitfield": {
							"mask": 7,
							"shift": 0,
							"name": "size"
						}
					}
				}
			]
		} as CommandDefinition;

		static matches(packet: Packet): boolean {
			return packet.tryAs(ThermostatHeatingV1)?.command === this.command;
		}

		constructor(data: Buffer | ThermostatHeatingV1ThermostatHeatingSetpointReportData) {
			super(ThermostatHeatingSetpointReport, data);
		}
	};

	public static readonly ThermostatHeatingSetpointSet = class ThermostatHeatingSetpointSet extends CommandPacket<ThermostatHeatingV1ThermostatHeatingSetpointSetData> {
		public static readonly CommandClass = ThermostatHeatingV1;
		public static readonly command = 0x04;
		public static readonly definition = {
			"command": 4,
			"name": "ThermostatHeatingSetpointSet",
			"help": "Thermostat Heating Setpoint Set",
			"status": "active",
			"params": [
				{
					"type": "integer",
					"name": "setpointNr",
					"help": "Setpoint Nr",
					"length": 1
				},
				{
					"type": "bitfield",
					"name": "properties1",
					"help": "Properties1",
					"length": 1,
					"fields": [
						{
							"type": "integer",
							"name": "precision",
							"mask": 224,
							"shift": 5
						},
						{
							"type": "integer",
							"name": "scale",
							"mask": 24,
							"shift": 3
						},
						{
							"type": "integer",
							"name": "size",
							"mask": 7,
							"shift": 0
						}
					]
				},
				{
					"type": "blob",
					"name": "value",
					"help": "Value",
					"length": {
						"name": "Properties1",
						"bitfield": {
							"mask": 7,
							"shift": 0,
							"name": "size"
						}
					}
				}
			]
		} as CommandDefinition;

		static matches(packet: Packet): boolean {
			return packet.tryAs(ThermostatHeatingV1)?.command === this.command;
		}

		constructor(data: Buffer | ThermostatHeatingV1ThermostatHeatingSetpointSetData) {
			super(ThermostatHeatingSetpointSet, data);
		}
	};

	public static readonly ThermostatHeatingStatusGet = class ThermostatHeatingStatusGet extends CommandPacket<void> {
		public static readonly CommandClass = ThermostatHeatingV1;
		public static readonly command = 0x0c;
		public static readonly definition = {
			"command": 12,
			"name": "ThermostatHeatingStatusGet",
			"help": "Thermostat Heating Status Get",
			"status": "active",
			"params": []
		} as CommandDefinition;

		static matches(packet: Packet): boolean {
			return packet.tryAs(ThermostatHeatingV1)?.command === this.command;
		}

		constructor(data: Buffer | void) {
			super(ThermostatHeatingStatusGet, data);
		}
	};

	public static readonly ThermostatHeatingStatusSet = class ThermostatHeatingStatusSet extends CommandPacket<ThermostatHeatingV1ThermostatHeatingStatusSetData> {
		public static readonly CommandClass = ThermostatHeatingV1;
		public static readonly command = 0x0b;
		public static readonly definition = {
			"command": 11,
			"name": "ThermostatHeatingStatusSet",
			"help": "Thermostat Heating Status Set",
			"status": "active",
			"params": [
				{
					"type": "enum",
					"name": "status",
					"help": "Status",
					"length": 1,
					"values": {
						"0": {
							"name": "Heating",
							"help": "Heating"
						},
						"1": {
							"name": "Cooling",
							"help": "Cooling"
						}
					}
				}
			]
		} as CommandDefinition;

		static matches(packet: Packet): boolean {
			return packet.tryAs(ThermostatHeatingV1)?.command === this.command;
		}

		constructor(data: Buffer | ThermostatHeatingV1ThermostatHeatingStatusSetData) {
			super(ThermostatHeatingStatusSet, data);
		}
	};

	public static readonly ThermostatHeatingTimedOffSet = class ThermostatHeatingTimedOffSet extends CommandPacket<ThermostatHeatingV1ThermostatHeatingTimedOffSetData> {
		public static readonly CommandClass = ThermostatHeatingV1;
		public static readonly command = 0x11;
		public static readonly definition = {
			"command": 17,
			"name": "ThermostatHeatingTimedOffSet",
			"help": "Thermostat Heating Timed Off Set",
			"status": "active",
			"params": [
				{
					"type": "integer",
					"name": "minutes",
					"help": "Minutes",
					"length": 1
				},
				{
					"type": "integer",
					"name": "hours",
					"help": "Hours",
					"length": 1
				}
			]
		} as CommandDefinition;

		static matches(packet: Packet): boolean {
			return packet.tryAs(ThermostatHeatingV1)?.command === this.command;
		}

		constructor(data: Buffer | ThermostatHeatingV1ThermostatHeatingTimedOffSetData) {
			super(ThermostatHeatingTimedOffSet, data);
		}
	};
}

export namespace ThermostatHeatingV1 {
	export type ThermostatHeatingStatusReport = InstanceType<typeof ThermostatHeatingV1.ThermostatHeatingStatusReport>;
	export type ThermostatHeatingModeGet = InstanceType<typeof ThermostatHeatingV1.ThermostatHeatingModeGet>;
	export type ThermostatHeatingModeReport = InstanceType<typeof ThermostatHeatingV1.ThermostatHeatingModeReport>;
	export type ThermostatHeatingModeSet = InstanceType<typeof ThermostatHeatingV1.ThermostatHeatingModeSet>;
	export type ThermostatHeatingRelayStatusGet = InstanceType<typeof ThermostatHeatingV1.ThermostatHeatingRelayStatusGet>;
	export type ThermostatHeatingRelayStatusReport = InstanceType<typeof ThermostatHeatingV1.ThermostatHeatingRelayStatusReport>;
	export type ThermostatHeatingSetpointGet = InstanceType<typeof ThermostatHeatingV1.ThermostatHeatingSetpointGet>;
	export type ThermostatHeatingSetpointReport = InstanceType<typeof ThermostatHeatingV1.ThermostatHeatingSetpointReport>;
	export type ThermostatHeatingSetpointSet = InstanceType<typeof ThermostatHeatingV1.ThermostatHeatingSetpointSet>;
	export type ThermostatHeatingStatusGet = InstanceType<typeof ThermostatHeatingV1.ThermostatHeatingStatusGet>;
	export type ThermostatHeatingStatusSet = InstanceType<typeof ThermostatHeatingV1.ThermostatHeatingStatusSet>;
	export type ThermostatHeatingTimedOffSet = InstanceType<typeof ThermostatHeatingV1.ThermostatHeatingTimedOffSet>;
}
