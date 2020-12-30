/**
 * Command Class Network Management Inclusion, version 1.
 *
 * Auto-generated, do not edit.
 */

import { CommandClassPacket, CommandPacket } from "../commands/command";
import { Packet } from "../commands/packet";
import { CommandDefinition } from "../commands/types";
import CommandClasses from "../generated/CommandClasses";

export enum NetworkManagementInclusionV1Commands {
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
}

export interface NetworkManagementInclusionV1FailedNodeRemoveData {
	seqNo: number; // 1 byte unsigned integer
	nodeID: number; // 1 byte unsigned integer
}

export interface NetworkManagementInclusionV1FailedNodeRemoveStatusData {
	seqNo: number; // 1 byte unsigned integer
	nodeID: number; // 1 byte unsigned integer
	status: number; // 1 byte unsigned integer
}

export interface NetworkManagementInclusionV1NodeAddData {
	seqNo: number; // 1 byte unsigned integer
	mode: number; // 1 byte unsigned integer
	// TODO param txOptions type bitmask or marker
}

export interface NetworkManagementInclusionV1NodeAddStatusData {
	seqNo: number; // 1 byte unsigned integer
	status: number; // 1 byte unsigned integer
	newNodeID: number; // 1 byte unsigned integer
	nodeInfoLength: number; // 1 byte unsigned integer
	listening: boolean; // properties1[7]
	zWaveProtocolSpecificPart1: number; // properties1[6..0]
	opt: boolean; // properties2[7]
	zWaveProtocolSpecificPart2: number; // properties2[6..0]
	basicDeviceClass: number; // 1 byte unsigned integer
	genericDeviceClass: number; // 1 byte unsigned integer
	specificDeviceClass: number; // 1 byte unsigned integer
	// TODO param commandClass type enumarray
}

export interface NetworkManagementInclusionV1NodeRemoveData {
	seqNo: number; // 1 byte unsigned integer
	mode: number; // 1 byte unsigned integer
}

export interface NetworkManagementInclusionV1NodeRemoveStatusData {
	seqNo: number; // 1 byte unsigned integer
	status: number; // 1 byte unsigned integer
	nodeID: number; // 1 byte unsigned integer
}

export interface NetworkManagementInclusionV1FailedNodeReplaceData {
	seqNo: number; // 1 byte unsigned integer
	nodeID: number; // 1 byte unsigned integer
	// TODO param txOptions type bitmask or marker
	mode: number; // 1 byte unsigned integer
}

export interface NetworkManagementInclusionV1FailedNodeReplaceStatusData {
	seqNo: number; // 1 byte unsigned integer
	status: number; // 1 byte unsigned integer
	nodeID: number; // 1 byte unsigned integer
}

export interface NetworkManagementInclusionV1NodeNeighborUpdateRequestData {
	seqNo: number; // 1 byte unsigned integer
	nodeID: number; // 1 byte unsigned integer
}

export interface NetworkManagementInclusionV1NodeNeighborUpdateStatusData {
	seqNo: number; // 1 byte unsigned integer
	status: number; // 1 byte unsigned integer
}

export interface NetworkManagementInclusionV1ReturnRouteAssignData {
	seqNo: number; // 1 byte unsigned integer
	sourceNodeID: number; // 1 byte unsigned integer
	destinationNodeID: number; // 1 byte unsigned integer
}

export interface NetworkManagementInclusionV1ReturnRouteAssignCompleteData {
	seqNo: number; // 1 byte unsigned integer
	status: number; // 1 byte unsigned integer
}

export interface NetworkManagementInclusionV1ReturnRouteDeleteData {
	seqNo: number; // 1 byte unsigned integer
	nodeID: number; // 1 byte unsigned integer
}

export interface NetworkManagementInclusionV1ReturnRouteDeleteCompleteData {
	seqNo: number; // 1 byte unsigned integer
	status: number; // 1 byte unsigned integer
}

export class NetworkManagementInclusionV1 extends CommandClassPacket<NetworkManagementInclusionV1Commands> {
	public static readonly commandClass = CommandClasses.NetworkManagementInclusion; // 0x34 (52)

	public static matches(packet: Packet): boolean {
		return packet.commandClass === this.commandClass;
	}

	constructor(commandAndPayload: Buffer) {
		super(NetworkManagementInclusionV1, commandAndPayload);
	}

	public static readonly FailedNodeRemove = class FailedNodeRemove extends CommandPacket<NetworkManagementInclusionV1FailedNodeRemoveData> {
		public static readonly CommandClass = NetworkManagementInclusionV1;
		public static readonly command = 0x07;
		public static readonly definition = {
			"command": 7,
			"name": "FailedNodeRemove",
			"help": "Failed Node Remove",
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
					"name": "nodeID",
					"help": "Node ID",
					"length": 1,
					"valueType": "NODE_NUMBER"
				}
			]
		} as CommandDefinition;

		static matches(packet: Packet): boolean {
			return packet.tryAs(NetworkManagementInclusionV1)?.command === this.command;
		}

		constructor(data: Buffer | NetworkManagementInclusionV1FailedNodeRemoveData) {
			super(FailedNodeRemove, data);
		}
	};

	public static readonly FailedNodeRemoveStatus = class FailedNodeRemoveStatus extends CommandPacket<NetworkManagementInclusionV1FailedNodeRemoveStatusData> {
		public static readonly CommandClass = NetworkManagementInclusionV1;
		public static readonly command = 0x08;
		public static readonly definition = {
			"command": 8,
			"name": "FailedNodeRemoveStatus",
			"help": "Failed Node Remove Status",
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
					"name": "nodeID",
					"help": "Node ID",
					"length": 1,
					"valueType": "NODE_NUMBER"
				},
				{
					"type": "integer",
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
		} as CommandDefinition;

		static matches(packet: Packet): boolean {
			return packet.tryAs(NetworkManagementInclusionV1)?.command === this.command;
		}

		constructor(data: Buffer | NetworkManagementInclusionV1FailedNodeRemoveStatusData) {
			super(FailedNodeRemoveStatus, data);
		}
	};

	public static readonly NodeAdd = class NodeAdd extends CommandPacket<NetworkManagementInclusionV1NodeAddData> {
		public static readonly CommandClass = NetworkManagementInclusionV1;
		public static readonly command = 0x01;
		public static readonly definition = {
			"command": 1,
			"name": "NodeAdd",
			"help": "Node Add",
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
						}
					}
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
			return packet.tryAs(NetworkManagementInclusionV1)?.command === this.command;
		}

		constructor(data: Buffer | NetworkManagementInclusionV1NodeAddData) {
			super(NodeAdd, data);
		}
	};

	public static readonly NodeAddStatus = class NodeAddStatus extends CommandPacket<NetworkManagementInclusionV1NodeAddStatusData> {
		public static readonly CommandClass = NetworkManagementInclusionV1;
		public static readonly command = 0x02;
		public static readonly definition = {
			"command": 2,
			"name": "NodeAddStatus",
			"help": "Node Add Status",
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
					"type": "integer",
					"name": "reserved",
					"help": "Reserved",
					"length": 1,
					"reserved": true
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
					"name": "nodeInfoLength",
					"help": "Node Info Length",
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
							"name": "listening",
							"mask": 128,
							"shift": 7
						},
						{
							"type": "integer",
							"name": "zWaveProtocolSpecificPart1",
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
							"name": "opt",
							"mask": 128,
							"shift": 7
						},
						{
							"type": "integer",
							"name": "zWaveProtocolSpecificPart2",
							"mask": 127,
							"shift": 0
						}
					]
				},
				{
					"type": "integer",
					"name": "basicDeviceClass",
					"help": "Basic Device Class",
					"length": 1,
					"valueType": "BAS_DEV_REF"
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
						"name": "Node Info Length"
					},
					"valueType": "CMD_CLASS_REF"
				}
			]
		} as CommandDefinition;

		static matches(packet: Packet): boolean {
			return packet.tryAs(NetworkManagementInclusionV1)?.command === this.command;
		}

		constructor(data: Buffer | NetworkManagementInclusionV1NodeAddStatusData) {
			super(NodeAddStatus, data);
		}
	};

	public static readonly NodeRemove = class NodeRemove extends CommandPacket<NetworkManagementInclusionV1NodeRemoveData> {
		public static readonly CommandClass = NetworkManagementInclusionV1;
		public static readonly command = 0x03;
		public static readonly definition = {
			"command": 3,
			"name": "NodeRemove",
			"help": "Node Remove",
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
		} as CommandDefinition;

		static matches(packet: Packet): boolean {
			return packet.tryAs(NetworkManagementInclusionV1)?.command === this.command;
		}

		constructor(data: Buffer | NetworkManagementInclusionV1NodeRemoveData) {
			super(NodeRemove, data);
		}
	};

	public static readonly NodeRemoveStatus = class NodeRemoveStatus extends CommandPacket<NetworkManagementInclusionV1NodeRemoveStatusData> {
		public static readonly CommandClass = NetworkManagementInclusionV1;
		public static readonly command = 0x04;
		public static readonly definition = {
			"command": 4,
			"name": "NodeRemoveStatus",
			"help": "Node Remove Status",
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
					"type": "integer",
					"name": "nodeID",
					"help": "NodeID",
					"length": 1,
					"valueType": "NODE_NUMBER"
				}
			]
		} as CommandDefinition;

		static matches(packet: Packet): boolean {
			return packet.tryAs(NetworkManagementInclusionV1)?.command === this.command;
		}

		constructor(data: Buffer | NetworkManagementInclusionV1NodeRemoveStatusData) {
			super(NodeRemoveStatus, data);
		}
	};

	public static readonly FailedNodeReplace = class FailedNodeReplace extends CommandPacket<NetworkManagementInclusionV1FailedNodeReplaceData> {
		public static readonly CommandClass = NetworkManagementInclusionV1;
		public static readonly command = 0x09;
		public static readonly definition = {
			"command": 9,
			"name": "FailedNodeReplace",
			"help": "Failed Node Replace",
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
					"name": "nodeID",
					"help": "Node ID",
					"length": 1,
					"valueType": "NODE_NUMBER"
				},
				{
					"type": "integer",
					"name": "txOptions",
					"help": "tx Options",
					"length": 0
				},
				{
					"type": "integer",
					"name": "mode",
					"help": "Mode",
					"length": 1
				}
			]
		} as CommandDefinition;

		static matches(packet: Packet): boolean {
			return packet.tryAs(NetworkManagementInclusionV1)?.command === this.command;
		}

		constructor(data: Buffer | NetworkManagementInclusionV1FailedNodeReplaceData) {
			super(FailedNodeReplace, data);
		}
	};

	public static readonly FailedNodeReplaceStatus = class FailedNodeReplaceStatus extends CommandPacket<NetworkManagementInclusionV1FailedNodeReplaceStatusData> {
		public static readonly CommandClass = NetworkManagementInclusionV1;
		public static readonly command = 0x0a;
		public static readonly definition = {
			"command": 10,
			"name": "FailedNodeReplaceStatus",
			"help": "Failed Node Replace Status",
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
					"type": "integer",
					"name": "nodeID",
					"help": "Node ID",
					"length": 1,
					"valueType": "NODE_NUMBER"
				}
			]
		} as CommandDefinition;

		static matches(packet: Packet): boolean {
			return packet.tryAs(NetworkManagementInclusionV1)?.command === this.command;
		}

		constructor(data: Buffer | NetworkManagementInclusionV1FailedNodeReplaceStatusData) {
			super(FailedNodeReplaceStatus, data);
		}
	};

	public static readonly NodeNeighborUpdateRequest = class NodeNeighborUpdateRequest extends CommandPacket<NetworkManagementInclusionV1NodeNeighborUpdateRequestData> {
		public static readonly CommandClass = NetworkManagementInclusionV1;
		public static readonly command = 0x0b;
		public static readonly definition = {
			"command": 11,
			"name": "NodeNeighborUpdateRequest",
			"help": "Node Neighbor Update Request",
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
					"name": "nodeID",
					"help": "Node ID",
					"length": 1,
					"valueType": "NODE_NUMBER"
				}
			]
		} as CommandDefinition;

		static matches(packet: Packet): boolean {
			return packet.tryAs(NetworkManagementInclusionV1)?.command === this.command;
		}

		constructor(data: Buffer | NetworkManagementInclusionV1NodeNeighborUpdateRequestData) {
			super(NodeNeighborUpdateRequest, data);
		}
	};

	public static readonly NodeNeighborUpdateStatus = class NodeNeighborUpdateStatus extends CommandPacket<NetworkManagementInclusionV1NodeNeighborUpdateStatusData> {
		public static readonly CommandClass = NetworkManagementInclusionV1;
		public static readonly command = 0x0c;
		public static readonly definition = {
			"command": 12,
			"name": "NodeNeighborUpdateStatus",
			"help": "Node Neighbor Update Status",
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
		} as CommandDefinition;

		static matches(packet: Packet): boolean {
			return packet.tryAs(NetworkManagementInclusionV1)?.command === this.command;
		}

		constructor(data: Buffer | NetworkManagementInclusionV1NodeNeighborUpdateStatusData) {
			super(NodeNeighborUpdateStatus, data);
		}
	};

	public static readonly ReturnRouteAssign = class ReturnRouteAssign extends CommandPacket<NetworkManagementInclusionV1ReturnRouteAssignData> {
		public static readonly CommandClass = NetworkManagementInclusionV1;
		public static readonly command = 0x0d;
		public static readonly definition = {
			"command": 13,
			"name": "ReturnRouteAssign",
			"help": "Return Route Assign",
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
					"name": "sourceNodeID",
					"help": "Source Node ID",
					"length": 1,
					"valueType": "NODE_NUMBER"
				},
				{
					"type": "integer",
					"name": "destinationNodeID",
					"help": "Destination Node ID",
					"length": 1,
					"valueType": "NODE_NUMBER"
				}
			]
		} as CommandDefinition;

		static matches(packet: Packet): boolean {
			return packet.tryAs(NetworkManagementInclusionV1)?.command === this.command;
		}

		constructor(data: Buffer | NetworkManagementInclusionV1ReturnRouteAssignData) {
			super(ReturnRouteAssign, data);
		}
	};

	public static readonly ReturnRouteAssignComplete = class ReturnRouteAssignComplete extends CommandPacket<NetworkManagementInclusionV1ReturnRouteAssignCompleteData> {
		public static readonly CommandClass = NetworkManagementInclusionV1;
		public static readonly command = 0x0e;
		public static readonly definition = {
			"command": 14,
			"name": "ReturnRouteAssignComplete",
			"help": "Return Route Assign Complete",
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
		} as CommandDefinition;

		static matches(packet: Packet): boolean {
			return packet.tryAs(NetworkManagementInclusionV1)?.command === this.command;
		}

		constructor(data: Buffer | NetworkManagementInclusionV1ReturnRouteAssignCompleteData) {
			super(ReturnRouteAssignComplete, data);
		}
	};

	public static readonly ReturnRouteDelete = class ReturnRouteDelete extends CommandPacket<NetworkManagementInclusionV1ReturnRouteDeleteData> {
		public static readonly CommandClass = NetworkManagementInclusionV1;
		public static readonly command = 0x0f;
		public static readonly definition = {
			"command": 15,
			"name": "ReturnRouteDelete",
			"help": "Return Route Delete",
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
					"name": "nodeID",
					"help": "Node ID",
					"length": 1,
					"valueType": "NODE_NUMBER"
				}
			]
		} as CommandDefinition;

		static matches(packet: Packet): boolean {
			return packet.tryAs(NetworkManagementInclusionV1)?.command === this.command;
		}

		constructor(data: Buffer | NetworkManagementInclusionV1ReturnRouteDeleteData) {
			super(ReturnRouteDelete, data);
		}
	};

	public static readonly ReturnRouteDeleteComplete = class ReturnRouteDeleteComplete extends CommandPacket<NetworkManagementInclusionV1ReturnRouteDeleteCompleteData> {
		public static readonly CommandClass = NetworkManagementInclusionV1;
		public static readonly command = 0x10;
		public static readonly definition = {
			"command": 16,
			"name": "ReturnRouteDeleteComplete",
			"help": "Return Route Delete Complete",
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
		} as CommandDefinition;

		static matches(packet: Packet): boolean {
			return packet.tryAs(NetworkManagementInclusionV1)?.command === this.command;
		}

		constructor(data: Buffer | NetworkManagementInclusionV1ReturnRouteDeleteCompleteData) {
			super(ReturnRouteDeleteComplete, data);
		}
	};
}

export namespace NetworkManagementInclusionV1 {
	export type FailedNodeRemove = InstanceType<typeof NetworkManagementInclusionV1.FailedNodeRemove>;
	export type FailedNodeRemoveStatus = InstanceType<typeof NetworkManagementInclusionV1.FailedNodeRemoveStatus>;
	export type NodeAdd = InstanceType<typeof NetworkManagementInclusionV1.NodeAdd>;
	export type NodeAddStatus = InstanceType<typeof NetworkManagementInclusionV1.NodeAddStatus>;
	export type NodeRemove = InstanceType<typeof NetworkManagementInclusionV1.NodeRemove>;
	export type NodeRemoveStatus = InstanceType<typeof NetworkManagementInclusionV1.NodeRemoveStatus>;
	export type FailedNodeReplace = InstanceType<typeof NetworkManagementInclusionV1.FailedNodeReplace>;
	export type FailedNodeReplaceStatus = InstanceType<typeof NetworkManagementInclusionV1.FailedNodeReplaceStatus>;
	export type NodeNeighborUpdateRequest = InstanceType<typeof NetworkManagementInclusionV1.NodeNeighborUpdateRequest>;
	export type NodeNeighborUpdateStatus = InstanceType<typeof NetworkManagementInclusionV1.NodeNeighborUpdateStatus>;
	export type ReturnRouteAssign = InstanceType<typeof NetworkManagementInclusionV1.ReturnRouteAssign>;
	export type ReturnRouteAssignComplete = InstanceType<typeof NetworkManagementInclusionV1.ReturnRouteAssignComplete>;
	export type ReturnRouteDelete = InstanceType<typeof NetworkManagementInclusionV1.ReturnRouteDelete>;
	export type ReturnRouteDeleteComplete = InstanceType<typeof NetworkManagementInclusionV1.ReturnRouteDeleteComplete>;
}
