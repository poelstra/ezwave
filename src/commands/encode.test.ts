import { expect } from "chai";
import { describe, it } from "mocha";
import { encodeCommandAndPayload, EncodeDataError } from "./encode";
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

describe("encode", () => {
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
				it("encodes value", async () => {
					const commandDef = createCommand(0x34, [
						{
							type: types.ParameterType.Integer,
							length,
							name: "param0",
							help: "Param 0",
						},
					]);
					const expected = Buffer.from([0x34, ...bytes]);
					const encoded = encodeCommandAndPayload(commandDef, {
						param0: value,
					});
					expect(encoded).to.deep.equal(expected);
				});

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
					const expected = Buffer.from([0x34, ...bytes, ...bytes]);
					const encoded = encodeCommandAndPayload(commandDef, {
						param0: value,
						param1: value,
					});
					expect(encoded).to.deep.equal(expected);
				});

				const optionalParamsDef = createCommand(0x34, [
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

				it("can be optional", async () => {
					const expected = Buffer.from([0x34, 0x02, ...bytes]);
					const encoded = encodeCommandAndPayload(optionalParamsDef, {
						hasParam0: false,
						hasParam1: true,
						param1: value,
					});
					expect(encoded).to.deep.equal(expected);
				});

				it("throws when optional should be present but isn't", () => {
					expect(() =>
						encodeCommandAndPayload(optionalParamsDef, {
							hasParam0: true,
							hasParam1: true,
							param1: value,
						})
					).to.throw(EncodeDataError);
				});

				it("throws when optional should not be present but is", () => {
					expect(() =>
						encodeCommandAndPayload(optionalParamsDef, {
							hasParam0: false,
							hasParam1: false,
							param1: value,
						})
					).to.throw(EncodeDataError);
				});

				[
					undefined,
					null,
					Infinity,
					-Infinity,
					NaN,
					-1,
					Math.pow(2, length * 8),
					true,
					false,
					"0",
					{},
				].forEach((input) => {
					it(`throws on invalid input: ${input}`, () => {
						const commandDef = createCommand(0x34, [
							{
								type: types.ParameterType.Integer,
								length,
								name: "param0",
								help: "Param 0",
							},
						]);
						expect(() =>
							encodeCommandAndPayload(commandDef, {
								param0: input,
							})
						).to.throw(EncodeDataError);
					});
				});
			});
		});
	}); /* integer types */

	describe("enum", () => {
		it("encodes value", async () => {
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
			const expected = Buffer.from([0x34, 0xff]);
			const encoded = encodeCommandAndPayload(commandDef, {
				param0: 0xff,
			});
			expect(encoded).to.deep.equal(expected);
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
			const expected = Buffer.from([0x34, 0xff, 0xff]);
			const encoded = encodeCommandAndPayload(commandDef, {
				param0: 0xff,
				param1: 0xff,
			});
			expect(encoded).to.deep.equal(expected);
		});

		const optionalParamsDef = createCommand(0x34, [
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

		it("can be optional", async () => {
			const expected = Buffer.from([0x34, 0x02, 0xff]);
			const encoded = encodeCommandAndPayload(optionalParamsDef, {
				hasParam0: false,
				hasParam1: true,
				param1: 0xff,
			});
			expect(encoded).to.deep.equal(expected);
		});

		it("throws when optional should be present but isn't", () => {
			expect(() =>
				encodeCommandAndPayload(optionalParamsDef, {
					hasParam0: true,
					hasParam1: true,
					param1: 0xff,
				})
			).to.throw(EncodeDataError);
		});

		it("throws when optional should not be present but is", () => {
			expect(() =>
				encodeCommandAndPayload(optionalParamsDef, {
					hasParam0: false,
					hasParam1: false,
					param1: 0xff,
				})
			).to.throw(EncodeDataError);
		});

		[
			undefined,
			null,
			Infinity,
			-Infinity,
			NaN,
			-1,
			256,
			true,
			false,
			"0",
			{},
		].forEach((input) => {
			it(`throws on invalid input: ${input}`, () => {
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
				expect(() =>
					encodeCommandAndPayload(commandDef, {
						param0: input,
					})
				).to.throw(EncodeDataError);
			});
		});
	}); /* enum */

	describe("reserved fields", () => {
		it("should be encoded as 0 in parameter", () => {
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
			const expected = Buffer.from([0x34, 0x00, 0x55]);
			const encoded = encodeCommandAndPayload(commandDef, {
				a: 0xaa,
				b: 0x55,
			});
			expect(encoded).to.deep.equal(expected);
		});

		it("should not be encoded as 0 in bitfield", () => {
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
			const expected = Buffer.from([0x34, 0x18]);
			const encoded = encodeCommandAndPayload(commandDef, {
				field0: 0x3,
				field1: true,
				field2: 0x3,
			});
			expect(encoded).to.deep.equal(expected);
		});
	});
});
