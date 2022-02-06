/**
 * Command Class Node Provisioning, version 1.
 *
 * Auto-generated, do not edit.
 */

import { CommandClasses, CommandClassPacket, CommandPacket, Packet } from "@ezwave/codec";
import { convertFromJsonCommand, JsonCommandDefinition } from "@ezwave/spec";

export enum NodeProvisioningV1Commands {
	NodeProvisioningSet = 0x01,
	NodeProvisioningDelete = 0x02,
	NodeProvisioningListIterationGet = 0x03,
	NodeProvisioningListIterationReport = 0x04,
	NodeProvisioningGet = 0x05,
	NodeProvisioningReport = 0x06,
}

export interface NodeProvisioningV1NodeProvisioningSetData {
	seqNo: number; // 1 byte unsigned integer
	dsk: Buffer; // variable length
	vg1: Array<{ // automatic length
		metaDataType: number; // properties2[7..1]
		critical: boolean; // properties2[0]
		value: Buffer; // variable length
	}>;
}

export interface NodeProvisioningV1NodeProvisioningDeleteData {
	seqNo: number; // 1 byte unsigned integer
	dsk: Buffer; // variable length
}

export interface NodeProvisioningV1NodeProvisioningListIterationGetData {
	seqNo: number; // 1 byte unsigned integer
	remainingCounter: number; // 1 byte unsigned integer
}

export interface NodeProvisioningV1NodeProvisioningListIterationReportData {
	seqNo: number; // 1 byte unsigned integer
	remainingCount: number; // 1 byte unsigned integer
	dsk: Buffer; // variable length
	vg1: Array<{ // automatic length
		metaDataType: number; // properties2[7..1]
		critical: boolean; // properties2[0]
		value: Buffer; // variable length
	}>;
}

export interface NodeProvisioningV1NodeProvisioningGetData {
	seqNo: number; // 1 byte unsigned integer
	dsk: Buffer; // variable length
}

export interface NodeProvisioningV1NodeProvisioningReportData {
	seqNo: number; // 1 byte unsigned integer
	dsk: Buffer; // variable length
	vg1: Array<{ // automatic length
		metaDataType: number; // properties1[7..1]
		critical: boolean; // properties1[0]
		value: Buffer; // variable length
	}>;
}

export class NodeProvisioningV1 extends CommandClassPacket<NodeProvisioningV1Commands> {
	public static readonly commandClass = CommandClasses.NodeProvisioning; // 0x78 (120)
	public static readonly version = 1;

	public static matches(packet: Packet): boolean {
		return packet.commandClass === this.commandClass;
	}

	constructor(commandAndPayload: Buffer) {
		super(NodeProvisioningV1, commandAndPayload);
	}
}

export class NodeProvisioningSet extends CommandPacket<NodeProvisioningV1NodeProvisioningSetData> {
	public static readonly CommandClass = NodeProvisioningV1;
	public static readonly command = 0x01; // 1
	public static readonly definition = convertFromJsonCommand({
		"command": 1,
		"name": "NodeProvisioningSet",
		"help": "Node Provisioning Set",
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
						"name": "properties2",
						"help": "Properties2",
						"length": 1,
						"fields": [
							{
								"fieldType": "Integer",
								"name": "metaDataType",
								"mask": 254,
								"shift": 1
							},
							{
								"fieldType": "Boolean",
								"name": "critical",
								"mask": 1,
								"shift": 0
							}
						]
					},
					{
						"type": "Integer",
						"name": "length",
						"help": "Length",
						"length": 1,
						"lengthOf": {
							"refs": [
								"vg1.value"
							]
						},
						"isAutogenerated": true
					},
					{
						"type": "Blob",
						"name": "value",
						"help": "Value",
						"length": {
							"lengthType": "Ref",
							"from": {
								"ref": "vg1.length"
							}
						}
					}
				]
			}
		]
	} as JsonCommandDefinition);

	static matches(packet: Packet): boolean {
		return packet.tryAs(NodeProvisioningV1)?.command === this.command;
	}

	constructor(data: Buffer | NodeProvisioningV1NodeProvisioningSetData) {
		super(NodeProvisioningSet, data);
	}
};

export class NodeProvisioningDelete extends CommandPacket<NodeProvisioningV1NodeProvisioningDeleteData> {
	public static readonly CommandClass = NodeProvisioningV1;
	public static readonly command = 0x02; // 2
	public static readonly definition = convertFromJsonCommand({
		"command": 2,
		"name": "NodeProvisioningDelete",
		"help": "Node Provisioning Delete",
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
		return packet.tryAs(NodeProvisioningV1)?.command === this.command;
	}

	constructor(data: Buffer | NodeProvisioningV1NodeProvisioningDeleteData) {
		super(NodeProvisioningDelete, data);
	}
};

export class NodeProvisioningListIterationGet extends CommandPacket<NodeProvisioningV1NodeProvisioningListIterationGetData> {
	public static readonly CommandClass = NodeProvisioningV1;
	public static readonly command = 0x03; // 3
	public static readonly definition = convertFromJsonCommand({
		"command": 3,
		"name": "NodeProvisioningListIterationGet",
		"help": "Node Provisioning List Iteration Get",
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
				"name": "remainingCounter",
				"help": "Remaining Counter",
				"length": 1
			}
		]
	} as JsonCommandDefinition);

	static matches(packet: Packet): boolean {
		return packet.tryAs(NodeProvisioningV1)?.command === this.command;
	}

	constructor(data: Buffer | NodeProvisioningV1NodeProvisioningListIterationGetData) {
		super(NodeProvisioningListIterationGet, data);
	}
};

export class NodeProvisioningListIterationReport extends CommandPacket<NodeProvisioningV1NodeProvisioningListIterationReportData> {
	public static readonly CommandClass = NodeProvisioningV1;
	public static readonly command = 0x04; // 4
	public static readonly definition = convertFromJsonCommand({
		"command": 4,
		"name": "NodeProvisioningListIterationReport",
		"help": "Node Provisioning List Iteration Report",
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
				"name": "remainingCount",
				"help": "Remaining Count",
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
						"name": "properties2",
						"help": "Properties2",
						"length": 1,
						"fields": [
							{
								"fieldType": "Integer",
								"name": "metaDataType",
								"mask": 254,
								"shift": 1
							},
							{
								"fieldType": "Boolean",
								"name": "critical",
								"mask": 1,
								"shift": 0
							}
						]
					},
					{
						"type": "Integer",
						"name": "length",
						"help": "Length",
						"length": 1,
						"lengthOf": {
							"refs": [
								"vg1.value"
							]
						},
						"isAutogenerated": true
					},
					{
						"type": "Blob",
						"name": "value",
						"help": "Value",
						"length": {
							"lengthType": "Ref",
							"from": {
								"ref": "vg1.length"
							}
						}
					}
				]
			}
		]
	} as JsonCommandDefinition);

	static matches(packet: Packet): boolean {
		return packet.tryAs(NodeProvisioningV1)?.command === this.command;
	}

	constructor(data: Buffer | NodeProvisioningV1NodeProvisioningListIterationReportData) {
		super(NodeProvisioningListIterationReport, data);
	}
};

export class NodeProvisioningGet extends CommandPacket<NodeProvisioningV1NodeProvisioningGetData> {
	public static readonly CommandClass = NodeProvisioningV1;
	public static readonly command = 0x05; // 5
	public static readonly definition = convertFromJsonCommand({
		"command": 5,
		"name": "NodeProvisioningGet",
		"help": "Node Provisioning Get",
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
		return packet.tryAs(NodeProvisioningV1)?.command === this.command;
	}

	constructor(data: Buffer | NodeProvisioningV1NodeProvisioningGetData) {
		super(NodeProvisioningGet, data);
	}
};

export class NodeProvisioningReport extends CommandPacket<NodeProvisioningV1NodeProvisioningReportData> {
	public static readonly CommandClass = NodeProvisioningV1;
	public static readonly command = 0x06; // 6
	public static readonly definition = convertFromJsonCommand({
		"command": 6,
		"name": "NodeProvisioningReport",
		"help": "Node Provisioning Report",
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
								"fieldType": "Integer",
								"name": "metaDataType",
								"mask": 254,
								"shift": 1
							},
							{
								"fieldType": "Boolean",
								"name": "critical",
								"mask": 1,
								"shift": 0
							}
						]
					},
					{
						"type": "Integer",
						"name": "length",
						"help": "Length",
						"length": 1,
						"lengthOf": {
							"refs": [
								"vg1.value"
							]
						},
						"isAutogenerated": true
					},
					{
						"type": "Blob",
						"name": "value",
						"help": "Value",
						"length": {
							"lengthType": "Ref",
							"from": {
								"ref": "vg1.length"
							}
						}
					}
				]
			}
		]
	} as JsonCommandDefinition);

	static matches(packet: Packet): boolean {
		return packet.tryAs(NodeProvisioningV1)?.command === this.command;
	}

	constructor(data: Buffer | NodeProvisioningV1NodeProvisioningReportData) {
		super(NodeProvisioningReport, data);
	}
};