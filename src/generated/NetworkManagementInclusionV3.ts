/**
 * Command Class Network Management Inclusion, version 3.
 *
 * Auto-generated, do not edit.
 */

import { CommandClassPacket, CommandPacket } from "../commands/command";
import { Packet } from "../commands/packet";
import { CommandDefinition } from "../commands/types";
import CommandClasses from "../generated/CommandClasses";

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
	nodeID: number; // 1 byte unsigned integer
}

export interface NetworkManagementInclusionV3FailedNodeRemoveStatusData {
	seqNo: number; // 1 byte unsigned integer
	nodeID: number; // 1 byte unsigned integer
	status: number; // 1 byte unsigned integer
}

export interface NetworkManagementInclusionV3NodeAddData {
	seqNo: number; // 1 byte unsigned integer
	reserved: number; // 1 byte unsigned integer
	mode: number; // 1 byte unsigned integer
	txOptions: number; // 0 byte unsigned integer
}

export interface NetworkManagementInclusionV3NodeAddStatusData {
	seqNo: number; // 1 byte unsigned integer
	status: number; // 1 byte unsigned integer
	reserved1: number; // 1 byte unsigned integer
	newNodeID: number; // 1 byte unsigned integer
	nodeInfoLength: number; // 1 byte unsigned integer
	// TODO param properties1 type bitfield
	// TODO param properties2 type bitfield
	basicDeviceClass: number; // 1 byte unsigned integer
	genericDeviceClass: number; // 1 byte unsigned integer
	specificDeviceClass: number; // 1 byte unsigned integer
	// TODO param commandClass type enumarray
	grantedKeys: number; // 1 byte unsigned integer
	kEXFailType: number; // 1 byte unsigned integer
	// TODO param properties3 type bitfield
	// TODO param dsk type blob
}

export interface NetworkManagementInclusionV3NodeRemoveData {
	seqNo: number; // 1 byte unsigned integer
	reserved: number; // 1 byte unsigned integer
	mode: number; // 1 byte unsigned integer
}

export interface NetworkManagementInclusionV3NodeRemoveStatusData {
	seqNo: number; // 1 byte unsigned integer
	status: number; // 1 byte unsigned integer
	nodeID: number; // 1 byte unsigned integer
}

export interface NetworkManagementInclusionV3FailedNodeReplaceData {
	seqNo: number; // 1 byte unsigned integer
	nodeID: number; // 1 byte unsigned integer
	txOptions: number; // 0 byte unsigned integer
	mode: number; // 1 byte unsigned integer
}

export interface NetworkManagementInclusionV3FailedNodeReplaceStatusData {
	seqNo: number; // 1 byte unsigned integer
	status: number; // 1 byte unsigned integer
	nodeID: number; // 1 byte unsigned integer
	grantedKeys: number; // 1 byte unsigned integer
	kEXFailType: number; // 1 byte unsigned integer
}

export interface NetworkManagementInclusionV3NodeNeighborUpdateRequestData {
	seqNo: number; // 1 byte unsigned integer
	nodeID: number; // 1 byte unsigned integer
}

export interface NetworkManagementInclusionV3NodeNeighborUpdateStatusData {
	seqNo: number; // 1 byte unsigned integer
	status: number; // 1 byte unsigned integer
}

export interface NetworkManagementInclusionV3ReturnRouteAssignData {
	seqNo: number; // 1 byte unsigned integer
	sourceNodeID: number; // 1 byte unsigned integer
	destinationNodeID: number; // 1 byte unsigned integer
}

export interface NetworkManagementInclusionV3ReturnRouteAssignCompleteData {
	seqNo: number; // 1 byte unsigned integer
	status: number; // 1 byte unsigned integer
}

export interface NetworkManagementInclusionV3ReturnRouteDeleteData {
	seqNo: number; // 1 byte unsigned integer
	nodeID: number; // 1 byte unsigned integer
}

export interface NetworkManagementInclusionV3ReturnRouteDeleteCompleteData {
	seqNo: number; // 1 byte unsigned integer
	status: number; // 1 byte unsigned integer
}

export interface NetworkManagementInclusionV3NodeAddKeysReportData {
	seqNo: number; // 1 byte unsigned integer
	// TODO param properties1 type bitfield
	requestedKeys: number; // 1 byte unsigned integer
}

export interface NetworkManagementInclusionV3NodeAddKeysSetData {
	seqNo: number; // 1 byte unsigned integer
	// TODO param properties1 type bitfield
	grantedKeys: number; // 1 byte unsigned integer
}

export interface NetworkManagementInclusionV3NodeAddDskReportData {
	seqNo: number; // 1 byte unsigned integer
	// TODO param properties1 type bitfield
	// TODO param dsk type blob
}

export interface NetworkManagementInclusionV3NodeAddDskSetData {
	seqNo: number; // 1 byte unsigned integer
	// TODO param properties1 type bitfield
	// TODO param inputDSK type blob
}

export interface NetworkManagementInclusionV3S2AdvancedJoinModeGetData {
	seqNo: number; // 1 byte unsigned integer
}

export interface NetworkManagementInclusionV3SmartStartJoinStartedReportData {
	seqNo: number; // 1 byte unsigned integer
	// TODO param properties1 type bitfield
	// TODO param dsk type blob
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
	// TODO param properties1 type bitfield
	// TODO param dsk type blob
}

export class NetworkManagementInclusionV3 extends CommandClassPacket<NetworkManagementInclusionV3Commands> {
	public static readonly commandClass = CommandClasses.NetworkManagementInclusion; // 0x34 (52)

	public static matches(packet: Packet): boolean {
		return packet.commandClass === this.commandClass;
	}

	constructor(commandAndPayload: Buffer) {
		super(NetworkManagementInclusionV3, commandAndPayload);
	}

	public static readonly FailedNodeRemove = class FailedNodeRemove extends CommandPacket<NetworkManagementInclusionV3FailedNodeRemoveData> {
		public static readonly CommandClass = NetworkManagementInclusionV3;
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
			return packet.tryAs(NetworkManagementInclusionV3)?.command === this.command;
		}

		constructor(data: Buffer | NetworkManagementInclusionV3FailedNodeRemoveData) {
			super(FailedNodeRemove, data);
		}
	};

	public static readonly FailedNodeRemoveStatus = class FailedNodeRemoveStatus extends CommandPacket<NetworkManagementInclusionV3FailedNodeRemoveStatusData> {
		public static readonly CommandClass = NetworkManagementInclusionV3;
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
						"0": "FAILED_NODE_NOT_FOUND",
						"1": "DONE",
						"2": "FAILED_NODE_REMOVE_FAIL"
					}
				}
			]
		} as CommandDefinition;

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
					"length": 1
				},
				{
					"type": "integer",
					"name": "mode",
					"help": "Mode",
					"length": 1,
					"values": {
						"1": "NODE_ADD_ANY",
						"2": "NODE_ADD_CONTROLLER",
						"3": "NODE_ADD_SLAVE",
						"4": "NODE_ADD_EXISTING",
						"5": "NODE_ADD_STOP",
						"6": "NODE_ADD_STOP_FAILED",
						"7": "NODE_ADD_ANY_S2"
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
			return packet.tryAs(NetworkManagementInclusionV3)?.command === this.command;
		}

		constructor(data: Buffer | NetworkManagementInclusionV3NodeAddData) {
			super(NodeAdd, data);
		}
	};

	public static readonly NodeAddStatus = class NodeAddStatus extends CommandPacket<NetworkManagementInclusionV3NodeAddStatusData> {
		public static readonly CommandClass = NetworkManagementInclusionV3;
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
						"6": "NODE_ADD_STATUS_DONE",
						"7": "NODE_ADD_STATUS_FAILED",
						"9": "NODE_ADD_STATUS_SECURITY_FAILED"
					}
				},
				{
					"type": "integer",
					"name": "reserved1",
					"help": "Reserved1",
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
							"type": "integer",
							"name": "Z-Wave Protocol Specific Part 1",
							"mask": 127,
							"shift": 0
						},
						{
							"type": "boolean",
							"name": "Listening",
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
							"name": "Z-Wave Protocol Specific Part 2",
							"mask": 127,
							"shift": 0
						},
						{
							"type": "boolean",
							"name": "Opt",
							"mask": 128,
							"shift": 7
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
						"name": "Node Info Length",
						"mask": 255,
						"shift": 0
					},
					"valueType": "CMD_CLASS_REF"
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
					"type": "bitfield",
					"name": "properties3",
					"help": "Properties3",
					"length": 1,
					"fields": [
						{
							"type": "integer",
							"name": "DSK Length",
							"mask": 31,
							"shift": 0
						},
						{
							"type": "integer",
							"name": "Reserved2",
							"mask": 224,
							"shift": 5
						}
					]
				},
				{
					"type": "blob",
					"name": "dsk",
					"help": "DSK",
					"length": {
						"name": "Properties3",
						"mask": 31,
						"shift": 0
					}
				}
			]
		} as CommandDefinition;

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
					"length": 1
				},
				{
					"type": "integer",
					"name": "mode",
					"help": "Mode",
					"length": 1,
					"values": {
						"1": "NODE_REMOVE_ANY",
						"2": "NODE_REMOVE_CONTROLLER",
						"3": "NODE_REMOVE_SLAVE",
						"5": "NODE_REMOVE_STOP"
					}
				}
			]
		} as CommandDefinition;

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
						"6": "NODE_REMOVE_STATUS_DONE",
						"7": "NODE_REMOVE_STATUS_FAILED"
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
			return packet.tryAs(NetworkManagementInclusionV3)?.command === this.command;
		}

		constructor(data: Buffer | NetworkManagementInclusionV3NodeRemoveStatusData) {
			super(NodeRemoveStatus, data);
		}
	};

	public static readonly FailedNodeReplace = class FailedNodeReplace extends CommandPacket<NetworkManagementInclusionV3FailedNodeReplaceData> {
		public static readonly CommandClass = NetworkManagementInclusionV3;
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
			return packet.tryAs(NetworkManagementInclusionV3)?.command === this.command;
		}

		constructor(data: Buffer | NetworkManagementInclusionV3FailedNodeReplaceData) {
			super(FailedNodeReplace, data);
		}
	};

	public static readonly FailedNodeReplaceStatus = class FailedNodeReplaceStatus extends CommandPacket<NetworkManagementInclusionV3FailedNodeReplaceStatusData> {
		public static readonly CommandClass = NetworkManagementInclusionV3;
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
						"4": "DONE",
						"5": "FAILED_NODE_REPLACE_FAIL",
						"9": "FAILED_NODE_REPLACE_SECURITY_FAILED"
					}
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
					"name": "grantedKeys",
					"help": "Granted Keys",
					"length": 1
				},
				{
					"type": "integer",
					"name": "kEXFailType",
					"help": "KEX Fail Type",
					"length": 1
				}
			]
		} as CommandDefinition;

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
			return packet.tryAs(NetworkManagementInclusionV3)?.command === this.command;
		}

		constructor(data: Buffer | NetworkManagementInclusionV3NodeNeighborUpdateRequestData) {
			super(NodeNeighborUpdateRequest, data);
		}
	};

	public static readonly NodeNeighborUpdateStatus = class NodeNeighborUpdateStatus extends CommandPacket<NetworkManagementInclusionV3NodeNeighborUpdateStatusData> {
		public static readonly CommandClass = NetworkManagementInclusionV3;
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
						"34": "NEIGHBOR_UPDATE_STATUS_DONE",
						"35": "NEIGHBOR_UPDATE_STATUS_FAIL"
					}
				}
			]
		} as CommandDefinition;

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
			return packet.tryAs(NetworkManagementInclusionV3)?.command === this.command;
		}

		constructor(data: Buffer | NetworkManagementInclusionV3ReturnRouteAssignData) {
			super(ReturnRouteAssign, data);
		}
	};

	public static readonly ReturnRouteAssignComplete = class ReturnRouteAssignComplete extends CommandPacket<NetworkManagementInclusionV3ReturnRouteAssignCompleteData> {
		public static readonly CommandClass = NetworkManagementInclusionV3;
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
						"0": "TRANSMIT_COMPLETE_OK",
						"1": "TRANSMIT_COMPLETE_NO_ACK",
						"2": "TRANSMIT_COMPLETE_FAIL"
					}
				}
			]
		} as CommandDefinition;

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
			return packet.tryAs(NetworkManagementInclusionV3)?.command === this.command;
		}

		constructor(data: Buffer | NetworkManagementInclusionV3ReturnRouteDeleteData) {
			super(ReturnRouteDelete, data);
		}
	};

	public static readonly ReturnRouteDeleteComplete = class ReturnRouteDeleteComplete extends CommandPacket<NetworkManagementInclusionV3ReturnRouteDeleteCompleteData> {
		public static readonly CommandClass = NetworkManagementInclusionV3;
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
						"0": "TRANSMIT_COMPLETE_OK",
						"1": "TRANSMIT_COMPLETE_NO_ACK",
						"2": "TRANSMIT_COMPLETE_FAIL"
					}
				}
			]
		} as CommandDefinition;

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
		public static readonly definition = {
			"command": 17,
			"name": "NodeAddKeysReport",
			"help": "Node Add Keys Report",
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
							"name": "Request CSA",
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
					"name": "requestedKeys",
					"help": "Requested Keys",
					"length": 1
				}
			]
		} as CommandDefinition;

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
		public static readonly definition = {
			"command": 18,
			"name": "NodeAddKeysSet",
			"help": "Node Add Keys Set",
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
							"name": "Accept",
							"mask": 1,
							"shift": 0
						},
						{
							"type": "boolean",
							"name": "Grant CSA",
							"mask": 2,
							"shift": 1
						},
						{
							"type": "integer",
							"name": "Reserved",
							"mask": 252,
							"shift": 2
						}
					]
				},
				{
					"type": "integer",
					"name": "grantedKeys",
					"help": "Granted Keys",
					"length": 1
				}
			]
		} as CommandDefinition;

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
		public static readonly definition = {
			"command": 19,
			"name": "NodeAddDskReport",
			"help": "Node Add DSK Report",
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
							"type": "integer",
							"name": "Input DSK Length",
							"mask": 15,
							"shift": 0
						},
						{
							"type": "integer",
							"name": "Reserved",
							"mask": 240,
							"shift": 4
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
			return packet.tryAs(NetworkManagementInclusionV3)?.command === this.command;
		}

		constructor(data: Buffer | NetworkManagementInclusionV3NodeAddDskReportData) {
			super(NodeAddDskReport, data);
		}
	};

	public static readonly NodeAddDskSet = class NodeAddDskSet extends CommandPacket<NetworkManagementInclusionV3NodeAddDskSetData> {
		public static readonly CommandClass = NetworkManagementInclusionV3;
		public static readonly command = 0x14;
		public static readonly definition = {
			"command": 20,
			"name": "NodeAddDskSet",
			"help": "Node Add DSK Set",
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
							"type": "integer",
							"name": "Input DSK Length",
							"mask": 15,
							"shift": 0
						},
						{
							"type": "integer",
							"name": "Reserved",
							"mask": 112,
							"shift": 4
						},
						{
							"type": "boolean",
							"name": "Accept",
							"mask": 128,
							"shift": 7
						}
					]
				},
				{
					"type": "blob",
					"name": "inputDSK",
					"help": "Input DSK",
					"length": {
						"name": "Properties1",
						"mask": 15,
						"shift": 0
					}
				}
			]
		} as CommandDefinition;

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
		public static readonly definition = {
			"command": 23,
			"name": "S2AdvancedJoinModeGet",
			"help": "S2 Advanced Join Mode Get",
			"status": "active",
			"params": [
				{
					"type": "integer",
					"name": "seqNo",
					"help": "Seq No",
					"length": 1
				}
			]
		} as CommandDefinition;

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
		public static readonly definition = {
			"command": 21,
			"name": "SmartStartJoinStartedReport",
			"help": "Smart Start Join Started",
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
							"type": "integer",
							"name": "DSK Length",
							"mask": 31,
							"shift": 0
						},
						{
							"type": "integer",
							"name": "Reserved1",
							"mask": 224,
							"shift": 5
						}
					]
				},
				{
					"type": "blob",
					"name": "dsk",
					"help": "DSK",
					"length": {
						"name": "Properties1",
						"mask": 31,
						"shift": 0
					}
				}
			]
		} as CommandDefinition;

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
		public static readonly definition = {
			"command": 22,
			"name": "S2AdvancedJoinModeSet",
			"help": "S2 Advanced Join Mode Set",
			"status": "active",
			"params": [
				{
					"type": "integer",
					"name": "seqNo",
					"help": "Seq No",
					"length": 1
				},
				{
					"type": "integer",
					"name": "s2AdvancedJoinMode",
					"help": "S2 Advanced Join Mode",
					"length": 1
				}
			]
		} as CommandDefinition;

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
		public static readonly definition = {
			"command": 24,
			"name": "S2AdvancedJoinModeReport",
			"help": "S2 Advanced Join Mode Report",
			"status": "active",
			"params": [
				{
					"type": "integer",
					"name": "seqNo",
					"help": "Seq No",
					"length": 1
				},
				{
					"type": "integer",
					"name": "s2AdvancedJoinMode",
					"help": "S2 Advanced Join Mode",
					"length": 1
				}
			]
		} as CommandDefinition;

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
		public static readonly definition = {
			"command": 25,
			"name": "IncludedNifReport",
			"help": "Included Node Information Frame Report",
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
							"type": "integer",
							"name": "DSK Length",
							"mask": 31,
							"shift": 0
						},
						{
							"type": "integer",
							"name": "Reserved1",
							"mask": 224,
							"shift": 5
						}
					]
				},
				{
					"type": "blob",
					"name": "dsk",
					"help": "DSK",
					"length": {
						"name": "Properties1",
						"mask": 31,
						"shift": 0
					}
				}
			]
		} as CommandDefinition;

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
