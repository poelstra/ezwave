/**
 * Command Class Simple Av Control, version 1.
 *
 * Auto-generated, do not edit.
 */

import { CommandClassPacket, CommandPacket } from "../command";
import * as jsonSpec from "../jsonSpec";
import { Packet } from "../packet";
import { convertFromJsonCommand } from "../specHelpers";
import CommandClasses from "./CommandClasses";

export enum SimpleAvControlV1Commands {
	SimpleAvControlGet = 0x02,
	SimpleAvControlReport = 0x03,
	SimpleAvControlSet = 0x01,
	SimpleAvControlSupportedGet = 0x04,
	SimpleAvControlSupportedReport = 0x05,
}

export interface SimpleAvControlV1SimpleAvControlReportData {
	numberOfReports: number; // 1 byte unsigned integer
}

export interface SimpleAvControlV1SimpleAvControlSetData {
	sequenceNumber: number; // 1 byte unsigned integer
	keyAttributes: number; // properties1[2..0]
	reserved2: number; // 2 byte unsigned integer
	vg: Array<{ // automatic length
		command: number; // 2 byte unsigned integer
	}>;
}

export interface SimpleAvControlV1SimpleAvControlSupportedGetData {
	reportNo: number; // 1 byte unsigned integer
}

export interface SimpleAvControlV1SimpleAvControlSupportedReportData {
	reportNo: number; // 1 byte unsigned integer
	bitMask: Set<number /* AV Command number */>; // automatic length
}

export class SimpleAvControlV1 extends CommandClassPacket<SimpleAvControlV1Commands> {
	public static readonly commandClass = CommandClasses.SimpleAvControl; // 0x94 (148)
	public static readonly version = 1;

	public static matches(packet: Packet): boolean {
		return packet.commandClass === this.commandClass;
	}

	constructor(commandAndPayload: Buffer) {
		super(SimpleAvControlV1, commandAndPayload);
	}

	public static readonly SimpleAvControlGet = class SimpleAvControlGet extends CommandPacket<void> {
		public static readonly CommandClass = SimpleAvControlV1;
		public static readonly command = 0x02;
		public static readonly definition = convertFromJsonCommand({
			"command": 2,
			"name": "SimpleAvControlGet",
			"help": "Simple Av Control Get",
			"status": "Active",
			"params": []
		} as jsonSpec.CommandDefinition);

		static matches(packet: Packet): boolean {
			return packet.tryAs(SimpleAvControlV1)?.command === this.command;
		}

		constructor(data: Buffer | void) {
			super(SimpleAvControlGet, data);
		}
	};

	public static readonly SimpleAvControlReport = class SimpleAvControlReport extends CommandPacket<SimpleAvControlV1SimpleAvControlReportData> {
		public static readonly CommandClass = SimpleAvControlV1;
		public static readonly command = 0x03;
		public static readonly definition = convertFromJsonCommand({
			"command": 3,
			"name": "SimpleAvControlReport",
			"help": "Simple Av Control Report",
			"status": "Active",
			"params": [
				{
					"type": "Integer",
					"name": "numberOfReports",
					"help": "Number of reports",
					"length": 1
				}
			]
		} as jsonSpec.CommandDefinition);

		static matches(packet: Packet): boolean {
			return packet.tryAs(SimpleAvControlV1)?.command === this.command;
		}

		constructor(data: Buffer | SimpleAvControlV1SimpleAvControlReportData) {
			super(SimpleAvControlReport, data);
		}
	};

	public static readonly SimpleAvControlSet = class SimpleAvControlSet extends CommandPacket<SimpleAvControlV1SimpleAvControlSetData> {
		public static readonly CommandClass = SimpleAvControlV1;
		public static readonly command = 0x01;
		public static readonly definition = convertFromJsonCommand({
			"command": 1,
			"name": "SimpleAvControlSet",
			"help": "Simple Av Control Set",
			"status": "Active",
			"params": [
				{
					"type": "Integer",
					"name": "sequenceNumber",
					"help": "Sequence Number",
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
							"mask": 248,
							"shift": 3,
							"reserved": true
						},
						{
							"fieldType": "Integer",
							"name": "keyAttributes",
							"mask": 7,
							"shift": 0
						}
					]
				},
				{
					"type": "Integer",
					"name": "reserved2",
					"help": "Reserved2",
					"length": 2
				},
				{
					"type": "Group",
					"name": "vg",
					"help": "vg",
					"length": {
						"lengthType": "Auto"
					},
					"params": [
						{
							"type": "Integer",
							"name": "command",
							"help": "Command",
							"length": 2
						}
					]
				}
			]
		} as jsonSpec.CommandDefinition);

		static matches(packet: Packet): boolean {
			return packet.tryAs(SimpleAvControlV1)?.command === this.command;
		}

		constructor(data: Buffer | SimpleAvControlV1SimpleAvControlSetData) {
			super(SimpleAvControlSet, data);
		}
	};

	public static readonly SimpleAvControlSupportedGet = class SimpleAvControlSupportedGet extends CommandPacket<SimpleAvControlV1SimpleAvControlSupportedGetData> {
		public static readonly CommandClass = SimpleAvControlV1;
		public static readonly command = 0x04;
		public static readonly definition = convertFromJsonCommand({
			"command": 4,
			"name": "SimpleAvControlSupportedGet",
			"help": "Simple Av Control Supported Get",
			"status": "Active",
			"params": [
				{
					"type": "Integer",
					"name": "reportNo",
					"help": "Report No",
					"length": 1
				}
			]
		} as jsonSpec.CommandDefinition);

		static matches(packet: Packet): boolean {
			return packet.tryAs(SimpleAvControlV1)?.command === this.command;
		}

		constructor(data: Buffer | SimpleAvControlV1SimpleAvControlSupportedGetData) {
			super(SimpleAvControlSupportedGet, data);
		}
	};

	public static readonly SimpleAvControlSupportedReport = class SimpleAvControlSupportedReport extends CommandPacket<SimpleAvControlV1SimpleAvControlSupportedReportData> {
		public static readonly CommandClass = SimpleAvControlV1;
		public static readonly command = 0x05;
		public static readonly definition = convertFromJsonCommand({
			"command": 5,
			"name": "SimpleAvControlSupportedReport",
			"help": "Simple Av Control Supported Report",
			"status": "Active",
			"params": [
				{
					"type": "Integer",
					"name": "reportNo",
					"help": "Report No",
					"length": 1
				},
				{
					"type": "Bitmask",
					"name": "bitMask",
					"help": "Bit Mask",
					"length": {
						"lengthType": "Auto"
					},
					"bitmaskType": "AVCommand"
				}
			]
		} as jsonSpec.CommandDefinition);

		static matches(packet: Packet): boolean {
			return packet.tryAs(SimpleAvControlV1)?.command === this.command;
		}

		constructor(data: Buffer | SimpleAvControlV1SimpleAvControlSupportedReportData) {
			super(SimpleAvControlSupportedReport, data);
		}
	};
}

export namespace SimpleAvControlV1 {
	export type SimpleAvControlGet = InstanceType<typeof SimpleAvControlV1.SimpleAvControlGet>;
	export type SimpleAvControlReport = InstanceType<typeof SimpleAvControlV1.SimpleAvControlReport>;
	export type SimpleAvControlSet = InstanceType<typeof SimpleAvControlV1.SimpleAvControlSet>;
	export type SimpleAvControlSupportedGet = InstanceType<typeof SimpleAvControlV1.SimpleAvControlSupportedGet>;
	export type SimpleAvControlSupportedReport = InstanceType<typeof SimpleAvControlV1.SimpleAvControlSupportedReport>;
}
