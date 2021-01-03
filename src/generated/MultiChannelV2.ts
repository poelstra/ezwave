/**
 * Command Class Multi Channel, version 2.
 *
 * Auto-generated, do not edit.
 */

import { CommandClassPacket, CommandPacket } from "../commands/command";
import { Packet } from "../commands/packet";
import { CommandDefinition } from "../commands/types";
import CommandClasses from "../generated/CommandClasses";

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
	// TODO param commandClass type enumarray
}

export interface MultiChannelV2MultiChannelCmdEncapData {
	sourceEndPoint: number; // properties1[6..0]
	bitAddress: boolean; // properties2[7]
	destinationEndPoint: number; // properties2[6..0]
	commandClass: number; // 1 byte unsigned integer
	command: number; // 1 byte unsigned integer
	parameter: Buffer; // automatic length
}

export interface MultiChannelV2MultiChannelEndPointFindData {
	genericDeviceClass: number; // 1 byte unsigned integer
	specificDeviceClass: number; // 1 byte unsigned integer
}

export interface MultiChannelV2MultiChannelEndPointFindReportData {
	reportsToFollow: number; // 1 byte unsigned integer
	genericDeviceClass: number; // 1 byte unsigned integer
	specificDeviceClass: number; // 1 byte unsigned integer
	// TODO param vg type group
}

export interface MultiChannelV2MultiChannelEndPointReportData {
	dynamic: boolean; // properties1[7]
	identical: boolean; // properties1[6]
	endPoints: number; // properties2[6..0]
}

export interface MultiChannelV2MultiInstanceCmdEncapData {
	instance: number; // properties1[6..0]
	commandClass: number; // 1 byte unsigned integer
	command: number; // 1 byte unsigned integer
	parameter: Buffer; // automatic length
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

	public static matches(packet: Packet): boolean {
		return packet.commandClass === this.commandClass;
	}

	constructor(commandAndPayload: Buffer) {
		super(MultiChannelV2, commandAndPayload);
	}

	public static readonly MultiChannelCapabilityGet = class MultiChannelCapabilityGet extends CommandPacket<MultiChannelV2MultiChannelCapabilityGetData> {
		public static readonly CommandClass = MultiChannelV2;
		public static readonly command = 0x09;
		public static readonly definition = {
			"command": 9,
			"name": "MultiChannelCapabilityGet",
			"help": "Multi Channel Capability Get",
			"status": "active",
			"params": [
				{
					"type": "bitfield",
					"name": "properties1",
					"help": "Properties1",
					"length": 1,
					"fields": [
						{
							"type": "boolean",
							"name": "res",
							"mask": 128,
							"shift": 7,
							"reserved": true
						},
						{
							"type": "integer",
							"name": "endPoint",
							"mask": 127,
							"shift": 0
						}
					]
				}
			]
		} as CommandDefinition;

		static matches(packet: Packet): boolean {
			return packet.tryAs(MultiChannelV2)?.command === this.command;
		}

		constructor(data: Buffer | MultiChannelV2MultiChannelCapabilityGetData) {
			super(MultiChannelCapabilityGet, data);
		}
	};

	public static readonly MultiChannelCapabilityReport = class MultiChannelCapabilityReport extends CommandPacket<MultiChannelV2MultiChannelCapabilityReportData> {
		public static readonly CommandClass = MultiChannelV2;
		public static readonly command = 0x0a;
		public static readonly definition = {
			"command": 10,
			"name": "MultiChannelCapabilityReport",
			"help": "Multi Channel Capability Report",
			"status": "active",
			"params": [
				{
					"type": "bitfield",
					"name": "properties1",
					"help": "Properties1",
					"length": 1,
					"fields": [
						{
							"type": "boolean",
							"name": "dynamic",
							"mask": 128,
							"shift": 7
						},
						{
							"type": "integer",
							"name": "endPoint",
							"mask": 127,
							"shift": 0
						}
					]
				},
				{
					"type": "integer",
					"name": "genericDeviceClass",
					"help": "Generic Device Class",
					"length": 1,
					"valueType": "GEN_DEV_REF"
				},
				{
					"type": "integer",
					"name": "specificDeviceClass",
					"help": "Specific Device Class",
					"length": 1,
					"valueType": "SPEC_DEV_REF"
				},
				{
					"type": "enumarray",
					"name": "commandClass",
					"help": "Command Class",
					"length": {
						"lengthType": "auto",
						"endOffset": 0
					},
					"valueType": "CMD_CLASS_REF"
				}
			]
		} as CommandDefinition;

		static matches(packet: Packet): boolean {
			return packet.tryAs(MultiChannelV2)?.command === this.command;
		}

		constructor(data: Buffer | MultiChannelV2MultiChannelCapabilityReportData) {
			super(MultiChannelCapabilityReport, data);
		}
	};

	public static readonly MultiChannelCmdEncap = class MultiChannelCmdEncap extends CommandPacket<MultiChannelV2MultiChannelCmdEncapData> {
		public static readonly CommandClass = MultiChannelV2;
		public static readonly command = 0x0d;
		public static readonly definition = {
			"command": 13,
			"name": "MultiChannelCmdEncap",
			"help": "Multi Channel Command Encapsulation",
			"status": "active",
			"params": [
				{
					"type": "bitfield",
					"name": "properties1",
					"help": "Properties1",
					"length": 1,
					"fields": [
						{
							"type": "boolean",
							"name": "res",
							"mask": 128,
							"shift": 7,
							"reserved": true
						},
						{
							"type": "integer",
							"name": "sourceEndPoint",
							"mask": 127,
							"shift": 0
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
							"type": "boolean",
							"name": "bitAddress",
							"mask": 128,
							"shift": 7
						},
						{
							"type": "integer",
							"name": "destinationEndPoint",
							"mask": 127,
							"shift": 0
						}
					]
				},
				{
					"type": "integer",
					"name": "commandClass",
					"help": "Command Class",
					"length": 1,
					"valueType": "CMD_CLASS_REF"
				},
				{
					"type": "integer",
					"name": "command",
					"help": "Command",
					"length": 1,
					"valueType": "CMD_REF"
				},
				{
					"type": "blob",
					"name": "parameter",
					"help": "Parameter",
					"length": {
						"lengthType": "auto",
						"endOffset": 0
					},
					"blobType": "CMD_DATA"
				}
			]
		} as CommandDefinition;

		static matches(packet: Packet): boolean {
			return packet.tryAs(MultiChannelV2)?.command === this.command;
		}

		constructor(data: Buffer | MultiChannelV2MultiChannelCmdEncapData) {
			super(MultiChannelCmdEncap, data);
		}
	};

	public static readonly MultiChannelEndPointFind = class MultiChannelEndPointFind extends CommandPacket<MultiChannelV2MultiChannelEndPointFindData> {
		public static readonly CommandClass = MultiChannelV2;
		public static readonly command = 0x0b;
		public static readonly definition = {
			"command": 11,
			"name": "MultiChannelEndPointFind",
			"help": "Multi Channel End Point Find",
			"status": "active",
			"params": [
				{
					"type": "integer",
					"name": "genericDeviceClass",
					"help": "Generic Device Class",
					"length": 1,
					"valueType": "GEN_DEV_REF"
				},
				{
					"type": "integer",
					"name": "specificDeviceClass",
					"help": "Specific Device Class",
					"length": 1,
					"valueType": "SPEC_DEV_REF"
				}
			]
		} as CommandDefinition;

		static matches(packet: Packet): boolean {
			return packet.tryAs(MultiChannelV2)?.command === this.command;
		}

		constructor(data: Buffer | MultiChannelV2MultiChannelEndPointFindData) {
			super(MultiChannelEndPointFind, data);
		}
	};

	public static readonly MultiChannelEndPointFindReport = class MultiChannelEndPointFindReport extends CommandPacket<MultiChannelV2MultiChannelEndPointFindReportData> {
		public static readonly CommandClass = MultiChannelV2;
		public static readonly command = 0x0c;
		public static readonly definition = {
			"command": 12,
			"name": "MultiChannelEndPointFindReport",
			"help": "Multi Channel End Point Find Report",
			"status": "active",
			"params": [
				{
					"type": "integer",
					"name": "reportsToFollow",
					"help": "Reports to Follow",
					"length": 1
				},
				{
					"type": "integer",
					"name": "genericDeviceClass",
					"help": "Generic Device Class",
					"length": 1,
					"valueType": "GEN_DEV_REF"
				},
				{
					"type": "integer",
					"name": "specificDeviceClass",
					"help": "Specific Device Class",
					"length": 1,
					"valueType": "SPEC_DEV_REF"
				},
				{
					"type": "group",
					"name": "vg",
					"help": "vg",
					"length": {
						"lengthType": "auto",
						"endOffset": 0
					},
					"params": [
						{
							"type": "bitfield",
							"name": "properties1",
							"help": "Properties1",
							"length": 1,
							"fields": [
								{
									"type": "integer",
									"name": "endPoint",
									"mask": 127,
									"shift": 0
								},
								{
									"type": "boolean",
									"name": "res",
									"mask": 128,
									"shift": 7,
									"reserved": true
								}
							]
						}
					]
				}
			]
		} as CommandDefinition;

		static matches(packet: Packet): boolean {
			return packet.tryAs(MultiChannelV2)?.command === this.command;
		}

		constructor(data: Buffer | MultiChannelV2MultiChannelEndPointFindReportData) {
			super(MultiChannelEndPointFindReport, data);
		}
	};

	public static readonly MultiChannelEndPointGet = class MultiChannelEndPointGet extends CommandPacket<void> {
		public static readonly CommandClass = MultiChannelV2;
		public static readonly command = 0x07;
		public static readonly definition = {
			"command": 7,
			"name": "MultiChannelEndPointGet",
			"help": "Multi Channel End Point Get",
			"status": "active",
			"params": []
		} as CommandDefinition;

		static matches(packet: Packet): boolean {
			return packet.tryAs(MultiChannelV2)?.command === this.command;
		}

		constructor(data: Buffer | void) {
			super(MultiChannelEndPointGet, data);
		}
	};

	public static readonly MultiChannelEndPointReport = class MultiChannelEndPointReport extends CommandPacket<MultiChannelV2MultiChannelEndPointReportData> {
		public static readonly CommandClass = MultiChannelV2;
		public static readonly command = 0x08;
		public static readonly definition = {
			"command": 8,
			"name": "MultiChannelEndPointReport",
			"help": "Multi Channel End Point Report",
			"status": "active",
			"params": [
				{
					"type": "bitfield",
					"name": "properties1",
					"help": "Properties1",
					"length": 1,
					"fields": [
						{
							"type": "boolean",
							"name": "dynamic",
							"mask": 128,
							"shift": 7
						},
						{
							"type": "boolean",
							"name": "identical",
							"mask": 64,
							"shift": 6
						},
						{
							"type": "integer",
							"name": "res1",
							"mask": 63,
							"shift": 0,
							"reserved": true
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
							"type": "boolean",
							"name": "res2",
							"mask": 128,
							"shift": 7,
							"reserved": true
						},
						{
							"type": "integer",
							"name": "endPoints",
							"mask": 127,
							"shift": 0
						}
					]
				}
			]
		} as CommandDefinition;

		static matches(packet: Packet): boolean {
			return packet.tryAs(MultiChannelV2)?.command === this.command;
		}

		constructor(data: Buffer | MultiChannelV2MultiChannelEndPointReportData) {
			super(MultiChannelEndPointReport, data);
		}
	};

	public static readonly MultiInstanceCmdEncap = class MultiInstanceCmdEncap extends CommandPacket<MultiChannelV2MultiInstanceCmdEncapData> {
		public static readonly CommandClass = MultiChannelV2;
		public static readonly command = 0x06;
		public static readonly definition = {
			"command": 6,
			"name": "MultiInstanceCmdEncap",
			"help": "Multi Instance Cmd Encap",
			"status": "active",
			"params": [
				{
					"type": "bitfield",
					"name": "properties1",
					"help": "Properties1",
					"length": 1,
					"fields": [
						{
							"type": "boolean",
							"name": "res",
							"mask": 128,
							"shift": 7,
							"reserved": true
						},
						{
							"type": "integer",
							"name": "instance",
							"mask": 127,
							"shift": 0
						}
					]
				},
				{
					"type": "integer",
					"name": "commandClass",
					"help": "Command Class",
					"length": 1,
					"valueType": "CMD_CLASS_REF"
				},
				{
					"type": "integer",
					"name": "command",
					"help": "Command",
					"length": 1,
					"valueType": "CMD_REF"
				},
				{
					"type": "blob",
					"name": "parameter",
					"help": "Parameter",
					"length": {
						"lengthType": "auto",
						"endOffset": 0
					},
					"blobType": "CMD_DATA"
				}
			]
		} as CommandDefinition;

		static matches(packet: Packet): boolean {
			return packet.tryAs(MultiChannelV2)?.command === this.command;
		}

		constructor(data: Buffer | MultiChannelV2MultiInstanceCmdEncapData) {
			super(MultiInstanceCmdEncap, data);
		}
	};

	public static readonly MultiInstanceGet = class MultiInstanceGet extends CommandPacket<MultiChannelV2MultiInstanceGetData> {
		public static readonly CommandClass = MultiChannelV2;
		public static readonly command = 0x04;
		public static readonly definition = {
			"command": 4,
			"name": "MultiInstanceGet",
			"help": "Multi Instance Get",
			"status": "active",
			"params": [
				{
					"type": "integer",
					"name": "commandClass",
					"help": "Command Class",
					"length": 1,
					"valueType": "CMD_CLASS_REF"
				}
			]
		} as CommandDefinition;

		static matches(packet: Packet): boolean {
			return packet.tryAs(MultiChannelV2)?.command === this.command;
		}

		constructor(data: Buffer | MultiChannelV2MultiInstanceGetData) {
			super(MultiInstanceGet, data);
		}
	};

	public static readonly MultiInstanceReport = class MultiInstanceReport extends CommandPacket<MultiChannelV2MultiInstanceReportData> {
		public static readonly CommandClass = MultiChannelV2;
		public static readonly command = 0x05;
		public static readonly definition = {
			"command": 5,
			"name": "MultiInstanceReport",
			"help": "Multi Instance Report",
			"status": "active",
			"params": [
				{
					"type": "integer",
					"name": "commandClass",
					"help": "Command Class",
					"length": 1,
					"valueType": "CMD_CLASS_REF"
				},
				{
					"type": "bitfield",
					"name": "properties1",
					"help": "Properties1",
					"length": 1,
					"fields": [
						{
							"type": "boolean",
							"name": "res",
							"mask": 128,
							"shift": 7,
							"reserved": true
						},
						{
							"type": "integer",
							"name": "instances",
							"mask": 127,
							"shift": 0
						}
					]
				}
			]
		} as CommandDefinition;

		static matches(packet: Packet): boolean {
			return packet.tryAs(MultiChannelV2)?.command === this.command;
		}

		constructor(data: Buffer | MultiChannelV2MultiInstanceReportData) {
			super(MultiInstanceReport, data);
		}
	};
}

export namespace MultiChannelV2 {
	export type MultiChannelCapabilityGet = InstanceType<typeof MultiChannelV2.MultiChannelCapabilityGet>;
	export type MultiChannelCapabilityReport = InstanceType<typeof MultiChannelV2.MultiChannelCapabilityReport>;
	export type MultiChannelCmdEncap = InstanceType<typeof MultiChannelV2.MultiChannelCmdEncap>;
	export type MultiChannelEndPointFind = InstanceType<typeof MultiChannelV2.MultiChannelEndPointFind>;
	export type MultiChannelEndPointFindReport = InstanceType<typeof MultiChannelV2.MultiChannelEndPointFindReport>;
	export type MultiChannelEndPointGet = InstanceType<typeof MultiChannelV2.MultiChannelEndPointGet>;
	export type MultiChannelEndPointReport = InstanceType<typeof MultiChannelV2.MultiChannelEndPointReport>;
	export type MultiInstanceCmdEncap = InstanceType<typeof MultiChannelV2.MultiInstanceCmdEncap>;
	export type MultiInstanceGet = InstanceType<typeof MultiChannelV2.MultiInstanceGet>;
	export type MultiInstanceReport = InstanceType<typeof MultiChannelV2.MultiInstanceReport>;
}
