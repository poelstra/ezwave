import { EventEmitter } from "events";
import { Packet } from "../commands/packet";
import { bufferToString } from "../common/util";
import CommandClasses from "../generated/CommandClasses";
import { LayerCommand, LayerEvent, Sender } from "../layers/layer";
import { MultiChannelLayer } from "../layers/multiChannel";
import { Mapper, Requester } from "../layers/requester";
import { SecurityS0Layer } from "../layers/securityS0";
import { Stack } from "../layers/stack";
import { HostEvent, rxStatusToString, SerialApi } from "../serialapi/serialapi";
import { CryptoManager, NonceStore } from "../layers/crypto";

// TODO find a better mechanism to dispatch events to other interested parties? E.g. explicit (async) dispatcher registration?
export interface ControllerEvents {
	on(event: "event", listener: (event: LayerEvent<Packet>) => void): this;
}

// TODO Currently named Controller, but that's a (very) bad name.
// Host is probably a better name, and the class called Host today needs
// to be renamed to ZwaveApi or something.
export class Controller extends EventEmitter implements ControllerEvents {
	private _stack: Stack;
	private _requester: Requester;

	constructor(
		host: SerialApi,
		crypto: CryptoManager,
		nonceStore: NonceStore
	) {
		super();
		const sender: Sender = {
			send(command: LayerCommand): Promise<boolean> {
				// TODO let zwSendData invoke afterSend if possible, to further
				// minimize the frame where early older matches could be received
				command.afterSend && command.afterSend();
				return host.zwSendData(
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

		this._stack = new Stack(sender, (event) =>
			this._handleStackDispatch(event)
		);
		this._stack
			.use(new SecurityS0Layer(crypto, nonceStore))
			.use(new MultiChannelLayer());

		host.on("event", (event: HostEvent) =>
			this._handleHostEvent(event).catch((err: unknown) =>
				console.warn(
					`error dispatching host event to stack:`,
					event,
					err
				)
			)
		);
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

	private async _handleHostEvent(event: HostEvent): Promise<void> {
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
