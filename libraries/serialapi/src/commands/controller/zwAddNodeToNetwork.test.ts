import * as sinon from "sinon";
import { FAKE_TIMERS } from "../../fakeTimers.testutil";
import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { Events } from "../events";
import { ICommandSession } from "../ICommandSession";
import { SerialApiCommandCode } from "../serialApiCommandCode";
import { NodeInfoResponse } from "../types";
import {
	AddNodeError,
	AddNodeMode,
	zwAddNodeToNetworkBuilder,
	ZwAddNodeToNetworkRequest,
} from "./zwAddNodeToNetwork";
import { AddNodeResultStatus, Event } from "./zwAddNodeToNetwork.machine";

const testNif: NodeInfoResponse = {
	nodeId: 4,
	basicClass: 10,
	genericClass: 20,
	specificClass: 30,
	commandClasses: {
		supported: [40, 50],
		controlled: [60],
	},
};

const defaultRequest: ZwAddNodeToNetworkRequest = {
	flirsNodesCount: 0,
	listeningNodesCount: 0,
	totalNodes: 0,
};

const COMMAND_CLASSES_MARK = 0xef; // (239)

describe("serialapi/commands/controller/zwAddNodeToNetwork", () => {
	let clock: sinon.SinonFakeTimers;
	beforeEach(() => (clock = sinon.useFakeTimers({ toFake: FAKE_TIMERS })));
	afterEach(() => clock.restore());

	it("encodes correct request", () => {
		const cmd = zwAddNodeToNetworkBuilder(defaultRequest)(1);
		expect(cmd.params).toEqual(Buffer.from([0xc1, 1]));
	});

	it("decodes callbacks correctly", () => {
		const cmd = zwAddNodeToNetworkBuilder(defaultRequest)(1);

		function check(payload: number[]): Event | undefined {
			return cmd.tryParseEvent(
				SerialApiCommandCode.ZW_ADD_NODE_TO_NETWORK,
				Buffer.from(payload)
			);
		}
		expect(check([1, 1])).toEqual({
			type: "LEARN_READY",
		});
		expect(check([1, 2])).toEqual({
			type: "NODE_FOUND",
		});
		expect(check([1, 3, 4, 3, 10, 20, 30])).toEqual({
			type: "ADDING_SLAVE",
			nif: {
				nodeId: 4,
				basicClass: 10,
				genericClass: 20,
				specificClass: 30,
				commandClasses: {
					controlled: [],
					supported: [],
				},
			},
		});
		expect(
			check([1, 3, 4, 7, 10, 20, 30, 40, 50, COMMAND_CLASSES_MARK, 60])
		).toEqual({
			type: "ADDING_SLAVE",
			nif: testNif,
		});
		expect(() => check([1, 3])).toThrowError("missing nodeId / len");
		expect(
			check([1, 4, 4, 7, 10, 20, 30, 40, 50, COMMAND_CLASSES_MARK, 60])
		).toEqual({
			type: "ADDING_CONTROLLER",
			nif: testNif,
		});
		expect(check([1, 5])).toEqual({
			type: "PROTOCOL_DONE",
		});
		expect(check([1, 6])).toEqual({
			type: "DONE",
		});
		expect(check([1, 7])).toEqual({
			type: "PROTOCOL_FAILED",
		});
		expect(check([1, 0x23])).toEqual({
			type: "NOT_PRIMARY",
		});
		expect(check([2, 0])).toBeUndefined();
		expect(() => check([1])).toThrowError();
	});

	it("handles normal inclusion flow", async () => {
		let doCancel: (() => void) | undefined;
		const request: ZwAddNodeToNetworkRequest = {
			...defaultRequest,
			onCancellable: (cancel) => (doCancel = cancel),
		};
		const cmd = zwAddNodeToNetworkBuilder(request)(1);

		const events = new Events<Event>();
		const sendStub = sinon.stub().resolves();
		const fakeSession = {
			send: sendStub,
		} as unknown as ICommandSession;

		const testResult = expect(
			cmd.handleEvents(events, fakeSession)
		).resolves.toEqual(testNif);

		await clock.tickAsync(100);
		expect(doCancel).toBeDefined();

		events.add({ type: "LEARN_READY" });
		await clock.tickAsync(100);
		expect(doCancel).toBeDefined();

		events.add({ type: "NODE_FOUND" });
		await clock.tickAsync(0);
		expect(doCancel).toBeUndefined();

		events.add({ type: "ADDING_SLAVE", nif: testNif });
		events.add({ type: "PROTOCOL_DONE" });
		events.add({ type: "DONE" });

		await testResult;
		expect(sendStub.calledTwice).toBe(true);
		expect(sendStub.getCall(0).args).toEqual([
			SerialApiCommandCode.ZW_ADD_NODE_TO_NETWORK,
			Buffer.from([AddNodeMode.Stop, 1]),
		]);
		expect(sendStub.getCall(1).args).toEqual([
			SerialApiCommandCode.ZW_ADD_NODE_TO_NETWORK,
			Buffer.from([AddNodeMode.Stop, 0]),
		]);
	});

	it("can be cancelled while waiting", async () => {
		let doCancel: (() => void) | undefined;
		const request: ZwAddNodeToNetworkRequest = {
			...defaultRequest,
			onCancellable: (cancel) => (doCancel = cancel),
		};
		const cmd = zwAddNodeToNetworkBuilder(request)(1);

		const events = new Events<Event>();
		const sendStub = sinon.stub().resolves();
		const fakeSession = {
			send: sendStub,
		} as unknown as ICommandSession;

		const testResult = expect(
			cmd.handleEvents(events, fakeSession)
		).rejects.toThrow("Cancelled");

		events.add({ type: "LEARN_READY" });
		await clock.tickAsync(1000);

		expect(doCancel).toBeDefined();
		doCancel!();

		expect(doCancel).toBeUndefined();

		events.add({ type: "DONE" });

		await testResult;
		expect(sendStub.calledTwice).toBe(true);
		expect(sendStub.getCall(0).args).toEqual([
			SerialApiCommandCode.ZW_ADD_NODE_TO_NETWORK,
			Buffer.from([AddNodeMode.Stop, 1]),
		]);
		expect(sendStub.getCall(1).args).toEqual([
			SerialApiCommandCode.ZW_ADD_NODE_TO_NETWORK,
			Buffer.from([AddNodeMode.Stop, 0]),
		]);
	});

	it("handles inclusion timeout", async () => {
		const cmd = zwAddNodeToNetworkBuilder(defaultRequest)(1);

		const events = new Events<Event>();
		const sendStub = sinon.stub().resolves();
		const fakeSession = {
			send: sendStub,
		} as unknown as ICommandSession;

		const testResult = expect(
			cmd.handleEvents(events, fakeSession)
		).rejects.toThrow("TimedOut");

		events.add({ type: "LEARN_READY" });
		await clock.tickAsync(60000);

		expect(sendStub.calledOnce).toBe(true);
		expect(sendStub.getCall(0).args).toEqual([
			SerialApiCommandCode.ZW_ADD_NODE_TO_NETWORK,
			Buffer.from([AddNodeMode.Stop, 0]),
		]);

		await testResult;
		expect(sendStub.calledOnce).toBe(true);
	});

	describe("failure paths", () => {
		const STOP_TIMEOUT = 60 * 1000;

		const stopWithCallback = [
			SerialApiCommandCode.ZW_ADD_NODE_TO_NETWORK,
			Buffer.from([AddNodeMode.Stop, 1]),
		];
		const stopWithoutCallback = [
			SerialApiCommandCode.ZW_ADD_NODE_TO_NETWORK,
			Buffer.from([AddNodeMode.Stop, 0]),
		];

		function setup(): {
			events: Events<Event>;
			sendStub: sinon.SinonStub;
			cancel: () => void;
			run: () => Promise<NodeInfoResponse>;
		} {
			let doCancel: (() => void) | undefined;
			const cmd = zwAddNodeToNetworkBuilder({
				...defaultRequest,
				onCancellable: (cancel) => (doCancel = cancel),
			})(1);
			const events = new Events<Event>();
			const sendStub = sinon.stub().resolves();
			const fakeSession = {
				send: sendStub,
			} as unknown as ICommandSession;
			return {
				events,
				sendStub,
				// Late/repeated calls to a stale cancel callback must be harmless
				cancel: () => doCancel?.(),
				run: () => cmd.handleEvents(events, fakeSession),
			};
		}

		/** Expect an AddNodeError with the given status (and optional nif). */
		async function expectAddNodeError(
			result: Promise<unknown>,
			status: AddNodeResultStatus,
			nif?: NodeInfoResponse
		): Promise<void> {
			const err: unknown = await result.then(
				() => undefined,
				(e: unknown) => e
			);
			expect(err).toBeInstanceOf(AddNodeError);
			expect((err as AddNodeError).status).toBe(status);
			expect((err as AddNodeError).nif).toEqual(nif);
		}

		it("fails with the underlying error when stop fails during cancel", async () => {
			const { events, sendStub, cancel, run } = setup();
			sendStub.onFirstCall().rejects(new Error("serial failure"));
			const testResult = expect(run()).rejects.toThrow("serial failure");

			events.add({ type: "LEARN_READY" });
			await clock.tickAsync(100);
			cancel();
			await clock.tickAsync(0);

			// Must fail immediately, not hang until some timeout
			await testResult;
			expect(sendStub.getCall(0).args).toEqual(stopWithCallback);
		});

		it("fails with the underlying error when final stop fails", async () => {
			const { events, sendStub, run } = setup();
			// 1st call: Stop with callback, 2nd call: final Stop without callback
			sendStub.onSecondCall().rejects(new Error("serial failure"));
			const testResult = expect(run()).rejects.toThrow("serial failure");

			events.add({ type: "LEARN_READY" });
			events.add({ type: "NODE_FOUND" });
			events.add({ type: "ADDING_SLAVE", nif: testNif });
			events.add({ type: "PROTOCOL_DONE" });
			events.add({ type: "DONE" });
			await clock.tickAsync(0);

			await testResult;
			expect(sendStub.getCall(1).args).toEqual(stopWithoutCallback);
		});

		it("fails with underlying error when stop fails after protocol failure", async () => {
			const { events, sendStub, run } = setup();
			sendStub.onFirstCall().rejects(new Error("serial failure"));
			const testResult = expect(run()).rejects.toThrow("serial failure");

			events.add({ type: "LEARN_READY" });
			events.add({ type: "NODE_FOUND" });
			events.add({ type: "ADDING_SLAVE", nif: testNif });
			events.add({ type: "PROTOCOL_FAILED" });
			await clock.tickAsync(0);

			await testResult;
		});

		it("times out when no Done is received after cancel", async () => {
			const { events, sendStub, cancel, run } = setup();
			const testResult = run();
			const checked = expectAddNodeError(
				testResult,
				AddNodeResultStatus.TimedOut
			);

			events.add({ type: "LEARN_READY" });
			await clock.tickAsync(100);
			cancel();

			await clock.tickAsync(STOP_TIMEOUT - 1);
			expect(sendStub.callCount).toBe(1);
			await clock.tickAsync(1);

			await checked;
			// Still tells the chip to stop, without waiting for a callback
			expect(sendStub.callCount).toBe(2);
			expect(sendStub.getCall(0).args).toEqual(stopWithCallback);
			expect(sendStub.getCall(1).args).toEqual(stopWithoutCallback);
		});

		it("times out when protocol never becomes ready", async () => {
			const { sendStub, run } = setup();
			const checked = expectAddNodeError(
				run(),
				AddNodeResultStatus.TimedOut
			);

			await clock.tickAsync(10 * 1000);

			await checked;
			expect(sendStub.callCount).toBe(1);
			expect(sendStub.getCall(0).args).toEqual(stopWithoutCallback);
		});

		it("fails when node is not primary", async () => {
			const { events, sendStub, run } = setup();
			const checked = expectAddNodeError(
				run(),
				AddNodeResultStatus.NotPrimary
			);

			events.add({ type: "NOT_PRIMARY" });

			await checked;
			expect(sendStub.callCount).toBe(1);
			expect(sendStub.getCall(0).args).toEqual(stopWithoutCallback);
		});

		it("reports node as failed when no Done is received after success", async () => {
			const { events, sendStub, run } = setup();
			const checked = expectAddNodeError(
				run(),
				AddNodeResultStatus.AddedFailed,
				testNif
			);

			events.add({ type: "LEARN_READY" });
			events.add({ type: "NODE_FOUND" });
			events.add({ type: "ADDING_SLAVE", nif: testNif });
			events.add({ type: "PROTOCOL_DONE" });
			await clock.tickAsync(STOP_TIMEOUT);

			await checked;
			expect(sendStub.callCount).toBe(2);
			expect(sendStub.getCall(0).args).toEqual(stopWithCallback);
			expect(sendStub.getCall(1).args).toEqual(stopWithoutCallback);
		});

		it("cleans up when protocol reports failure", async () => {
			const { events, sendStub, run } = setup();
			const checked = expectAddNodeError(
				run(),
				AddNodeResultStatus.AddedFailed,
				testNif
			);

			events.add({ type: "LEARN_READY" });
			events.add({ type: "NODE_FOUND" });
			events.add({ type: "ADDING_SLAVE", nif: testNif });
			events.add({ type: "PROTOCOL_FAILED" });
			events.add({ type: "DONE" });

			await checked;
			expect(sendStub.callCount).toBe(2);
			expect(sendStub.getCall(0).args).toEqual(stopWithCallback);
			expect(sendStub.getCall(1).args).toEqual(stopWithoutCallback);
		});

		it("cleans up when no Done is received after protocol failure", async () => {
			const { events, sendStub, run } = setup();
			const checked = expectAddNodeError(
				run(),
				AddNodeResultStatus.AddedFailed,
				testNif
			);

			events.add({ type: "LEARN_READY" });
			events.add({ type: "NODE_FOUND" });
			events.add({ type: "ADDING_SLAVE", nif: testNif });
			events.add({ type: "PROTOCOL_FAILED" });
			await clock.tickAsync(STOP_TIMEOUT);

			await checked;
			expect(sendStub.callCount).toBe(2);
		});

		it("cleans up when node is found but never identified", async () => {
			const { events, sendStub, run } = setup();
			const checked = expectAddNodeError(
				run(),
				AddNodeResultStatus.AddedFailed
			);

			events.add({ type: "LEARN_READY" });
			events.add({ type: "NODE_FOUND" });
			await clock.tickAsync(60 * 1000);
			events.add({ type: "DONE" });

			await checked;
			expect(sendStub.callCount).toBe(2);
			expect(sendStub.getCall(0).args).toEqual(stopWithCallback);
			expect(sendStub.getCall(1).args).toEqual(stopWithoutCallback);
		});

		it("cleans up when including takes too long", async () => {
			const { events, sendStub, run } = setup();
			const checked = expectAddNodeError(
				run(),
				AddNodeResultStatus.AddedFailed,
				testNif
			);

			events.add({ type: "LEARN_READY" });
			events.add({ type: "NODE_FOUND" });
			events.add({ type: "ADDING_SLAVE", nif: testNif });
			await clock.tickAsync(76 * 1000 - 1);
			expect(sendStub.callCount).toBe(0);
			await clock.tickAsync(1);
			events.add({ type: "DONE" });

			await checked;
			expect(sendStub.callCount).toBe(2);
		});

		it("completes inclusion when a node is found while cancelling", async () => {
			const { events, sendStub, cancel, run } = setup();
			const testResult = expect(run()).resolves.toEqual(testNif);

			events.add({ type: "LEARN_READY" });
			await clock.tickAsync(100);
			cancel();
			events.add({ type: "NODE_FOUND" });
			events.add({ type: "ADDING_SLAVE", nif: testNif });
			events.add({ type: "PROTOCOL_DONE" });
			events.add({ type: "DONE" });

			await testResult;
			// Last send must be the final Stop without callback
			expect(sendStub.lastCall.args).toEqual(stopWithoutCallback);
		});

		it("ignores cancel once a node was found", async () => {
			const { events, cancel, run } = setup();
			const testResult = expect(run()).resolves.toEqual(testNif);

			events.add({ type: "LEARN_READY" });
			await clock.tickAsync(100);
			// Grab cancel callback while still valid, use it too late
			const staleCancel = cancel;
			events.add({ type: "NODE_FOUND" });
			await clock.tickAsync(0);
			staleCancel();
			await clock.tickAsync(0);
			events.add({ type: "ADDING_SLAVE", nif: testNif });
			events.add({ type: "PROTOCOL_DONE" });
			events.add({ type: "DONE" });

			await testResult;
		});
	});
});
