import "source-map-support/register";
import { describe, it } from "mocha";
import { expect } from "chai";

import * as types from "../codegen/types";
import { decodePacket } from "../server/command";

function createCommand(
	cmdClass: number,
	command: number,
	params: types.Command["params"]
): types.CommandClass {
	return {
		id: cmdClass,
		name: `CMD_CLASS_${cmdClass.toString(16)}`,
		status: types.Status.Active,
		version: 1,
		commands: [
			{
				id: command,
				name: `COMMAND_${command.toString(16)}`,
				status: types.Status.Active,
				params,
			},
		],
	};
}

[
	{ name: "BYTE", length: 1, bytes: [0x42], value: 0x42 },
	{ name: "WORD", length: 2, bytes: [0x12, 0x34], value: 0x1234 },
	{ name: "BIT_24", length: 3, bytes: [0x12, 0x34, 0x56], value: 0x123456 },
	{
		name: "DWORD",
		length: 4,
		bytes: [0x12, 0x34, 0x56, 0x78],
		value: 0x12345678,
	},
].forEach(({ name, length, bytes, value }) => {
	describe(name, () => {
		it("decodes value", async () => {
			const cmdClass = createCommand(0x12, 0x34, [
				{
					type: "integer",
					index: 0,
					length,
					name: "param0",
				},
			]);
			const packet = Buffer.from([0x12, 0x34, ...bytes]);
			const decoded = decodePacket(cmdClass, packet);
			expect(decoded).to.deep.equal({
				param0: value,
			});
		});

		it("decodes to 0 default", async () => {
			const cmdClass = createCommand(0x12, 0x34, [
				{
					type: "integer",
					index: 0,
					length,
					name: "param0",
				},
			]);
			const packet = Buffer.from([0x12, 0x34]);
			const decoded = decodePacket(cmdClass, packet);
			expect(decoded).to.deep.equal({
				param0: 0x0,
			});
		});

		it("can be repeated", async () => {
			const cmdClass = createCommand(0x12, 0x34, [
				{
					type: "integer",
					index: 0,
					length,
					name: "param0",
				},
				{
					type: "integer",
					index: 1,
					length,
					name: "param1",
				},
			]);
			const packet = Buffer.from([0x12, 0x34, ...bytes, ...bytes]);
			const decoded = decodePacket(cmdClass, packet);
			expect(decoded).to.deep.equal({
				param0: value,
				param1: value,
			});
		});
	});
});
