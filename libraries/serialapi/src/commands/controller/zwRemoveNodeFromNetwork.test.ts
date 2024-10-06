import { Events } from "../events";
import { ICommandSession } from "../ICommandSession";
import { SerialApiCommandCode } from "../serialApiCommandCode";
import {
	RemoveNodeFromNetworkCallbackStatus,
	RemoveNodeFromNetworkEvent,
	zwRemoveNodeFromNetworkBuilder,
} from "./zwRemoveNodeFromNetwork";

function makeFakeSession(): ICommandSession {
	return {
		send: jest.fn(() => Promise.resolve()),
	} as unknown as ICommandSession;
}

describe("serialapi/commands/controller/zwRemoveNodeFromNetwork", () => {
	it("zwRemoveNodeFromNetwork", async () => {
		const cmd = zwRemoveNodeFromNetworkBuilder({})(1);

		// Request
		expect(cmd.params).toEqual(Buffer.from([0xc1, 1]));

		// Callbacks
		function check(
			payload: number[]
		): RemoveNodeFromNetworkEvent | undefined {
			return cmd.tryParseEvent(
				SerialApiCommandCode.ZW_REMOVE_NODE_FROM_NETWORK,
				Buffer.from(payload)
			);
		}
		expect(check([1, 0x02])).toEqual({
			status: RemoveNodeFromNetworkCallbackStatus.NodeFound,
		});
		expect(check([1, 0x03, 5])).toEqual({
			status: RemoveNodeFromNetworkCallbackStatus.ExclusionOngoingEndNode,
			nodeId: 5,
		});
		expect(check([1, 0x04, 5])).toEqual({
			status: RemoveNodeFromNetworkCallbackStatus.ExclusionOngoingControllerNode,
			nodeId: 5,
		});
		expect(check([2, 0])).toBeUndefined();
		expect(() => check([1])).toThrowError();

		// Statemachine
		const events = new Events<RemoveNodeFromNetworkEvent>();
		events.add({
			status: RemoveNodeFromNetworkCallbackStatus.NetworkExclusionStarted,
		});
		events.add({
			status: RemoveNodeFromNetworkCallbackStatus.ExclusionOngoingEndNode,
			nodeId: 5,
		});
		events.add({
			status: RemoveNodeFromNetworkCallbackStatus.ExclusionCompleted,
			nodeId: 5,
		});
		const fakeSession = makeFakeSession();
		await expect(cmd.handleEvents(events, fakeSession)).resolves.toBe(5);
		expect(fakeSession.send).toBeCalledTimes(1);
		expect(fakeSession.send).toBeCalledWith(
			SerialApiCommandCode.ZW_REMOVE_NODE_FROM_NETWORK,
			Buffer.from([0x05, 1])
		);

		events.add({ status: RemoveNodeFromNetworkCallbackStatus.NotPrimary });
		await expect(
			cmd.handleEvents(events, makeFakeSession())
		).rejects.toThrow("not a primary controller");

		events.add({
			status: RemoveNodeFromNetworkCallbackStatus.NetworkExclusionStarted,
		});
		events.add({
			status: RemoveNodeFromNetworkCallbackStatus.ExclusionFailed,
		});
		await expect(
			cmd.handleEvents(events, makeFakeSession())
		).rejects.toThrow("exclusion failed");
	});
});
