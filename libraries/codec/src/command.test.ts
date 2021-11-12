// TODO These tests must be re-instated somehow, testing just the basic
// behavior of the CommmandPacket and CommandClassPacket classes, without
// dependency on an actual (auto-generated) command class. Tests for that
// should be in the commands package.

describe("command", () => {
	it.todo("CommmandPacket");
	it.todo("CommandClassPacket");
});

// /**
//  * Tests for the CommandPacket and CommandClassPacket infrastructure.
//  *
//  * It does use an actual auto-generated command class for testing, but
//  * more explicit tests for these are in generate_commands.test.ts.
//  */

// import { Packet } from "./packet";
// import { SwitchMultilevelV1 } from "./classes/SwitchMultilevelV1";

// describe("command", () => {
// 	it("can encode complete packet", () => {
// 		const packet = new SwitchMultilevelV1.SwitchMultilevelSet({
// 			value: 0x30,
// 		});
// 		expect(packet.serialize()).toEqual(Buffer.from("260130", "hex"));
// 	});

// 	it("supports easy decoding from buffer", () => {
// 		const buffer = Buffer.from("260130", "hex");
// 		const packet = new Packet(buffer);
// 		const data = packet.as(SwitchMultilevelV1.SwitchMultilevelSet).data;
// 		expect(data).toEqual({
// 			value: 0x30,
// 		});
// 	});

// 	it("supports easy creation of command from commandclass", () => {
// 		const packet = new SwitchMultilevelV1.SwitchMultilevelSet({
// 			value: 0x30,
// 		});
// 		expect(packet.data).toEqual({ value: 0x30 });
// 		expect(packet.serialize()).toEqual(Buffer.from("260130", "hex"));
// 	});

// 	it("disallows invalid input when creating a command", () => {
// 		expect(
// 			() =>
// 				new SwitchMultilevelV1.SwitchMultilevelSet({
// 					//@ts-expect-error
// 					foo: 123,
// 				})
// 		).toThrowError();
// 	});

// 	it("allows commands being used as a type", () => {
// 		// The commands are defined as properties
// 		const packet: SwitchMultilevelV1.SwitchMultilevelGet = new SwitchMultilevelV1.SwitchMultilevelGet();
// 		void packet;
// 	});

// 	it("can decode a command through commandclass", () => {
// 		const buffer = Buffer.from("260130", "hex");
// 		const packet = new Packet(buffer);
// 		const specificClass = packet.as(SwitchMultilevelV1);
// 		expect(specificClass).toBeInstanceOf(SwitchMultilevelV1);
// 		const specificCmd = specificClass.as(
// 			SwitchMultilevelV1.SwitchMultilevelSet
// 		);
// 		expect(specificCmd).toBeInstanceOf(SwitchMultilevelV1.SwitchMultilevelSet);
// 		expect(specificCmd.commandAndPayload).toEqual(Buffer.from("0130", "hex"));
// 		expect(specificCmd.data.value).toBe(0x30);
// 	});

// 	it("can decode a command directly", () => {
// 		const buffer = Buffer.from("260130", "hex");
// 		const packet = new Packet(buffer);
// 		const specificCmd = packet.as(SwitchMultilevelV1.SwitchMultilevelSet);
// 		expect(specificCmd).toBeInstanceOf(SwitchMultilevelV1.SwitchMultilevelSet);
// 		expect(specificCmd.commandAndPayload).toEqual(Buffer.from("0130", "hex"));
// 		expect(specificCmd.data.value).toBe(0x30);
// 	});

// 	it("can decode a command without payload", () => {
// 		const buffer = Buffer.from("2602", "hex");
// 		const packet = new Packet(buffer);
// 		const specificCmd = packet.as(SwitchMultilevelV1.SwitchMultilevelGet);
// 		expect(specificCmd).toBeInstanceOf(SwitchMultilevelV1.SwitchMultilevelGet);
// 		expect(specificCmd.commandAndPayload).toEqual(Buffer.from("02", "hex"));
// 		expect(specificCmd.data).toEqual({});
// 	});

// 	it("can encode a command without payload", () => {
// 		const cmd1 = new SwitchMultilevelV1.SwitchMultilevelGet();
// 		const cmd2 = new SwitchMultilevelV1.SwitchMultilevelGet(undefined);

// 		const expected = Buffer.from("2602", "hex");
// 		expect(cmd1.serialize()).toEqual(expected);
// 		expect(cmd2.serialize()).toEqual(expected);
// 	});

// 	it("rejects decoding as incompatible command", () => {
// 		const buffer = Buffer.from("260130", "hex");
// 		const genericCmd = new Packet(buffer);
// 		expect(() =>
// 			genericCmd.as(SwitchMultilevelV1.SwitchMultilevelGet)
// 		).toThrowError("cannot convert");
// 	});
// });
