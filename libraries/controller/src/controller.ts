import { Packet, packetToString } from "@ezwave/codec";
import {
	LayerCommand,
	layerCommandToString,
	LayerEvent,
	layerEventToString,
	Mapper,
	MultiChannelLayer,
	Requester,
	SecurityS0Layer,
	Sender,
	Stack,
} from "@ezwave/layers";
import { CryptoManager, NonceStore, SecurityS0Codec } from "@ezwave/security";
import {
	ICommandSessionRunner,
	rxStatusToString,
	SerialApi,
	SerialApiCommandEvent,
	ZwSendData,
} from "@ezwave/serialapi";
import { defer } from "@ezwave/shared";
import debug from "debug";
import { EventEmitter } from "events";
import { IZwaveHost } from "./IZwaveHost";

const log: debug.Debugger = debug("zwave:controller");
const logData: debug.Debugger = debug("zwave:controller:data");

// TODO find a better mechanism to dispatch events to other interested parties? E.g. explicit (async) dispatcher registration?
export interface ControllerEvents {
	/**
	 * Emitted whenever a Z-Wave command is received from the network,
	 * already decoded through any transport layers (security, multi-channel,
	 * etc).
	 */
	on(event: "event", listener: (event: LayerEvent<Packet>) => void): this;

	/**
	 * Emitted whenever a Z-Wave device is successfully attached and initialized,
	 * such that the controller can actually be used to send commands.
	 */
	on(event: "attach", listener: () => void): this;

	/**
	 * Emitted whenever a previously assigned device Z-Wave device is disconnected,
	 * e.g. when it is (temporarily) unplugged or reset.
	 */
	on(event: "detach", listener: () => void): this;
}

export class Controller
	extends EventEmitter
	implements ControllerEvents, IZwaveHost
{
	public readonly homeId: number;
	public readonly nodeId: number;

	private _serialApi: SerialApi | undefined;
	private _attached = defer<void>();
	private _stack: Stack;
	private _requester: Requester;
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

	public constructor(
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
				// TODO Implement resend mechanism: INS13954 Figure 9
				const serialCmd = new ZwSendData({
					nodeId: command.endpoint.nodeId,
					payload: command.packet.serialize(),
					afterSend: command.afterSend,
				});
				await this._serialApi.execute(serialCmd);
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

	public async assignSerialApi(
		serialApi: SerialApi | undefined
	): Promise<void> {
		if (this._serialApi) {
			this._serialApi.off("command", this._serialApiCommandHandler);
			this._serialApi.off("close", this._serialApiCloseHandler);
			// TODO safeEmit
			this.emit("detach");
			this._attached = defer();
		}

		this._serialApi = serialApi;

		if (this._serialApi) {
			this._serialApi.on("command", this._serialApiCommandHandler);
			this._serialApi.on("close", this._serialApiCloseHandler);
		}
		// TODO initial interviews etc.

		// TODO safeEmit
		this.emit("attach");
		this._attached.resolve();
	}

	send(command: LayerCommand): Promise<boolean> {
		if (log.enabled) {
			log("send", layerCommandToString(command));
		}
		return this._stack.send(command);
	}

	public async sendAndWaitFor<T extends Packet>(
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

	/**
	 * Execute low-level command(s) on Serial API.
	 *
	 * The command will be executed once the serial API is attached,
	 * and will be queued after any currently pending commands.
	 *
	 * @example
	 * ```ts
	 * const nif = await controller.executeSerialCommand(new ZwRequestNodeInfo({ nodeId: 3 }));
	 * ```
	 */
	public async executeSerialCommand<T>(
		runner: ICommandSessionRunner<T>
	): Promise<T> {
		await this._attached.promise;
		if (!this._serialApi) {
			throw new Error("no Z-Wave device connected");
		}
		return this._serialApi.execute(runner);
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
