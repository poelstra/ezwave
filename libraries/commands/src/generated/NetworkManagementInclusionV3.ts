/**
 * Command Class Network Management Inclusion, version 3.
 *
 * Auto-generated, do not edit.
 */

import { CommandClassPacket, CommandPacket, Packet } from "@ezwave/codec";
import { CommandClasses, convertFromJsonCommand, JsonCommandDefinition } from "@ezwave/spec";

export enum NetworkManagementInclusionV3Commands {
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
	S2AdvancedJoinModeGet = 0x17,
	SmartStartJoinStartedReport = 0x15,
	S2AdvancedJoinModeSet = 0x16,
	S2AdvancedJoinModeReport = 0x18,
	IncludedNifReport = 0x19,
}

export interface NetworkManagementInclusionV3FailedNodeRemoveData {
	seqNo: number; // 1 byte unsigned integer
	nodeId: number; // 1 byte unsigned integer
}

export interface NetworkManagementInclusionV3FailedNodeRemoveStatusData {
	seqNo: number; // 1 byte unsigned integer
	nodeId: number; // 1 byte unsigned integer
	status: number; // 1 byte unsigned integer
}

export interface NetworkManagementInclusionV3NodeAddData {
	seqNo: number; // 1 byte unsigned integer
	mode: number; // 1 byte unsigned integer
	txOptions: Set<TxOptionsEnum>; // 1 bytes
}

export interface NetworkManagementInclusionV3NodeAddStatusData {
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
	dsk: Buffer; // variable length
}

export interface NetworkManagementInclusionV3NodeRemoveData {
	seqNo: number; // 1 byte unsigned integer
	mode: number; // 1 byte unsigned integer
}

export interface NetworkManagementInclusionV3NodeRemoveStatusData {
	seqNo: number; // 1 byte unsigned integer
	status: number; // 1 byte unsigned integer
	nodeId: number; // 1 byte unsigned integer
}

export interface NetworkManagementInclusionV3FailedNodeReplaceData {
	seqNo: number; // 1 byte unsigned integer
	nodeId: number; // 1 byte unsigned integer
	txOptions: Set<TxOptionsEnum>; // 1 bytes
	mode: number; // 1 byte unsigned integer
}

export interface NetworkManagementInclusionV3FailedNodeReplaceStatusData {
	seqNo: number; // 1 byte unsigned integer
	status: number; // 1 byte unsigned integer
	nodeId: number; // 1 byte unsigned integer
	grantedKeys: number; // 1 byte unsigned integer
	kexFailType: number; // 1 byte unsigned integer
}

export interface NetworkManagementInclusionV3NodeNeighborUpdateRequestData {
	seqNo: number; // 1 byte unsigned integer
	nodeId: number; // 1 byte unsigned integer
}

export interface NetworkManagementInclusionV3NodeNeighborUpdateStatusData {
	seqNo: number; // 1 byte unsigned integer
	status: number; // 1 byte unsigned integer
}

export interface NetworkManagementInclusionV3ReturnRouteAssignData {
	seqNo: number; // 1 byte unsigned integer
	sourceNodeId: number; // 1 byte unsigned integer
	destinationNodeId: number; // 1 byte unsigned integer
}

export interface NetworkManagementInclusionV3ReturnRouteAssignCompleteData {
	seqNo: number; // 1 byte unsigned integer
	status: number; // 1 byte unsigned integer
}

export interface NetworkManagementInclusionV3ReturnRouteDeleteData {
	seqNo: number; // 1 byte unsigned integer
	nodeId: number; // 1 byte unsigned integer
}

export interface NetworkManagementInclusionV3ReturnRouteDeleteCompleteData {
	seqNo: number; // 1 byte unsigned integer
	status: number; // 1 byte unsigned integer
}

export interface NetworkManagementInclusionV3NodeAddKeysReportData {
	seqNo: number; // 1 byte unsigned integer
	requestCsa: boolean; // properties1[0]
	requestedKeys: number; // 1 byte unsigned integer
}

export interface NetworkManagementInclusionV3NodeAddKeysSetData {
	seqNo: number; // 1 byte unsigned integer
	grantCsa: boolean; // properties1[1]
	accept: boolean; // properties1[0]
	grantedKeys: number; // 1 byte unsigned integer
}

export interface NetworkManagementInclusionV3NodeAddDskReportData {
	seqNo: number; // 1 byte unsigned integer
	inputDskLength: number; // properties1[3..0]
	dsk: Buffer; // 16 bytes
}

export interface NetworkManagementInclusionV3NodeAddDskSetData {
	seqNo: number; // 1 byte unsigned integer
	accept: boolean; // properties1[7]
	inputDsk: Buffer; // variable length
}

export interface NetworkManagementInclusionV3S2AdvancedJoinModeGetData {
	seqNo: number; // 1 byte unsigned integer
}

export interface NetworkManagementInclusionV3SmartStartJoinStartedReportData {
	seqNo: number; // 1 byte unsigned integer
	dsk: Buffer; // variable length
}

export interface NetworkManagementInclusionV3S2AdvancedJoinModeSetData {
	seqNo: number; // 1 byte unsigned integer
	s2AdvancedJoinMode: number; // 1 byte unsigned integer
}

export interface NetworkManagementInclusionV3S2AdvancedJoinModeReportData {
	seqNo: number; // 1 byte unsigned integer
	s2AdvancedJoinMode: number; // 1 byte unsigned integer
}

export interface NetworkManagementInclusionV3IncludedNifReportData {
	seqNo: number; // 1 byte unsigned integer
	dsk: Buffer; // variable length
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

export class NetworkManagementInclusionV3 extends CommandClassPacket<NetworkManagementInclusionV3Commands> {
	public static readonly commandClass = CommandClasses.NetworkManagementInclusion; // 0x34 (52)
	public static readonly version = 3;

	public static matches(packet: Packet): boolean {
		return packet.commandClass === this.commandClass;
	}

	constructor(commandAndPayload: Buffer) {
		super(NetworkManagementInclusionV3, commandAndPayload);
	}

	public static readonly FailedNodeRemove = class FailedNodeRemove extends CommandPacket<NetworkManagementInclusionV3FailedNodeRemoveData> {
		public static readonly CommandClass = NetworkManagementInclusionV3;
		public static readonly command = 0x07;
		public static readonly definition = convertFromJsonCommand({
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

		static matches(packet: Packet): boolean {
			return packet.tryAs(NetworkManagementInclusionV3)?.command === this.command;
		}

		constructor(data: Buffer | NetworkManagementInclusionV3FailedNodeRemoveData) {
			super(FailedNodeRemove, data);
		}
	};

	public static readonly FailedNodeRemoveStatus = class FailedNodeRemoveStatus extends CommandPacket<NetworkManagementInclusionV3FailedNodeRemoveStatusData> {
		public static readonly CommandClass = NetworkManagementInclusionV3;
		public static readonly command = 0x08;
		public static readonly definition = convertFromJsonCommand({
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

		static matches(packet: Packet): boolean {
			return packet.tryAs(NetworkManagementInclusionV3)?.command === this.command;
		}

		constructor(data: Buffer | NetworkManagementInclusionV3FailedNodeRemoveStatusData) {
			super(FailedNodeRemoveStatus, data);
		}
	};

	public static readonly NodeAdd = class NodeAdd extends CommandPacket<NetworkManagementInclusionV3NodeAddData> {
		public static readonly CommandClass = NetworkManagementInclusionV3;
		public static readonly command = 0x01;
		public static readonly definition = convertFromJsonCommand({
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

		static matches(packet: Packet): boolean {
			return packet.tryAs(NetworkManagementInclusionV3)?.command === this.command;
		}

		constructor(data: Buffer | NetworkManagementInclusionV3NodeAddData) {
			super(NodeAdd, data);
		}
	};

	public static readonly NodeAddStatus = class NodeAddStatus extends CommandPacket<NetworkManagementInclusionV3NodeAddStatusData> {
		public static readonly CommandClass = NetworkManagementInclusionV3;
		public static readonly command = 0x02;
		public static readonly definition = convertFromJsonCommand({
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
					"name": "reserved1",
					"help": "Reserved1",
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
				},
				{
					"type": "Bitfield",
					"name": "properties3",
					"help": "Properties3",
					"length": 1,
					"fields": [
						{
							"fieldType": "Integer",
							"name": "reserved2",
							"mask": 224,
							"shift": 5,
							"reserved": true
						},
						{
							"fieldType": "Integer",
							"name": "dskLength",
							"mask": 31,
							"shift": 0,
							"lengthOf": {
								"refs": [
									"dsk"
								]
							},
							"isAutogenerated": true
						}
					]
				},
				{
					"type": "Blob",
					"name": "dsk",
					"help": "DSK",
					"length": {
						"lengthType": "Ref",
						"from": {
							"ref": "properties3.dskLength"
						}
					}
				}
			]
		} as JsonCommandDefinition);

		static matches(packet: Packet): boolean {
			return packet.tryAs(NetworkManagementInclusionV3)?.command === this.command;
		}

		constructor(data: Buffer | NetworkManagementInclusionV3NodeAddStatusData) {
			super(NodeAddStatus, data);
		}
	};

	public static readonly NodeRemove = class NodeRemove extends CommandPacket<NetworkManagementInclusionV3NodeRemoveData> {
		public static readonly CommandClass = NetworkManagementInclusionV3;
		public static readonly command = 0x03;
		public static readonly definition = convertFromJsonCommand({
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

		static matches(packet: Packet): boolean {
			return packet.tryAs(NetworkManagementInclusionV3)?.command === this.command;
		}

		constructor(data: Buffer | NetworkManagementInclusionV3NodeRemoveData) {
			super(NodeRemove, data);
		}
	};

	public static readonly NodeRemoveStatus = class NodeRemoveStatus extends CommandPacket<NetworkManagementInclusionV3NodeRemoveStatusData> {
		public static readonly CommandClass = NetworkManagementInclusionV3;
		public static readonly command = 0x04;
		public static readonly definition = convertFromJsonCommand({
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

		static matches(packet: Packet): boolean {
			return packet.tryAs(NetworkManagementInclusionV3)?.command === this.command;
		}

		constructor(data: Buffer | NetworkManagementInclusionV3NodeRemoveStatusData) {
			super(NodeRemoveStatus, data);
		}
	};

	public static readonly FailedNodeReplace = class FailedNodeReplace extends CommandPacket<NetworkManagementInclusionV3FailedNodeReplaceData> {
		public static readonly CommandClass = NetworkManagementInclusionV3;
		public static readonly command = 0x09;
		public static readonly definition = convertFromJsonCommand({
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

		static matches(packet: Packet): boolean {
			return packet.tryAs(NetworkManagementInclusionV3)?.command === this.command;
		}

		constructor(data: Buffer | NetworkManagementInclusionV3FailedNodeReplaceData) {
			super(FailedNodeReplace, data);
		}
	};

	public static readonly FailedNodeReplaceStatus = class FailedNodeReplaceStatus extends CommandPacket<NetworkManagementInclusionV3FailedNodeReplaceStatusData> {
		public static readonly CommandClass = NetworkManagementInclusionV3;
		public static readonly command = 0x0a;
		public static readonly definition = convertFromJsonCommand({
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

		static matches(packet: Packet): boolean {
			return packet.tryAs(NetworkManagementInclusionV3)?.command === this.command;
		}

		constructor(data: Buffer | NetworkManagementInclusionV3FailedNodeReplaceStatusData) {
			super(FailedNodeReplaceStatus, data);
		}
	};

	public static readonly NodeNeighborUpdateRequest = class NodeNeighborUpdateRequest extends CommandPacket<NetworkManagementInclusionV3NodeNeighborUpdateRequestData> {
		public static readonly CommandClass = NetworkManagementInclusionV3;
		public static readonly command = 0x0b;
		public static readonly definition = convertFromJsonCommand({
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

		static matches(packet: Packet): boolean {
			return packet.tryAs(NetworkManagementInclusionV3)?.command === this.command;
		}

		constructor(data: Buffer | NetworkManagementInclusionV3NodeNeighborUpdateRequestData) {
			super(NodeNeighborUpdateRequest, data);
		}
	};

	public static readonly NodeNeighborUpdateStatus = class NodeNeighborUpdateStatus extends CommandPacket<NetworkManagementInclusionV3NodeNeighborUpdateStatusData> {
		public static readonly CommandClass = NetworkManagementInclusionV3;
		public static readonly command = 0x0c;
		public static readonly definition = convertFromJsonCommand({
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

		static matches(packet: Packet): boolean {
			return packet.tryAs(NetworkManagementInclusionV3)?.command === this.command;
		}

		constructor(data: Buffer | NetworkManagementInclusionV3NodeNeighborUpdateStatusData) {
			super(NodeNeighborUpdateStatus, data);
		}
	};

	public static readonly ReturnRouteAssign = class ReturnRouteAssign extends CommandPacket<NetworkManagementInclusionV3ReturnRouteAssignData> {
		public static readonly CommandClass = NetworkManagementInclusionV3;
		public static readonly command = 0x0d;
		public static readonly definition = convertFromJsonCommand({
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

		static matches(packet: Packet): boolean {
			return packet.tryAs(NetworkManagementInclusionV3)?.command === this.command;
		}

		constructor(data: Buffer | NetworkManagementInclusionV3ReturnRouteAssignData) {
			super(ReturnRouteAssign, data);
		}
	};

	public static readonly ReturnRouteAssignComplete = class ReturnRouteAssignComplete extends CommandPacket<NetworkManagementInclusionV3ReturnRouteAssignCompleteData> {
		public static readonly CommandClass = NetworkManagementInclusionV3;
		public static readonly command = 0x0e;
		public static readonly definition = convertFromJsonCommand({
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

		static matches(packet: Packet): boolean {
			return packet.tryAs(NetworkManagementInclusionV3)?.command === this.command;
		}

		constructor(data: Buffer | NetworkManagementInclusionV3ReturnRouteAssignCompleteData) {
			super(ReturnRouteAssignComplete, data);
		}
	};

	public static readonly ReturnRouteDelete = class ReturnRouteDelete extends CommandPacket<NetworkManagementInclusionV3ReturnRouteDeleteData> {
		public static readonly CommandClass = NetworkManagementInclusionV3;
		public static readonly command = 0x0f;
		public static readonly definition = convertFromJsonCommand({
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

		static matches(packet: Packet): boolean {
			return packet.tryAs(NetworkManagementInclusionV3)?.command === this.command;
		}

		constructor(data: Buffer | NetworkManagementInclusionV3ReturnRouteDeleteData) {
			super(ReturnRouteDelete, data);
		}
	};

	public static readonly ReturnRouteDeleteComplete = class ReturnRouteDeleteComplete extends CommandPacket<NetworkManagementInclusionV3ReturnRouteDeleteCompleteData> {
		public static readonly CommandClass = NetworkManagementInclusionV3;
		public static readonly command = 0x10;
		public static readonly definition = convertFromJsonCommand({
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

		static matches(packet: Packet): boolean {
			return packet.tryAs(NetworkManagementInclusionV3)?.command === this.command;
		}

		constructor(data: Buffer | NetworkManagementInclusionV3ReturnRouteDeleteCompleteData) {
			super(ReturnRouteDeleteComplete, data);
		}
	};

	public static readonly NodeAddKeysReport = class NodeAddKeysReport extends CommandPacket<NetworkManagementInclusionV3NodeAddKeysReportData> {
		public static readonly CommandClass = NetworkManagementInclusionV3;
		public static readonly command = 0x11;
		public static readonly definition = convertFromJsonCommand({
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

		static matches(packet: Packet): boolean {
			return packet.tryAs(NetworkManagementInclusionV3)?.command === this.command;
		}

		constructor(data: Buffer | NetworkManagementInclusionV3NodeAddKeysReportData) {
			super(NodeAddKeysReport, data);
		}
	};

	public static readonly NodeAddKeysSet = class NodeAddKeysSet extends CommandPacket<NetworkManagementInclusionV3NodeAddKeysSetData> {
		public static readonly CommandClass = NetworkManagementInclusionV3;
		public static readonly command = 0x12;
		public static readonly definition = convertFromJsonCommand({
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

		static matches(packet: Packet): boolean {
			return packet.tryAs(NetworkManagementInclusionV3)?.command === this.command;
		}

		constructor(data: Buffer | NetworkManagementInclusionV3NodeAddKeysSetData) {
			super(NodeAddKeysSet, data);
		}
	};

	public static readonly NodeAddDskReport = class NodeAddDskReport extends CommandPacket<NetworkManagementInclusionV3NodeAddDskReportData> {
		public static readonly CommandClass = NetworkManagementInclusionV3;
		public static readonly command = 0x13;
		public static readonly definition = convertFromJsonCommand({
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

		static matches(packet: Packet): boolean {
			return packet.tryAs(NetworkManagementInclusionV3)?.command === this.command;
		}

		constructor(data: Buffer | NetworkManagementInclusionV3NodeAddDskReportData) {
			super(NodeAddDskReport, data);
		}
	};

	public static readonly NodeAddDskSet = class NodeAddDskSet extends CommandPacket<NetworkManagementInclusionV3NodeAddDskSetData> {
		public static readonly CommandClass = NetworkManagementInclusionV3;
		public static readonly command = 0x14;
		public static readonly definition = convertFromJsonCommand({
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

		static matches(packet: Packet): boolean {
			return packet.tryAs(NetworkManagementInclusionV3)?.command === this.command;
		}

		constructor(data: Buffer | NetworkManagementInclusionV3NodeAddDskSetData) {
			super(NodeAddDskSet, data);
		}
	};

	public static readonly S2AdvancedJoinModeGet = class S2AdvancedJoinModeGet extends CommandPacket<NetworkManagementInclusionV3S2AdvancedJoinModeGetData> {
		public static readonly CommandClass = NetworkManagementInclusionV3;
		public static readonly command = 0x17;
		public static readonly definition = convertFromJsonCommand({
			"command": 23,
			"name": "S2AdvancedJoinModeGet",
			"help": "S2 Advanced Join Mode Get",
			"status": "Active",
			"params": [
				{
					"type": "Integer",
					"name": "seqNo",
					"help": "Seq No",
					"length": 1
				}
			]
		} as JsonCommandDefinition);

		static matches(packet: Packet): boolean {
			return packet.tryAs(NetworkManagementInclusionV3)?.command === this.command;
		}

		constructor(data: Buffer | NetworkManagementInclusionV3S2AdvancedJoinModeGetData) {
			super(S2AdvancedJoinModeGet, data);
		}
	};

	public static readonly SmartStartJoinStartedReport = class SmartStartJoinStartedReport extends CommandPacket<NetworkManagementInclusionV3SmartStartJoinStartedReportData> {
		public static readonly CommandClass = NetworkManagementInclusionV3;
		public static readonly command = 0x15;
		public static readonly definition = convertFromJsonCommand({
			"command": 21,
			"name": "SmartStartJoinStartedReport",
			"help": "Smart Start Join Started",
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
							"name": "reserved1",
							"mask": 224,
							"shift": 5,
							"reserved": true
						},
						{
							"fieldType": "Integer",
							"name": "dskLength",
							"mask": 31,
							"shift": 0,
							"lengthOf": {
								"refs": [
									"dsk"
								]
							},
							"isAutogenerated": true
						}
					]
				},
				{
					"type": "Blob",
					"name": "dsk",
					"help": "DSK",
					"length": {
						"lengthType": "Ref",
						"from": {
							"ref": "properties1.dskLength"
						}
					}
				}
			]
		} as JsonCommandDefinition);

		static matches(packet: Packet): boolean {
			return packet.tryAs(NetworkManagementInclusionV3)?.command === this.command;
		}

		constructor(data: Buffer | NetworkManagementInclusionV3SmartStartJoinStartedReportData) {
			super(SmartStartJoinStartedReport, data);
		}
	};

	public static readonly S2AdvancedJoinModeSet = class S2AdvancedJoinModeSet extends CommandPacket<NetworkManagementInclusionV3S2AdvancedJoinModeSetData> {
		public static readonly CommandClass = NetworkManagementInclusionV3;
		public static readonly command = 0x16;
		public static readonly definition = convertFromJsonCommand({
			"command": 22,
			"name": "S2AdvancedJoinModeSet",
			"help": "S2 Advanced Join Mode Set",
			"status": "Active",
			"params": [
				{
					"type": "Integer",
					"name": "seqNo",
					"help": "Seq No",
					"length": 1
				},
				{
					"type": "Integer",
					"name": "s2AdvancedJoinMode",
					"help": "S2 Advanced Join Mode",
					"length": 1
				}
			]
		} as JsonCommandDefinition);

		static matches(packet: Packet): boolean {
			return packet.tryAs(NetworkManagementInclusionV3)?.command === this.command;
		}

		constructor(data: Buffer | NetworkManagementInclusionV3S2AdvancedJoinModeSetData) {
			super(S2AdvancedJoinModeSet, data);
		}
	};

	public static readonly S2AdvancedJoinModeReport = class S2AdvancedJoinModeReport extends CommandPacket<NetworkManagementInclusionV3S2AdvancedJoinModeReportData> {
		public static readonly CommandClass = NetworkManagementInclusionV3;
		public static readonly command = 0x18;
		public static readonly definition = convertFromJsonCommand({
			"command": 24,
			"name": "S2AdvancedJoinModeReport",
			"help": "S2 Advanced Join Mode Report",
			"status": "Active",
			"params": [
				{
					"type": "Integer",
					"name": "seqNo",
					"help": "Seq No",
					"length": 1
				},
				{
					"type": "Integer",
					"name": "s2AdvancedJoinMode",
					"help": "S2 Advanced Join Mode",
					"length": 1
				}
			]
		} as JsonCommandDefinition);

		static matches(packet: Packet): boolean {
			return packet.tryAs(NetworkManagementInclusionV3)?.command === this.command;
		}

		constructor(data: Buffer | NetworkManagementInclusionV3S2AdvancedJoinModeReportData) {
			super(S2AdvancedJoinModeReport, data);
		}
	};

	public static readonly IncludedNifReport = class IncludedNifReport extends CommandPacket<NetworkManagementInclusionV3IncludedNifReportData> {
		public static readonly CommandClass = NetworkManagementInclusionV3;
		public static readonly command = 0x19;
		public static readonly definition = convertFromJsonCommand({
			"command": 25,
			"name": "IncludedNifReport",
			"help": "Included Node Information Frame Report",
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
							"name": "reserved1",
							"mask": 224,
							"shift": 5,
							"reserved": true
						},
						{
							"fieldType": "Integer",
							"name": "dskLength",
							"mask": 31,
							"shift": 0,
							"lengthOf": {
								"refs": [
									"dsk"
								]
							},
							"isAutogenerated": true
						}
					]
				},
				{
					"type": "Blob",
					"name": "dsk",
					"help": "DSK",
					"length": {
						"lengthType": "Ref",
						"from": {
							"ref": "properties1.dskLength"
						}
					}
				}
			]
		} as JsonCommandDefinition);

		static matches(packet: Packet): boolean {
			return packet.tryAs(NetworkManagementInclusionV3)?.command === this.command;
		}

		constructor(data: Buffer | NetworkManagementInclusionV3IncludedNifReportData) {
			super(IncludedNifReport, data);
		}
	};
}

export namespace NetworkManagementInclusionV3 {
	export type FailedNodeRemove = InstanceType<typeof NetworkManagementInclusionV3.FailedNodeRemove>;
	export type FailedNodeRemoveStatus = InstanceType<typeof NetworkManagementInclusionV3.FailedNodeRemoveStatus>;
	export type NodeAdd = InstanceType<typeof NetworkManagementInclusionV3.NodeAdd>;
	export type NodeAddStatus = InstanceType<typeof NetworkManagementInclusionV3.NodeAddStatus>;
	export type NodeRemove = InstanceType<typeof NetworkManagementInclusionV3.NodeRemove>;
	export type NodeRemoveStatus = InstanceType<typeof NetworkManagementInclusionV3.NodeRemoveStatus>;
	export type FailedNodeReplace = InstanceType<typeof NetworkManagementInclusionV3.FailedNodeReplace>;
	export type FailedNodeReplaceStatus = InstanceType<typeof NetworkManagementInclusionV3.FailedNodeReplaceStatus>;
	export type NodeNeighborUpdateRequest = InstanceType<typeof NetworkManagementInclusionV3.NodeNeighborUpdateRequest>;
	export type NodeNeighborUpdateStatus = InstanceType<typeof NetworkManagementInclusionV3.NodeNeighborUpdateStatus>;
	export type ReturnRouteAssign = InstanceType<typeof NetworkManagementInclusionV3.ReturnRouteAssign>;
	export type ReturnRouteAssignComplete = InstanceType<typeof NetworkManagementInclusionV3.ReturnRouteAssignComplete>;
	export type ReturnRouteDelete = InstanceType<typeof NetworkManagementInclusionV3.ReturnRouteDelete>;
	export type ReturnRouteDeleteComplete = InstanceType<typeof NetworkManagementInclusionV3.ReturnRouteDeleteComplete>;
	export type NodeAddKeysReport = InstanceType<typeof NetworkManagementInclusionV3.NodeAddKeysReport>;
	export type NodeAddKeysSet = InstanceType<typeof NetworkManagementInclusionV3.NodeAddKeysSet>;
	export type NodeAddDskReport = InstanceType<typeof NetworkManagementInclusionV3.NodeAddDskReport>;
	export type NodeAddDskSet = InstanceType<typeof NetworkManagementInclusionV3.NodeAddDskSet>;
	export type S2AdvancedJoinModeGet = InstanceType<typeof NetworkManagementInclusionV3.S2AdvancedJoinModeGet>;
	export type SmartStartJoinStartedReport = InstanceType<typeof NetworkManagementInclusionV3.SmartStartJoinStartedReport>;
	export type S2AdvancedJoinModeSet = InstanceType<typeof NetworkManagementInclusionV3.S2AdvancedJoinModeSet>;
	export type S2AdvancedJoinModeReport = InstanceType<typeof NetworkManagementInclusionV3.S2AdvancedJoinModeReport>;
	export type IncludedNifReport = InstanceType<typeof NetworkManagementInclusionV3.IncludedNifReport>;
}
