import { Packet } from "./packet";

describe("Packet", () => {
	it("supports single-byte command class and payload", () => {
		const buffer = Buffer.from([0x12, 0x13]);
		const packet = new Packet(buffer);
		expect(packet.commandClass).toBe(0x12);
		expect(packet.commandAndPayload).toEqual(Buffer.from([0x13]));
		expect(packet.serialize()).toEqual(buffer);
	});

	it("supports multi-byte command class and payload", () => {
		const buffer = Buffer.from([0xf1, 0x12, 0x13]);
		const packet = new Packet(buffer);
		expect(packet.commandClass).toBe(0xf112);
		expect(packet.commandAndPayload).toEqual(Buffer.from([0x13]));
		expect(packet.serialize()).toEqual(buffer);
	});

	it("supports single-byte command class without payload", () => {
		const buffer = Buffer.from([0x12]);
		const packet = new Packet(buffer);
		expect(packet.commandClass).toBe(0x12);
		expect(packet.commandAndPayload).toEqual(Buffer.from([]));
		expect(packet.serialize()).toEqual(buffer);
	});

	it("supports multi-byte command class without payload", () => {
		const buffer = Buffer.from([0xf1, 0x12]);
		const packet = new Packet(buffer);
		expect(packet.commandClass).toBe(0xf112);
		expect(packet.commandAndPayload).toEqual(Buffer.from([]));
		expect(packet.serialize()).toEqual(buffer);
	});

	it("throws on empty packet", () => {
		expect(() => new Packet(Buffer.from([]))).toThrowError(
			"unexpected end-of-packet"
		);
	});

	it("throws on truncated multi-byte commandclass", () => {
		expect(() => new Packet(Buffer.from([0xf1]))).toThrowError(
			"unexpected end-of-packet"
		);
	});

	it("throws on casting to incompatible command class without command byte", () => {
		class TestClass {
			public static matches(_packet: Packet): boolean {
				return false;
			}
			public constructor(_commandAndPayload: Buffer) {}
		}
		const packet = new Packet(Buffer.from([0x12]));
		expect(() => packet.as(TestClass)).toThrowError(
			"cannot convert packet"
		);
	});

	it("throws on casting to incompatible command class", () => {
		class TestClass {
			public static matches(_packet: Packet): boolean {
				return false;
			}
			public constructor(_commandAndPayload: Buffer) {}
		}
		const packet = new Packet(Buffer.from([0x12, 0x13]));
		expect(() => packet.as(TestClass)).toThrowError(
			"cannot convert packet"
		);
	});
});
