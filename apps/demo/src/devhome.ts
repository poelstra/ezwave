import { Packet } from "@ezwave/codec";
import { Controller, ep, interview } from "@ezwave/controller";
import { LayerEvent } from "@ezwave/layers";
import { EventEmitter } from "events";

export enum HomeDevices {
	Controller = 1,
	MiscSwitch = 3,
}

export class DevHome extends EventEmitter {
	public controller: Controller;

	public constructor(controller: Controller) {
		super();
		this.controller = controller;
		this.controller.on("attach", async () => {
			try {
				console.log("Dev controller attached");
				await this._handleControllerAttached();
			} catch (err) {
				// Don't close/detach controller, keep running to handle any other commands.
				console.warn("DevHome initialization failed", err);
			}
		});
		this.controller.on("detach", () => {
			console.log("Dev controller detached");
		});
		this.controller.on("event", (event: LayerEvent<Packet>) => {
			this._handleControllerEvent(event).catch((err: unknown) =>
				console.warn(
					"DevHome controller event dispatch failed for",
					event,
					err
				)
			);
		});
	}

	private async _handleControllerEvent(
		event: LayerEvent<Packet>
	): Promise<void> {}

	private async _handleControllerAttached(): Promise<void> {
		// console.log("Start inclusion...");
		// const includedNodeId = await this.controller.includeDevice();
		// console.log("Done:", includedNodeId);
		console.log(
			"interview complete",
			await this.controller.execute(
				ep(HomeDevices.MiscSwitch),
				// TODO Get rid of the repeated device ID
				interview(HomeDevices.MiscSwitch)
			)
		);
	}
}
