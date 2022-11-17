import { zwRequestNodeInfoBuilder } from ".";
import { SerialApiCommandCode } from "..";

describe("serialapi/commands/controller/zwRequestNodeInfo", () => {
	it("encodes correct request", () => {
		const cmd = zwRequestNodeInfoBuilder({ nodeId: 42 })(1);
		expect(cmd.params).toEqual(Buffer.from([42]));
	});

	it("parses valid response", () => {
		const cmd = zwRequestNodeInfoBuilder({ nodeId: 42 })(1);
		const response = cmd.tryParseEvent(
			SerialApiCommandCode.ZW_APPLICATION_UPDATE,
			Buffer.from([
				0x84, 42, 0x1a, 0x04, 0x11, 0x01, 0x5e, 0x20, 0x86, 0x72, 0x26,
				0x5a, 0x59, 0x85, 0x73, 0x98, 0x7a, 0x56, 0x70, 0x31, 0x32,
				0x8e, 0x60, 0x75, 0x71, 0x27, 0x22, 0xef, 0x2b,
			])
		);
		expect(response).toEqual({
			basicClass: 4,
			commandClasses: {
				controlled: [43],
				supported: [
					94, 32, 134, 114, 38, 90, 89, 133, 115, 152, 122, 86, 112,
					49, 50, 142, 96, 117, 113, 39, 34,
				],
			},
			genericClass: 17,
			nodeId: 42,
			specificClass: 1,
		});
	});

	it("throws on timeout", () => {
		const cmd = zwRequestNodeInfoBuilder({ nodeId: 42 })(1);
		expect(() =>
			cmd.tryParseEvent(
				SerialApiCommandCode.ZW_APPLICATION_UPDATE,
				Buffer.from([0x81, 0x00, 0x00])
			)
		).toThrowError("node 42 did not respond with Node Information Frame");
	});
});
