/**
 * Command Class Network Management Proxy, version 2.
 *
 * Auto-generated, do not edit.
 */

import { CommandClasses, CommandClassPacket, CommandPacket, Packet } from "@ezwave/codec";
import { CommandDefinition, convertFromJsonCommand, JsonCommandDefinition } from "@ezwave/spec";

export enum NetworkManagementProxyV2Commands {
	NodeInfoCachedGet = 0x03,
	NodeInfoCachedReport = 0x04,
	NodeListGet = 0x01,
	NodeListReport = 0x02,
	NmMultiChannelEndPointGet = 0x05,
	NmMultiChannelEndPointReport = 0x06,
	NmMultiChannelCapabilityGet = 0x07,
	NmMultiChannelCapabilityReport = 0x08,
	NmMultiChannelAggregatedMembersGet = 0x09,
	NmMultiChannelAggregatedMembersReport = 0x0a,
}

export interface NetworkManagementProxyV2NodeInfoCachedGetData {
	seqNo: number; // 1 byte unsigned integer
	maxAge: number; // properties1[3..0]
	nodeId: number; // 1 byte unsigned integer
}

export interface NetworkManagementProxyV2NodeInfoCachedReportData {
	seqNo: number; // 1 byte unsigned integer
	status: StatusEnum; // properties1[7..4]
	age: number; // properties1[3..0]
	listening: boolean; // properties2[7]
	zWaveProtocolSpecificPart1: number; // properties2[6..0]
	opt: boolean; // properties3[7]
	zWaveProtocolSpecificPart2: number; // properties3[6..0]
	grantedKeys: number; // 1 byte unsigned integer
	basicDeviceClass: number; // 1 byte unsigned integer
	genericDeviceClass: number; // 1 byte unsigned integer
	specificDeviceClass: number; // 1 byte unsigned integer
	commandClasses: CommandClasses[]; // automatic length
}

export interface NetworkManagementProxyV2NodeListGetData {
	seqNo: number; // 1 byte unsigned integer
}

export interface NetworkManagementProxyV2NodeListReportData {
	seqNo: number; // 1 byte unsigned integer
	status: number; // 1 byte unsigned integer
	nodeListControllerId: number; // 1 byte unsigned integer
	nodeListData: Set<number /* Node ID */>; // automatic length
}

export interface NetworkManagementProxyV2NmMultiChannelEndPointGetData {
	seqNo: number; // 1 byte unsigned integer
	nodeId: number; // 1 byte unsigned integer
}

export interface NetworkManagementProxyV2NmMultiChannelEndPointReportData {
	seqNo: number; // 1 byte unsigned integer
	nodeId: number; // 1 byte unsigned integer
	individualEndPoints: number; // properties1[6..0]
	aggregatedEndPoints: number; // properties2[6..0]
}

export interface NetworkManagementProxyV2NmMultiChannelCapabilityGetData {
	seqNo: number; // 1 byte unsigned integer
	nodeId: number; // 1 byte unsigned integer
	endPoint: number; // properties1[6..0]
}

export interface NetworkManagementProxyV2NmMultiChannelCapabilityReportData {
	seqNo: number; // 1 byte unsigned integer
	nodeId: number; // 1 byte unsigned integer
	commandClassLength: number; // 1 byte unsigned integer
	endPoint: number; // properties1[6..0]
	genericDeviceClass: number; // 1 byte unsigned integer
	specificDeviceClass: number; // 1 byte unsigned integer
	commandClasses: CommandClasses[]; // automatic length
}

export interface NetworkManagementProxyV2NmMultiChannelAggregatedMembersGetData {
	seqNo: number; // 1 byte unsigned integer
	nodeId: number; // 1 byte unsigned integer
	aggregatedEndPoint: number; // properties1[6..0]
}

export interface NetworkManagementProxyV2NmMultiChannelAggregatedMembersReportData {
	seqNo: number; // 1 byte unsigned integer
	nodeId: number; // 1 byte unsigned integer
	aggregatedEndPoint: number; // properties1[6..0]
	numberOfMembers: number; // 1 byte unsigned integer
	vg1: Array<{ // automatic length
		memberEndpoint: number; // properties1[6..0]
	}>;
}

export enum StatusEnum {
	StatusOk = 0x0,
	StatusNotResponding = 0x1,
	StatusUnknown = 0x2,
}

export class NetworkManagementProxyV2 extends CommandClassPacket<NetworkManagementProxyV2Commands> {
	public static readonly commandClass: number = CommandClasses.NetworkManagementProxy; // 0x52 (82)
	public static readonly version: number = 2;

	public static matches(packet: Packet): boolean {
		return packet.commandClass === this.commandClass;
	}

	public constructor(commandAndPayload: Buffer) {
		super(NetworkManagementProxyV2, commandAndPayload);
	}
}

export class NodeInfoCachedGet extends CommandPacket<NetworkManagementProxyV2NodeInfoCachedGetData> {
	public static readonly CommandClass: typeof NetworkManagementProxyV2 = NetworkManagementProxyV2;
	public static readonly command: number = 0x03; // 3
	public static readonly definition: CommandDefinition = convertFromJsonCommand({
		"command": 3,
		"name": "NodeInfoCachedGet",
		"help": "Node Info Cached Get",
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
						"mask": 240,
						"shift": 4,
						"reserved": true
					},
					{
						"fieldType": "Integer",
						"name": "maxAge",
						"mask": 15,
						"shift": 0
					}
				]
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
		return packet.tryAs(NetworkManagementProxyV2)?.command === this.command;
	}

	public constructor(data: Buffer | NetworkManagementProxyV2NodeInfoCachedGetData) {
		super(NodeInfoCachedGet, data);
	}
};

export class NodeInfoCachedReport extends CommandPacket<NetworkManagementProxyV2NodeInfoCachedReportData> {
	public static readonly CommandClass: typeof NetworkManagementProxyV2 = NetworkManagementProxyV2;
	public static readonly command: number = 0x04; // 4
	public static readonly definition: CommandDefinition = convertFromJsonCommand({
		"command": 4,
		"name": "NodeInfoCachedReport",
		"help": "Node Info Cached Report",
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
						"fieldType": "Enum",
						"name": "status",
						"mask": 240,
						"shift": 4,
						"values": {
							"0": {
								"name": "StatusOk",
								"help": "STATUS_OK"
							},
							"1": {
								"name": "StatusNotResponding",
								"help": "STATUS_NOT_RESPONDING"
							},
							"2": {
								"name": "StatusUnknown",
								"help": "STATUS_UNKNOWN"
							}
						}
					},
					{
						"fieldType": "Integer",
						"name": "age",
						"mask": 15,
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
				"name": "properties3",
				"help": "Properties3",
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
				"name": "grantedKeys",
				"help": "Granted Keys",
				"length": 1
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
					"lengthType": "Auto"
				},
				"blobType": "CommandClasses"
			}
		]
	} as JsonCommandDefinition);

	public static matches(packet: Packet): boolean {
		return packet.tryAs(NetworkManagementProxyV2)?.command === this.command;
	}

	public constructor(data: Buffer | NetworkManagementProxyV2NodeInfoCachedReportData) {
		super(NodeInfoCachedReport, data);
	}
};

export class NodeListGet extends CommandPacket<NetworkManagementProxyV2NodeListGetData> {
	public static readonly CommandClass: typeof NetworkManagementProxyV2 = NetworkManagementProxyV2;
	public static readonly command: number = 0x01; // 1
	public static readonly definition: CommandDefinition = convertFromJsonCommand({
		"command": 1,
		"name": "NodeListGet",
		"help": "Node List Get",
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

	public static matches(packet: Packet): boolean {
		return packet.tryAs(NetworkManagementProxyV2)?.command === this.command;
	}

	public constructor(data: Buffer | NetworkManagementProxyV2NodeListGetData) {
		super(NodeListGet, data);
	}
};

export class NodeListReport extends CommandPacket<NetworkManagementProxyV2NodeListReportData> {
	public static readonly CommandClass: typeof NetworkManagementProxyV2 = NetworkManagementProxyV2;
	public static readonly command: number = 0x02; // 2
	public static readonly definition: CommandDefinition = convertFromJsonCommand({
		"command": 2,
		"name": "NodeListReport",
		"help": "Node List Report",
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
						"name": "Latest",
						"help": "Latest"
					},
					"1": {
						"name": "MayNotBeTheLatest",
						"help": "May not be the latest"
					}
				}
			},
			{
				"type": "Integer",
				"name": "nodeListControllerId",
				"help": "Node List Controller ID",
				"length": 1
			},
			{
				"type": "Bitmask",
				"name": "nodeListData",
				"help": "Node List Data",
				"length": {
					"lengthType": "Auto"
				},
				"bitmaskType": "NodeNumber"
			}
		]
	} as JsonCommandDefinition);

	public static matches(packet: Packet): boolean {
		return packet.tryAs(NetworkManagementProxyV2)?.command === this.command;
	}

	public constructor(data: Buffer | NetworkManagementProxyV2NodeListReportData) {
		super(NodeListReport, data);
	}
};

export class NmMultiChannelEndPointGet extends CommandPacket<NetworkManagementProxyV2NmMultiChannelEndPointGetData> {
	public static readonly CommandClass: typeof NetworkManagementProxyV2 = NetworkManagementProxyV2;
	public static readonly command: number = 0x05; // 5
	public static readonly definition: CommandDefinition = convertFromJsonCommand({
		"command": 5,
		"name": "NmMultiChannelEndPointGet",
		"help": "Multi Channel End Point Get",
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
				"name": "nodeId",
				"help": "NodeID",
				"length": 1,
				"valueType": "NodeNumber"
			}
		]
	} as JsonCommandDefinition);

	public static matches(packet: Packet): boolean {
		return packet.tryAs(NetworkManagementProxyV2)?.command === this.command;
	}

	public constructor(data: Buffer | NetworkManagementProxyV2NmMultiChannelEndPointGetData) {
		super(NmMultiChannelEndPointGet, data);
	}
};

export class NmMultiChannelEndPointReport extends CommandPacket<NetworkManagementProxyV2NmMultiChannelEndPointReportData> {
	public static readonly CommandClass: typeof NetworkManagementProxyV2 = NetworkManagementProxyV2;
	public static readonly command: number = 0x06; // 6
	public static readonly definition: CommandDefinition = convertFromJsonCommand({
		"command": 6,
		"name": "NmMultiChannelEndPointReport",
		"help": "Multi Channel End Point Report",
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
				"name": "nodeId",
				"help": "NodeID",
				"length": 1,
				"valueType": "NodeNumber"
			},
			{
				"type": "Integer",
				"name": "reserved",
				"help": "Reserved",
				"length": 1,
				"reserved": true
			},
			{
				"type": "Bitfield",
				"name": "properties1",
				"help": "Properties1",
				"length": 1,
				"fields": [
					{
						"fieldType": "Boolean",
						"name": "res1",
						"mask": 128,
						"shift": 7,
						"reserved": true
					},
					{
						"fieldType": "Integer",
						"name": "individualEndPoints",
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
						"name": "res2",
						"mask": 128,
						"shift": 7,
						"reserved": true
					},
					{
						"fieldType": "Integer",
						"name": "aggregatedEndPoints",
						"mask": 127,
						"shift": 0
					}
				]
			}
		]
	} as JsonCommandDefinition);

	public static matches(packet: Packet): boolean {
		return packet.tryAs(NetworkManagementProxyV2)?.command === this.command;
	}

	public constructor(data: Buffer | NetworkManagementProxyV2NmMultiChannelEndPointReportData) {
		super(NmMultiChannelEndPointReport, data);
	}
};

export class NmMultiChannelCapabilityGet extends CommandPacket<NetworkManagementProxyV2NmMultiChannelCapabilityGetData> {
	public static readonly CommandClass: typeof NetworkManagementProxyV2 = NetworkManagementProxyV2;
	public static readonly command: number = 0x07; // 7
	public static readonly definition: CommandDefinition = convertFromJsonCommand({
		"command": 7,
		"name": "NmMultiChannelCapabilityGet",
		"help": "Multi Channel Capability Get",
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
				"name": "nodeId",
				"help": "NodeID",
				"length": 1,
				"valueType": "NodeNumber"
			},
			{
				"type": "Bitfield",
				"name": "properties1",
				"help": "Properties1",
				"length": 1,
				"fields": [
					{
						"fieldType": "Boolean",
						"name": "res1",
						"mask": 128,
						"shift": 7,
						"reserved": true
					},
					{
						"fieldType": "Integer",
						"name": "endPoint",
						"mask": 127,
						"shift": 0
					}
				]
			}
		]
	} as JsonCommandDefinition);

	public static matches(packet: Packet): boolean {
		return packet.tryAs(NetworkManagementProxyV2)?.command === this.command;
	}

	public constructor(data: Buffer | NetworkManagementProxyV2NmMultiChannelCapabilityGetData) {
		super(NmMultiChannelCapabilityGet, data);
	}
};

export class NmMultiChannelCapabilityReport extends CommandPacket<NetworkManagementProxyV2NmMultiChannelCapabilityReportData> {
	public static readonly CommandClass: typeof NetworkManagementProxyV2 = NetworkManagementProxyV2;
	public static readonly command: number = 0x08; // 8
	public static readonly definition: CommandDefinition = convertFromJsonCommand({
		"command": 8,
		"name": "NmMultiChannelCapabilityReport",
		"help": "Multi Channel Capability Report",
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
				"name": "nodeId",
				"help": "NodeID",
				"length": 1,
				"valueType": "NodeNumber"
			},
			{
				"type": "Integer",
				"name": "commandClassLength",
				"help": "Command Class Length",
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
						"name": "res1",
						"mask": 128,
						"shift": 7,
						"reserved": true
					},
					{
						"fieldType": "Integer",
						"name": "endPoint",
						"mask": 127,
						"shift": 0
					}
				]
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
					"lengthType": "Auto"
				},
				"blobType": "CommandClasses"
			}
		]
	} as JsonCommandDefinition);

	public static matches(packet: Packet): boolean {
		return packet.tryAs(NetworkManagementProxyV2)?.command === this.command;
	}

	public constructor(data: Buffer | NetworkManagementProxyV2NmMultiChannelCapabilityReportData) {
		super(NmMultiChannelCapabilityReport, data);
	}
};

export class NmMultiChannelAggregatedMembersGet extends CommandPacket<NetworkManagementProxyV2NmMultiChannelAggregatedMembersGetData> {
	public static readonly CommandClass: typeof NetworkManagementProxyV2 = NetworkManagementProxyV2;
	public static readonly command: number = 0x09; // 9
	public static readonly definition: CommandDefinition = convertFromJsonCommand({
		"command": 9,
		"name": "NmMultiChannelAggregatedMembersGet",
		"help": "Multi Channel Aggregated Members Get",
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
				"name": "nodeId",
				"help": "NodeID",
				"length": 1,
				"valueType": "NodeNumber"
			},
			{
				"type": "Bitfield",
				"name": "properties1",
				"help": "Properties1",
				"length": 1,
				"fields": [
					{
						"fieldType": "Boolean",
						"name": "res1",
						"mask": 128,
						"shift": 7,
						"reserved": true
					},
					{
						"fieldType": "Integer",
						"name": "aggregatedEndPoint",
						"mask": 127,
						"shift": 0
					}
				]
			}
		]
	} as JsonCommandDefinition);

	public static matches(packet: Packet): boolean {
		return packet.tryAs(NetworkManagementProxyV2)?.command === this.command;
	}

	public constructor(data: Buffer | NetworkManagementProxyV2NmMultiChannelAggregatedMembersGetData) {
		super(NmMultiChannelAggregatedMembersGet, data);
	}
};

export class NmMultiChannelAggregatedMembersReport extends CommandPacket<NetworkManagementProxyV2NmMultiChannelAggregatedMembersReportData> {
	public static readonly CommandClass: typeof NetworkManagementProxyV2 = NetworkManagementProxyV2;
	public static readonly command: number = 0x0a; // 10
	public static readonly definition: CommandDefinition = convertFromJsonCommand({
		"command": 10,
		"name": "NmMultiChannelAggregatedMembersReport",
		"help": "Multi Channel Aggregated Members Report",
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
				"name": "nodeId",
				"help": "NodeID",
				"length": 1,
				"valueType": "NodeNumber"
			},
			{
				"type": "Bitfield",
				"name": "properties1",
				"help": "Properties1",
				"length": 1,
				"fields": [
					{
						"fieldType": "Boolean",
						"name": "res1",
						"mask": 128,
						"shift": 7,
						"reserved": true
					},
					{
						"fieldType": "Integer",
						"name": "aggregatedEndPoint",
						"mask": 127,
						"shift": 0
					}
				]
			},
			{
				"type": "Integer",
				"name": "numberOfMembers",
				"help": "Number of Members",
				"length": 1
			},
			{
				"type": "Group",
				"name": "vg1",
				"help": "vg1",
				"length": {
					"lengthType": "Auto"
				},
				"params": [
					{
						"type": "Bitfield",
						"name": "properties1",
						"help": "Properties1",
						"length": 1,
						"fields": [
							{
								"fieldType": "Boolean",
								"name": "res2",
								"mask": 128,
								"shift": 7,
								"reserved": true
							},
							{
								"fieldType": "Integer",
								"name": "memberEndpoint",
								"mask": 127,
								"shift": 0
							}
						]
					}
				]
			}
		]
	} as JsonCommandDefinition);

	public static matches(packet: Packet): boolean {
		return packet.tryAs(NetworkManagementProxyV2)?.command === this.command;
	}

	public constructor(data: Buffer | NetworkManagementProxyV2NmMultiChannelAggregatedMembersReportData) {
		super(NmMultiChannelAggregatedMembersReport, data);
	}
};
