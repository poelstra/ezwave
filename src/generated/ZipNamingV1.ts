/**
 * Command Class Z/IP Naming and Location, version 1.
 *
 * Auto-generated, do not edit.
 */

import { CommandClassPacket, CommandPacket } from "../commands/command";
import * as jsonSpec from "../commands/jsonSpec";
import { Packet } from "../commands/packet";
import { convertFromJsonCommand } from "../commands/specHelpers";
import CommandClasses from "../generated/CommandClasses";

export enum ZipNamingV1Commands {
	ZipNamingNameSet = 0x01,
	ZipNamingNameGet = 0x02,
	ZipNamingNameReport = 0x03,
	ZipNamingLocationSet = 0x04,
	ZipNamingLocationGet = 0x05,
	ZipNamingLocationReport = 0x06,
}

export interface ZipNamingV1ZipNamingNameSetData {
	name: string; // automatic length
}

export interface ZipNamingV1ZipNamingNameReportData {
	name: string; // automatic length
}

export interface ZipNamingV1ZipNamingLocationSetData {
	location: string; // automatic length
}

export interface ZipNamingV1ZipNamingLocationReportData {
	location: string; // automatic length
}

export class ZipNamingV1 extends CommandClassPacket<ZipNamingV1Commands> {
	public static readonly commandClass = CommandClasses.ZipNaming; // 0x68 (104)

	public static matches(packet: Packet): boolean {
		return packet.commandClass === this.commandClass;
	}

	constructor(commandAndPayload: Buffer) {
		super(ZipNamingV1, commandAndPayload);
	}

	public static readonly ZipNamingNameSet = class ZipNamingNameSet extends CommandPacket<ZipNamingV1ZipNamingNameSetData> {
		public static readonly CommandClass = ZipNamingV1;
		public static readonly command = 0x01;
		public static readonly definition = convertFromJsonCommand({
			"command": 1,
			"name": "ZipNamingNameSet",
			"help": "Z/IP Name Set",
			"status": "active",
			"params": [
				{
					"type": "text",
					"name": "name",
					"help": "Name",
					"length": {
						"lengthType": "auto",
						"endOffset": 0
					}
				}
			]
		} as jsonSpec.CommandDefinition);

		static matches(packet: Packet): boolean {
			return packet.tryAs(ZipNamingV1)?.command === this.command;
		}

		constructor(data: Buffer | ZipNamingV1ZipNamingNameSetData) {
			super(ZipNamingNameSet, data);
		}
	};

	public static readonly ZipNamingNameGet = class ZipNamingNameGet extends CommandPacket<void> {
		public static readonly CommandClass = ZipNamingV1;
		public static readonly command = 0x02;
		public static readonly definition = convertFromJsonCommand({
			"command": 2,
			"name": "ZipNamingNameGet",
			"help": "Z/IP Name Get",
			"status": "active",
			"params": []
		} as jsonSpec.CommandDefinition);

		static matches(packet: Packet): boolean {
			return packet.tryAs(ZipNamingV1)?.command === this.command;
		}

		constructor(data: Buffer | void) {
			super(ZipNamingNameGet, data);
		}
	};

	public static readonly ZipNamingNameReport = class ZipNamingNameReport extends CommandPacket<ZipNamingV1ZipNamingNameReportData> {
		public static readonly CommandClass = ZipNamingV1;
		public static readonly command = 0x03;
		public static readonly definition = convertFromJsonCommand({
			"command": 3,
			"name": "ZipNamingNameReport",
			"help": "Z/IP Name Report",
			"status": "active",
			"params": [
				{
					"type": "text",
					"name": "name",
					"help": "Name",
					"length": {
						"lengthType": "auto",
						"endOffset": 0
					}
				}
			]
		} as jsonSpec.CommandDefinition);

		static matches(packet: Packet): boolean {
			return packet.tryAs(ZipNamingV1)?.command === this.command;
		}

		constructor(data: Buffer | ZipNamingV1ZipNamingNameReportData) {
			super(ZipNamingNameReport, data);
		}
	};

	public static readonly ZipNamingLocationSet = class ZipNamingLocationSet extends CommandPacket<ZipNamingV1ZipNamingLocationSetData> {
		public static readonly CommandClass = ZipNamingV1;
		public static readonly command = 0x04;
		public static readonly definition = convertFromJsonCommand({
			"command": 4,
			"name": "ZipNamingLocationSet",
			"help": "Z/IP Location Set",
			"status": "active",
			"params": [
				{
					"type": "text",
					"name": "location",
					"help": "Location",
					"length": {
						"lengthType": "auto",
						"endOffset": 0
					}
				}
			]
		} as jsonSpec.CommandDefinition);

		static matches(packet: Packet): boolean {
			return packet.tryAs(ZipNamingV1)?.command === this.command;
		}

		constructor(data: Buffer | ZipNamingV1ZipNamingLocationSetData) {
			super(ZipNamingLocationSet, data);
		}
	};

	public static readonly ZipNamingLocationGet = class ZipNamingLocationGet extends CommandPacket<void> {
		public static readonly CommandClass = ZipNamingV1;
		public static readonly command = 0x05;
		public static readonly definition = convertFromJsonCommand({
			"command": 5,
			"name": "ZipNamingLocationGet",
			"help": "Z/IP Location Get",
			"status": "active",
			"params": []
		} as jsonSpec.CommandDefinition);

		static matches(packet: Packet): boolean {
			return packet.tryAs(ZipNamingV1)?.command === this.command;
		}

		constructor(data: Buffer | void) {
			super(ZipNamingLocationGet, data);
		}
	};

	public static readonly ZipNamingLocationReport = class ZipNamingLocationReport extends CommandPacket<ZipNamingV1ZipNamingLocationReportData> {
		public static readonly CommandClass = ZipNamingV1;
		public static readonly command = 0x06;
		public static readonly definition = convertFromJsonCommand({
			"command": 6,
			"name": "ZipNamingLocationReport",
			"help": "Z/IP Location Report",
			"status": "active",
			"params": [
				{
					"type": "text",
					"name": "location",
					"help": "Location",
					"length": {
						"lengthType": "auto",
						"endOffset": 0
					}
				}
			]
		} as jsonSpec.CommandDefinition);

		static matches(packet: Packet): boolean {
			return packet.tryAs(ZipNamingV1)?.command === this.command;
		}

		constructor(data: Buffer | ZipNamingV1ZipNamingLocationReportData) {
			super(ZipNamingLocationReport, data);
		}
	};
}

export namespace ZipNamingV1 {
	export type ZipNamingNameSet = InstanceType<typeof ZipNamingV1.ZipNamingNameSet>;
	export type ZipNamingNameGet = InstanceType<typeof ZipNamingV1.ZipNamingNameGet>;
	export type ZipNamingNameReport = InstanceType<typeof ZipNamingV1.ZipNamingNameReport>;
	export type ZipNamingLocationSet = InstanceType<typeof ZipNamingV1.ZipNamingLocationSet>;
	export type ZipNamingLocationGet = InstanceType<typeof ZipNamingV1.ZipNamingLocationGet>;
	export type ZipNamingLocationReport = InstanceType<typeof ZipNamingV1.ZipNamingLocationReport>;
}
