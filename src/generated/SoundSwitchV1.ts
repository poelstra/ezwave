/**
 * Command Class Sound Switch, version 1.
 *
 * Auto-generated, do not edit.
 */

import { CommandClassPacket, CommandPacket } from "../commands/command";
import { Packet } from "../commands/packet";
import { CommandDefinition } from "../commands/types";
import CommandClasses from "../generated/CommandClasses";

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
	nameLength: number; // 1 byte unsigned integer
	// TODO param name type text
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

	public static matches(packet: Packet): boolean {
		return packet.commandClass === this.commandClass;
	}

	constructor(commandAndPayload: Buffer) {
		super(SoundSwitchV1, commandAndPayload);
	}

	public static readonly SoundSwitchTonesNumberGet = class SoundSwitchTonesNumberGet extends CommandPacket<void> {
		public static readonly CommandClass = SoundSwitchV1;
		public static readonly command = 0x01;
		public static readonly definition = {
			"command": 1,
			"name": "SoundSwitchTonesNumberGet",
			"help": "Sound Switch Tones Number Get",
			"status": "active",
			"params": []
		} as CommandDefinition;

		static matches(packet: Packet): boolean {
			return packet.tryAs(SoundSwitchV1)?.command === this.command;
		}

		constructor(data: Buffer | void) {
			super(SoundSwitchTonesNumberGet, data);
		}
	};

	public static readonly SoundSwitchTonesNumberReport = class SoundSwitchTonesNumberReport extends CommandPacket<SoundSwitchV1SoundSwitchTonesNumberReportData> {
		public static readonly CommandClass = SoundSwitchV1;
		public static readonly command = 0x02;
		public static readonly definition = {
			"command": 2,
			"name": "SoundSwitchTonesNumberReport",
			"help": "Sound Switch Tones Number Report",
			"status": "active",
			"params": [
				{
					"type": "integer",
					"name": "supportedTones",
					"help": "Supported Tones",
					"length": 1
				}
			]
		} as CommandDefinition;

		static matches(packet: Packet): boolean {
			return packet.tryAs(SoundSwitchV1)?.command === this.command;
		}

		constructor(data: Buffer | SoundSwitchV1SoundSwitchTonesNumberReportData) {
			super(SoundSwitchTonesNumberReport, data);
		}
	};

	public static readonly SoundSwitchToneInfoGet = class SoundSwitchToneInfoGet extends CommandPacket<SoundSwitchV1SoundSwitchToneInfoGetData> {
		public static readonly CommandClass = SoundSwitchV1;
		public static readonly command = 0x03;
		public static readonly definition = {
			"command": 3,
			"name": "SoundSwitchToneInfoGet",
			"help": "Sound Switch Tone Info Get",
			"status": "active",
			"params": [
				{
					"type": "integer",
					"name": "toneIdentifier",
					"help": "Tone Identifier",
					"length": 1
				}
			]
		} as CommandDefinition;

		static matches(packet: Packet): boolean {
			return packet.tryAs(SoundSwitchV1)?.command === this.command;
		}

		constructor(data: Buffer | SoundSwitchV1SoundSwitchToneInfoGetData) {
			super(SoundSwitchToneInfoGet, data);
		}
	};

	public static readonly SoundSwitchToneInfoReport = class SoundSwitchToneInfoReport extends CommandPacket<SoundSwitchV1SoundSwitchToneInfoReportData> {
		public static readonly CommandClass = SoundSwitchV1;
		public static readonly command = 0x04;
		public static readonly definition = {
			"command": 4,
			"name": "SoundSwitchToneInfoReport",
			"help": "Sound Switch Tone Info Report",
			"status": "active",
			"params": [
				{
					"type": "integer",
					"name": "toneIdentifier",
					"help": "Tone Identifier",
					"length": 1
				},
				{
					"type": "integer",
					"name": "toneDuration",
					"help": "Tone Duration",
					"length": 2
				},
				{
					"type": "integer",
					"name": "nameLength",
					"help": "Name Length",
					"length": 1
				},
				{
					"type": "text",
					"name": "name",
					"help": "Name",
					"length": {
						"name": "Name Length"
					}
				}
			]
		} as CommandDefinition;

		static matches(packet: Packet): boolean {
			return packet.tryAs(SoundSwitchV1)?.command === this.command;
		}

		constructor(data: Buffer | SoundSwitchV1SoundSwitchToneInfoReportData) {
			super(SoundSwitchToneInfoReport, data);
		}
	};

	public static readonly SoundSwitchConfigurationSet = class SoundSwitchConfigurationSet extends CommandPacket<SoundSwitchV1SoundSwitchConfigurationSetData> {
		public static readonly CommandClass = SoundSwitchV1;
		public static readonly command = 0x05;
		public static readonly definition = {
			"command": 5,
			"name": "SoundSwitchConfigurationSet",
			"help": "Sound Switch Configuration Set",
			"status": "active",
			"params": [
				{
					"type": "integer",
					"name": "volume",
					"help": "Volume",
					"length": 1
				},
				{
					"type": "integer",
					"name": "defaultToneIdentifier",
					"help": "Default Tone Identifier",
					"length": 1
				}
			]
		} as CommandDefinition;

		static matches(packet: Packet): boolean {
			return packet.tryAs(SoundSwitchV1)?.command === this.command;
		}

		constructor(data: Buffer | SoundSwitchV1SoundSwitchConfigurationSetData) {
			super(SoundSwitchConfigurationSet, data);
		}
	};

	public static readonly SoundSwitchConfigurationGet = class SoundSwitchConfigurationGet extends CommandPacket<void> {
		public static readonly CommandClass = SoundSwitchV1;
		public static readonly command = 0x06;
		public static readonly definition = {
			"command": 6,
			"name": "SoundSwitchConfigurationGet",
			"help": "Sound Switch Configuration Get",
			"status": "active",
			"params": []
		} as CommandDefinition;

		static matches(packet: Packet): boolean {
			return packet.tryAs(SoundSwitchV1)?.command === this.command;
		}

		constructor(data: Buffer | void) {
			super(SoundSwitchConfigurationGet, data);
		}
	};

	public static readonly SoundSwitchConfigurationReport = class SoundSwitchConfigurationReport extends CommandPacket<SoundSwitchV1SoundSwitchConfigurationReportData> {
		public static readonly CommandClass = SoundSwitchV1;
		public static readonly command = 0x07;
		public static readonly definition = {
			"command": 7,
			"name": "SoundSwitchConfigurationReport",
			"help": "Sound Switch Configuration Report",
			"status": "active",
			"params": [
				{
					"type": "integer",
					"name": "volume",
					"help": "Volume",
					"length": 1
				},
				{
					"type": "integer",
					"name": "defaultToneIdentifer",
					"help": "Default Tone Identifer",
					"length": 1
				}
			]
		} as CommandDefinition;

		static matches(packet: Packet): boolean {
			return packet.tryAs(SoundSwitchV1)?.command === this.command;
		}

		constructor(data: Buffer | SoundSwitchV1SoundSwitchConfigurationReportData) {
			super(SoundSwitchConfigurationReport, data);
		}
	};

	public static readonly SoundSwitchTonePlaySet = class SoundSwitchTonePlaySet extends CommandPacket<SoundSwitchV1SoundSwitchTonePlaySetData> {
		public static readonly CommandClass = SoundSwitchV1;
		public static readonly command = 0x08;
		public static readonly definition = {
			"command": 8,
			"name": "SoundSwitchTonePlaySet",
			"help": "Sound Switch Tone Play Set",
			"status": "active",
			"params": [
				{
					"type": "integer",
					"name": "toneIdentifier",
					"help": "Tone identifier",
					"length": 1
				}
			]
		} as CommandDefinition;

		static matches(packet: Packet): boolean {
			return packet.tryAs(SoundSwitchV1)?.command === this.command;
		}

		constructor(data: Buffer | SoundSwitchV1SoundSwitchTonePlaySetData) {
			super(SoundSwitchTonePlaySet, data);
		}
	};

	public static readonly SoundSwitchTonePlayGet = class SoundSwitchTonePlayGet extends CommandPacket<void> {
		public static readonly CommandClass = SoundSwitchV1;
		public static readonly command = 0x09;
		public static readonly definition = {
			"command": 9,
			"name": "SoundSwitchTonePlayGet",
			"help": "Sound Switch Tone Play Get",
			"status": "active",
			"params": []
		} as CommandDefinition;

		static matches(packet: Packet): boolean {
			return packet.tryAs(SoundSwitchV1)?.command === this.command;
		}

		constructor(data: Buffer | void) {
			super(SoundSwitchTonePlayGet, data);
		}
	};

	public static readonly SoundSwitchTonePlayReport = class SoundSwitchTonePlayReport extends CommandPacket<SoundSwitchV1SoundSwitchTonePlayReportData> {
		public static readonly CommandClass = SoundSwitchV1;
		public static readonly command = 0x0a;
		public static readonly definition = {
			"command": 10,
			"name": "SoundSwitchTonePlayReport",
			"help": "Sound Switch Tone Play Report",
			"status": "active",
			"params": [
				{
					"type": "integer",
					"name": "toneIdentifier",
					"help": "Tone Identifier",
					"length": 1
				}
			]
		} as CommandDefinition;

		static matches(packet: Packet): boolean {
			return packet.tryAs(SoundSwitchV1)?.command === this.command;
		}

		constructor(data: Buffer | SoundSwitchV1SoundSwitchTonePlayReportData) {
			super(SoundSwitchTonePlayReport, data);
		}
	};
}

export namespace SoundSwitchV1 {
	export type SoundSwitchTonesNumberGet = InstanceType<typeof SoundSwitchV1.SoundSwitchTonesNumberGet>;
	export type SoundSwitchTonesNumberReport = InstanceType<typeof SoundSwitchV1.SoundSwitchTonesNumberReport>;
	export type SoundSwitchToneInfoGet = InstanceType<typeof SoundSwitchV1.SoundSwitchToneInfoGet>;
	export type SoundSwitchToneInfoReport = InstanceType<typeof SoundSwitchV1.SoundSwitchToneInfoReport>;
	export type SoundSwitchConfigurationSet = InstanceType<typeof SoundSwitchV1.SoundSwitchConfigurationSet>;
	export type SoundSwitchConfigurationGet = InstanceType<typeof SoundSwitchV1.SoundSwitchConfigurationGet>;
	export type SoundSwitchConfigurationReport = InstanceType<typeof SoundSwitchV1.SoundSwitchConfigurationReport>;
	export type SoundSwitchTonePlaySet = InstanceType<typeof SoundSwitchV1.SoundSwitchTonePlaySet>;
	export type SoundSwitchTonePlayGet = InstanceType<typeof SoundSwitchV1.SoundSwitchTonePlayGet>;
	export type SoundSwitchTonePlayReport = InstanceType<typeof SoundSwitchV1.SoundSwitchTonePlayReport>;
}
