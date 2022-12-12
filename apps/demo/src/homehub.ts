import { Packet } from "@ezwave/codec";
import { SceneActivationV1 } from "@ezwave/commands";
import {
	Controller,
	Device,
	SceneActivation,
	SensorValue,
} from "@ezwave/controller";
import { LayerEvent } from "@ezwave/layers";
import { toHex } from "@ezwave/shared";
import { Headers, Message } from "mhub";
import { DevHomeDevices, Home } from "./home";
import { Hub } from "./hub";

export enum ControllerIds {
	MainController = 3743991572,
	DevController = 3984265931,
}

/**
 * Map specific home/node IDs to human-readable names.
 * Home/node IDs not present in this list will use their
 * numeric identifiers.
 */
export type ControllerMappings = Partial<Record<number, ControllerMapping>>;

export interface ControllerMapping {
	name: string;
	devices: Partial<Record<number, DeviceMapping>>;
}

export interface DeviceMapping {
	name: string;
	channels?: Partial<Record<number, ChannelMapping>>;
}

export interface ChannelMapping {
	name: string;
}

// TODO move to configuration
const controllerMappings: ControllerMappings = {
	[ControllerIds.DevController]: {
		name: "dev",
		devices: {
			[DevHomeDevices.Controller]: { name: "devController" },
			[DevHomeDevices.MiscSwitch]: { name: "miscSwitch" },
			[DevHomeDevices.Thermostat1]: { name: "thermostat1" },
			[DevHomeDevices.AerQ1]: { name: "aerq1" },
		},
	},
};

export class HomeHub {
	private _hub: Hub;
	private _home: Home;

	public static async create(
		home: Home,
		hub: Hub,
		mainController: Controller,
		devController: Controller
	): Promise<HomeHub> {
		const homeHub = new this(home, hub, mainController, devController);
		await homeHub._initMhub();
		return homeHub;
	}

	private constructor(
		home: Home,
		hub: Hub,
		mainController: Controller,
		devController: Controller
	) {
		this._home = home;
		this._home.on("value", (name: string, value: number) =>
			this._handleValue(name, value).catch((err) =>
				console.warn("Value update failed", err)
			)
		);

		mainController.on("event", (event: LayerEvent<Packet>) =>
			this._handleEvent(event).catch((err) =>
				console.warn("Event dispatch failed", err)
			)
		);

		this._initController(mainController);
		this._initController(devController);

		this._hub = hub;
	}

	private _initController(controller: Controller): void {
		const controllerName = this._getName(controller.homeId);
		controller.on("attach", () => {
			console.log(`Controller ${controllerName} attached Z-Wave device`);
		});
		controller.on("detach", () => {
			console.log(`Controller ${controllerName} detached Z-Wave device`);
		});
		controller.on("ready", async () => {
			console.log(`Controller ${controllerName} ready`);
		});
		controller.on("deviceAdded", (device) => {
			this._handleDeviceAdded(controller, device).catch((err) => {
				console.error("DevHome: adding device failed", err);
			});
		});
	}

	private async _handleDeviceAdded(
		controller: Controller,
		device: Device
	): Promise<void> {
		const doPublish = (
			channel: number | undefined,
			node: string,
			subject: string,
			data: unknown
		): void => {
			const endpointName = this._getName(
				controller.homeId,
				device.nodeId,
				channel
			);
			const topic = `/dev/zwave/${endpointName}/${subject}`;
			const headers: Headers = {
				ts: new Date().toISOString(),
			};
			this._hub.publish(node, topic, data, headers).catch((err) => {
				console.warn(`Failed to publish ${topic}@${node}:`, err);
			});
		};
		device.on("sensor", (sensorValue: SensorValue) =>
			doPublish(0, "state", "sensor", sensorValue)
		);
		device.on("switch", (switchValue: SensorValue) =>
			doPublish(0, "state", "switch", switchValue)
		);
		device.on("thermostatMode", (mode: SensorValue) =>
			doPublish(0, "state", "thermostatMode", mode)
		);
		device.on("thermostatSetpoint", (setpoint: SensorValue) =>
			doPublish(0, "state", "thermostatSetpoint", setpoint)
		);
		device.on("sceneActivation", (sceneActivation: SceneActivation) =>
			doPublish(0, "state", "sceneActivation", sceneActivation)
		);
	}

	private _getName(
		homeId: number,
		nodeId?: number,
		channelId?: number
	): string {
		const controllerMapping = controllerMappings[homeId];
		const controllerName = controllerMapping?.name ?? `${toHex(homeId, 8)}`;
		if (nodeId === undefined) {
			return controllerName;
		}

		const deviceMapping = controllerMapping?.devices[nodeId];
		const deviceName =
			deviceMapping?.name ?? `${controllerName}:${toHex(nodeId, 2)}`;
		if (channelId === undefined || channelId === 0) {
			return deviceName;
		}

		const channelMapping = deviceMapping?.channels?.[channelId];
		const endpointName =
			channelMapping?.name ?? `${deviceName}.${toHex(channelId, 2)}`;
		return endpointName;
	}

	private async _initMhub(): Promise<void> {
		// TODO Current logic means that homehub will permanently fail
		// if subscribing fails during initialization, whereas it should
		// be fine to just add it to a list of 'wanted subscriptions'.
		// Requires different way of working in Hub though.
		await this._hub.subscribe("command", "/home/lights/*", (message) =>
			this._handleLights(message)
		);
		await this._hub.subscribe("command", "/home/thermostat/*", (message) =>
			this._handleThermostat(message)
		);
		await this._hub.subscribe("command", "/home/afzuiging", (message) =>
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

	private async _handleSceneActivationSet(
		event: LayerEvent<Packet>
	): Promise<void> {
		const decoded = event.packet.as(SceneActivationV1.SceneActivationSet);
		const scene = decoded.data.sceneId;
		const duration = decoded.data.dimmingDuration;
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
		if (event.packet.is(SceneActivationV1.SceneActivationSet)) {
			await this._handleSceneActivationSet(event);
		}
	}
}
