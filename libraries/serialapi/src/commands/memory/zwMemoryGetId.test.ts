import { zwMemoryGetIdBuilder } from "./zwMemoryGetId";

// prettier-ignore
export const zwMemoryGetIdBuffer = Buffer.from([0x12, 0x34, 0x56, 0x78, 0x01]);

describe("serialapi/commands/memory/zwMemoryGetId", () => {
	it("ZwMemoryGetIdCommand", async () => {
		const cmd = zwMemoryGetIdBuilder()(1);
		expect(cmd.params).toBeUndefined();
		expect(cmd.parseResponse(zwMemoryGetIdBuffer)).toEqual({
			homeId: 0x12345678,
			nodeId: 1,
		});
	});
});
