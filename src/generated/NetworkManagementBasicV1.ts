/**
 * Command Class Network Management Basic, version 1.
 *
 * Auto-generated, do not edit.
 */

import { CommandClassPacket, CommandPacket } from "../commands/command";
import * as jsonSpec from "../commands/jsonSpec";
import { Packet } from "../commands/packet";
import { convertFromJsonCommand } from "../commands/specHelpers";
import CommandClasses from "../generated/CommandClasses";

export enum NetworkManagementBasicV1Commands {
	LearnModeSet = 0x01,
	LearnModeSetStatus = 0x02,
	NodeInformationSend = 0x05,
	NetworkUpdateRequest = 0x03,
	NetworkUpdateRequestStatus = 0x04,
	DefaultSet = 0x06,
	DefaultSetComplete = 0x07,
}

export interface NetworkManagementBasicV1LearnModeSetData {
	seqNo: number; // 1 byte unsigned integer
	mode: number; // 1 byte unsigned integer
}

export interface NetworkManagementBasicV1LearnModeSetStatusData {
	seqNo: number; // 1 byte unsigned integer
	status: number; // 1 byte unsigned integer
	newNodeId: number; // 1 byte unsigned integer
}

export interface NetworkManagementBasicV1NodeInformationSendData {
	seqNo: number; // 1 byte unsigned integer
	destinationNodeId: number; // 1 byte unsigned integer
	// TODO param txOptions type bitmask
}

export interface NetworkManagementBasicV1NetworkUpdateRequestData {
	seqNo: number; // 1 byte unsigned integer
}

export interface NetworkManagementBasicV1NetworkUpdateRequestStatusData {
	seqNo: number; // 1 byte unsigned integer
	status: number; // 1 byte unsigned integer
}

export interface NetworkManagementBasicV1DefaultSetData {
	seqNo: number; // 1 byte unsigned integer
}

export interface NetworkManagementBasicV1DefaultSetCompleteData {
	seqNo: number; // 1 byte unsigned integer
	status: number; // 1 byte unsigned integer
}

export class NetworkManagementBasicV1 extends CommandClassPacket<NetworkManagementBasicV1Commands> {
	public static readonly commandClass = CommandClasses.NetworkManagementBasic; // 0x4d (77)

	public static matches(packet: Packet): boolean {
		return packet.commandClass === this.commandClass;
	}

	constructor(commandAndPayload: Buffer) {
		super(NetworkManagementBasicV1, commandAndPayload);
	}

	public static readonly LearnModeSet = class LearnModeSet extends CommandPacket<NetworkManagementBasicV1LearnModeSetData> {
		public static readonly CommandClass = NetworkManagementBasicV1;
		public static readonly command = 0x01;
		public static readonly definition = convertFromJsonCommand({
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
					"type": "integer",
					"name": "reserved",
					"help": "Reserved",
					"length": 1,
					"reserved": true
				},
				{
					"type": "integer",
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
			return packet.tryAs(NetworkManagementBasicV1)?.command === this.command;
		}

		constructor(data: Buffer | NetworkManagementBasicV1LearnModeSetData) {
			super(LearnModeSet, data);
		}
	};

	public static readonly LearnModeSetStatus = class LearnModeSetStatus extends CommandPacket<NetworkManagementBasicV1LearnModeSetStatusData> {
		public static readonly CommandClass = NetworkManagementBasicV1;
		public static readonly command = 0x02;
		public static readonly definition = convertFromJsonCommand({
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
					"type": "integer",
					"name": "reserved",
					"help": "Reserved",
					"length": 1,
					"reserved": true
				},
				{
					"type": "integer",
					"name": "newNodeId",
					"help": "New Node ID",
					"length": 1,
					"valueType": "NODE_NUMBER"
				}
			]
		} as jsonSpec.CommandDefinition);

		static matches(packet: Packet): boolean {
			return packet.tryAs(NetworkManagementBasicV1)?.command === this.command;
		}

		constructor(data: Buffer | NetworkManagementBasicV1LearnModeSetStatusData) {
			super(LearnModeSetStatus, data);
		}
	};

	// TODO This command is not yet fully supported by the decoder/encoder
	public static readonly NodeInformationSend = class NodeInformationSend extends CommandPacket<NetworkManagementBasicV1NodeInformationSendData> {
		public static readonly CommandClass = NetworkManagementBasicV1;
		public static readonly command = 0x05;
		public static readonly definition = convertFromJsonCommand({
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
					"length": 1,
					"reserved": true
				},
				{
					"type": "integer",
					"name": "destinationNodeId",
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
		} as jsonSpec.CommandDefinition);

		static matches(packet: Packet): boolean {
			return packet.tryAs(NetworkManagementBasicV1)?.command === this.command;
		}

		constructor(data: Buffer | NetworkManagementBasicV1NodeInformationSendData) {
			super(NodeInformationSend, data);
		}
	};

	public static readonly NetworkUpdateRequest = class NetworkUpdateRequest extends CommandPacket<NetworkManagementBasicV1NetworkUpdateRequestData> {
		public static readonly CommandClass = NetworkManagementBasicV1;
		public static readonly command = 0x03;
		public static readonly definition = convertFromJsonCommand({
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
		} as jsonSpec.CommandDefinition);

		static matches(packet: Packet): boolean {
			return packet.tryAs(NetworkManagementBasicV1)?.command === this.command;
		}

		constructor(data: Buffer | NetworkManagementBasicV1NetworkUpdateRequestData) {
			super(NetworkUpdateRequest, data);
		}
	};

	public static readonly NetworkUpdateRequestStatus = class NetworkUpdateRequestStatus extends CommandPacket<NetworkManagementBasicV1NetworkUpdateRequestStatusData> {
		public static readonly CommandClass = NetworkManagementBasicV1;
		public static readonly command = 0x04;
		public static readonly definition = convertFromJsonCommand({
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
			return packet.tryAs(NetworkManagementBasicV1)?.command === this.command;
		}

		constructor(data: Buffer | NetworkManagementBasicV1NetworkUpdateRequestStatusData) {
			super(NetworkUpdateRequestStatus, data);
		}
	};

	public static readonly DefaultSet = class DefaultSet extends CommandPacket<NetworkManagementBasicV1DefaultSetData> {
		public static readonly CommandClass = NetworkManagementBasicV1;
		public static readonly command = 0x06;
		public static readonly definition = convertFromJsonCommand({
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
		} as jsonSpec.CommandDefinition);

		static matches(packet: Packet): boolean {
			return packet.tryAs(NetworkManagementBasicV1)?.command === this.command;
		}

		constructor(data: Buffer | NetworkManagementBasicV1DefaultSetData) {
			super(DefaultSet, data);
		}
	};

	public static readonly DefaultSetComplete = class DefaultSetComplete extends CommandPacket<NetworkManagementBasicV1DefaultSetCompleteData> {
		public static readonly CommandClass = NetworkManagementBasicV1;
		public static readonly command = 0x07;
		public static readonly definition = convertFromJsonCommand({
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
			return packet.tryAs(NetworkManagementBasicV1)?.command === this.command;
		}

		constructor(data: Buffer | NetworkManagementBasicV1DefaultSetCompleteData) {
			super(DefaultSetComplete, data);
		}
	};
}

export namespace NetworkManagementBasicV1 {
	export type LearnModeSet = InstanceType<typeof NetworkManagementBasicV1.LearnModeSet>;
	export type LearnModeSetStatus = InstanceType<typeof NetworkManagementBasicV1.LearnModeSetStatus>;
	export type NodeInformationSend = InstanceType<typeof NetworkManagementBasicV1.NodeInformationSend>;
	export type NetworkUpdateRequest = InstanceType<typeof NetworkManagementBasicV1.NetworkUpdateRequest>;
	export type NetworkUpdateRequestStatus = InstanceType<typeof NetworkManagementBasicV1.NetworkUpdateRequestStatus>;
	export type DefaultSet = InstanceType<typeof NetworkManagementBasicV1.DefaultSet>;
	export type DefaultSetComplete = InstanceType<typeof NetworkManagementBasicV1.DefaultSetComplete>;
}
