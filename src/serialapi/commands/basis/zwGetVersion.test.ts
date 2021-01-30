import { expect } from "chai";
import { ZwGetVersionCommand } from "./zwGetVersion";

// prettier-ignore
export const zwGetVersionBuffer = Buffer.from([
	0x5a, 0x2d, 0x57, 0x61, 0x76, 0x65, 0x20, 0x33, 0x2e, 0x39, 0x35, 0x00, 0x01
]);

describe("serialapi/commands/basis/zwGetVersion", () => {
	it("ZwGetVersionCommand", async () => {
		const cmd = new ZwGetVersionCommand();
		expect(cmd.serializeRequest()).to.equal(undefined);
		expect(cmd.parseResponse(zwGetVersionBuffer)).to.deep.equal({
			libraryType: 1,
			libraryVersion: "Z-Wave 3.95",
		});
	});
});
