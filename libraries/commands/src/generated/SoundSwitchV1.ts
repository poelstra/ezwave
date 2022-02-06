/**
 * Command Class Sound Switch, version 1.
 *
 * Auto-generated, do not edit.
 */

import { CommandClasses, CommandClassPacket, CommandPacket, Packet } from "@ezwave/codec";
import { convertFromJsonCommand, JsonCommandDefinition } from "@ezwave/spec";

export enum SoundSwitchV1Commands {
	SoundSwitchTonesNumberGet = 0x01,
	SoundSwitchTonesNumberReport = 0x02,
	SoundSwitchToneInfoGet = 0x03,
	SoundSwitchToneInfoReport = 0x04,
	SoundSwitchConfigurationSet = 0x05,
	SoundSwitchConfigurationGet = 0x06,
	SoundSwitchConfigurationReport = 0x07,
	SoundSwitchTonePlaySet = 0x08,
	SoundSwitchTonePlayGet = 0x09,
	SoundSwitchTonePlayReport = 0x0a,
}

export interface SoundSwitchV1SoundSwitchTonesNumberReportData {
	supportedTones: number; // 1 byte unsigned integer
}

export interface SoundSwitchV1SoundSwitchToneInfoGetData {
	toneIdentifier: number; // 1 byte unsigned integer
}

export interface SoundSwitchV1SoundSwitchToneInfoReportData {
	toneIdentifier: number; // 1 byte unsigned integer
	toneDuration: number; // 2 byte unsigned integer
	name: string; // variable length
}

export interface SoundSwitchV1SoundSwitchConfigurationSetData {
	volume: number; // 1 byte unsigned integer
	defaultToneIdentifier: number; // 1 byte unsigned integer
}

export interface SoundSwitchV1SoundSwitchConfigurationReportData {
	volume: number; // 1 byte unsigned integer
	defaultToneIdentifer: number; // 1 byte unsigned integer
}

export interface SoundSwitchV1SoundSwitchTonePlaySetData {
	toneIdentifier: number; // 1 byte unsigned integer
}

export interface SoundSwitchV1SoundSwitchTonePlayReportData {
	toneIdentifier: number; // 1 byte unsigned integer
}

export class SoundSwitchV1 extends CommandClassPacket<SoundSwitchV1Commands> {
	public static readonly commandClass = CommandClasses.SoundSwitch; // 0x79 (121)
	public static readonly version = 1;

	public static matches(packet: Packet): boolean {
		return packet.commandClass === this.commandClass;
	}

	constructor(commandAndPayload: Buffer) {
		super(SoundSwitchV1, commandAndPayload);
	}
}

export class SoundSwitchTonesNumberGet extends CommandPacket<void> {
	public static readonly CommandClass = SoundSwitchV1;
	public static readonly command = 0x01; // 1
	public static readonly definition = convertFromJsonCommand({
		"command": 1,
		"name": "SoundSwitchTonesNumberGet",
		"help": "Sound Switch Tones Number Get",
		"status": "Active",
		"params": []
	} as JsonCommandDefinition);

	static matches(packet: Packet): boolean {
		return packet.tryAs(SoundSwitchV1)?.command === this.command;
	}

	constructor(data: Buffer | void) {
		super(SoundSwitchTonesNumberGet, data);
	}
};

export class SoundSwitchTonesNumberReport extends CommandPacket<SoundSwitchV1SoundSwitchTonesNumberReportData> {
	public static readonly CommandClass = SoundSwitchV1;
	public static readonly command = 0x02; // 2
	public static readonly definition = convertFromJsonCommand({
		"command": 2,
		"name": "SoundSwitchTonesNumberReport",
		"help": "Sound Switch Tones Number Report",
		"status": "Active",
		"params": [
			{
				"type": "Integer",
				"name": "supportedTones",
				"help": "Supported Tones",
				"length": 1
			}
		]
	} as JsonCommandDefinition);

	static matches(packet: Packet): boolean {
		return packet.tryAs(SoundSwitchV1)?.command === this.command;
	}

	constructor(data: Buffer | SoundSwitchV1SoundSwitchTonesNumberReportData) {
		super(SoundSwitchTonesNumberReport, data);
	}
};

export class SoundSwitchToneInfoGet extends CommandPacket<SoundSwitchV1SoundSwitchToneInfoGetData> {
	public static readonly CommandClass = SoundSwitchV1;
	public static readonly command = 0x03; // 3
	public static readonly definition = convertFromJsonCommand({
		"command": 3,
		"name": "SoundSwitchToneInfoGet",
		"help": "Sound Switch Tone Info Get",
		"status": "Active",
		"params": [
			{
				"type": "Integer",
				"name": "toneIdentifier",
				"help": "Tone Identifier",
				"length": 1
			}
		]
	} as JsonCommandDefinition);

	static matches(packet: Packet): boolean {
		return packet.tryAs(SoundSwitchV1)?.command === this.command;
	}

	constructor(data: Buffer | SoundSwitchV1SoundSwitchToneInfoGetData) {
		super(SoundSwitchToneInfoGet, data);
	}
};

export class SoundSwitchToneInfoReport extends CommandPacket<SoundSwitchV1SoundSwitchToneInfoReportData> {
	public static readonly CommandClass = SoundSwitchV1;
	public static readonly command = 0x04; // 4
	public static readonly definition = convertFromJsonCommand({
		"command": 4,
		"name": "SoundSwitchToneInfoReport",
		"help": "Sound Switch Tone Info Report",
		"status": "Active",
		"params": [
			{
				"type": "Integer",
				"name": "toneIdentifier",
				"help": "Tone Identifier",
				"length": 1
			},
			{
				"type": "Integer",
				"name": "toneDuration",
				"help": "Tone Duration",
				"length": 2
			},
			{
				"type": "Integer",
				"name": "nameLength",
				"help": "Name Length",
				"length": 1,
				"lengthOf": {
					"refs": [
						"name"
					]
				},
				"isAutogenerated": true
			},
			{
				"type": "Text",
				"name": "name",
				"help": "Name",
				"length": {
					"lengthType": "Ref",
					"from": {
						"ref": "nameLength"
					}
				}
			}
		]
	} as JsonCommandDefinition);

	static matches(packet: Packet): boolean {
		return packet.tryAs(SoundSwitchV1)?.command === this.command;
	}

	constructor(data: Buffer | SoundSwitchV1SoundSwitchToneInfoReportData) {
		super(SoundSwitchToneInfoReport, data);
	}
};

export class SoundSwitchConfigurationSet extends CommandPacket<SoundSwitchV1SoundSwitchConfigurationSetData> {
	public static readonly CommandClass = SoundSwitchV1;
	public static readonly command = 0x05; // 5
	public static readonly definition = convertFromJsonCommand({
		"command": 5,
		"name": "SoundSwitchConfigurationSet",
		"help": "Sound Switch Configuration Set",
		"status": "Active",
		"params": [
			{
				"type": "Integer",
				"name": "volume",
				"help": "Volume",
				"length": 1
			},
			{
				"type": "Integer",
				"name": "defaultToneIdentifier",
				"help": "Default Tone Identifier",
				"length": 1
			}
		]
	} as JsonCommandDefinition);

	static matches(packet: Packet): boolean {
		return packet.tryAs(SoundSwitchV1)?.command === this.command;
	}

	constructor(data: Buffer | SoundSwitchV1SoundSwitchConfigurationSetData) {
		super(SoundSwitchConfigurationSet, data);
	}
};

export class SoundSwitchConfigurationGet extends CommandPacket<void> {
	public static readonly CommandClass = SoundSwitchV1;
	public static readonly command = 0x06; // 6
	public static readonly definition = convertFromJsonCommand({
		"command": 6,
		"name": "SoundSwitchConfigurationGet",
		"help": "Sound Switch Configuration Get",
		"status": "Active",
		"params": []
	} as JsonCommandDefinition);

	static matches(packet: Packet): boolean {
		return packet.tryAs(SoundSwitchV1)?.command === this.command;
	}

	constructor(data: Buffer | void) {
		super(SoundSwitchConfigurationGet, data);
	}
};

export class SoundSwitchConfigurationReport extends CommandPacket<SoundSwitchV1SoundSwitchConfigurationReportData> {
	public static readonly CommandClass = SoundSwitchV1;
	public static readonly command = 0x07; // 7
	public static readonly definition = convertFromJsonCommand({
		"command": 7,
		"name": "SoundSwitchConfigurationReport",
		"help": "Sound Switch Configuration Report",
		"status": "Active",
		"params": [
			{
				"type": "Integer",
				"name": "volume",
				"help": "Volume",
				"length": 1
			},
			{
				"type": "Integer",
				"name": "defaultToneIdentifer",
				"help": "Default Tone Identifer",
				"length": 1
			}
		]
	} as JsonCommandDefinition);

	static matches(packet: Packet): boolean {
		return packet.tryAs(SoundSwitchV1)?.command === this.command;
	}

	constructor(data: Buffer | SoundSwitchV1SoundSwitchConfigurationReportData) {
		super(SoundSwitchConfigurationReport, data);
	}
};

export class SoundSwitchTonePlaySet extends CommandPacket<SoundSwitchV1SoundSwitchTonePlaySetData> {
	public static readonly CommandClass = SoundSwitchV1;
	public static readonly command = 0x08; // 8
	public static readonly definition = convertFromJsonCommand({
		"command": 8,
		"name": "SoundSwitchTonePlaySet",
		"help": "Sound Switch Tone Play Set",
		"status": "Active",
		"params": [
			{
				"type": "Integer",
				"name": "toneIdentifier",
				"help": "Tone identifier",
				"length": 1
			}
		]
	} as JsonCommandDefinition);

	static matches(packet: Packet): boolean {
		return packet.tryAs(SoundSwitchV1)?.command === this.command;
	}

	constructor(data: Buffer | SoundSwitchV1SoundSwitchTonePlaySetData) {
		super(SoundSwitchTonePlaySet, data);
	}
};

export class SoundSwitchTonePlayGet extends CommandPacket<void> {
	public static readonly CommandClass = SoundSwitchV1;
	public static readonly command = 0x09; // 9
	public static readonly definition = convertFromJsonCommand({
		"command": 9,
		"name": "SoundSwitchTonePlayGet",
		"help": "Sound Switch Tone Play Get",
		"status": "Active",
		"params": []
	} as JsonCommandDefinition);

	static matches(packet: Packet): boolean {
		return packet.tryAs(SoundSwitchV1)?.command === this.command;
	}

	constructor(data: Buffer | void) {
		super(SoundSwitchTonePlayGet, data);
	}
};

export class SoundSwitchTonePlayReport extends CommandPacket<SoundSwitchV1SoundSwitchTonePlayReportData> {
	public static readonly CommandClass = SoundSwitchV1;
	public static readonly command = 0x0a; // 10
	public static readonly definition = convertFromJsonCommand({
		"command": 10,
		"name": "SoundSwitchTonePlayReport",
		"help": "Sound Switch Tone Play Report",
		"status": "Active",
		"params": [
			{
				"type": "Integer",
				"name": "toneIdentifier",
				"help": "Tone Identifier",
				"length": 1
			}
		]
	} as JsonCommandDefinition);

	static matches(packet: Packet): boolean {
		return packet.tryAs(SoundSwitchV1)?.command === this.command;
	}

	constructor(data: Buffer | SoundSwitchV1SoundSwitchTonePlayReportData) {
		super(SoundSwitchTonePlayReport, data);
	}
};
