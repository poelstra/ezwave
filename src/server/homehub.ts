import { Message } from "mhub";
import { LayerEvent } from "../commands/layer";
import { Packet } from "../commands/packet";
import CommandClasses from "../generated/CommandClasses";
import { Controller } from "./controller";
import { Home } from "./home";
import { Hub } from "./hub";

export class HomeHub {
	private _hub: Hub;
	private _home: Home;

	constructor(home: Home, hub: Hub, controller: Controller) {
		this._home = home;
		this._home.on("value", (name: string, value: number) =>
			this._handleValue(name, value).catch((err) =>
				console.warn("Value update failed", err)
			)
		);

		controller.on("event", (event: LayerEvent<Packet>) =>
			this._handleEvent(event).catch((err) =>
				console.warn("Event dispatch failed", err)
			)
		);

		this._hub = hub;
		this._hub.subscribe("command", "/home/lights/*", (message) =>
			this._handleLights(message)
		);
		this._hub.subscribe("command", "/home/thermostat/*", (message) =>
			this._handleThermostat(message)
		);
		this._hub.subscribe("command", "/home/afzuiging", (message) =>
			this._handleAfzuiging(message)
		);
	}

	private async _handleValue(name: string, value: number): Promise<void> {
		if (value >= 99) {
			value = 100;
		}
		console.log(`HomeHub update light=${name} level=${value}`);
		await this._hub.publish("state", `/home/lights/${name}`, value / 100);
	}

	private async _handleLights(message: Message): Promise<void> {
		const prefix = "/home/lights/";
		if (!message.topic.startsWith(prefix)) {
			throw new Error("invalid lights prefix");
		}

		const light = message.topic.slice(prefix.length);
		const level = message.data;
		console.log(`HomeHub received light=${light} level=${level}`);
		switch (light) {
			case "tafel":
				await this._home.setTafel(level * 100);
				break;
			case "misc":
				await this._home.setMisc(level > 0);
				break;
			case "badkamer_leds":
				await this._home.setBadkamerLeds(level > 0);
				break;
			case "bar":
				await this._home.setKeukenBar(level * 100);
				break;
			case "buitenlamp_achter":
				await this._home.setBijkeukenBuitenlamp(level > 0);
				break;
			case "aanrecht":
				await this._home.setKeukenAanrecht(level * 100);
				break;
			case "koelkast":
				await this._home.setKeukenKoelkast(level * 100);
				break;
		}
	}

	private async _handleThermostat(message: Message): Promise<void> {
		const prefix = "/home/thermostat/";
		if (!message.topic.startsWith(prefix)) {
			throw new Error("invalid thermostat prefix");
		}

		const thermostat = message.topic.slice(prefix.length);
		const level = message.data;
		console.log(`HomeHub received thermostat=${thermostat} level=${level}`);
		switch (thermostat) {
			case "badkamer":
				await this._home.setBadkamerThermostaat(level * 100);
				break;
		}
	}

	private async _handleAfzuiging(message: Message): Promise<void> {
		if (message.topic !== "/home/afzuiging") {
			throw new Error("invalid topic");
		}

		const level = message.data;
		console.log(`HomeHub received afzuiging level=${level}`);
		if (level !== 0 && level !== 1 && level !== 2) {
			throw new Error(`invalid afzuiging level ${level}`);
		}
		await this._home.setZolderAfzuiging(level);
	}

	private async _publishScene(name: string): Promise<void> {
		console.log(`HomeHub sending activate scene=${name}`);
		await this._hub.publish("command", "/home/scene", name);
	}

	async _handleSceneActivationSet(event: LayerEvent<Packet>): Promise<void> {
		const scene = event.packet.commandAndPayload[1];
		const duration = event.packet.commandAndPayload[2];
		console.log(
			`-> scene activation from=${event.endpoint.nodeId} scene=${scene} duration=${duration}`
		);
		switch (scene) {
			case 0x1a:
				//home.sceneKeuken1();
				await this._publishScene("keuken1");
				break;
			case 0x18:
				//home.sceneKeuken2();
				await this._publishScene("keuken2");
				break;
			case 0x19:
				//home.sceneKeuken3();
				await this._publishScene("keuken3");
				break;
		}
	}

	private async _handleEvent(event: LayerEvent<Packet>): Promise<void> {
		if (
			event.packet.is({
				matches(packet) {
					return (
						packet.commandClass ===
							CommandClasses.COMMAND_CLASS_SCENE_ACTIVATION &&
						packet.commandAndPayload[0] ===
							0x1 /* SCENE_ACTIVATION_SET */
					);
				},
			})
		) {
			await this._handleSceneActivationSet(event);
		}
	}
}
