/**
 * Command Class Manufacturer Specific, version 2.
 *
 * Auto-generated, do not edit.
 */

import { CommandClassPacket, CommandPacket } from "../commands/command";
import * as jsonSpec from "../commands/jsonSpec";
import { Packet } from "../commands/packet";
import { convertFromJsonCommand } from "../commands/specHelpers";
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
	deviceIDData: Buffer; // variable length
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
		public static readonly definition = convertFromJsonCommand({
			"command": 4,
			"name": "ManufacturerSpecificGet",
			"help": "Manufacturer Specific Get",
			"status": "active",
			"params": []
		} as jsonSpec.CommandDefinition);

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
		public static readonly definition = convertFromJsonCommand({
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
		} as jsonSpec.CommandDefinition);

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
		public static readonly definition = convertFromJsonCommand({
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
							"fieldType": "integer",
							"name": "reserved",
							"mask": 248,
							"shift": 3,
							"reserved": true
						},
						{
							"fieldType": "enum",
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
		} as jsonSpec.CommandDefinition);

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
		public static readonly definition = convertFromJsonCommand({
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
							"fieldType": "integer",
							"name": "reserved",
							"mask": 248,
							"shift": 3,
							"reserved": true
						},
						{
							"fieldType": "enum",
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
							"fieldType": "enum",
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
							"fieldType": "integer",
							"name": "deviceIDDataLengthIndicator",
							"mask": 31,
							"shift": 0,
							"lengthOf": {
								"refs": [
									"deviceIDData"
								]
							},
							"isAutogenerated": true
						}
					]
				},
				{
					"type": "blob",
					"name": "deviceIDData",
					"help": "Device ID Data",
					"length": {
						"lengthType": "ref",
						"from": {
							"ref": "properties2.deviceIDDataLengthIndicator"
						}
					}
				}
			]
		} as jsonSpec.CommandDefinition);

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
