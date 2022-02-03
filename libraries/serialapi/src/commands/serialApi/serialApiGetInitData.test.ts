import {
	NodeCapabilityFlags,
	serialApiGetInitDataBuilder,
} from "./serialApiGetInitData";

// prettier-ignore
export const serialGetInitDataBuffer = Buffer.from([
	0x05, 0x08, 0x1d, 0x01, 0xf6, 0xe0, 0x01, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
	0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
	0x00, 0x00, 0x05, 0x00
]);

describe("serialapi/commands/serialApi/serialApiGetInitData", () => {
	it("SerialApiGetInitDataCommand", async () => {
		const cmd = serialApiGetInitDataBuilder()(1);
		expect(cmd.params).toBeUndefined();

		const capabilities = new Set([NodeCapabilityFlags.IsSIS]);
		const nodes = new Set([1, 10, 11, 13, 14, 15, 16, 22, 23, 24, 25]);
		expect(cmd.parseResponse(serialGetInitDataBuffer)).toEqual({
			apiVersion: 5,
			capabilities,
			chipType: 5,
			chipVersion: 0,
			nodes,
		});
	});
});
