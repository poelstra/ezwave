import { expect } from "chai";
import * as sinon from "sinon";
import CommandClasses from "../../../commands/classes/CommandClasses";
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

describe("serialapi/commands/basis/zwAddNodeToNetwork", () => {
	let clock: sinon.SinonFakeTimers;
	beforeEach(() => (clock = sinon.useFakeTimers()));
	afterEach(() => clock.restore());

	it("encodes correct request", () => {
		const cmd = zwAddNodeToNetworkBuilder(defaultRequest)(1);
		expect(cmd.params).to.deep.equal(Buffer.from([0xc1, 1]));
	});

	it("decodes callbacks correctly", () => {
		const cmd = zwAddNodeToNetworkBuilder(defaultRequest)(1);

		function check(payload: number[]): Event | undefined {
			return cmd.tryParseEvent(
				SerialApiCommandCode.ZW_ADD_NODE_TO_NETWORK,
				Buffer.from(payload)
			);
		}
		expect(check([1, 1])).to.deep.equal({
			type: "LEARN_READY",
		});
		expect(check([1, 2])).to.deep.equal({
			type: "NODE_FOUND",
		});
		expect(check([1, 3, 4, 3, 10, 20, 30])).to.deep.equal({
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
			check([1, 3, 4, 7, 10, 20, 30, 40, 50, CommandClasses.Mark, 60])
		).to.deep.equal({
			type: "ADDING_SLAVE",
			nif: testNif,
		});
		expect(() => check([1, 3])).to.throw("missing nodeId / len");
		expect(
			check([1, 4, 4, 7, 10, 20, 30, 40, 50, CommandClasses.Mark, 60])
		).to.deep.equal({
			type: "ADDING_CONTROLLER",
			nif: testNif,
		});
		expect(check([1, 5])).to.deep.equal({
			type: "PROTOCOL_DONE",
		});
		expect(check([1, 6])).to.deep.equal({
			type: "DONE",
		});
		expect(check([1, 7])).to.deep.equal({
			type: "PROTOCOL_FAILED",
		});
		expect(check([1, 0x23])).to.deep.equal({
			type: "NOT_PRIMARY",
		});
		expect(check([2, 0])).to.equal(undefined);
		expect(() => check([1])).to.throw();
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
		const fakeSession = ({
			send: sendStub,
		} as unknown) as ICommandSession;

		const testResult = expect(
			cmd.handleEvents(events, fakeSession)
		).eventually.deep.equals(testNif);

		await clock.tickAsync(100);
		expect(doCancel).to.not.be.undefined;

		events.add({ type: "LEARN_READY" });
		await clock.tickAsync(100);
		expect(doCancel).to.not.be.undefined;

		events.add({ type: "NODE_FOUND" });
		await clock.tickAsync(0);
		expect(doCancel).to.be.undefined;

		events.add({ type: "ADDING_SLAVE", nif: testNif });
		events.add({ type: "PROTOCOL_DONE" });
		events.add({ type: "DONE" });

		await testResult;
		expect(sendStub.calledTwice).to.equal(true);
		expect(sendStub.getCall(0).args).to.deep.equal([
			SerialApiCommandCode.ZW_ADD_NODE_TO_NETWORK,
			Buffer.from([AddNodeMode.Stop, 1]),
		]);
		expect(sendStub.getCall(1).args).to.deep.equal([
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
		const fakeSession = ({
			send: sendStub,
		} as unknown) as ICommandSession;

		const testResult = expect(
			cmd.handleEvents(events, fakeSession)
		).eventually.rejectedWith("Cancelled");

		events.add({ type: "LEARN_READY" });
		await clock.tickAsync(1000);

		expect(doCancel).to.not.be.undefined;
		doCancel!();

		expect(doCancel).to.be.undefined;

		events.add({ type: "DONE" });

		await testResult;
		expect(sendStub.calledTwice).to.equal(true);
		expect(sendStub.getCall(0).args).to.deep.equal([
			SerialApiCommandCode.ZW_ADD_NODE_TO_NETWORK,
			Buffer.from([AddNodeMode.Stop, 1]),
		]);
		expect(sendStub.getCall(1).args).to.deep.equal([
			SerialApiCommandCode.ZW_ADD_NODE_TO_NETWORK,
			Buffer.from([AddNodeMode.Stop, 0]),
		]);
	});

	it("handles inclusion timeout", async () => {
		const cmd = zwAddNodeToNetworkBuilder(defaultRequest)(1);

		const events = new Events<Event>();
		const sendStub = sinon.stub().resolves();
		const fakeSession = ({
			send: sendStub,
		} as unknown) as ICommandSession;

		const testResult = expect(
			cmd.handleEvents(events, fakeSession)
		).eventually.rejectedWith("TimedOut");

		events.add({ type: "LEARN_READY" });
		await clock.tickAsync(60000);

		expect(sendStub.calledOnce).to.equal(true);
		expect(sendStub.getCall(0).args).to.deep.equal([
			SerialApiCommandCode.ZW_ADD_NODE_TO_NETWORK,
			Buffer.from([AddNodeMode.Stop, 0]),
		]);

		await testResult;
		expect(sendStub.calledOnce).to.equal(true);
	});
});
