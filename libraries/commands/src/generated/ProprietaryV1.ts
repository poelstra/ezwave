/**
 * Command Class Proprietary, version 1.
 *
 * Auto-generated, do not edit.
 */

import { CommandClasses, CommandClassPacket, CommandPacket, Packet } from "@ezwave/codec";
import { CommandDefinition, convertFromJsonCommand, JsonCommandDefinition } from "@ezwave/spec";

export enum ProprietaryV1Commands {
	ProprietaryGet = 0x02,
	ProprietaryReport = 0x03,
	ProprietarySet = 0x01,
}

export interface ProprietaryV1ProprietaryGetData {
	data: Buffer; // automatic length
}

export interface ProprietaryV1ProprietaryReportData {
	data: Buffer; // automatic length
}

export interface ProprietaryV1ProprietarySetData {
	data: Buffer; // automatic length
}

// This (version of the) command class is Deprecated
export class ProprietaryV1 extends CommandClassPacket<ProprietaryV1Commands> {
	public static readonly commandClass: number = CommandClasses.Proprietary; // 0x88 (136)
	public static readonly version: number = 1;

	public static matches(packet: Packet): boolean {
		return packet.commandClass === this.commandClass;
	}

	public constructor(commandAndPayload: Buffer) {
		super(ProprietaryV1, commandAndPayload);
	}
}

export class ProprietaryGet extends CommandPacket<ProprietaryV1ProprietaryGetData> {
	public static readonly CommandClass: typeof ProprietaryV1 = ProprietaryV1;
	public static readonly command: number = 0x02; // 2
	public static readonly definition: CommandDefinition = convertFromJsonCommand({
		"command": 2,
		"name": "ProprietaryGet",
		"help": "Proprietary Get",
		"status": "Active",
		"params": [
			{
				"type": "Blob",
				"name": "data",
				"help": "Data",
				"length": {
					"lengthType": "Auto"
				}
			}
		]
	} as JsonCommandDefinition);

	public static matches(packet: Packet): boolean {
		return packet.tryAs(ProprietaryV1)?.command === this.command;
	}

	public constructor(data: Buffer | ProprietaryV1ProprietaryGetData) {
		super(ProprietaryGet, data);
	}
};

export class ProprietaryReport extends CommandPacket<ProprietaryV1ProprietaryReportData> {
	public static readonly CommandClass: typeof ProprietaryV1 = ProprietaryV1;
	public static readonly command: number = 0x03; // 3
	public static readonly definition: CommandDefinition = convertFromJsonCommand({
		"command": 3,
		"name": "ProprietaryReport",
		"help": "Proprietary Report",
		"status": "Active",
		"params": [
			{
				"type": "Blob",
				"name": "data",
				"help": "Data",
				"length": {
					"lengthType": "Auto"
				}
			}
		]
	} as JsonCommandDefinition);

	public static matches(packet: Packet): boolean {
		return packet.tryAs(ProprietaryV1)?.command === this.command;
	}

	public constructor(data: Buffer | ProprietaryV1ProprietaryReportData) {
		super(ProprietaryReport, data);
	}
};

export class ProprietarySet extends CommandPacket<ProprietaryV1ProprietarySetData> {
	public static readonly CommandClass: typeof ProprietaryV1 = ProprietaryV1;
	public static readonly command: number = 0x01; // 1
	public static readonly definition: CommandDefinition = convertFromJsonCommand({
		"command": 1,
		"name": "ProprietarySet",
		"help": "Proprietary Set",
		"status": "Active",
		"params": [
			{
				"type": "Blob",
				"name": "data",
				"help": "Data",
				"length": {
					"lengthType": "Auto"
				}
			}
		]
	} as JsonCommandDefinition);

	public static matches(packet: Packet): boolean {
		return packet.tryAs(ProprietaryV1)?.command === this.command;
	}

	public constructor(data: Buffer | ProprietaryV1ProprietarySetData) {
		super(ProprietarySet, data);
	}
};
