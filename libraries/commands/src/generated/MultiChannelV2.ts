/**
 * Command Class Multi Channel, version 2.
 *
 * Auto-generated, do not edit.
 */

import { CommandClasses, CommandClassPacket, CommandPacket, Packet } from "@ezwave/codec";
import { convertFromJsonCommand, JsonCommandDefinition } from "@ezwave/spec";

export enum MultiChannelV2Commands {
	MultiChannelCapabilityGet = 0x09,
	MultiChannelCapabilityReport = 0x0a,
	MultiChannelCmdEncap = 0x0d,
	MultiChannelEndPointFind = 0x0b,
	MultiChannelEndPointFindReport = 0x0c,
	MultiChannelEndPointGet = 0x07,
	MultiChannelEndPointReport = 0x08,
	MultiInstanceCmdEncap = 0x06,
	MultiInstanceGet = 0x04,
	MultiInstanceReport = 0x05,
}

export interface MultiChannelV2MultiChannelCapabilityGetData {
	endPoint: number; // properties1[6..0]
}

export interface MultiChannelV2MultiChannelCapabilityReportData {
	dynamic: boolean; // properties1[7]
	endPoint: number; // properties1[6..0]
	genericDeviceClass: number; // 1 byte unsigned integer
	specificDeviceClass: number; // 1 byte unsigned integer
	commandClasses: CommandClasses[]; // automatic length
}

export interface MultiChannelV2MultiChannelCmdEncapData {
	sourceEndPoint: number; // properties1[6..0]
	bitAddress: boolean; // properties2[7]
	destinationEndPoint: number; // properties2[6..0]
	command: Packet; // automatic length
}

export interface MultiChannelV2MultiChannelEndPointFindData {
	genericDeviceClass: number; // 1 byte unsigned integer
	specificDeviceClass: number; // 1 byte unsigned integer
}

export interface MultiChannelV2MultiChannelEndPointFindReportData {
	reportsToFollow: number; // 1 byte unsigned integer
	genericDeviceClass: number; // 1 byte unsigned integer
	specificDeviceClass: number; // 1 byte unsigned integer
	vg: Array<{ // automatic length
		endPoint: number; // properties1[6..0]
	}>;
}

export interface MultiChannelV2MultiChannelEndPointReportData {
	dynamic: boolean; // properties1[7]
	identical: boolean; // properties1[6]
	endPoints: number; // properties2[6..0]
}

export interface MultiChannelV2MultiInstanceCmdEncapData {
	instance: number; // properties1[6..0]
	command: Packet; // automatic length
}

export interface MultiChannelV2MultiInstanceGetData {
	commandClass: number; // 1 byte unsigned integer
}

export interface MultiChannelV2MultiInstanceReportData {
	commandClass: number; // 1 byte unsigned integer
	instances: number; // properties1[6..0]
}

// Obsolete
export class MultiChannelV2 extends CommandClassPacket<MultiChannelV2Commands> {
	public static readonly commandClass = CommandClasses.MultiChannel; // 0x60 (96)
	public static readonly version = 2;

	public static matches(packet: Packet): boolean {
		return packet.commandClass === this.commandClass;
	}

	constructor(commandAndPayload: Buffer) {
		super(MultiChannelV2, commandAndPayload);
	}
}

export class MultiChannelCapabilityGet extends CommandPacket<MultiChannelV2MultiChannelCapabilityGetData> {
	public static readonly CommandClass = MultiChannelV2;
	public static readonly command = 0x09; // 9
	public static readonly definition = convertFromJsonCommand({
		"command": 9,
		"name": "MultiChannelCapabilityGet",
		"help": "Multi Channel Capability Get",
		"status": "Active",
		"params": [
			{
				"type": "Bitfield",
				"name": "properties1",
				"help": "Properties1",
				"length": 1,
				"fields": [
					{
						"fieldType": "Boolean",
						"name": "res",
						"mask": 128,
						"shift": 7,
						"reserved": true
					},
					{
						"fieldType": "Integer",
						"name": "endPoint",
						"mask": 127,
						"shift": 0
					}
				]
			}
		]
	} as JsonCommandDefinition);

	static matches(packet: Packet): boolean {
		return packet.tryAs(MultiChannelV2)?.command === this.command;
	}

	constructor(data: Buffer | MultiChannelV2MultiChannelCapabilityGetData) {
		super(MultiChannelCapabilityGet, data);
	}
};

export class MultiChannelCapabilityReport extends CommandPacket<MultiChannelV2MultiChannelCapabilityReportData> {
	public static readonly CommandClass = MultiChannelV2;
	public static readonly command = 0x0a; // 10
	public static readonly definition = convertFromJsonCommand({
		"command": 10,
		"name": "MultiChannelCapabilityReport",
		"help": "Multi Channel Capability Report",
		"status": "Active",
		"params": [
			{
				"type": "Bitfield",
				"name": "properties1",
				"help": "Properties1",
				"length": 1,
				"fields": [
					{
						"fieldType": "Boolean",
						"name": "dynamic",
						"mask": 128,
						"shift": 7
					},
					{
						"fieldType": "Integer",
						"name": "endPoint",
						"mask": 127,
						"shift": 0
					}
				]
			},
			{
				"type": "Integer",
				"name": "genericDeviceClass",
				"help": "Generic Device Class",
				"length": 1,
				"valueType": "GenericDevice"
			},
			{
				"type": "Integer",
				"name": "specificDeviceClass",
				"help": "Specific Device Class",
				"length": 1,
				"valueType": "SpecificDevice"
			},
			{
				"type": "Blob",
				"name": "commandClasses",
				"help": "Command Classes",
				"length": {
					"lengthType": "Auto"
				},
				"blobType": "CommandClasses"
			}
		]
	} as JsonCommandDefinition);

	static matches(packet: Packet): boolean {
		return packet.tryAs(MultiChannelV2)?.command === this.command;
	}

	constructor(data: Buffer | MultiChannelV2MultiChannelCapabilityReportData) {
		super(MultiChannelCapabilityReport, data);
	}
};

export class MultiChannelCmdEncap extends CommandPacket<MultiChannelV2MultiChannelCmdEncapData> {
	public static readonly CommandClass = MultiChannelV2;
	public static readonly command = 0x0d; // 13
	public static readonly definition = convertFromJsonCommand({
		"command": 13,
		"name": "MultiChannelCmdEncap",
		"help": "Multi Channel Command Encapsulation",
		"status": "Active",
		"params": [
			{
				"type": "Bitfield",
				"name": "properties1",
				"help": "Properties1",
				"length": 1,
				"fields": [
					{
						"fieldType": "Boolean",
						"name": "res",
						"mask": 128,
						"shift": 7,
						"reserved": true
					},
					{
						"fieldType": "Integer",
						"name": "sourceEndPoint",
						"mask": 127,
						"shift": 0
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
						"fieldType": "Boolean",
						"name": "bitAddress",
						"mask": 128,
						"shift": 7
					},
					{
						"fieldType": "Integer",
						"name": "destinationEndPoint",
						"mask": 127,
						"shift": 0
					}
				]
			},
			{
				"type": "Blob",
				"name": "command",
				"help": "Encapsulated command",
				"length": {
					"lengthType": "Auto"
				},
				"blobType": "CommandEncapsulation"
			}
		]
	} as JsonCommandDefinition);

	static matches(packet: Packet): boolean {
		return packet.tryAs(MultiChannelV2)?.command === this.command;
	}

	constructor(data: Buffer | MultiChannelV2MultiChannelCmdEncapData) {
		super(MultiChannelCmdEncap, data);
	}
};

export class MultiChannelEndPointFind extends CommandPacket<MultiChannelV2MultiChannelEndPointFindData> {
	public static readonly CommandClass = MultiChannelV2;
	public static readonly command = 0x0b; // 11
	public static readonly definition = convertFromJsonCommand({
		"command": 11,
		"name": "MultiChannelEndPointFind",
		"help": "Multi Channel End Point Find",
		"status": "Active",
		"params": [
			{
				"type": "Integer",
				"name": "genericDeviceClass",
				"help": "Generic Device Class",
				"length": 1,
				"valueType": "GenericDevice"
			},
			{
				"type": "Integer",
				"name": "specificDeviceClass",
				"help": "Specific Device Class",
				"length": 1,
				"valueType": "SpecificDevice"
			}
		]
	} as JsonCommandDefinition);

	static matches(packet: Packet): boolean {
		return packet.tryAs(MultiChannelV2)?.command === this.command;
	}

	constructor(data: Buffer | MultiChannelV2MultiChannelEndPointFindData) {
		super(MultiChannelEndPointFind, data);
	}
};

export class MultiChannelEndPointFindReport extends CommandPacket<MultiChannelV2MultiChannelEndPointFindReportData> {
	public static readonly CommandClass = MultiChannelV2;
	public static readonly command = 0x0c; // 12
	public static readonly definition = convertFromJsonCommand({
		"command": 12,
		"name": "MultiChannelEndPointFindReport",
		"help": "Multi Channel End Point Find Report",
		"status": "Active",
		"params": [
			{
				"type": "Integer",
				"name": "reportsToFollow",
				"help": "Reports to Follow",
				"length": 1
			},
			{
				"type": "Integer",
				"name": "genericDeviceClass",
				"help": "Generic Device Class",
				"length": 1,
				"valueType": "GenericDevice"
			},
			{
				"type": "Integer",
				"name": "specificDeviceClass",
				"help": "Specific Device Class",
				"length": 1,
				"valueType": "SpecificDevice"
			},
			{
				"type": "Group",
				"name": "vg",
				"help": "vg",
				"length": {
					"lengthType": "Auto"
				},
				"params": [
					{
						"type": "Bitfield",
						"name": "properties1",
						"help": "Properties1",
						"length": 1,
						"fields": [
							{
								"fieldType": "Boolean",
								"name": "res",
								"mask": 128,
								"shift": 7,
								"reserved": true
							},
							{
								"fieldType": "Integer",
								"name": "endPoint",
								"mask": 127,
								"shift": 0
							}
						]
					}
				]
			}
		]
	} as JsonCommandDefinition);

	static matches(packet: Packet): boolean {
		return packet.tryAs(MultiChannelV2)?.command === this.command;
	}

	constructor(data: Buffer | MultiChannelV2MultiChannelEndPointFindReportData) {
		super(MultiChannelEndPointFindReport, data);
	}
};

export class MultiChannelEndPointGet extends CommandPacket<void> {
	public static readonly CommandClass = MultiChannelV2;
	public static readonly command = 0x07; // 7
	public static readonly definition = convertFromJsonCommand({
		"command": 7,
		"name": "MultiChannelEndPointGet",
		"help": "Multi Channel End Point Get",
		"status": "Active",
		"params": []
	} as JsonCommandDefinition);

	static matches(packet: Packet): boolean {
		return packet.tryAs(MultiChannelV2)?.command === this.command;
	}

	constructor(data: Buffer | void) {
		super(MultiChannelEndPointGet, data);
	}
};

export class MultiChannelEndPointReport extends CommandPacket<MultiChannelV2MultiChannelEndPointReportData> {
	public static readonly CommandClass = MultiChannelV2;
	public static readonly command = 0x08; // 8
	public static readonly definition = convertFromJsonCommand({
		"command": 8,
		"name": "MultiChannelEndPointReport",
		"help": "Multi Channel End Point Report",
		"status": "Active",
		"params": [
			{
				"type": "Bitfield",
				"name": "properties1",
				"help": "Properties1",
				"length": 1,
				"fields": [
					{
						"fieldType": "Boolean",
						"name": "dynamic",
						"mask": 128,
						"shift": 7
					},
					{
						"fieldType": "Boolean",
						"name": "identical",
						"mask": 64,
						"shift": 6
					},
					{
						"fieldType": "Integer",
						"name": "res1",
						"mask": 63,
						"shift": 0,
						"reserved": true
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
						"fieldType": "Boolean",
						"name": "res2",
						"mask": 128,
						"shift": 7,
						"reserved": true
					},
					{
						"fieldType": "Integer",
						"name": "endPoints",
						"mask": 127,
						"shift": 0
					}
				]
			}
		]
	} as JsonCommandDefinition);

	static matches(packet: Packet): boolean {
		return packet.tryAs(MultiChannelV2)?.command === this.command;
	}

	constructor(data: Buffer | MultiChannelV2MultiChannelEndPointReportData) {
		super(MultiChannelEndPointReport, data);
	}
};

export class MultiInstanceCmdEncap extends CommandPacket<MultiChannelV2MultiInstanceCmdEncapData> {
	public static readonly CommandClass = MultiChannelV2;
	public static readonly command = 0x06; // 6
	public static readonly definition = convertFromJsonCommand({
		"command": 6,
		"name": "MultiInstanceCmdEncap",
		"help": "Multi Instance Cmd Encap",
		"status": "Active",
		"params": [
			{
				"type": "Bitfield",
				"name": "properties1",
				"help": "Properties1",
				"length": 1,
				"fields": [
					{
						"fieldType": "Boolean",
						"name": "res",
						"mask": 128,
						"shift": 7,
						"reserved": true
					},
					{
						"fieldType": "Integer",
						"name": "instance",
						"mask": 127,
						"shift": 0
					}
				]
			},
			{
				"type": "Blob",
				"name": "command",
				"help": "Encapsulated command",
				"length": {
					"lengthType": "Auto"
				},
				"blobType": "CommandEncapsulation"
			}
		]
	} as JsonCommandDefinition);

	static matches(packet: Packet): boolean {
		return packet.tryAs(MultiChannelV2)?.command === this.command;
	}

	constructor(data: Buffer | MultiChannelV2MultiInstanceCmdEncapData) {
		super(MultiInstanceCmdEncap, data);
	}
};

export class MultiInstanceGet extends CommandPacket<MultiChannelV2MultiInstanceGetData> {
	public static readonly CommandClass = MultiChannelV2;
	public static readonly command = 0x04; // 4
	public static readonly definition = convertFromJsonCommand({
		"command": 4,
		"name": "MultiInstanceGet",
		"help": "Multi Instance Get",
		"status": "Active",
		"params": [
			{
				"type": "Integer",
				"name": "commandClass",
				"help": "Command Class",
				"length": 1,
				"valueType": "CommandClass"
			}
		]
	} as JsonCommandDefinition);

	static matches(packet: Packet): boolean {
		return packet.tryAs(MultiChannelV2)?.command === this.command;
	}

	constructor(data: Buffer | MultiChannelV2MultiInstanceGetData) {
		super(MultiInstanceGet, data);
	}
};

export class MultiInstanceReport extends CommandPacket<MultiChannelV2MultiInstanceReportData> {
	public static readonly CommandClass = MultiChannelV2;
	public static readonly command = 0x05; // 5
	public static readonly definition = convertFromJsonCommand({
		"command": 5,
		"name": "MultiInstanceReport",
		"help": "Multi Instance Report",
		"status": "Active",
		"params": [
			{
				"type": "Integer",
				"name": "commandClass",
				"help": "Command Class",
				"length": 1,
				"valueType": "CommandClass"
			},
			{
				"type": "Bitfield",
				"name": "properties1",
				"help": "Properties1",
				"length": 1,
				"fields": [
					{
						"fieldType": "Boolean",
						"name": "res",
						"mask": 128,
						"shift": 7,
						"reserved": true
					},
					{
						"fieldType": "Integer",
						"name": "instances",
						"mask": 127,
						"shift": 0
					}
				]
			}
		]
	} as JsonCommandDefinition);

	static matches(packet: Packet): boolean {
		return packet.tryAs(MultiChannelV2)?.command === this.command;
	}

	constructor(data: Buffer | MultiChannelV2MultiInstanceReportData) {
		super(MultiInstanceReport, data);
	}
};