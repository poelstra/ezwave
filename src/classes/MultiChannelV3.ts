/**
 * Hand-crafted version of MultiChannel command class, to be
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
import CommandClasses from "../generated/CommandClasses";

const emptyBuffer = Buffer.alloc(0);

enum MultiChannelV3CommandsEnum {
	CmdEncap = 0x0d,
}

// TODO res is omitted out of this type, as it probably should
export interface MultiChannelV3CmdEncapData {
	sourceEndPoint: number;
	destinationEndPoint: number;
	bitAddress: boolean;
	encapsulated: Buffer; // TODO written as 3 separate fields in original spec, tweak auto-gen?
}

class MultiChannelV3CmdEncap extends CommandPacket<MultiChannelV3CmdEncapData> {
	static commandClass = CommandClasses.COMMAND_CLASS_MULTI_CHANNEL;
	static command = MultiChannelV3CommandsEnum.CmdEncap;
	static version = 3;
	static encode = (payload: MultiChannelV3CmdEncapData) => {
		// TODO input validation
		return Buffer.from([
			payload.sourceEndPoint & 0x7f, // | (payload.res ? 0x80 : 0)
			(payload.destinationEndPoint & 0x7f) |
				(payload.bitAddress ? 0x80 : 0),
			...payload.encapsulated,
		]);
	};
	static decode = (buffer: Buffer): MultiChannelV3CmdEncapData => ({
		sourceEndPoint: buffer[0] & 0x7f,
		// res: (buffer[0] & 0x80) > 0 ? true : false,
		destinationEndPoint: buffer[1] & 0x7f,
		bitAddress: (buffer[1] & 0x80) > 0 ? true : false,
		encapsulated: buffer.slice(2),
	});

	constructor(payload: Buffer | MultiChannelV3CmdEncapData) {
		super(MultiChannelV3CmdEncap, payload);
	}
}

export class MultiChannelV3 extends CommandClassPacket {
	static commandClass = CommandClasses.COMMAND_CLASS_MULTI_CHANNEL;

	constructor(command: number, payload: Buffer) {
		super(MultiChannelV3.commandClass, command, payload);
	}

	public static CmdEncap = MultiChannelV3CmdEncap;
}

export namespace MultiChannelV3 {
	export type CmdEncap = MultiChannelV3CmdEncap;
}
