import {
	encodeCommandClasses,
	parseCommandClasses,
	parseCommandClassInfo,
} from "./commandClassInfo";

describe("commandClassInfo", () => {
	describe("parseCommandClasses", () => {
		it("supports good cases", () => {
			expect(parseCommandClasses(Buffer.from([]))).toEqual([]);
			expect(
				parseCommandClasses(Buffer.from([0x12, 0x13]))
			).toEqual([0x12, 0x13]);
			expect(
				parseCommandClasses(
					Buffer.from([0x12, 0x13, 0xf0, 0xf1, 0x12, 0xf1, 0xf2])
				)
			).toEqual([0x12, 0x13, 0xf0, 0xf112, 0xf1f2]);
		});

		it("throws on truncated multi-byte", () => {
			expect(() => parseCommandClasses(Buffer.from([0xf1]))).toThrowError("truncated");
		});
	});

	describe("parseCommandClassInfo", () => {
		it("supports good cases", () => {
			expect(
				parseCommandClassInfo(
					Buffer.from([0x12, 0x13, 0xef, 0x14, 0x15])
				)
			).toEqual({
				supported: [0x12, 0x13],
				controlled: [0x14, 0x15],
			});
			expect(
				parseCommandClassInfo(Buffer.from([0x12, 0x13]))
			).toEqual({
				supported: [0x12, 0x13],
				controlled: [],
			});
			expect(
				parseCommandClassInfo(Buffer.from([0x12, 0x13, 0xef]))
			).toEqual({
				supported: [0x12, 0x13],
				controlled: [],
			});
			expect(
				parseCommandClassInfo(Buffer.from([0xef, 0x12, 0x13]))
			).toEqual({
				supported: [],
				controlled: [0x12, 0x13],
			});
		});

		it("throws on multiple markers", () => {
			expect(() =>
				parseCommandClassInfo(
					Buffer.from([0x12, 0x13, 0xef, 0x14, 0x15, 0xef])
				)
			).toThrowError("multiple markers");
		});
	});

	describe("encodeCommandClasses", () => {
		it("works", () => {
			expect(encodeCommandClasses([0x12, 0x13, 0xf114])).toEqual(Buffer.from([0x12, 0x13, 0xf1, 0x14]));
		});
	});
});
