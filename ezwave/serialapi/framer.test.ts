import { expect } from "chai";
import { describe, it } from "mocha";
import * as sinon from "sinon";
import { DuplexSource } from "../test/testUtil";
import { DataType, Frame, FrameError, Framer, FrameType } from "./framer";

describe("SerialAPI Framer", () => {
	let clock: sinon.SinonFakeTimers;
	let chip: DuplexSource<Buffer>;
	let framer: Framer;
	let frameErrors: FrameError[];
	let framerReceived: Frame[];
	let framerEvents: string[];

	beforeEach(() => {
		clock = sinon.useFakeTimers();
		chip = new DuplexSource();
		framer = new Framer(chip);
		frameErrors = [];
		framerReceived = [];
		framerEvents = [];
		framer.on("frameError", (frameError) => frameErrors.push(frameError));
		framer.on("frame", (frame) => framerReceived.push(frame));
		framer.on("end", () => framerEvents.push("end"));
		framer.on("close", () => framerEvents.push("close"));
		framer.on("error", () => framerEvents.push("error"));
	});

	afterEach(async () => {
		await clock.runAllAsync();
		clock.restore();
		expect(
			frameErrors.map((le) => FrameError[le]),
			"Unexpected line errors"
		).to.deep.equal([]);
	});

	it("encodes ACK", async () => {
		await framer.send({ frameType: FrameType.ACK });
		expect(chip.received).to.deep.equal([Buffer.from([0x06])]);
	});

	it("encodes NAK", async () => {
		await framer.send({ frameType: FrameType.NAK });
		expect(chip.received).to.deep.equal([Buffer.from([0x15])]);
	});

	it("encodes CAN", async () => {
		await framer.send({ frameType: FrameType.CAN });
		expect(chip.received).to.deep.equal([Buffer.from([0x18])]);
	});

	it("encodes data frame", async () => {
		await framer.send({
			frameType: FrameType.SOF,
			dataType: DataType.REQ,
			command: 1,
			params: Buffer.from([0x55]),
		});
		expect(chip.received).to.deep.equal([
			Buffer.from([0x01, 4, 0x00, 1, 0x55, 0xaf]),
		]);
	});

	it("decodes ACK", async () => {
		chip.send(Buffer.from([0x06]));
		await clock.tickAsync(0);
		expect(framerReceived).to.deep.equal([
			{
				frameType: FrameType.ACK,
			},
		]);
	});

	it("decodes NAK", async () => {
		chip.send(Buffer.from([0x15]));
		await clock.tickAsync(0);
		expect(framerReceived).to.deep.equal([
			{
				frameType: FrameType.NAK,
			},
		]);
	});

	it("decodes CAN", async () => {
		chip.send(Buffer.from([0x18]));
		await clock.tickAsync(0);
		expect(framerReceived).to.deep.equal([
			{
				frameType: FrameType.CAN,
			},
		]);
	});

	it("decodes data frame", async () => {
		chip.send(Buffer.from([0x01, 4, 0x00, 1, 0x55, 0xaf]));
		await clock.tickAsync(0);
		expect(framerReceived).to.deep.equal([
			{
				frameType: FrameType.SOF,
				dataType: DataType.REQ,
				command: 1,
				params: Buffer.from([0x55]),
			},
		]);
	});

	it("decodes consecutive data frames", async () => {
		const dataFrame = Buffer.from([
			FrameType.SOF,
			4,
			DataType.REQ,
			1,
			0x55,
			0xaf,
		]);
		chip.send(Buffer.concat([dataFrame, dataFrame]));
		await clock.tickAsync(0);
		expect(framerReceived).to.deep.equal([
			{
				frameType: FrameType.SOF,
				dataType: DataType.REQ,
				command: 1,
				params: Buffer.from([0x55]),
			},
			{
				frameType: FrameType.SOF,
				dataType: DataType.REQ,
				command: 1,
				params: Buffer.from([0x55]),
			},
		]);
	});

	it("ignores garbage bytes", async () => {
		chip.send(
			Buffer.from([
				0xaa,
				0xbb,
				FrameType.CAN,
				0xcc,
				0xdd,
				FrameType.SOF,
				4,
				DataType.REQ,
				1,
				0x55,
				0xaf,
			])
		);
		await clock.tickAsync(0);
		expect(framerReceived).to.deep.equal([
			{
				frameType: FrameType.CAN,
			},
			{
				frameType: FrameType.SOF,
				dataType: DataType.REQ,
				command: 1,
				params: Buffer.from([0x55]),
			},
		]);
		expect(frameErrors).to.deep.equal([
			FrameError.SyncLost,
			FrameError.SyncLost,
		]);
		frameErrors = [];
	});

	it("ignores unknown data type", async () => {
		chip.send(
			Buffer.from([
				FrameType.SOF,
				4,
				0x2, // invalid data type
				1,
				0x55,
				0xad,
				FrameType.CAN,
			])
		);
		await clock.tickAsync(0);
		expect(framerReceived).to.deep.equal([
			{
				frameType: FrameType.CAN,
			},
		]);
		expect(frameErrors).to.deep.equal([FrameError.UnknownDataType]);
		frameErrors = [];
	});

	it("discards too short packet", async () => {
		chip.send(
			Buffer.from([
				FrameType.SOF,
				3,
				FrameType.SOF,
				1,
				0x55,
				0xad,
				FrameType.CAN,
			])
		);
		await clock.tickAsync(0);
		expect(framerReceived).to.deep.equal([]);
		expect(frameErrors).to.deep.equal([FrameError.FrameTooSmall]);
		frameErrors = [];
	});

	it("handles checksum failure", async () => {
		const badFrame = Buffer.from([
			FrameType.SOF,
			4,
			DataType.REQ,
			1,
			0x33,
			0xaf,
		]);
		const okFrame = Buffer.from([
			FrameType.SOF,
			4,
			DataType.REQ,
			1,
			0x55,
			0xaf,
		]);
		chip.send(Buffer.concat([badFrame, okFrame]));
		await clock.tickAsync(0);
		expect(framerReceived).to.deep.equal([
			{
				frameType: FrameType.SOF,
				dataType: DataType.REQ,
				command: 1,
				params: Buffer.from([0x55]),
			},
		]);
		expect(frameErrors).to.deep.equal([FrameError.ChecksumFailed]);
		frameErrors = [];
	});

	it("detects read timeout since SOF", async () => {
		const lastByteMissingFrame = Buffer.from([
			FrameType.SOF,
			4,
			DataType.REQ,
			1,
			0x55,
		]);
		// Send bytes one-by-one, to check whether the timer isn't
		// restarted for each byte
		for (const byte of lastByteMissingFrame) {
			chip.send(Buffer.from([byte]));
			await clock.tickAsync(100);
		}
		// This took 500ms. Total timeout is 1500ms.
		// So if we wait 999 ms, we should just NOT have timed out,
		// but after 1 ms more, it should have.
		await clock.tickAsync(999);
		expect(frameErrors).to.deep.equal([]);
		expect(framerReceived).to.deep.equal([]);
		await clock.tickAsync(1);
		expect(framerReceived).to.deep.equal([]);
		expect(frameErrors).to.deep.equal([FrameError.ReadDataFrameTimeout]);
		frameErrors = [];
	});

	it("recovers from read timeout", async () => {
		chip.send(Buffer.from([FrameType.SOF]));
		await clock.tickAsync(1500);
		expect(framerReceived).to.deep.equal([]);
		expect(frameErrors).to.deep.equal([FrameError.ReadDataFrameTimeout]);
		frameErrors = [];

		const okFrame = Buffer.from([
			FrameType.SOF,
			4,
			DataType.REQ,
			1,
			0x55,
			0xaf,
		]);
		chip.send(okFrame);
		await clock.tickAsync(0);
		expect(framerReceived).to.deep.equal([
			{
				frameType: FrameType.SOF,
				dataType: DataType.REQ,
				command: 1,
				params: Buffer.from([0x55]),
			},
		]);
		expect(frameErrors).to.deep.equal([]);
	});

	it("detects and forwards chip to host close", async () => {
		// Chip indicates EOF, and can no longer send Buffers
		chip.send(Buffer.from([FrameType.SOF])); // partial packet, needs to be 'aborted'
		chip.sendEnd();
		await clock.tickAsync(0);
		expect(framerEvents).to.deep.equal(["end"]);
		expect(chip.events).to.deep.equal([]);
		expect(frameErrors).to.deep.equal([FrameError.FrameTooSmall]);
		frameErrors = [];

		// Host received EOF, but can still send Frames
		await framer.send({ frameType: FrameType.ACK });
		expect(chip.received).to.deep.equal([Buffer.from([FrameType.ACK])]);
		expect(framerEvents).to.deep.equal(["end"]);
		expect(chip.events).to.deep.equal([]);

		// Now indicate end from host side too.
		await framer.close();
		await clock.tickAsync(0);
		expect(framerEvents).to.deep.equal(["end", "close"]);
		// Note: framer will only send end(), not destroy() in this case,
		// so "close" will not be emitted on chip
		expect(chip.events).to.deep.equal(["end"]);

		// Chip should indicate its own closure
		chip.destroy();
		await clock.tickAsync(0);
		expect(chip.events).to.deep.equal(["end", "close"]);
		expect(framerEvents).to.deep.equal(["end", "close"]);
	});

	it("detects and forwards host to chip close", async () => {
		chip.send(Buffer.from([FrameType.SOF])); // partial packet, needs to be 'aborted'
		await clock.tickAsync(0);

		await framer.close();
		expect(chip.events).to.deep.equal(["end"]);
		expect(framerEvents).to.deep.equal(["close"]);
		expect(frameErrors).to.deep.equal([FrameError.FrameTooSmall]);
		frameErrors = [];

		// Host received EOF, but could still emit Frames.
		// They won't be processed anymore though.
		chip.send(Buffer.from([FrameType.ACK]));
		await clock.tickAsync(0);
		expect(framerReceived).to.deep.equal([]);
		expect(chip.events).to.deep.equal(["end"]);
		expect(framerEvents).to.deep.equal(["close"]);

		// Now indicate end from host side too (which will be ignored)
		chip.sendEnd();
		await clock.tickAsync(0);
		expect(chip.events).to.deep.equal(["end"]);
		expect(framerEvents).to.deep.equal(["close"]);
	});

	it("forwards unexpected close from chip to host", async () => {
		chip.destroy();
		await clock.tickAsync(0);
		expect(chip.events).to.deep.equal(["close"]);
		expect(framerEvents).to.deep.equal(["close"]);
	});

	it("detects and forwards error from chip to host", async () => {
		// Chip indicates EOF, and can no longer send Buffers
		chip.send(Buffer.from([FrameType.SOF])); // partial packet, needs to be 'aborted'
		chip.destroy(new Error("boom"));
		await clock.tickAsync(0);

		expect(framerEvents).to.deep.equal(["error", "close"]);
		expect(chip.events).to.deep.equal(["error", "close"]);
		expect(frameErrors).to.deep.equal([FrameError.FrameTooSmall]);
		frameErrors = [];
	});

	it("survives error thrown in event handler", async () => {
		let errors: Error[] = [];
		framer.on("frame", (frame) => {
			throw new Error("boom");
		});
		framer.on("error", (err) => errors.push(err));

		const dataFrame = Buffer.from([
			FrameType.SOF,
			4,
			DataType.REQ,
			1,
			0x55,
			0xaf,
		]);
		chip.send(dataFrame);
		await clock.tickAsync(0);

		expect(errors).to.have.length(1);
		expect(errors[0].message).to.match(/boom/);
		expect(framerEvents).to.deep.equal(["error", "close"]);
		framerEvents = [];
	});
});
