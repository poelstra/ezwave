/**
 * Command Class Thermostat Heating, version 1.
 *
 * Auto-generated, do not edit.
 */

import { CommandClasses, CommandClassPacket, CommandPacket, Packet } from "@ezwave/codec";
import { CommandDefinition, convertFromJsonCommand, JsonCommandDefinition } from "@ezwave/spec";

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
	value: Buffer; // variable length
}

export interface ThermostatHeatingV1ThermostatHeatingSetpointSetData {
	setpointNr: number; // 1 byte unsigned integer
	precision: number; // properties1[7..5]
	scale: number; // properties1[4..3]
	value: Buffer; // variable length
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
	public static readonly commandClass: number = CommandClasses.ThermostatHeating; // 0x38 (56)
	public static readonly version: number = 1;

	public static matches(packet: Packet): boolean {
		return packet.commandClass === this.commandClass;
	}

	public constructor(commandAndPayload: Buffer) {
		super(ThermostatHeatingV1, commandAndPayload);
	}
}

export class ThermostatHeatingStatusReport extends CommandPacket<ThermostatHeatingV1ThermostatHeatingStatusReportData> {
	public static readonly CommandClass: typeof ThermostatHeatingV1 = ThermostatHeatingV1;
	public static readonly command: number = 0x0d; // 13
	public static readonly definition: CommandDefinition = convertFromJsonCommand({
		"command": 13,
		"name": "ThermostatHeatingStatusReport",
		"help": "Thermostat Heating Heating Status Report",
		"status": "Active",
		"params": [
			{
				"type": "Enum",
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
	} as JsonCommandDefinition);

	public static matches(packet: Packet): boolean {
		return packet.tryAs(ThermostatHeatingV1)?.command === this.command;
	}

	public constructor(data: Buffer | ThermostatHeatingV1ThermostatHeatingStatusReportData) {
		super(ThermostatHeatingStatusReport, data);
	}
};

export class ThermostatHeatingModeGet extends CommandPacket<void> {
	public static readonly CommandClass: typeof ThermostatHeatingV1 = ThermostatHeatingV1;
	public static readonly command: number = 0x02; // 2
	public static readonly definition: CommandDefinition = convertFromJsonCommand({
		"command": 2,
		"name": "ThermostatHeatingModeGet",
		"help": "Thermostat Heating Mode Get",
		"status": "Active",
		"params": []
	} as JsonCommandDefinition);

	public static matches(packet: Packet): boolean {
		return packet.tryAs(ThermostatHeatingV1)?.command === this.command;
	}

	public constructor(data: Buffer | void) {
		super(ThermostatHeatingModeGet, data);
	}
};

export class ThermostatHeatingModeReport extends CommandPacket<ThermostatHeatingV1ThermostatHeatingModeReportData> {
	public static readonly CommandClass: typeof ThermostatHeatingV1 = ThermostatHeatingV1;
	public static readonly command: number = 0x03; // 3
	public static readonly definition: CommandDefinition = convertFromJsonCommand({
		"command": 3,
		"name": "ThermostatHeatingModeReport",
		"help": "Thermostat Heating Mode Report",
		"status": "Active",
		"params": [
			{
				"type": "Enum",
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
	} as JsonCommandDefinition);

	public static matches(packet: Packet): boolean {
		return packet.tryAs(ThermostatHeatingV1)?.command === this.command;
	}

	public constructor(data: Buffer | ThermostatHeatingV1ThermostatHeatingModeReportData) {
		super(ThermostatHeatingModeReport, data);
	}
};

export class ThermostatHeatingModeSet extends CommandPacket<ThermostatHeatingV1ThermostatHeatingModeSetData> {
	public static readonly CommandClass: typeof ThermostatHeatingV1 = ThermostatHeatingV1;
	public static readonly command: number = 0x01; // 1
	public static readonly definition: CommandDefinition = convertFromJsonCommand({
		"command": 1,
		"name": "ThermostatHeatingModeSet",
		"help": "Thermostat Heating Mode Set",
		"status": "Active",
		"params": [
			{
				"type": "Enum",
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
	} as JsonCommandDefinition);

	public static matches(packet: Packet): boolean {
		return packet.tryAs(ThermostatHeatingV1)?.command === this.command;
	}

	public constructor(data: Buffer | ThermostatHeatingV1ThermostatHeatingModeSetData) {
		super(ThermostatHeatingModeSet, data);
	}
};

export class ThermostatHeatingRelayStatusGet extends CommandPacket<void> {
	public static readonly CommandClass: typeof ThermostatHeatingV1 = ThermostatHeatingV1;
	public static readonly command: number = 0x09; // 9
	public static readonly definition: CommandDefinition = convertFromJsonCommand({
		"command": 9,
		"name": "ThermostatHeatingRelayStatusGet",
		"help": "Thermostat Heating Relay Status Get",
		"status": "Active",
		"params": []
	} as JsonCommandDefinition);

	public static matches(packet: Packet): boolean {
		return packet.tryAs(ThermostatHeatingV1)?.command === this.command;
	}

	public constructor(data: Buffer | void) {
		super(ThermostatHeatingRelayStatusGet, data);
	}
};

export class ThermostatHeatingRelayStatusReport extends CommandPacket<ThermostatHeatingV1ThermostatHeatingRelayStatusReportData> {
	public static readonly CommandClass: typeof ThermostatHeatingV1 = ThermostatHeatingV1;
	public static readonly command: number = 0x0a; // 10
	public static readonly definition: CommandDefinition = convertFromJsonCommand({
		"command": 10,
		"name": "ThermostatHeatingRelayStatusReport",
		"help": "Thermostat Heating Relay Status Report",
		"status": "Active",
		"params": [
			{
				"type": "Enum",
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
	} as JsonCommandDefinition);

	public static matches(packet: Packet): boolean {
		return packet.tryAs(ThermostatHeatingV1)?.command === this.command;
	}

	public constructor(data: Buffer | ThermostatHeatingV1ThermostatHeatingRelayStatusReportData) {
		super(ThermostatHeatingRelayStatusReport, data);
	}
};

export class ThermostatHeatingSetpointGet extends CommandPacket<ThermostatHeatingV1ThermostatHeatingSetpointGetData> {
	public static readonly CommandClass: typeof ThermostatHeatingV1 = ThermostatHeatingV1;
	public static readonly command: number = 0x05; // 5
	public static readonly definition: CommandDefinition = convertFromJsonCommand({
		"command": 5,
		"name": "ThermostatHeatingSetpointGet",
		"help": "Thermostat Heating Setpoint Get",
		"status": "Active",
		"params": [
			{
				"type": "Integer",
				"name": "setpointNr",
				"help": "Setpoint Nr",
				"length": 1
			}
		]
	} as JsonCommandDefinition);

	public static matches(packet: Packet): boolean {
		return packet.tryAs(ThermostatHeatingV1)?.command === this.command;
	}

	public constructor(data: Buffer | ThermostatHeatingV1ThermostatHeatingSetpointGetData) {
		super(ThermostatHeatingSetpointGet, data);
	}
};

export class ThermostatHeatingSetpointReport extends CommandPacket<ThermostatHeatingV1ThermostatHeatingSetpointReportData> {
	public static readonly CommandClass: typeof ThermostatHeatingV1 = ThermostatHeatingV1;
	public static readonly command: number = 0x06; // 6
	public static readonly definition: CommandDefinition = convertFromJsonCommand({
		"command": 6,
		"name": "ThermostatHeatingSetpointReport",
		"help": "Thermostat Heating Setpoint Report",
		"status": "Active",
		"params": [
			{
				"type": "Integer",
				"name": "setpointNr",
				"help": "Setpoint Nr",
				"length": 1
			},
			{
				"type": "Bitfield",
				"name": "properties1",
				"help": "Properties1",
				"length": 1,
				"fields": [
					{
						"fieldType": "Integer",
						"name": "precision",
						"mask": 224,
						"shift": 5
					},
					{
						"fieldType": "Integer",
						"name": "scale",
						"mask": 24,
						"shift": 3
					},
					{
						"fieldType": "Integer",
						"name": "size",
						"mask": 7,
						"shift": 0,
						"lengthOf": {
							"refs": [
								"value"
							]
						},
						"isAutogenerated": true
					}
				]
			},
			{
				"type": "Blob",
				"name": "value",
				"help": "Value",
				"length": {
					"lengthType": "Ref",
					"from": {
						"ref": "properties1.size"
					}
				}
			}
		]
	} as JsonCommandDefinition);

	public static matches(packet: Packet): boolean {
		return packet.tryAs(ThermostatHeatingV1)?.command === this.command;
	}

	public constructor(data: Buffer | ThermostatHeatingV1ThermostatHeatingSetpointReportData) {
		super(ThermostatHeatingSetpointReport, data);
	}
};

export class ThermostatHeatingSetpointSet extends CommandPacket<ThermostatHeatingV1ThermostatHeatingSetpointSetData> {
	public static readonly CommandClass: typeof ThermostatHeatingV1 = ThermostatHeatingV1;
	public static readonly command: number = 0x04; // 4
	public static readonly definition: CommandDefinition = convertFromJsonCommand({
		"command": 4,
		"name": "ThermostatHeatingSetpointSet",
		"help": "Thermostat Heating Setpoint Set",
		"status": "Active",
		"params": [
			{
				"type": "Integer",
				"name": "setpointNr",
				"help": "Setpoint Nr",
				"length": 1
			},
			{
				"type": "Bitfield",
				"name": "properties1",
				"help": "Properties1",
				"length": 1,
				"fields": [
					{
						"fieldType": "Integer",
						"name": "precision",
						"mask": 224,
						"shift": 5
					},
					{
						"fieldType": "Integer",
						"name": "scale",
						"mask": 24,
						"shift": 3
					},
					{
						"fieldType": "Integer",
						"name": "size",
						"mask": 7,
						"shift": 0,
						"lengthOf": {
							"refs": [
								"value"
							]
						},
						"isAutogenerated": true
					}
				]
			},
			{
				"type": "Blob",
				"name": "value",
				"help": "Value",
				"length": {
					"lengthType": "Ref",
					"from": {
						"ref": "properties1.size"
					}
				}
			}
		]
	} as JsonCommandDefinition);

	public static matches(packet: Packet): boolean {
		return packet.tryAs(ThermostatHeatingV1)?.command === this.command;
	}

	public constructor(data: Buffer | ThermostatHeatingV1ThermostatHeatingSetpointSetData) {
		super(ThermostatHeatingSetpointSet, data);
	}
};

export class ThermostatHeatingStatusGet extends CommandPacket<void> {
	public static readonly CommandClass: typeof ThermostatHeatingV1 = ThermostatHeatingV1;
	public static readonly command: number = 0x0c; // 12
	public static readonly definition: CommandDefinition = convertFromJsonCommand({
		"command": 12,
		"name": "ThermostatHeatingStatusGet",
		"help": "Thermostat Heating Status Get",
		"status": "Active",
		"params": []
	} as JsonCommandDefinition);

	public static matches(packet: Packet): boolean {
		return packet.tryAs(ThermostatHeatingV1)?.command === this.command;
	}

	public constructor(data: Buffer | void) {
		super(ThermostatHeatingStatusGet, data);
	}
};

export class ThermostatHeatingStatusSet extends CommandPacket<ThermostatHeatingV1ThermostatHeatingStatusSetData> {
	public static readonly CommandClass: typeof ThermostatHeatingV1 = ThermostatHeatingV1;
	public static readonly command: number = 0x0b; // 11
	public static readonly definition: CommandDefinition = convertFromJsonCommand({
		"command": 11,
		"name": "ThermostatHeatingStatusSet",
		"help": "Thermostat Heating Status Set",
		"status": "Active",
		"params": [
			{
				"type": "Enum",
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
	} as JsonCommandDefinition);

	public static matches(packet: Packet): boolean {
		return packet.tryAs(ThermostatHeatingV1)?.command === this.command;
	}

	public constructor(data: Buffer | ThermostatHeatingV1ThermostatHeatingStatusSetData) {
		super(ThermostatHeatingStatusSet, data);
	}
};

export class ThermostatHeatingTimedOffSet extends CommandPacket<ThermostatHeatingV1ThermostatHeatingTimedOffSetData> {
	public static readonly CommandClass: typeof ThermostatHeatingV1 = ThermostatHeatingV1;
	public static readonly command: number = 0x11; // 17
	public static readonly definition: CommandDefinition = convertFromJsonCommand({
		"command": 17,
		"name": "ThermostatHeatingTimedOffSet",
		"help": "Thermostat Heating Timed Off Set",
		"status": "Active",
		"params": [
			{
				"type": "Integer",
				"name": "minutes",
				"help": "Minutes",
				"length": 1
			},
			{
				"type": "Integer",
				"name": "hours",
				"help": "Hours",
				"length": 1
			}
		]
	} as JsonCommandDefinition);

	public static matches(packet: Packet): boolean {
		return packet.tryAs(ThermostatHeatingV1)?.command === this.command;
	}

	public constructor(data: Buffer | ThermostatHeatingV1ThermostatHeatingTimedOffSetData) {
		super(ThermostatHeatingTimedOffSet, data);
	}
};
