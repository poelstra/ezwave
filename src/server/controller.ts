import debug from "debug";
import { EventEmitter } from "events";
import { packetToString } from "../commands/debug";
import { Packet } from "../commands/packet";
import { LayerCommand, LayerEvent, Sender } from "../layers/layer";
import { MultiChannelLayer } from "../layers/multiChannel";
import { layerCommandToString, layerEventToString } from "../layers/print";
import { Mapper, Requester } from "../layers/requester";
import { SecurityS0Layer } from "../layers/securityS0Layer";
import { Stack } from "../layers/stack";
import { CryptoManager } from "../security/cryptoManager";
import { NonceStore } from "../security/nonceStore";
import { SecurityS0Codec } from "../security/securityS0Codec";
import {
	rxStatusToString,
	SerialApi,
	SerialApiCommandEvent,
} from "../serialapi/serialapi";
import { IZwaveHost } from "./IZwaveHost";

const log = debug("zwave:controller");
const logData = debug("zwave:controller:data");

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
	private _serialApiCommandHandler = (event: SerialApiCommandEvent) =>
		this._handleSerialCommand(event).catch((err: unknown) =>
			log(
				`warning:`,
				`error dispatching serial event to stack:`,
				event,
				err
			)
		);
	private _serialApiCloseHandler = () => this.assignSerialApi(undefined);
	private _transactionId = 0; // Used for debug logging

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
			send: async (command: LayerCommand): Promise<boolean> => {
				if (!this._serialApi) {
					throw new Error("no Z-Wave device connected");
				}
				// TODO let zwSendData invoke afterSend if possible, to further
				// minimize the frame where early older matches could be received
				command.afterSend && command.afterSend();
				await this._serialApi.zwSendData(
					command.endpoint.nodeId,
					command.packet.serialize()
				);
				return true;
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
			this._serialApi.off("command", this._serialApiCommandHandler);
			this._serialApi.off("close", this._serialApiCloseHandler);
		}

		this._serialApi = serialApi;

		if (this._serialApi) {
			this._serialApi.on("command", this._serialApiCommandHandler);
			this._serialApi.on("close", this._serialApiCloseHandler);
		}
	}

	send(command: LayerCommand): Promise<boolean> {
		if (log.enabled) {
			log("send", layerCommandToString(command));
		}
		return this._stack.send(command);
	}

	async sendAndWaitFor<T extends Packet>(
		command: LayerCommand,
		mapper: Mapper<T>
	): Promise<LayerEvent<T>> {
		const transactionId = this._transactionId++;
		if (log.enabled) {
			log(
				"sendAndWaitFor send",
				`id=${transactionId} ${layerCommandToString(command)}`
			);
		}
		const reply = await this._requester.sendAndWaitFor(
			command,
			(command) => this._stack.send(command),
			mapper
		);
		if (!reply) {
			// TODO inconvenient
			throw new Error("error waiting for packet, send filtered out");
		}
		if (log.enabled) {
			log(
				"sendAndWaitFor result",
				`id=${transactionId} ${layerEventToString(reply)}`
			);
		}
		return reply;
	}

	private _handleStackDispatch(event: LayerEvent<Packet>): void {
		this._requester.dispatch(event);
		if (log.enabled) {
			log(`emit event ${layerEventToString(event)}`);
		}
		this.emit("event", event);
	}

	private async _handleSerialCommand(
		event: SerialApiCommandEvent
	): Promise<void> {
		const packet = new Packet(event.command);
		if (logData.enabled) {
			logData(
				`receive from=${event.sourceNode} rxStatus=${rxStatusToString(
					event.rxStatus
				)} packet=${packetToString(packet)}`
			);
		}
		await this._stack.dispatch({
			packetType: event.rxStatus.destinationType,
			endpoint: {
				nodeId: event.sourceNode,
			},
			packet: packet,
		});
	}
}
