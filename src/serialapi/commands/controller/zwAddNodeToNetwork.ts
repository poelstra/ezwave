import { assign, createMachine, interpret, MachineOptions } from "xstate";
import { parseCommandClassInfo } from "../../../commands/commandClassInfo";
import { runMachineService } from "../machineRunner";
import { RequestRunner } from "../RequestRunner";
import { CallbackRequestBuilder } from "../requests";
import { SerialApiCommandCode } from "../serialApiCommandCode";
import { buildCallbackParser } from "../transport/zwSendData";
import { NodeInfoResponse } from "../types";

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
	constructor(request: ZwAddNodeToNetworkRequest) {
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
export enum AddNodeStatus {
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

export interface AddNodeCallbackStatusOnly {
	status:
		| AddNodeStatus.LearnReady
		| AddNodeStatus.NodeFound
		| AddNodeStatus.ProtocolDone
		| AddNodeStatus.Failed
		| AddNodeStatus.NotPrimary
		| AddNodeStatus.Done;
}

export interface AddNodeCallbackNif {
	status: AddNodeStatus.AddingSlave | AddNodeStatus.AddingController;
	nif: NodeInfoResponse;
}

export type AddNodeCallback = AddNodeCallbackStatusOnly | AddNodeCallbackNif;

type AddNodeMachineResult = {
	status: AddNodeResultStatus;
	nif?: NodeInfoResponse;
};

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

	constructor(result: AddNodeMachineResult) {
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
				const options: Partial<MachineOptions<Context, Event>> = {
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
								service.send({ type: "CANCEL" })
							);
						},
						indicateNonCancellable: () => {
							request.onCancellable?.(undefined);
						},
					},
				};
				const context: Context = {
					listeningNodesCount: request.listeningNodesCount,
					flirsNodesCount: request.flirsNodesCount,
					totalNodes: request.totalNodes,
				};
				const boundMachine = machine.withConfig(options, context);
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

/**
 * Timeout for waiting for LearnReady status since calling AddNodeToNetwork(Any).
 * See INS13954-7, section 4.4.1.3.1.
 * Apparently allowed to be as small as 200ms, maximum 10s. Probably very rare.
 */
const PROTOCOL_READY_TIMEOUT = 10 * 1000;

/**
 * Recommended timeout for waiting for NodeFound status since calling AddNodeToNetwork(Any).
 * See INS13954-7, section 4.4.1.3.2.
 */
const NODE_FOUND_TIMEOUT = 60 * 1000;

/**
 * Recommended timeout for waiting until AddingSlave or AddingController status after
 * receiving NodeFound.
 * See INS13954-7, section 4.4.1.2.3
 */
const SLAVE_OR_CONTROLLER_FOUND_TIMEOUT = 60 * 1000;

// Unspecified in spec
const NODE_STOP_TIMEOUT = 60 * 1000;

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

export enum AddNodeResultStatus {
	NotPrimary,
	Failed,
	Cancelled,
	TimedOut,
	AddedFailed,
	Ok,
}

interface Context {
	listeningNodesCount: number;
	flirsNodesCount: number;
	totalNodes: number;

	addNodeTimeout?: number;
	status?: AddNodeResultStatus;
	nif?: NodeInfoResponse;
}

interface IncludingContext extends Context {
	addNodeTimeout: number;
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

type TypeState =
	| { value: "Ok"; context: Context }
	| { value: "Waiting"; context: Context }
	| { value: "AddedFailed"; context: Context }
	| { value: "Aborted"; context: Context }
	| { value: "Failed"; context: Context }
	| { value: "NodeFound"; context: Context }
	| { value: "Including"; context: IncludingContext };

const machine = createMachine<Context, Event, TypeState>(
	{
		id: "addNodeToNetwork",
		initial: "Waiting",
		context: {
			flirsNodesCount: 0,
			listeningNodesCount: 0,
			totalNodes: 0,
		},
		states: {
			Waiting: {
				initial: "WaitingForProtocol",
				entry: "indicateCancellable",
				exit: "indicateNonCancellable",
				on: {
					CANCEL: "Cancelling",
					NOT_PRIMARY: {
						target: "#addNodeToNetwork.Finalizing",
						actions: assign<Context, Event>({
							status: () => AddNodeResultStatus.NotPrimary,
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
						actions: assign<Context, Event>({
							status: () => AddNodeResultStatus.TimedOut,
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
								actions: assign<Context, Event>({
									status: () => AddNodeResultStatus.TimedOut,
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
				invoke: { src: "invokeStop" },
				on: {
					NODE_FOUND: "NodeFound",
					DONE: {
						target: "#addNodeToNetwork.Finalizing",
						actions: assign<Context, Event>({
							status: () => AddNodeResultStatus.Cancelled,
						}),
					},
				},
				after: {
					NODE_STOP_TIMEOUT: {
						target: "#addNodeToNetwork.Finalizing",
						actions: assign<Context, Event>({
							status: () => AddNodeResultStatus.TimedOut,
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
				invoke: { src: "invokeStop" },
				on: {
					DONE: {
						target: "#addNodeToNetwork.Finalizing",
						actions: assign<Context, Event>({
							status: () => AddNodeResultStatus.AddedFailed,
						}),
					},
				},
				after: {
					NODE_STOP_TIMEOUT: {
						target: "#addNodeToNetwork.Finalizing",
						actions: assign<Context, Event>({
							status: () => AddNodeResultStatus.AddedFailed,
						}),
					},
				},
			},
			Finishing: {
				invoke: { src: "invokeStop" },
				on: {
					DONE: {
						target: "#addNodeToNetwork.Finalizing",
						actions: assign<Context, Event>({
							status: () => AddNodeResultStatus.Ok,
						}),
					},
				},
				after: {
					NODE_STOP_TIMEOUT: {
						target: "#addNodeToNetwork.Finalizing",
						actions: assign<Context, Event>({
							status: () => AddNodeResultStatus.AddedFailed,
						}),
					},
				},
			},

			Finalizing: {
				invoke: { src: "invokeStopNoCallback", onDone: "Done" },
			},
			Done: {
				type: "final",
				data: (context): AddNodeMachineResult => ({
					status: context.status!,
					nif: context.nif,
				}),
			},
		},
	},
	{
		services: {
			invokeStop: () => {
				throw new Error("not implemented");
			},
			invokeStopNoCallback: () => {
				throw new Error("not implemented");
			},
			assignSucIfNeeded: () => {
				throw new Error("not implemented");
			},
			controllerReplication: () => {
				throw new Error("not implemented");
			},
		},
		delays: {
			ADD_NODE_TIMEOUT: (context) => context.addNodeTimeout!,
			NODE_FOUND_TIMEOUT,
			PROTOCOL_READY_TIMEOUT,
			NODE_STOP_TIMEOUT,
			SLAVE_OR_CONTROLLER_FOUND_TIMEOUT,
		},
		actions: {
			indicateCancellable: () => {},
			indicateNonCancellable: () => {},
			assignNif: assign({
				nif: (context, event) => {
					if (
						event.type !== "ADDING_SLAVE" &&
						event.type !== "ADDING_CONTROLLER"
					) {
						throw new Error(`invalid event: got "${event.type}"`);
					}
					return event.nif;
				},
			}),
			assignSlaveTimeout: assign({
				addNodeTimeout: (context, event) =>
					getAddSlaveNodeTimeout(
						context.listeningNodesCount,
						context.flirsNodesCount
					),
			}),
			assignControllerTimeout: assign({
				addNodeTimeout: (context, event) =>
					getAddControllerNodeTimeout(
						context.listeningNodesCount,
						context.flirsNodesCount,
						context.totalNodes
					),
			}),
		},
	}
);
