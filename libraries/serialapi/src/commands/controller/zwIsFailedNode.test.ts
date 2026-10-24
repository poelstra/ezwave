import { zwIsFailedNodeBuilder } from "./zwIsFailedNode";

describe("serialapi/commands/controller/zwIsFailedNode", () => {
	it("encodes the node ID", () => {
		const cmd = zwIsFailedNodeBuilder({ nodeId: 38 })(1);
		expect(cmd.params).toEqual(Buffer.from([38]));
	});

	it("parses a failing node response", () => {
		const cmd = zwIsFailedNodeBuilder({ nodeId: 38 })(1);
		expect(cmd.parseResponse(Buffer.from([0x01]))).toBe(true);
	});

	it("parses a non-failing node response", () => {
		const cmd = zwIsFailedNodeBuilder({ nodeId: 38 })(1);
		expect(cmd.parseResponse(Buffer.from([0x00]))).toBe(false);
	});

	it("throws on an empty response", () => {
		const cmd = zwIsFailedNodeBuilder({ nodeId: 38 })(1);
		expect(() => cmd.parseResponse(Buffer.alloc(0))).toThrow();
	});
});
