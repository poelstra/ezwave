/**
 * Command Class DMX, version 1.
 *
 * Auto-generated, do not edit.
 */

import { CommandClasses, CommandClassPacket, CommandPacket, Packet } from "@ezwave/codec";
import { CommandDefinition, convertFromJsonCommand, JsonCommandDefinition } from "@ezwave/spec";

export enum DmxV1Commands {
	DmxAddressSet = 0x01,
	DmxAddressGet = 0x02,
	DmxAddressReport = 0x03,
	DmxCapabilityGet = 0x04,
	DmxCapabilityReport = 0x05,
	DmxData = 0x06,
}

export interface DmxV1DmxAddressSetData {
	pageId: number; // properties1[3..0]
	channelId: number; // 1 byte unsigned integer
}

export interface DmxV1DmxAddressReportData {
	pageId: number; // properties1[3..0]
	channelId: number; // 1 byte unsigned integer
}

export interface DmxV1DmxCapabilityGetData {
	channelId: number; // 1 byte unsigned integer
}

export interface DmxV1DmxCapabilityReportData {
	channelId: number; // 1 byte unsigned integer
	propertyId: number; // 2 byte unsigned integer
	deviceChannels: number; // 1 byte unsigned integer
	maxChannels: number; // 1 byte unsigned integer
}

export interface DmxV1DmxDataData {
	source: number; // 1 byte unsigned integer
	sequenceNo: number; // properties1[5..4]
	page: number; // properties1[3..0]
	dmxChannel: Buffer; // automatic length
}

export class DmxV1 extends CommandClassPacket<DmxV1Commands> {
	public static readonly commandClass: number = CommandClasses.Dmx; // 0x65 (101)
	public static readonly version: number = 1;

	public static matches(packet: Packet): boolean {
		return packet.commandClass === this.commandClass;
	}

	public constructor(commandAndPayload: Buffer) {
		super(DmxV1, commandAndPayload);
	}
}

export class DmxAddressSet extends CommandPacket<DmxV1DmxAddressSetData> {
	public static readonly CommandClass: typeof DmxV1 = DmxV1;
	public static readonly command: number = 0x01; // 1
	public static readonly definition: CommandDefinition = convertFromJsonCommand({
		"command": 1,
		"name": "DmxAddressSet",
		"help": "DMX Address Set",
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
						"fieldType": "Integer",
						"name": "pageId",
						"mask": 15,
						"shift": 0
					}
				]
			},
			{
				"type": "Integer",
				"name": "channelId",
				"help": "Channel ID",
				"length": 1
			}
		]
	} as JsonCommandDefinition);

	public static matches(packet: Packet): boolean {
		return packet.tryAs(DmxV1)?.command === this.command;
	}

	public constructor(data: Buffer | DmxV1DmxAddressSetData) {
		super(DmxAddressSet, data);
	}
};

export class DmxAddressGet extends CommandPacket<void> {
	public static readonly CommandClass: typeof DmxV1 = DmxV1;
	public static readonly command: number = 0x02; // 2
	public static readonly definition: CommandDefinition = convertFromJsonCommand({
		"command": 2,
		"name": "DmxAddressGet",
		"help": "DMX Address Get",
		"status": "Active",
		"params": []
	} as JsonCommandDefinition);

	public static matches(packet: Packet): boolean {
		return packet.tryAs(DmxV1)?.command === this.command;
	}

	public constructor(data: Buffer | void) {
		super(DmxAddressGet, data);
	}
};

export class DmxAddressReport extends CommandPacket<DmxV1DmxAddressReportData> {
	public static readonly CommandClass: typeof DmxV1 = DmxV1;
	public static readonly command: number = 0x03; // 3
	public static readonly definition: CommandDefinition = convertFromJsonCommand({
		"command": 3,
		"name": "DmxAddressReport",
		"help": "DMX Address Report",
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
						"fieldType": "Integer",
						"name": "pageId",
						"mask": 15,
						"shift": 0
					}
				]
			},
			{
				"type": "Integer",
				"name": "channelId",
				"help": "Channel ID",
				"length": 1
			}
		]
	} as JsonCommandDefinition);

	public static matches(packet: Packet): boolean {
		return packet.tryAs(DmxV1)?.command === this.command;
	}

	public constructor(data: Buffer | DmxV1DmxAddressReportData) {
		super(DmxAddressReport, data);
	}
};

export class DmxCapabilityGet extends CommandPacket<DmxV1DmxCapabilityGetData> {
	public static readonly CommandClass: typeof DmxV1 = DmxV1;
	public static readonly command: number = 0x04; // 4
	public static readonly definition: CommandDefinition = convertFromJsonCommand({
		"command": 4,
		"name": "DmxCapabilityGet",
		"help": "DMX Capability Get",
		"status": "Active",
		"params": [
			{
				"type": "Integer",
				"name": "channelId",
				"help": "Channel ID",
				"length": 1
			}
		]
	} as JsonCommandDefinition);

	public static matches(packet: Packet): boolean {
		return packet.tryAs(DmxV1)?.command === this.command;
	}

	public constructor(data: Buffer | DmxV1DmxCapabilityGetData) {
		super(DmxCapabilityGet, data);
	}
};

export class DmxCapabilityReport extends CommandPacket<DmxV1DmxCapabilityReportData> {
	public static readonly CommandClass: typeof DmxV1 = DmxV1;
	public static readonly command: number = 0x05; // 5
	public static readonly definition: CommandDefinition = convertFromJsonCommand({
		"command": 5,
		"name": "DmxCapabilityReport",
		"help": "DMX Capability Report",
		"status": "Active",
		"params": [
			{
				"type": "Integer",
				"name": "channelId",
				"help": "Channel ID",
				"length": 1
			},
			{
				"type": "Integer",
				"name": "propertyId",
				"help": "Property ID",
				"length": 2
			},
			{
				"type": "Integer",
				"name": "deviceChannels",
				"help": "Device Channels",
				"length": 1
			},
			{
				"type": "Integer",
				"name": "maxChannels",
				"help": "Max Channels",
				"length": 1
			}
		]
	} as JsonCommandDefinition);

	public static matches(packet: Packet): boolean {
		return packet.tryAs(DmxV1)?.command === this.command;
	}

	public constructor(data: Buffer | DmxV1DmxCapabilityReportData) {
		super(DmxCapabilityReport, data);
	}
};

export class DmxData extends CommandPacket<DmxV1DmxDataData> {
	public static readonly CommandClass: typeof DmxV1 = DmxV1;
	public static readonly command: number = 0x06; // 6
	public static readonly definition: CommandDefinition = convertFromJsonCommand({
		"command": 6,
		"name": "DmxData",
		"help": "DMX Data",
		"status": "Active",
		"params": [
			{
				"type": "Integer",
				"name": "source",
				"help": "Source",
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
						"name": "reserved",
						"mask": 192,
						"shift": 6,
						"reserved": true
					},
					{
						"fieldType": "Integer",
						"name": "sequenceNo",
						"mask": 48,
						"shift": 4
					},
					{
						"fieldType": "Integer",
						"name": "page",
						"mask": 15,
						"shift": 0
					}
				]
			},
			{
				"type": "Blob",
				"name": "dmxChannel",
				"help": "DMX channel",
				"length": {
					"lengthType": "Auto"
				}
			}
		]
	} as JsonCommandDefinition);

	public static matches(packet: Packet): boolean {
		return packet.tryAs(DmxV1)?.command === this.command;
	}

	public constructor(data: Buffer | DmxV1DmxDataData) {
		super(DmxData, data);
	}
};
