import { Packet } from "@ezwave/codec";
import { Controller } from "@ezwave/controller";
import { LayerEvent } from "@ezwave/layers";
import { EventEmitter } from "events";

export enum HomeDevices {
	Controller = 1,
	MiscSwitch = 3,
	Thermostat1 = 4,
	AerQ1 = 5,
}

export class DevHome extends EventEmitter {
	public controller: Controller;

	public constructor(controller: Controller) {
		super();
		this.controller = controller;
		this.controller.on("ready", async () => {
			try {
				console.log("Dev controller initializing...");
				await this._handleControllerReady();
				console.log("Dev controller ready");
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

	private async _setupThermostat(nodeId: number): Promise<void> {
		const device = this.controller.getDevice(nodeId);

		// Configure battery reports once a day
		await device.setConfiguration(4, 1);
		// Temperature reporting in 0.1C steps (0, 1..50)
		await device.setConfiguration(5, 5); // TODO set back to 0 when using external sensor?
		// Valve opening reporting in percent (0, 1..100)
		await device.setConfiguration(6, 10);
		// Window open detection (0 = disable, 1..3 = low,medium,high sensitivity)
		await device.setConfiguration(7, 0);
		// Temperature offset compensation in 0.1C steps (-50..50, 0x80 = external sensor)
		await device.setConfiguration(8, 0);
	}

	private async _handleControllerReady(): Promise<void> {
		await this._setupThermostat(HomeDevices.Thermostat1);
	}
}
