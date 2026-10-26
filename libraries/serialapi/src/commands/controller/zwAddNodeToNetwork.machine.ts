import { assign, ErrorActorEvent, fromPromise, setup } from "xstate";
import { NodeInfoResponse } from "../types";

export enum AddNodeResultStatus {
	NotPrimary,
	Failed,
	Cancelled,
	TimedOut,
	AddedFailed,
	Ok,
}

export interface AddNodeMachineResult {
	status: AddNodeResultStatus;
	nif?: NodeInfoResponse;
	/**
	 * Set when the process was aborted by an unexpected error (e.g. failure
	 * to send a command to the Serial API), in which case `status` is
	 * `Failed`.
	 */
	error?: unknown;
}

export interface Input {
	listeningNodesCount: number;
	flirsNodesCount: number;
	totalNodes: number;
}

export interface Context {
	listeningNodesCount: number;
	flirsNodesCount: number;
	totalNodes: number;

	addNodeTimeout?: number;
	status?: AddNodeResultStatus;
	nif?: NodeInfoResponse;
	error?: unknown;
}

export type Event =
	| { type: "CANCEL" }
	| { type: "NOT_PRIMARY" }
	| { type: "LEARN_READY" }
	| { type: "NODE_FOUND" }
	| { type: "ADDING_SLAVE"; nif: NodeInfoResponse }
	| { type: "ADDING_CONTROLLER"; nif: NodeInfoResponse }
	| { type: "PROTOCOL_DONE" }
	| { type: "PROTOCOL_FAILED" }
	| { type: "DONE" };

/**
 * Timeout for waiting for LearnReady status since calling AddNodeToNetwork(Any).
 * See INS13954-7, section 4.4.1.3.1.
 * Apparently allowed to be as small as 200ms, maximum 10s. Probably very rare.
 */
const PROTOCOL_READY_TIMEOUT: number = 10 * 1000;

/**
 * Recommended timeout for waiting for NodeFound status since calling AddNodeToNetwork(Any).
 * See INS13954-7, section 4.4.1.3.2.
 */
const NODE_FOUND_TIMEOUT: number = 60 * 1000;

/**
 * Recommended timeout for waiting until AddingSlave or AddingController status after
 * receiving NodeFound.
 * See INS13954-7, section 4.4.1.2.3
 */
const SLAVE_OR_CONTROLLER_FOUND_TIMEOUT: number = 60 * 1000;

// Unspecified in spec
const NODE_STOP_TIMEOUT: number = 60 * 1000;

function getAddSlaveNodeTimeout(
	listeningNodesCount: number,
	flirsNodesCount: number
): number {
	return 76000 + listeningNodesCount * 217 + flirsNodesCount * 3517;
}

/**
 * @param totalNodes Total number of nodes in network (i.e. non-listening + listening + FLiRS)
 */
function getAddControllerNodeTimeout(
	listeningNodesCount: number,
	flirsNodesCount: number,
	totalNodes: number
): number {
	return (
		76000 +
		listeningNodesCount * 217 +
		flirsNodesCount * 3517 +
		totalNodes * 732
	);
}

/**
 * Transition for failures of the invoked stop commands: nothing more can
 * be done to stop the Serial API in that case, so abort immediately.
 */
const abortOnError = {
	target: "#addNodeToNetwork.Done",
	actions: "recordError",
} as const;

const notImplemented = (): Promise<void> =>
	Promise.reject(new Error("not implemented"));

export const machine = setup({
	types: {
		context: {} as Context,
		events: {} as Event,
		input: {} as Input,
		output: {} as AddNodeMachineResult,
	},
	actors: {
		invokeStop: fromPromise<void>(notImplemented),
		invokeStopNoCallback: fromPromise<void>(notImplemented),
		assignSucIfNeeded: fromPromise<void>(notImplemented),
		controllerReplication: fromPromise<void>(notImplemented),
	},
	delays: {
		ADD_NODE_TIMEOUT: ({ context }) => context.addNodeTimeout!,
		NODE_FOUND_TIMEOUT,
		PROTOCOL_READY_TIMEOUT,
		NODE_STOP_TIMEOUT,
		SLAVE_OR_CONTROLLER_FOUND_TIMEOUT,
	},
	actions: {
		recordError: assign({
			status: AddNodeResultStatus.Failed,
			error: ({ event }) => (event as unknown as ErrorActorEvent).error,
		}),
		indicateCancellable: () => {},
		indicateNonCancellable: () => {},
		assignNif: assign({
			nif: ({ event }) => {
				// Only used for ADDING_SLAVE and ADDING_CONTROLLER events
				return (event as Extract<Event, { nif: NodeInfoResponse }>).nif;
			},
		}),
		assignSlaveTimeout: assign({
			addNodeTimeout: ({ context }) =>
				getAddSlaveNodeTimeout(
					context.listeningNodesCount,
					context.flirsNodesCount
				),
		}),
		assignControllerTimeout: assign({
			addNodeTimeout: ({ context }) =>
				getAddControllerNodeTimeout(
					context.listeningNodesCount,
					context.flirsNodesCount,
					context.totalNodes
				),
		}),
	},
}).createMachine({
	id: "addNodeToNetwork",
	initial: "Waiting",
	context: ({ input }) => ({ ...input }),
	output: ({ context }) => ({
		status: context.status!,
		nif: context.nif,
		error: context.error,
	}),
	states: {
		Waiting: {
			initial: "WaitingForProtocol",
			entry: "indicateCancellable",
			exit: "indicateNonCancellable",
			on: {
				CANCEL: "Cancelling",
				NOT_PRIMARY: {
					target: "#addNodeToNetwork.Finalizing",
					actions: assign({
						status: AddNodeResultStatus.NotPrimary,
					}),
				},
			},
			after: {
				// This timeout is basically that we give up waiting for
				// inclusion by a node to be started, so perhaps this
				// should actually be a timeout to (optionally) be specified
				// by end-user. For now, we use the timeout from the spec.
				// INS13954-7 4.4.1.3.2 - MUST implement timeout, SHOULD not
				// wait longer than 60s.
				NODE_FOUND_TIMEOUT: {
					target: "#addNodeToNetwork.Finalizing",
					actions: assign({
						status: AddNodeResultStatus.TimedOut,
					}),
				},
			},
			states: {
				WaitingForProtocol: {
					on: {
						LEARN_READY: "WaitingForNode",
					},
					after: {
						PROTOCOL_READY_TIMEOUT: {
							target: "#addNodeToNetwork.Finalizing",
							actions: assign({
								status: AddNodeResultStatus.TimedOut,
							}),
						},
					},
				},
				WaitingForNode: {
					on: {
						NODE_FOUND: "#addNodeToNetwork.NodeFound",
					},
				},
			},
		},

		Cancelling: {
			invoke: { src: "invokeStop", onError: abortOnError },
			on: {
				NODE_FOUND: "NodeFound",
				DONE: {
					target: "#addNodeToNetwork.Finalizing",
					actions: assign({
						status: AddNodeResultStatus.Cancelled,
					}),
				},
			},
			after: {
				NODE_STOP_TIMEOUT: {
					target: "#addNodeToNetwork.Finalizing",
					actions: assign({
						status: AddNodeResultStatus.TimedOut,
					}),
				},
			},
		},

		NodeFound: {
			on: {
				ADDING_SLAVE: {
					target: "Including.SlaveFound",
					actions: ["assignNif", "assignSlaveTimeout"],
				},
				ADDING_CONTROLLER: {
					target: "Including.ControllerFound",
					actions: ["assignNif", "assignControllerTimeout"],
				},
			},
			after: {
				SLAVE_OR_CONTROLLER_FOUND_TIMEOUT: "CleaningUpErrors",
			},
		},

		Including: {
			// Never entered directly, but required by XState
			initial: "SlaveFound",
			on: {
				PROTOCOL_FAILED: "CleaningUpErrors",
			},
			after: {
				ADD_NODE_TIMEOUT: "CleaningUpErrors",
			},
			states: {
				SlaveFound: {
					on: {
						PROTOCOL_DONE: "#addNodeToNetwork.Finishing",
					},
				},
				ControllerFound: {
					on: {
						PROTOCOL_DONE: "ControllerReplication",
					},
				},
				ControllerReplication: {
					invoke: {
						src: "controllerReplication",
						onDone: "AssignSuc",
						// TODO chart says to just send STOP, but text suggests to use STOP_FAILED,
						// but should that be just STOP_FAILED, or STOP_FAILED and then STOP?
						onError: "#addNodeToNetwork.CleaningUpErrors",
					},
				},
				AssignSuc: {
					invoke: {
						src: "assignSucIfNeeded",
						onDone: "#addNodeToNetwork.Finishing",
						onError: "#addNodeToNetwork.CleaningUpErrors",
					},
				},
			},
		},

		CleaningUpErrors: {
			invoke: { src: "invokeStop", onError: abortOnError },
			on: {
				DONE: {
					target: "#addNodeToNetwork.Finalizing",
					actions: assign({
						status: AddNodeResultStatus.AddedFailed,
					}),
				},
			},
			after: {
				NODE_STOP_TIMEOUT: {
					target: "#addNodeToNetwork.Finalizing",
					actions: assign({
						status: AddNodeResultStatus.AddedFailed,
					}),
				},
			},
		},
		Finishing: {
			invoke: { src: "invokeStop", onError: abortOnError },
			on: {
				DONE: {
					target: "#addNodeToNetwork.Finalizing",
					actions: assign({
						status: AddNodeResultStatus.Ok,
					}),
				},
			},
			after: {
				NODE_STOP_TIMEOUT: {
					target: "#addNodeToNetwork.Finalizing",
					actions: assign({
						status: AddNodeResultStatus.AddedFailed,
					}),
				},
			},
		},

		Finalizing: {
			invoke: {
				src: "invokeStopNoCallback",
				onDone: "Done",
				onError: abortOnError,
			},
		},
		Done: {
			type: "final",
		},
	},
});
