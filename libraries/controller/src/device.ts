import { Packet } from "@ezwave/codec";
import { LayerEvent } from "@ezwave/layers";
import {
	ZwGetNodeInfoProtocolData,
	ZwNodeInfoProtocolData,
} from "@ezwave/serialapi";
import { defer, Deferred } from "@ezwave/shared";
import debug from "debug";
import EventEmitter from "events";
import { ep, interview, InterviewResult } from ".";
import { Controller } from "./controller";

interface CachedDevice {
	version: number;
	protocolData: ZwNodeInfoProtocolData;
}

export class Device extends EventEmitter {
	private readonly _controller: Controller;
	private readonly _nodeId: number;
	private readonly _attachHandler: typeof this._attach =
		this._attach.bind(this);
	private readonly _detachHandler: typeof this._detach =
		this._detach.bind(this);
	private readonly _eventHandler: typeof this._handleEvent =
		this._handleEvent.bind(this);

	private _initialized: Deferred<void> = defer();
	private _ready: Deferred<void> = defer();
	private _protocolData?: ZwNodeInfoProtocolData;
	private _interviewResult?: InterviewResult;
	private _log: debug.Debugger;

	public constructor(
		controller: Controller,
		nodeId: number,
		cached?: CachedDevice
	) {
		super();
		this._controller = controller;
		this._nodeId = nodeId;
		this._log = debug(`zwave:controller:device:${nodeId}`);

		if (cached) {
			this._loadFromCache(cached);
		}

		this._start();
	}

	public destroy(): void {
		this._stop();
	}

	/**
	 * Resolves when basic initialization is completed.
	 *
	 * I.e. generic protocol info is loaded from serial API.
	 * Full node interview may not be completed at this stage.
	 */
	public initialized(): Promise<void> {
		return this._initialized.promise;
	}

	/**
	 * Resolves when device is completely ready,
	 * i.e. interviewing has been completed.
	 */
	public ready(): Promise<void> {
		return this._ready.promise;
	}

	private _loadFromCache(cached: CachedDevice): void {
		if (cached.version !== 1) {
			return;
		}
		this._protocolData = cached.protocolData;
	}

	private _start(): void {
		this._controller.on("attach", this._attachHandler);
		this._controller.on("detach", this._detachHandler);
		this._controller.on("event", this._eventHandler);

		if (this._controller.isAttached()) {
			this._attach();
		}
	}

	private _stop(): void {
		if (this._controller.isAttached()) {
			this._detach();
		}
		this._controller.off("attach", this._attachHandler);
		this._controller.off("detach", this._detachHandler);
		this._controller.off("event", this._eventHandler);
	}

	private _attach(): void {
		this._initialize().catch((err) => {
			this._log("initialization failed", err);
		});
	}

	private _detach(): void {}

	private _handleEvent(event: LayerEvent<Packet>): void {
		if (event.endpoint.nodeId !== this._nodeId) {
			return;
		}
	}

	private async _initialize(): Promise<void> {
		try {
			// TODO Emit cache updates
			if (!this._protocolData) {
				try {
					this._protocolData =
						await this._controller.executeSerialCommand(
							new ZwGetNodeInfoProtocolData({
								nodeId: this._nodeId,
							})
						);
					this._initialized.resolve();
				} catch (err) {
					this._initialized.reject(err as Error);
					throw err;
				}
			}

			if (!this._interviewResult) {
				this._interviewResult = await this._controller.execute(
					// TODO Get rid of repeated nodeId
					ep(this._nodeId),
					interview(this._nodeId)
				);
			}
			this._ready.resolve();
		} catch (err) {
			this._ready.reject(err as Error);
			throw err;
		} finally {
			// Allow re-initialization, both promises are definitely
			// resolved or rejected above
			this._initialized = defer();
			this._ready = defer();
		}
	}
}
