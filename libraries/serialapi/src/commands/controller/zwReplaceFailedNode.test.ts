import { Events } from "../events";
import { ICommandSession } from "../ICommandSession";
import { SerialApiCommandCode } from "../serialApiCommandCode";
import {
	ReplaceFailedNodeCallbackStatus,
	zwReplaceFailedNodeBuilder,
} from "./zwReplaceFailedNode";

describe("serialapi/commands/controller/zwReplaceFailedNode", () => {
	it("zwReplaceFailedNode", async () => {
		const cmd = zwReplaceFailedNodeBuilder({ nodeId: 3 })(1);

		// Request
		expect(cmd.params).toEqual(Buffer.from([3, 1]));

		// Response
		expect(cmd.parseResponse!(Buffer.from([0]))).toBeUndefined();
		expect(() => cmd.parseResponse!(Buffer.from([]))).toThrowError();
		expect(() => cmd.parseResponse!(Buffer.from([1]))).toThrowError();

		// Callbacks
		function check(
			payload: number[]
		): ReplaceFailedNodeCallbackStatus | undefined {
			return cmd.tryParseEvent(
				SerialApiCommandCode.ZW_REPLACE_FAILED_NODE,
				Buffer.from(payload)
			);
		}
		expect(check([1, 0])).toBe(ReplaceFailedNodeCallbackStatus.NodeOk);
		expect(check([1, 3])).toBe(ReplaceFailedNodeCallbackStatus.Replace);
		expect(check([1, 4])).toBe(ReplaceFailedNodeCallbackStatus.ReplaceDone);
		expect(check([1, 5])).toBe(
			ReplaceFailedNodeCallbackStatus.ReplaceFailed
		);
		expect(check([2, 0])).toBeUndefined();
		expect(() => check([1])).toThrowError();

		// Statemachine
		const events = new Events<ReplaceFailedNodeCallbackStatus>();
		events.add(ReplaceFailedNodeCallbackStatus.Replace);
		events.add(ReplaceFailedNodeCallbackStatus.ReplaceDone);
		await expect(
			cmd.handleEvents(events, {} as ICommandSession)
		).resolves.toBeUndefined();

		events.add(ReplaceFailedNodeCallbackStatus.NodeOk);
		await expect(
			cmd.handleEvents(events, {} as ICommandSession)
		).rejects.toThrow("node responded");

		events.add(ReplaceFailedNodeCallbackStatus.Replace);
		events.add(ReplaceFailedNodeCallbackStatus.ReplaceFailed);
		await expect(
			cmd.handleEvents(events, {} as ICommandSession)
		).rejects.toThrow("replace failed");
	});
});
