/* eslint-disable no-bitwise */
import { neverRejects, noop, toHex } from "@ezwave/shared";
import { buildCallbackParser } from "../callbackRequest";
import { RequestRunner } from "../RequestRunner";
import { CallbackRequestBuilder } from "../requests";
import { SerialApiCommandCode } from "../serialApiCommandCode";

export interface ZwRemoveNodeFromNetworkRequest {
	/**
	 * Whether to use Network Wide Exclusion (false, default), or
	 * direct range (true) exclusion.
	 */
	directRangeExclusion?: boolean;

	/**
	 * Use normal or low power for exclusion.
	 * Default false (normal power).
	 */
	lowPower?: boolean;

	/**
	 * Optional callback that will be called when the exclusion process
	 * can be cancelled, and called again when cancellation is no longer
	 * possible.
	 *
	 * When this callback is called, a cancel callback is provided that
	 * can be used to cancel exclusion.
	 *
	 * Note that if an error occurs early in the process, this callback
	 * may never be called.
	 *
	 * Calling the cancel callback when cancel is no longer possible is
	 * ignored.
	 */
	onCancellable?: (cancel: (() => void) | undefined) => void;
}

enum RemoveNodeMode {
	/**
	 * Exclude any kind of node.
	 * The Z-Wave Module MUST start network exclusion and attempt to remove any type
	 * of node. The Z-Wave Module MUST keep in removal process (network exclusion
	 * mode) until this command is called again with the Mode set to 0x05.
	 */
	AnyNode = 1,
	/**
	 * @deprecated
	 */
	ControllerNode = 2,
	/**
	 * @deprecated
	 */
	EndNode = 3,
	/**
	 * Reserved.
	 */
	Reserved1 = 4,
	/**
	 * Stop network exclusion mode.
	 */
	Stop = 5,
}

enum RemoveNodeFlags {
	NetworkWide = 1 << 6,
	NormalPower = 1 << 7,
}

/**
 * @internal
 */
export enum RemoveNodeFromNetworkCallbackStatus {
	/**
	 * The Z-Wave Module has initiated Network exclusion and is ready to remove existing
	 * nodes.
	 */
	NetworkExclusionStarted = 0x01,
	/**
	 * A node requesting exclusion has been found and the node removal operation is initiated.
	 */
	NodeFound = 0x02,
	/**
	 * The network exclusion is ongoing with an End Node.
	 */
	ExclusionOngoingEndNode = 0x03,
	/**
	 * The network exclusion is ongoing with a Controller node.
	 */
	ExclusionOngoingControllerNode = 0x04,
	/**
	 * Node removal operation is completed. The Z-Wave Module is ready to return to idle
	 * and the host application SHOULD issue a new Remove Node From Network Command -
	 * Initial data frame with the Mode set to 0x05 to stop the network exclusion.
	 */
	ExclusionCompleted = 0x06,
	/**
	 * Removal node operation is failed. This indicates the node may not have been re-
	 * moved, and the host application SHOULD issue a new Remove Node From Network
	 * Command - Initial data frame with the Mode set to 0x05 to stop the network exclusion.
	 */
	ExclusionFailed = 0x07,
	/**
	 * The node exclusion operation cannot be performed because the Z-Wave API Module
	 * does not have the Primary Controller role and the SIS functionality is not available in
	 * the current network.
	 */
	NotPrimary = 0x23,
}

/**
 * @internal
 */
export interface RemoveNodeFromNetworkEvent {
	status: RemoveNodeFromNetworkCallbackStatus;
	nodeId?: number;
}

/**
 * Put controller into exclusion mode.
 *
 * Returns nodeID of node that was removed (or 0 in case of
 * already-excluded or foreign network node).
 * Throws an error if exclusion fails.
 */
export class ZwRemoveNodeFromNetwork extends RequestRunner<
	typeof zwRemoveNodeFromNetworkBuilder
> {
	public constructor(request: ZwRemoveNodeFromNetworkRequest) {
		super(zwRemoveNodeFromNetworkBuilder, request);
	}
}

/**
 * @internal
 */
export function zwRemoveNodeFromNetworkBuilder(
	request: ZwRemoveNodeFromNetworkRequest
): CallbackRequestBuilder<RemoveNodeFromNetworkEvent, number> {
	return (transactionId) => {
		const command = SerialApiCommandCode.ZW_REMOVE_NODE_FROM_NETWORK;
		let flags = RemoveNodeMode.AnyNode;
		if (!request.lowPower) {
			flags |= RemoveNodeFlags.NormalPower;
		}
		if (!request.directRangeExclusion) {
			flags |= RemoveNodeFlags.NetworkWide;
		}
		return {
			command,
			params: Buffer.from([flags, transactionId]),
			tryParseEvent: buildCallbackParser(
				command,
				transactionId,
				(payload: Buffer): RemoveNodeFromNetworkEvent => {
					if (payload.length < 1) {
						throw new Error(
							`invalid ZwRemoveNodeFromNetwork callback: missing status`
						);
					}
					const status =
						payload[0] as RemoveNodeFromNetworkCallbackStatus;
					const nodeId = payload.length > 1 ? payload[1] : undefined;
					return { status, nodeId };
				}
			),
			handleEvents: async (events, session): Promise<number> => {
				let canCancel = true;
				const sendStop = async (): Promise<void> => {
					if (!canCancel) {
						return;
					}
					canCancel = false;
					await session
						.send(
							command,
							Buffer.from([RemoveNodeMode.Stop, transactionId])
						)
						.catch(noop);
				};
				const cancel = (): void =>
					sendStop ? neverRejects(sendStop()) : undefined;
				request.onCancellable?.(cancel);

				let excludedNode: number | undefined;

				try {
					// eslint-disable-next-line no-constant-condition
					while (true) {
						const event = await events.get(60 * 1000);
						switch (event.status) {
							case RemoveNodeFromNetworkCallbackStatus.NetworkExclusionStarted:
								// Waiting for a node to advertise its NIF
								break;
							case RemoveNodeFromNetworkCallbackStatus.NodeFound:
								// Node advertised its NIF
								break;
							case RemoveNodeFromNetworkCallbackStatus.ExclusionOngoingEndNode:
							case RemoveNodeFromNetworkCallbackStatus.ExclusionOngoingControllerNode:
								excludedNode = event.nodeId;
								break;
							case RemoveNodeFromNetworkCallbackStatus.ExclusionCompleted:
								if (excludedNode === undefined) {
									// Should never happen...
									throw new Error(
										"node exclusion failed: no node ID received"
									);
								}
								return excludedNode;
							case RemoveNodeFromNetworkCallbackStatus.ExclusionFailed:
								throw new Error(
									"node exclusion failed: unknown error"
								);
							case RemoveNodeFromNetworkCallbackStatus.NotPrimary:
								throw new Error(
									"node exclusion failed: not a primary controller"
								);
							default:
								throw new Error(
									`unknown exclusion status callback 0x${toHex(
										event.status,
										2
									)} received`
								);
						}
					}
				} finally {
					await sendStop();
					request.onCancellable?.(undefined);
				}
			},
		};
	};
}
