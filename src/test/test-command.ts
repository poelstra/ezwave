import { expect } from "chai";
import { SwitchMultilevelV1 } from "../classes/SwitchMultilevelV1";
import { Packet } from "../commands/packet";
import CommandClasses from "../generated/CommandClasses";

describe("command", () => {
	it("can encode complete packet", () => {
		const packet = new SwitchMultilevelV1.Set({
			value: 0x30,
		});
		expect(packet.serialize()).to.deep.equal(Buffer.from("260130", "hex"));
	});

	it("supports easy decoding from buffer", () => {
		const buffer = Buffer.from("260130", "hex");
		const packet = new Packet(buffer);
		const data = packet.as(SwitchMultilevelV1.Set).data;
		expect(data).to.deep.equal({
			value: 0x30,
		});
	});

	it("supports easy creation of command from commandclass", () => {
		const packet = new SwitchMultilevelV1.Set({ value: 0x30 });
		expect(packet.data).to.deep.equal({ value: 0x30 });
		expect(packet.serialize()).to.deep.equal(Buffer.from("260130", "hex"));
	});

	it.skip("disallows invalid input when creating a command", () => {
		expect(
			() =>
				new SwitchMultilevelV1.Set({
					//@ts-expect-error
					foo: 123,
				})
		).to.throw();
	});

	it("allows commands being used as a type", () => {
		// The commands are defined as properties
		const packet: SwitchMultilevelV1.Get = new SwitchMultilevelV1.Get();
	});

	it("can decode a command through commandclass", () => {
		const buffer = Buffer.from("260130", "hex");
		const packet = new Packet(buffer);
		const specificClass = packet.as(SwitchMultilevelV1);
		expect(specificClass).to.be.instanceOf(SwitchMultilevelV1);
		const specificCmd = specificClass.as(SwitchMultilevelV1.Set);
		expect(specificCmd).to.be.instanceOf(SwitchMultilevelV1.Set);
		expect(specificCmd.commandAndPayload).to.deep.equal(
			Buffer.from("0130", "hex")
		);
		expect(specificCmd.data.value).to.equal(0x30);
	});

	it("can decode a command directly", () => {
		const buffer = Buffer.from("260130", "hex");
		const packet = new Packet(buffer);
		const specificCmd = packet.as(SwitchMultilevelV1.Set);
		expect(specificCmd).to.be.instanceOf(SwitchMultilevelV1.Set);
		expect(specificCmd.commandAndPayload).to.deep.equal(
			Buffer.from("0130", "hex")
		);
		expect(specificCmd.data.value).to.equal(0x30);
	});

	it("can decode a command without payload", () => {
		const buffer = Buffer.from("2602", "hex");
		const packet = new Packet(buffer);
		const specificCmd = packet.as(SwitchMultilevelV1.Get);
		expect(specificCmd).to.be.instanceOf(SwitchMultilevelV1.Get);
		expect(specificCmd.commandAndPayload).to.deep.equal(
			Buffer.from("02", "hex")
		);
		expect(specificCmd.data).to.deep.equal({});
	});

	it("can encode a command without payload", () => {
		const cmd1 = new SwitchMultilevelV1.Get();
		const cmd2 = new SwitchMultilevelV1.Get(undefined);

		const expected = Buffer.from("2602", "hex");
		expect(cmd1.serialize()).to.deep.equal(expected);
		expect(cmd2.serialize()).to.deep.equal(expected);
	});

	it("rejects decoding as incompatible command", () => {
		const buffer = Buffer.from("260130", "hex");
		const genericCmd = new Packet(buffer);
		expect(() => genericCmd.as(SwitchMultilevelV1.Get)).to.throw(
			"cannot convert"
		);
	});
});
