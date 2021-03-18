/**
 * Command Class Multi Instance, version 1.
 *
 * Auto-generated, do not edit.
 */

import { CommandClassPacket, CommandPacket } from "../command";
import * as jsonSpec from "../jsonSpec";
import { Packet } from "../packet";
import { convertFromJsonCommand } from "../specHelpers";
import CommandClasses from "./CommandClasses";

export enum MultiInstanceV1Commands {
	MultiInstanceCmdEncap = 0x06,
	MultiInstanceGet = 0x04,
	MultiInstanceReport = 0x05,
}

export interface MultiInstanceV1MultiInstanceCmdEncapData {
	instance: number; // 1 byte unsigned integer
	commandClass: number; // 1 byte unsigned integer
	command: number; // 1 byte unsigned integer
	parameter: Buffer; // automatic length
}

export interface MultiInstanceV1MultiInstanceGetData {
	commandClass: number; // 1 byte unsigned integer
}

export interface MultiInstanceV1MultiInstanceReportData {
	commandClass: number; // 1 byte unsigned integer
	instances: number; // 1 byte unsigned integer
}

// Obsolete
export class MultiInstanceV1 extends CommandClassPacket<MultiInstanceV1Commands> {
	public static readonly commandClass = CommandClasses.MultiInstance; // 0x60 (96)
	public static readonly version = 1;

	public static matches(packet: Packet): boolean {
		return packet.commandClass === this.commandClass;
	}

	constructor(commandAndPayload: Buffer) {
		super(MultiInstanceV1, commandAndPayload);
	}

	public static readonly MultiInstanceCmdEncap = class MultiInstanceCmdEncap extends CommandPacket<MultiInstanceV1MultiInstanceCmdEncapData> {
		public static readonly CommandClass = MultiInstanceV1;
		public static readonly command = 0x06;
		public static readonly definition = convertFromJsonCommand({
			"command": 6,
			"name": "MultiInstanceCmdEncap",
			"help": "Multi Instance Cmd Encap",
			"status": "Active",
			"params": [
				{
					"type": "Integer",
					"name": "instance",
					"help": "Instance",
					"length": 1
				},
				{
					"type": "Integer",
					"name": "commandClass",
					"help": "Command Class",
					"length": 1,
					"valueType": "CommandClass"
				},
				{
					"type": "Integer",
					"name": "command",
					"help": "Command",
					"length": 1,
					"valueType": "Command"
				},
				{
					"type": "Blob",
					"name": "parameter",
					"help": "Parameter",
					"length": {
						"lengthType": "Auto"
					},
					"blobType": "CommandData"
				}
			]
		} as jsonSpec.CommandDefinition);

		static matches(packet: Packet): boolean {
			return packet.tryAs(MultiInstanceV1)?.command === this.command;
		}

		constructor(data: Buffer | MultiInstanceV1MultiInstanceCmdEncapData) {
			super(MultiInstanceCmdEncap, data);
		}
	};

	public static readonly MultiInstanceGet = class MultiInstanceGet extends CommandPacket<MultiInstanceV1MultiInstanceGetData> {
		public static readonly CommandClass = MultiInstanceV1;
		public static readonly command = 0x04;
		public static readonly definition = convertFromJsonCommand({
			"command": 4,
			"name": "MultiInstanceGet",
			"help": "Multi Instance Get",
			"status": "Active",
			"params": [
				{
					"type": "Integer",
					"name": "commandClass",
					"help": "Command Class",
					"length": 1,
					"valueType": "CommandClass"
				}
			]
		} as jsonSpec.CommandDefinition);

		static matches(packet: Packet): boolean {
			return packet.tryAs(MultiInstanceV1)?.command === this.command;
		}

		constructor(data: Buffer | MultiInstanceV1MultiInstanceGetData) {
			super(MultiInstanceGet, data);
		}
	};

	public static readonly MultiInstanceReport = class MultiInstanceReport extends CommandPacket<MultiInstanceV1MultiInstanceReportData> {
		public static readonly CommandClass = MultiInstanceV1;
		public static readonly command = 0x05;
		public static readonly definition = convertFromJsonCommand({
			"command": 5,
			"name": "MultiInstanceReport",
			"help": "Multi Instance Report",
			"status": "Active",
			"params": [
				{
					"type": "Integer",
					"name": "commandClass",
					"help": "Command Class",
					"length": 1,
					"valueType": "CommandClass"
				},
				{
					"type": "Integer",
					"name": "instances",
					"help": "Instances",
					"length": 1
				}
			]
		} as jsonSpec.CommandDefinition);

		static matches(packet: Packet): boolean {
			return packet.tryAs(MultiInstanceV1)?.command === this.command;
		}

		constructor(data: Buffer | MultiInstanceV1MultiInstanceReportData) {
			super(MultiInstanceReport, data);
		}
	};
}

export namespace MultiInstanceV1 {
	export type MultiInstanceCmdEncap = InstanceType<typeof MultiInstanceV1.MultiInstanceCmdEncap>;
	export type MultiInstanceGet = InstanceType<typeof MultiInstanceV1.MultiInstanceGet>;
	export type MultiInstanceReport = InstanceType<typeof MultiInstanceV1.MultiInstanceReport>;
}
