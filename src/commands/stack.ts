import {
	Dispatch,
	DispatchNext,
	Layer,
	LayerCommand,
	LayerEvent,
	Sender,
	SendNext,
} from "./layer";
import { Packet } from "./packet";

export class Stack {
	private _layers: Layer[] = [];
	private _dispatcher: DispatchNext | undefined = undefined;
	private _sender: SendNext | undefined = undefined;
	private _send: Sender;
	private _dispatch: Dispatch;

	constructor(send: Sender, dispatch: Dispatch) {
		this._send = send;
		this._dispatch = dispatch;
	}

	use(layer: Layer): this {
		this._dispatcher = undefined;
		this._sender = undefined;
		this._layers.push(layer);
		return this;
	}

	async dispatch(event: LayerEvent<Packet>): Promise<void> {
		if (!this._dispatcher) {
			this._dispatcher = this._buildDispatcher(this._layers);
		}
		return this._dispatcher(event, this._send);
	}

	async send(command: LayerCommand): Promise<boolean> {
		if (!this._sender) {
			this._sender = this._buildSender(this._layers);
		}
		return this._sender(command, this._send);
	}

	private _buildDispatcher(layers: Layer[]): DispatchNext {
		const [current, ...remainingLayers] = layers;
		if (!current) {
			return (event) => this._dispatch(event);
		}
		const next = this._buildDispatcher(remainingLayers);
		if (!current.dispatch) {
			return next;
		}
		return (event, send) => current.dispatch!(event, next, send);
	}

	private _buildSender(layers: Layer[]): SendNext {
		const [current, ...remainingLayers] = layers;
		if (!current) {
			return (command, send) => send.send(command);
		}
		const next = this._buildSender(remainingLayers);
		if (!current.send) {
			return next;
		}
		return (command, send) => current.send!(command, next, send);
	}
}
