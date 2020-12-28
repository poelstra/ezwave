import { Command } from "./types";

export function encodeCommandAndPayload(
	commandDef: Command,
	payload: object | void
): Buffer {
	if (payload === undefined) {
		return Buffer.from([commandDef.id]);
	} else {
		return Buffer.from([commandDef.id, (payload as any).value]);
	}
}
