/**
 * Command Class DMX, version 1.
 *
 * Auto-generated, do not edit.
 */

import { CommandClassPacket, CommandPacket } from "../command";
import * as jsonSpec from "../jsonSpec";
import { Packet } from "../packet";
import { convertFromJsonCommand } from "../specHelpers";
import CommandClasses from "./CommandClasses";

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
	public static readonly commandClass = CommandClasses.Dmx; // 0x65 (101)
	public static readonly version = 1;

	public static matches(packet: Packet): boolean {
		return packet.commandClass === this.commandClass;
	}

	constructor(commandAndPayload: Buffer) {
		super(DmxV1, commandAndPayload);
	}

	public static readonly DmxAddressSet = class DmxAddressSet extends CommandPacket<DmxV1DmxAddressSetData> {
		public static readonly CommandClass = DmxV1;
		public static readonly command = 0x01;
		public static readonly definition = convertFromJsonCommand({
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
		} as jsonSpec.CommandDefinition);

		static matches(packet: Packet): boolean {
			return packet.tryAs(DmxV1)?.command === this.command;
		}

		constructor(data: Buffer | DmxV1DmxAddressSetData) {
			super(DmxAddressSet, data);
		}
	};

	public static readonly DmxAddressGet = class DmxAddressGet extends CommandPacket<void> {
		public static readonly CommandClass = DmxV1;
		public static readonly command = 0x02;
		public static readonly definition = convertFromJsonCommand({
			"command": 2,
			"name": "DmxAddressGet",
			"help": "DMX Address Get",
			"status": "Active",
			"params": []
		} as jsonSpec.CommandDefinition);

		static matches(packet: Packet): boolean {
			return packet.tryAs(DmxV1)?.command === this.command;
		}

		constructor(data: Buffer | void) {
			super(DmxAddressGet, data);
		}
	};

	public static readonly DmxAddressReport = class DmxAddressReport extends CommandPacket<DmxV1DmxAddressReportData> {
		public static readonly CommandClass = DmxV1;
		public static readonly command = 0x03;
		public static readonly definition = convertFromJsonCommand({
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
		} as jsonSpec.CommandDefinition);

		static matches(packet: Packet): boolean {
			return packet.tryAs(DmxV1)?.command === this.command;
		}

		constructor(data: Buffer | DmxV1DmxAddressReportData) {
			super(DmxAddressReport, data);
		}
	};

	public static readonly DmxCapabilityGet = class DmxCapabilityGet extends CommandPacket<DmxV1DmxCapabilityGetData> {
		public static readonly CommandClass = DmxV1;
		public static readonly command = 0x04;
		public static readonly definition = convertFromJsonCommand({
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
		} as jsonSpec.CommandDefinition);

		static matches(packet: Packet): boolean {
			return packet.tryAs(DmxV1)?.command === this.command;
		}

		constructor(data: Buffer | DmxV1DmxCapabilityGetData) {
			super(DmxCapabilityGet, data);
		}
	};

	public static readonly DmxCapabilityReport = class DmxCapabilityReport extends CommandPacket<DmxV1DmxCapabilityReportData> {
		public static readonly CommandClass = DmxV1;
		public static readonly command = 0x05;
		public static readonly definition = convertFromJsonCommand({
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
		} as jsonSpec.CommandDefinition);

		static matches(packet: Packet): boolean {
			return packet.tryAs(DmxV1)?.command === this.command;
		}

		constructor(data: Buffer | DmxV1DmxCapabilityReportData) {
			super(DmxCapabilityReport, data);
		}
	};

	public static readonly DmxData = class DmxData extends CommandPacket<DmxV1DmxDataData> {
		public static readonly CommandClass = DmxV1;
		public static readonly command = 0x06;
		public static readonly definition = convertFromJsonCommand({
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
		} as jsonSpec.CommandDefinition);

		static matches(packet: Packet): boolean {
			return packet.tryAs(DmxV1)?.command === this.command;
		}

		constructor(data: Buffer | DmxV1DmxDataData) {
			super(DmxData, data);
		}
	};
}

export namespace DmxV1 {
	export type DmxAddressSet = InstanceType<typeof DmxV1.DmxAddressSet>;
	export type DmxAddressGet = InstanceType<typeof DmxV1.DmxAddressGet>;
	export type DmxAddressReport = InstanceType<typeof DmxV1.DmxAddressReport>;
	export type DmxCapabilityGet = InstanceType<typeof DmxV1.DmxCapabilityGet>;
	export type DmxCapabilityReport = InstanceType<typeof DmxV1.DmxCapabilityReport>;
	export type DmxData = InstanceType<typeof DmxV1.DmxData>;
}
