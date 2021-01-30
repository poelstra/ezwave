import { expect } from "chai";
import { ZwMemoryGetIdCommand } from "./zwMemoryGetId";

// prettier-ignore
export const zwMemoryGetIdBuffer = Buffer.from([0x12, 0x34, 0x56, 0x78, 0x01]);

describe("serialapi/commands/memory/zwMemoryGetId", () => {
	it("ZwMemoryGetIdCommand", async () => {
		const cmd = new ZwMemoryGetIdCommand();
		expect(cmd.serializeRequest()).to.equal(undefined);
		expect(cmd.parseResponse(zwMemoryGetIdBuffer)).to.deep.equal({
			homeId: 0x12345678,
			nodeId: 1,
		});
	});
});
