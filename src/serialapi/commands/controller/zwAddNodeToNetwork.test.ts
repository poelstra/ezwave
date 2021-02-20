import { expect } from "chai";
import { send } from "process";
import * as sinon from "sinon";
import CommandClasses from "../../../commands/classes/CommandClasses";
import { Events } from "../events";
import { ICommandSession } from "../ICommandSession";
import { SerialApiCommandCode } from "../serialApiCommandCode";
import { NodeInfoResponse } from "../types";
import {
	AddNodeCallback,
	AddNodeCallbackNif,
	AddNodeMode,
	AddNodeStatus,
	zwAddNodeToNetworkBuilder,
} from "./zwAddNodeToNetwork";

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

describe("serialapi/commands/basis/zwAddNodeToNetwork", () => {
	it("encodes correct request", () => {
		const cmd = zwAddNodeToNetworkBuilder()(1);
		expect(cmd.params).to.deep.equal(Buffer.from([0xc1, 1]));
	});

	it("decodes callbacks correctly", () => {
		const cmd = zwAddNodeToNetworkBuilder()(1);

		function check(payload: number[]): AddNodeCallback | undefined {
			return cmd.tryParseEvent(
				SerialApiCommandCode.ZW_ADD_NODE_TO_NETWORK,
				Buffer.from(payload)
			);
		}
		expect(check([1, 1])).to.deep.equal({
			status: AddNodeStatus.LearnReady,
		});
		expect(check([1, 2])).to.deep.equal({
			status: AddNodeStatus.NodeFound,
		});
		expect(check([1, 3, 4, 3, 10, 20, 30])).to.deep.equal(<
			AddNodeCallbackNif
		>{
			status: AddNodeStatus.AddingSlave,
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
		).to.deep.equal(<AddNodeCallbackNif>{
			status: AddNodeStatus.AddingSlave,
			nif: testNif,
		});
		expect(() => check([1, 3])).to.throw("missing nodeId / len");
		expect(
			check([1, 4, 4, 7, 10, 20, 30, 40, 50, CommandClasses.Mark, 60])
		).to.deep.equal({
			status: AddNodeStatus.AddingController,
			nif: testNif,
		});
		expect(check([1, 5])).to.deep.equal({
			status: AddNodeStatus.ProtocolDone,
		});
		expect(check([1, 6])).to.deep.equal({
			status: AddNodeStatus.Done,
		});
		expect(check([1, 7])).to.deep.equal({
			status: AddNodeStatus.Failed,
		});
		expect(check([1, 0x23])).to.deep.equal({
			status: AddNodeStatus.NotPrimary,
		});
		expect(check([2, 0])).to.equal(undefined);
		expect(() => check([1])).to.throw();
	});

	it("handles normal inclusion flow", async () => {
		const cmd = zwAddNodeToNetworkBuilder()(1);

		const events = new Events<AddNodeCallback>();
		const sendSpy = sinon.spy();
		const fakeSession = ({
			send: sendSpy,
		} as unknown) as ICommandSession;

		events.add({ status: AddNodeStatus.LearnReady });
		events.add({ status: AddNodeStatus.NodeFound });
		events.add({ status: AddNodeStatus.AddingSlave, nif: testNif });
		events.add({ status: AddNodeStatus.ProtocolDone });
		events.add({ status: AddNodeStatus.Done });
		await expect(
			cmd.handleEvents(events, fakeSession)
		).eventually.deep.equals(testNif);
		expect(sendSpy.calledTwice).to.equal(true);
		expect(sendSpy.getCall(0).args).to.deep.equal([
			SerialApiCommandCode.ZW_ADD_NODE_TO_NETWORK,
			Buffer.from([AddNodeMode.Stop, 1]),
		]);
		expect(sendSpy.getCall(1).args).to.deep.equal([
			SerialApiCommandCode.ZW_ADD_NODE_TO_NETWORK,
			Buffer.from([AddNodeMode.Stop, 0]),
		]);
	});
});
