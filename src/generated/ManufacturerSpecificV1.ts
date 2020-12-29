/**
 * Command Class Manufacturer Specific, version 1.
 *
 * Auto-generated, do not edit.
 */

import { CommandClassPacket, CommandPacket } from "../commands/command";
import { Packet } from "../commands/packet";
import { CommandDefinition } from "../commands/types";
import CommandClasses from "../generated/CommandClasses";

export enum ManufacturerSpecificV1Commands {
	ManufacturerSpecificGet = 0x04,
	ManufacturerSpecificReport = 0x05,
}

export interface ManufacturerSpecificV1ManufacturerSpecificReportData {
	manufacturerID: number; // 2 byte unsigned integer
	productTypeID: number; // 2 byte unsigned integer
	productID: number; // 2 byte unsigned integer
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
		public static readonly definition = {
			"command": 4,
			"name": "ManufacturerSpecificGet",
			"help": "Manufacturer Specific Get",
			"status": "active",
			"params": []
		} as CommandDefinition;

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
		public static readonly definition = {
			"command": 5,
			"name": "ManufacturerSpecificReport",
			"help": "Manufacturer Specific Report",
			"status": "active",
			"params": [
				{
					"type": "integer",
					"name": "manufacturerID",
					"help": "Manufacturer ID",
					"length": 2
				},
				{
					"type": "integer",
					"name": "productTypeID",
					"help": "Product Type ID",
					"length": 2
				},
				{
					"type": "integer",
					"name": "productID",
					"help": "Product ID",
					"length": 2
				}
			]
		} as CommandDefinition;

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
