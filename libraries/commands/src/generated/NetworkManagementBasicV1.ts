/**
 * Command Class Network Management Basic, version 1.
 *
 * Auto-generated, do not edit.
 */

import { CommandClasses, CommandClassPacket, CommandPacket, Packet } from "@ezwave/codec";
import { convertFromJsonCommand, JsonCommandDefinition } from "@ezwave/spec";

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
	txOptions: Set<TxOptionsEnum>; // 1 bytes
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

export class NetworkManagementBasicV1 extends CommandClassPacket<NetworkManagementBasicV1Commands> {
	public static readonly commandClass = CommandClasses.NetworkManagementBasic; // 0x4d (77)
	public static readonly version = 1;

	public static matches(packet: Packet): boolean {
		return packet.commandClass === this.commandClass;
	}

	constructor(commandAndPayload: Buffer) {
		super(NetworkManagementBasicV1, commandAndPayload);
	}
}

export class LearnModeSet extends CommandPacket<NetworkManagementBasicV1LearnModeSetData> {
	public static readonly CommandClass = NetworkManagementBasicV1;
	public static readonly command = 0x01; // 1
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
				"type": "Integer",
				"name": "reserved",
				"help": "Reserved",
				"length": 1,
				"reserved": true
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
	} as JsonCommandDefinition);

	static matches(packet: Packet): boolean {
		return packet.tryAs(NetworkManagementBasicV1)?.command === this.command;
	}

	constructor(data: Buffer | NetworkManagementBasicV1LearnModeSetData) {
		super(LearnModeSet, data);
	}
};

export class LearnModeSetStatus extends CommandPacket<NetworkManagementBasicV1LearnModeSetStatusData> {
	public static readonly CommandClass = NetworkManagementBasicV1;
	public static readonly command = 0x02; // 2
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
			}
		]
	} as JsonCommandDefinition);

	static matches(packet: Packet): boolean {
		return packet.tryAs(NetworkManagementBasicV1)?.command === this.command;
	}

	constructor(data: Buffer | NetworkManagementBasicV1LearnModeSetStatusData) {
		super(LearnModeSetStatus, data);
	}
};

export class NodeInformationSend extends CommandPacket<NetworkManagementBasicV1NodeInformationSendData> {
	public static readonly CommandClass = NetworkManagementBasicV1;
	public static readonly command = 0x05; // 5
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
	} as JsonCommandDefinition);

	static matches(packet: Packet): boolean {
		return packet.tryAs(NetworkManagementBasicV1)?.command === this.command;
	}

	constructor(data: Buffer | NetworkManagementBasicV1NodeInformationSendData) {
		super(NodeInformationSend, data);
	}
};

export class NetworkUpdateRequest extends CommandPacket<NetworkManagementBasicV1NetworkUpdateRequestData> {
	public static readonly CommandClass = NetworkManagementBasicV1;
	public static readonly command = 0x03; // 3
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
	} as JsonCommandDefinition);

	static matches(packet: Packet): boolean {
		return packet.tryAs(NetworkManagementBasicV1)?.command === this.command;
	}

	constructor(data: Buffer | NetworkManagementBasicV1NetworkUpdateRequestData) {
		super(NetworkUpdateRequest, data);
	}
};

export class NetworkUpdateRequestStatus extends CommandPacket<NetworkManagementBasicV1NetworkUpdateRequestStatusData> {
	public static readonly CommandClass = NetworkManagementBasicV1;
	public static readonly command = 0x04; // 4
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
	} as JsonCommandDefinition);

	static matches(packet: Packet): boolean {
		return packet.tryAs(NetworkManagementBasicV1)?.command === this.command;
	}

	constructor(data: Buffer | NetworkManagementBasicV1NetworkUpdateRequestStatusData) {
		super(NetworkUpdateRequestStatus, data);
	}
};

export class DefaultSet extends CommandPacket<NetworkManagementBasicV1DefaultSetData> {
	public static readonly CommandClass = NetworkManagementBasicV1;
	public static readonly command = 0x06; // 6
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
	} as JsonCommandDefinition);

	static matches(packet: Packet): boolean {
		return packet.tryAs(NetworkManagementBasicV1)?.command === this.command;
	}

	constructor(data: Buffer | NetworkManagementBasicV1DefaultSetData) {
		super(DefaultSet, data);
	}
};

export class DefaultSetComplete extends CommandPacket<NetworkManagementBasicV1DefaultSetCompleteData> {
	public static readonly CommandClass = NetworkManagementBasicV1;
	public static readonly command = 0x07; // 7
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
	} as JsonCommandDefinition);

	static matches(packet: Packet): boolean {
		return packet.tryAs(NetworkManagementBasicV1)?.command === this.command;
	}

	constructor(data: Buffer | NetworkManagementBasicV1DefaultSetCompleteData) {
		super(DefaultSetComplete, data);
	}
};