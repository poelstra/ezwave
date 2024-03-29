import { never } from "@ezwave/shared";
import { EventEmitter } from "events";
import * as sinon from "sinon";
import {
	DataFrame,
	DataType,
	Frame,
	FrameError,
	FrameType,
	IFramer,
	SimpleFrame,
} from "./framer";
import { Protocol } from "./protocol";

/* eslint-disable require-atomic-updates */

const ACK_FRAME: SimpleFrame = { frameType: FrameType.ACK };
const NAK_FRAME: SimpleFrame = { frameType: FrameType.NAK };
const CAN_FRAME: SimpleFrame = { frameType: FrameType.CAN };

const BASIC_REQ_FRAME: DataFrame = {
	frameType: FrameType.SOF,
	dataType: DataType.REQ,
	command: 1,
	params: Buffer.from([0]),
};

const SOFT_RESET_FRAME: DataFrame = {
	frameType: FrameType.SOF,
	dataType: DataType.REQ,
	command: 8,
	params: Buffer.from([0]),
};

class FakeFramer extends EventEmitter implements IFramer {
	public received: Frame[] = [];
	public closed: boolean = false;

	public emitAck(): void {
		this.emit("frame", ACK_FRAME);
	}

	public emitNack(): void {
		this.emit("frame", NAK_FRAME);
	}

	public emitCan(): void {
		this.emit("frame", CAN_FRAME);
	}

	public emitData(
		dataType: DataType,
		command: number,
		params?: Buffer
	): void {
		if (!params) {
			params = Buffer.alloc(1);
		}
		if (params.length < 1) {
			throw new Error("invalid sendData, payload must be >=1 bytes");
		}
		const frame: DataFrame = {
			frameType: FrameType.SOF,
			dataType,
			command,
			params,
		};
		this.emit("frame", frame);
	}

	// Implementations of IFrame interface

	public async send(frame: Frame): Promise<void> {
		this.received.push(frame);
	}

	public async close(): Promise<void> {
		this.closed = true;
	}
}

interface ProtocolMessage {
	command: number;
	params: Buffer;
}

describe("SerialAPI protocol", () => {
	let clock: sinon.SinonFakeTimers;
	let framer: FakeFramer;
	let protocol: Protocol;
	let protocolMessages: ProtocolMessage[];
	let protocolEvents: string[];

	beforeEach(async () => {
		clock = sinon.useFakeTimers();
		framer = new FakeFramer();
		protocol = new Protocol(framer);
		protocolMessages = [];
		protocol.on("callback", (command, params) =>
			protocolMessages.push({ command, params })
		);
		protocolEvents = [];
		protocol.on("stuck", () => protocolEvents.push("stuck"));
		protocol.on("error", () => protocolEvents.push("error"));
		protocol.on("close", () => protocolEvents.push("close"));

		// Protocol automatically waits for startup delay, so wait for that here
		const reset = protocol.hardResetted();
		await clock.runAllAsync();
		await reset;
	});

	afterEach(async () => {
		await clock.runAllAsync();
		clock.restore();
		// "Unexpected unprocessed protocol events"
		expect(protocolEvents).toEqual([]);
		// "Unexpected unprocessed protocol messages"
		expect(protocolMessages).toEqual([]);
		// "Unexpected unprocessed serial frames"
		expect(framer.received).toEqual([]);
	});

	it("emits event from REQ frame", async () => {
		framer.emitData(DataType.REQ, 1);
		await clock.tickAsync(0);
		expect(protocolMessages).toEqual([
			{
				command: 1,
				params: Buffer.from([0]),
			},
		]);
		expect(framer.received).toEqual([ACK_FRAME]);
		protocolMessages = [];
		framer.received = [];
	});

	it("handles basic request", async () => {
		const result = protocol.request(1);
		await clock.tickAsync(0);

		expect(framer.received).toEqual([BASIC_REQ_FRAME]);
		framer.received = [];

		framer.emitAck();
		framer.emitData(DataType.RES, 1);
		await clock.tickAsync(0);

		expect(await result).toEqual(Buffer.from([0]));
		expect(framer.received).toEqual([ACK_FRAME]);
		framer.received = [];
	});

	describe("invalid frame handling", () => {
		it("sends NAK when checksum fails", async () => {
			framer.emit("frameError", FrameError.ChecksumFailed);
			await clock.tickAsync(0);
			expect(framer.received).toEqual([NAK_FRAME]);
			framer.received = [];
		});

		it("sends NAK when frame is too small", async () => {
			// Would be treated as a checksum error in the 'standard' decoder
			// as described in the spec, but that would cause a length counter
			// to become negative.
			framer.emit("frameError", FrameError.FrameTooSmall);
			await clock.tickAsync(0);
			expect(framer.received).toEqual([NAK_FRAME]);
			framer.received = [];
		});

		it("does not send NAK when sync is lost", async () => {
			// INS12350 5.4.1 - A host or a Z-Wave chip waiting for new traffic
			// MUST ignore all other byte values than 0x06 (ACK), 0x15 (NAK),
			// 0x18  (CAN) or 0x01 (Data frame).
			framer.emit("frameError", FrameError.SyncLost);
			await clock.tickAsync(0);
			expect(framer.received).toEqual([]);
			framer.received = [];
		});

		it("does not send NAK when unknown data type is received", async () => {
			// INS12350 5.4.3 - A receiving end MUST ignore reserved Type values
			framer.emit("frameError", FrameError.UnknownDataType);
			await clock.tickAsync(0);
			expect(framer.received).toEqual([]);
			framer.received = [];
		});

		it("does not send NAK on data frame timeout", async () => {
			// INS12350 6.2.1 - A host or Z-Wave chip MUST NOT issue a NAK frame after
			// aborting reception of a Data frame
			framer.emit("frameError", FrameError.ReadDataFrameTimeout);
			await clock.tickAsync(0);
			expect(framer.received).toEqual([]);
			framer.received = [];
		});
	});

	it("retransmits request on ACK timeout", async () => {
		const result = protocol.request(1);
		await clock.tickAsync(0);
		expect(framer.received).toEqual([BASIC_REQ_FRAME]);
		framer.received = [];

		await clock.tickAsync(1600);

		// Note: first retransmission can happen immediately on
		// first timeout, because first back-off delay (100ms)
		// is smaller than the already waited time (1600ms).
		expect(framer.received).toEqual([BASIC_REQ_FRAME]);
		framer.received = [];

		// Emit
		framer.emitAck();
		framer.emitData(DataType.RES, 1);
		await clock.tickAsync(0);

		expect(await result).toEqual(Buffer.from([0]));
		expect(framer.received).toEqual([ACK_FRAME]);
		framer.received = [];
	});

	it("fails request after 3 retransmissions and detects chip stuck", async () => {
		let resultFailed = false;
		const result = protocol.request(1);
		result.catch(() => (resultFailed = true));
		await clock.tickAsync(0);
		const expected: Frame[] = [BASIC_REQ_FRAME];

		await clock.tickAsync(1600);

		// First request timed out, and immediately resent
		// backOffDelay = 100 + 0 * 1000 - 1600 -> 'negative delay'
		expected.push(BASIC_REQ_FRAME);
		expect(framer.received).toEqual(expected);

		await clock.tickAsync(1600);

		// Second request timed out, and immediately resent
		// backOffDelay = 100 + 1 * 1000 - 1600 -> 'negative delay'
		expected.push(BASIC_REQ_FRAME);
		expect(framer.received).toEqual(expected);

		await clock.tickAsync(1600);

		// Third request timed out, resent after backOffDelay
		// backOffDelay = 100 + 2 * 1000 - 1600 -> 500ms
		expect(framer.received).toEqual(expected);
		await clock.tickAsync(500);
		expected.push(BASIC_REQ_FRAME);
		expect(framer.received).toEqual(expected);

		// Wait for that last request to timeout
		await clock.tickAsync(1599);
		expect(resultFailed).toBe(false);
		await clock.tickAsync(1);
		expect(resultFailed).toBe(true);

		// Forth request timed out, no further retransmissions
		expect(framer.received).toEqual(expected);
		expect(framer.received).toHaveLength(4); // 1 transmission, 3 retransmissions
		framer.received = [];

		await expect(result).rejects.toThrowError("send failed");
		expect(protocolEvents).toEqual(["stuck"]);
		protocolEvents = [];
	});

	it("handles simultaneous data frames", async () => {
		const result = protocol.request(1);
		framer.emitData(DataType.REQ, 2);
		// Framer now expects a ACK from its own request, but simultaneously
		// host started sending a data frame.
		await clock.tickAsync(0);
		expect(framer.received).toEqual([BASIC_REQ_FRAME, ACK_FRAME]);
		framer.received = [];
		framer.emitCan();
		// Expect a retransmission after 100ms backoff time (on first retransmission)
		await clock.tickAsync(100);
		expect(framer.received).toEqual([BASIC_REQ_FRAME]);
		framer.received = [];
		// Now complete the normal handshake to make sure everything is handled correctly
		framer.emitAck();
		framer.emitData(DataType.RES, 1);
		await clock.tickAsync(0);
		expect(framer.received).toEqual([ACK_FRAME]);
		framer.received = [];
		expect(protocolMessages).toEqual([
			{ command: 2, params: Buffer.from([0]) },
		]);
		protocolMessages = [];
		await expect(result).resolves.toEqual(Buffer.from([0]));
	});

	it.skip("handles RES timeout", async () => {
		// TODO: This test isn't testing what it should be, it's a copy of the previous...
		// Implement the correct test.
		const result = protocol.request(1);
		framer.emitData(DataType.REQ, 2);
		// Framer now expects a ACK from its own request, but simultaneously
		// host started sending a data frame.
		await clock.tickAsync(0);
		expect(framer.received).toEqual([BASIC_REQ_FRAME, ACK_FRAME]);
		framer.received = [];
		framer.emitCan();
		// Expect a retransmission after 100ms backoff time (on first retransmission)
		await clock.tickAsync(100);
		expect(framer.received).toEqual([BASIC_REQ_FRAME]);
		framer.received = [];
		// Now complete the normal handshake to make sure everything is handled correctly
		framer.emitAck();
		framer.emitData(DataType.RES, 1);
		await clock.tickAsync(0);
		expect(framer.received).toEqual([ACK_FRAME]);
		framer.received = [];
		expect(protocolMessages).toEqual([
			{ command: 2, params: Buffer.from([0]) },
		]);
		protocolMessages = [];
		await expect(result).resolves.toEqual(Buffer.from([0]));
	});

	it("closes when framer closes and prevents further actions", async () => {
		framer.emit("close");
		await clock.tickAsync(0);
		expect(protocolEvents).toEqual(["close"]);
		protocolEvents = [];

		framer.emitData(DataType.REQ, 1);
		framer.emit("error", new Error("boom"));
		framer.emit("close");
		expect(protocolEvents).toEqual([]);
		expect(protocolMessages).toEqual([]);

		await expect(protocol.send(1)).rejects.toThrowError("not idle");
		await expect(protocol.request(1)).rejects.toThrowError("not idle");
		await expect(protocol.hardResetted()).rejects.toThrowError("closed");
		await expect(protocol.softReset()).rejects.toThrowError("closed");
	});

	it("emits an error and closes when frames emits an error", async () => {
		framer.emit("error", new Error("boom"));
		await clock.tickAsync(0);
		expect(protocolEvents).toEqual(["error", "close"]);
		protocolEvents = [];

		framer.emitData(DataType.REQ, 1);
		framer.emit("error", new Error("boom"));
		framer.emit("close");
		expect(protocolEvents).toEqual([]);
		expect(protocolMessages).toEqual([]);

		await expect(protocol.send(1)).rejects.toThrowError("not idle");
		await expect(protocol.request(1)).rejects.toThrowError("not idle");
		await expect(protocol.hardResetted()).rejects.toThrowError("closed");
		await expect(protocol.softReset()).rejects.toThrowError("closed");
	});

	it("waits for reset to be triggered on startup", async () => {
		const newProtocol = new Protocol(framer);
		await expect(newProtocol.send(1)).rejects.toThrowError("not idle");
		await expect(newProtocol.request(1)).rejects.toThrowError("not idle");
	});

	it("prevents send/request while already sending", async () => {
		const sendResult = expect(protocol.send(1)).resolves.toBeUndefined();
		await clock.tickAsync(0);
		expect(framer.received).toEqual([BASIC_REQ_FRAME]);
		framer.received = [];

		await expect(protocol.send(2)).rejects.toThrowError("not idle");
		await expect(protocol.request(2)).rejects.toThrowError("not idle");

		framer.emitAck();
		await clock.tickAsync(0);
		await sendResult;

		const send2Result = expect(protocol.send(2)).resolves.toBeUndefined();
		framer.emitAck();
		expect(framer.received).toEqual([
			{
				frameType: FrameType.SOF,
				dataType: DataType.REQ,
				command: 2,
				params: Buffer.from([0]),
			},
		]);
		framer.received = [];
		await send2Result;
	});

	it("prevents send/request while already requesting", async () => {
		const sendResult = expect(protocol.request(1)).resolves.toEqual(
			Buffer.from([0])
		);
		await clock.tickAsync(0);
		expect(framer.received).toEqual([BASIC_REQ_FRAME]);
		framer.received = [];

		await expect(protocol.send(2)).rejects.toThrowError("not idle");
		await expect(protocol.request(2)).rejects.toThrowError("not idle");

		framer.emitAck();
		await clock.tickAsync(0);

		await expect(protocol.send(2)).rejects.toThrowError("not idle");
		await expect(protocol.request(2)).rejects.toThrowError("not idle");

		framer.emitData(DataType.RES, 1);
		await clock.tickAsync(0);
		expect(framer.received).toEqual([ACK_FRAME]);
		framer.received = [];
		await sendResult;

		const send2Result = expect(protocol.send(2)).resolves.toBeUndefined();
		framer.emitAck();
		expect(framer.received).toEqual([
			{
				frameType: FrameType.SOF,
				dataType: DataType.REQ,
				command: 2,
				params: Buffer.from([0]),
			},
		]);
		framer.received = [];
		await send2Result;
	});

	it("handles send error from framer in send()", async () => {
		const origSender = framer.send;
		framer.send = (frame): Promise<void> => {
			throw new Error("boom");
		};
		await expect(protocol.send(1)).rejects.toThrowError("boom");

		framer.send = origSender;
		const sendResult = expect(protocol.send(1)).resolves.toBeUndefined();
		framer.received = [];
		framer.emitAck();
		await sendResult;
	});

	it("handles send error from framer in request()", async () => {
		const origSender = framer.send;
		framer.send = (frame): Promise<void> => {
			throw new Error("boom");
		};
		await expect(protocol.request(1)).rejects.toThrowError("boom");

		framer.send = origSender;
		const requestResult = expect(protocol.request(2)).resolves.toEqual(
			Buffer.from([0])
		);
		framer.emitAck();
		framer.emitData(DataType.RES, 2);
		await requestResult;
		framer.received = [];
		protocolMessages = [];
	});

	it("handles soft reset while send", async () => {
		const sendResult = expect(protocol.send(1)).rejects.toThrowError(
			"reset"
		);
		const resetResult = expect(
			protocol.softReset()
		).resolves.toBeUndefined();
		await sendResult;
		await clock.nextAsync(); // tick reset delay
		await resetResult;

		const send2Result = expect(protocol.send(1)).resolves.toBeUndefined();
		framer.received = [];
		framer.emitAck();
		await send2Result;
	});

	it("handles abort while framer's send is pending", async () => {
		framer.send = never;
		const sendResult = expect(protocol.send(1)).rejects.toThrowError(
			"reset"
		);
		const reset = protocol.hardResetted();
		await clock.runAllAsync();
		await reset;
		await sendResult;
	});

	it("handles soft reset while request, during send", async () => {
		const requestResult = expect(protocol.request(1)).rejects.toThrowError(
			"reset"
		);
		const resetResult = expect(
			protocol.softReset()
		).resolves.toBeUndefined();
		await requestResult;
		await clock.nextAsync(); // tick reset delay
		await resetResult;

		const request2Result = expect(protocol.request(1)).resolves.toEqual(
			Buffer.from([0])
		);
		framer.received = [];
		framer.emitAck();
		framer.emitData(DataType.RES, 1);
		await request2Result;
		framer.received = [];
		protocolMessages = [];
	});

	it("handles soft reset while request, during result", async () => {
		const requestResult = expect(protocol.request(1)).rejects.toThrowError(
			"reset"
		);
		framer.emitAck();
		//await clock.tickAsync(0); // Without it, state resolve logic is trickier, which is good for a test :)

		const resetResult = expect(
			protocol.softReset()
		).resolves.toBeUndefined();
		await requestResult;
		await clock.nextAsync(); // await reset delay
		await resetResult;

		const request2Result = expect(protocol.request(1)).resolves.toEqual(
			Buffer.from([0])
		);
		framer.received = [];
		framer.emitAck();
		framer.emitData(DataType.RES, 1);
		await request2Result;
		framer.received = [];
		protocolMessages = [];
	});

	it("emits error and closes when event handler fails", async () => {
		protocol.on("callback", (_command, _params) => {
			throw new Error("boom");
		});
		framer.emitData(DataType.REQ, 1);
		await clock.tickAsync(0);
		protocolMessages = [];
		expect(framer.received).toEqual([ACK_FRAME]);
		expect(protocolEvents).toEqual(["error", "close"]);
		framer.received = [];
		protocolEvents = [];
	});

	it("handles port disconnect due to soft-reset (i.e. for USB device)", async () => {
		const reset = protocol.softReset();
		await clock.tickAsync(0);
		expect(framer.received).toEqual([
			NAK_FRAME,
			{
				frameType: FrameType.SOF,
				dataType: DataType.REQ,
				command: 8,
				params: Buffer.from([0]),
			},
		]);
		framer.emitAck(); // as observed from sending soft reset to real stick
		framer.received = [];
		framer.emit("close");
		await clock.runAllAsync();
		await reset;
		expect(protocolEvents).toEqual(["close"]);
		protocolEvents = [];
	});

	describe("handles reset from stuck event handler", () => {
		let softResetResult: Promise<void> | undefined;

		beforeEach(() => {
			// Set up protocol to auto-reset upon stuck event (as recommended in the spec)
			protocol.once(
				"stuck",
				() => (softResetResult = protocol.softReset())
			);

			// Make 'Z-Wave chip' act like USB device that disconnects when receiving
			// soft reset command
			framer.send = (frame): Promise<void> => {
				// Make sure to emit the close event synchronously, as that is the most tricky case
				framer.received.push(frame);
				if (
					frame.frameType === FrameType.SOF &&
					frame.dataType === DataType.REQ &&
					frame.command === 8
				) {
					framer.emitAck(); // as observed from sending soft reset to real stick
					framer.emit("close");
				}
				return Promise.resolve();
			};
		});

		it("on consecutive timeouts", async () => {
			// Trigger a command that gets stuck
			const sendResult = expect(protocol.send(1)).rejects.toThrowError(
				"send failed"
			);
			await clock.runAllAsync();
			expect(framer.received).toEqual([
				BASIC_REQ_FRAME,
				BASIC_REQ_FRAME,
				BASIC_REQ_FRAME,
				BASIC_REQ_FRAME,
				NAK_FRAME,
				SOFT_RESET_FRAME,
			]);
			expect(protocolEvents).toEqual(["stuck", "close"]);
			protocolEvents = [];
			framer.received = [];
			await sendResult;
			await softResetResult;
		});

		it("on consecutive line errors", async () => {
			// Trigger 3 consecutive line errors
			framer.emit("frameError", FrameError.FrameTooSmall);
			framer.emit("frameError", FrameError.ChecksumFailed);
			framer.emit("frameError", FrameError.SyncLost); // ignored
			framer.emit("frameError", FrameError.ReadDataFrameTimeout); // ignored
			await clock.tickAsync(0);
			expect(protocolEvents).toEqual([]);

			framer.emit("frameError", FrameError.ChecksumFailed);
			await clock.tickAsync(0);
			expect(protocolEvents).toEqual(["stuck", "close"]);
			expect(framer.received).toEqual([
				NAK_FRAME, // frame too small
				NAK_FRAME, // checksum failed
				NAK_FRAME, // checksum failed
				NAK_FRAME, // soft reset
				SOFT_RESET_FRAME,
			]);
			protocolEvents = [];
			framer.received = [];

			await clock.runAllAsync();
			await softResetResult;
		});
	});

	it("handles cancel() during send() while waiting for ACK", async () => {
		const sendResult = expect(protocol.send(1)).rejects.toThrowError(
			"cancelled"
		);
		protocol.cancel(new Error("cancelled"));
		await sendResult;

		const send2Result = expect(protocol.send(1)).resolves.toBeUndefined();
		framer.received = [];
		framer.emitAck();
		await send2Result;
	});

	it("handles cancel() during send() while framer's send is pending", async () => {
		const oldSend = framer.send;
		framer.send = never;
		const sendResult = expect(protocol.send(1)).rejects.toThrowError(
			"cancelled"
		);
		protocol.cancel(new Error("cancelled"));
		await sendResult;

		framer.send = oldSend;
		const send2Result = expect(protocol.send(1)).resolves.toBeUndefined();
		framer.received = [];
		framer.emitAck();
		await send2Result;
	});

	it("handles cancel() during request(), during send", async () => {
		const requestResult = expect(protocol.request(1)).rejects.toThrowError(
			"cancelled"
		);
		protocol.cancel(new Error("cancelled"));
		await requestResult;

		const request2Result = expect(protocol.request(1)).resolves.toEqual(
			Buffer.from([0])
		);
		framer.received = [];
		framer.emitAck();
		framer.emitData(DataType.RES, 1);
		await request2Result;
		framer.received = [];
		protocolMessages = [];
	});

	it("handles cancel() during request(), during result", async () => {
		const requestResult = expect(protocol.request(1)).rejects.toThrowError(
			"cancelled"
		);
		framer.emitAck();

		protocol.cancel(new Error("cancelled"));
		await requestResult;

		const request2Result = expect(protocol.request(1)).resolves.toEqual(
			Buffer.from([0])
		);
		framer.received = [];
		framer.emitAck();
		framer.emitData(DataType.RES, 1);
		await request2Result;
		framer.received = [];
		protocolMessages = [];
	});
});
