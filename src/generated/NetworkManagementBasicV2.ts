/**
 * Command Class Network Management Basic, version 2.
 *
 * Auto-generated, do not edit.
 */

import { CommandClassPacket, CommandPacket } from "../commands/command";
import * as jsonSpec from "../commands/jsonSpec";
import { Packet } from "../commands/packet";
import { convertFromJsonCommand } from "../commands/specHelpers";
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
	returnInterviewStatus: boolean; // properties1[0]
	mode: number; // 1 byte unsigned integer
}

export interface NetworkManagementBasicV2LearnModeSetStatusData {
	seqNo: number; // 1 byte unsigned integer
	status: number; // 1 byte unsigned integer
	newNodeId: number; // 1 byte unsigned integer
	grantedKeys: number; // 1 byte unsigned integer
	kexFailType: number; // 1 byte unsigned integer
	dsk: Buffer; // 16 bytes
}

export interface NetworkManagementBasicV2NodeInformationSendData {
	seqNo: number; // 1 byte unsigned integer
	destinationNodeId: number; // 1 byte unsigned integer
	txOptions: Set<TxOptionsEnum>; // 1 bytes
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
	addMode: boolean; // properties1[0]
}

export interface NetworkManagementBasicV2DskReportData {
	seqNo: number; // 1 byte unsigned integer
	addMode: boolean; // properties1[0]
	dsk: Buffer; // 16 bytes
}

export enum TxOptionsEnum {
	Ack = 0x0,
	LowPower = 0x1,
	AutoRoute = 0x2,
	Reserved = 0x3,
	NoRoute = 0x4,
	Explore = 0x5,
	NoRetransmission = 0x6,
	HighPower = 0x7,
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
		public static readonly definition = convertFromJsonCommand({
			"command": 1,
			"name": "LearnModeSet",
			"help": "Learn Mode Set",
			"status": "Active",
			"params": [
				{
					"type": "Integer",
					"name": "seqNo",
					"help": "Seq. No",
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
							"mask": 254,
							"shift": 1,
							"reserved": true
						},
						{
							"fieldType": "Boolean",
							"name": "returnInterviewStatus",
							"mask": 1,
							"shift": 0
						}
					]
				},
				{
					"type": "Integer",
					"name": "mode",
					"help": "Mode",
					"length": 1,
					"values": {
						"0": {
							"name": "LearnModeSetDisable",
							"help": "LEARN_MODE_SET_DISABLE"
						},
						"1": {
							"name": "LearnModeSetClassic",
							"help": "LEARN_MODE_SET_CLASSIC"
						},
						"2": {
							"name": "LearnModeSetNwi",
							"help": "LEARN_MODE_SET_NWI"
						}
					}
				}
			]
		} as jsonSpec.CommandDefinition);

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
		public static readonly definition = convertFromJsonCommand({
			"command": 2,
			"name": "LearnModeSetStatus",
			"help": "Learn Mode Set Status",
			"status": "Active",
			"params": [
				{
					"type": "Integer",
					"name": "seqNo",
					"help": "Seq. No",
					"length": 1
				},
				{
					"type": "Integer",
					"name": "status",
					"help": "Status",
					"length": 1,
					"values": {
						"1": {
							"name": "LearnModeFailedTimeout",
							"help": "LEARN_MODE_FAILED_TIMEOUT"
						},
						"6": {
							"name": "LearnModeDone",
							"help": "LEARN_MODE_DONE"
						},
						"7": {
							"name": "LearnModeFailed",
							"help": "LEARN_MODE_FAILED"
						},
						"9": {
							"name": "LearnModeSecurityFailed",
							"help": "LEARN_MODE_SECURITY_FAILED"
						}
					}
				},
				{
					"type": "Integer",
					"name": "reserved",
					"help": "Reserved",
					"length": 1,
					"reserved": true
				},
				{
					"type": "Integer",
					"name": "newNodeId",
					"help": "New Node ID",
					"length": 1,
					"valueType": "NodeNumber"
				},
				{
					"type": "Integer",
					"name": "grantedKeys",
					"help": "Granted Keys",
					"length": 1
				},
				{
					"type": "Integer",
					"name": "kexFailType",
					"help": "KEX Fail Type",
					"length": 1
				},
				{
					"type": "Blob",
					"name": "dsk",
					"help": "DSK",
					"length": 16
				}
			]
		} as jsonSpec.CommandDefinition);

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
		public static readonly definition = convertFromJsonCommand({
			"command": 5,
			"name": "NodeInformationSend",
			"help": "Node Information Send",
			"status": "Active",
			"params": [
				{
					"type": "Integer",
					"name": "seqNo",
					"help": "Seq. No",
					"length": 1
				},
				{
					"type": "Integer",
					"name": "reserved",
					"help": "Reserved",
					"length": 1,
					"reserved": true
				},
				{
					"type": "Integer",
					"name": "destinationNodeId",
					"help": "Destination Node ID",
					"length": 1,
					"valueType": "NodeNumber"
				},
				{
					"type": "Bitmask",
					"name": "txOptions",
					"help": "tx Options",
					"length": 1,
					"values": {
						"0": {
							"name": "Ack",
							"help": "Ack"
						},
						"1": {
							"name": "LowPower",
							"help": "Low Power"
						},
						"2": {
							"name": "AutoRoute",
							"help": "Auto Route"
						},
						"3": {
							"name": "Reserved",
							"help": "Reserved"
						},
						"4": {
							"name": "NoRoute",
							"help": "No Route"
						},
						"5": {
							"name": "Explore",
							"help": "Explore"
						},
						"6": {
							"name": "NoRetransmission",
							"help": "No Retransmission"
						},
						"7": {
							"name": "HighPower",
							"help": "High Power"
						}
					}
				}
			]
		} as jsonSpec.CommandDefinition);

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
		public static readonly definition = convertFromJsonCommand({
			"command": 3,
			"name": "NetworkUpdateRequest",
			"help": "Network Update Request",
			"status": "Active",
			"params": [
				{
					"type": "Integer",
					"name": "seqNo",
					"help": "Seq. No",
					"length": 1
				}
			]
		} as jsonSpec.CommandDefinition);

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
		public static readonly definition = convertFromJsonCommand({
			"command": 4,
			"name": "NetworkUpdateRequestStatus",
			"help": "Network Update Request Status",
			"status": "Active",
			"params": [
				{
					"type": "Integer",
					"name": "seqNo",
					"help": "Seq. No",
					"length": 1
				},
				{
					"type": "Integer",
					"name": "status",
					"help": "Status",
					"length": 1,
					"values": {
						"0": {
							"name": "SucUpdateDone",
							"help": "SUC_UPDATE_DONE"
						},
						"1": {
							"name": "SucUpdateAbort",
							"help": "SUC_UPDATE_ABORT"
						},
						"2": {
							"name": "SucUpdateWait",
							"help": "SUC_UPDATE_WAIT"
						},
						"3": {
							"name": "SucUpdateDisabled",
							"help": "SUC_UPDATE_DISABLED"
						},
						"4": {
							"name": "SucUpdateOverflow",
							"help": "SUC_UPDATE_OVERFLOW"
						}
					}
				}
			]
		} as jsonSpec.CommandDefinition);

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
		public static readonly definition = convertFromJsonCommand({
			"command": 6,
			"name": "DefaultSet",
			"help": "Default Set",
			"status": "Active",
			"params": [
				{
					"type": "Integer",
					"name": "seqNo",
					"help": "Seq. No",
					"length": 1
				}
			]
		} as jsonSpec.CommandDefinition);

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
		public static readonly definition = convertFromJsonCommand({
			"command": 7,
			"name": "DefaultSetComplete",
			"help": "Default Set Complete",
			"status": "Active",
			"params": [
				{
					"type": "Integer",
					"name": "seqNo",
					"help": "Seq. No",
					"length": 1
				},
				{
					"type": "Integer",
					"name": "status",
					"help": "Status",
					"length": 1,
					"values": {
						"6": {
							"name": "DefaultSetDone",
							"help": "DEFAULT_SET_DONE"
						},
						"7": {
							"name": "DefaultSetBusy",
							"help": "DEFAULT_SET_BUSY"
						}
					}
				}
			]
		} as jsonSpec.CommandDefinition);

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
		public static readonly definition = convertFromJsonCommand({
			"command": 8,
			"name": "DskGet",
			"help": "DSK Get",
			"status": "Active",
			"params": [
				{
					"type": "Integer",
					"name": "seqNo",
					"help": "Seq No",
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
							"mask": 254,
							"shift": 1,
							"reserved": true
						},
						{
							"fieldType": "Boolean",
							"name": "addMode",
							"mask": 1,
							"shift": 0
						}
					]
				}
			]
		} as jsonSpec.CommandDefinition);

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
		public static readonly definition = convertFromJsonCommand({
			"command": 9,
			"name": "DskReport",
			"help": "DSK Report",
			"status": "Active",
			"params": [
				{
					"type": "Integer",
					"name": "seqNo",
					"help": "Seq No",
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
							"mask": 254,
							"shift": 1,
							"reserved": true
						},
						{
							"fieldType": "Boolean",
							"name": "addMode",
							"mask": 1,
							"shift": 0
						}
					]
				},
				{
					"type": "Blob",
					"name": "dsk",
					"help": "DSK",
					"length": 16
				}
			]
		} as jsonSpec.CommandDefinition);

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
