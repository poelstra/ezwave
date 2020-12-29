/**
 * Command Class Irrigation, version 1.
 *
 * Auto-generated, do not edit.
 */

import { CommandClassPacket, CommandPacket } from "../commands/command";
import { Packet } from "../commands/packet";
import { CommandDefinition } from "../commands/types";
import CommandClasses from "../generated/CommandClasses";

export enum IrrigationV1Commands {
	IrrigationSystemInfoGet = 0x01,
	IrrigationSystemInfoReport = 0x02,
	IrrigationSystemStatusGet = 0x03,
	IrrigationSystemStatusReport = 0x04,
	IrrigationSystemConfigSet = 0x05,
	IrrigationSystemConfigGet = 0x06,
	IrrigationSystemConfigReport = 0x07,
	IrrigationValveInfoGet = 0x08,
	IrrigationValveInfoReport = 0x09,
	IrrigationValveConfigSet = 0x0a,
	IrrigationValveConfigGet = 0x0b,
	IrrigationValveConfigReport = 0x0c,
	IrrigationValveRun = 0x0d,
	IrrigationValveTableSet = 0x0e,
	IrrigationValveTableGet = 0x0f,
	IrrigationValveTableReport = 0x10,
	IrrigationValveTableRun = 0x11,
	IrrigationSystemShutoff = 0x12,
}

export interface IrrigationV1IrrigationSystemInfoReportData {
	// TODO param properties1 type bitfield
	totalNumberOfValves: number; // 1 byte unsigned integer
	totalNumberOfValveTables: number; // 1 byte unsigned integer
	// TODO param properties2 type bitfield
}

export interface IrrigationV1IrrigationSystemStatusReportData {
	systemVoltage: number; // 1 byte unsigned integer
	sensorStatus: SensorStatusEnum; // 1 byte enum value
	// TODO param properties1 type bitfield
	// TODO param flowValue type blob
	// TODO param properties2 type bitfield
	// TODO param pressureValue type blob
	shutoffDuration: number; // 1 byte unsigned integer
	systemErrorStatus: number; // 0 byte unsigned integer
	// TODO param properties3 type bitfield
	valveID: number; // 1 byte unsigned integer
}

export interface IrrigationV1IrrigationSystemConfigSetData {
	masterValveDelay: number; // 1 byte unsigned integer
	// TODO param properties1 type bitfield
	// TODO param highPressureThresholdValue type blob
	// TODO param properties2 type bitfield
	// TODO param lowPressureThresholdValue type blob
	sensorPolarity: number; // 0 byte unsigned integer
}

export interface IrrigationV1IrrigationSystemConfigReportData {
	masterValveDelay: number; // 1 byte unsigned integer
	// TODO param properties1 type bitfield
	// TODO param highPressureThresholdValue type blob
	// TODO param properties2 type bitfield
	// TODO param lowPressureThresholdValue type blob
	sensorPolarity: number; // 0 byte unsigned integer
}

export interface IrrigationV1IrrigationValveInfoGetData {
	// TODO param properties1 type bitfield
	valveID: number; // 1 byte unsigned integer
}

export interface IrrigationV1IrrigationValveInfoReportData {
	// TODO param properties1 type bitfield
	valveID: number; // 1 byte unsigned integer
	nominalCurrent: number; // 1 byte unsigned integer
	valveErrorStatus: number; // 0 byte unsigned integer
}

export interface IrrigationV1IrrigationValveConfigSetData {
	// TODO param properties1 type bitfield
	valveID: number; // 1 byte unsigned integer
	nominalCurrentHighThreshold: number; // 1 byte unsigned integer
	nominalCurrentLowThreshold: number; // 1 byte unsigned integer
	// TODO param properties2 type bitfield
	// TODO param maximumFlowValue type blob
	// TODO param properties3 type bitfield
	// TODO param flowHighThresholdValue type blob
	// TODO param properties4 type bitfield
	// TODO param flowLowThresholdValue type blob
	sensorUsage: number; // 0 byte unsigned integer
}

export interface IrrigationV1IrrigationValveConfigGetData {
	// TODO param properties1 type bitfield
	valveID: number; // 1 byte unsigned integer
}

export interface IrrigationV1IrrigationValveConfigReportData {
	// TODO param properties1 type bitfield
	valveID: number; // 1 byte unsigned integer
	nominalCurrentHighThreshold: number; // 1 byte unsigned integer
	nominalCurrentLowThreshold: number; // 1 byte unsigned integer
	// TODO param properties2 type bitfield
	// TODO param maximumFlowValue type blob
	// TODO param properties3 type bitfield
	// TODO param flowHighThresholdValue type blob
	// TODO param properties4 type bitfield
	// TODO param flowLowThresholdValue type blob
	sensorUsage: number; // 0 byte unsigned integer
}

export interface IrrigationV1IrrigationValveRunData {
	// TODO param properties1 type bitfield
	valveID: number; // 1 byte unsigned integer
	duration: number; // 2 byte unsigned integer
}

export interface IrrigationV1IrrigationValveTableSetData {
	valveTableID: number; // 1 byte unsigned integer
	// TODO param vg1 type group
}

export interface IrrigationV1IrrigationValveTableGetData {
	valveTableID: number; // 1 byte unsigned integer
}

export interface IrrigationV1IrrigationValveTableReportData {
	valveTableID: number; // 1 byte unsigned integer
	// TODO param vg1 type group
}

export interface IrrigationV1IrrigationValveTableRunData {
	// TODO param valveTableID type blob
}

export interface IrrigationV1IrrigationSystemShutoffData {
	duration: number; // 1 byte unsigned integer
}

export class IrrigationV1 extends CommandClassPacket<IrrigationV1Commands> {
	public static readonly commandClass = CommandClasses.Irrigation; // 0x6b (107)

	public static matches(packet: Packet): boolean {
		return packet.commandClass === this.commandClass;
	}

	constructor(commandAndPayload: Buffer) {
		super(IrrigationV1, commandAndPayload);
	}

	public static readonly IrrigationSystemInfoGet = class IrrigationSystemInfoGet extends CommandPacket<void> {
		public static readonly CommandClass = IrrigationV1;
		public static readonly command = 0x01;
		public static readonly definition = {
			"command": 1,
			"name": "IrrigationSystemInfoGet",
			"help": "Irrigation System Info Get",
			"status": "active",
			"params": []
		} as CommandDefinition;

		static matches(packet: Packet): boolean {
			return packet.tryAs(IrrigationV1)?.command === this.command;
		}

		constructor(data: Buffer | void) {
			super(IrrigationSystemInfoGet, data);
		}
	};

	public static readonly IrrigationSystemInfoReport = class IrrigationSystemInfoReport extends CommandPacket<IrrigationV1IrrigationSystemInfoReportData> {
		public static readonly CommandClass = IrrigationV1;
		public static readonly command = 0x02;
		public static readonly definition = {
			"command": 2,
			"name": "IrrigationSystemInfoReport",
			"help": "Irrigation System Info Report",
			"status": "active",
			"params": [
				{
					"type": "bitfield",
					"name": "properties1",
					"help": "Properties1",
					"length": 1,
					"fields": [
						{
							"type": "boolean",
							"name": "Master Valve",
							"mask": 1,
							"shift": 0
						},
						{
							"type": "integer",
							"name": "Reserved1",
							"mask": 6,
							"shift": 1
						},
						{
							"type": "integer",
							"name": "Reserved2",
							"mask": 24,
							"shift": 3
						},
						{
							"type": "integer",
							"name": "Reserved3",
							"mask": 224,
							"shift": 5
						}
					]
				},
				{
					"type": "integer",
					"name": "totalNumberOfValves",
					"help": "Total Number of Valves",
					"length": 1
				},
				{
					"type": "integer",
					"name": "totalNumberOfValveTables",
					"help": "Total Number of Valve Tables",
					"length": 1
				},
				{
					"type": "bitfield",
					"name": "properties2",
					"help": "Properties2",
					"length": 1,
					"fields": [
						{
							"type": "integer",
							"name": "Valve Table Max Size",
							"mask": 15,
							"shift": 0
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
			return packet.tryAs(IrrigationV1)?.command === this.command;
		}

		constructor(data: Buffer | IrrigationV1IrrigationSystemInfoReportData) {
			super(IrrigationSystemInfoReport, data);
		}
	};

	public static readonly IrrigationSystemStatusGet = class IrrigationSystemStatusGet extends CommandPacket<void> {
		public static readonly CommandClass = IrrigationV1;
		public static readonly command = 0x03;
		public static readonly definition = {
			"command": 3,
			"name": "IrrigationSystemStatusGet",
			"help": "Irrigation System Status Get",
			"status": "active",
			"params": []
		} as CommandDefinition;

		static matches(packet: Packet): boolean {
			return packet.tryAs(IrrigationV1)?.command === this.command;
		}

		constructor(data: Buffer | void) {
			super(IrrigationSystemStatusGet, data);
		}
	};

	public static readonly IrrigationSystemStatusReport = class IrrigationSystemStatusReport extends CommandPacket<IrrigationV1IrrigationSystemStatusReportData> {
		public static readonly CommandClass = IrrigationV1;
		public static readonly command = 0x04;
		public static readonly definition = {
			"command": 4,
			"name": "IrrigationSystemStatusReport",
			"help": "Irrigation System Status Report",
			"status": "active",
			"params": [
				{
					"type": "integer",
					"name": "systemVoltage",
					"help": "System Voltage",
					"length": 1
				},
				{
					"type": "enum",
					"name": "sensorStatus",
					"help": "Sensor Status",
					"length": 1,
					"values": {
						"0": "Flow Sensor Detected",
						"1": "Pressure Sensor Detected",
						"2": "Rain Sensor Detected",
						"3": "Moisture Sensor Detected"
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
							"name": "Flow Size",
							"mask": 7,
							"shift": 0
						},
						{
							"type": "integer",
							"name": "Flow Scale",
							"mask": 24,
							"shift": 3
						},
						{
							"type": "integer",
							"name": "Flow Precision",
							"mask": 224,
							"shift": 5
						}
					]
				},
				{
					"type": "blob",
					"name": "flowValue",
					"help": "Flow Value",
					"length": {
						"name": "Properties1",
						"mask": 7,
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
							"name": "Pressure Size",
							"mask": 7,
							"shift": 0
						},
						{
							"type": "integer",
							"name": "Pressure Scale",
							"mask": 24,
							"shift": 3
						},
						{
							"type": "integer",
							"name": "Pressure Precision",
							"mask": 224,
							"shift": 5
						}
					]
				},
				{
					"type": "blob",
					"name": "pressureValue",
					"help": "Pressure Value",
					"length": {
						"name": "Properties2",
						"mask": 7,
						"shift": 0
					}
				},
				{
					"type": "integer",
					"name": "shutoffDuration",
					"help": "Shutoff Duration",
					"length": 1
				},
				{
					"type": "integer",
					"name": "systemErrorStatus",
					"help": "System Error Status",
					"length": 0
				},
				{
					"type": "bitfield",
					"name": "properties3",
					"help": "Properties3",
					"length": 1,
					"fields": [
						{
							"type": "boolean",
							"name": "Master Valve",
							"mask": 1,
							"shift": 0
						},
						{
							"type": "integer",
							"name": "Reserved",
							"mask": 254,
							"shift": 1
						}
					]
				},
				{
					"type": "integer",
					"name": "valveID",
					"help": "Valve ID",
					"length": 1
				}
			]
		} as CommandDefinition;

		static matches(packet: Packet): boolean {
			return packet.tryAs(IrrigationV1)?.command === this.command;
		}

		constructor(data: Buffer | IrrigationV1IrrigationSystemStatusReportData) {
			super(IrrigationSystemStatusReport, data);
		}
	};

	public static readonly IrrigationSystemConfigSet = class IrrigationSystemConfigSet extends CommandPacket<IrrigationV1IrrigationSystemConfigSetData> {
		public static readonly CommandClass = IrrigationV1;
		public static readonly command = 0x05;
		public static readonly definition = {
			"command": 5,
			"name": "IrrigationSystemConfigSet",
			"help": "Irrigation System Config Set",
			"status": "active",
			"params": [
				{
					"type": "integer",
					"name": "masterValveDelay",
					"help": "Master Valve Delay",
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
							"name": "High Pressure Threshold Size",
							"mask": 7,
							"shift": 0
						},
						{
							"type": "integer",
							"name": "High Pressure Threshold Scale",
							"mask": 24,
							"shift": 3
						},
						{
							"type": "integer",
							"name": "High Pressure Threshold Precision",
							"mask": 224,
							"shift": 5
						}
					]
				},
				{
					"type": "blob",
					"name": "highPressureThresholdValue",
					"help": "High Pressure Threshold Value",
					"length": {
						"name": "Properties1",
						"mask": 7,
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
							"name": "Low Pressure Threshold Size",
							"mask": 7,
							"shift": 0
						},
						{
							"type": "integer",
							"name": "Low Pressure Threshold Scale",
							"mask": 24,
							"shift": 3
						},
						{
							"type": "integer",
							"name": "Low Pressure Threshold Precision",
							"mask": 224,
							"shift": 5
						}
					]
				},
				{
					"type": "blob",
					"name": "lowPressureThresholdValue",
					"help": "Low Pressure Threshold Value",
					"length": {
						"name": "Properties2",
						"mask": 7,
						"shift": 0
					}
				},
				{
					"type": "integer",
					"name": "sensorPolarity",
					"help": "Sensor Polarity",
					"length": 0
				}
			]
		} as CommandDefinition;

		static matches(packet: Packet): boolean {
			return packet.tryAs(IrrigationV1)?.command === this.command;
		}

		constructor(data: Buffer | IrrigationV1IrrigationSystemConfigSetData) {
			super(IrrigationSystemConfigSet, data);
		}
	};

	public static readonly IrrigationSystemConfigGet = class IrrigationSystemConfigGet extends CommandPacket<void> {
		public static readonly CommandClass = IrrigationV1;
		public static readonly command = 0x06;
		public static readonly definition = {
			"command": 6,
			"name": "IrrigationSystemConfigGet",
			"help": "Irrigation System Config Get",
			"status": "active",
			"params": []
		} as CommandDefinition;

		static matches(packet: Packet): boolean {
			return packet.tryAs(IrrigationV1)?.command === this.command;
		}

		constructor(data: Buffer | void) {
			super(IrrigationSystemConfigGet, data);
		}
	};

	public static readonly IrrigationSystemConfigReport = class IrrigationSystemConfigReport extends CommandPacket<IrrigationV1IrrigationSystemConfigReportData> {
		public static readonly CommandClass = IrrigationV1;
		public static readonly command = 0x07;
		public static readonly definition = {
			"command": 7,
			"name": "IrrigationSystemConfigReport",
			"help": "Irrigation System Config Report",
			"status": "active",
			"params": [
				{
					"type": "integer",
					"name": "masterValveDelay",
					"help": "Master Valve Delay",
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
							"name": "High Pressure Threshold Size",
							"mask": 7,
							"shift": 0
						},
						{
							"type": "integer",
							"name": "High Pressure Threshold Scale",
							"mask": 24,
							"shift": 3
						},
						{
							"type": "integer",
							"name": "High Pressure Threshold Precision",
							"mask": 224,
							"shift": 5
						}
					]
				},
				{
					"type": "blob",
					"name": "highPressureThresholdValue",
					"help": "High Pressure Threshold Value",
					"length": {
						"name": "Properties1",
						"mask": 7,
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
							"name": "Low Pressure Threshold Size",
							"mask": 7,
							"shift": 0
						},
						{
							"type": "integer",
							"name": "Low Pressure Threshold Scale",
							"mask": 24,
							"shift": 3
						},
						{
							"type": "integer",
							"name": "Low Pressure Threshold Precision",
							"mask": 224,
							"shift": 5
						}
					]
				},
				{
					"type": "blob",
					"name": "lowPressureThresholdValue",
					"help": "Low Pressure Threshold Value",
					"length": {
						"name": "Properties2",
						"mask": 7,
						"shift": 0
					}
				},
				{
					"type": "integer",
					"name": "sensorPolarity",
					"help": "Sensor Polarity",
					"length": 0
				}
			]
		} as CommandDefinition;

		static matches(packet: Packet): boolean {
			return packet.tryAs(IrrigationV1)?.command === this.command;
		}

		constructor(data: Buffer | IrrigationV1IrrigationSystemConfigReportData) {
			super(IrrigationSystemConfigReport, data);
		}
	};

	public static readonly IrrigationValveInfoGet = class IrrigationValveInfoGet extends CommandPacket<IrrigationV1IrrigationValveInfoGetData> {
		public static readonly CommandClass = IrrigationV1;
		public static readonly command = 0x08;
		public static readonly definition = {
			"command": 8,
			"name": "IrrigationValveInfoGet",
			"help": "Irrigation Valve Info Get",
			"status": "active",
			"params": [
				{
					"type": "bitfield",
					"name": "properties1",
					"help": "Properties1",
					"length": 1,
					"fields": [
						{
							"type": "boolean",
							"name": "Master Valve",
							"mask": 1,
							"shift": 0
						},
						{
							"type": "integer",
							"name": "Reserved",
							"mask": 254,
							"shift": 1
						}
					]
				},
				{
					"type": "integer",
					"name": "valveID",
					"help": "Valve ID",
					"length": 1
				}
			]
		} as CommandDefinition;

		static matches(packet: Packet): boolean {
			return packet.tryAs(IrrigationV1)?.command === this.command;
		}

		constructor(data: Buffer | IrrigationV1IrrigationValveInfoGetData) {
			super(IrrigationValveInfoGet, data);
		}
	};

	public static readonly IrrigationValveInfoReport = class IrrigationValveInfoReport extends CommandPacket<IrrigationV1IrrigationValveInfoReportData> {
		public static readonly CommandClass = IrrigationV1;
		public static readonly command = 0x09;
		public static readonly definition = {
			"command": 9,
			"name": "IrrigationValveInfoReport",
			"help": "Irrigation Valve Info Report",
			"status": "active",
			"params": [
				{
					"type": "bitfield",
					"name": "properties1",
					"help": "Properties1",
					"length": 1,
					"fields": [
						{
							"type": "boolean",
							"name": "Master",
							"mask": 1,
							"shift": 0
						},
						{
							"type": "boolean",
							"name": "Connected",
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
				},
				{
					"type": "integer",
					"name": "valveID",
					"help": "Valve ID",
					"length": 1
				},
				{
					"type": "integer",
					"name": "nominalCurrent",
					"help": "Nominal Current",
					"length": 1
				},
				{
					"type": "integer",
					"name": "valveErrorStatus",
					"help": "Valve Error Status",
					"length": 0
				}
			]
		} as CommandDefinition;

		static matches(packet: Packet): boolean {
			return packet.tryAs(IrrigationV1)?.command === this.command;
		}

		constructor(data: Buffer | IrrigationV1IrrigationValveInfoReportData) {
			super(IrrigationValveInfoReport, data);
		}
	};

	public static readonly IrrigationValveConfigSet = class IrrigationValveConfigSet extends CommandPacket<IrrigationV1IrrigationValveConfigSetData> {
		public static readonly CommandClass = IrrigationV1;
		public static readonly command = 0x0a;
		public static readonly definition = {
			"command": 10,
			"name": "IrrigationValveConfigSet",
			"help": "Irrigation Valve Config Set",
			"status": "active",
			"params": [
				{
					"type": "bitfield",
					"name": "properties1",
					"help": "Properties1",
					"length": 1,
					"fields": [
						{
							"type": "boolean",
							"name": "Master Valve",
							"mask": 1,
							"shift": 0
						},
						{
							"type": "integer",
							"name": "Reserved",
							"mask": 254,
							"shift": 1
						}
					]
				},
				{
					"type": "integer",
					"name": "valveID",
					"help": "Valve ID",
					"length": 1
				},
				{
					"type": "integer",
					"name": "nominalCurrentHighThreshold",
					"help": "Nominal Current High Threshold",
					"length": 1
				},
				{
					"type": "integer",
					"name": "nominalCurrentLowThreshold",
					"help": "Nominal Current Low Threshold",
					"length": 1
				},
				{
					"type": "bitfield",
					"name": "properties2",
					"help": "Properties2",
					"length": 1,
					"fields": [
						{
							"type": "integer",
							"name": "Maximum Flow Size",
							"mask": 7,
							"shift": 0
						},
						{
							"type": "integer",
							"name": "Maximum Flow Scale",
							"mask": 24,
							"shift": 3
						},
						{
							"type": "integer",
							"name": "Maximum Flow Precision",
							"mask": 224,
							"shift": 5
						}
					]
				},
				{
					"type": "blob",
					"name": "maximumFlowValue",
					"help": "Maximum Flow Value",
					"length": {
						"name": "Properties2",
						"mask": 7,
						"shift": 0
					}
				},
				{
					"type": "bitfield",
					"name": "properties3",
					"help": "Properties3",
					"length": 1,
					"fields": [
						{
							"type": "integer",
							"name": "Flow High Threshold Size",
							"mask": 7,
							"shift": 0
						},
						{
							"type": "integer",
							"name": "Flow High Threshold Scale",
							"mask": 24,
							"shift": 3
						},
						{
							"type": "integer",
							"name": "Flow High Threshold Precision",
							"mask": 224,
							"shift": 5
						}
					]
				},
				{
					"type": "blob",
					"name": "flowHighThresholdValue",
					"help": "Flow High Threshold Value",
					"length": {
						"name": "Properties3",
						"mask": 7,
						"shift": 0
					}
				},
				{
					"type": "bitfield",
					"name": "properties4",
					"help": "Properties4",
					"length": 1,
					"fields": [
						{
							"type": "integer",
							"name": "Flow Low Threshold Size",
							"mask": 7,
							"shift": 0
						},
						{
							"type": "integer",
							"name": "Flow Low Threshold Scale",
							"mask": 24,
							"shift": 3
						},
						{
							"type": "integer",
							"name": "Flow Low Threshold Precision",
							"mask": 224,
							"shift": 5
						}
					]
				},
				{
					"type": "blob",
					"name": "flowLowThresholdValue",
					"help": "Flow Low Threshold Value",
					"length": {
						"name": "Properties4",
						"mask": 7,
						"shift": 0
					}
				},
				{
					"type": "integer",
					"name": "sensorUsage",
					"help": "Sensor Usage",
					"length": 0
				}
			]
		} as CommandDefinition;

		static matches(packet: Packet): boolean {
			return packet.tryAs(IrrigationV1)?.command === this.command;
		}

		constructor(data: Buffer | IrrigationV1IrrigationValveConfigSetData) {
			super(IrrigationValveConfigSet, data);
		}
	};

	public static readonly IrrigationValveConfigGet = class IrrigationValveConfigGet extends CommandPacket<IrrigationV1IrrigationValveConfigGetData> {
		public static readonly CommandClass = IrrigationV1;
		public static readonly command = 0x0b;
		public static readonly definition = {
			"command": 11,
			"name": "IrrigationValveConfigGet",
			"help": "Irrigation Valve Config Get",
			"status": "active",
			"params": [
				{
					"type": "bitfield",
					"name": "properties1",
					"help": "Properties1",
					"length": 1,
					"fields": [
						{
							"type": "boolean",
							"name": "Master Valve",
							"mask": 1,
							"shift": 0
						},
						{
							"type": "integer",
							"name": "Reserved",
							"mask": 254,
							"shift": 1
						}
					]
				},
				{
					"type": "integer",
					"name": "valveID",
					"help": "Valve ID",
					"length": 1
				}
			]
		} as CommandDefinition;

		static matches(packet: Packet): boolean {
			return packet.tryAs(IrrigationV1)?.command === this.command;
		}

		constructor(data: Buffer | IrrigationV1IrrigationValveConfigGetData) {
			super(IrrigationValveConfigGet, data);
		}
	};

	public static readonly IrrigationValveConfigReport = class IrrigationValveConfigReport extends CommandPacket<IrrigationV1IrrigationValveConfigReportData> {
		public static readonly CommandClass = IrrigationV1;
		public static readonly command = 0x0c;
		public static readonly definition = {
			"command": 12,
			"name": "IrrigationValveConfigReport",
			"help": "Irrigation Valve Config Report",
			"status": "active",
			"params": [
				{
					"type": "bitfield",
					"name": "properties1",
					"help": "Properties1",
					"length": 1,
					"fields": [
						{
							"type": "boolean",
							"name": "Master Valve",
							"mask": 1,
							"shift": 0
						},
						{
							"type": "integer",
							"name": "Reserved",
							"mask": 254,
							"shift": 1
						}
					]
				},
				{
					"type": "integer",
					"name": "valveID",
					"help": "Valve ID",
					"length": 1
				},
				{
					"type": "integer",
					"name": "nominalCurrentHighThreshold",
					"help": "Nominal Current High Threshold",
					"length": 1
				},
				{
					"type": "integer",
					"name": "nominalCurrentLowThreshold",
					"help": "Nominal Current Low Threshold",
					"length": 1
				},
				{
					"type": "bitfield",
					"name": "properties2",
					"help": "Properties2",
					"length": 1,
					"fields": [
						{
							"type": "integer",
							"name": "Maximum Flow Size",
							"mask": 7,
							"shift": 0
						},
						{
							"type": "integer",
							"name": "Maximum Flow Scale",
							"mask": 24,
							"shift": 3
						},
						{
							"type": "integer",
							"name": "Maximum Flow Precision",
							"mask": 224,
							"shift": 5
						}
					]
				},
				{
					"type": "blob",
					"name": "maximumFlowValue",
					"help": "Maximum Flow Value",
					"length": {
						"name": "Properties2",
						"mask": 7,
						"shift": 0
					}
				},
				{
					"type": "bitfield",
					"name": "properties3",
					"help": "Properties3",
					"length": 1,
					"fields": [
						{
							"type": "integer",
							"name": "Flow High Threshold Size",
							"mask": 7,
							"shift": 0
						},
						{
							"type": "integer",
							"name": "Flow High Threshold Scale",
							"mask": 24,
							"shift": 3
						},
						{
							"type": "integer",
							"name": "Flow High Threshold Precision",
							"mask": 224,
							"shift": 5
						}
					]
				},
				{
					"type": "blob",
					"name": "flowHighThresholdValue",
					"help": "Flow High Threshold Value",
					"length": {
						"name": "Properties3",
						"mask": 7,
						"shift": 0
					}
				},
				{
					"type": "bitfield",
					"name": "properties4",
					"help": "Properties4",
					"length": 1,
					"fields": [
						{
							"type": "integer",
							"name": "Flow Low Threshold Size",
							"mask": 7,
							"shift": 0
						},
						{
							"type": "integer",
							"name": "Flow Low Threshold Scale",
							"mask": 24,
							"shift": 3
						},
						{
							"type": "integer",
							"name": "Flow Low Threshold Precision",
							"mask": 224,
							"shift": 5
						}
					]
				},
				{
					"type": "blob",
					"name": "flowLowThresholdValue",
					"help": "Flow Low Threshold Value",
					"length": {
						"name": "Properties4",
						"mask": 7,
						"shift": 0
					}
				},
				{
					"type": "integer",
					"name": "sensorUsage",
					"help": "Sensor Usage",
					"length": 0
				}
			]
		} as CommandDefinition;

		static matches(packet: Packet): boolean {
			return packet.tryAs(IrrigationV1)?.command === this.command;
		}

		constructor(data: Buffer | IrrigationV1IrrigationValveConfigReportData) {
			super(IrrigationValveConfigReport, data);
		}
	};

	public static readonly IrrigationValveRun = class IrrigationValveRun extends CommandPacket<IrrigationV1IrrigationValveRunData> {
		public static readonly CommandClass = IrrigationV1;
		public static readonly command = 0x0d;
		public static readonly definition = {
			"command": 13,
			"name": "IrrigationValveRun",
			"help": "Irrigation Valve Run",
			"status": "active",
			"params": [
				{
					"type": "bitfield",
					"name": "properties1",
					"help": "Properties1",
					"length": 1,
					"fields": [
						{
							"type": "boolean",
							"name": "Master Valve",
							"mask": 1,
							"shift": 0
						},
						{
							"type": "integer",
							"name": "Reserved",
							"mask": 254,
							"shift": 1
						}
					]
				},
				{
					"type": "integer",
					"name": "valveID",
					"help": "Valve ID",
					"length": 1
				},
				{
					"type": "integer",
					"name": "duration",
					"help": "Duration",
					"length": 2
				}
			]
		} as CommandDefinition;

		static matches(packet: Packet): boolean {
			return packet.tryAs(IrrigationV1)?.command === this.command;
		}

		constructor(data: Buffer | IrrigationV1IrrigationValveRunData) {
			super(IrrigationValveRun, data);
		}
	};

	public static readonly IrrigationValveTableSet = class IrrigationValveTableSet extends CommandPacket<IrrigationV1IrrigationValveTableSetData> {
		public static readonly CommandClass = IrrigationV1;
		public static readonly command = 0x0e;
		public static readonly definition = {
			"command": 14,
			"name": "IrrigationValveTableSet",
			"help": "Irrigation Valve Table Set",
			"status": "active",
			"params": [
				{
					"type": "integer",
					"name": "valveTableID",
					"help": "Valve Table ID",
					"length": 1
				},
				{
					"type": "group",
					"name": "vg1",
					"help": "vg1",
					"length": "auto",
					"params": [
						{
							"type": "integer",
							"name": "valveID",
							"help": "Valve ID",
							"length": 1
						},
						{
							"type": "integer",
							"name": "duration",
							"help": "Duration",
							"length": 2
						}
					]
				}
			]
		} as CommandDefinition;

		static matches(packet: Packet): boolean {
			return packet.tryAs(IrrigationV1)?.command === this.command;
		}

		constructor(data: Buffer | IrrigationV1IrrigationValveTableSetData) {
			super(IrrigationValveTableSet, data);
		}
	};

	public static readonly IrrigationValveTableGet = class IrrigationValveTableGet extends CommandPacket<IrrigationV1IrrigationValveTableGetData> {
		public static readonly CommandClass = IrrigationV1;
		public static readonly command = 0x0f;
		public static readonly definition = {
			"command": 15,
			"name": "IrrigationValveTableGet",
			"help": "Irrigation Valve Table Get",
			"status": "active",
			"params": [
				{
					"type": "integer",
					"name": "valveTableID",
					"help": "Valve Table ID",
					"length": 1
				}
			]
		} as CommandDefinition;

		static matches(packet: Packet): boolean {
			return packet.tryAs(IrrigationV1)?.command === this.command;
		}

		constructor(data: Buffer | IrrigationV1IrrigationValveTableGetData) {
			super(IrrigationValveTableGet, data);
		}
	};

	public static readonly IrrigationValveTableReport = class IrrigationValveTableReport extends CommandPacket<IrrigationV1IrrigationValveTableReportData> {
		public static readonly CommandClass = IrrigationV1;
		public static readonly command = 0x10;
		public static readonly definition = {
			"command": 16,
			"name": "IrrigationValveTableReport",
			"help": "Irrigation Valve Table Report",
			"status": "active",
			"params": [
				{
					"type": "integer",
					"name": "valveTableID",
					"help": "Valve Table ID",
					"length": 1
				},
				{
					"type": "group",
					"name": "vg1",
					"help": "vg1",
					"length": "auto",
					"params": [
						{
							"type": "integer",
							"name": "valveID",
							"help": "Valve ID",
							"length": 1
						},
						{
							"type": "integer",
							"name": "duration",
							"help": "Duration",
							"length": 2
						}
					]
				}
			]
		} as CommandDefinition;

		static matches(packet: Packet): boolean {
			return packet.tryAs(IrrigationV1)?.command === this.command;
		}

		constructor(data: Buffer | IrrigationV1IrrigationValveTableReportData) {
			super(IrrigationValveTableReport, data);
		}
	};

	public static readonly IrrigationValveTableRun = class IrrigationValveTableRun extends CommandPacket<IrrigationV1IrrigationValveTableRunData> {
		public static readonly CommandClass = IrrigationV1;
		public static readonly command = 0x11;
		public static readonly definition = {
			"command": 17,
			"name": "IrrigationValveTableRun",
			"help": "Irrigation Valve Table Run",
			"status": "active",
			"params": [
				{
					"type": "blob",
					"name": "valveTableID",
					"help": "Valve Table ID",
					"length": "auto"
				}
			]
		} as CommandDefinition;

		static matches(packet: Packet): boolean {
			return packet.tryAs(IrrigationV1)?.command === this.command;
		}

		constructor(data: Buffer | IrrigationV1IrrigationValveTableRunData) {
			super(IrrigationValveTableRun, data);
		}
	};

	public static readonly IrrigationSystemShutoff = class IrrigationSystemShutoff extends CommandPacket<IrrigationV1IrrigationSystemShutoffData> {
		public static readonly CommandClass = IrrigationV1;
		public static readonly command = 0x12;
		public static readonly definition = {
			"command": 18,
			"name": "IrrigationSystemShutoff",
			"help": "Irrigation System Shutoff",
			"status": "active",
			"params": [
				{
					"type": "integer",
					"name": "duration",
					"help": "Duration",
					"length": 1
				}
			]
		} as CommandDefinition;

		static matches(packet: Packet): boolean {
			return packet.tryAs(IrrigationV1)?.command === this.command;
		}

		constructor(data: Buffer | IrrigationV1IrrigationSystemShutoffData) {
			super(IrrigationSystemShutoff, data);
		}
	};
}

export namespace IrrigationV1 {
	export type IrrigationSystemInfoGet = InstanceType<typeof IrrigationV1.IrrigationSystemInfoGet>;
	export type IrrigationSystemInfoReport = InstanceType<typeof IrrigationV1.IrrigationSystemInfoReport>;
	export type IrrigationSystemStatusGet = InstanceType<typeof IrrigationV1.IrrigationSystemStatusGet>;
	export type IrrigationSystemStatusReport = InstanceType<typeof IrrigationV1.IrrigationSystemStatusReport>;
	export type IrrigationSystemConfigSet = InstanceType<typeof IrrigationV1.IrrigationSystemConfigSet>;
	export type IrrigationSystemConfigGet = InstanceType<typeof IrrigationV1.IrrigationSystemConfigGet>;
	export type IrrigationSystemConfigReport = InstanceType<typeof IrrigationV1.IrrigationSystemConfigReport>;
	export type IrrigationValveInfoGet = InstanceType<typeof IrrigationV1.IrrigationValveInfoGet>;
	export type IrrigationValveInfoReport = InstanceType<typeof IrrigationV1.IrrigationValveInfoReport>;
	export type IrrigationValveConfigSet = InstanceType<typeof IrrigationV1.IrrigationValveConfigSet>;
	export type IrrigationValveConfigGet = InstanceType<typeof IrrigationV1.IrrigationValveConfigGet>;
	export type IrrigationValveConfigReport = InstanceType<typeof IrrigationV1.IrrigationValveConfigReport>;
	export type IrrigationValveRun = InstanceType<typeof IrrigationV1.IrrigationValveRun>;
	export type IrrigationValveTableSet = InstanceType<typeof IrrigationV1.IrrigationValveTableSet>;
	export type IrrigationValveTableGet = InstanceType<typeof IrrigationV1.IrrigationValveTableGet>;
	export type IrrigationValveTableReport = InstanceType<typeof IrrigationV1.IrrigationValveTableReport>;
	export type IrrigationValveTableRun = InstanceType<typeof IrrigationV1.IrrigationValveTableRun>;
	export type IrrigationSystemShutoff = InstanceType<typeof IrrigationV1.IrrigationSystemShutoff>;
}

export enum SensorStatusEnum {
	FlowSensorDetected = 0x0,
	PressureSensorDetected = 0x1,
	RainSensorDetected = 0x2,
	MoistureSensorDetected = 0x3,
}
