import { EventEmitter } from "events";
import { Packet } from "../commands/packet";
import { bufferToString } from "../common/util";
import CommandClasses from "../commands/classes/CommandClasses";
import { LayerCommand, LayerEvent, Sender } from "../layers/layer";
import { MultiChannelLayer } from "../layers/multiChannel";
import { Mapper, Requester } from "../layers/requester";
import { SecurityS0Layer } from "../layers/securityS0Layer";
import { Stack } from "../layers/stack";
import { CryptoManager } from "../security/cryptoManager";
import { NonceStore } from "../security/nonceStore";
import { SecurityS0Codec } from "../security/securityS0Codec";
import {
	SerialApiEvent,
	rxStatusToString,
	SerialApi,
} from "../serialapi/serialapi";
import { IZwaveHost } from "./IZwaveHost";

export enum ControllerState {
	Constructed,
	Initializing,
	Initialized,
}

// TODO find a better mechanism to dispatch events to other interested parties? E.g. explicit (async) dispatcher registration?
export interface ControllerEvents {
	on(event: "event", listener: (event: LayerEvent<Packet>) => void): this;
}

export class Controller
	extends EventEmitter
	implements ControllerEvents, IZwaveHost {
	public readonly homeId: number;
	public readonly nodeId: number;

	private _serialApi: SerialApi | undefined;
	private _stack: Stack;
	private _requester: Requester;
	private _state: ControllerState = ControllerState.Constructed;
	private _serialApiEventHandler = (event: SerialApiEvent) =>
		this._handleSerialEvent(event).catch((err: unknown) =>
			console.warn(`error dispatching serial event to stack:`, event, err)
		);
	private _serialApiCloseHandler = () => this.assignSerialApi(undefined);

	constructor(
		homeId: number,
		nodeId: number,
		crypto: CryptoManager,
		nonceStore: NonceStore
	) {
		super();
		this.homeId = homeId;
		this.nodeId = nodeId;

		const sender: Sender = {
			send: (command: LayerCommand): Promise<boolean> => {
				if (!this._serialApi) {
					throw new Error("no Z-Wave device connected");
				}
				// TODO let zwSendData invoke afterSend if possible, to further
				// minimize the frame where early older matches could be received
				command.afterSend && command.afterSend();
				return this._serialApi.zwSendData(
					command.endpoint.nodeId,
					command.packet.serialize()
				);
			},
			packetCapacity(): number {
				// TODO retrieve from host, based on routing options
				return 48;
			},
		};
		this._requester = new Requester();

		const codec = new SecurityS0Codec(crypto, nonceStore);

		// SDS13783-14 - Encapsulation order overview
		// 1. Encapsulated Command Class (payload), .e.g Basic Set
		// 2. Multi Command
		// 3. Supervision
		// 4. Multi Channel
		// 5. Any one of the following combinations:
		//    a. Security (S0 or S2) followed by transport service
		//    b. Transport Service
		//    c. Security (S0 or S2)
		//    d. CRC16
		// We need to supply them in the opposite order to our stack.
		this._stack = new Stack(sender, (event) =>
			this._handleStackDispatch(event)
		);
		this._stack
			.use(new SecurityS0Layer(codec, nonceStore))
			.use(new MultiChannelLayer());
	}

	async assignSerialApi(serialApi: SerialApi | undefined): Promise<void> {
		if (this._serialApi) {
			this._serialApi.off("event", this._serialApiEventHandler);
			this._serialApi.off("close", this._serialApiCloseHandler);
		}

		this._serialApi = serialApi;

		if (this._serialApi) {
			this._serialApi.on("event", this._serialApiEventHandler);
			this._serialApi.on("close", this._serialApiCloseHandler);
			// TODO serialApi can be reinitialized, e.g. soft reset,
			// need to handle that too
			const nodes = this._serialApi.getNodes();
			for (const node of nodes) {
				console.log("NODE", node);
			}
		}
	}

	send(command: LayerCommand): Promise<boolean> {
		return this._stack.send(command);
	}

	async sendAndWaitFor<T extends Packet>(
		command: LayerCommand,
		mapper: Mapper<T>
	): Promise<LayerEvent<T>> {
		const reply = await this._requester.sendAndWaitFor(
			command,
			(command) => this._stack.send(command),
			mapper
		);
		if (!reply) {
			// TODO inconvenient
			throw new Error("error waiting for packet, send filtered out");
		}
		return reply;
	}

	private _handleStackDispatch(event: LayerEvent<Packet>): void {
		this._requester.dispatch(event);
		this.emit("event", event);
	}

	private async _handleSerialEvent(event: SerialApiEvent): Promise<void> {
		const packet = new Packet(event.data);
		console.log(
			`EVENT fromNode=${event.sourceNode} cmdClass=${
				CommandClasses[packet.commandClass]
			} cmdAndPayload=[${bufferToString(
				packet.commandAndPayload
			)}] rxStatus=${rxStatusToString(event.rxStatus)}`
		);
		await this._stack.dispatch({
			packetType: event.rxStatus.destinationType,
			endpoint: {
				nodeId: event.sourceNode,
			},
			packet: packet,
		});
	}
}
