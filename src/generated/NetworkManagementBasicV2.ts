/**
 * Command Class Network Management Basic, version 2.
 *
 * Auto-generated, do not edit.
 */

import { CommandClassPacket, CommandPacket } from "../commands/command";
import { Packet } from "../commands/packet";
import { CommandDefinition } from "../commands/types";
import CommandClasses from "../generated/CommandClasses";

export enum NetworkManagementBasicV2Commands {
	LearnModeSet = 0x01,
	LearnModeSetStatus = 0x02,
	NodeInformationSend = 0x05,
	NetworkUpdateRequest = 0x03,
	NetworkUpdateRequestStatus = 0x04,
	DefaultSet = 0x06,
	DefaultSetComplete = 0x07,
	DskGet = 0x08,
	DskReport = 0x09,
}

export interface NetworkManagementBasicV2LearnModeSetData {
	seqNo: number; // 1 byte unsigned integer
	// TODO param properties1 type bitfield
	mode: number; // 1 byte unsigned integer
}

export interface NetworkManagementBasicV2LearnModeSetStatusData {
	seqNo: number; // 1 byte unsigned integer
	status: number; // 1 byte unsigned integer
	reserved: number; // 1 byte unsigned integer
	newNodeID: number; // 1 byte unsigned integer
	grantedKeys: number; // 1 byte unsigned integer
	kEXFailType: number; // 1 byte unsigned integer
	// TODO param dsk type blob
}

export interface NetworkManagementBasicV2NodeInformationSendData {
	seqNo: number; // 1 byte unsigned integer
	reserved: number; // 1 byte unsigned integer
	destinationNodeID: number; // 1 byte unsigned integer
	txOptions: number; // 0 byte unsigned integer
}

export interface NetworkManagementBasicV2NetworkUpdateRequestData {
	seqNo: number; // 1 byte unsigned integer
}

export interface NetworkManagementBasicV2NetworkUpdateRequestStatusData {
	seqNo: number; // 1 byte unsigned integer
	status: number; // 1 byte unsigned integer
}

export interface NetworkManagementBasicV2DefaultSetData {
	seqNo: number; // 1 byte unsigned integer
}

export interface NetworkManagementBasicV2DefaultSetCompleteData {
	seqNo: number; // 1 byte unsigned integer
	status: number; // 1 byte unsigned integer
}

export interface NetworkManagementBasicV2DskGetData {
	seqNo: number; // 1 byte unsigned integer
	// TODO param properties1 type bitfield
}

export interface NetworkManagementBasicV2DskReportData {
	seqNo: number; // 1 byte unsigned integer
	// TODO param properties1 type bitfield
	// TODO param dsk type blob
}

export class NetworkManagementBasicV2 extends CommandClassPacket<NetworkManagementBasicV2Commands> {
	public static readonly commandClass = CommandClasses.NetworkManagementBasic; // 0x4d (77)

	public static matches(packet: Packet): boolean {
		return packet.commandClass === this.commandClass;
	}

	constructor(commandAndPayload: Buffer) {
		super(NetworkManagementBasicV2, commandAndPayload);
	}

	public static readonly LearnModeSet = class LearnModeSet extends CommandPacket<NetworkManagementBasicV2LearnModeSetData> {
		public static readonly CommandClass = NetworkManagementBasicV2;
		public static readonly command = 0x01;
		public static readonly definition = {
			"command": 1,
			"name": "LearnModeSet",
			"help": "Learn Mode Set",
			"status": "active",
			"params": [
				{
					"type": "integer",
					"name": "seqNo",
					"help": "Seq. No",
					"length": 1
				},
				{
					"type": "bitfield",
					"name": "properties1",
					"help": "Properties1",
					"length": 1,
					"fields": [
						{
							"type": "boolean",
							"name": "Return interview status",
							"mask": 1,
							"shift": 0
						},
						{
							"type": "integer",
							"name": "Reserved",
							"mask": 254,
							"shift": 1
						}
					]
				},
				{
					"type": "integer",
					"name": "mode",
					"help": "Mode",
					"length": 1,
					"values": {
						"0": "LEARN_MODE_SET_DISABLE",
						"1": "LEARN_MODE_SET_CLASSIC",
						"2": "LEARN_MODE_SET_NWI"
					}
				}
			]
		} as CommandDefinition;

		static matches(packet: Packet): boolean {
			return packet.tryAs(NetworkManagementBasicV2)?.command === this.command;
		}

		constructor(data: Buffer | NetworkManagementBasicV2LearnModeSetData) {
			super(LearnModeSet, data);
		}
	};

	public static readonly LearnModeSetStatus = class LearnModeSetStatus extends CommandPacket<NetworkManagementBasicV2LearnModeSetStatusData> {
		public static readonly CommandClass = NetworkManagementBasicV2;
		public static readonly command = 0x02;
		public static readonly definition = {
			"command": 2,
			"name": "LearnModeSetStatus",
			"help": "Learn Mode Set Status",
			"status": "active",
			"params": [
				{
					"type": "integer",
					"name": "seqNo",
					"help": "Seq. No",
					"length": 1
				},
				{
					"type": "integer",
					"name": "status",
					"help": "Status",
					"length": 1,
					"values": {
						"1": "LEARN_MODE_FAILED_TIMEOUT",
						"6": "LEARN_MODE_DONE",
						"7": "LEARN_MODE_FAILED",
						"9": "LEARN_MODE_SECURITY_FAILED"
					}
				},
				{
					"type": "integer",
					"name": "reserved",
					"help": "Reserved",
					"length": 1
				},
				{
					"type": "integer",
					"name": "newNodeID",
					"help": "New Node ID",
					"length": 1,
					"valueType": "NODE_NUMBER"
				},
				{
					"type": "integer",
					"name": "grantedKeys",
					"help": "Granted Keys",
					"length": 1
				},
				{
					"type": "integer",
					"name": "kEXFailType",
					"help": "KEX Fail Type",
					"length": 1
				},
				{
					"type": "blob",
					"name": "dsk",
					"help": "DSK",
					"length": 16
				}
			]
		} as CommandDefinition;

		static matches(packet: Packet): boolean {
			return packet.tryAs(NetworkManagementBasicV2)?.command === this.command;
		}

		constructor(data: Buffer | NetworkManagementBasicV2LearnModeSetStatusData) {
			super(LearnModeSetStatus, data);
		}
	};

	public static readonly NodeInformationSend = class NodeInformationSend extends CommandPacket<NetworkManagementBasicV2NodeInformationSendData> {
		public static readonly CommandClass = NetworkManagementBasicV2;
		public static readonly command = 0x05;
		public static readonly definition = {
			"command": 5,
			"name": "NodeInformationSend",
			"help": "Node Information Send",
			"status": "active",
			"params": [
				{
					"type": "integer",
					"name": "seqNo",
					"help": "Seq. No",
					"length": 1
				},
				{
					"type": "integer",
					"name": "reserved",
					"help": "Reserved",
					"length": 1
				},
				{
					"type": "integer",
					"name": "destinationNodeID",
					"help": "Destination Node ID",
					"length": 1,
					"valueType": "NODE_NUMBER"
				},
				{
					"type": "integer",
					"name": "txOptions",
					"help": "tx Options",
					"length": 0
				}
			]
		} as CommandDefinition;

		static matches(packet: Packet): boolean {
			return packet.tryAs(NetworkManagementBasicV2)?.command === this.command;
		}

		constructor(data: Buffer | NetworkManagementBasicV2NodeInformationSendData) {
			super(NodeInformationSend, data);
		}
	};

	public static readonly NetworkUpdateRequest = class NetworkUpdateRequest extends CommandPacket<NetworkManagementBasicV2NetworkUpdateRequestData> {
		public static readonly CommandClass = NetworkManagementBasicV2;
		public static readonly command = 0x03;
		public static readonly definition = {
			"command": 3,
			"name": "NetworkUpdateRequest",
			"help": "Network Update Request",
			"status": "active",
			"params": [
				{
					"type": "integer",
					"name": "seqNo",
					"help": "Seq. No",
					"length": 1
				}
			]
		} as CommandDefinition;

		static matches(packet: Packet): boolean {
			return packet.tryAs(NetworkManagementBasicV2)?.command === this.command;
		}

		constructor(data: Buffer | NetworkManagementBasicV2NetworkUpdateRequestData) {
			super(NetworkUpdateRequest, data);
		}
	};

	public static readonly NetworkUpdateRequestStatus = class NetworkUpdateRequestStatus extends CommandPacket<NetworkManagementBasicV2NetworkUpdateRequestStatusData> {
		public static readonly CommandClass = NetworkManagementBasicV2;
		public static readonly command = 0x04;
		public static readonly definition = {
			"command": 4,
			"name": "NetworkUpdateRequestStatus",
			"help": "Network Update Request Status",
			"status": "active",
			"params": [
				{
					"type": "integer",
					"name": "seqNo",
					"help": "Seq. No",
					"length": 1
				},
				{
					"type": "integer",
					"name": "status",
					"help": "Status",
					"length": 1,
					"values": {
						"0": "SUC_UPDATE_DONE",
						"1": "SUC_UPDATE_ABORT",
						"2": "SUC_UPDATE_WAIT",
						"3": "SUC_UPDATE_DISABLED",
						"4": "SUC_UPDATE_OVERFLOW"
					}
				}
			]
		} as CommandDefinition;

		static matches(packet: Packet): boolean {
			return packet.tryAs(NetworkManagementBasicV2)?.command === this.command;
		}

		constructor(data: Buffer | NetworkManagementBasicV2NetworkUpdateRequestStatusData) {
			super(NetworkUpdateRequestStatus, data);
		}
	};

	public static readonly DefaultSet = class DefaultSet extends CommandPacket<NetworkManagementBasicV2DefaultSetData> {
		public static readonly CommandClass = NetworkManagementBasicV2;
		public static readonly command = 0x06;
		public static readonly definition = {
			"command": 6,
			"name": "DefaultSet",
			"help": "Default Set",
			"status": "active",
			"params": [
				{
					"type": "integer",
					"name": "seqNo",
					"help": "Seq. No",
					"length": 1
				}
			]
		} as CommandDefinition;

		static matches(packet: Packet): boolean {
			return packet.tryAs(NetworkManagementBasicV2)?.command === this.command;
		}

		constructor(data: Buffer | NetworkManagementBasicV2DefaultSetData) {
			super(DefaultSet, data);
		}
	};

	public static readonly DefaultSetComplete = class DefaultSetComplete extends CommandPacket<NetworkManagementBasicV2DefaultSetCompleteData> {
		public static readonly CommandClass = NetworkManagementBasicV2;
		public static readonly command = 0x07;
		public static readonly definition = {
			"command": 7,
			"name": "DefaultSetComplete",
			"help": "Default Set Complete",
			"status": "active",
			"params": [
				{
					"type": "integer",
					"name": "seqNo",
					"help": "Seq. No",
					"length": 1
				},
				{
					"type": "integer",
					"name": "status",
					"help": "Status",
					"length": 1,
					"values": {
						"6": "DEFAULT_SET_DONE",
						"7": "DEFAULT_SET_BUSY"
					}
				}
			]
		} as CommandDefinition;

		static matches(packet: Packet): boolean {
			return packet.tryAs(NetworkManagementBasicV2)?.command === this.command;
		}

		constructor(data: Buffer | NetworkManagementBasicV2DefaultSetCompleteData) {
			super(DefaultSetComplete, data);
		}
	};

	public static readonly DskGet = class DskGet extends CommandPacket<NetworkManagementBasicV2DskGetData> {
		public static readonly CommandClass = NetworkManagementBasicV2;
		public static readonly command = 0x08;
		public static readonly definition = {
			"command": 8,
			"name": "DskGet",
			"help": "DSK Get",
			"status": "active",
			"params": [
				{
					"type": "integer",
					"name": "seqNo",
					"help": "Seq No",
					"length": 1
				},
				{
					"type": "bitfield",
					"name": "properties1",
					"help": "Properties1",
					"length": 1,
					"fields": [
						{
							"type": "boolean",
							"name": "Add mode",
							"mask": 1,
							"shift": 0
						},
						{
							"type": "integer",
							"name": "Reserved",
							"mask": 254,
							"shift": 1
						}
					]
				}
			]
		} as CommandDefinition;

		static matches(packet: Packet): boolean {
			return packet.tryAs(NetworkManagementBasicV2)?.command === this.command;
		}

		constructor(data: Buffer | NetworkManagementBasicV2DskGetData) {
			super(DskGet, data);
		}
	};

	public static readonly DskReport = class DskReport extends CommandPacket<NetworkManagementBasicV2DskReportData> {
		public static readonly CommandClass = NetworkManagementBasicV2;
		public static readonly command = 0x09;
		public static readonly definition = {
			"command": 9,
			"name": "DskReport",
			"help": "DSK Report",
			"status": "active",
			"params": [
				{
					"type": "integer",
					"name": "seqNo",
					"help": "Seq No",
					"length": 1
				},
				{
					"type": "bitfield",
					"name": "properties1",
					"help": "Properties1",
					"length": 1,
					"fields": [
						{
							"type": "boolean",
							"name": "Add mode",
							"mask": 1,
							"shift": 0
						},
						{
							"type": "integer",
							"name": "Reserved",
							"mask": 254,
							"shift": 1
						}
					]
				},
				{
					"type": "blob",
					"name": "dsk",
					"help": "DSK",
					"length": 16
				}
			]
		} as CommandDefinition;

		static matches(packet: Packet): boolean {
			return packet.tryAs(NetworkManagementBasicV2)?.command === this.command;
		}

		constructor(data: Buffer | NetworkManagementBasicV2DskReportData) {
			super(DskReport, data);
		}
	};
}

export namespace NetworkManagementBasicV2 {
	export type LearnModeSet = InstanceType<typeof NetworkManagementBasicV2.LearnModeSet>;
	export type LearnModeSetStatus = InstanceType<typeof NetworkManagementBasicV2.LearnModeSetStatus>;
	export type NodeInformationSend = InstanceType<typeof NetworkManagementBasicV2.NodeInformationSend>;
	export type NetworkUpdateRequest = InstanceType<typeof NetworkManagementBasicV2.NetworkUpdateRequest>;
	export type NetworkUpdateRequestStatus = InstanceType<typeof NetworkManagementBasicV2.NetworkUpdateRequestStatus>;
	export type DefaultSet = InstanceType<typeof NetworkManagementBasicV2.DefaultSet>;
	export type DefaultSetComplete = InstanceType<typeof NetworkManagementBasicV2.DefaultSetComplete>;
	export type DskGet = InstanceType<typeof NetworkManagementBasicV2.DskGet>;
	export type DskReport = InstanceType<typeof NetworkManagementBasicV2.DskReport>;
}
