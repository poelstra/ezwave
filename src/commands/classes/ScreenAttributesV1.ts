/**
 * Command Class Screen Attributes, version 1.
 *
 * Auto-generated, do not edit.
 */

import { CommandClassPacket, CommandPacket } from "../command";
import * as jsonSpec from "../jsonSpec";
import { Packet } from "../packet";
import { convertFromJsonCommand } from "../specHelpers";
import CommandClasses from "./CommandClasses";

export enum ScreenAttributesV1Commands {
	ScreenAttributesGet = 0x01,
	ScreenAttributesReport = 0x02,
}

export interface ScreenAttributesV1ScreenAttributesReportData {
	numberOfLines: number; // properties1[4..0]
	numberOfCharactersPerLine: number; // 1 byte unsigned integer
	sizeOfLineBuffer: number; // 1 byte unsigned integer
	numericalPresentationOfACharacter: number; // 1 byte unsigned integer
}

export class ScreenAttributesV1 extends CommandClassPacket<ScreenAttributesV1Commands> {
	public static readonly commandClass = CommandClasses.ScreenAttributes; // 0x93 (147)
	public static readonly version = 1;

	public static matches(packet: Packet): boolean {
		return packet.commandClass === this.commandClass;
	}

	constructor(commandAndPayload: Buffer) {
		super(ScreenAttributesV1, commandAndPayload);
	}

	public static readonly ScreenAttributesGet = class ScreenAttributesGet extends CommandPacket<void> {
		public static readonly CommandClass = ScreenAttributesV1;
		public static readonly command = 0x01;
		public static readonly definition = convertFromJsonCommand({
			"command": 1,
			"name": "ScreenAttributesGet",
			"help": "Screen Attributes Get",
			"status": "Active",
			"params": []
		} as jsonSpec.CommandDefinition);

		static matches(packet: Packet): boolean {
			return packet.tryAs(ScreenAttributesV1)?.command === this.command;
		}

		constructor(data: Buffer | void) {
			super(ScreenAttributesGet, data);
		}
	};

	public static readonly ScreenAttributesReport = class ScreenAttributesReport extends CommandPacket<ScreenAttributesV1ScreenAttributesReportData> {
		public static readonly CommandClass = ScreenAttributesV1;
		public static readonly command = 0x02;
		public static readonly definition = convertFromJsonCommand({
			"command": 2,
			"name": "ScreenAttributesReport",
			"help": "Screen Attributes Report",
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
							"name": "numberOfLines",
							"mask": 31,
							"shift": 0
						}
					]
				},
				{
					"type": "Integer",
					"name": "numberOfCharactersPerLine",
					"help": "Number of Characters per Line",
					"length": 1
				},
				{
					"type": "Integer",
					"name": "sizeOfLineBuffer",
					"help": "Size of Line Buffer",
					"length": 1
				},
				{
					"type": "Integer",
					"name": "numericalPresentationOfACharacter",
					"help": "Numerical Presentation of a Character",
					"length": 1
				}
			]
		} as jsonSpec.CommandDefinition);

		static matches(packet: Packet): boolean {
			return packet.tryAs(ScreenAttributesV1)?.command === this.command;
		}

		constructor(data: Buffer | ScreenAttributesV1ScreenAttributesReportData) {
			super(ScreenAttributesReport, data);
		}
	};
}

export namespace ScreenAttributesV1 {
	export type ScreenAttributesGet = InstanceType<typeof ScreenAttributesV1.ScreenAttributesGet>;
	export type ScreenAttributesReport = InstanceType<typeof ScreenAttributesV1.ScreenAttributesReport>;
}
