/**
 * Command Class Network Management Proxy, version 2.
 *
 * Auto-generated, do not edit.
 */

import { CommandClassPacket, CommandPacket } from "../commands/command";
import * as jsonSpec from "../commands/jsonSpec";
import { Packet } from "../commands/packet";
import { convertFromJsonCommand } from "../commands/specHelpers";
import CommandClasses from "../generated/CommandClasses";

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
	nodeID: number; // 1 byte unsigned integer
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
	// TODO param commandClass type enumarray
}

export interface NetworkManagementProxyV2NodeListGetData {
	seqNo: number; // 1 byte unsigned integer
}

export interface NetworkManagementProxyV2NodeListReportData {
	seqNo: number; // 1 byte unsigned integer
	status: number; // 1 byte unsigned integer
	nodeListControllerID: number; // 1 byte unsigned integer
	// TODO param nodeListData type bitmask or marker
}

export interface NetworkManagementProxyV2NmMultiChannelEndPointGetData {
	seqNo: number; // 1 byte unsigned integer
	nodeID: number; // 1 byte unsigned integer
}

export interface NetworkManagementProxyV2NmMultiChannelEndPointReportData {
	seqNo: number; // 1 byte unsigned integer
	nodeID: number; // 1 byte unsigned integer
	individualEndPoints: number; // properties1[6..0]
	aggregatedEndPoints: number; // properties2[6..0]
}

export interface NetworkManagementProxyV2NmMultiChannelCapabilityGetData {
	seqNo: number; // 1 byte unsigned integer
	nodeID: number; // 1 byte unsigned integer
	endPoint: number; // properties1[6..0]
}

export interface NetworkManagementProxyV2NmMultiChannelCapabilityReportData {
	seqNo: number; // 1 byte unsigned integer
	nodeID: number; // 1 byte unsigned integer
	commandClassLength: number; // 1 byte unsigned integer
	endPoint: number; // properties1[6..0]
	genericDeviceClass: number; // 1 byte unsigned integer
	specificDeviceClass: number; // 1 byte unsigned integer
	// TODO param commandClass type enumarray
}

export interface NetworkManagementProxyV2NmMultiChannelAggregatedMembersGetData {
	seqNo: number; // 1 byte unsigned integer
	nodeID: number; // 1 byte unsigned integer
	aggregatedEndPoint: number; // properties1[6..0]
}

export interface NetworkManagementProxyV2NmMultiChannelAggregatedMembersReportData {
	seqNo: number; // 1 byte unsigned integer
	nodeID: number; // 1 byte unsigned integer
	aggregatedEndPoint: number; // properties1[6..0]
	numberOfMembers: number; // 1 byte unsigned integer
	// TODO param vg1 type group
}

export enum StatusEnum {
	StatusOk = 0x0,
	StatusNotResponding = 0x1,
	StatusUnknown = 0x2,
}

export class NetworkManagementProxyV2 extends CommandClassPacket<NetworkManagementProxyV2Commands> {
	public static readonly commandClass = CommandClasses.NetworkManagementProxy; // 0x52 (82)

	public static matches(packet: Packet): boolean {
		return packet.commandClass === this.commandClass;
	}

	constructor(commandAndPayload: Buffer) {
		super(NetworkManagementProxyV2, commandAndPayload);
	}

	public static readonly NodeInfoCachedGet = class NodeInfoCachedGet extends CommandPacket<NetworkManagementProxyV2NodeInfoCachedGetData> {
		public static readonly CommandClass = NetworkManagementProxyV2;
		public static readonly command = 0x03;
		public static readonly definition = convertFromJsonCommand({
			"command": 3,
			"name": "NodeInfoCachedGet",
			"help": "Node Info Cached Get",
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
							"fieldType": "integer",
							"name": "reserved",
							"mask": 240,
							"shift": 4,
							"reserved": true
						},
						{
							"fieldType": "integer",
							"name": "maxAge",
							"mask": 15,
							"shift": 0
						}
					]
				},
				{
					"type": "integer",
					"name": "nodeID",
					"help": "Node ID",
					"length": 1,
					"valueType": "NODE_NUMBER"
				}
			]
		} as jsonSpec.CommandDefinition);

		static matches(packet: Packet): boolean {
			return packet.tryAs(NetworkManagementProxyV2)?.command === this.command;
		}

		constructor(data: Buffer | NetworkManagementProxyV2NodeInfoCachedGetData) {
			super(NodeInfoCachedGet, data);
		}
	};

	// TODO This command is not yet fully supported by the decoder/encoder
	public static readonly NodeInfoCachedReport = class NodeInfoCachedReport extends CommandPacket<NetworkManagementProxyV2NodeInfoCachedReportData> {
		public static readonly CommandClass = NetworkManagementProxyV2;
		public static readonly command = 0x04;
		public static readonly definition = convertFromJsonCommand({
			"command": 4,
			"name": "NodeInfoCachedReport",
			"help": "Node Info Cached Report",
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
							"fieldType": "enum",
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
							"fieldType": "integer",
							"name": "age",
							"mask": 15,
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
					"name": "properties3",
					"help": "Properties3",
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
					"name": "grantedKeys",
					"help": "Granted Keys",
					"length": 1
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
						"lengthType": "auto",
						"endOffset": 0
					},
					"valueType": "CMD_CLASS_REF"
				}
			]
		} as jsonSpec.CommandDefinition);

		static matches(packet: Packet): boolean {
			return packet.tryAs(NetworkManagementProxyV2)?.command === this.command;
		}

		constructor(data: Buffer | NetworkManagementProxyV2NodeInfoCachedReportData) {
			super(NodeInfoCachedReport, data);
		}
	};

	public static readonly NodeListGet = class NodeListGet extends CommandPacket<NetworkManagementProxyV2NodeListGetData> {
		public static readonly CommandClass = NetworkManagementProxyV2;
		public static readonly command = 0x01;
		public static readonly definition = convertFromJsonCommand({
			"command": 1,
			"name": "NodeListGet",
			"help": "Node List Get",
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
			return packet.tryAs(NetworkManagementProxyV2)?.command === this.command;
		}

		constructor(data: Buffer | NetworkManagementProxyV2NodeListGetData) {
			super(NodeListGet, data);
		}
	};

	// TODO This command is not yet fully supported by the decoder/encoder
	public static readonly NodeListReport = class NodeListReport extends CommandPacket<NetworkManagementProxyV2NodeListReportData> {
		public static readonly CommandClass = NetworkManagementProxyV2;
		public static readonly command = 0x02;
		public static readonly definition = convertFromJsonCommand({
			"command": 2,
			"name": "NodeListReport",
			"help": "Node List Report",
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
					"type": "integer",
					"name": "nodeListControllerID",
					"help": "Node List Controller ID",
					"length": 1
				},
				{
					"type": "integer",
					"name": "nodeListData",
					"help": "Node List Data",
					"length": 0
				}
			]
		} as jsonSpec.CommandDefinition);

		static matches(packet: Packet): boolean {
			return packet.tryAs(NetworkManagementProxyV2)?.command === this.command;
		}

		constructor(data: Buffer | NetworkManagementProxyV2NodeListReportData) {
			super(NodeListReport, data);
		}
	};

	public static readonly NmMultiChannelEndPointGet = class NmMultiChannelEndPointGet extends CommandPacket<NetworkManagementProxyV2NmMultiChannelEndPointGetData> {
		public static readonly CommandClass = NetworkManagementProxyV2;
		public static readonly command = 0x05;
		public static readonly definition = convertFromJsonCommand({
			"command": 5,
			"name": "NmMultiChannelEndPointGet",
			"help": "Multi Channel End Point Get",
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
					"name": "nodeID",
					"help": "NodeID",
					"length": 1,
					"valueType": "NODE_NUMBER"
				}
			]
		} as jsonSpec.CommandDefinition);

		static matches(packet: Packet): boolean {
			return packet.tryAs(NetworkManagementProxyV2)?.command === this.command;
		}

		constructor(data: Buffer | NetworkManagementProxyV2NmMultiChannelEndPointGetData) {
			super(NmMultiChannelEndPointGet, data);
		}
	};

	public static readonly NmMultiChannelEndPointReport = class NmMultiChannelEndPointReport extends CommandPacket<NetworkManagementProxyV2NmMultiChannelEndPointReportData> {
		public static readonly CommandClass = NetworkManagementProxyV2;
		public static readonly command = 0x06;
		public static readonly definition = convertFromJsonCommand({
			"command": 6,
			"name": "NmMultiChannelEndPointReport",
			"help": "Multi Channel End Point Report",
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
					"name": "nodeID",
					"help": "NodeID",
					"length": 1,
					"valueType": "NODE_NUMBER"
				},
				{
					"type": "integer",
					"name": "reserved",
					"help": "Reserved",
					"length": 1,
					"reserved": true
				},
				{
					"type": "bitfield",
					"name": "properties1",
					"help": "Properties1",
					"length": 1,
					"fields": [
						{
							"fieldType": "boolean",
							"name": "res1",
							"mask": 128,
							"shift": 7,
							"reserved": true
						},
						{
							"fieldType": "integer",
							"name": "individualEndPoints",
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
							"name": "res2",
							"mask": 128,
							"shift": 7,
							"reserved": true
						},
						{
							"fieldType": "integer",
							"name": "aggregatedEndPoints",
							"mask": 127,
							"shift": 0
						}
					]
				}
			]
		} as jsonSpec.CommandDefinition);

		static matches(packet: Packet): boolean {
			return packet.tryAs(NetworkManagementProxyV2)?.command === this.command;
		}

		constructor(data: Buffer | NetworkManagementProxyV2NmMultiChannelEndPointReportData) {
			super(NmMultiChannelEndPointReport, data);
		}
	};

	public static readonly NmMultiChannelCapabilityGet = class NmMultiChannelCapabilityGet extends CommandPacket<NetworkManagementProxyV2NmMultiChannelCapabilityGetData> {
		public static readonly CommandClass = NetworkManagementProxyV2;
		public static readonly command = 0x07;
		public static readonly definition = convertFromJsonCommand({
			"command": 7,
			"name": "NmMultiChannelCapabilityGet",
			"help": "Multi Channel Capability Get",
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
					"name": "nodeID",
					"help": "NodeID",
					"length": 1,
					"valueType": "NODE_NUMBER"
				},
				{
					"type": "bitfield",
					"name": "properties1",
					"help": "Properties1",
					"length": 1,
					"fields": [
						{
							"fieldType": "boolean",
							"name": "res1",
							"mask": 128,
							"shift": 7,
							"reserved": true
						},
						{
							"fieldType": "integer",
							"name": "endPoint",
							"mask": 127,
							"shift": 0
						}
					]
				}
			]
		} as jsonSpec.CommandDefinition);

		static matches(packet: Packet): boolean {
			return packet.tryAs(NetworkManagementProxyV2)?.command === this.command;
		}

		constructor(data: Buffer | NetworkManagementProxyV2NmMultiChannelCapabilityGetData) {
			super(NmMultiChannelCapabilityGet, data);
		}
	};

	// TODO This command is not yet fully supported by the decoder/encoder
	public static readonly NmMultiChannelCapabilityReport = class NmMultiChannelCapabilityReport extends CommandPacket<NetworkManagementProxyV2NmMultiChannelCapabilityReportData> {
		public static readonly CommandClass = NetworkManagementProxyV2;
		public static readonly command = 0x08;
		public static readonly definition = convertFromJsonCommand({
			"command": 8,
			"name": "NmMultiChannelCapabilityReport",
			"help": "Multi Channel Capability Report",
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
					"name": "nodeID",
					"help": "NodeID",
					"length": 1,
					"valueType": "NODE_NUMBER"
				},
				{
					"type": "integer",
					"name": "commandClassLength",
					"help": "Command Class Length",
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
							"name": "res1",
							"mask": 128,
							"shift": 7,
							"reserved": true
						},
						{
							"fieldType": "integer",
							"name": "endPoint",
							"mask": 127,
							"shift": 0
						}
					]
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
						"lengthType": "auto",
						"endOffset": 0
					},
					"valueType": "CMD_CLASS_REF"
				}
			]
		} as jsonSpec.CommandDefinition);

		static matches(packet: Packet): boolean {
			return packet.tryAs(NetworkManagementProxyV2)?.command === this.command;
		}

		constructor(data: Buffer | NetworkManagementProxyV2NmMultiChannelCapabilityReportData) {
			super(NmMultiChannelCapabilityReport, data);
		}
	};

	public static readonly NmMultiChannelAggregatedMembersGet = class NmMultiChannelAggregatedMembersGet extends CommandPacket<NetworkManagementProxyV2NmMultiChannelAggregatedMembersGetData> {
		public static readonly CommandClass = NetworkManagementProxyV2;
		public static readonly command = 0x09;
		public static readonly definition = convertFromJsonCommand({
			"command": 9,
			"name": "NmMultiChannelAggregatedMembersGet",
			"help": "Multi Channel Aggregated Members Get",
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
					"name": "nodeID",
					"help": "NodeID",
					"length": 1,
					"valueType": "NODE_NUMBER"
				},
				{
					"type": "bitfield",
					"name": "properties1",
					"help": "Properties1",
					"length": 1,
					"fields": [
						{
							"fieldType": "boolean",
							"name": "res1",
							"mask": 128,
							"shift": 7,
							"reserved": true
						},
						{
							"fieldType": "integer",
							"name": "aggregatedEndPoint",
							"mask": 127,
							"shift": 0
						}
					]
				}
			]
		} as jsonSpec.CommandDefinition);

		static matches(packet: Packet): boolean {
			return packet.tryAs(NetworkManagementProxyV2)?.command === this.command;
		}

		constructor(data: Buffer | NetworkManagementProxyV2NmMultiChannelAggregatedMembersGetData) {
			super(NmMultiChannelAggregatedMembersGet, data);
		}
	};

	// TODO This command is not yet fully supported by the decoder/encoder
	public static readonly NmMultiChannelAggregatedMembersReport = class NmMultiChannelAggregatedMembersReport extends CommandPacket<NetworkManagementProxyV2NmMultiChannelAggregatedMembersReportData> {
		public static readonly CommandClass = NetworkManagementProxyV2;
		public static readonly command = 0x0a;
		public static readonly definition = convertFromJsonCommand({
			"command": 10,
			"name": "NmMultiChannelAggregatedMembersReport",
			"help": "Multi Channel Aggregated Members Report",
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
					"name": "nodeID",
					"help": "NodeID",
					"length": 1,
					"valueType": "NODE_NUMBER"
				},
				{
					"type": "bitfield",
					"name": "properties1",
					"help": "Properties1",
					"length": 1,
					"fields": [
						{
							"fieldType": "boolean",
							"name": "res1",
							"mask": 128,
							"shift": 7,
							"reserved": true
						},
						{
							"fieldType": "integer",
							"name": "aggregatedEndPoint",
							"mask": 127,
							"shift": 0
						}
					]
				},
				{
					"type": "integer",
					"name": "numberOfMembers",
					"help": "Number of Members",
					"length": 1
				},
				{
					"type": "group",
					"name": "vg1",
					"help": "vg1",
					"length": {
						"lengthType": "auto",
						"endOffset": 0
					},
					"params": [
						{
							"type": "bitfield",
							"name": "properties1",
							"help": "Properties1",
							"length": 1,
							"fields": [
								{
									"fieldType": "integer",
									"name": "memberEndpoint",
									"mask": 127,
									"shift": 0
								},
								{
									"fieldType": "boolean",
									"name": "res2",
									"mask": 128,
									"shift": 7,
									"reserved": true
								}
							]
						}
					]
				}
			]
		} as jsonSpec.CommandDefinition);

		static matches(packet: Packet): boolean {
			return packet.tryAs(NetworkManagementProxyV2)?.command === this.command;
		}

		constructor(data: Buffer | NetworkManagementProxyV2NmMultiChannelAggregatedMembersReportData) {
			super(NmMultiChannelAggregatedMembersReport, data);
		}
	};
}

export namespace NetworkManagementProxyV2 {
	export type NodeInfoCachedGet = InstanceType<typeof NetworkManagementProxyV2.NodeInfoCachedGet>;
	export type NodeInfoCachedReport = InstanceType<typeof NetworkManagementProxyV2.NodeInfoCachedReport>;
	export type NodeListGet = InstanceType<typeof NetworkManagementProxyV2.NodeListGet>;
	export type NodeListReport = InstanceType<typeof NetworkManagementProxyV2.NodeListReport>;
	export type NmMultiChannelEndPointGet = InstanceType<typeof NetworkManagementProxyV2.NmMultiChannelEndPointGet>;
	export type NmMultiChannelEndPointReport = InstanceType<typeof NetworkManagementProxyV2.NmMultiChannelEndPointReport>;
	export type NmMultiChannelCapabilityGet = InstanceType<typeof NetworkManagementProxyV2.NmMultiChannelCapabilityGet>;
	export type NmMultiChannelCapabilityReport = InstanceType<typeof NetworkManagementProxyV2.NmMultiChannelCapabilityReport>;
	export type NmMultiChannelAggregatedMembersGet = InstanceType<typeof NetworkManagementProxyV2.NmMultiChannelAggregatedMembersGet>;
	export type NmMultiChannelAggregatedMembersReport = InstanceType<typeof NetworkManagementProxyV2.NmMultiChannelAggregatedMembersReport>;
}
