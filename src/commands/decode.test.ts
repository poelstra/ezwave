import { expect } from "chai";
import { describe, it } from "mocha";
import { decodeCommandAndPayload } from "./decode";
import * as types from "./types";

function createCommand(
	command: number,
	params: types.CommandDefinition["params"]
): types.CommandDefinition {
	return {
		command: command,
		name: `COMMAND_${command.toString(16)}`,
		help: "",
		status: types.ObsolescenceStatus.Active,
		params,
	};
}

describe("decode", () => {
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
							help: "Param 0",
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
							help: "Param 0",
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
								help: "Param 0",
							},
						]);
						const commandAndPayload = Buffer.from([
							0x34,
							...bytes.slice(0, -1),
						]);
						expect(() =>
							decodeCommandAndPayload(
								commandDef,
								commandAndPayload
							)
						).to.throw("unexpected end of packet");
					});
				}

				it("can be repeated", async () => {
					const commandDef = createCommand(0x34, [
						{
							type: types.ParameterType.Integer,
							length,
							name: "param0",
							help: "Param 0",
						},
						{
							type: types.ParameterType.Integer,
							length,
							name: "param1",
							help: "Param 1",
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
							type: types.ParameterType.Bitfield,
							length: 1,
							name: "hasParams",
							help: "Has Params",
							fields: [
								{
									type: types.BitfieldElementType.Boolean,
									name: "hasParam0",
									mask: 0x1,
									shift: 0,
									presenceOf: {
										isExplicit: true,
										refs: [{ name: "param0" }],
									},
								},
								{
									type: types.BitfieldElementType.Boolean,
									name: "hasParam1",
									mask: 0x2,
									shift: 1,
									presenceOf: {
										isExplicit: true,
										refs: [{ name: "param0" }],
									},
								},
							],
						},
						{
							type: types.ParameterType.Integer,
							length,
							name: "param0",
							help: "Param 0",
							optional: {
								ref: "hasParams",
								bitfield: {
									name: "hasParam0",
									mask: 0x1,
									shift: 0,
								},
							},
						},
						{
							type: types.ParameterType.Integer,
							length,
							name: "param1",
							help: "Param 1",
							optional: {
								ref: "hasParams",
								bitfield: {
									name: "hasParam1",
									mask: 0x2,
									shift: 1,
								},
							},
						},
					]);
					const commandAndPayload = Buffer.from([
						0x34,
						0x02,
						...bytes,
					]);
					const decoded = decodeCommandAndPayload(
						commandDef,
						commandAndPayload
					);
					expect(decoded).to.deep.equal({
						hasParam0: false,
						hasParam1: true,
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
						"0": { name: "off", help: "off" },
						"255": { name: "on", help: "on" },
					},
					name: "param0",
					help: "Param 0",
				},
			]);
			const commandAndPayload = Buffer.from([0x34, 0xff]);
			const decoded = decodeCommandAndPayload(
				commandDef,
				commandAndPayload
			);
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
						"0": { name: "off", help: "off" },
						"255": { name: "on", help: "on" },
					},
					name: "param0",
					help: "Param 0",
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

		it("can be repeated", async () => {
			const commandDef = createCommand(0x34, [
				{
					type: types.ParameterType.Enum,
					length: 1,
					values: {
						"0": { name: "off", help: "off" },
						"255": { name: "on", help: "on" },
					},
					name: "param0",
					help: "Param 0",
				},
				{
					type: types.ParameterType.Enum,
					length: 1,
					values: {
						"0": { name: "off", help: "off" },
						"255": { name: "on", help: "on" },
					},
					name: "param1",
					help: "Param 1",
				},
			]);
			const commandAndPayload = Buffer.from([0x34, 0xff, 0xff]);
			const decoded = decodeCommandAndPayload(
				commandDef,
				commandAndPayload
			);
			expect(decoded).to.deep.equal({
				param0: 0xff,
				param1: 0xff,
			});
		});

		it("can be optional", async () => {
			const commandDef = createCommand(0x34, [
				{
					type: types.ParameterType.Bitfield,
					length: 1,
					name: "hasParams",
					help: "Has Params",
					fields: [
						{
							type: types.BitfieldElementType.Boolean,
							name: "hasParam0",
							mask: 0x1,
							shift: 0,
						},
						{
							type: types.BitfieldElementType.Boolean,
							name: "hasParam1",
							mask: 0x2,
							shift: 1,
						},
					],
				},
				{
					type: types.ParameterType.Enum,
					length: 1,
					values: {
						"0": { name: "off", help: "off" },
						"255": { name: "on", help: "on" },
					},
					name: "param0",
					help: "Param 0",
					optional: {
						ref: "hasParams",
						bitfield: {
							name: "hasParam0",
							mask: 0x1,
							shift: 0,
						},
					},
				},
				{
					type: types.ParameterType.Enum,
					length: 1,
					values: {
						"0": { name: "off", help: "off" },
						"255": { name: "on", help: "on" },
					},
					name: "param1",
					help: "Param 1",
					optional: {
						ref: "hasParams",
						bitfield: {
							name: "hasParam1",
							mask: 0x2,
							shift: 1,
						},
					},
				},
			]);
			const commandAndPayload = Buffer.from([0x34, 0x02, 0xff]);
			const decoded = decodeCommandAndPayload(
				commandDef,
				commandAndPayload
			);
			expect(decoded).to.deep.equal({
				hasParam0: false,
				hasParam1: true,
				param1: 0xff,
			});
		});
	});

	describe("reserved fields", () => {
		it("should not be decoded as parameter", () => {
			const commandDef = createCommand(0x34, [
				{
					type: types.ParameterType.Integer,
					name: "a",
					help: "A",
					length: 1,
					reserved: true,
				},
				{
					type: types.ParameterType.Integer,
					name: "b",
					help: "B",
					length: 1,
					reserved: false,
				},
			]);
			const commandAndPayload = Buffer.from([0x34, 0xaa, 0x55]);
			const decoded = decodeCommandAndPayload(
				commandDef,
				commandAndPayload
			);
			expect(decoded).to.deep.equal({
				b: 0x55,
			});
		});

		it("should not be decoded as bitfield", () => {
			const commandDef = createCommand(0x34, [
				{
					type: types.ParameterType.Bitfield,
					name: "a",
					help: "A",
					length: 1,
					fields: [
						{
							type: types.BitfieldElementType.Integer,
							name: "field0",
							mask: 0x3,
							shift: 0,
							reserved: true,
						},
						{
							type: types.BitfieldElementType.Boolean,
							name: "field1",
							mask: 0x4,
							shift: 2,
							reserved: true,
						},
						{
							type: types.BitfieldElementType.Integer,
							name: "field2",
							mask: 0x18,
							shift: 3,
						},
					],
				},
			]);
			const commandAndPayload = Buffer.from([0x34, 0xff]);
			const decoded = decodeCommandAndPayload(
				commandDef,
				commandAndPayload
			);
			expect(decoded).to.deep.equal({
				field2: 0x3,
			});
		});
	});
});
