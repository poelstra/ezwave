import { CommandDefinition } from "./types";

export function encodeCommandAndPayload(
	commandDef: CommandDefinition,
	payload: object | void
): Buffer {
	if (payload === undefined) {
		return Buffer.from([commandDef.id]);
	} else {
		return Buffer.from([commandDef.id, (payload as any).value]);
	}
}
