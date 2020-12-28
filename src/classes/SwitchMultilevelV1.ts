/**
 * Hand-crafted version of SwitchMultilevel command class, to be
 * auto-generated in the future.
 *
 * This implementation mainly serves to get a good understanding of
 * final necessary implementation.
 *
 * Note: not all commands have been implemented on this implementation,
 * and decoding/encoding is also 'by hand' for now. All of this will
 * automatically start working correctly when auto-generated.
 */

import { CommandClassPacket, CommandPacket } from "../commands/command";
import { Packet } from "../commands/packet";
import CommandClasses from "../generated/CommandClasses";

export enum SwitchMultilevelV1Commands {
	Set = 0x1,
	Get = 0x2,
	Report = 0x3,
}

export interface SwitchMultilevelV1SetData {
	value: number; // 1 byte unsigned integer
}

export interface SwitchMultilevelV1ReportData {
	value: number;
}

export type SwitchMultilevelV1GetData = void;

export class SwitchMultilevelV1 extends CommandClassPacket<SwitchMultilevelV1Commands> {
	static commandClass = CommandClasses.COMMAND_CLASS_SWITCH_MULTILEVEL;
	static version = 1;
	static commands = SwitchMultilevelV1Commands;

	static matches(packet: Packet): boolean {
		return packet.commandClass === this.commandClass;
	}

	constructor(commandAndPayload: Buffer) {
		super(SwitchMultilevelV1, commandAndPayload);
	}

	public static Set = class SwitchMultilevelV1Set extends CommandPacket<SwitchMultilevelV1SetData> {
		static CommandClass = SwitchMultilevelV1;
		static command = SwitchMultilevelV1Commands.Set;

		static matches(packet: Packet): boolean {
			return packet.tryAs(this.CommandClass)?.command === this.command;
		}

		static encode(payload: SwitchMultilevelV1SetData) {
			if (payload.value === undefined) {
				throw new Error("missing value");
			}
			return Buffer.from([this.command, payload.value]);
		}

		static decode = (buffer: Buffer): SwitchMultilevelV1SetData => ({
			value: buffer[1],
		});

		constructor(payload: Buffer | SwitchMultilevelV1SetData) {
			super(SwitchMultilevelV1Set, payload);
		}
	};

	public static Get = class SwitchMultilevelV1Get extends CommandPacket<SwitchMultilevelV1GetData> {
		static CommandClass = SwitchMultilevelV1;
		static command = SwitchMultilevelV1Commands.Get;

		static matches(packet: Packet): boolean {
			return packet.tryAs(SwitchMultilevelV1)?.command === this.command;
		}

		static encode(payload: SwitchMultilevelV1GetData) {
			return Buffer.from([this.command]);
		}

		static decode = (buffer: Buffer): SwitchMultilevelV1GetData =>
			undefined;

		constructor(data: Buffer | SwitchMultilevelV1GetData) {
			super(SwitchMultilevelV1Get, data);
		}
	};

	public static Report = class SwitchMultilevelV1Report extends CommandPacket<SwitchMultilevelV1ReportData> {
		static CommandClass = SwitchMultilevelV1;
		static command = SwitchMultilevelV1Commands.Report;

		static matches(packet: Packet): boolean {
			return packet.tryAs(SwitchMultilevelV1)?.command === this.command;
		}

		static encode(payload: SwitchMultilevelV1ReportData) {
			if (payload.value === undefined) {
				throw new Error("missing value");
			}
			return Buffer.from([this.command, payload.value]);
		}

		static decode = (buffer: Buffer): SwitchMultilevelV1ReportData => ({
			value: buffer[1],
		});

		constructor(data: Buffer | SwitchMultilevelV1ReportData) {
			super(SwitchMultilevelV1Report, data);
		}
	};
}

export namespace SwitchMultilevelV1 {
	export type Set = InstanceType<typeof SwitchMultilevelV1.Set>;
	export type Get = InstanceType<typeof SwitchMultilevelV1.Get>;
	export type Report = InstanceType<typeof SwitchMultilevelV1.Report>;
}
