/**
 * Command Class Manufacturer Specific, version 2.
 *
 * Auto-generated, do not edit.
 */

import { CommandClasses, CommandClassPacket, CommandPacket, Packet } from "@ezwave/codec";
import { convertFromJsonCommand, JsonCommandDefinition } from "@ezwave/spec";

export enum ManufacturerSpecificV2Commands {
	ManufacturerSpecificGet = 0x04,
	ManufacturerSpecificReport = 0x05,
	DeviceSpecificGet = 0x06,
	DeviceSpecificReport = 0x07,
}

export interface ManufacturerSpecificV2ManufacturerSpecificReportData {
	manufacturerId: number; // 2 byte unsigned integer
	productTypeId: number; // 2 byte unsigned integer
	productId: number; // 2 byte unsigned integer
}

export interface ManufacturerSpecificV2DeviceSpecificGetData {
	deviceIdType: DeviceIdTypeEnum; // properties1[2..0]
}

export interface ManufacturerSpecificV2DeviceSpecificReportData {
	deviceIdType: DeviceIdTypeEnum; // properties1[2..0]
	deviceIdDataFormat: DeviceIdDataFormatEnum; // properties2[7..5]
	deviceIdData: Buffer; // variable length
}

export enum DeviceIdTypeEnum {
	Reserved = 0x0,
	SerialNumber = 0x1,
}

export enum DeviceIdDataFormatEnum {
	Reserved = 0x0,
	Binary = 0x1,
}

export class ManufacturerSpecificV2 extends CommandClassPacket<ManufacturerSpecificV2Commands> {
	public static readonly commandClass = CommandClasses.ManufacturerSpecific; // 0x72 (114)
	public static readonly version = 2;

	public static matches(packet: Packet): boolean {
		return packet.commandClass === this.commandClass;
	}

	constructor(commandAndPayload: Buffer) {
		super(ManufacturerSpecificV2, commandAndPayload);
	}
}

export class ManufacturerSpecificGet extends CommandPacket<void> {
	public static readonly CommandClass = ManufacturerSpecificV2;
	public static readonly command = 0x04; // 4
	public static readonly definition = convertFromJsonCommand({
		"command": 4,
		"name": "ManufacturerSpecificGet",
		"help": "Manufacturer Specific Get",
		"status": "Active",
		"params": []
	} as JsonCommandDefinition);

	static matches(packet: Packet): boolean {
		return packet.tryAs(ManufacturerSpecificV2)?.command === this.command;
	}

	constructor(data: Buffer | void) {
		super(ManufacturerSpecificGet, data);
	}
};

export class ManufacturerSpecificReport extends CommandPacket<ManufacturerSpecificV2ManufacturerSpecificReportData> {
	public static readonly CommandClass = ManufacturerSpecificV2;
	public static readonly command = 0x05; // 5
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
	} as JsonCommandDefinition);

	static matches(packet: Packet): boolean {
		return packet.tryAs(ManufacturerSpecificV2)?.command === this.command;
	}

	constructor(data: Buffer | ManufacturerSpecificV2ManufacturerSpecificReportData) {
		super(ManufacturerSpecificReport, data);
	}
};

export class DeviceSpecificGet extends CommandPacket<ManufacturerSpecificV2DeviceSpecificGetData> {
	public static readonly CommandClass = ManufacturerSpecificV2;
	public static readonly command = 0x06; // 6
	public static readonly definition = convertFromJsonCommand({
		"command": 6,
		"name": "DeviceSpecificGet",
		"help": "Device Specific Get",
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
						"mask": 248,
						"shift": 3,
						"reserved": true
					},
					{
						"fieldType": "Enum",
						"name": "deviceIdType",
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
	} as JsonCommandDefinition);

	static matches(packet: Packet): boolean {
		return packet.tryAs(ManufacturerSpecificV2)?.command === this.command;
	}

	constructor(data: Buffer | ManufacturerSpecificV2DeviceSpecificGetData) {
		super(DeviceSpecificGet, data);
	}
};

export class DeviceSpecificReport extends CommandPacket<ManufacturerSpecificV2DeviceSpecificReportData> {
	public static readonly CommandClass = ManufacturerSpecificV2;
	public static readonly command = 0x07; // 7
	public static readonly definition = convertFromJsonCommand({
		"command": 7,
		"name": "DeviceSpecificReport",
		"help": "Device Specific Report",
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
						"mask": 248,
						"shift": 3,
						"reserved": true
					},
					{
						"fieldType": "Enum",
						"name": "deviceIdType",
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
				"type": "Bitfield",
				"name": "properties2",
				"help": "Properties2",
				"length": 1,
				"fields": [
					{
						"fieldType": "Enum",
						"name": "deviceIdDataFormat",
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
						"fieldType": "Integer",
						"name": "deviceIdDataLengthIndicator",
						"mask": 31,
						"shift": 0,
						"lengthOf": {
							"refs": [
								"deviceIdData"
							]
						},
						"isAutogenerated": true
					}
				]
			},
			{
				"type": "Blob",
				"name": "deviceIdData",
				"help": "Device ID Data",
				"length": {
					"lengthType": "Ref",
					"from": {
						"ref": "properties2.deviceIdDataLengthIndicator"
					}
				}
			}
		]
	} as JsonCommandDefinition);

	static matches(packet: Packet): boolean {
		return packet.tryAs(ManufacturerSpecificV2)?.command === this.command;
	}

	constructor(data: Buffer | ManufacturerSpecificV2DeviceSpecificReportData) {
		super(DeviceSpecificReport, data);
	}
};
