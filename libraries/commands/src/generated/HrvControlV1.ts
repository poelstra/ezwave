/**
 * Command Class Hrv Control, version 1.
 *
 * Auto-generated, do not edit.
 */

import { CommandClassPacket, CommandPacket, Packet } from "@ezwave/codec";
import { CommandClasses, convertFromJsonCommand, JsonCommandDefinition } from "@ezwave/spec";

export enum HrvControlV1Commands {
	HrvControlBypassGet = 0x05,
	HrvControlBypassReport = 0x06,
	HrvControlBypassSet = 0x04,
	HrvControlModeGet = 0x02,
	HrvControlModeReport = 0x03,
	HrvControlModeSet = 0x01,
	HrvControlModeSupportedGet = 0x0a,
	HrvControlModeSupportedReport = 0x0b,
	HrvControlVentilationRateGet = 0x08,
	HrvControlVentilationRateReport = 0x09,
	HrvControlVentilationRateSet = 0x07,
}

export interface HrvControlV1HrvControlBypassReportData {
	bypass: number; // 1 byte unsigned integer
}

export interface HrvControlV1HrvControlBypassSetData {
	bypass: number; // 1 byte unsigned integer
}

export interface HrvControlV1HrvControlModeReportData {
	mode: ModeEnum; // properties1[4..0]
}

export interface HrvControlV1HrvControlModeSetData {
	mode: ModeEnum; // properties1[4..0]
}

export interface HrvControlV1HrvControlModeSupportedReportData {
	manualControlSupported: ManualControlSupportedEnum; // properties1[3..0]
	bitMask: Set<BitMaskEnum>; // automatic length
}

export interface HrvControlV1HrvControlVentilationRateReportData {
	ventilationRate: number; // 1 byte unsigned integer
}

export interface HrvControlV1HrvControlVentilationRateSetData {
	ventilationRate: number; // 1 byte unsigned integer
}

export enum ModeEnum {
	Off = 0x0,
	DemandAutomatic = 0x1,
	Schedule = 0x2,
	EnergySavingsMode = 0x3,
	Manual = 0x4,
}

export enum ManualControlSupportedEnum {
	BypassOpenClose = 0x0,
	BypassAuto = 0x1,
	ModulatedBypass = 0x2,
	VentilationRate = 0x3,
}

export enum BitMaskEnum {
	Off = 0x0,
	DemandAutomatic = 0x1,
	Schedule = 0x2,
	EnergySavingsMode = 0x3,
	Manual = 0x4,
}

export class HrvControlV1 extends CommandClassPacket<HrvControlV1Commands> {
	public static readonly commandClass = CommandClasses.HrvControl; // 0x39 (57)
	public static readonly version = 1;

	public static matches(packet: Packet): boolean {
		return packet.commandClass === this.commandClass;
	}

	constructor(commandAndPayload: Buffer) {
		super(HrvControlV1, commandAndPayload);
	}

	public static readonly HrvControlBypassGet = class HrvControlBypassGet extends CommandPacket<void> {
		public static readonly CommandClass = HrvControlV1;
		public static readonly command = 0x05;
		public static readonly definition = convertFromJsonCommand({
			"command": 5,
			"name": "HrvControlBypassGet",
			"help": "Hrv Control Bypass  Get",
			"status": "Active",
			"params": []
		} as JsonCommandDefinition);

		static matches(packet: Packet): boolean {
			return packet.tryAs(HrvControlV1)?.command === this.command;
		}

		constructor(data: Buffer | void) {
			super(HrvControlBypassGet, data);
		}
	};

	public static readonly HrvControlBypassReport = class HrvControlBypassReport extends CommandPacket<HrvControlV1HrvControlBypassReportData> {
		public static readonly CommandClass = HrvControlV1;
		public static readonly command = 0x06;
		public static readonly definition = convertFromJsonCommand({
			"command": 6,
			"name": "HrvControlBypassReport",
			"help": "Hrv Control Bypass Report",
			"status": "Active",
			"params": [
				{
					"type": "Integer",
					"name": "bypass",
					"help": "Bypass",
					"length": 1
				}
			]
		} as JsonCommandDefinition);

		static matches(packet: Packet): boolean {
			return packet.tryAs(HrvControlV1)?.command === this.command;
		}

		constructor(data: Buffer | HrvControlV1HrvControlBypassReportData) {
			super(HrvControlBypassReport, data);
		}
	};

	public static readonly HrvControlBypassSet = class HrvControlBypassSet extends CommandPacket<HrvControlV1HrvControlBypassSetData> {
		public static readonly CommandClass = HrvControlV1;
		public static readonly command = 0x04;
		public static readonly definition = convertFromJsonCommand({
			"command": 4,
			"name": "HrvControlBypassSet",
			"help": "Hrv Control Bypass Set",
			"status": "Active",
			"params": [
				{
					"type": "Integer",
					"name": "bypass",
					"help": "Bypass",
					"length": 1
				}
			]
		} as JsonCommandDefinition);

		static matches(packet: Packet): boolean {
			return packet.tryAs(HrvControlV1)?.command === this.command;
		}

		constructor(data: Buffer | HrvControlV1HrvControlBypassSetData) {
			super(HrvControlBypassSet, data);
		}
	};

	public static readonly HrvControlModeGet = class HrvControlModeGet extends CommandPacket<void> {
		public static readonly CommandClass = HrvControlV1;
		public static readonly command = 0x02;
		public static readonly definition = convertFromJsonCommand({
			"command": 2,
			"name": "HrvControlModeGet",
			"help": "Hrv Control Mode Get",
			"status": "Active",
			"params": []
		} as JsonCommandDefinition);

		static matches(packet: Packet): boolean {
			return packet.tryAs(HrvControlV1)?.command === this.command;
		}

		constructor(data: Buffer | void) {
			super(HrvControlModeGet, data);
		}
	};

	public static readonly HrvControlModeReport = class HrvControlModeReport extends CommandPacket<HrvControlV1HrvControlModeReportData> {
		public static readonly CommandClass = HrvControlV1;
		public static readonly command = 0x03;
		public static readonly definition = convertFromJsonCommand({
			"command": 3,
			"name": "HrvControlModeReport",
			"help": "Hrv Control Mode Report",
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
							"fieldType": "Enum",
							"name": "mode",
							"mask": 31,
							"shift": 0,
							"values": {
								"0": {
									"name": "Off",
									"help": "Off"
								},
								"1": {
									"name": "DemandAutomatic",
									"help": "Demand Automatic"
								},
								"2": {
									"name": "Schedule",
									"help": "Schedule"
								},
								"3": {
									"name": "EnergySavingsMode",
									"help": "Energy Savings Mode"
								},
								"4": {
									"name": "Manual",
									"help": "Manual"
								}
							}
						}
					]
				}
			]
		} as JsonCommandDefinition);

		static matches(packet: Packet): boolean {
			return packet.tryAs(HrvControlV1)?.command === this.command;
		}

		constructor(data: Buffer | HrvControlV1HrvControlModeReportData) {
			super(HrvControlModeReport, data);
		}
	};

	public static readonly HrvControlModeSet = class HrvControlModeSet extends CommandPacket<HrvControlV1HrvControlModeSetData> {
		public static readonly CommandClass = HrvControlV1;
		public static readonly command = 0x01;
		public static readonly definition = convertFromJsonCommand({
			"command": 1,
			"name": "HrvControlModeSet",
			"help": "Hrv Control Mode Set",
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
							"fieldType": "Enum",
							"name": "mode",
							"mask": 31,
							"shift": 0,
							"values": {
								"0": {
									"name": "Off",
									"help": "Off"
								},
								"1": {
									"name": "DemandAutomatic",
									"help": "Demand Automatic"
								},
								"2": {
									"name": "Schedule",
									"help": "Schedule"
								},
								"3": {
									"name": "EnergySavingsMode",
									"help": "Energy Savings Mode"
								},
								"4": {
									"name": "Manual",
									"help": "Manual"
								}
							}
						}
					]
				}
			]
		} as JsonCommandDefinition);

		static matches(packet: Packet): boolean {
			return packet.tryAs(HrvControlV1)?.command === this.command;
		}

		constructor(data: Buffer | HrvControlV1HrvControlModeSetData) {
			super(HrvControlModeSet, data);
		}
	};

	public static readonly HrvControlModeSupportedGet = class HrvControlModeSupportedGet extends CommandPacket<void> {
		public static readonly CommandClass = HrvControlV1;
		public static readonly command = 0x0a;
		public static readonly definition = convertFromJsonCommand({
			"command": 10,
			"name": "HrvControlModeSupportedGet",
			"help": "Hrv Control Mode Supported Get",
			"status": "Active",
			"params": []
		} as JsonCommandDefinition);

		static matches(packet: Packet): boolean {
			return packet.tryAs(HrvControlV1)?.command === this.command;
		}

		constructor(data: Buffer | void) {
			super(HrvControlModeSupportedGet, data);
		}
	};

	public static readonly HrvControlModeSupportedReport = class HrvControlModeSupportedReport extends CommandPacket<HrvControlV1HrvControlModeSupportedReportData> {
		public static readonly CommandClass = HrvControlV1;
		public static readonly command = 0x0b;
		public static readonly definition = convertFromJsonCommand({
			"command": 11,
			"name": "HrvControlModeSupportedReport",
			"help": "Hrv Control Mode Supported Report",
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
							"mask": 240,
							"shift": 4,
							"reserved": true
						},
						{
							"fieldType": "Enum",
							"name": "manualControlSupported",
							"mask": 15,
							"shift": 0,
							"values": {
								"0": {
									"name": "BypassOpenClose",
									"help": "Bypass Open Close"
								},
								"1": {
									"name": "BypassAuto",
									"help": "Bypass Auto"
								},
								"2": {
									"name": "ModulatedBypass",
									"help": "Modulated Bypass"
								},
								"3": {
									"name": "VentilationRate",
									"help": "Ventilation Rate"
								}
							}
						}
					]
				},
				{
					"type": "Bitmask",
					"name": "bitMask",
					"help": "Bit Mask",
					"length": {
						"lengthType": "Auto"
					},
					"values": {
						"0": {
							"name": "Off",
							"help": "Off"
						},
						"1": {
							"name": "DemandAutomatic",
							"help": "Demand Automatic"
						},
						"2": {
							"name": "Schedule",
							"help": "Schedule"
						},
						"3": {
							"name": "EnergySavingsMode",
							"help": "Energy Savings Mode"
						},
						"4": {
							"name": "Manual",
							"help": "Manual"
						}
					}
				}
			]
		} as JsonCommandDefinition);

		static matches(packet: Packet): boolean {
			return packet.tryAs(HrvControlV1)?.command === this.command;
		}

		constructor(data: Buffer | HrvControlV1HrvControlModeSupportedReportData) {
			super(HrvControlModeSupportedReport, data);
		}
	};

	public static readonly HrvControlVentilationRateGet = class HrvControlVentilationRateGet extends CommandPacket<void> {
		public static readonly CommandClass = HrvControlV1;
		public static readonly command = 0x08;
		public static readonly definition = convertFromJsonCommand({
			"command": 8,
			"name": "HrvControlVentilationRateGet",
			"help": "Hrv Control Ventilation Rate  Get",
			"status": "Active",
			"params": []
		} as JsonCommandDefinition);

		static matches(packet: Packet): boolean {
			return packet.tryAs(HrvControlV1)?.command === this.command;
		}

		constructor(data: Buffer | void) {
			super(HrvControlVentilationRateGet, data);
		}
	};

	public static readonly HrvControlVentilationRateReport = class HrvControlVentilationRateReport extends CommandPacket<HrvControlV1HrvControlVentilationRateReportData> {
		public static readonly CommandClass = HrvControlV1;
		public static readonly command = 0x09;
		public static readonly definition = convertFromJsonCommand({
			"command": 9,
			"name": "HrvControlVentilationRateReport",
			"help": "Hrv Control Ventilation Rate  Report",
			"status": "Active",
			"params": [
				{
					"type": "Integer",
					"name": "ventilationRate",
					"help": "Ventilation Rate",
					"length": 1
				}
			]
		} as JsonCommandDefinition);

		static matches(packet: Packet): boolean {
			return packet.tryAs(HrvControlV1)?.command === this.command;
		}

		constructor(data: Buffer | HrvControlV1HrvControlVentilationRateReportData) {
			super(HrvControlVentilationRateReport, data);
		}
	};

	public static readonly HrvControlVentilationRateSet = class HrvControlVentilationRateSet extends CommandPacket<HrvControlV1HrvControlVentilationRateSetData> {
		public static readonly CommandClass = HrvControlV1;
		public static readonly command = 0x07;
		public static readonly definition = convertFromJsonCommand({
			"command": 7,
			"name": "HrvControlVentilationRateSet",
			"help": "Hrv Control Ventilation Rate Set",
			"status": "Active",
			"params": [
				{
					"type": "Integer",
					"name": "ventilationRate",
					"help": "Ventilation Rate",
					"length": 1
				}
			]
		} as JsonCommandDefinition);

		static matches(packet: Packet): boolean {
			return packet.tryAs(HrvControlV1)?.command === this.command;
		}

		constructor(data: Buffer | HrvControlV1HrvControlVentilationRateSetData) {
			super(HrvControlVentilationRateSet, data);
		}
	};
}

export namespace HrvControlV1 {
	export type HrvControlBypassGet = InstanceType<typeof HrvControlV1.HrvControlBypassGet>;
	export type HrvControlBypassReport = InstanceType<typeof HrvControlV1.HrvControlBypassReport>;
	export type HrvControlBypassSet = InstanceType<typeof HrvControlV1.HrvControlBypassSet>;
	export type HrvControlModeGet = InstanceType<typeof HrvControlV1.HrvControlModeGet>;
	export type HrvControlModeReport = InstanceType<typeof HrvControlV1.HrvControlModeReport>;
	export type HrvControlModeSet = InstanceType<typeof HrvControlV1.HrvControlModeSet>;
	export type HrvControlModeSupportedGet = InstanceType<typeof HrvControlV1.HrvControlModeSupportedGet>;
	export type HrvControlModeSupportedReport = InstanceType<typeof HrvControlV1.HrvControlModeSupportedReport>;
	export type HrvControlVentilationRateGet = InstanceType<typeof HrvControlV1.HrvControlVentilationRateGet>;
	export type HrvControlVentilationRateReport = InstanceType<typeof HrvControlV1.HrvControlVentilationRateReport>;
	export type HrvControlVentilationRateSet = InstanceType<typeof HrvControlV1.HrvControlVentilationRateSet>;
}
