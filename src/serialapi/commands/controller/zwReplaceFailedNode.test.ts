import { expect } from "chai";
import { Events } from "../events";
import { ICommandSession } from "../ICommandSession";
import { SerialApiCommandCode } from "../serialApiCommandCode";
import {
	ReplaceFailedNodeCallbackStatus,
	zwReplaceFailedNodeBuilder,
} from "./zwReplaceFailedNode";

describe("serialapi/commands/basis/zwReplaceFailedNode", () => {
	it("zwReplaceFailedNode", async () => {
		const cmd = zwReplaceFailedNodeBuilder({ nodeId: 3 })(1);

		// Request
		expect(cmd.params).to.deep.equal(Buffer.from([3, 1]));

		// Response
		expect(cmd.parseResponse!(Buffer.from([0]))).to.equal(undefined);
		expect(() => cmd.parseResponse!(Buffer.from([]))).to.throw();
		expect(() => cmd.parseResponse!(Buffer.from([1]))).to.throw();

		// Callbacks
		function check(
			payload: number[]
		): ReplaceFailedNodeCallbackStatus | undefined {
			return cmd.tryParseEvent(
				SerialApiCommandCode.ZW_REPLACE_FAILED_NODE,
				Buffer.from(payload)
			);
		}
		expect(check([1, 0])).to.equal(ReplaceFailedNodeCallbackStatus.NodeOk);
		expect(check([1, 3])).to.equal(ReplaceFailedNodeCallbackStatus.Replace);
		expect(check([1, 4])).to.equal(
			ReplaceFailedNodeCallbackStatus.ReplaceDone
		);
		expect(check([1, 5])).to.equal(
			ReplaceFailedNodeCallbackStatus.ReplaceFailed
		);
		expect(check([2, 0])).to.equal(undefined);
		expect(() => check([1])).to.throw();

		// Statemachine
		const events = new Events<ReplaceFailedNodeCallbackStatus>();
		events.add(ReplaceFailedNodeCallbackStatus.Replace);
		events.add(ReplaceFailedNodeCallbackStatus.ReplaceDone);
		await expect(
			cmd.handleEvents(events, {} as ICommandSession)
		).eventually.equals(undefined);

		events.add(ReplaceFailedNodeCallbackStatus.NodeOk);
		await expect(
			cmd.handleEvents(events, {} as ICommandSession)
		).eventually.rejectedWith("node responded");

		events.add(ReplaceFailedNodeCallbackStatus.Replace);
		events.add(ReplaceFailedNodeCallbackStatus.ReplaceFailed);
		await expect(
			cmd.handleEvents(events, {} as ICommandSession)
		).eventually.rejectedWith("replace failed");
	});
});
