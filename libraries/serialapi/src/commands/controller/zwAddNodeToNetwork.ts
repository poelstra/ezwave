/* eslint-disable no-bitwise */
import { parseCommandClassInfo } from "@ezwave/codec";
import { interpret } from "@xstate/compiled";
import { buildCallbackParser } from "../callbackRequest";
import { runMachineService } from "../machineRunner";
import { RequestRunner } from "../RequestRunner";
import { CallbackRequestBuilder } from "../requests";
import { SerialApiCommandCode } from "../serialApiCommandCode";
import { NodeInfoResponse } from "../types";
import {
	AddNodeMachineResult,
	AddNodeResultStatus,
	Event,
	machine,
} from "./zwAddNodeToNetwork.machine";

export interface ZwAddNodeToNetworkRequest {
	lowPower?: boolean; // default false

	/**
	 * Number of listening nodes currently in the network.
	 * Used to correctly compute inclusion timeout.
	 */
	listeningNodesCount: number;

	/**
	 * Number of FLiRS nodes currently in the network.
	 * Used to correctly compute inclusion timeout.
	 */
	flirsNodesCount: number;

	/**
	 * Total number of nodes (listening, FLiRS and non-listening)
	 * currently in the network.
	 * Used to correctly compute inclusion timeout.
	 */
	totalNodes: number;

	// TODO implement
	// /**
	//  * Whether network currently has a SUC.
	//  * If not, and a controller is included it will ask it to become
	//  * a SUC during inclusion.
	//  */
	// hasSUC: boolean;

	/**
	 * Optional callback that will be called when the inclusion process
	 * can be cancelled, and called again when cancellation is no longer
	 * possible.
	 *
	 * When this callback is called, a cancel callback is provided that
	 * can be used to cancel inclusion, as long as no node was actually
	 * found yet. If a node was found, the inclusion process will run
	 * to completion.
	 *
	 * Note that if an error occurs early in the process, this callback
	 * may never be called.
	 *
	 * Calling the cancel callback when cancel is no longer possible is
	 * ignored.
	 */
	onCancellable?: (cancel: (() => void) | undefined) => void;
}

export class ZwAddNodeToNetwork extends RequestRunner<
	typeof zwAddNodeToNetworkBuilder
> {
	public constructor(request: ZwAddNodeToNetworkRequest) {
		super(zwAddNodeToNetworkBuilder, request);
	}
}

export enum AddNodeMode {
	/**
	 * Include any kind of node.
	 */
	Any = 1,
	/**
	 * @deprecated
	 */
	Controller = 2,
	/**
	 * @deprecated
	 */
	Slave = 3,
	/**
	 * @deprecated
	 */
	Existing = 4,
	/**
	 * Stop network inclusion mode.
	 */
	Stop = 5,
	/**
	 * Indicate failure of application-specific replication to
	 * newly included controller.
	 */
	StopFailed = 6,

	//SmartStart = 7, // TODO guess
	HomeId = 8, // Only used for ZwAddNodeDskToNetwork
}

/**
 * Status code for ZwAddNodeToNetwork callbacks.
 */
enum AddNodeStatus {
	/**
	 * Z-Wave protocol is ready to include new node.
	 */
	LearnReady = 1,
	/**
	 * Z-Wave protocol detected node.
	 */
	NodeFound = 2,
	/**
	 * Z-Wave protocol included a slave type node.
	 */
	AddingSlave = 3,
	/**
	 * Z-Wave protocol included a controller type node.
	 */
	AddingController = 4,
	/**
	 * Z-Wave protocol completed operations related to the inclusion (add).
	 * If new node type is controller, the controller application MAY invoke
	 * application replication (copy).
	 */
	ProtocolDone = 5,
	/**
	 * All operations completed. Protocol is ready to return
	 * to idle state.
	 */
	Done = 6,
	/**
	 * Z-Wave protocol reports that inclusion (add) was not successful.
	 * New node is not ready for operation.
	 */
	Failed = 7,
	/**
	 * Z-Wave protocol reports that requested operation cannot be performed
	 * since it requires that the node is in primary controller state.
	 */
	NotPrimary = 0x23,
}

enum AddNodeFlags {
	NetworkWide = 0x40,
	NormalPower = 0x80,
}

/**
 * Error thrown when inclusion fails.
 *
 * Note that in some cases only the last part of inclusion fails,
 * but a node was successfully found and assigned nonetheless.
 * In that case, `nif` will be defined and includes the Node Information
 * Frame that was received. The added node may or may not be in a working
 * state after this.
 */
export class AddNodeError extends Error {
	public readonly status: AddNodeResultStatus;
	public readonly nif?: NodeInfoResponse;

	public constructor(result: AddNodeMachineResult) {
		super(`AddNodeToNetwork failed: ${AddNodeResultStatus[result.status]}`);
		this.status = result.status;
		this.nif = result.nif;
	}
}

export function zwAddNodeToNetworkBuilder(
	request: ZwAddNodeToNetworkRequest
): CallbackRequestBuilder<Event, NodeInfoResponse> {
	return (transactionId) => {
		const command = SerialApiCommandCode.ZW_ADD_NODE_TO_NETWORK;
		let mode = AddNodeMode.Any;
		if (!request.lowPower) {
			mode |= AddNodeFlags.NormalPower;
		}
		mode |= AddNodeFlags.NetworkWide; // "MUST be used" (INS13954-7 4.4.1.1)
		return {
			command,
			params: Buffer.from([mode, transactionId]),
			tryParseEvent: buildCallbackParser(
				command,
				transactionId,
				(payload: Buffer): Event => {
					if (payload.length < 1) {
						throw new Error(
							`invalid ZwAddNodeToNetwork callback: missing status`
						);
					}
					const status = payload[0] as AddNodeStatus;
					switch (status) {
						case AddNodeStatus.LearnReady:
							return { type: "LEARN_READY" };
						case AddNodeStatus.NodeFound:
							return { type: "NODE_FOUND" };
						case AddNodeStatus.ProtocolDone:
							return { type: "PROTOCOL_DONE" };
						case AddNodeStatus.Failed:
							return { type: "PROTOCOL_FAILED" };
						case AddNodeStatus.NotPrimary:
							return { type: "NOT_PRIMARY" };
						case AddNodeStatus.Done:
							return {
								type: "DONE",
							};
						case AddNodeStatus.AddingSlave:
						case AddNodeStatus.AddingController:
							if (payload.length < 3) {
								throw new Error(
									`invalid ZwAddNodeToNetwork callback: missing nodeId / len`
								);
							}
							const nodeId = payload[1];
							const len = payload[2];
							const nifSlice = payload.slice(3, len + 3);
							if (len < 3 || len > nifSlice.length) {
								throw new Error(
									`invalid ZwAddNodeToNetwork callback: invalid length`
								);
							}
							const basicClass = nifSlice[0];
							const genericClass = nifSlice[1];
							const specificClass = nifSlice[2];
							const commandClasses = parseCommandClassInfo(
								nifSlice.slice(3)
							);
							return {
								type:
									status === AddNodeStatus.AddingSlave
										? "ADDING_SLAVE"
										: "ADDING_CONTROLLER",
								nif: {
									nodeId,
									basicClass,
									genericClass,
									specificClass,
									commandClasses,
								},
							};
					}
				}
			),
			handleEvents: async (
				events,
				session
			): Promise<NodeInfoResponse> => {
				const boundMachine = machine.withConfig({
					context: {
						listeningNodesCount: request.listeningNodesCount,
						flirsNodesCount: request.flirsNodesCount,
						totalNodes: request.totalNodes,
					},
					services: {
						invokeStop: () =>
							session.send(
								command,
								Buffer.from([AddNodeMode.Stop, transactionId])
							),
						invokeStopNoCallback: () =>
							session.send(
								command,
								Buffer.from([AddNodeMode.Stop, 0])
							),
						assignSucIfNeeded: async (context) => {
							// TODO If has no SUC in network -> SetSUCNodeId(context.nif.nodeId)
						},
						controllerReplication: async () => {
							// TODO Implement
						},
					},
					actions: {
						indicateCancellable: () => {
							request.onCancellable?.(() =>
								// eslint-disable-next-line @typescript-eslint/no-use-before-define
								service.send({ type: "CANCEL" })
							);
						},
						indicateNonCancellable: () => {
							request.onCancellable?.(undefined);
						},
					},
				});
				const service = interpret(boundMachine);
				const result: AddNodeMachineResult = await runMachineService(
					service,
					events
				);
				if (result.nif && result.status === AddNodeResultStatus.Ok) {
					return result.nif;
				} else {
					throw new AddNodeError(result);
				}
			},
		};
	};
}
