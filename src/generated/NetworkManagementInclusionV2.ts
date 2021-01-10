/**
 * Command Class Network Management Inclusion, version 2.
 *
 * Auto-generated, do not edit.
 */

import { CommandClassPacket, CommandPacket } from "../commands/command";
import * as jsonSpec from "../commands/jsonSpec";
import { Packet } from "../commands/packet";
import { convertFromJsonCommand } from "../commands/specHelpers";
import CommandClasses from "../generated/CommandClasses";

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
	// TODO param txOptions type bitmask or marker
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
	// TODO param commandClass type enumarray
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
	// TODO param txOptions type bitmask or marker
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

export class NetworkManagementInclusionV2 extends CommandClassPacket<NetworkManagementInclusionV2Commands> {
	public static readonly commandClass = CommandClasses.NetworkManagementInclusion; // 0x34 (52)

	public static matches(packet: Packet): boolean {
		return packet.commandClass === this.commandClass;
	}

	constructor(commandAndPayload: Buffer) {
		super(NetworkManagementInclusionV2, commandAndPayload);
	}

	public static readonly FailedNodeRemove = class FailedNodeRemove extends CommandPacket<NetworkManagementInclusionV2FailedNodeRemoveData> {
		public static readonly CommandClass = NetworkManagementInclusionV2;
		public static readonly command = 0x07;
		public static readonly definition = convertFromJsonCommand({
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
					"name": "nodeId",
					"help": "Node ID",
					"length": 1,
					"valueType": "NODE_NUMBER"
				}
			]
		} as jsonSpec.CommandDefinition);

		static matches(packet: Packet): boolean {
			return packet.tryAs(NetworkManagementInclusionV2)?.command === this.command;
		}

		constructor(data: Buffer | NetworkManagementInclusionV2FailedNodeRemoveData) {
			super(FailedNodeRemove, data);
		}
	};

	public static readonly FailedNodeRemoveStatus = class FailedNodeRemoveStatus extends CommandPacket<NetworkManagementInclusionV2FailedNodeRemoveStatusData> {
		public static readonly CommandClass = NetworkManagementInclusionV2;
		public static readonly command = 0x08;
		public static readonly definition = convertFromJsonCommand({
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
					"name": "nodeId",
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
		} as jsonSpec.CommandDefinition);

		static matches(packet: Packet): boolean {
			return packet.tryAs(NetworkManagementInclusionV2)?.command === this.command;
		}

		constructor(data: Buffer | NetworkManagementInclusionV2FailedNodeRemoveStatusData) {
			super(FailedNodeRemoveStatus, data);
		}
	};

	// TODO This command is not yet fully supported by the decoder/encoder
	public static readonly NodeAdd = class NodeAdd extends CommandPacket<NetworkManagementInclusionV2NodeAddData> {
		public static readonly CommandClass = NetworkManagementInclusionV2;
		public static readonly command = 0x01;
		public static readonly definition = convertFromJsonCommand({
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
						},
						"7": {
							"name": "NodeAddAnyS2",
							"help": "NODE_ADD_ANY_S2"
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
		} as jsonSpec.CommandDefinition);

		static matches(packet: Packet): boolean {
			return packet.tryAs(NetworkManagementInclusionV2)?.command === this.command;
		}

		constructor(data: Buffer | NetworkManagementInclusionV2NodeAddData) {
			super(NodeAdd, data);
		}
	};

	// TODO This command is not yet fully supported by the decoder/encoder
	public static readonly NodeAddStatus = class NodeAddStatus extends CommandPacket<NetworkManagementInclusionV2NodeAddStatusData> {
		public static readonly CommandClass = NetworkManagementInclusionV2;
		public static readonly command = 0x02;
		public static readonly definition = convertFromJsonCommand({
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
					"name": "newNodeId",
					"help": "New Node ID",
					"length": 1,
					"valueType": "NODE_NUMBER"
				},
				{
					"type": "integer",
					"name": "nodeInfoLength",
					"help": "Node Info Length",
					"length": 1,
					"lengthOf": {
						"refs": [
							"commandClass"
						]
					},
					"isAutogenerated": true
				},
				{
					"type": "bitfield",
					"name": "properties1",
					"help": "Properties1",
					"length": 1,
					"fields": [
						{
							"fieldType": "boolean",
							"name": "listening",
							"mask": 128,
							"shift": 7
						},
						{
							"fieldType": "integer",
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
							"fieldType": "boolean",
							"name": "opt",
							"mask": 128,
							"shift": 7
						},
						{
							"fieldType": "integer",
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
						"lengthType": "ref",
						"from": {
							"ref": "nodeInfoLength"
						},
						"offset": 6
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
					"name": "kexFailType",
					"help": "KEX Fail Type",
					"length": 1
				}
			]
		} as jsonSpec.CommandDefinition);

		static matches(packet: Packet): boolean {
			return packet.tryAs(NetworkManagementInclusionV2)?.command === this.command;
		}

		constructor(data: Buffer | NetworkManagementInclusionV2NodeAddStatusData) {
			super(NodeAddStatus, data);
		}
	};

	public static readonly NodeRemove = class NodeRemove extends CommandPacket<NetworkManagementInclusionV2NodeRemoveData> {
		public static readonly CommandClass = NetworkManagementInclusionV2;
		public static readonly command = 0x03;
		public static readonly definition = convertFromJsonCommand({
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
		} as jsonSpec.CommandDefinition);

		static matches(packet: Packet): boolean {
			return packet.tryAs(NetworkManagementInclusionV2)?.command === this.command;
		}

		constructor(data: Buffer | NetworkManagementInclusionV2NodeRemoveData) {
			super(NodeRemove, data);
		}
	};

	public static readonly NodeRemoveStatus = class NodeRemoveStatus extends CommandPacket<NetworkManagementInclusionV2NodeRemoveStatusData> {
		public static readonly CommandClass = NetworkManagementInclusionV2;
		public static readonly command = 0x04;
		public static readonly definition = convertFromJsonCommand({
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
					"name": "nodeId",
					"help": "NodeID",
					"length": 1,
					"valueType": "NODE_NUMBER"
				}
			]
		} as jsonSpec.CommandDefinition);

		static matches(packet: Packet): boolean {
			return packet.tryAs(NetworkManagementInclusionV2)?.command === this.command;
		}

		constructor(data: Buffer | NetworkManagementInclusionV2NodeRemoveStatusData) {
			super(NodeRemoveStatus, data);
		}
	};

	// TODO This command is not yet fully supported by the decoder/encoder
	public static readonly FailedNodeReplace = class FailedNodeReplace extends CommandPacket<NetworkManagementInclusionV2FailedNodeReplaceData> {
		public static readonly CommandClass = NetworkManagementInclusionV2;
		public static readonly command = 0x09;
		public static readonly definition = convertFromJsonCommand({
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
					"name": "nodeId",
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
		} as jsonSpec.CommandDefinition);

		static matches(packet: Packet): boolean {
			return packet.tryAs(NetworkManagementInclusionV2)?.command === this.command;
		}

		constructor(data: Buffer | NetworkManagementInclusionV2FailedNodeReplaceData) {
			super(FailedNodeReplace, data);
		}
	};

	public static readonly FailedNodeReplaceStatus = class FailedNodeReplaceStatus extends CommandPacket<NetworkManagementInclusionV2FailedNodeReplaceStatusData> {
		public static readonly CommandClass = NetworkManagementInclusionV2;
		public static readonly command = 0x0a;
		public static readonly definition = convertFromJsonCommand({
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
					"name": "nodeId",
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
					"name": "kexFailType",
					"help": "KEX Fail Type",
					"length": 1
				}
			]
		} as jsonSpec.CommandDefinition);

		static matches(packet: Packet): boolean {
			return packet.tryAs(NetworkManagementInclusionV2)?.command === this.command;
		}

		constructor(data: Buffer | NetworkManagementInclusionV2FailedNodeReplaceStatusData) {
			super(FailedNodeReplaceStatus, data);
		}
	};

	public static readonly NodeNeighborUpdateRequest = class NodeNeighborUpdateRequest extends CommandPacket<NetworkManagementInclusionV2NodeNeighborUpdateRequestData> {
		public static readonly CommandClass = NetworkManagementInclusionV2;
		public static readonly command = 0x0b;
		public static readonly definition = convertFromJsonCommand({
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
					"name": "nodeId",
					"help": "Node ID",
					"length": 1,
					"valueType": "NODE_NUMBER"
				}
			]
		} as jsonSpec.CommandDefinition);

		static matches(packet: Packet): boolean {
			return packet.tryAs(NetworkManagementInclusionV2)?.command === this.command;
		}

		constructor(data: Buffer | NetworkManagementInclusionV2NodeNeighborUpdateRequestData) {
			super(NodeNeighborUpdateRequest, data);
		}
	};

	public static readonly NodeNeighborUpdateStatus = class NodeNeighborUpdateStatus extends CommandPacket<NetworkManagementInclusionV2NodeNeighborUpdateStatusData> {
		public static readonly CommandClass = NetworkManagementInclusionV2;
		public static readonly command = 0x0c;
		public static readonly definition = convertFromJsonCommand({
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
		} as jsonSpec.CommandDefinition);

		static matches(packet: Packet): boolean {
			return packet.tryAs(NetworkManagementInclusionV2)?.command === this.command;
		}

		constructor(data: Buffer | NetworkManagementInclusionV2NodeNeighborUpdateStatusData) {
			super(NodeNeighborUpdateStatus, data);
		}
	};

	public static readonly ReturnRouteAssign = class ReturnRouteAssign extends CommandPacket<NetworkManagementInclusionV2ReturnRouteAssignData> {
		public static readonly CommandClass = NetworkManagementInclusionV2;
		public static readonly command = 0x0d;
		public static readonly definition = convertFromJsonCommand({
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
					"name": "sourceNodeId",
					"help": "Source Node ID",
					"length": 1,
					"valueType": "NODE_NUMBER"
				},
				{
					"type": "integer",
					"name": "destinationNodeId",
					"help": "Destination Node ID",
					"length": 1,
					"valueType": "NODE_NUMBER"
				}
			]
		} as jsonSpec.CommandDefinition);

		static matches(packet: Packet): boolean {
			return packet.tryAs(NetworkManagementInclusionV2)?.command === this.command;
		}

		constructor(data: Buffer | NetworkManagementInclusionV2ReturnRouteAssignData) {
			super(ReturnRouteAssign, data);
		}
	};

	public static readonly ReturnRouteAssignComplete = class ReturnRouteAssignComplete extends CommandPacket<NetworkManagementInclusionV2ReturnRouteAssignCompleteData> {
		public static readonly CommandClass = NetworkManagementInclusionV2;
		public static readonly command = 0x0e;
		public static readonly definition = convertFromJsonCommand({
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
		} as jsonSpec.CommandDefinition);

		static matches(packet: Packet): boolean {
			return packet.tryAs(NetworkManagementInclusionV2)?.command === this.command;
		}

		constructor(data: Buffer | NetworkManagementInclusionV2ReturnRouteAssignCompleteData) {
			super(ReturnRouteAssignComplete, data);
		}
	};

	public static readonly ReturnRouteDelete = class ReturnRouteDelete extends CommandPacket<NetworkManagementInclusionV2ReturnRouteDeleteData> {
		public static readonly CommandClass = NetworkManagementInclusionV2;
		public static readonly command = 0x0f;
		public static readonly definition = convertFromJsonCommand({
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
					"name": "nodeId",
					"help": "Node ID",
					"length": 1,
					"valueType": "NODE_NUMBER"
				}
			]
		} as jsonSpec.CommandDefinition);

		static matches(packet: Packet): boolean {
			return packet.tryAs(NetworkManagementInclusionV2)?.command === this.command;
		}

		constructor(data: Buffer | NetworkManagementInclusionV2ReturnRouteDeleteData) {
			super(ReturnRouteDelete, data);
		}
	};

	public static readonly ReturnRouteDeleteComplete = class ReturnRouteDeleteComplete extends CommandPacket<NetworkManagementInclusionV2ReturnRouteDeleteCompleteData> {
		public static readonly CommandClass = NetworkManagementInclusionV2;
		public static readonly command = 0x10;
		public static readonly definition = convertFromJsonCommand({
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
		} as jsonSpec.CommandDefinition);

		static matches(packet: Packet): boolean {
			return packet.tryAs(NetworkManagementInclusionV2)?.command === this.command;
		}

		constructor(data: Buffer | NetworkManagementInclusionV2ReturnRouteDeleteCompleteData) {
			super(ReturnRouteDeleteComplete, data);
		}
	};

	public static readonly NodeAddKeysReport = class NodeAddKeysReport extends CommandPacket<NetworkManagementInclusionV2NodeAddKeysReportData> {
		public static readonly CommandClass = NetworkManagementInclusionV2;
		public static readonly command = 0x11;
		public static readonly definition = convertFromJsonCommand({
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
							"fieldType": "integer",
							"name": "reserved",
							"mask": 254,
							"shift": 1,
							"reserved": true
						},
						{
							"fieldType": "boolean",
							"name": "requestCsa",
							"mask": 1,
							"shift": 0
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
		} as jsonSpec.CommandDefinition);

		static matches(packet: Packet): boolean {
			return packet.tryAs(NetworkManagementInclusionV2)?.command === this.command;
		}

		constructor(data: Buffer | NetworkManagementInclusionV2NodeAddKeysReportData) {
			super(NodeAddKeysReport, data);
		}
	};

	public static readonly NodeAddKeysSet = class NodeAddKeysSet extends CommandPacket<NetworkManagementInclusionV2NodeAddKeysSetData> {
		public static readonly CommandClass = NetworkManagementInclusionV2;
		public static readonly command = 0x12;
		public static readonly definition = convertFromJsonCommand({
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
							"fieldType": "integer",
							"name": "reserved",
							"mask": 252,
							"shift": 2,
							"reserved": true
						},
						{
							"fieldType": "boolean",
							"name": "grantCsa",
							"mask": 2,
							"shift": 1
						},
						{
							"fieldType": "boolean",
							"name": "accept",
							"mask": 1,
							"shift": 0
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
		} as jsonSpec.CommandDefinition);

		static matches(packet: Packet): boolean {
			return packet.tryAs(NetworkManagementInclusionV2)?.command === this.command;
		}

		constructor(data: Buffer | NetworkManagementInclusionV2NodeAddKeysSetData) {
			super(NodeAddKeysSet, data);
		}
	};

	public static readonly NodeAddDskReport = class NodeAddDskReport extends CommandPacket<NetworkManagementInclusionV2NodeAddDskReportData> {
		public static readonly CommandClass = NetworkManagementInclusionV2;
		public static readonly command = 0x13;
		public static readonly definition = convertFromJsonCommand({
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
							"fieldType": "integer",
							"name": "reserved",
							"mask": 240,
							"shift": 4,
							"reserved": true
						},
						{
							"fieldType": "integer",
							"name": "inputDskLength",
							"mask": 15,
							"shift": 0
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
		} as jsonSpec.CommandDefinition);

		static matches(packet: Packet): boolean {
			return packet.tryAs(NetworkManagementInclusionV2)?.command === this.command;
		}

		constructor(data: Buffer | NetworkManagementInclusionV2NodeAddDskReportData) {
			super(NodeAddDskReport, data);
		}
	};

	public static readonly NodeAddDskSet = class NodeAddDskSet extends CommandPacket<NetworkManagementInclusionV2NodeAddDskSetData> {
		public static readonly CommandClass = NetworkManagementInclusionV2;
		public static readonly command = 0x14;
		public static readonly definition = convertFromJsonCommand({
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
							"fieldType": "boolean",
							"name": "accept",
							"mask": 128,
							"shift": 7
						},
						{
							"fieldType": "integer",
							"name": "reserved",
							"mask": 112,
							"shift": 4,
							"reserved": true
						},
						{
							"fieldType": "integer",
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
					"type": "blob",
					"name": "inputDsk",
					"help": "Input DSK",
					"length": {
						"lengthType": "ref",
						"from": {
							"ref": "properties1.inputDskLength"
						}
					}
				}
			]
		} as jsonSpec.CommandDefinition);

		static matches(packet: Packet): boolean {
			return packet.tryAs(NetworkManagementInclusionV2)?.command === this.command;
		}

		constructor(data: Buffer | NetworkManagementInclusionV2NodeAddDskSetData) {
			super(NodeAddDskSet, data);
		}
	};
}

export namespace NetworkManagementInclusionV2 {
	export type FailedNodeRemove = InstanceType<typeof NetworkManagementInclusionV2.FailedNodeRemove>;
	export type FailedNodeRemoveStatus = InstanceType<typeof NetworkManagementInclusionV2.FailedNodeRemoveStatus>;
	export type NodeAdd = InstanceType<typeof NetworkManagementInclusionV2.NodeAdd>;
	export type NodeAddStatus = InstanceType<typeof NetworkManagementInclusionV2.NodeAddStatus>;
	export type NodeRemove = InstanceType<typeof NetworkManagementInclusionV2.NodeRemove>;
	export type NodeRemoveStatus = InstanceType<typeof NetworkManagementInclusionV2.NodeRemoveStatus>;
	export type FailedNodeReplace = InstanceType<typeof NetworkManagementInclusionV2.FailedNodeReplace>;
	export type FailedNodeReplaceStatus = InstanceType<typeof NetworkManagementInclusionV2.FailedNodeReplaceStatus>;
	export type NodeNeighborUpdateRequest = InstanceType<typeof NetworkManagementInclusionV2.NodeNeighborUpdateRequest>;
	export type NodeNeighborUpdateStatus = InstanceType<typeof NetworkManagementInclusionV2.NodeNeighborUpdateStatus>;
	export type ReturnRouteAssign = InstanceType<typeof NetworkManagementInclusionV2.ReturnRouteAssign>;
	export type ReturnRouteAssignComplete = InstanceType<typeof NetworkManagementInclusionV2.ReturnRouteAssignComplete>;
	export type ReturnRouteDelete = InstanceType<typeof NetworkManagementInclusionV2.ReturnRouteDelete>;
	export type ReturnRouteDeleteComplete = InstanceType<typeof NetworkManagementInclusionV2.ReturnRouteDeleteComplete>;
	export type NodeAddKeysReport = InstanceType<typeof NetworkManagementInclusionV2.NodeAddKeysReport>;
	export type NodeAddKeysSet = InstanceType<typeof NetworkManagementInclusionV2.NodeAddKeysSet>;
	export type NodeAddDskReport = InstanceType<typeof NetworkManagementInclusionV2.NodeAddDskReport>;
	export type NodeAddDskSet = InstanceType<typeof NetworkManagementInclusionV2.NodeAddDskSet>;
}
