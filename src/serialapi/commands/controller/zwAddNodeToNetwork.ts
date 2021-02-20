import { parseCommandClassInfo } from "../../../commands/commandClassInfo";
import { toHex } from "../../../common/util";
import { RequestRunner } from "../RequestRunner";
import { CallbackRequestBuilder } from "../requests";
import { SerialApiCommandCode } from "../serialApiCommandCode";
import { buildCallbackParser } from "../transport/zwSendData";
import { NodeInfoResponse } from "../types";

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

export interface ZwAddNodeToNetworkRequest {
	lowPower?: boolean; // default false
}

export function zwAddNodeToNetworkBuilder(
	request: ZwAddNodeToNetworkRequest | void
): CallbackRequestBuilder<AddNodeCallback, NodeInfoResponse> {
	return (transactionId) => {
		request ??= {};
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
				(payload: Buffer): AddNodeCallback => {
					if (payload.length < 1) {
						throw new Error(
							`invalid ZwAddNodeToNetwork callback: missing status`
						);
					}
					const status = payload[0] as AddNodeStatus;
					switch (status) {
						case AddNodeStatus.LearnReady:
						case AddNodeStatus.NodeFound:
						case AddNodeStatus.ProtocolDone:
						case AddNodeStatus.Failed:
						case AddNodeStatus.NotPrimary:
						case AddNodeStatus.Done:
							return {
								status,
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
								status,
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
				// TODO Add cancellation (possible until NodeFound is emitted)
				// TODO Add logging
				// TODO Add callbacks to correctly determine add timeout (number of listening nodes etc)
				// TODO Add callbacks to indicate progress to app
				// TODO Implement controller inclusion
				// TODO Implement controller application replication
				let nif: NodeInfoResponse | undefined;
				let timeout: number = PROTOCOL_READY_TIMEOUT;
				try {
					while (true) {
						const event = await events.get(timeout);
						switch (event.status) {
							case AddNodeStatus.NotPrimary:
								throw new Error(
									"cannot include node into network: not a primary controller"
								);

							case AddNodeStatus.LearnReady:
								timeout = NODE_FOUND_TIMEOUT;
								break;

							case AddNodeStatus.NodeFound:
								break;

							case AddNodeStatus.AddingSlave:
								// TODO Add callback to request
								timeout = getAddSlaveNodeTimeout(0, 0);
								nif = event.nif;
								break;

							case AddNodeStatus.AddingController:
								// TODO Add callback to request
								timeout = getAddControllerNodeTimeout(0, 0, 0);
								nif = event.nif;
								break;

							case AddNodeStatus.ProtocolDone:
								// TODO Controller replication etc
								if (!nif) {
									throw new Error(
										"inclusion failed: missing NIF"
									);
								}
								return nif;

							case AddNodeStatus.Failed:
								throw new Error("inclusion failed");

							case AddNodeStatus.Done:
								throw new Error(
									"unexpected add node event: Done"
								);

							default:
								throw new Error(
									`unknown add node status callback 0x${toHex(
										event!.status,
										2
									)} received`
								);
						}
					}
				} finally {
					try {
						await session.send(
							command,
							Buffer.from([AddNodeMode.Stop, transactionId])
						);
						await events.get(NODE_STOP_TIMEOUT); // should respond with AddNodeStatus.Done
					} catch {
						// ignore
					}
					try {
						await session.send(
							command,
							Buffer.from([AddNodeMode.Stop, 0])
						);
					} catch {
						// ignore
					}
				}
			},
		};
	};
}

export class ZwAddNodeToNetwork extends RequestRunner<
	typeof zwAddNodeToNetworkBuilder
> {
	constructor(request: ZwAddNodeToNetworkRequest | void) {
		super(zwAddNodeToNetworkBuilder, request);
	}
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
