/**
 * Command Class Z/IP Naming and Location, version 1.
 *
 * Auto-generated, do not edit.
 */

import { CommandClasses, CommandClassPacket, CommandPacket, Packet } from "@ezwave/codec";
import { convertFromJsonCommand, JsonCommandDefinition } from "@ezwave/spec";

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
	public static readonly version = 1;

	public static matches(packet: Packet): boolean {
		return packet.commandClass === this.commandClass;
	}

	public constructor(commandAndPayload: Buffer) {
		super(ZipNamingV1, commandAndPayload);
	}
}

export class ZipNamingNameSet extends CommandPacket<ZipNamingV1ZipNamingNameSetData> {
	public static readonly CommandClass = ZipNamingV1;
	public static readonly command = 0x01; // 1
	public static readonly definition = convertFromJsonCommand({
		"command": 1,
		"name": "ZipNamingNameSet",
		"help": "Z/IP Name Set",
		"status": "Active",
		"params": [
			{
				"type": "Text",
				"name": "name",
				"help": "Name",
				"length": {
					"lengthType": "Auto"
				}
			}
		]
	} as JsonCommandDefinition);

	static matches(packet: Packet): boolean {
		return packet.tryAs(ZipNamingV1)?.command === this.command;
	}

	public constructor(data: Buffer | ZipNamingV1ZipNamingNameSetData) {
		super(ZipNamingNameSet, data);
	}
};

export class ZipNamingNameGet extends CommandPacket<void> {
	public static readonly CommandClass = ZipNamingV1;
	public static readonly command = 0x02; // 2
	public static readonly definition = convertFromJsonCommand({
		"command": 2,
		"name": "ZipNamingNameGet",
		"help": "Z/IP Name Get",
		"status": "Active",
		"params": []
	} as JsonCommandDefinition);

	static matches(packet: Packet): boolean {
		return packet.tryAs(ZipNamingV1)?.command === this.command;
	}

	public constructor(data: Buffer | void) {
		super(ZipNamingNameGet, data);
	}
};

export class ZipNamingNameReport extends CommandPacket<ZipNamingV1ZipNamingNameReportData> {
	public static readonly CommandClass = ZipNamingV1;
	public static readonly command = 0x03; // 3
	public static readonly definition = convertFromJsonCommand({
		"command": 3,
		"name": "ZipNamingNameReport",
		"help": "Z/IP Name Report",
		"status": "Active",
		"params": [
			{
				"type": "Text",
				"name": "name",
				"help": "Name",
				"length": {
					"lengthType": "Auto"
				}
			}
		]
	} as JsonCommandDefinition);

	static matches(packet: Packet): boolean {
		return packet.tryAs(ZipNamingV1)?.command === this.command;
	}

	public constructor(data: Buffer | ZipNamingV1ZipNamingNameReportData) {
		super(ZipNamingNameReport, data);
	}
};

export class ZipNamingLocationSet extends CommandPacket<ZipNamingV1ZipNamingLocationSetData> {
	public static readonly CommandClass = ZipNamingV1;
	public static readonly command = 0x04; // 4
	public static readonly definition = convertFromJsonCommand({
		"command": 4,
		"name": "ZipNamingLocationSet",
		"help": "Z/IP Location Set",
		"status": "Active",
		"params": [
			{
				"type": "Text",
				"name": "location",
				"help": "Location",
				"length": {
					"lengthType": "Auto"
				}
			}
		]
	} as JsonCommandDefinition);

	static matches(packet: Packet): boolean {
		return packet.tryAs(ZipNamingV1)?.command === this.command;
	}

	public constructor(data: Buffer | ZipNamingV1ZipNamingLocationSetData) {
		super(ZipNamingLocationSet, data);
	}
};

export class ZipNamingLocationGet extends CommandPacket<void> {
	public static readonly CommandClass = ZipNamingV1;
	public static readonly command = 0x05; // 5
	public static readonly definition = convertFromJsonCommand({
		"command": 5,
		"name": "ZipNamingLocationGet",
		"help": "Z/IP Location Get",
		"status": "Active",
		"params": []
	} as JsonCommandDefinition);

	static matches(packet: Packet): boolean {
		return packet.tryAs(ZipNamingV1)?.command === this.command;
	}

	public constructor(data: Buffer | void) {
		super(ZipNamingLocationGet, data);
	}
};

export class ZipNamingLocationReport extends CommandPacket<ZipNamingV1ZipNamingLocationReportData> {
	public static readonly CommandClass = ZipNamingV1;
	public static readonly command = 0x06; // 6
	public static readonly definition = convertFromJsonCommand({
		"command": 6,
		"name": "ZipNamingLocationReport",
		"help": "Z/IP Location Report",
		"status": "Active",
		"params": [
			{
				"type": "Text",
				"name": "location",
				"help": "Location",
				"length": {
					"lengthType": "Auto"
				}
			}
		]
	} as JsonCommandDefinition);

	static matches(packet: Packet): boolean {
		return packet.tryAs(ZipNamingV1)?.command === this.command;
	}

	public constructor(data: Buffer | ZipNamingV1ZipNamingLocationReportData) {
		super(ZipNamingLocationReport, data);
	}
};
