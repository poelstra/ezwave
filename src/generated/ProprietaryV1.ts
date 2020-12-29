/**
 * Command Class Proprietary, version 1.
 *
 * Auto-generated, do not edit.
 */

import { CommandClassPacket, CommandPacket } from "../commands/command";
import { Packet } from "../commands/packet";
import { CommandDefinition } from "../commands/types";
import CommandClasses from "../generated/CommandClasses";

export enum ProprietaryV1Commands {
	ProprietaryGet = 0x02,
	ProprietaryReport = 0x03,
	ProprietarySet = 0x01,
}

export interface ProprietaryV1ProprietaryGetData {
	// TODO param data type blob
}

export interface ProprietaryV1ProprietaryReportData {
	// TODO param data type blob
}

export interface ProprietaryV1ProprietarySetData {
	// TODO param data type blob
}

// Deprecated
export class ProprietaryV1 extends CommandClassPacket<ProprietaryV1Commands> {
	public static readonly commandClass = CommandClasses.Proprietary; // 0x88 (136)

	public static matches(packet: Packet): boolean {
		return packet.commandClass === this.commandClass;
	}

	constructor(commandAndPayload: Buffer) {
		super(ProprietaryV1, commandAndPayload);
	}

	public static readonly ProprietaryGet = class ProprietaryGet extends CommandPacket<ProprietaryV1ProprietaryGetData> {
		public static readonly CommandClass = ProprietaryV1;
		public static readonly command = 0x02;
		public static readonly definition = {
			"command": 2,
			"name": "ProprietaryGet",
			"help": "Proprietary Get",
			"status": "active",
			"params": [
				{
					"type": "blob",
					"name": "data",
					"help": "Data",
					"length": "auto"
				}
			]
		} as CommandDefinition;

		static matches(packet: Packet): boolean {
			return packet.tryAs(ProprietaryV1)?.command === this.command;
		}

		constructor(data: Buffer | ProprietaryV1ProprietaryGetData) {
			super(ProprietaryGet, data);
		}
	};

	public static readonly ProprietaryReport = class ProprietaryReport extends CommandPacket<ProprietaryV1ProprietaryReportData> {
		public static readonly CommandClass = ProprietaryV1;
		public static readonly command = 0x03;
		public static readonly definition = {
			"command": 3,
			"name": "ProprietaryReport",
			"help": "Proprietary Report",
			"status": "active",
			"params": [
				{
					"type": "blob",
					"name": "data",
					"help": "Data",
					"length": "auto"
				}
			]
		} as CommandDefinition;

		static matches(packet: Packet): boolean {
			return packet.tryAs(ProprietaryV1)?.command === this.command;
		}

		constructor(data: Buffer | ProprietaryV1ProprietaryReportData) {
			super(ProprietaryReport, data);
		}
	};

	public static readonly ProprietarySet = class ProprietarySet extends CommandPacket<ProprietaryV1ProprietarySetData> {
		public static readonly CommandClass = ProprietaryV1;
		public static readonly command = 0x01;
		public static readonly definition = {
			"command": 1,
			"name": "ProprietarySet",
			"help": "Proprietary Set",
			"status": "active",
			"params": [
				{
					"type": "blob",
					"name": "data",
					"help": "Data",
					"length": "auto"
				}
			]
		} as CommandDefinition;

		static matches(packet: Packet): boolean {
			return packet.tryAs(ProprietaryV1)?.command === this.command;
		}

		constructor(data: Buffer | ProprietaryV1ProprietarySetData) {
			super(ProprietarySet, data);
		}
	};
}

export namespace ProprietaryV1 {
	export type ProprietaryGet = InstanceType<typeof ProprietaryV1.ProprietaryGet>;
	export type ProprietaryReport = InstanceType<typeof ProprietaryV1.ProprietaryReport>;
	export type ProprietarySet = InstanceType<typeof ProprietaryV1.ProprietarySet>;
}
