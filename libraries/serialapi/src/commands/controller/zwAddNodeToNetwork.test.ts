import * as sinon from "sinon";
import { Events } from "../events";
import { ICommandSession } from "../ICommandSession";
import { SerialApiCommandCode } from "../serialApiCommandCode";
import { NodeInfoResponse } from "../types";
import {
	AddNodeMode,
	zwAddNodeToNetworkBuilder,
	ZwAddNodeToNetworkRequest,
} from "./zwAddNodeToNetwork";
import { Event } from "./zwAddNodeToNetwork.machine";

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
	beforeEach(() => (clock = sinon.useFakeTimers()));
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
});
