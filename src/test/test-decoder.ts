import { describe, it } from "mocha";
import { expect } from "chai";

import * as types from "../commands/types";
import { decodeCommandAndPayload } from "../commands/decode";

function createCommand(
	command: number,
	params: types.CommandDefinition["params"]
): types.CommandDefinition {
	return {
		id: command,
		name: `COMMAND_${command.toString(16)}`,
		status: types.CommandStatus.Active,
		params,
	};
}

describe("integer types", () => {
	[
		{ name: "BYTE", length: 1, bytes: [0x42], value: 0x42 },
		{ name: "WORD", length: 2, bytes: [0x12, 0x34], value: 0x1234 },
		{
			name: "BIT_24",
			length: 3,
			bytes: [0x12, 0x34, 0x56],
			value: 0x123456,
		},
		{
			name: "DWORD",
			length: 4,
			bytes: [0x12, 0x34, 0x56, 0x78],
			value: 0x12345678,
		},
	].forEach(({ name, length, bytes, value }) => {
		describe(`${name}`, () => {
			it("decodes value", async () => {
				const commandDef = createCommand(0x34, [
					{
						type: types.ParameterType.Integer,
						length,
						name: "param0",
					},
				]);
				const commandAndPayload = Buffer.from([0x34, ...bytes]);
				const decoded = decodeCommandAndPayload(
					commandDef,
					commandAndPayload
				);
				expect(decoded).to.deep.equal({
					param0: value,
				});
			});

			it("decodes to 0 default", async () => {
				const commandDef = createCommand(0x34, [
					{
						type: types.ParameterType.Integer,
						length,
						name: "param0",
					},
				]);
				const commandAndPayload = Buffer.from([0x34]);
				const decoded = decodeCommandAndPayload(
					commandDef,
					commandAndPayload
				);
				expect(decoded).to.deep.equal({
					param0: 0x0,
				});
			});

			if (length > 1) {
				it("throws on truncation", async () => {
					const commandDef = createCommand(0x34, [
						{
							type: types.ParameterType.Integer,
							length,
							name: "param0",
						},
					]);
					const commandAndPayload = Buffer.from([
						0x34,
						...bytes.slice(0, -1),
					]);
					expect(() =>
						decodeCommandAndPayload(commandDef, commandAndPayload)
					).to.throw("unexpected end of packet");
				});
			}

			it("can be repeated", async () => {
				const commandDef = createCommand(0x34, [
					{
						type: types.ParameterType.Integer,
						length,
						name: "param0",
					},
					{
						type: types.ParameterType.Integer,
						length,
						name: "param1",
					},
				]);
				const commandAndPayload = Buffer.from([
					0x34,
					...bytes,
					...bytes,
				]);
				const decoded = decodeCommandAndPayload(
					commandDef,
					commandAndPayload
				);
				expect(decoded).to.deep.equal({
					param0: value,
					param1: value,
				});
			});

			it("can be optional", async () => {
				const commandDef = createCommand(0x34, [
					{
						type: types.ParameterType.Integer,
						length: 1,
						name: "hasParams",
					},
					{
						type: types.ParameterType.Integer,
						length,
						name: "param0",
						optional: {
							name: "hasParams",
							mask: 0x01,
						},
					},
					{
						type: types.ParameterType.Integer,
						length,
						name: "param1",
						optional: {
							name: "hasParams",
							mask: 0x02,
						},
					},
				]);
				const commandAndPayload = Buffer.from([0x34, 0x02, ...bytes]);
				const decoded = decodeCommandAndPayload(
					commandDef,
					commandAndPayload
				);
				expect(decoded).to.deep.equal({
					hasParams: 0x02,
					param1: value,
				});
			});
		});
	});
});

describe("enum", () => {
	it("decodes value", async () => {
		const commandDef = createCommand(0x34, [
			{
				type: types.ParameterType.Enum,
				length: 1,
				values: {
					"0": "off",
					"255": "on",
				},
				name: "param0",
			},
		]);
		const commandAndPayload = Buffer.from([0x34, 0xff]);
		const decoded = decodeCommandAndPayload(commandDef, commandAndPayload);
		expect(decoded).to.deep.equal({
			param0: 0xff,
		});
	});

	it("decodes to 0 default", async () => {
		const commandDef = createCommand(0x34, [
			{
				type: types.ParameterType.Enum,
				length: 1,
				values: {
					"0": "off",
					"255": "on",
				},
				name: "param0",
			},
		]);
		const commandAndPayload = Buffer.from([0x34]);
		const decoded = decodeCommandAndPayload(commandDef, commandAndPayload);
		expect(decoded).to.deep.equal({
			param0: 0x0,
		});
	});

	it("can be repeated", async () => {
		const commandDef = createCommand(0x34, [
			{
				type: types.ParameterType.Enum,
				length: 1,
				values: {
					"0": "off",
					"255": "on",
				},
				name: "param0",
			},
			{
				type: types.ParameterType.Enum,
				length: 1,
				values: {
					"0": "off",
					"255": "on",
				},
				name: "param1",
			},
		]);
		const commandAndPayload = Buffer.from([0x34, 0xff, 0xff]);
		const decoded = decodeCommandAndPayload(commandDef, commandAndPayload);
		expect(decoded).to.deep.equal({
			param0: 0xff,
			param1: 0xff,
		});
	});

	it("can be optional", async () => {
		const commandDef = createCommand(0x34, [
			{
				type: types.ParameterType.Integer,
				length: 1,
				name: "hasParams",
			},
			{
				type: types.ParameterType.Enum,
				length: 1,
				values: {
					"0": "off",
					"255": "on",
				},
				name: "param0",
				optional: {
					name: "hasParams",
					mask: 0x01,
				},
			},
			{
				type: types.ParameterType.Enum,
				length: 1,
				values: {
					"0": "off",
					"255": "on",
				},
				name: "param1",
				optional: {
					name: "hasParams",
					mask: 0x02,
				},
			},
		]);
		const commandAndPayload = Buffer.from([0x34, 0x02, 0xff]);
		const decoded = decodeCommandAndPayload(commandDef, commandAndPayload);
		expect(decoded).to.deep.equal({
			hasParams: 0x02,
			param1: 0xff,
		});
	});
});
