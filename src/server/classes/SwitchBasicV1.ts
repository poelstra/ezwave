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

import CommandClasses from "../../generated/CommandClasses";
import { CommandPacket, CommandClassPacket } from "../command";

const emptyBuffer = Buffer.alloc(0);

export interface BasicV1SetData {
	value: number; // 1 byte unsigned integer
}

class BasicV1Set extends CommandPacket<BasicV1SetData> {
	static commandClass = CommandClasses.COMMAND_CLASS_BASIC;
	static command = 0x01;
	static version = 1;
	static encode = (payload: BasicV1SetData) => {
		if (payload.value === undefined) {
			throw new Error("missing value");
		}
		return Buffer.from([payload.value]);
	};
	static decode = (buffer: Buffer): BasicV1SetData => ({
		value: buffer[0],
	});

	constructor(payload: Buffer | BasicV1SetData) {
		super(BasicV1Set, payload);
	}
}

export interface BasicV1ReportData {
	value: number;
}

class BasicV1Report extends CommandPacket<BasicV1ReportData> {
	static commandClass = CommandClasses.COMMAND_CLASS_BASIC;
	static command = 0x03;
	static version = 1;
	static encode = (payload: BasicV1ReportData) => {
		if (payload.value === undefined) {
			throw new Error("missing value");
		}
		return Buffer.from([payload.value]);
	};
	static decode = (buffer: Buffer): BasicV1ReportData => ({
		value: buffer[0],
	});

	constructor(payload: Buffer | BasicV1ReportData) {
		super(BasicV1Report, payload);
	}
}

export type BasicV1GetData = void;

class BasicV1Get extends CommandPacket<BasicV1GetData> {
	static commandClass = CommandClasses.COMMAND_CLASS_BASIC;
	static command = 0x02;
	static version = 1;
	static encode = (payload: BasicV1GetData) => {
		return emptyBuffer;
	};
	static decode = (buffer: Buffer): BasicV1GetData => undefined;

	constructor(payload: Buffer | BasicV1GetData) {
		super(BasicV1Get, payload);
	}
}

export class BasicV1 extends CommandClassPacket {
	static commandClass = CommandClasses.COMMAND_CLASS_BASIC;

	constructor(command: number, payload: Buffer) {
		super(BasicV1.commandClass, command, payload);
	}

	public static Set = BasicV1Set;
	public static Get = BasicV1Get;
	public static Report = BasicV1Report;
}

export namespace BasicV1 {
	export type Set = BasicV1Set;
	export type Get = BasicV1Get;
	export type Report = BasicV1Report;
}
