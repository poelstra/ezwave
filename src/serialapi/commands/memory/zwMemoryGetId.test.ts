import { expect } from "chai";
import { zwMemoryGetIdBuilder } from "./zwMemoryGetId";

// prettier-ignore
export const zwMemoryGetIdBuffer = Buffer.from([0x12, 0x34, 0x56, 0x78, 0x01]);

describe("serialapi/commands/memory/zwMemoryGetId", () => {
	it("ZwMemoryGetIdCommand", async () => {
		const cmd = zwMemoryGetIdBuilder()(1);
		expect(cmd.params).to.equal(undefined);
		expect(cmd.parseResponse(zwMemoryGetIdBuffer)).to.deep.equal({
			homeId: 0x12345678,
			nodeId: 1,
		});
	});
});
