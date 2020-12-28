/**
 * Hand-crafted version of BasicV1 command class, to be
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

export enum BasicV1Commands {
	Set = 0x01,
	Get = 0x02,
	Report = 0x03,
}

export interface BasicV1SetData {
	value: number; // 1 byte unsigned integer
}

export interface BasicV1ReportData {
	value: number;
}

export type BasicV1GetData = void;

export class BasicV1 extends CommandClassPacket<BasicV1Commands> {
	static commandClass = CommandClasses.COMMAND_CLASS_BASIC;

	static matches(packet: Packet): boolean {
		return packet.commandClass === this.commandClass;
	}

	constructor(commandAndPayload: Buffer) {
		super(BasicV1, commandAndPayload);
	}

	public static Set = class BasicV1Set extends CommandPacket<BasicV1SetData> {
		static CommandClass = BasicV1;
		static command = 0x01;
		static matches(packet: Packet): boolean {
			return packet.tryAs(BasicV1)?.command === this.command;
		}
		static encode(payload: BasicV1SetData) {
			if (payload.value === undefined) {
				throw new Error("missing value");
			}
			return Buffer.from([this.command, payload.value]);
		}
		static decode = (buffer: Buffer): BasicV1SetData => ({
			value: buffer[1],
		});

		constructor(data: Buffer | BasicV1SetData) {
			super(BasicV1Set, data);
		}
	};

	public static Get = class BasicV1Get extends CommandPacket<BasicV1GetData> {
		static CommandClass = BasicV1;
		static command = 0x02;
		static matches(packet: Packet): boolean {
			return packet.tryAs(BasicV1)?.command === this.command;
		}
		static encode(payload: BasicV1GetData) {
			return Buffer.from([this.command]);
		}
		static decode = (buffer: Buffer): BasicV1GetData => undefined;

		constructor(data: Buffer | BasicV1GetData) {
			super(BasicV1Get, data);
		}
	};

	public static Report = class BasicV1Report extends CommandPacket<BasicV1ReportData> {
		static CommandClass = BasicV1;
		static command = 0x03;
		static matches(packet: Packet): boolean {
			return packet.tryAs(BasicV1)?.command === this.command;
		}
		static encode(payload: BasicV1ReportData) {
			if (payload.value === undefined) {
				throw new Error("missing value");
			}
			return Buffer.from([this.command, payload.value]);
		}
		static decode = (buffer: Buffer): BasicV1ReportData => ({
			value: buffer[1],
		});

		constructor(data: Buffer | BasicV1ReportData) {
			super(BasicV1Report, data);
		}
	};
}
