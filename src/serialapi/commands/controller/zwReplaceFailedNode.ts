import { enumToString, timeout, toHex } from "../../../common/util";
import { SerialApiCommandCode } from "../serialApiCommandCode";
import {
	SerialApiTransactionCommand,
	TransactionEventGetter,
	TransactionSender,
} from "../serialApiTransactionCommand";

export interface ZwReplaceFailedNodeRequest {
	nodeId: number;

	// TODO mentioned in C-interface docs, but not in SerialAPI structure?!
	//normalPower?: boolean; // default true, false means low power
}

enum ReplaceFailedNodeResponse {
	/**
	 * Replace process started.
	 */
	ReplaceStarted = 0,

	/**
	 * The replacing process was aborted because the controller is not
	 * a primary/inclusion/SIS controller.
	 */
	NotPrimaryController = 1 << 1,

	/**
	 * The replacing process was aborted because no call back function
	 * is used.
	 */
	NoCallbackFunction = 1 << 2,

	/**
	 * The requested process failed.
	 * The nodeID was not found in the controller list of failing nodes.
	 */
	NodeNotFound = 1 << 3,

	/**
	 * The replacing process is busy.
	 */
	ReplaceProcessBusy = 1 << 4,

	/**
	 * The replacing process failed.
	 * Reasons include:
	 * - Controller is busy
	 * - Node responded to a NOP, thus the node is no
	 *   longer failing.
	 */
	ReplaceFailed = 1 << 5,
}

enum ReplaceFailedNodeCallbackStatus {
	/**
	 * The node is working properly (removed from the failed nodes list).
	 * Replace process is stopped.
	 */
	NodeOk = 0,

	/**
	 * The failed node is ready to be replaced and controller is ready to add
	 * new node with the nodeID of the failed node.
	 * Meaning that the new node must now emit a nodeinformation frame to be
	 * included.
	 */
	Replace = 3,

	/**
	 * The failed node has been replaced.
	 */
	ReplaceDone = 4,

	/**
	 * The failed node has not been replaced.
	 */
	ReplaceFailed = 5,
}

export class ZwReplaceFailedNodeCommand extends SerialApiTransactionCommand<
	ZwReplaceFailedNodeRequest,
	ReplaceFailedNodeCallbackStatus,
	true
> {
	constructor(request: ZwReplaceFailedNodeRequest) {
		super(SerialApiCommandCode.ZW_REPLACE_FAILED_NODE, request);
	}

	serializeRequest(transactionId: number): Buffer {
		// TODO How should power flag be added?
		return Buffer.from([this.request.nodeId, transactionId]);
	}

	verifyResponse(response: Buffer): void {
		if (response.length < 1) {
			throw new Error(
				`command ${
					SerialApiCommandCode[this.command]
				} failed: got zero-length response from Z-Wave Serial device`
			);
		}
		const retVal = response[0] as ReplaceFailedNodeResponse;
		if (retVal !== ReplaceFailedNodeResponse.ReplaceStarted) {
			const flags: string[] = [];
			if ((retVal & ReplaceFailedNodeResponse.NotPrimaryController) > 0) {
				flags.push(
					ReplaceFailedNodeResponse[
						ReplaceFailedNodeResponse.NotPrimaryController
					]
				);
			}
			if ((retVal & ReplaceFailedNodeResponse.NoCallbackFunction) > 0) {
				flags.push(
					ReplaceFailedNodeResponse[
						ReplaceFailedNodeResponse.NoCallbackFunction
					]
				);
			}
			if ((retVal & ReplaceFailedNodeResponse.NodeNotFound) > 0) {
				flags.push(
					ReplaceFailedNodeResponse[
						ReplaceFailedNodeResponse.NodeNotFound
					]
				);
			}
			if ((retVal & ReplaceFailedNodeResponse.ReplaceProcessBusy) > 0) {
				flags.push(
					ReplaceFailedNodeResponse[
						ReplaceFailedNodeResponse.ReplaceProcessBusy
					]
				);
			}
			if ((retVal & ReplaceFailedNodeResponse.ReplaceFailed) > 0) {
				flags.push(
					ReplaceFailedNodeResponse[
						ReplaceFailedNodeResponse.ReplaceFailed
					]
				);
			}
			throw new Error(
				`command ${
					SerialApiCommandCode[this.command]
				} failed: replace node could not be started, code 0x${toHex(
					retVal,
					2
				)} (${flags.join(",")})`
			);
		}
	}

	parsePayload(payload: Buffer): ReplaceFailedNodeCallbackStatus {
		if (payload.length < 1) {
			throw new Error(
				`invalid ZwReplaceFailedNode callback: missing status`
			);
		}
		const status = payload[0] as ReplaceFailedNodeCallbackStatus;
		return status;
	}

	async execute(
		send: TransactionSender,
		getEvent: TransactionEventGetter<ReplaceFailedNodeCallbackStatus>
	): Promise<true> {
		const poll = async () => {
			while (true) {
				const event = await getEvent(60 * 1000);
				console.log(
					"REPLACE EVENT",
					enumToString(event, ReplaceFailedNodeCallbackStatus)
				);
				switch (event) {
					case ReplaceFailedNodeCallbackStatus.NodeOk:
						throw new Error(
							"original node responded, so not replaced"
						);
					case ReplaceFailedNodeCallbackStatus.Replace:
						// no-op
						// TODO call user-supplied callback to let them know
						// 'inclusion' should now really commence
						break;
					case ReplaceFailedNodeCallbackStatus.ReplaceDone:
						return true;
					case ReplaceFailedNodeCallbackStatus.ReplaceFailed:
						throw new Error("node replace failed");
					default:
						throw new Error(
							`unknown replace status callback 0x${toHex(
								event,
								2
							)} received`
						);
				}
			}
		};
		await timeout(poll(), 70 * 1000);
		return true;
	}
}
