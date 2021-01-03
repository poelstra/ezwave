/**
 * Command Class Node Provisioning, version 1.
 *
 * Auto-generated, do not edit.
 */

import { CommandClassPacket, CommandPacket } from "../commands/command";
import { Packet } from "../commands/packet";
import { CommandDefinition } from "../commands/types";
import CommandClasses from "../generated/CommandClasses";

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
	// TODO param vg1 type group
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
	// TODO param vg1 type group
}

export interface NodeProvisioningV1NodeProvisioningGetData {
	seqNo: number; // 1 byte unsigned integer
	dsk: Buffer; // variable length
}

export interface NodeProvisioningV1NodeProvisioningReportData {
	seqNo: number; // 1 byte unsigned integer
	dsk: Buffer; // variable length
	// TODO param vg1 type group
}

export class NodeProvisioningV1 extends CommandClassPacket<NodeProvisioningV1Commands> {
	public static readonly commandClass = CommandClasses.NodeProvisioning; // 0x78 (120)

	public static matches(packet: Packet): boolean {
		return packet.commandClass === this.commandClass;
	}

	constructor(commandAndPayload: Buffer) {
		super(NodeProvisioningV1, commandAndPayload);
	}

	public static readonly NodeProvisioningSet = class NodeProvisioningSet extends CommandPacket<NodeProvisioningV1NodeProvisioningSetData> {
		public static readonly CommandClass = NodeProvisioningV1;
		public static readonly command = 0x01;
		public static readonly definition = {
			"command": 1,
			"name": "NodeProvisioningSet",
			"help": "Node Provisioning Set",
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
							"name": "reserved1",
							"mask": 224,
							"shift": 5,
							"reserved": true
						},
						{
							"type": "integer",
							"name": "dSKLength",
							"mask": 31,
							"shift": 0,
							"lengthOf": {
								"refs": [
									{
										"name": "dsk"
									}
								]
							}
						}
					]
				},
				{
					"type": "blob",
					"name": "dsk",
					"help": "DSK",
					"length": {
						"lengthType": "ref",
						"ref": "properties1",
						"bitfield": {
							"mask": 31,
							"shift": 0,
							"name": "dSKLength"
						}
					}
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
							"name": "properties2",
							"help": "Properties2",
							"length": 1,
							"fields": [
								{
									"type": "boolean",
									"name": "critical",
									"mask": 1,
									"shift": 0
								},
								{
									"type": "integer",
									"name": "metaDataType",
									"mask": 254,
									"shift": 1
								}
							]
						},
						{
							"type": "integer",
							"name": "length",
							"help": "Length",
							"length": 1,
							"lengthOf": {
								"refs": [
									{
										"name": "value"
									}
								]
							}
						},
						{
							"type": "blob",
							"name": "value",
							"help": "Value",
							"length": {
								"lengthType": "ref",
								"ref": "length"
							}
						}
					]
				}
			]
		} as CommandDefinition;

		static matches(packet: Packet): boolean {
			return packet.tryAs(NodeProvisioningV1)?.command === this.command;
		}

		constructor(data: Buffer | NodeProvisioningV1NodeProvisioningSetData) {
			super(NodeProvisioningSet, data);
		}
	};

	public static readonly NodeProvisioningDelete = class NodeProvisioningDelete extends CommandPacket<NodeProvisioningV1NodeProvisioningDeleteData> {
		public static readonly CommandClass = NodeProvisioningV1;
		public static readonly command = 0x02;
		public static readonly definition = {
			"command": 2,
			"name": "NodeProvisioningDelete",
			"help": "Node Provisioning Delete",
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
							"name": "reserved1",
							"mask": 224,
							"shift": 5,
							"reserved": true
						},
						{
							"type": "integer",
							"name": "dSKLength",
							"mask": 31,
							"shift": 0,
							"lengthOf": {
								"refs": [
									{
										"name": "dsk"
									}
								]
							}
						}
					]
				},
				{
					"type": "blob",
					"name": "dsk",
					"help": "DSK",
					"length": {
						"lengthType": "ref",
						"ref": "properties1",
						"bitfield": {
							"mask": 31,
							"shift": 0,
							"name": "dSKLength"
						}
					}
				}
			]
		} as CommandDefinition;

		static matches(packet: Packet): boolean {
			return packet.tryAs(NodeProvisioningV1)?.command === this.command;
		}

		constructor(data: Buffer | NodeProvisioningV1NodeProvisioningDeleteData) {
			super(NodeProvisioningDelete, data);
		}
	};

	public static readonly NodeProvisioningListIterationGet = class NodeProvisioningListIterationGet extends CommandPacket<NodeProvisioningV1NodeProvisioningListIterationGetData> {
		public static readonly CommandClass = NodeProvisioningV1;
		public static readonly command = 0x03;
		public static readonly definition = {
			"command": 3,
			"name": "NodeProvisioningListIterationGet",
			"help": "Node Provisioning List Iteration Get",
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
					"name": "remainingCounter",
					"help": "Remaining Counter",
					"length": 1
				}
			]
		} as CommandDefinition;

		static matches(packet: Packet): boolean {
			return packet.tryAs(NodeProvisioningV1)?.command === this.command;
		}

		constructor(data: Buffer | NodeProvisioningV1NodeProvisioningListIterationGetData) {
			super(NodeProvisioningListIterationGet, data);
		}
	};

	public static readonly NodeProvisioningListIterationReport = class NodeProvisioningListIterationReport extends CommandPacket<NodeProvisioningV1NodeProvisioningListIterationReportData> {
		public static readonly CommandClass = NodeProvisioningV1;
		public static readonly command = 0x04;
		public static readonly definition = {
			"command": 4,
			"name": "NodeProvisioningListIterationReport",
			"help": "Node Provisioning List Iteration Report",
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
					"name": "remainingCount",
					"help": "Remaining Count",
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
							"name": "reserved1",
							"mask": 224,
							"shift": 5,
							"reserved": true
						},
						{
							"type": "integer",
							"name": "dSKLength",
							"mask": 31,
							"shift": 0,
							"lengthOf": {
								"refs": [
									{
										"name": "dsk"
									}
								]
							}
						}
					]
				},
				{
					"type": "blob",
					"name": "dsk",
					"help": "DSK",
					"length": {
						"lengthType": "ref",
						"ref": "properties1",
						"bitfield": {
							"mask": 31,
							"shift": 0,
							"name": "dSKLength"
						}
					}
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
							"name": "properties2",
							"help": "Properties2",
							"length": 1,
							"fields": [
								{
									"type": "boolean",
									"name": "critical",
									"mask": 1,
									"shift": 0
								},
								{
									"type": "integer",
									"name": "metaDataType",
									"mask": 254,
									"shift": 1
								}
							]
						},
						{
							"type": "integer",
							"name": "length",
							"help": "Length",
							"length": 1,
							"lengthOf": {
								"refs": [
									{
										"name": "value"
									}
								]
							}
						},
						{
							"type": "blob",
							"name": "value",
							"help": "Value",
							"length": {
								"lengthType": "ref",
								"ref": "length"
							}
						}
					]
				}
			]
		} as CommandDefinition;

		static matches(packet: Packet): boolean {
			return packet.tryAs(NodeProvisioningV1)?.command === this.command;
		}

		constructor(data: Buffer | NodeProvisioningV1NodeProvisioningListIterationReportData) {
			super(NodeProvisioningListIterationReport, data);
		}
	};

	public static readonly NodeProvisioningGet = class NodeProvisioningGet extends CommandPacket<NodeProvisioningV1NodeProvisioningGetData> {
		public static readonly CommandClass = NodeProvisioningV1;
		public static readonly command = 0x05;
		public static readonly definition = {
			"command": 5,
			"name": "NodeProvisioningGet",
			"help": "Node Provisioning Get",
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
							"name": "reserved1",
							"mask": 224,
							"shift": 5,
							"reserved": true
						},
						{
							"type": "integer",
							"name": "dSKLength",
							"mask": 31,
							"shift": 0,
							"lengthOf": {
								"refs": [
									{
										"name": "dsk"
									}
								]
							}
						}
					]
				},
				{
					"type": "blob",
					"name": "dsk",
					"help": "DSK",
					"length": {
						"lengthType": "ref",
						"ref": "properties1",
						"bitfield": {
							"mask": 31,
							"shift": 0,
							"name": "dSKLength"
						}
					}
				}
			]
		} as CommandDefinition;

		static matches(packet: Packet): boolean {
			return packet.tryAs(NodeProvisioningV1)?.command === this.command;
		}

		constructor(data: Buffer | NodeProvisioningV1NodeProvisioningGetData) {
			super(NodeProvisioningGet, data);
		}
	};

	public static readonly NodeProvisioningReport = class NodeProvisioningReport extends CommandPacket<NodeProvisioningV1NodeProvisioningReportData> {
		public static readonly CommandClass = NodeProvisioningV1;
		public static readonly command = 0x06;
		public static readonly definition = {
			"command": 6,
			"name": "NodeProvisioningReport",
			"help": "Node Provisioning Report",
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
							"name": "reserved",
							"mask": 224,
							"shift": 5,
							"reserved": true
						},
						{
							"type": "integer",
							"name": "dSKLength",
							"mask": 31,
							"shift": 0,
							"lengthOf": {
								"refs": [
									{
										"name": "dsk"
									}
								]
							}
						}
					]
				},
				{
					"type": "blob",
					"name": "dsk",
					"help": "DSK",
					"length": {
						"lengthType": "ref",
						"ref": "properties1",
						"bitfield": {
							"mask": 31,
							"shift": 0,
							"name": "dSKLength"
						}
					}
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
									"type": "boolean",
									"name": "critical",
									"mask": 1,
									"shift": 0
								},
								{
									"type": "integer",
									"name": "metaDataType",
									"mask": 254,
									"shift": 1
								}
							]
						},
						{
							"type": "integer",
							"name": "length",
							"help": "Length",
							"length": 1,
							"lengthOf": {
								"refs": [
									{
										"name": "value"
									}
								]
							}
						},
						{
							"type": "blob",
							"name": "value",
							"help": "Value",
							"length": {
								"lengthType": "ref",
								"ref": "length"
							}
						}
					]
				}
			]
		} as CommandDefinition;

		static matches(packet: Packet): boolean {
			return packet.tryAs(NodeProvisioningV1)?.command === this.command;
		}

		constructor(data: Buffer | NodeProvisioningV1NodeProvisioningReportData) {
			super(NodeProvisioningReport, data);
		}
	};
}

export namespace NodeProvisioningV1 {
	export type NodeProvisioningSet = InstanceType<typeof NodeProvisioningV1.NodeProvisioningSet>;
	export type NodeProvisioningDelete = InstanceType<typeof NodeProvisioningV1.NodeProvisioningDelete>;
	export type NodeProvisioningListIterationGet = InstanceType<typeof NodeProvisioningV1.NodeProvisioningListIterationGet>;
	export type NodeProvisioningListIterationReport = InstanceType<typeof NodeProvisioningV1.NodeProvisioningListIterationReport>;
	export type NodeProvisioningGet = InstanceType<typeof NodeProvisioningV1.NodeProvisioningGet>;
	export type NodeProvisioningReport = InstanceType<typeof NodeProvisioningV1.NodeProvisioningReport>;
}
