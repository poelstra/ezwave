import * as chai from "chai";
import { expect } from "chai";
import * as chaiAsPromised from "chai-as-promised";
import { EventEmitter } from "events";
import { describe, it } from "mocha";
import * as sinon from "sinon";
import { defer, never } from "../common/util";
import { IProtocol } from "./protocol";
import {
	NodeCapabilityFlags,
	SerialApi,
	TransmitOptions,
	ZwLibraryType,
} from "./serialapi";
import { SerialAPICommand } from "./serialApiCommand";

chai.use(chaiAsPromised);

class FakeProtocol extends EventEmitter implements IProtocol {
	hardResetted(): Promise<void> {
		throw new Error("unexpected call during test");
	}

	softReset(): Promise<void> {
		throw new Error("unexpected call during test");
	}

	send(cmd: SerialAPICommand, params?: Buffer): Promise<void> {
		throw new Error("unexpected call during test");
	}

	request(
		cmd: SerialAPICommand,
		params?: Buffer,
		timeout?: number
	): Promise<Buffer> {
		throw new Error("unexpected call during test");
	}

	cancel(reason: Error): void {
		throw new Error("unexpected call during test");
	}
}

// prettier-ignore
const serialCapsBuffer = Buffer.from([
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

// prettier-ignore
const zwGetVersionBuffer = Buffer.from([
	0x5a, 0x2d, 0x57, 0x61, 0x76, 0x65, 0x20, 0x33, 0x2e, 0x39, 0x35, 0x00, 0x01
]);

// prettier-ignore
const serialGetInitDataBuffer = Buffer.from([
	0x05, 0x08, 0x1d, 0x01, 0xf6, 0xe0, 0x01, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
	0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
	0x00, 0x00, 0x05, 0x00
])

// prettier-ignore
const zwMemoryGetIdBuffer = Buffer.from([0x12, 0x34, 0x56, 0x78, 0x01]);

describe("SerialAPI", () => {
	let clock: sinon.SinonFakeTimers;
	let protocol: FakeProtocol;
	let serialApi: SerialApi;
	let serialApiEvents: any[][];
	let requestStub: sinon.SinonStub<
		Parameters<IProtocol["request"]>,
		ReturnType<IProtocol["request"]>
	>;
	let sendStub: sinon.SinonStub<
		Parameters<IProtocol["send"]>,
		ReturnType<IProtocol["send"]>
	>;
	let cancelStub: sinon.SinonStub<
		Parameters<IProtocol["cancel"]>,
		ReturnType<IProtocol["cancel"]>
	>;
	let handleSecondRequest: (
		cmd: SerialAPICommand,
		params?: Buffer
	) => Promise<Buffer>;

	beforeEach(async () => {
		clock = sinon.useFakeTimers();
		protocol = new FakeProtocol();
		requestStub = sinon.stub(protocol, "request");
		requestStub.throws(new Error("unexpected call to protocol.request()"));
		sendStub = sinon.stub(protocol, "send");
		sendStub.throws(new Error("unexpected call to protocol.send()"));
		cancelStub = sinon.stub(protocol, "cancel");
		cancelStub.throws(new Error("unexpected call to protocol.cancel()"));
		serialApi = new SerialApi(protocol);
		serialApiEvents = [];
		serialApi.on("command", (command) =>
			serialApiEvents.push(["command", command])
		);
		serialApi.on("error", (error) =>
			serialApiEvents.push(["error", error])
		);
		serialApi.on("close", () => serialApiEvents.push(["close"]));

		handleSecondRequest = async (cmd, params) => {
			expect([cmd, params]).to.deep.equal([
				SerialAPICommand.ZW_SEND_DATA,
				Buffer.from([
					3, // NodeId
					1, // payload length
					0x34, // payload
					TransmitOptions.Ack |
						TransmitOptions.AutoRoute |
						TransmitOptions.Explore, // txOptions
					2, // funcId
				]),
			]);
			// prettier-ignore
			protocol.emit(
				"callback",
				SerialAPICommand.ZW_SEND_DATA,
				Buffer.from([
					2, // funcId
					0, // txStatus OK
					0, 2, // transmit time in 10ms ticks
				])
			);
			return Buffer.from([
				0x01, // status queued OK
			]);
		};
	});

	afterEach(async () => {
		await clock.runAllAsync();
		clock.restore();
		expect(
			serialApiEvents,
			"Unexpected unprocessed serialApi events"
		).to.deep.equal([]);
	});

	describe("uninitialized", () => {
		it("serialGetCapabilities()", async () => {
			requestStub.onCall(0).resolves(serialCapsBuffer);

			const caps = await serialApi.serialGetCapabilities();

			expect(requestStub.callCount).to.equal(1);
			expect(requestStub.firstCall.args).to.deep.equal([
				SerialAPICommand.SERIAL_API_GET_CAPABILITIES,
				undefined,
			]);
			expect(caps).to.deep.equal({
				applRevision: 0,
				applVersion: 1,
				manufacturerId: 134,
				manufacturerProductId: 90,
				manufacturerProductType: 1,
				supportedFunctions: serialCapsSupportedFunctions,
			});
		});

		it("zwGetVersion()", async () => {
			requestStub.onCall(0).resolves(zwGetVersionBuffer);

			const versionInfo = await serialApi.zwGetVersion();

			expect(requestStub.callCount).to.equal(1);
			expect(requestStub.firstCall.args).to.deep.equal([
				SerialAPICommand.ZW_GET_VERSION,
				undefined,
			]);
			expect(versionInfo).to.deep.equal({
				libraryType: 1,
				libraryVersion: "Z-Wave 3.95",
			});
		});

		it("serialGetInitData()", async () => {
			requestStub.onCall(0).resolves(serialGetInitDataBuffer);

			const initData = await serialApi.serialGetInitData();

			expect(requestStub.callCount).to.equal(1);
			expect(requestStub.firstCall.args).to.deep.equal([
				SerialAPICommand.SERIAL_API_GET_INIT_DATA,
				undefined,
			]);
			const capabilities = new Set([NodeCapabilityFlags.IsSIS]);
			const nodes = new Set([1, 10, 11, 13, 14, 15, 16, 22, 23, 24, 25]);
			expect(initData).to.deep.equal({
				apiVersion: 5,
				capabilities,
				chipType: 5,
				chipVersion: 0,
				nodes,
			});
		});

		it("zwMemoryGetId()", async () => {
			requestStub.onCall(0).resolves(zwMemoryGetIdBuffer);

			const memoryInfo = await serialApi.zwMemoryGetId();

			expect(requestStub.callCount).to.equal(1);
			expect(requestStub.firstCall.args).to.deep.equal([
				SerialAPICommand.ZW_MEMORY_GET_ID,
				undefined,
			]);
			expect(memoryInfo).to.deep.equal({
				homeId: 0x12345678,
				nodeId: 1,
			});
		});

		it("must prevent calling unsupported functions when not initialized", async () => {
			await expect(
				serialApi.zwSendData(1, Buffer.from([0x01]))
			).to.eventually.be.rejectedWith("not initialized");
		});

		it("must prevent calling synchronous helpers when not initialized", () => {
			expect(() => serialApi.isController()).to.throw("not initialized");
			expect(() => serialApi.getNodes()).to.throw("not initialized");
			expect(() => serialApi.getHomeAndNodeId()).to.throw(
				"not initialized"
			);
			expect(() => serialApi.getLibraryType()).to.throw(
				"not initialized"
			);
		});

		it("handles reset during init", async () => {
			// Act like partial init is happening
			requestStub.onCall(0).resolves(serialCapsBuffer);
			requestStub.onCall(1).resolves(zwGetVersionBuffer);
			const cancelDeferred = defer<never>();
			requestStub.onCall(2).returns(cancelDeferred.promise);
			cancelStub
				.onCall(0)
				.callsFake((reason) => cancelDeferred.reject(reason));
			const p1 = expect(serialApi.init()).to.eventually.be.rejectedWith(
				"protocol reset"
			);
			await clock.tickAsync(0);
			protocol.emit("reset");
			await p1;
			expect(serialApiEvents.map(([name]) => name)).to.deep.equal([
				"error",
				"close",
			]);
			expect(serialApiEvents[0][1].message).to.equal("protocol reset");
			serialApiEvents = [];
			await expect(
				serialApi.zwSendData(3, Buffer.from([0x34]))
			).to.eventually.be.rejectedWith("Serial API closed");
		});

		it("ignores reset before starting initialize", async () => {
			protocol.emit("reset");
			requestStub.onCall(0).returns(never());
			serialApi.init();
			expect(requestStub.calledOnce).to.equal(true);
		});
	}); // uninitialized

	describe("initialized", () => {
		beforeEach(async () => {
			// Initialize serial API in all further tests
			requestStub.onCall(0).resolves(serialCapsBuffer);
			requestStub.onCall(1).resolves(zwGetVersionBuffer);
			requestStub.onCall(2).resolves(serialGetInitDataBuffer);
			requestStub.onCall(3).resolves(zwMemoryGetIdBuffer);

			await serialApi.init();

			requestStub.reset();
			requestStub.throws(
				new Error("unexpected call to protocol.request()")
			);
		});

		it("supports synchronous access after init", () => {
			const nodes = new Set([1, 10, 11, 13, 14, 15, 16, 22, 23, 24, 25]);
			expect(serialApi.isController()).to.equal(true);
			expect(serialApi.getNodes()).to.deep.equal(nodes);
			expect(serialApi.getHomeAndNodeId()).to.deep.equal({
				homeId: 0x12345678,
				nodeId: 1,
			});
			expect(serialApi.getLibraryType()).to.equal(
				ZwLibraryType.StaticController
			);
		});

		describe("zwSendData()", () => {
			it("sends commands successfully", async () => {
				requestStub.onCall(0).callsFake(async (cmd, params) => {
					expect([cmd, params]).to.deep.equal([
						SerialAPICommand.ZW_SEND_DATA,
						Buffer.from([
							2, // NodeId
							1, // payload length
							0x12, // payload
							TransmitOptions.Ack |
								TransmitOptions.AutoRoute |
								TransmitOptions.Explore, // txOptions
							1, // funcId
						]),
					]);

					// It's not entirely correct to emit the event even before
					// the promise is returned, but with Promises, order of
					// resolving is not entirely guaranteed (if other functions
					// are called in the chain, which generate new promises).
					// So theoretically, the callback could occur before the
					// promise of the result resolves. So, emit it here to
					// ensure that this case would be handled correctly.
					// prettier-ignore
					protocol.emit(
						"callback",
						SerialAPICommand.ZW_SEND_DATA,
						Buffer.from([
							1, // funcId
							0, // txStatus OK
							0, 2, // transmit time in 10ms ticks
						])
					);

					return Buffer.from([
						0x01, // status queued OK
					]);
				});
				requestStub.onCall(1).callsFake(handleSecondRequest);

				await serialApi.zwSendData(2, Buffer.from([0x12]));
				await serialApi.zwSendData(3, Buffer.from([0x34]));
			});

			it("handles command not queued", async () => {
				requestStub.onCall(0).callsFake(async (cmd, params) => {
					expect([cmd, params]).to.deep.equal([
						SerialAPICommand.ZW_SEND_DATA,
						Buffer.from([
							2, // NodeId
							1, // payload length
							0x12, // payload
							TransmitOptions.Ack |
								TransmitOptions.AutoRoute |
								TransmitOptions.Explore, // txOptions
							1, // funcId
						]),
					]);
					// no callback
					return Buffer.from([
						0x00, // status queue failed
					]);
				});
				sendStub.onCall(0).callsFake(async (cmd, params) => {
					expect([cmd, params]).to.deep.equal([
						SerialAPICommand.ZW_SEND_DATA_ABORT,
						undefined,
					]);
				});
				requestStub.onCall(1).callsFake(handleSecondRequest);

				await expect(
					serialApi.zwSendData(2, Buffer.from([0x12]))
				).to.eventually.be.rejectedWith("could not be queued");
				await serialApi.zwSendData(3, Buffer.from([0x34]));
			});

			it("handles command not ACKed", async () => {
				requestStub.onCall(0).callsFake(async (cmd, params) => {
					expect([cmd, params]).to.deep.equal([
						SerialAPICommand.ZW_SEND_DATA,
						Buffer.from([
							2, // NodeId
							1, // payload length
							0x12, // payload
							TransmitOptions.Ack |
								TransmitOptions.AutoRoute |
								TransmitOptions.Explore, // txOptions
							1, // funcId
						]),
					]);
					// prettier-ignore
					protocol.emit(
						"callback",
						SerialAPICommand.ZW_SEND_DATA,
						Buffer.from([
							1, // funcId
							1, // txStatus NoACK
							0, 2, // transmit time in 10ms ticks
						])
					);
					return Buffer.from([
						0x01, // status queued OK
					]);
				});
				sendStub.onCall(0).callsFake(async (cmd, params) => {
					expect([cmd, params]).to.deep.equal([
						SerialAPICommand.ZW_SEND_DATA_ABORT,
						undefined,
					]);
				});
				requestStub.onCall(1).callsFake(handleSecondRequest);

				await expect(
					serialApi.zwSendData(2, Buffer.from([0x12]))
				).to.eventually.rejectedWith("NoAck");
				await serialApi.zwSendData(3, Buffer.from([0x34]));
			});

			it("handles timeout", async () => {
				requestStub.onCall(0).callsFake(async (cmd, params) => {
					expect([cmd, params]).to.deep.equal([
						SerialAPICommand.ZW_SEND_DATA,
						Buffer.from([
							2, // NodeId
							1, // payload length
							0x12, // payload
							TransmitOptions.Ack |
								TransmitOptions.AutoRoute |
								TransmitOptions.Explore, // txOptions
							1, // funcId
						]),
					]);
					// No callback, so it will timeout
					return Buffer.from([
						0x01, // status queued OK
					]);
				});
				sendStub.onCall(0).callsFake(async (cmd, params) => {
					expect([cmd, params]).to.deep.equal([
						SerialAPICommand.ZW_SEND_DATA_ABORT,
						undefined,
					]);
				});
				requestStub.onCall(1).callsFake(handleSecondRequest);

				const p = expect(
					serialApi.zwSendData(2, Buffer.from([0x12]))
				).to.eventually.rejectedWith("timed out");
				await clock.runAllAsync();
				expect(sendStub.callCount).to.equal(1); // send data abort
				await p;

				await serialApi.zwSendData(3, Buffer.from([0x34]));
			});

			it("handles timeout when original device responds late", async () => {
				requestStub.onCall(0).callsFake(async (cmd, params) => {
					expect([cmd, params]).to.deep.equal([
						SerialAPICommand.ZW_SEND_DATA,
						Buffer.from([
							2, // NodeId
							1, // payload length
							0x12, // payload
							TransmitOptions.Ack |
								TransmitOptions.AutoRoute |
								TransmitOptions.Explore, // txOptions
							1, // funcId
						]),
					]);
					// No callback, so it will timeout
					return Buffer.from([
						0x01, // status queued OK
					]);
				});
				sendStub.onCall(0).callsFake(async (cmd, params) => {
					expect([cmd, params]).to.deep.equal([
						SerialAPICommand.ZW_SEND_DATA_ABORT,
						undefined,
					]);
				});
				requestStub.onCall(1).callsFake(handleSecondRequest);

				const p = expect(
					serialApi.zwSendData(2, Buffer.from([0x12]))
				).to.eventually.rejectedWith("timed out");
				await clock.runAllAsync();
				expect(sendStub.callCount).to.equal(1); // send data abort
				await p;

				const p2 = serialApi.zwSendData(3, Buffer.from([0x34]));

				// Act like the original device does respond in the end,
				// which should not disturb the new request
				// prettier-ignore
				protocol.emit(
					"callback",
					SerialAPICommand.ZW_SEND_DATA,
					Buffer.from([
						1, // funcId
						1, // txStatus NoACK
						0, 2, // transmit time in 10ms ticks
					])
				);

				await p2;
			});

			it("serializes concurrent requests", async () => {
				// First request
				requestStub.onCall(0).callsFake(async (cmd, params) => {
					expect([cmd, params]).to.deep.equal([
						SerialAPICommand.ZW_SEND_DATA,
						Buffer.from([
							2, // NodeId
							1, // payload length
							0x12, // payload
							TransmitOptions.Ack |
								TransmitOptions.AutoRoute |
								TransmitOptions.Explore, // txOptions
							1, // funcId
						]),
					]);
					// Don't emit ACK from end-device yet
					return Buffer.from([
						0x01, // status queued OK
					]);
				});
				// Second request
				requestStub.onCall(1).callsFake(handleSecondRequest);

				// Start both requests
				let request1Done = false;
				const request1 = serialApi
					.zwSendData(2, Buffer.from([0x12]))
					.then(() => {
						request1Done = true;
					});
				let request2Done = false;
				const request2 = serialApi
					.zwSendData(3, Buffer.from([0x34]))
					.then(() => {
						request2Done = true;
					});

				expect(request1Done).to.equal(false);
				expect(request2Done).to.equal(false);
				// Ack first request
				protocol.emit(
					"callback",
					SerialAPICommand.ZW_SEND_DATA,
					Buffer.from([
						1, // funcId
						0, // txStatus OK
						0,
						2, // transmit time in 10ms ticks
					])
				);
				await Promise.all([request1, request2]);
				expect(request1Done).to.equal(true);
				expect(request2Done).to.equal(true);
			});

			it("handles reset while waiting for protocol.request()", async () => {
				const cancelDeferred = defer<never>();
				// First request
				requestStub.onCall(0).returns(cancelDeferred.promise);
				cancelStub
					.onCall(0)
					.callsFake((reason) => cancelDeferred.reject(reason));

				const p1 = expect(
					serialApi.zwSendData(2, Buffer.from([0x12]))
				).to.eventually.be.rejectedWith("protocol reset");
				await clock.runAllAsync(); // tick to let send be called
				expect(requestStub.calledOnce).to.equal(true);
				protocol.emit("reset");
				await p1;
				expect(cancelStub.calledOnce).to.equal(true);
				expect(serialApiEvents.map(([name]) => name)).to.deep.equal([
					"error",
					"close",
				]);
				expect(serialApiEvents[0][1].message).to.equal(
					"protocol reset"
				);
				serialApiEvents = [];
				await expect(
					serialApi.zwSendData(3, Buffer.from([0x34]))
				).to.eventually.be.rejectedWith("Serial API closed");
			});

			it("handles reset while waiting for reply", async () => {
				requestStub.onCall(0).resolves(
					Buffer.from([
						0x01, // status queued OK
					])
				);
				cancelStub.onCall(0).returns(undefined); // called in current implementation, but doesn't have to be

				const p1 = expect(
					serialApi.zwSendData(2, Buffer.from([0x12]))
				).to.eventually.be.rejectedWith("protocol reset");
				await clock.tickAsync(0); // Tick such that protocol send completes successfully
				protocol.emit("reset");
				await p1;
				expect(serialApiEvents.map(([name]) => name)).to.deep.equal([
					"error",
					"close",
				]);
				expect(serialApiEvents[0][1].message).to.equal(
					"protocol reset"
				);
				serialApiEvents = [];
				await expect(
					serialApi.zwSendData(3, Buffer.from([0x34]))
				).to.eventually.be.rejectedWith("Serial API closed");
			});
		}); // zwSendData()
	}); // initialized
});
