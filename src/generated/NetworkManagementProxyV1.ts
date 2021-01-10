/**
 * Command Class Network Management Proxy, version 1.
 *
 * Auto-generated, do not edit.
 */

import { CommandClassPacket, CommandPacket } from "../commands/command";
import * as jsonSpec from "../commands/jsonSpec";
import { Packet } from "../commands/packet";
import { convertFromJsonCommand } from "../commands/specHelpers";
import CommandClasses from "../generated/CommandClasses";

export enum NetworkManagementProxyV1Commands {
	NodeInfoCachedGet = 0x03,
	NodeInfoCachedReport = 0x04,
	NodeListGet = 0x01,
	NodeListReport = 0x02,
}

export interface NetworkManagementProxyV1NodeInfoCachedGetData {
	seqNo: number; // 1 byte unsigned integer
	maxAge: number; // properties1[3..0]
	nodeId: number; // 1 byte unsigned integer
}

export interface NetworkManagementProxyV1NodeInfoCachedReportData {
	seqNo: number; // 1 byte unsigned integer
	status: StatusEnum; // properties1[7..4]
	age: number; // properties1[3..0]
	listening: boolean; // properties2[7]
	zWaveProtocolSpecificPart1: number; // properties2[6..0]
	opt: boolean; // properties3[7]
	zWaveProtocolSpecificPart2: number; // properties3[6..0]
	basicDeviceClass: number; // 1 byte unsigned integer
	genericDeviceClass: number; // 1 byte unsigned integer
	specificDeviceClass: number; // 1 byte unsigned integer
	commandClasses: number[]; // automatic length
}

export interface NetworkManagementProxyV1NodeListGetData {
	seqNo: number; // 1 byte unsigned integer
}

export interface NetworkManagementProxyV1NodeListReportData {
	seqNo: number; // 1 byte unsigned integer
	status: number; // 1 byte unsigned integer
	nodeListControllerId: number; // 1 byte unsigned integer
	// TODO param nodeListData type bitmask
}

export enum StatusEnum {
	StatusOk = 0x0,
	StatusNotResponding = 0x1,
	StatusUnknown = 0x2,
}

export class NetworkManagementProxyV1 extends CommandClassPacket<NetworkManagementProxyV1Commands> {
	public static readonly commandClass = CommandClasses.NetworkManagementProxy; // 0x52 (82)

	public static matches(packet: Packet): boolean {
		return packet.commandClass === this.commandClass;
	}

	constructor(commandAndPayload: Buffer) {
		super(NetworkManagementProxyV1, commandAndPayload);
	}

	public static readonly NodeInfoCachedGet = class NodeInfoCachedGet extends CommandPacket<NetworkManagementProxyV1NodeInfoCachedGetData> {
		public static readonly CommandClass = NetworkManagementProxyV1;
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
					"name": "nodeId",
					"help": "Node ID",
					"length": 1,
					"valueType": "NODE_NUMBER"
				}
			]
		} as jsonSpec.CommandDefinition);

		static matches(packet: Packet): boolean {
			return packet.tryAs(NetworkManagementProxyV1)?.command === this.command;
		}

		constructor(data: Buffer | NetworkManagementProxyV1NodeInfoCachedGetData) {
			super(NodeInfoCachedGet, data);
		}
	};

	public static readonly NodeInfoCachedReport = class NodeInfoCachedReport extends CommandPacket<NetworkManagementProxyV1NodeInfoCachedReportData> {
		public static readonly CommandClass = NetworkManagementProxyV1;
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
					"name": "reserved",
					"help": "Reserved",
					"length": 1,
					"reserved": true
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
					"type": "blob",
					"name": "commandClasses",
					"help": "Command Classes",
					"length": {
						"lengthType": "auto"
					},
					"blobType": "CommandClasses"
				}
			]
		} as jsonSpec.CommandDefinition);

		static matches(packet: Packet): boolean {
			return packet.tryAs(NetworkManagementProxyV1)?.command === this.command;
		}

		constructor(data: Buffer | NetworkManagementProxyV1NodeInfoCachedReportData) {
			super(NodeInfoCachedReport, data);
		}
	};

	public static readonly NodeListGet = class NodeListGet extends CommandPacket<NetworkManagementProxyV1NodeListGetData> {
		public static readonly CommandClass = NetworkManagementProxyV1;
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
			return packet.tryAs(NetworkManagementProxyV1)?.command === this.command;
		}

		constructor(data: Buffer | NetworkManagementProxyV1NodeListGetData) {
			super(NodeListGet, data);
		}
	};

	// TODO This command is not yet fully supported by the decoder/encoder
	public static readonly NodeListReport = class NodeListReport extends CommandPacket<NetworkManagementProxyV1NodeListReportData> {
		public static readonly CommandClass = NetworkManagementProxyV1;
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
					"name": "nodeListControllerId",
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
			return packet.tryAs(NetworkManagementProxyV1)?.command === this.command;
		}

		constructor(data: Buffer | NetworkManagementProxyV1NodeListReportData) {
			super(NodeListReport, data);
		}
	};
}

export namespace NetworkManagementProxyV1 {
	export type NodeInfoCachedGet = InstanceType<typeof NetworkManagementProxyV1.NodeInfoCachedGet>;
	export type NodeInfoCachedReport = InstanceType<typeof NetworkManagementProxyV1.NodeInfoCachedReport>;
	export type NodeListGet = InstanceType<typeof NetworkManagementProxyV1.NodeListGet>;
	export type NodeListReport = InstanceType<typeof NetworkManagementProxyV1.NodeListReport>;
}
