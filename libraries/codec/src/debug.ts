/**
 * Packet debug utilities.
 */

import { bufferToString, toHex } from "@ezwave/shared";
import {
	CommandsByClassByVersion,
	convertFromJsonCommandClasses,
	ZwaveSpec,
} from "@ezwave/spec";
import { inspect } from "util";
import { CommandClassPacket, CommandPacket } from "./command";
import { CommandClasses } from "./generated/CommandClasses";
import { Packet } from "./packet";

/**
 * Render packet to string, decoding the packet's raw contents to
 * a human-readable representation if necessary (i.e. when it is
 * not already an instance of CommandPacket).
 *
 * @see autoDecode() for details on the automatic decoding.
 *
 * @param packet to convert to string.
 * @return Human-readable representation of (decoded) packet.
 */
export function packetToString(packet: Packet): string {
	if (!(packet instanceof CommandPacket)) {
		// If not already a specific command packet, try to
		// decode it using the highest version of its command class
		packet = autoDecode(packet);
	}

	if (!(packet instanceof CommandClassPacket)) {
		// Decode failed, return basic information
		return `<Packet [decode failed] cmdClass=0x${toHex(
			packet.commandClass
		)} cmdAndPayload=[${bufferToString(packet.commandAndPayload)}]`;
	}

	const spec = getSpec();
	const cmdDef = spec
		.get(packet.commandClass)
		?.get(packet.version)
		?.commandsById.get(packet.command);

	if (!cmdDef) {
		// Happens e.g. for NoOperation, which has no command
		return `<Packet cmdClass=0x${toHex(packet.commandClass, 2)} name=${
			CommandClasses[packet.commandClass]
		} cmdAndPayload=[${bufferToString(packet.commandAndPayload)}]>`;
	}

	const payloadStr =
		packet instanceof CommandPacket
			? `payload=${stripNullProtoPrefix(inspect(packet.data ?? {}))}`
			: `cmdAndPayload=[${bufferToString(packet.commandAndPayload)}]`;

	return `<Packet cmdClass=0x${toHex(
		packet.commandClass,
		2
	)} command=0x${toHex(packet.command, 2)} name=${
		CommandClasses[packet.commandClass]
	}:${cmdDef.name} ${payloadStr}>`;
}

/**
 * Try to decode a packet using the most recent version of its
 * command class. This method is intended for logging / debug
 * purposes, to get a quick overview of the contents of a packet.
 *
 * Because parsing is done using the highest (known) version of each
 * command class, it could be that fields are presented in the output
 * that were not explicitly encoded in the original packet.
 *
 * Note: decoding is done using the JSON Z-Wave spec, not the
 * generated TypeScript classes, to prevent taking an unnecessary
 * dependency on every generated class.
 *
 * @param packet Packet to decode.
 * @return Decoded CommandPacket, or CommandClassPacket or original
 *     Packet if decoding failed.
 */
export function autoDecode(packet: Packet): Packet {
	const spec = getSpec();
	const cmdClassDefs = spec.get(packet.commandClass);
	if (!cmdClassDefs) {
		// Unknown command class, don't try to parse further
		return packet;
	}
	const highestVersion = Math.max(...cmdClassDefs.keys());
	const cmdClassDef = cmdClassDefs.get(highestVersion)!;

	// We need to parse the command out of the packet, but that
	// could have a cmdMask. In order to re-use any logic in the
	// existing parser, we'll just create a proper class on-the-fly.
	// We're a debug helper anyway.
	class DecodedCommandClassPacket extends CommandClassPacket<number> {
		public static readonly commandClass = cmdClassDef.commandClass;
		public static readonly version = cmdClassDef.version;

		public static matches(packet: Packet): boolean {
			return packet.commandClass === this.commandClass;
		}

		constructor(commandAndPayload: Buffer) {
			super(DecodedCommandClassPacket, commandAndPayload);
		}
	}

	const cmdClassPacket = safeCall(() =>
		packet.tryAs(DecodedCommandClassPacket)
	);
	if (!cmdClassPacket) {
		// Shouldn't ever happen at this stage, but let's be sure.
		return packet;
	}

	const cmdDef = cmdClassDef.commandsById.get(cmdClassPacket.command);
	if (!cmdDef) {
		// We could decode the command class, but apparently the command
		// itself is unknown (could be bogus packet, or newer version of
		// command class).
		return cmdClassPacket;
	}

	// We now know what the command is supposed to be, so let's
	// again build the command-specific class and decode to that.
	class DecodedCommandPacket extends CommandPacket<any> {
		public static readonly CommandClass = DecodedCommandClassPacket;
		public static readonly command = cmdDef!.command;
		public static readonly definition = cmdDef!;

		static matches(packet: Packet): boolean {
			return (
				packet.tryAs(DecodedCommandClassPacket)?.command ===
				this.command
			);
		}

		constructor(data: Buffer | any) {
			super(DecodedCommandPacket, data);
		}
	}

	const cmdPacket = safeCall(() =>
		cmdClassPacket.tryAs(DecodedCommandPacket)
	);
	if (!cmdPacket) {
		return cmdClassPacket;
	}

	return cmdPacket;
}

let loadedSpec: CommandsByClassByVersion | undefined;

function getSpec(): CommandsByClassByVersion {
	if (loadedSpec) {
		return loadedSpec;
	}

	const jsonSpec = require("@ezwave/spec/lib/zwave.json") as ZwaveSpec;
	loadedSpec = convertFromJsonCommandClasses(jsonSpec.classes);
	return loadedSpec;
}

function safeCall<T>(cb: () => T): T | undefined {
	try {
		return cb();
	} catch {
		return undefined;
	}
}

function stripNullProtoPrefix(value: string): string {
	const prefix = "[Object: null prototype] ";
	if (value.startsWith(prefix)) {
		return value.slice(prefix.length);
	}
	return value;
}
