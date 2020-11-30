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

import CommandClasses from "../generated/CommandClasses";
import { CommandPacket, CommandClassPacket } from "../commands/command";

const emptyBuffer = Buffer.alloc(0);

enum SwitchMultilevelV1CommandsEnum {
	Set = 0x1,
	Get = 0x2,
	Report = 0x3,
}

export interface SwitchMultilevelV1SetData {
	value: number; // 1 byte unsigned integer
}

class SwitchMultilevelV1Set extends CommandPacket<SwitchMultilevelV1SetData> {
	static commandClass = CommandClasses.COMMAND_CLASS_SWITCH_MULTILEVEL;
	static command = SwitchMultilevelV1CommandsEnum.Set;
	static version = 1;
	static encode = (payload: SwitchMultilevelV1SetData) => {
		if (payload.value === undefined) {
			throw new Error("missing value");
		}
		return Buffer.from([payload.value]);
	};
	static decode = (buffer: Buffer): SwitchMultilevelV1SetData => ({
		value: buffer[0],
	});

	constructor(payload: Buffer | SwitchMultilevelV1SetData) {
		super(SwitchMultilevelV1Set, payload);
	}
}

export interface SwitchMultilevelV1ReportData {
	value: number;
}

class SwitchMultilevelV1Report extends CommandPacket<
	SwitchMultilevelV1ReportData
> {
	static commandClass = CommandClasses.COMMAND_CLASS_SWITCH_MULTILEVEL;
	static command = SwitchMultilevelV1CommandsEnum.Report;
	static version = 1;
	static encode = (payload: SwitchMultilevelV1ReportData) => {
		if (payload.value === undefined) {
			throw new Error("missing value");
		}
		return Buffer.from([payload.value]);
	};
	static decode = (buffer: Buffer): SwitchMultilevelV1ReportData => ({
		value: buffer[0],
	});

	constructor(payload: Buffer | SwitchMultilevelV1ReportData) {
		super(SwitchMultilevelV1Report, payload);
	}
}

export type SwitchMultilevelV1GetData = void;

class SwitchMultilevelV1Get extends CommandPacket<SwitchMultilevelV1GetData> {
	static commandClass = CommandClasses.COMMAND_CLASS_SWITCH_MULTILEVEL;
	static command = SwitchMultilevelV1CommandsEnum.Get;
	static version = 1;
	static encode = (payload: SwitchMultilevelV1GetData) => {
		return emptyBuffer;
	};
	static decode = (buffer: Buffer): SwitchMultilevelV1GetData => undefined;

	constructor(payload: Buffer | SwitchMultilevelV1GetData) {
		super(SwitchMultilevelV1Get, payload);
	}
}

export class SwitchMultilevelV1 extends CommandClassPacket {
	static commandClass = CommandClasses.COMMAND_CLASS_SWITCH_MULTILEVEL;

	constructor(command: number, payload: Buffer) {
		super(SwitchMultilevelV1.commandClass, command, payload);
	}

	public static Set = SwitchMultilevelV1Set;
	public static Get = SwitchMultilevelV1Get;
	public static Report = SwitchMultilevelV1Report;
}

export namespace SwitchMultilevelV1 {
	export type Set = SwitchMultilevelV1Set;
	export type Get = SwitchMultilevelV1Get;
	export type Report = SwitchMultilevelV1Report;
}
