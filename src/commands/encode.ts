import { CommandDefinition } from "./types";

export function encodeCommandAndPayload(
	commandDef: CommandDefinition,
	payload: object | void
): Buffer {
	if (payload === undefined) {
		return Buffer.from([commandDef.command]);
	} else {
		return Buffer.from([commandDef.command, (payload as any).value]);
	}
}
