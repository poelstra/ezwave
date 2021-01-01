/**
 * Command Class Manufacturer Specific, version 2.
 *
 * Auto-generated, do not edit.
 */

import { CommandClassPacket, CommandPacket } from "../commands/command";
import { Packet } from "../commands/packet";
import { CommandDefinition } from "../commands/types";
import CommandClasses from "../generated/CommandClasses";

export enum ManufacturerSpecificV2Commands {
	ManufacturerSpecificGet = 0x04,
	ManufacturerSpecificReport = 0x05,
	DeviceSpecificGet = 0x06,
	DeviceSpecificReport = 0x07,
}

export interface ManufacturerSpecificV2ManufacturerSpecificReportData {
	manufacturerID: number; // 2 byte unsigned integer
	productTypeID: number; // 2 byte unsigned integer
	productID: number; // 2 byte unsigned integer
}

export interface ManufacturerSpecificV2DeviceSpecificGetData {
	deviceIDType: DeviceIDTypeEnum; // properties1[2..0]
}

export interface ManufacturerSpecificV2DeviceSpecificReportData {
	deviceIDType: DeviceIDTypeEnum; // properties1[2..0]
	deviceIDDataFormat: DeviceIDDataFormatEnum; // properties2[7..5]
	deviceIDDataLengthIndicator: number; // properties2[4..0]
	// TODO param deviceIDData type blob
}

export enum DeviceIDTypeEnum {
	Reserved = 0x0,
	SerialNumber = 0x1,
}

export enum DeviceIDDataFormatEnum {
	Reserved = 0x0,
	Binary = 0x1,
}

export class ManufacturerSpecificV2 extends CommandClassPacket<ManufacturerSpecificV2Commands> {
	public static readonly commandClass = CommandClasses.ManufacturerSpecific; // 0x72 (114)

	public static matches(packet: Packet): boolean {
		return packet.commandClass === this.commandClass;
	}

	constructor(commandAndPayload: Buffer) {
		super(ManufacturerSpecificV2, commandAndPayload);
	}

	public static readonly ManufacturerSpecificGet = class ManufacturerSpecificGet extends CommandPacket<void> {
		public static readonly CommandClass = ManufacturerSpecificV2;
		public static readonly command = 0x04;
		public static readonly definition = {
			"command": 4,
			"name": "ManufacturerSpecificGet",
			"help": "Manufacturer Specific Get",
			"status": "active",
			"params": []
		} as CommandDefinition;

		static matches(packet: Packet): boolean {
			return packet.tryAs(ManufacturerSpecificV2)?.command === this.command;
		}

		constructor(data: Buffer | void) {
			super(ManufacturerSpecificGet, data);
		}
	};

	public static readonly ManufacturerSpecificReport = class ManufacturerSpecificReport extends CommandPacket<ManufacturerSpecificV2ManufacturerSpecificReportData> {
		public static readonly CommandClass = ManufacturerSpecificV2;
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
			return packet.tryAs(ManufacturerSpecificV2)?.command === this.command;
		}

		constructor(data: Buffer | ManufacturerSpecificV2ManufacturerSpecificReportData) {
			super(ManufacturerSpecificReport, data);
		}
	};

	public static readonly DeviceSpecificGet = class DeviceSpecificGet extends CommandPacket<ManufacturerSpecificV2DeviceSpecificGetData> {
		public static readonly CommandClass = ManufacturerSpecificV2;
		public static readonly command = 0x06;
		public static readonly definition = {
			"command": 6,
			"name": "DeviceSpecificGet",
			"help": "Device Specific Get",
			"status": "active",
			"params": [
				{
					"type": "bitfield",
					"name": "properties1",
					"help": "Properties1",
					"length": 1,
					"fields": [
						{
							"type": "integer",
							"name": "reserved",
							"mask": 248,
							"shift": 3,
							"reserved": true
						},
						{
							"type": "enum",
							"name": "deviceIDType",
							"mask": 7,
							"shift": 0,
							"values": {
								"0": {
									"name": "Reserved",
									"help": "Reserved"
								},
								"1": {
									"name": "SerialNumber",
									"help": "Serial Number"
								}
							}
						}
					]
				}
			]
		} as CommandDefinition;

		static matches(packet: Packet): boolean {
			return packet.tryAs(ManufacturerSpecificV2)?.command === this.command;
		}

		constructor(data: Buffer | ManufacturerSpecificV2DeviceSpecificGetData) {
			super(DeviceSpecificGet, data);
		}
	};

	public static readonly DeviceSpecificReport = class DeviceSpecificReport extends CommandPacket<ManufacturerSpecificV2DeviceSpecificReportData> {
		public static readonly CommandClass = ManufacturerSpecificV2;
		public static readonly command = 0x07;
		public static readonly definition = {
			"command": 7,
			"name": "DeviceSpecificReport",
			"help": "Device Specific Report",
			"status": "active",
			"params": [
				{
					"type": "bitfield",
					"name": "properties1",
					"help": "Properties1",
					"length": 1,
					"fields": [
						{
							"type": "integer",
							"name": "reserved",
							"mask": 248,
							"shift": 3,
							"reserved": true
						},
						{
							"type": "enum",
							"name": "deviceIDType",
							"mask": 7,
							"shift": 0,
							"values": {
								"0": {
									"name": "Reserved",
									"help": "Reserved"
								},
								"1": {
									"name": "SerialNumber",
									"help": "Serial Number"
								}
							}
						}
					]
				},
				{
					"type": "bitfield",
					"name": "properties2",
					"help": "Properties2",
					"length": 1,
					"fields": [
						{
							"type": "enum",
							"name": "deviceIDDataFormat",
							"mask": 224,
							"shift": 5,
							"values": {
								"0": {
									"name": "Reserved",
									"help": "Reserved"
								},
								"1": {
									"name": "Binary",
									"help": "Binary"
								}
							}
						},
						{
							"type": "integer",
							"name": "deviceIDDataLengthIndicator",
							"mask": 31,
							"shift": 0
						}
					]
				},
				{
					"type": "blob",
					"name": "deviceIDData",
					"help": "Device ID Data",
					"length": {
						"ref": "properties2",
						"bitfield": {
							"mask": 31,
							"shift": 0,
							"name": "deviceIDDataLengthIndicator"
						}
					}
				}
			]
		} as CommandDefinition;

		static matches(packet: Packet): boolean {
			return packet.tryAs(ManufacturerSpecificV2)?.command === this.command;
		}

		constructor(data: Buffer | ManufacturerSpecificV2DeviceSpecificReportData) {
			super(DeviceSpecificReport, data);
		}
	};
}

export namespace ManufacturerSpecificV2 {
	export type ManufacturerSpecificGet = InstanceType<typeof ManufacturerSpecificV2.ManufacturerSpecificGet>;
	export type ManufacturerSpecificReport = InstanceType<typeof ManufacturerSpecificV2.ManufacturerSpecificReport>;
	export type DeviceSpecificGet = InstanceType<typeof ManufacturerSpecificV2.DeviceSpecificGet>;
	export type DeviceSpecificReport = InstanceType<typeof ManufacturerSpecificV2.DeviceSpecificReport>;
}
