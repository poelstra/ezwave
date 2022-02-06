/**
 * Command Class Network Management Proxy, version 1.
 *
 * Auto-generated, do not edit.
 */

import { CommandClasses, CommandClassPacket, CommandPacket, Packet } from "@ezwave/codec";
import { convertFromJsonCommand, JsonCommandDefinition } from "@ezwave/spec";

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
	commandClasses: CommandClasses[]; // automatic length
}

export interface NetworkManagementProxyV1NodeListGetData {
	seqNo: number; // 1 byte unsigned integer
}

export interface NetworkManagementProxyV1NodeListReportData {
	seqNo: number; // 1 byte unsigned integer
	status: number; // 1 byte unsigned integer
	nodeListControllerId: number; // 1 byte unsigned integer
	nodeListData: Set<number /* Node ID */>; // automatic length
}

export enum StatusEnum {
	StatusOk = 0x0,
	StatusNotResponding = 0x1,
	StatusUnknown = 0x2,
}

export class NetworkManagementProxyV1 extends CommandClassPacket<NetworkManagementProxyV1Commands> {
	public static readonly commandClass = CommandClasses.NetworkManagementProxy; // 0x52 (82)
	public static readonly version = 1;

	public static matches(packet: Packet): boolean {
		return packet.commandClass === this.commandClass;
	}

	constructor(commandAndPayload: Buffer) {
		super(NetworkManagementProxyV1, commandAndPayload);
	}
}

export class NodeInfoCachedGet extends CommandPacket<NetworkManagementProxyV1NodeInfoCachedGetData> {
	public static readonly CommandClass = NetworkManagementProxyV1;
	public static readonly command = 0x03; // 3
	public static readonly definition = convertFromJsonCommand({
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

	static matches(packet: Packet): boolean {
		return packet.tryAs(NetworkManagementProxyV1)?.command === this.command;
	}

	constructor(data: Buffer | NetworkManagementProxyV1NodeInfoCachedGetData) {
		super(NodeInfoCachedGet, data);
	}
};

export class NodeInfoCachedReport extends CommandPacket<NetworkManagementProxyV1NodeInfoCachedReportData> {
	public static readonly CommandClass = NetworkManagementProxyV1;
	public static readonly command = 0x04; // 4
	public static readonly definition = convertFromJsonCommand({
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
				"name": "reserved",
				"help": "Reserved",
				"length": 1,
				"reserved": true
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

	static matches(packet: Packet): boolean {
		return packet.tryAs(NetworkManagementProxyV1)?.command === this.command;
	}

	constructor(data: Buffer | NetworkManagementProxyV1NodeInfoCachedReportData) {
		super(NodeInfoCachedReport, data);
	}
};

export class NodeListGet extends CommandPacket<NetworkManagementProxyV1NodeListGetData> {
	public static readonly CommandClass = NetworkManagementProxyV1;
	public static readonly command = 0x01; // 1
	public static readonly definition = convertFromJsonCommand({
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

	static matches(packet: Packet): boolean {
		return packet.tryAs(NetworkManagementProxyV1)?.command === this.command;
	}

	constructor(data: Buffer | NetworkManagementProxyV1NodeListGetData) {
		super(NodeListGet, data);
	}
};

export class NodeListReport extends CommandPacket<NetworkManagementProxyV1NodeListReportData> {
	public static readonly CommandClass = NetworkManagementProxyV1;
	public static readonly command = 0x02; // 2
	public static readonly definition = convertFromJsonCommand({
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

	static matches(packet: Packet): boolean {
		return packet.tryAs(NetworkManagementProxyV1)?.command === this.command;
	}

	constructor(data: Buffer | NetworkManagementProxyV1NodeListReportData) {
		super(NodeListReport, data);
	}
};
