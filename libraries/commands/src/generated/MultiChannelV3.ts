/**
 * Command Class Multi Channel, version 3.
 *
 * Auto-generated, do not edit.
 */

import { CommandClassPacket, CommandPacket, Packet } from "@ezwave/codec";
import { CommandClasses, convertFromJsonCommand, JsonCommandDefinition } from "@ezwave/spec";

export enum MultiChannelV3Commands {
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

export interface MultiChannelV3MultiChannelCapabilityGetData {
	endPoint: number; // properties1[6..0]
}

export interface MultiChannelV3MultiChannelCapabilityReportData {
	dynamic: boolean; // properties1[7]
	endPoint: number; // properties1[6..0]
	genericDeviceClass: number; // 1 byte unsigned integer
	specificDeviceClass: number; // 1 byte unsigned integer
	commandClasses: CommandClasses[]; // automatic length
}

export interface MultiChannelV3MultiChannelCmdEncapData {
	sourceEndPoint: number; // properties1[6..0]
	bitAddress: boolean; // properties2[7]
	destinationEndPoint: number; // properties2[6..0]
	command: Packet; // automatic length
}

export interface MultiChannelV3MultiChannelEndPointFindData {
	genericDeviceClass: number; // 1 byte unsigned integer
	specificDeviceClass: number; // 1 byte unsigned integer
}

export interface MultiChannelV3MultiChannelEndPointFindReportData {
	reportsToFollow: number; // 1 byte unsigned integer
	genericDeviceClass: number; // 1 byte unsigned integer
	specificDeviceClass: number; // 1 byte unsigned integer
	vg: Array<{ // automatic length
		endPoint: number; // properties1[6..0]
	}>;
}

export interface MultiChannelV3MultiChannelEndPointReportData {
	dynamic: boolean; // properties1[7]
	identical: boolean; // properties1[6]
	endPoints: number; // properties2[6..0]
}

export interface MultiChannelV3MultiInstanceCmdEncapData {
	instance: number; // properties1[6..0]
	command: Packet; // automatic length
}

export interface MultiChannelV3MultiInstanceGetData {
	commandClass: number; // 1 byte unsigned integer
}

export interface MultiChannelV3MultiInstanceReportData {
	commandClass: number; // 1 byte unsigned integer
	instances: number; // properties1[6..0]
}

export class MultiChannelV3 extends CommandClassPacket<MultiChannelV3Commands> {
	public static readonly commandClass = CommandClasses.MultiChannel; // 0x60 (96)
	public static readonly version = 3;

	public static matches(packet: Packet): boolean {
		return packet.commandClass === this.commandClass;
	}

	constructor(commandAndPayload: Buffer) {
		super(MultiChannelV3, commandAndPayload);
	}

	public static readonly MultiChannelCapabilityGet = class MultiChannelCapabilityGet extends CommandPacket<MultiChannelV3MultiChannelCapabilityGetData> {
		public static readonly CommandClass = MultiChannelV3;
		public static readonly command = 0x09;
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
			return packet.tryAs(MultiChannelV3)?.command === this.command;
		}

		constructor(data: Buffer | MultiChannelV3MultiChannelCapabilityGetData) {
			super(MultiChannelCapabilityGet, data);
		}
	};

	public static readonly MultiChannelCapabilityReport = class MultiChannelCapabilityReport extends CommandPacket<MultiChannelV3MultiChannelCapabilityReportData> {
		public static readonly CommandClass = MultiChannelV3;
		public static readonly command = 0x0a;
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
			return packet.tryAs(MultiChannelV3)?.command === this.command;
		}

		constructor(data: Buffer | MultiChannelV3MultiChannelCapabilityReportData) {
			super(MultiChannelCapabilityReport, data);
		}
	};

	public static readonly MultiChannelCmdEncap = class MultiChannelCmdEncap extends CommandPacket<MultiChannelV3MultiChannelCmdEncapData> {
		public static readonly CommandClass = MultiChannelV3;
		public static readonly command = 0x0d;
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
			return packet.tryAs(MultiChannelV3)?.command === this.command;
		}

		constructor(data: Buffer | MultiChannelV3MultiChannelCmdEncapData) {
			super(MultiChannelCmdEncap, data);
		}
	};

	public static readonly MultiChannelEndPointFind = class MultiChannelEndPointFind extends CommandPacket<MultiChannelV3MultiChannelEndPointFindData> {
		public static readonly CommandClass = MultiChannelV3;
		public static readonly command = 0x0b;
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
			return packet.tryAs(MultiChannelV3)?.command === this.command;
		}

		constructor(data: Buffer | MultiChannelV3MultiChannelEndPointFindData) {
			super(MultiChannelEndPointFind, data);
		}
	};

	public static readonly MultiChannelEndPointFindReport = class MultiChannelEndPointFindReport extends CommandPacket<MultiChannelV3MultiChannelEndPointFindReportData> {
		public static readonly CommandClass = MultiChannelV3;
		public static readonly command = 0x0c;
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
			return packet.tryAs(MultiChannelV3)?.command === this.command;
		}

		constructor(data: Buffer | MultiChannelV3MultiChannelEndPointFindReportData) {
			super(MultiChannelEndPointFindReport, data);
		}
	};

	public static readonly MultiChannelEndPointGet = class MultiChannelEndPointGet extends CommandPacket<void> {
		public static readonly CommandClass = MultiChannelV3;
		public static readonly command = 0x07;
		public static readonly definition = convertFromJsonCommand({
			"command": 7,
			"name": "MultiChannelEndPointGet",
			"help": "Multi Channel End Point Get",
			"status": "Active",
			"params": []
		} as JsonCommandDefinition);

		static matches(packet: Packet): boolean {
			return packet.tryAs(MultiChannelV3)?.command === this.command;
		}

		constructor(data: Buffer | void) {
			super(MultiChannelEndPointGet, data);
		}
	};

	public static readonly MultiChannelEndPointReport = class MultiChannelEndPointReport extends CommandPacket<MultiChannelV3MultiChannelEndPointReportData> {
		public static readonly CommandClass = MultiChannelV3;
		public static readonly command = 0x08;
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
			return packet.tryAs(MultiChannelV3)?.command === this.command;
		}

		constructor(data: Buffer | MultiChannelV3MultiChannelEndPointReportData) {
			super(MultiChannelEndPointReport, data);
		}
	};

	public static readonly MultiInstanceCmdEncap = class MultiInstanceCmdEncap extends CommandPacket<MultiChannelV3MultiInstanceCmdEncapData> {
		public static readonly CommandClass = MultiChannelV3;
		public static readonly command = 0x06;
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
			return packet.tryAs(MultiChannelV3)?.command === this.command;
		}

		constructor(data: Buffer | MultiChannelV3MultiInstanceCmdEncapData) {
			super(MultiInstanceCmdEncap, data);
		}
	};

	public static readonly MultiInstanceGet = class MultiInstanceGet extends CommandPacket<MultiChannelV3MultiInstanceGetData> {
		public static readonly CommandClass = MultiChannelV3;
		public static readonly command = 0x04;
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
			return packet.tryAs(MultiChannelV3)?.command === this.command;
		}

		constructor(data: Buffer | MultiChannelV3MultiInstanceGetData) {
			super(MultiInstanceGet, data);
		}
	};

	public static readonly MultiInstanceReport = class MultiInstanceReport extends CommandPacket<MultiChannelV3MultiInstanceReportData> {
		public static readonly CommandClass = MultiChannelV3;
		public static readonly command = 0x05;
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
			return packet.tryAs(MultiChannelV3)?.command === this.command;
		}

		constructor(data: Buffer | MultiChannelV3MultiInstanceReportData) {
			super(MultiInstanceReport, data);
		}
	};
}

export namespace MultiChannelV3 {
	export type MultiChannelCapabilityGet = InstanceType<typeof MultiChannelV3.MultiChannelCapabilityGet>;
	export type MultiChannelCapabilityReport = InstanceType<typeof MultiChannelV3.MultiChannelCapabilityReport>;
	export type MultiChannelCmdEncap = InstanceType<typeof MultiChannelV3.MultiChannelCmdEncap>;
	export type MultiChannelEndPointFind = InstanceType<typeof MultiChannelV3.MultiChannelEndPointFind>;
	export type MultiChannelEndPointFindReport = InstanceType<typeof MultiChannelV3.MultiChannelEndPointFindReport>;
	export type MultiChannelEndPointGet = InstanceType<typeof MultiChannelV3.MultiChannelEndPointGet>;
	export type MultiChannelEndPointReport = InstanceType<typeof MultiChannelV3.MultiChannelEndPointReport>;
	export type MultiInstanceCmdEncap = InstanceType<typeof MultiChannelV3.MultiInstanceCmdEncap>;
	export type MultiInstanceGet = InstanceType<typeof MultiChannelV3.MultiInstanceGet>;
	export type MultiInstanceReport = InstanceType<typeof MultiChannelV3.MultiInstanceReport>;
}
