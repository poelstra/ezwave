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
import { Packet } from "../commands/packet";
import CommandClasses from "../generated/CommandClasses";

export enum MultiChannelV3Commands {
	CmdEncap = 0x0d,
}

// TODO res is omitted out of this type, as it probably should
export interface MultiChannelV3CmdEncapData {
	sourceEndPoint: number;
	destinationEndPoint: number;
	bitAddress: boolean;
	encapsulated: Buffer; // TODO written as 3 separate fields in original spec, tweak auto-gen?
}

export class MultiChannelV3 extends CommandClassPacket<MultiChannelV3Commands> {
	static commandClass = CommandClasses.COMMAND_CLASS_MULTI_CHANNEL;

	static matches(packet: Packet): boolean {
		return packet.commandClass === this.commandClass;
	}

	constructor(commandAndPayload: Buffer) {
		super(MultiChannelV3, commandAndPayload);
	}

	public static CmdEncap = class MultiChannelV3CmdEncap extends CommandPacket<MultiChannelV3CmdEncapData> {
		static CommandClass = MultiChannelV3;
		static command = MultiChannelV3Commands.CmdEncap;

		static matches(packet: Packet): boolean {
			return packet.tryAs(MultiChannelV3)?.command === this.command;
		}

		static encode(payload: MultiChannelV3CmdEncapData) {
			// TODO input validation
			return Buffer.from([
				this.command,
				payload.sourceEndPoint & 0x7f, // | (payload.res ? 0x80 : 0)
				(payload.destinationEndPoint & 0x7f) |
					(payload.bitAddress ? 0x80 : 0),
				...payload.encapsulated,
			]);
		}

		static decode = (buffer: Buffer): MultiChannelV3CmdEncapData => ({
			sourceEndPoint: buffer[1] & 0x7f,
			// res: (buffer[1] & 0x80) > 0 ? true : false,
			destinationEndPoint: buffer[2] & 0x7f,
			bitAddress: (buffer[2] & 0x80) > 0 ? true : false,
			encapsulated: buffer.slice(3),
		});

		constructor(data: Buffer | MultiChannelV3CmdEncapData) {
			super(MultiChannelV3CmdEncap, data);
		}
	};
}
