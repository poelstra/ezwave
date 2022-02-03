import { serialApiGetCapabilitiesBuilder } from "./serialApiGetCapabilities";

// prettier-ignore
export const serialCapsBuffer = Buffer.from([
	0x01, 0x00, 0x00, 0x86, 0x00, 0x01, 0x00, 0x5a, 0xfe, 0x81, 0xff, 0x88, 0x4f, 0x1f,
	0x00, 0x00, 0xfb, 0x9f, 0x7d, 0xa0, 0x67, 0x00, 0x00, 0x80, 0x00, 0x80, 0x86, 0x00,
	0x00, 0x00, 0xe8, 0x73, 0x00, 0x00, 0x0e, 0x00, 0x00, 0x60, 0x00, 0x00
]);

// prettier-ignore
const serialCapsSupportedFunctions = new Set([
	2, 3, 4, 5, 6, 7, 8, 9, 16, 17, 18, 19, 20, 21, 22, 23, 24, 28, 32, 33, 34, 35, 36,
	39, 41, 42, 43, 44, 45, 65, 66, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 80, 81, 83,
	84, 85, 86, 87, 94, 96, 97, 98, 99, 102, 103, 128, 144, 146, 147, 152, 180, 182,
	183, 184, 185, 186, 189, 190, 191, 210, 211, 212, 238, 239
]);

describe("serialapi/commands/serialApi/serialApiGetCapabilities", () => {
	it("SerialGetCapabilitiesCommand", async () => {
		const cmd = serialApiGetCapabilitiesBuilder()(1);
		expect(cmd.params).toBeUndefined();
		expect(cmd.parseResponse(serialCapsBuffer)).toEqual({
			applRevision: 0,
			applVersion: 1,
			manufacturerId: 134,
			manufacturerProductId: 90,
			manufacturerProductType: 1,
			supportedFunctions: serialCapsSupportedFunctions,
		});
	});
});
