/* eslint-disable @typescript-eslint/member-ordering */
import { CommandPacket, CommandPacketConstructor, Packet } from "@ezwave/codec";
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
	SerialApi,
	SerialApiCommandEvent,
	ZwAddNodeToNetwork,
	ZwRemoveNodeFromNetwork,
	ZwSendData,
} from "@ezwave/serialapi";
import { defer, Deferred, Queue, toHex } from "@ezwave/shared";
import assert from "assert";
import debug from "debug";
import { EventEmitter } from "events";
import { FlirsMode } from ".";
import { Cache } from "./cache/cache";
import { Device } from "./device";
import { Endpoint, isSameEndpoint } from "./endpoint";
import { IZwaveHost } from "./IZwaveHost";
import {
	buildControllerSessionExecutor,
	ControllerSessionRunner,
	PacketMapper,
	RootControllerSession,
	SendOptions,
	SessionExecutor,
} from "./session";
import { JsonValue } from "./types";

const log: debug.Debugger = debug("zwave:controller");
const logData: debug.Debugger = debug("zwave:controller:data");

export interface SendAndWaitForOptions {
	/**
	 * Whether to send command securely.
	 *
	 * Defaults to true if unspecified. // TODO Currently still false, because S0 layer can't check whether other side actually supports it
	 */
	secure?: boolean;

	/**
	 * Timeout of request in milliseconds.
	 */
	timeout?: number;
}

const DEFAULT_SEND_AND_WAIT_FOR_OPTIONS: Required<SendAndWaitForOptions> = {
	secure: false, // TODO Set this back to true
	timeout: 10 * 1000,
};

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
	 * such that SerialAPI can be used to send commands.
	 * Note: Z-Wave devices might not fully be initialized at this stage.
	 */
	on(event: "attach", listener: () => void): this;

	/**
	 * Emitted whenever a previously assigned device Z-Wave device is disconnected,
	 * e.g. when it is (temporarily) unplugged or reset.
	 */
	on(event: "detach", listener: () => void): this;

	/**
	 * Emitted whenever controller has finished initialization of attached
	 * Z-Wave device and all remote devices.
	 */
	on(event: "ready", listener: () => void): this;
}

interface ActiveSession {
	endpoint: Endpoint;
	executor: SessionExecutor<unknown>;
}

export type IDeviceCache = Cache<number, JsonValue>;

export class Controller
	extends EventEmitter
	implements ControllerEvents, IZwaveHost
{
	public readonly homeId: number;
	public readonly nodeId: number;

	private _serialApi: SerialApi | undefined;
	private _attached: Deferred<void> = defer();
	private _stack: Stack;
	private _requester: Requester;
	private _transactionId: number = 0; // Used for debug logging
	private _queue: Queue = new Queue();
	private _rootSession: RootControllerSession;
	private _activeSession: ActiveSession | undefined;
	private _serialApiCommandHandler = (event: SerialApiCommandEvent): void => {
		this._handleSerialCommand(event).catch((err: unknown) =>
			log(
				`warning:`,
				`error dispatching serial event to stack:`,
				event,
				err
			)
		);
	};
	private _serialApiCloseHandler = (): Promise<void> =>
		this.assignSerialApi(undefined);
	private _deviceCache?: IDeviceCache;
	private _devices: Map<number, Device> = new Map();

	public constructor(
		homeId: number,
		nodeId: number,
		crypto: CryptoManager,
		nonceStore: NonceStore,
		deviceCache?: IDeviceCache
	) {
		super();
		this.setMaxListeners(Infinity); // We expect many listeners, one per Device

		this.homeId = homeId;
		this.nodeId = nodeId;
		this._deviceCache = deviceCache;

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

		this._rootSession = {
			controllerId: this.nodeId,
			send: async (
				packet: Packet,
				options: SendOptions
			): Promise<void> => {
				if (!this._activeSession) {
					throw new Error(
						"assertion failed: cannot send from inactive session"
					);
				}
				const command: LayerCommand = {
					endpoint: this._activeSession.endpoint,
					packet,
					secure: options?.secure,
					requestTimeout: options?.timeout,
				};
				await this.send(command);
			},
			executeSerial: async <T>(
				runner: ICommandSessionRunner<T>
			): Promise<T> => {
				return this.executeSerialCommand(runner);
			},
		};
	}

	public async assignSerialApi(
		serialApi: SerialApi | undefined
	): Promise<void> {
		if (this._serialApi) {
			this._serialApi.off("command", this._serialApiCommandHandler);
			this._serialApi.off("close", this._serialApiCloseHandler);
			// TODO safeEmit
			this.emit("detach");
			// TODO Close open serial/controller sessions. SerialAPI is probably
			// closing here anyway (which cancels its sessions), but better to
			// be explicit.
			this._attached = defer();
		}

		this._serialApi = serialApi;

		if (!this._serialApi) {
			return;
		}

		this._serialApi.on("command", this._serialApiCommandHandler);
		this._serialApi.on("close", this._serialApiCloseHandler);

		// TODO safeEmit
		this.emit("attach");
		this._attached.resolve();

		await this._initDevices();
		this.emit("ready");
	}

	public isAttached(): boolean {
		return this._serialApi !== undefined;
	}

	public isPrimaryController(): boolean {
		if (!this._serialApi) {
			throw new Error("no Z-Wave device connected");
		}
		return this._serialApi.isPrimaryController();
	}

	public isSIS(): boolean {
		if (!this._serialApi) {
			throw new Error("no Z-Wave device connected");
		}
		// TODO Need to make ourselves SIS if we're the primary controller,
		// and we're the first (only) node in the network
		return this._serialApi.isSIS();
	}

	public getDevice(nodeId: number): Device {
		const device = this._devices.get(nodeId);
		if (!device) {
			throw new Error(`unknown device ${nodeId}`);
		}
		return device;
	}

	public getDevices(): Set<Device> {
		return new Set(this._devices.values());
	}

	/**
	 * Start network inclusion.
	 *
	 * @return Newly included `Device`.
	 */
	public async includeDevice(): Promise<Device> {
		try {
			log("inclusion start");

			await this._attached.promise;
			if (!this._serialApi) {
				throw new Error("no Z-Wave device connected");
			}

			const nodes = [...this._devices.values()];
			const flirsNodesCount = nodes.filter(
				(dev) => dev.isFlirs() !== FlirsMode.NonFlirs
			).length;
			const listeningNodesCount = nodes.filter((dev) =>
				dev.isAlwaysListening()
			).length;
			const nif = await this.executeSerialCommand(
				new ZwAddNodeToNetwork({
					flirsNodesCount,
					listeningNodesCount,
					totalNodes: this._devices.size,
				})
			);
			log("inclusion including", nif);

			const device = await this._createDevice(
				nif.nodeId,
				`${toHex(this.homeId, 8)}:${nif.nodeId}`
			);
			await device.completeInclusion();
			log(`device ${nif.nodeId} inclusion complete`);
			device.start();
			this.emit("deviceAdded", device);

			return device;
		} catch (err) {
			log("inclusion failed:", err);
			throw err;
		}
	}

	/**
	 * Start network exclusion.
	 *
	 * @return NodeId of excluded device, or 0 if device was not part of this network.
	 */
	public async excludeDevice(): Promise<number> {
		try {
			log("exclusion start");

			const nodeId = await this.executeSerialCommand(
				new ZwRemoveNodeFromNetwork({})
			);

			if (nodeId > 0) {
				const device = this.getDevice(nodeId);
				device.stop();
				this._devices.delete(nodeId);
				this.emit("deviceRemoved", device);
			}

			log(`exclusion completed, nodeId=${nodeId}`);
			return nodeId;
		} catch (err) {
			log("exclusion failed:", err);
			throw err;
		}
	}

	public send(command: LayerCommand): Promise<boolean> {
		if (logData.enabled) {
			logData("send", layerCommandToString(command));
		}
		return this._stack.send(command);
	}

	/**
	 * Send a Z-Wave CommandClass command, and wait for its
	 * corresponding result command.
	 *
	 * By default, the command will be sent securely if needed.
	 */
	// TODO Replace this by session-based stuff
	public async sendAndWaitFor<R extends CommandPacket<void | object>>(
		nodeId: number,
		request: Packet,
		expectedResponseType: CommandPacketConstructor<R> | PacketMapper<R>,
		options?: SendAndWaitForOptions
	): Promise<R["data"]>;
	public async sendAndWaitFor<R extends CommandPacket<void | object>>(
		nodeId: number,
		channel: number,
		request: Packet,
		expectedResponseType: CommandPacketConstructor<R> | PacketMapper<R>,
		options?: SendAndWaitForOptions
	): Promise<R["data"]>;
	public async sendAndWaitFor<R extends CommandPacket<void | object>>(
		...args:
			| [
					number,
					Packet,
					CommandPacketConstructor<R> | PacketMapper<R>,
					SendAndWaitForOptions?
			  ]
			| [
					number,
					number,
					Packet,
					CommandPacketConstructor<R> | PacketMapper<R>,
					SendAndWaitForOptions?
			  ]
	): Promise<R["data"]> {
		if (args.length < 3) {
			throw new Error("invalid arguments to 'sendAndWaitFor()'");
		}
		let command: LayerCommand;
		let expectedResponse: CommandPacketConstructor<R> | PacketMapper<R>;
		if (typeof args[1] === "number") {
			const [nodeId, channel, request, response, rawOptions] = args as [
				number,
				number,
				Packet,
				CommandPacketConstructor<R> | PacketMapper<R>,
				SendAndWaitForOptions?
			];
			const options = {
				...DEFAULT_SEND_AND_WAIT_FOR_OPTIONS,
				...rawOptions,
			};
			command = {
				endpoint: {
					nodeId,
					channel,
				},
				packet: request,
				secure: options.secure,
				requestTimeout: options.timeout,
			};
			expectedResponse = response;
		} else {
			const [nodeId, request, response, rawOptions] = args as [
				number,
				Packet,
				CommandPacketConstructor<R> | PacketMapper<R>,
				SendAndWaitForOptions?
			];
			const options = {
				...DEFAULT_SEND_AND_WAIT_FOR_OPTIONS,
				...rawOptions,
			};
			command = {
				endpoint: {
					nodeId,
				},
				packet: request,
				secure: options.secure,
				requestTimeout: options.timeout,
			};
			expectedResponse = response;
		}
		const transactionId = this._transactionId++;
		if (logData.enabled) {
			logData(
				"sendAndWaitFor send",
				`id=${transactionId} ${layerCommandToString(command)}`
			);
		}
		function isMapper<T extends Packet>(
			x: CommandPacketConstructor<T> | PacketMapper<T>
		): x is PacketMapper<T> {
			return !("matches" in x);
		}
		const mapper: Mapper<R> = (event) =>
			isMapper(expectedResponse)
				? expectedResponse(event.packet)
				: event.packet.tryAs(expectedResponse);
		const reply = await this._requester.sendAndWaitFor(
			command,
			(command) => this._stack.send(command),
			mapper
		);
		if (!reply) {
			// TODO inconvenient
			throw new Error("error waiting for packet, send filtered out");
		}
		if (logData.enabled) {
			logData(
				"sendAndWaitFor result",
				`id=${transactionId} ${layerEventToString(reply)}`
			);
		}
		return reply.packet.data;
	}

	public async execute<T>(
		endpoint: Endpoint,
		runner: ControllerSessionRunner<T>
	): Promise<T> {
		return this._queue.add(async () => {
			const executor = buildControllerSessionExecutor(
				runner,
				this._rootSession
			);
			assert(!this._activeSession, "cannot have nested sessions");
			this._activeSession = {
				endpoint,
				executor,
			};
			try {
				return await executor.run();
			} finally {
				this._activeSession = undefined;
			}
		});
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
		if (
			this._activeSession &&
			isSameEndpoint(this._activeSession.endpoint, event.endpoint)
		) {
			this._activeSession.executor.dispatch(event.packet);
		}
		if (logData.enabled) {
			logData(`emit event ${layerEventToString(event)}`);
		}
		this.emit("event", event);
	}

	private async _handleSerialCommand(
		event: SerialApiCommandEvent
	): Promise<void> {
		const packet = new Packet(event.command);
		await this._stack.dispatch({
			destinationType: event.rxStatus.destinationType,
			endpoint: {
				nodeId: event.sourceNode,
			},
			packet: packet,
			secure: false,
		});
	}

	private async _initDevices(): Promise<void> {
		// Get currently known list of devices in SerialApi controller
		const currentNodeIds = this._serialApi?.getNodes() ?? new Set();
		const deviceKeys = [...this._devices.keys()];
		const addedIds = [...currentNodeIds].filter(
			(id) => !this._devices.has(id)
		);
		const deletedIds = deviceKeys.filter((id) => !currentNodeIds.has(id));

		// Remove the ones from our own cache that no longer exist
		for (const nodeId of deletedIds) {
			try {
				const device = this._devices.get(nodeId);
				device?.stop();
				// TODO unregister cache handler
			} catch (err) {
				log(`delete device id ${nodeId} failed:`, err);
			}
			this._devices.delete(nodeId);
		}

		// Load any devices that are now available
		for (const nodeId of addedIds) {
			try {
				const cache = await this._deviceCache?.get(nodeId);
				const name = `${toHex(this.homeId, 8)}:${nodeId}`;
				const device = await this._createDevice(nodeId, name, cache);
				device.start();
				this.emit("deviceAdded", device);
			} catch (err) {
				log(`add device id ${nodeId} failed:`, err);
			}
		}
	}

	private async _createDevice(
		nodeId: number,
		name: string,
		cache?: JsonValue
	): Promise<Device> {
		const device = new Device(this, nodeId, name, cache);
		device.on("cache", (cache: JsonValue) =>
			this._handleDeviceCache(device, cache)
		);
		await device.initProtocolData();
		this._devices.set(nodeId, device);
		return device;
	}

	private _handleDeviceCache(device: Device, cache: JsonValue): void {
		this._deviceCache?.set(device.nodeId, cache).catch((err) => {
			console.warn(
				`Device cache save failed for device ${device.nodeId}:`,
				err
			);
		});
	}
}
