/**
 * Command Class Manufacturer Specific, version 1.
 *
 * Auto-generated, do not edit.
 */

import { CommandClassPacket, CommandPacket } from "../command";
import * as jsonSpec from "../jsonSpec";
import { Packet } from "../packet";
import { convertFromJsonCommand } from "../specHelpers";
import CommandClasses from "./CommandClasses";

export enum ManufacturerSpecificV1Commands {
	ManufacturerSpecificGet = 0x04,
	ManufacturerSpecificReport = 0x05,
}

export interface ManufacturerSpecificV1ManufacturerSpecificReportData {
	manufacturerId: number; // 2 byte unsigned integer
	productTypeId: number; // 2 byte unsigned integer
	productId: number; // 2 byte unsigned integer
}

export class ManufacturerSpecificV1 extends CommandClassPacket<ManufacturerSpecificV1Commands> {
	public static readonly commandClass = CommandClasses.ManufacturerSpecific; // 0x72 (114)

	public static matches(packet: Packet): boolean {
		return packet.commandClass === this.commandClass;
	}

	constructor(commandAndPayload: Buffer) {
		super(ManufacturerSpecificV1, commandAndPayload);
	}

	public static readonly ManufacturerSpecificGet = class ManufacturerSpecificGet extends CommandPacket<void> {
		public static readonly CommandClass = ManufacturerSpecificV1;
		public static readonly command = 0x04;
		public static readonly definition = convertFromJsonCommand({
			"command": 4,
			"name": "ManufacturerSpecificGet",
			"help": "Manufacturer Specific Get",
			"status": "Active",
			"params": []
		} as jsonSpec.CommandDefinition);

		static matches(packet: Packet): boolean {
			return packet.tryAs(ManufacturerSpecificV1)?.command === this.command;
		}

		constructor(data: Buffer | void) {
			super(ManufacturerSpecificGet, data);
		}
	};

	public static readonly ManufacturerSpecificReport = class ManufacturerSpecificReport extends CommandPacket<ManufacturerSpecificV1ManufacturerSpecificReportData> {
		public static readonly CommandClass = ManufacturerSpecificV1;
		public static readonly command = 0x05;
		public static readonly definition = convertFromJsonCommand({
			"command": 5,
			"name": "ManufacturerSpecificReport",
			"help": "Manufacturer Specific Report",
			"status": "Active",
			"params": [
				{
					"type": "Integer",
					"name": "manufacturerId",
					"help": "Manufacturer ID",
					"length": 2
				},
				{
					"type": "Integer",
					"name": "productTypeId",
					"help": "Product Type ID",
					"length": 2
				},
				{
					"type": "Integer",
					"name": "productId",
					"help": "Product ID",
					"length": 2
				}
			]
		} as jsonSpec.CommandDefinition);

		static matches(packet: Packet): boolean {
			return packet.tryAs(ManufacturerSpecificV1)?.command === this.command;
		}

		constructor(data: Buffer | ManufacturerSpecificV1ManufacturerSpecificReportData) {
			super(ManufacturerSpecificReport, data);
		}
	};
}

export namespace ManufacturerSpecificV1 {
	export type ManufacturerSpecificGet = InstanceType<typeof ManufacturerSpecificV1.ManufacturerSpecificGet>;
	export type ManufacturerSpecificReport = InstanceType<typeof ManufacturerSpecificV1.ManufacturerSpecificReport>;
}
