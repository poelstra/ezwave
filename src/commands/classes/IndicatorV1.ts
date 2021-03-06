/**
 * Command Class Indicator, version 1.
 *
 * Auto-generated, do not edit.
 */

import { CommandClassPacket, CommandPacket } from "../command";
import * as jsonSpec from "../jsonSpec";
import { Packet } from "../packet";
import { convertFromJsonCommand } from "../specHelpers";
import CommandClasses from "./CommandClasses";

export enum IndicatorV1Commands {
	IndicatorGet = 0x02,
	IndicatorReport = 0x03,
	IndicatorSet = 0x01,
}

export interface IndicatorV1IndicatorReportData {
	value: number; // 1 byte unsigned integer
}

export interface IndicatorV1IndicatorSetData {
	value: number; // 1 byte unsigned integer
}

export class IndicatorV1 extends CommandClassPacket<IndicatorV1Commands> {
	public static readonly commandClass = CommandClasses.Indicator; // 0x87 (135)
	public static readonly version = 1;

	public static matches(packet: Packet): boolean {
		return packet.commandClass === this.commandClass;
	}

	constructor(commandAndPayload: Buffer) {
		super(IndicatorV1, commandAndPayload);
	}

	public static readonly IndicatorGet = class IndicatorGet extends CommandPacket<void> {
		public static readonly CommandClass = IndicatorV1;
		public static readonly command = 0x02;
		public static readonly definition = convertFromJsonCommand({
			"command": 2,
			"name": "IndicatorGet",
			"help": "Indicator Get",
			"status": "Active",
			"params": []
		} as jsonSpec.CommandDefinition);

		static matches(packet: Packet): boolean {
			return packet.tryAs(IndicatorV1)?.command === this.command;
		}

		constructor(data: Buffer | void) {
			super(IndicatorGet, data);
		}
	};

	public static readonly IndicatorReport = class IndicatorReport extends CommandPacket<IndicatorV1IndicatorReportData> {
		public static readonly CommandClass = IndicatorV1;
		public static readonly command = 0x03;
		public static readonly definition = convertFromJsonCommand({
			"command": 3,
			"name": "IndicatorReport",
			"help": "Indicator Report",
			"status": "Active",
			"params": [
				{
					"type": "Integer",
					"name": "value",
					"help": "Value",
					"length": 1,
					"values": {
						"0": {
							"name": "OffDisable",
							"help": "off/disable"
						},
						"255": {
							"name": "OnEnable",
							"help": "on/enable"
						}
					}
				}
			]
		} as jsonSpec.CommandDefinition);

		static matches(packet: Packet): boolean {
			return packet.tryAs(IndicatorV1)?.command === this.command;
		}

		constructor(data: Buffer | IndicatorV1IndicatorReportData) {
			super(IndicatorReport, data);
		}
	};

	public static readonly IndicatorSet = class IndicatorSet extends CommandPacket<IndicatorV1IndicatorSetData> {
		public static readonly CommandClass = IndicatorV1;
		public static readonly command = 0x01;
		public static readonly definition = convertFromJsonCommand({
			"command": 1,
			"name": "IndicatorSet",
			"help": "Indicator Set",
			"status": "Active",
			"params": [
				{
					"type": "Integer",
					"name": "value",
					"help": "Value",
					"length": 1,
					"values": {
						"0": {
							"name": "OffDisable",
							"help": "off/disable"
						},
						"255": {
							"name": "OnEnable",
							"help": "on/enable"
						}
					}
				}
			]
		} as jsonSpec.CommandDefinition);

		static matches(packet: Packet): boolean {
			return packet.tryAs(IndicatorV1)?.command === this.command;
		}

		constructor(data: Buffer | IndicatorV1IndicatorSetData) {
			super(IndicatorSet, data);
		}
	};
}

export namespace IndicatorV1 {
	export type IndicatorGet = InstanceType<typeof IndicatorV1.IndicatorGet>;
	export type IndicatorReport = InstanceType<typeof IndicatorV1.IndicatorReport>;
	export type IndicatorSet = InstanceType<typeof IndicatorV1.IndicatorSet>;
}
