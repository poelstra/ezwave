import { expect } from "chai";
import { Packet } from "./packet";

describe("Packet", () => {
	it("supports single-byte command class and payload", () => {
		const buffer = Buffer.from([0x12, 0x13]);
		const packet = new Packet(buffer);
		expect(packet.commandClass).to.equal(0x12);
		expect(packet.commandAndPayload).to.deep.equal(Buffer.from([0x13]));
		expect(packet.serialize()).to.deep.equal(buffer);
	});

	it("supports multi-byte command class and payload", () => {
		const buffer = Buffer.from([0xf1, 0x12, 0x13]);
		const packet = new Packet(buffer);
		expect(packet.commandClass).to.equal(0xf112);
		expect(packet.commandAndPayload).to.deep.equal(Buffer.from([0x13]));
		expect(packet.serialize()).to.deep.equal(buffer);
	});

	it("supports single-byte command class without payload", () => {
		const buffer = Buffer.from([0x12]);
		const packet = new Packet(buffer);
		expect(packet.commandClass).to.equal(0x12);
		expect(packet.commandAndPayload).to.deep.equal(Buffer.from([]));
		expect(packet.serialize()).to.deep.equal(buffer);
	});

	it("supports multi-byte command class without payload", () => {
		const buffer = Buffer.from([0xf1, 0x12]);
		const packet = new Packet(buffer);
		expect(packet.commandClass).to.equal(0xf112);
		expect(packet.commandAndPayload).to.deep.equal(Buffer.from([]));
		expect(packet.serialize()).to.deep.equal(buffer);
	});

	it("throws on empty packet", () => {
		expect(() => new Packet(Buffer.from([]))).to.throw(
			"unexpected end-of-packet"
		);
	});

	it("throws on truncated multi-byte commandclass", () => {
		expect(() => new Packet(Buffer.from([0xf1]))).to.throw(
			"unexpected end-of-packet"
		);
	});

	it("throws on casting to incompatible command class without command byte", () => {
		class TestClass {
			static matches(_packet: Packet): boolean {
				return false;
			}
			constructor(_commandAndPayload: Buffer) {}
		}
		const packet = new Packet(Buffer.from([0x12]));
		expect(() => packet.as(TestClass)).to.throw("cannot convert packet");
	});

	it("throws on casting to incompatible command class", () => {
		class TestClass {
			static matches(_packet: Packet): boolean {
				return false;
			}
			constructor(_commandAndPayload: Buffer) {}
		}
		const packet = new Packet(Buffer.from([0x12, 0x13]));
		expect(() => packet.as(TestClass)).to.throw("cannot convert packet");
	});
});
