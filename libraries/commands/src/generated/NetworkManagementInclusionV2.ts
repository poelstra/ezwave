/**
 * Command Class Network Management Inclusion, version 2.
 *
 * Auto-generated, do not edit.
 */

import { CommandClasses, CommandClassPacket, CommandPacket, Packet } from "@ezwave/codec";
import { CommandDefinition, convertFromJsonCommand, JsonCommandDefinition } from "@ezwave/spec";

export enum NetworkManagementInclusionV2Commands {
	FailedNodeRemove = 0x07,
	FailedNodeRemoveStatus = 0x08,
	NodeAdd = 0x01,
	NodeAddStatus = 0x02,
	NodeRemove = 0x03,
	NodeRemoveStatus = 0x04,
	FailedNodeReplace = 0x09,
	FailedNodeReplaceStatus = 0x0a,
	NodeNeighborUpdateRequest = 0x0b,
	NodeNeighborUpdateStatus = 0x0c,
	ReturnRouteAssign = 0x0d,
	ReturnRouteAssignComplete = 0x0e,
	ReturnRouteDelete = 0x0f,
	ReturnRouteDeleteComplete = 0x10,
	NodeAddKeysReport = 0x11,
	NodeAddKeysSet = 0x12,
	NodeAddDskReport = 0x13,
	NodeAddDskSet = 0x14,
}

export interface NetworkManagementInclusionV2FailedNodeRemoveData {
	seqNo: number; // 1 byte unsigned integer
	nodeId: number; // 1 byte unsigned integer
}

export interface NetworkManagementInclusionV2FailedNodeRemoveStatusData {
	seqNo: number; // 1 byte unsigned integer
	nodeId: number; // 1 byte unsigned integer
	status: number; // 1 byte unsigned integer
}

export interface NetworkManagementInclusionV2NodeAddData {
	seqNo: number; // 1 byte unsigned integer
	mode: number; // 1 byte unsigned integer
	txOptions: Set<TxOptionsEnum>; // 1 bytes
}

export interface NetworkManagementInclusionV2NodeAddStatusData {
	seqNo: number; // 1 byte unsigned integer
	status: number; // 1 byte unsigned integer
	newNodeId: number; // 1 byte unsigned integer
	listening: boolean; // properties1[7]
	zWaveProtocolSpecificPart1: number; // properties1[6..0]
	opt: boolean; // properties2[7]
	zWaveProtocolSpecificPart2: number; // properties2[6..0]
	basicDeviceClass: number; // 1 byte unsigned integer
	genericDeviceClass: number; // 1 byte unsigned integer
	specificDeviceClass: number; // 1 byte unsigned integer
	commandClasses: CommandClasses[]; // variable length
	grantedKeys: number; // 1 byte unsigned integer
	kexFailType: number; // 1 byte unsigned integer
}

export interface NetworkManagementInclusionV2NodeRemoveData {
	seqNo: number; // 1 byte unsigned integer
	mode: number; // 1 byte unsigned integer
}

export interface NetworkManagementInclusionV2NodeRemoveStatusData {
	seqNo: number; // 1 byte unsigned integer
	status: number; // 1 byte unsigned integer
	nodeId: number; // 1 byte unsigned integer
}

export interface NetworkManagementInclusionV2FailedNodeReplaceData {
	seqNo: number; // 1 byte unsigned integer
	nodeId: number; // 1 byte unsigned integer
	txOptions: Set<TxOptionsEnum>; // 1 bytes
	mode: number; // 1 byte unsigned integer
}

export interface NetworkManagementInclusionV2FailedNodeReplaceStatusData {
	seqNo: number; // 1 byte unsigned integer
	status: number; // 1 byte unsigned integer
	nodeId: number; // 1 byte unsigned integer
	grantedKeys: number; // 1 byte unsigned integer
	kexFailType: number; // 1 byte unsigned integer
}

export interface NetworkManagementInclusionV2NodeNeighborUpdateRequestData {
	seqNo: number; // 1 byte unsigned integer
	nodeId: number; // 1 byte unsigned integer
}

export interface NetworkManagementInclusionV2NodeNeighborUpdateStatusData {
	seqNo: number; // 1 byte unsigned integer
	status: number; // 1 byte unsigned integer
}

export interface NetworkManagementInclusionV2ReturnRouteAssignData {
	seqNo: number; // 1 byte unsigned integer
	sourceNodeId: number; // 1 byte unsigned integer
	destinationNodeId: number; // 1 byte unsigned integer
}

export interface NetworkManagementInclusionV2ReturnRouteAssignCompleteData {
	seqNo: number; // 1 byte unsigned integer
	status: number; // 1 byte unsigned integer
}

export interface NetworkManagementInclusionV2ReturnRouteDeleteData {
	seqNo: number; // 1 byte unsigned integer
	nodeId: number; // 1 byte unsigned integer
}

export interface NetworkManagementInclusionV2ReturnRouteDeleteCompleteData {
	seqNo: number; // 1 byte unsigned integer
	status: number; // 1 byte unsigned integer
}

export interface NetworkManagementInclusionV2NodeAddKeysReportData {
	seqNo: number; // 1 byte unsigned integer
	requestCsa: boolean; // properties1[0]
	requestedKeys: number; // 1 byte unsigned integer
}

export interface NetworkManagementInclusionV2NodeAddKeysSetData {
	seqNo: number; // 1 byte unsigned integer
	grantCsa: boolean; // properties1[1]
	accept: boolean; // properties1[0]
	grantedKeys: number; // 1 byte unsigned integer
}

export interface NetworkManagementInclusionV2NodeAddDskReportData {
	seqNo: number; // 1 byte unsigned integer
	inputDskLength: number; // properties1[3..0]
	dsk: Buffer; // 16 bytes
}

export interface NetworkManagementInclusionV2NodeAddDskSetData {
	seqNo: number; // 1 byte unsigned integer
	accept: boolean; // properties1[7]
	inputDsk: Buffer; // variable length
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

export class NetworkManagementInclusionV2 extends CommandClassPacket<NetworkManagementInclusionV2Commands> {
	public static readonly commandClass: number = CommandClasses.NetworkManagementInclusion; // 0x34 (52)
	public static readonly version: number = 2;

	public static matches(packet: Packet): boolean {
		return packet.commandClass === this.commandClass;
	}

	public constructor(commandAndPayload: Buffer) {
		super(NetworkManagementInclusionV2, commandAndPayload);
	}
}

export class FailedNodeRemove extends CommandPacket<NetworkManagementInclusionV2FailedNodeRemoveData> {
	public static readonly CommandClass: typeof NetworkManagementInclusionV2 = NetworkManagementInclusionV2;
	public static readonly command: number = 0x07; // 7
	public static readonly definition: CommandDefinition = convertFromJsonCommand({
		"command": 7,
		"name": "FailedNodeRemove",
		"help": "Failed Node Remove",
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
				"name": "nodeId",
				"help": "Node ID",
				"length": 1,
				"valueType": "NodeNumber"
			}
		]
	} as JsonCommandDefinition);

	public static matches(packet: Packet): boolean {
		return packet.tryAs(NetworkManagementInclusionV2)?.command === this.command;
	}

	public constructor(data: Buffer | NetworkManagementInclusionV2FailedNodeRemoveData) {
		super(FailedNodeRemove, data);
	}
};

export class FailedNodeRemoveStatus extends CommandPacket<NetworkManagementInclusionV2FailedNodeRemoveStatusData> {
	public static readonly CommandClass: typeof NetworkManagementInclusionV2 = NetworkManagementInclusionV2;
	public static readonly command: number = 0x08; // 8
	public static readonly definition: CommandDefinition = convertFromJsonCommand({
		"command": 8,
		"name": "FailedNodeRemoveStatus",
		"help": "Failed Node Remove Status",
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
				"name": "nodeId",
				"help": "Node ID",
				"length": 1,
				"valueType": "NodeNumber"
			},
			{
				"type": "Integer",
				"name": "status",
				"help": "Status",
				"length": 1,
				"values": {
					"0": {
						"name": "FailedNodeNotFound",
						"help": "FAILED_NODE_NOT_FOUND"
					},
					"1": {
						"name": "Done",
						"help": "DONE"
					},
					"2": {
						"name": "FailedNodeRemoveFail",
						"help": "FAILED_NODE_REMOVE_FAIL"
					}
				}
			}
		]
	} as JsonCommandDefinition);

	public static matches(packet: Packet): boolean {
		return packet.tryAs(NetworkManagementInclusionV2)?.command === this.command;
	}

	public constructor(data: Buffer | NetworkManagementInclusionV2FailedNodeRemoveStatusData) {
		super(FailedNodeRemoveStatus, data);
	}
};

export class NodeAdd extends CommandPacket<NetworkManagementInclusionV2NodeAddData> {
	public static readonly CommandClass: typeof NetworkManagementInclusionV2 = NetworkManagementInclusionV2;
	public static readonly command: number = 0x01; // 1
	public static readonly definition: CommandDefinition = convertFromJsonCommand({
		"command": 1,
		"name": "NodeAdd",
		"help": "Node Add",
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
					"1": {
						"name": "NodeAddAny",
						"help": "NODE_ADD_ANY"
					},
					"2": {
						"name": "NodeAddController",
						"help": "NODE_ADD_CONTROLLER"
					},
					"3": {
						"name": "NodeAddSlave",
						"help": "NODE_ADD_SLAVE"
					},
					"4": {
						"name": "NodeAddExisting",
						"help": "NODE_ADD_EXISTING"
					},
					"5": {
						"name": "NodeAddStop",
						"help": "NODE_ADD_STOP"
					},
					"6": {
						"name": "NodeAddStopFailed",
						"help": "NODE_ADD_STOP_FAILED"
					},
					"7": {
						"name": "NodeAddAnyS2",
						"help": "NODE_ADD_ANY_S2"
					}
				}
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

	public static matches(packet: Packet): boolean {
		return packet.tryAs(NetworkManagementInclusionV2)?.command === this.command;
	}

	public constructor(data: Buffer | NetworkManagementInclusionV2NodeAddData) {
		super(NodeAdd, data);
	}
};

export class NodeAddStatus extends CommandPacket<NetworkManagementInclusionV2NodeAddStatusData> {
	public static readonly CommandClass: typeof NetworkManagementInclusionV2 = NetworkManagementInclusionV2;
	public static readonly command: number = 0x02; // 2
	public static readonly definition: CommandDefinition = convertFromJsonCommand({
		"command": 2,
		"name": "NodeAddStatus",
		"help": "Node Add Status",
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
						"name": "NodeAddStatusDone",
						"help": "NODE_ADD_STATUS_DONE"
					},
					"7": {
						"name": "NodeAddStatusFailed",
						"help": "NODE_ADD_STATUS_FAILED"
					},
					"9": {
						"name": "NodeAddStatusSecurityFailed",
						"help": "NODE_ADD_STATUS_SECURITY_FAILED"
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
				"name": "nodeInfoLength",
				"help": "Node Info Length",
				"length": 1,
				"lengthOf": {
					"refs": [
						"commandClasses"
					]
				},
				"isAutogenerated": true
			},
			{
				"type": "Bitfield",
				"name": "properties1",
				"help": "Properties1",
				"length": 1,
				"fields": [
					{
						"fieldType": "Boolean",
						"name": "listening",
						"mask": 128,
						"shift": 7
					},
					{
						"fieldType": "Integer",
						"name": "zWaveProtocolSpecificPart1",
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
						"name": "opt",
						"mask": 128,
						"shift": 7
					},
					{
						"fieldType": "Integer",
						"name": "zWaveProtocolSpecificPart2",
						"mask": 127,
						"shift": 0
					}
				]
			},
			{
				"type": "Integer",
				"name": "basicDeviceClass",
				"help": "Basic Device Class",
				"length": 1,
				"valueType": "BasicDevice"
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
					"lengthType": "Ref",
					"from": {
						"ref": "nodeInfoLength"
					},
					"offset": 6
				},
				"blobType": "CommandClasses"
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
			}
		]
	} as JsonCommandDefinition);

	public static matches(packet: Packet): boolean {
		return packet.tryAs(NetworkManagementInclusionV2)?.command === this.command;
	}

	public constructor(data: Buffer | NetworkManagementInclusionV2NodeAddStatusData) {
		super(NodeAddStatus, data);
	}
};

export class NodeRemove extends CommandPacket<NetworkManagementInclusionV2NodeRemoveData> {
	public static readonly CommandClass: typeof NetworkManagementInclusionV2 = NetworkManagementInclusionV2;
	public static readonly command: number = 0x03; // 3
	public static readonly definition: CommandDefinition = convertFromJsonCommand({
		"command": 3,
		"name": "NodeRemove",
		"help": "Node Remove",
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
					"1": {
						"name": "NodeRemoveAny",
						"help": "NODE_REMOVE_ANY"
					},
					"2": {
						"name": "NodeRemoveController",
						"help": "NODE_REMOVE_CONTROLLER"
					},
					"3": {
						"name": "NodeRemoveSlave",
						"help": "NODE_REMOVE_SLAVE"
					},
					"5": {
						"name": "NodeRemoveStop",
						"help": "NODE_REMOVE_STOP"
					}
				}
			}
		]
	} as JsonCommandDefinition);

	public static matches(packet: Packet): boolean {
		return packet.tryAs(NetworkManagementInclusionV2)?.command === this.command;
	}

	public constructor(data: Buffer | NetworkManagementInclusionV2NodeRemoveData) {
		super(NodeRemove, data);
	}
};

export class NodeRemoveStatus extends CommandPacket<NetworkManagementInclusionV2NodeRemoveStatusData> {
	public static readonly CommandClass: typeof NetworkManagementInclusionV2 = NetworkManagementInclusionV2;
	public static readonly command: number = 0x04; // 4
	public static readonly definition: CommandDefinition = convertFromJsonCommand({
		"command": 4,
		"name": "NodeRemoveStatus",
		"help": "Node Remove Status",
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
						"name": "NodeRemoveStatusDone",
						"help": "NODE_REMOVE_STATUS_DONE"
					},
					"7": {
						"name": "NodeRemoveStatusFailed",
						"help": "NODE_REMOVE_STATUS_FAILED"
					}
				}
			},
			{
				"type": "Integer",
				"name": "nodeId",
				"help": "NodeID",
				"length": 1,
				"valueType": "NodeNumber"
			}
		]
	} as JsonCommandDefinition);

	public static matches(packet: Packet): boolean {
		return packet.tryAs(NetworkManagementInclusionV2)?.command === this.command;
	}

	public constructor(data: Buffer | NetworkManagementInclusionV2NodeRemoveStatusData) {
		super(NodeRemoveStatus, data);
	}
};

export class FailedNodeReplace extends CommandPacket<NetworkManagementInclusionV2FailedNodeReplaceData> {
	public static readonly CommandClass: typeof NetworkManagementInclusionV2 = NetworkManagementInclusionV2;
	public static readonly command: number = 0x09; // 9
	public static readonly definition: CommandDefinition = convertFromJsonCommand({
		"command": 9,
		"name": "FailedNodeReplace",
		"help": "Failed Node Replace",
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
				"name": "nodeId",
				"help": "Node ID",
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
			},
			{
				"type": "Integer",
				"name": "mode",
				"help": "Mode",
				"length": 1
			}
		]
	} as JsonCommandDefinition);

	public static matches(packet: Packet): boolean {
		return packet.tryAs(NetworkManagementInclusionV2)?.command === this.command;
	}

	public constructor(data: Buffer | NetworkManagementInclusionV2FailedNodeReplaceData) {
		super(FailedNodeReplace, data);
	}
};

export class FailedNodeReplaceStatus extends CommandPacket<NetworkManagementInclusionV2FailedNodeReplaceStatusData> {
	public static readonly CommandClass: typeof NetworkManagementInclusionV2 = NetworkManagementInclusionV2;
	public static readonly command: number = 0x0a; // 10
	public static readonly definition: CommandDefinition = convertFromJsonCommand({
		"command": 10,
		"name": "FailedNodeReplaceStatus",
		"help": "Failed Node Replace Status",
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
					"4": {
						"name": "Done",
						"help": "DONE"
					},
					"5": {
						"name": "FailedNodeReplaceFail",
						"help": "FAILED_NODE_REPLACE_FAIL"
					},
					"9": {
						"name": "FailedNodeReplaceSecurityFailed",
						"help": "FAILED_NODE_REPLACE_SECURITY_FAILED"
					}
				}
			},
			{
				"type": "Integer",
				"name": "nodeId",
				"help": "Node ID",
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
			}
		]
	} as JsonCommandDefinition);

	public static matches(packet: Packet): boolean {
		return packet.tryAs(NetworkManagementInclusionV2)?.command === this.command;
	}

	public constructor(data: Buffer | NetworkManagementInclusionV2FailedNodeReplaceStatusData) {
		super(FailedNodeReplaceStatus, data);
	}
};

export class NodeNeighborUpdateRequest extends CommandPacket<NetworkManagementInclusionV2NodeNeighborUpdateRequestData> {
	public static readonly CommandClass: typeof NetworkManagementInclusionV2 = NetworkManagementInclusionV2;
	public static readonly command: number = 0x0b; // 11
	public static readonly definition: CommandDefinition = convertFromJsonCommand({
		"command": 11,
		"name": "NodeNeighborUpdateRequest",
		"help": "Node Neighbor Update Request",
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
				"name": "nodeId",
				"help": "Node ID",
				"length": 1,
				"valueType": "NodeNumber"
			}
		]
	} as JsonCommandDefinition);

	public static matches(packet: Packet): boolean {
		return packet.tryAs(NetworkManagementInclusionV2)?.command === this.command;
	}

	public constructor(data: Buffer | NetworkManagementInclusionV2NodeNeighborUpdateRequestData) {
		super(NodeNeighborUpdateRequest, data);
	}
};

export class NodeNeighborUpdateStatus extends CommandPacket<NetworkManagementInclusionV2NodeNeighborUpdateStatusData> {
	public static readonly CommandClass: typeof NetworkManagementInclusionV2 = NetworkManagementInclusionV2;
	public static readonly command: number = 0x0c; // 12
	public static readonly definition: CommandDefinition = convertFromJsonCommand({
		"command": 12,
		"name": "NodeNeighborUpdateStatus",
		"help": "Node Neighbor Update Status",
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
					"34": {
						"name": "NeighborUpdateStatusDone",
						"help": "NEIGHBOR_UPDATE_STATUS_DONE"
					},
					"35": {
						"name": "NeighborUpdateStatusFail",
						"help": "NEIGHBOR_UPDATE_STATUS_FAIL"
					}
				}
			}
		]
	} as JsonCommandDefinition);

	public static matches(packet: Packet): boolean {
		return packet.tryAs(NetworkManagementInclusionV2)?.command === this.command;
	}

	public constructor(data: Buffer | NetworkManagementInclusionV2NodeNeighborUpdateStatusData) {
		super(NodeNeighborUpdateStatus, data);
	}
};

export class ReturnRouteAssign extends CommandPacket<NetworkManagementInclusionV2ReturnRouteAssignData> {
	public static readonly CommandClass: typeof NetworkManagementInclusionV2 = NetworkManagementInclusionV2;
	public static readonly command: number = 0x0d; // 13
	public static readonly definition: CommandDefinition = convertFromJsonCommand({
		"command": 13,
		"name": "ReturnRouteAssign",
		"help": "Return Route Assign",
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
				"name": "sourceNodeId",
				"help": "Source Node ID",
				"length": 1,
				"valueType": "NodeNumber"
			},
			{
				"type": "Integer",
				"name": "destinationNodeId",
				"help": "Destination Node ID",
				"length": 1,
				"valueType": "NodeNumber"
			}
		]
	} as JsonCommandDefinition);

	public static matches(packet: Packet): boolean {
		return packet.tryAs(NetworkManagementInclusionV2)?.command === this.command;
	}

	public constructor(data: Buffer | NetworkManagementInclusionV2ReturnRouteAssignData) {
		super(ReturnRouteAssign, data);
	}
};

export class ReturnRouteAssignComplete extends CommandPacket<NetworkManagementInclusionV2ReturnRouteAssignCompleteData> {
	public static readonly CommandClass: typeof NetworkManagementInclusionV2 = NetworkManagementInclusionV2;
	public static readonly command: number = 0x0e; // 14
	public static readonly definition: CommandDefinition = convertFromJsonCommand({
		"command": 14,
		"name": "ReturnRouteAssignComplete",
		"help": "Return Route Assign Complete",
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
						"name": "TransmitCompleteOk",
						"help": "TRANSMIT_COMPLETE_OK"
					},
					"1": {
						"name": "TransmitCompleteNoAck",
						"help": "TRANSMIT_COMPLETE_NO_ACK"
					},
					"2": {
						"name": "TransmitCompleteFail",
						"help": "TRANSMIT_COMPLETE_FAIL"
					}
				}
			}
		]
	} as JsonCommandDefinition);

	public static matches(packet: Packet): boolean {
		return packet.tryAs(NetworkManagementInclusionV2)?.command === this.command;
	}

	public constructor(data: Buffer | NetworkManagementInclusionV2ReturnRouteAssignCompleteData) {
		super(ReturnRouteAssignComplete, data);
	}
};

export class ReturnRouteDelete extends CommandPacket<NetworkManagementInclusionV2ReturnRouteDeleteData> {
	public static readonly CommandClass: typeof NetworkManagementInclusionV2 = NetworkManagementInclusionV2;
	public static readonly command: number = 0x0f; // 15
	public static readonly definition: CommandDefinition = convertFromJsonCommand({
		"command": 15,
		"name": "ReturnRouteDelete",
		"help": "Return Route Delete",
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
				"name": "nodeId",
				"help": "Node ID",
				"length": 1,
				"valueType": "NodeNumber"
			}
		]
	} as JsonCommandDefinition);

	public static matches(packet: Packet): boolean {
		return packet.tryAs(NetworkManagementInclusionV2)?.command === this.command;
	}

	public constructor(data: Buffer | NetworkManagementInclusionV2ReturnRouteDeleteData) {
		super(ReturnRouteDelete, data);
	}
};

export class ReturnRouteDeleteComplete extends CommandPacket<NetworkManagementInclusionV2ReturnRouteDeleteCompleteData> {
	public static readonly CommandClass: typeof NetworkManagementInclusionV2 = NetworkManagementInclusionV2;
	public static readonly command: number = 0x10; // 16
	public static readonly definition: CommandDefinition = convertFromJsonCommand({
		"command": 16,
		"name": "ReturnRouteDeleteComplete",
		"help": "Return Route Delete Complete",
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
						"name": "TransmitCompleteOk",
						"help": "TRANSMIT_COMPLETE_OK"
					},
					"1": {
						"name": "TransmitCompleteNoAck",
						"help": "TRANSMIT_COMPLETE_NO_ACK"
					},
					"2": {
						"name": "TransmitCompleteFail",
						"help": "TRANSMIT_COMPLETE_FAIL"
					}
				}
			}
		]
	} as JsonCommandDefinition);

	public static matches(packet: Packet): boolean {
		return packet.tryAs(NetworkManagementInclusionV2)?.command === this.command;
	}

	public constructor(data: Buffer | NetworkManagementInclusionV2ReturnRouteDeleteCompleteData) {
		super(ReturnRouteDeleteComplete, data);
	}
};

export class NodeAddKeysReport extends CommandPacket<NetworkManagementInclusionV2NodeAddKeysReportData> {
	public static readonly CommandClass: typeof NetworkManagementInclusionV2 = NetworkManagementInclusionV2;
	public static readonly command: number = 0x11; // 17
	public static readonly definition: CommandDefinition = convertFromJsonCommand({
		"command": 17,
		"name": "NodeAddKeysReport",
		"help": "Node Add Keys Report",
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
						"name": "requestCsa",
						"mask": 1,
						"shift": 0
					}
				]
			},
			{
				"type": "Integer",
				"name": "requestedKeys",
				"help": "Requested Keys",
				"length": 1
			}
		]
	} as JsonCommandDefinition);

	public static matches(packet: Packet): boolean {
		return packet.tryAs(NetworkManagementInclusionV2)?.command === this.command;
	}

	public constructor(data: Buffer | NetworkManagementInclusionV2NodeAddKeysReportData) {
		super(NodeAddKeysReport, data);
	}
};

export class NodeAddKeysSet extends CommandPacket<NetworkManagementInclusionV2NodeAddKeysSetData> {
	public static readonly CommandClass: typeof NetworkManagementInclusionV2 = NetworkManagementInclusionV2;
	public static readonly command: number = 0x12; // 18
	public static readonly definition: CommandDefinition = convertFromJsonCommand({
		"command": 18,
		"name": "NodeAddKeysSet",
		"help": "Node Add Keys Set",
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
						"mask": 252,
						"shift": 2,
						"reserved": true
					},
					{
						"fieldType": "Boolean",
						"name": "grantCsa",
						"mask": 2,
						"shift": 1
					},
					{
						"fieldType": "Boolean",
						"name": "accept",
						"mask": 1,
						"shift": 0
					}
				]
			},
			{
				"type": "Integer",
				"name": "grantedKeys",
				"help": "Granted Keys",
				"length": 1
			}
		]
	} as JsonCommandDefinition);

	public static matches(packet: Packet): boolean {
		return packet.tryAs(NetworkManagementInclusionV2)?.command === this.command;
	}

	public constructor(data: Buffer | NetworkManagementInclusionV2NodeAddKeysSetData) {
		super(NodeAddKeysSet, data);
	}
};

export class NodeAddDskReport extends CommandPacket<NetworkManagementInclusionV2NodeAddDskReportData> {
	public static readonly CommandClass: typeof NetworkManagementInclusionV2 = NetworkManagementInclusionV2;
	public static readonly command: number = 0x13; // 19
	public static readonly definition: CommandDefinition = convertFromJsonCommand({
		"command": 19,
		"name": "NodeAddDskReport",
		"help": "Node Add DSK Report",
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
						"mask": 240,
						"shift": 4,
						"reserved": true
					},
					{
						"fieldType": "Integer",
						"name": "inputDskLength",
						"mask": 15,
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
	} as JsonCommandDefinition);

	public static matches(packet: Packet): boolean {
		return packet.tryAs(NetworkManagementInclusionV2)?.command === this.command;
	}

	public constructor(data: Buffer | NetworkManagementInclusionV2NodeAddDskReportData) {
		super(NodeAddDskReport, data);
	}
};

export class NodeAddDskSet extends CommandPacket<NetworkManagementInclusionV2NodeAddDskSetData> {
	public static readonly CommandClass: typeof NetworkManagementInclusionV2 = NetworkManagementInclusionV2;
	public static readonly command: number = 0x14; // 20
	public static readonly definition: CommandDefinition = convertFromJsonCommand({
		"command": 20,
		"name": "NodeAddDskSet",
		"help": "Node Add DSK Set",
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
						"fieldType": "Boolean",
						"name": "accept",
						"mask": 128,
						"shift": 7
					},
					{
						"fieldType": "Integer",
						"name": "reserved",
						"mask": 112,
						"shift": 4,
						"reserved": true
					},
					{
						"fieldType": "Integer",
						"name": "inputDskLength",
						"mask": 15,
						"shift": 0,
						"lengthOf": {
							"refs": [
								"inputDsk"
							]
						},
						"isAutogenerated": true
					}
				]
			},
			{
				"type": "Blob",
				"name": "inputDsk",
				"help": "Input DSK",
				"length": {
					"lengthType": "Ref",
					"from": {
						"ref": "properties1.inputDskLength"
					}
				}
			}
		]
	} as JsonCommandDefinition);

	public static matches(packet: Packet): boolean {
		return packet.tryAs(NetworkManagementInclusionV2)?.command === this.command;
	}

	public constructor(data: Buffer | NetworkManagementInclusionV2NodeAddDskSetData) {
		super(NodeAddDskSet, data);
	}
};
