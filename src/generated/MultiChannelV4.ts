/**
 * Command Class Multi Channel, version 4.
 *
 * Auto-generated, do not edit.
 */

import { CommandClassPacket, CommandPacket } from "../commands/command";
import { Packet } from "../commands/packet";
import { CommandDefinition } from "../commands/types";
import CommandClasses from "../generated/CommandClasses";

export enum MultiChannelV4Commands {
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
	MultiChannelAggregatedMembersGet = 0x0e,
	MultiChannelAggregatedMembersReport = 0x0f,
}

export interface MultiChannelV4MultiChannelCapabilityGetData {
	// TODO param properties1 type bitfield
}

export interface MultiChannelV4MultiChannelCapabilityReportData {
	// TODO param properties1 type bitfield
	genericDeviceClass: number; // 1 byte unsigned integer
	specificDeviceClass: number; // 1 byte unsigned integer
	// TODO param commandClass type enumarray
}

export interface MultiChannelV4MultiChannelCmdEncapData {
	// TODO param properties1 type bitfield
	// TODO param properties2 type bitfield
	commandClass: number; // 1 byte unsigned integer
	command: number; // 1 byte unsigned integer
	// TODO param parameter type blob
}

export interface MultiChannelV4MultiChannelEndPointFindData {
	genericDeviceClass: number; // 1 byte unsigned integer
	specificDeviceClass: number; // 1 byte unsigned integer
}

export interface MultiChannelV4MultiChannelEndPointFindReportData {
	reportsToFollow: number; // 1 byte unsigned integer
	genericDeviceClass: number; // 1 byte unsigned integer
	specificDeviceClass: number; // 1 byte unsigned integer
	// TODO param vg type group
}

export interface MultiChannelV4MultiChannelEndPointReportData {
	// TODO param properties1 type bitfield
	// TODO param properties2 type bitfield
	// TODO param properties3 type bitfield
}

export interface MultiChannelV4MultiInstanceCmdEncapData {
	// TODO param properties1 type bitfield
	commandClass: number; // 1 byte unsigned integer
	command: number; // 1 byte unsigned integer
	// TODO param parameter type blob
}

export interface MultiChannelV4MultiInstanceGetData {
	commandClass: number; // 1 byte unsigned integer
}

export interface MultiChannelV4MultiInstanceReportData {
	commandClass: number; // 1 byte unsigned integer
	// TODO param properties1 type bitfield
}

export interface MultiChannelV4MultiChannelAggregatedMembersGetData {
	// TODO param properties1 type bitfield
}

export interface MultiChannelV4MultiChannelAggregatedMembersReportData {
	// TODO param properties1 type bitfield
	numberOfBitMasks: number; // 1 byte unsigned integer
	aggregatedMembersBitMask: number; // 0 byte unsigned integer
}

export class MultiChannelV4 extends CommandClassPacket<MultiChannelV4Commands> {
	public static readonly commandClass = CommandClasses.MultiChannel; // 0x60 (96)

	public static matches(packet: Packet): boolean {
		return packet.commandClass === this.commandClass;
	}

	constructor(commandAndPayload: Buffer) {
		super(MultiChannelV4, commandAndPayload);
	}

	public static readonly MultiChannelCapabilityGet = class MultiChannelCapabilityGet extends CommandPacket<MultiChannelV4MultiChannelCapabilityGetData> {
		public static readonly CommandClass = MultiChannelV4;
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
							"type": "integer",
							"name": "End Point",
							"mask": 127,
							"shift": 0
						},
						{
							"type": "boolean",
							"name": "Res",
							"mask": 128,
							"shift": 7
						}
					]
				}
			]
		} as CommandDefinition;

		static matches(packet: Packet): boolean {
			return packet.tryAs(MultiChannelV4)?.command === this.command;
		}

		constructor(data: Buffer | MultiChannelV4MultiChannelCapabilityGetData) {
			super(MultiChannelCapabilityGet, data);
		}
	};

	public static readonly MultiChannelCapabilityReport = class MultiChannelCapabilityReport extends CommandPacket<MultiChannelV4MultiChannelCapabilityReportData> {
		public static readonly CommandClass = MultiChannelV4;
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
							"type": "integer",
							"name": "End Point",
							"mask": 127,
							"shift": 0
						},
						{
							"type": "boolean",
							"name": "Dynamic",
							"mask": 128,
							"shift": 7
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
					"length": "auto",
					"valueType": "CMD_CLASS_REF"
				}
			]
		} as CommandDefinition;

		static matches(packet: Packet): boolean {
			return packet.tryAs(MultiChannelV4)?.command === this.command;
		}

		constructor(data: Buffer | MultiChannelV4MultiChannelCapabilityReportData) {
			super(MultiChannelCapabilityReport, data);
		}
	};

	public static readonly MultiChannelCmdEncap = class MultiChannelCmdEncap extends CommandPacket<MultiChannelV4MultiChannelCmdEncapData> {
		public static readonly CommandClass = MultiChannelV4;
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
							"type": "integer",
							"name": "Source End Point",
							"mask": 127,
							"shift": 0
						},
						{
							"type": "boolean",
							"name": "Res",
							"mask": 128,
							"shift": 7
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
							"type": "integer",
							"name": "Destination End Point",
							"mask": 127,
							"shift": 0
						},
						{
							"type": "boolean",
							"name": "Bit address",
							"mask": 128,
							"shift": 7
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
					"length": "auto",
					"blobType": "CMD_DATA"
				}
			]
		} as CommandDefinition;

		static matches(packet: Packet): boolean {
			return packet.tryAs(MultiChannelV4)?.command === this.command;
		}

		constructor(data: Buffer | MultiChannelV4MultiChannelCmdEncapData) {
			super(MultiChannelCmdEncap, data);
		}
	};

	public static readonly MultiChannelEndPointFind = class MultiChannelEndPointFind extends CommandPacket<MultiChannelV4MultiChannelEndPointFindData> {
		public static readonly CommandClass = MultiChannelV4;
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
			return packet.tryAs(MultiChannelV4)?.command === this.command;
		}

		constructor(data: Buffer | MultiChannelV4MultiChannelEndPointFindData) {
			super(MultiChannelEndPointFind, data);
		}
	};

	public static readonly MultiChannelEndPointFindReport = class MultiChannelEndPointFindReport extends CommandPacket<MultiChannelV4MultiChannelEndPointFindReportData> {
		public static readonly CommandClass = MultiChannelV4;
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
					"length": "auto",
					"params": [
						{
							"type": "bitfield",
							"name": "properties1",
							"help": "Properties1",
							"length": 1,
							"fields": [
								{
									"type": "integer",
									"name": "End Point",
									"mask": 127,
									"shift": 0
								},
								{
									"type": "boolean",
									"name": "Res",
									"mask": 128,
									"shift": 7
								}
							]
						}
					]
				}
			]
		} as CommandDefinition;

		static matches(packet: Packet): boolean {
			return packet.tryAs(MultiChannelV4)?.command === this.command;
		}

		constructor(data: Buffer | MultiChannelV4MultiChannelEndPointFindReportData) {
			super(MultiChannelEndPointFindReport, data);
		}
	};

	public static readonly MultiChannelEndPointGet = class MultiChannelEndPointGet extends CommandPacket<void> {
		public static readonly CommandClass = MultiChannelV4;
		public static readonly command = 0x07;
		public static readonly definition = {
			"command": 7,
			"name": "MultiChannelEndPointGet",
			"help": "Multi Channel End Point Get",
			"status": "active",
			"params": []
		} as CommandDefinition;

		static matches(packet: Packet): boolean {
			return packet.tryAs(MultiChannelV4)?.command === this.command;
		}

		constructor(data: Buffer | void) {
			super(MultiChannelEndPointGet, data);
		}
	};

	public static readonly MultiChannelEndPointReport = class MultiChannelEndPointReport extends CommandPacket<MultiChannelV4MultiChannelEndPointReportData> {
		public static readonly CommandClass = MultiChannelV4;
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
							"type": "integer",
							"name": "Res1",
							"mask": 63,
							"shift": 0
						},
						{
							"type": "boolean",
							"name": "Identical",
							"mask": 64,
							"shift": 6
						},
						{
							"type": "boolean",
							"name": "Dynamic",
							"mask": 128,
							"shift": 7
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
							"type": "integer",
							"name": "Individual End Points",
							"mask": 127,
							"shift": 0
						},
						{
							"type": "boolean",
							"name": "Res2",
							"mask": 128,
							"shift": 7
						}
					]
				},
				{
					"type": "bitfield",
					"name": "properties3",
					"help": "Properties3",
					"length": 1,
					"fields": [
						{
							"type": "integer",
							"name": "Aggregated End Points",
							"mask": 127,
							"shift": 0
						},
						{
							"type": "boolean",
							"name": "Res3",
							"mask": 128,
							"shift": 7
						}
					]
				}
			]
		} as CommandDefinition;

		static matches(packet: Packet): boolean {
			return packet.tryAs(MultiChannelV4)?.command === this.command;
		}

		constructor(data: Buffer | MultiChannelV4MultiChannelEndPointReportData) {
			super(MultiChannelEndPointReport, data);
		}
	};

	public static readonly MultiInstanceCmdEncap = class MultiInstanceCmdEncap extends CommandPacket<MultiChannelV4MultiInstanceCmdEncapData> {
		public static readonly CommandClass = MultiChannelV4;
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
							"type": "integer",
							"name": "Instance",
							"mask": 127,
							"shift": 0
						},
						{
							"type": "boolean",
							"name": "Res",
							"mask": 128,
							"shift": 7
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
					"length": "auto",
					"blobType": "CMD_DATA"
				}
			]
		} as CommandDefinition;

		static matches(packet: Packet): boolean {
			return packet.tryAs(MultiChannelV4)?.command === this.command;
		}

		constructor(data: Buffer | MultiChannelV4MultiInstanceCmdEncapData) {
			super(MultiInstanceCmdEncap, data);
		}
	};

	public static readonly MultiInstanceGet = class MultiInstanceGet extends CommandPacket<MultiChannelV4MultiInstanceGetData> {
		public static readonly CommandClass = MultiChannelV4;
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
			return packet.tryAs(MultiChannelV4)?.command === this.command;
		}

		constructor(data: Buffer | MultiChannelV4MultiInstanceGetData) {
			super(MultiInstanceGet, data);
		}
	};

	public static readonly MultiInstanceReport = class MultiInstanceReport extends CommandPacket<MultiChannelV4MultiInstanceReportData> {
		public static readonly CommandClass = MultiChannelV4;
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
							"type": "integer",
							"name": "Instances",
							"mask": 127,
							"shift": 0
						},
						{
							"type": "boolean",
							"name": "Res",
							"mask": 128,
							"shift": 7
						}
					]
				}
			]
		} as CommandDefinition;

		static matches(packet: Packet): boolean {
			return packet.tryAs(MultiChannelV4)?.command === this.command;
		}

		constructor(data: Buffer | MultiChannelV4MultiInstanceReportData) {
			super(MultiInstanceReport, data);
		}
	};

	public static readonly MultiChannelAggregatedMembersGet = class MultiChannelAggregatedMembersGet extends CommandPacket<MultiChannelV4MultiChannelAggregatedMembersGetData> {
		public static readonly CommandClass = MultiChannelV4;
		public static readonly command = 0x0e;
		public static readonly definition = {
			"command": 14,
			"name": "MultiChannelAggregatedMembersGet",
			"help": "Multi Channel Aggregated Members Get",
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
							"name": "Aggregated End Point",
							"mask": 127,
							"shift": 0
						},
						{
							"type": "boolean",
							"name": "Res",
							"mask": 128,
							"shift": 7
						}
					]
				}
			]
		} as CommandDefinition;

		static matches(packet: Packet): boolean {
			return packet.tryAs(MultiChannelV4)?.command === this.command;
		}

		constructor(data: Buffer | MultiChannelV4MultiChannelAggregatedMembersGetData) {
			super(MultiChannelAggregatedMembersGet, data);
		}
	};

	public static readonly MultiChannelAggregatedMembersReport = class MultiChannelAggregatedMembersReport extends CommandPacket<MultiChannelV4MultiChannelAggregatedMembersReportData> {
		public static readonly CommandClass = MultiChannelV4;
		public static readonly command = 0x0f;
		public static readonly definition = {
			"command": 15,
			"name": "MultiChannelAggregatedMembersReport",
			"help": "Multi Channel Aggregated Members Report",
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
							"name": "Aggregated End Point",
							"mask": 127,
							"shift": 0
						},
						{
							"type": "boolean",
							"name": "Res",
							"mask": 128,
							"shift": 7
						}
					]
				},
				{
					"type": "integer",
					"name": "numberOfBitMasks",
					"help": "Number of Bit Masks",
					"length": 1
				},
				{
					"type": "integer",
					"name": "aggregatedMembersBitMask",
					"help": "Aggregated Members Bit Mask",
					"length": 0
				}
			]
		} as CommandDefinition;

		static matches(packet: Packet): boolean {
			return packet.tryAs(MultiChannelV4)?.command === this.command;
		}

		constructor(data: Buffer | MultiChannelV4MultiChannelAggregatedMembersReportData) {
			super(MultiChannelAggregatedMembersReport, data);
		}
	};
}

export namespace MultiChannelV4 {
	export type MultiChannelCapabilityGet = InstanceType<typeof MultiChannelV4.MultiChannelCapabilityGet>;
	export type MultiChannelCapabilityReport = InstanceType<typeof MultiChannelV4.MultiChannelCapabilityReport>;
	export type MultiChannelCmdEncap = InstanceType<typeof MultiChannelV4.MultiChannelCmdEncap>;
	export type MultiChannelEndPointFind = InstanceType<typeof MultiChannelV4.MultiChannelEndPointFind>;
	export type MultiChannelEndPointFindReport = InstanceType<typeof MultiChannelV4.MultiChannelEndPointFindReport>;
	export type MultiChannelEndPointGet = InstanceType<typeof MultiChannelV4.MultiChannelEndPointGet>;
	export type MultiChannelEndPointReport = InstanceType<typeof MultiChannelV4.MultiChannelEndPointReport>;
	export type MultiInstanceCmdEncap = InstanceType<typeof MultiChannelV4.MultiInstanceCmdEncap>;
	export type MultiInstanceGet = InstanceType<typeof MultiChannelV4.MultiInstanceGet>;
	export type MultiInstanceReport = InstanceType<typeof MultiChannelV4.MultiInstanceReport>;
	export type MultiChannelAggregatedMembersGet = InstanceType<typeof MultiChannelV4.MultiChannelAggregatedMembersGet>;
	export type MultiChannelAggregatedMembersReport = InstanceType<typeof MultiChannelV4.MultiChannelAggregatedMembersReport>;
}
