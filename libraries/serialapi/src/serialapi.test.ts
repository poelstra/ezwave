import { defer, noop } from "@ezwave/shared";
import { EventEmitter } from "events";
import * as sinon from "sinon";
import { zwGetVersionBuffer } from "./commands/basis/zwGetVersion.test";
import { zwMemoryGetIdBuffer } from "./commands/memory/zwMemoryGetId.test";
import { RequestRunner } from "./commands/RequestRunner";
import { serialCapsBuffer } from "./commands/serialApi/serialApiGetCapabilities.test";
import { serialGetInitDataBuffer } from "./commands/serialApi/serialApiGetInitData.test";
import { SerialApiCommandCode } from "./commands/serialApiCommandCode";
import { TransmitOptions, ZwSendData } from "./commands/transport/zwSendData";
import { ZwLibraryType } from "./commands/types";
import { IProtocol } from "./protocol";
import { SerialApi } from "./serialapi";

class FakeProtocol extends EventEmitter implements IProtocol {
	hardResetted(): Promise<void> {
		throw new Error("unexpected call during test");
	}

	softReset(): Promise<void> {
		throw new Error("unexpected call during test");
	}

	send(cmd: SerialApiCommandCode, params?: Buffer): Promise<void> {
		throw new Error("unexpected call during test");
	}

	request(
		cmd: SerialApiCommandCode,
		params?: Buffer,
		timeout?: number
	): Promise<Buffer> {
		throw new Error("unexpected call during test");
	}

	cancel(reason: Error): void {
		throw new Error("unexpected call during test");
	}
}

describe("SerialAPI", () => {
	let clock: sinon.SinonFakeTimers;
	let protocol: FakeProtocol;
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
		cmd: SerialApiCommandCode,
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

		handleSecondRequest = async (cmd, params) => {
			const funcId = params!.slice(-1)[0];
			expect([cmd, params]).toEqual([
				SerialApiCommandCode.ZW_SEND_DATA,
				Buffer.from([
					3, // NodeId
					1, // payload length
					0x34, // payload
					TransmitOptions.Ack |
						TransmitOptions.AutoRoute |
						TransmitOptions.Explore, // txOptions
					funcId, // funcId
				]),
			]);
			// prettier-ignore
			protocol.emit(
				"callback",
				SerialApiCommandCode.ZW_SEND_DATA,
				Buffer.from([
					funcId, // funcId
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
	});

	describe("uninitialized", () => {
		it("handles reset during init", async () => {
			// Act like partial init is happening
			requestStub.onCall(0).resolves(serialCapsBuffer);
			requestStub.onCall(1).resolves(zwGetVersionBuffer);
			const cancelDeferred = defer<never>();
			requestStub.onCall(2).returns(cancelDeferred.promise);
			cancelStub
				.onCall(0)
				.callsFake((reason) => cancelDeferred.reject(reason));
			const p1 = expect(SerialApi.create(protocol)).rejects.toThrowError(
				"protocol reset"
			);
			p1.then(noop, noop);
			await clock.tickAsync(0);
			protocol.emit("reset");
			await p1;
		});
	}); // uninitialized

	describe("initialized", () => {
		let serialApi: SerialApi;
		let serialApiEvents: any[][];

		beforeEach(async () => {
			// Initialize serial API in all further tests
			requestStub.onCall(0).resolves(serialCapsBuffer);
			requestStub.onCall(1).resolves(zwGetVersionBuffer);
			requestStub.onCall(2).resolves(serialGetInitDataBuffer);
			requestStub.onCall(3).resolves(zwMemoryGetIdBuffer);

			serialApi = await SerialApi.create(protocol);
			serialApiEvents = [];
			serialApi.on("command", (command) =>
				serialApiEvents.push(["command", command])
			);
			serialApi.on("error", (error) =>
				serialApiEvents.push(["error", error])
			);
			serialApi.on("close", () => serialApiEvents.push(["close"]));

			requestStub.reset();
			requestStub.throws(
				new Error("unexpected call to protocol.request()")
			);
		});

		afterEach(() => {
			// "Unexpected unprocessed serialApi events"
			expect(serialApiEvents).toEqual([]);
		});

		it("supports synchronous access after init", () => {
			const nodes = new Set([1, 10, 11, 13, 14, 15, 16, 22, 23, 24, 25]);
			expect(serialApi.isController()).toBe(true);
			expect(serialApi.getNodes()).toEqual(nodes);
			expect(serialApi.getHomeAndNodeId()).toEqual({
				homeId: 0x12345678,
				nodeId: 1,
			});
			expect(serialApi.getLibraryType()).toBe(
				ZwLibraryType.StaticController
			);
		});

		it("prevents calling unsupported functions", async () => {
			function requestBuilder() {
				return () => ({
					command: SerialApiCommandCode.ZW_SEND_SLAVE_DATA,
				});
			}
			class TestCommand extends RequestRunner<typeof requestBuilder> {
				public constructor() {
					super(requestBuilder, undefined);
				}
			}
			await expect(
				serialApi.execute(new TestCommand())
			).rejects.toThrowError("not supported");
		});

		describe("execute() with callback command", () => {
			it("sends commands successfully", async () => {
				requestStub.onCall(0).callsFake(async (cmd, params) => {
					expect([cmd, params]).toEqual([
						SerialApiCommandCode.ZW_SEND_DATA,
						Buffer.from([
							2, // NodeId
							1, // payload length
							0x12, // payload
							TransmitOptions.Ack |
								TransmitOptions.AutoRoute |
								TransmitOptions.Explore, // txOptions
							5, // funcId
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
						SerialApiCommandCode.ZW_SEND_DATA,
						Buffer.from([
							5, // funcId
							0, // txStatus OK
							0, 2, // transmit time in 10ms ticks
						])
					);

					return Buffer.from([
						0x01, // status queued OK
					]);
				});
				requestStub.onCall(1).callsFake(handleSecondRequest);

				await serialApi.execute(
					new ZwSendData({
						nodeId: 2,
						payload: Buffer.from([0x12]),
					})
				);
				await serialApi.execute(
					new ZwSendData({
						nodeId: 3,
						payload: Buffer.from([0x34]),
					})
				);
			});

			it("handles command not queued", async () => {
				requestStub.onCall(0).callsFake(async (cmd, params) => {
					expect([cmd, params]).toEqual([
						SerialApiCommandCode.ZW_SEND_DATA,
						Buffer.from([
							2, // NodeId
							1, // payload length
							0x12, // payload
							TransmitOptions.Ack |
								TransmitOptions.AutoRoute |
								TransmitOptions.Explore, // txOptions
							5, // funcId
						]),
					]);
					// no callback
					return Buffer.from([
						0x00, // status queue failed
					]);
				});
				sendStub.onCall(0).callsFake(async (cmd, params) => {
					expect([cmd, params]).toEqual([
						SerialApiCommandCode.ZW_SEND_DATA_ABORT,
						undefined,
					]);
				});
				requestStub.onCall(1).callsFake(handleSecondRequest);

				await expect(
					serialApi.execute(
						new ZwSendData({
							nodeId: 2,
							payload: Buffer.from([0x12]),
						})
					)
				).rejects.toThrowError("could not be queued");
				await serialApi.execute(
					new ZwSendData({
						nodeId: 3,
						payload: Buffer.from([0x34]),
					})
				);
			});

			it("handles command not ACKed", async () => {
				requestStub.onCall(0).callsFake(async (cmd, params) => {
					expect([cmd, params]).toEqual([
						SerialApiCommandCode.ZW_SEND_DATA,
						Buffer.from([
							2, // NodeId
							1, // payload length
							0x12, // payload
							TransmitOptions.Ack |
								TransmitOptions.AutoRoute |
								TransmitOptions.Explore, // txOptions
							5, // funcId
						]),
					]);
					// prettier-ignore
					protocol.emit(
						"callback",
						SerialApiCommandCode.ZW_SEND_DATA,
						Buffer.from([
							5, // funcId
							1, // txStatus NoACK
							0, 2, // transmit time in 10ms ticks
						])
					);
					return Buffer.from([
						0x01, // status queued OK
					]);
				});
				sendStub.onCall(0).callsFake(async (cmd, params) => {
					expect([cmd, params]).toEqual([
						SerialApiCommandCode.ZW_SEND_DATA_ABORT,
						undefined,
					]);
				});
				requestStub.onCall(1).callsFake(handleSecondRequest);

				await expect(
					serialApi.execute(
						new ZwSendData({
							nodeId: 2,
							payload: Buffer.from([0x12]),
						})
					)
				).rejects.toThrowError("NoAck");
				await serialApi.execute(
					new ZwSendData({
						nodeId: 3,
						payload: Buffer.from([0x34]),
					})
				);
			});

			it("handles timeout", async () => {
				requestStub.onCall(0).callsFake(async (cmd, params) => {
					expect([cmd, params]).toEqual([
						SerialApiCommandCode.ZW_SEND_DATA,
						Buffer.from([
							2, // NodeId
							1, // payload length
							0x12, // payload
							TransmitOptions.Ack |
								TransmitOptions.AutoRoute |
								TransmitOptions.Explore, // txOptions
							5, // funcId
						]),
					]);
					// No callback, so it will timeout
					return Buffer.from([
						0x01, // status queued OK
					]);
				});
				requestStub.onCall(1).callsFake(handleSecondRequest);

				const p = expect(
					serialApi.execute(
						new ZwSendData({
							nodeId: 2,
							payload: Buffer.from([0x12]),
						})
					)
				).rejects.toThrowError("timed out");
				await clock.runAllAsync();
				await p;

				await serialApi.execute(
					new ZwSendData({
						nodeId: 3,
						payload: Buffer.from([0x34]),
					})
				);
			});

			it("handles timeout when original device responds late", async () => {
				requestStub.onCall(0).callsFake(async (cmd, params) => {
					expect([cmd, params]).toEqual([
						SerialApiCommandCode.ZW_SEND_DATA,
						Buffer.from([
							2, // NodeId
							1, // payload length
							0x12, // payload
							TransmitOptions.Ack |
								TransmitOptions.AutoRoute |
								TransmitOptions.Explore, // txOptions
							5, // funcId
						]),
					]);
					// No callback, so it will timeout
					return Buffer.from([
						0x01, // status queued OK
					]);
				});
				requestStub.onCall(1).callsFake(handleSecondRequest);

				const p = expect(
					serialApi.execute(
						new ZwSendData({
							nodeId: 2,
							payload: Buffer.from([0x12]),
						})
					)
				).rejects.toThrowError("timed out");
				await clock.runAllAsync();
				await p;

				const p2 = serialApi.execute(
					new ZwSendData({
						nodeId: 3,
						payload: Buffer.from([0x34]),
					})
				);

				// Act like the original device does respond in the end,
				// which should not disturb the new request
				// prettier-ignore
				protocol.emit(
					"callback",
					SerialApiCommandCode.ZW_SEND_DATA,
					Buffer.from([
						5, // funcId
						1, // txStatus NoACK
						0, 2, // transmit time in 10ms ticks
					])
				);

				await p2;
			});

			it("serializes concurrent requests", async () => {
				// First request
				requestStub.onCall(0).callsFake(async (cmd, params) => {
					expect([cmd, params]).toEqual([
						SerialApiCommandCode.ZW_SEND_DATA,
						Buffer.from([
							2, // NodeId
							1, // payload length
							0x12, // payload
							TransmitOptions.Ack |
								TransmitOptions.AutoRoute |
								TransmitOptions.Explore, // txOptions
							5, // funcId
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
					.execute(
						new ZwSendData({
							nodeId: 2,
							payload: Buffer.from([0x12]),
						})
					)
					.then(() => {
						request1Done = true;
					});
				let request2Done = false;
				const request2 = serialApi
					.execute(
						new ZwSendData({
							nodeId: 3,
							payload: Buffer.from([0x34]),
						})
					)
					.then(() => {
						request2Done = true;
					});

				expect(request1Done).toBe(false);
				expect(request2Done).toBe(false);
				// Ack first request
				protocol.emit(
					"callback",
					SerialApiCommandCode.ZW_SEND_DATA,
					Buffer.from([
						5, // funcId
						0, // txStatus OK
						0,
						2, // transmit time in 10ms ticks
					])
				);
				await Promise.all([request1, request2]);
				expect(request1Done).toBe(true);
				expect(request2Done).toBe(true);
			});

			it("handles reset while waiting for protocol.request()", async () => {
				const cancelDeferred = defer<never>();
				// First request
				requestStub.onCall(0).returns(cancelDeferred.promise);
				cancelStub
					.onCall(0)
					.callsFake((reason) => cancelDeferred.reject(reason));

				const p1 = expect(
					serialApi.execute(
						new ZwSendData({
							nodeId: 2,
							payload: Buffer.from([0x12]),
						})
					)
				).rejects.toThrowError("protocol reset");
				await clock.runAllAsync(); // tick to let send be called
				expect(requestStub.calledOnce).toBe(true);
				protocol.emit("reset");
				await p1;
				expect(cancelStub.calledOnce).toBe(true);
				expect(serialApiEvents.map(([name]) => name)).toEqual([
					"error",
					"close",
				]);
				expect(serialApiEvents[0][1].message).toBe("protocol reset");
				serialApiEvents = [];
				await expect(
					serialApi.execute(
						new ZwSendData({
							nodeId: 3,
							payload: Buffer.from([0x34]),
						})
					)
				).rejects.toThrowError("protocol reset");
			});

			it("handles reset while waiting for reply", async () => {
				requestStub.onCall(0).resolves(
					Buffer.from([
						0x01, // status queued OK
					])
				);
				cancelStub.onCall(0).returns(undefined); // called in current implementation, but doesn't have to be

				const p1 = expect(
					serialApi.execute(
						new ZwSendData({
							nodeId: 2,
							payload: Buffer.from([0x12]),
						})
					)
				).rejects.toThrowError("protocol reset");
				await clock.tickAsync(0); // Tick such that protocol send completes successfully
				protocol.emit("reset");
				await p1;
				expect(serialApiEvents.map(([name]) => name)).toEqual([
					"error",
					"close",
				]);
				expect(serialApiEvents[0][1].message).toBe("protocol reset");
				serialApiEvents = [];
				await expect(
					serialApi.execute(
						new ZwSendData({
							nodeId: 3,
							payload: Buffer.from([0x34]),
						})
					)
				).rejects.toThrowError("protocol reset");
			});
		}); // send() with SerialApiCallbackCommand
	}); // initialized
});
