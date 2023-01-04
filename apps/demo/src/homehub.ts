import { CommandClasses, Packet } from "@ezwave/codec";
import { SceneActivationV1 } from "@ezwave/commands";
import {
	BasicSetTask,
	BatteryGetTask,
	BatteryReport,
	Controller,
	Device,
	enumName,
	getScaleName,
	SceneActivation,
	SensorMultilevelReportTask,
	SensorMultilevelValue,
	SensorType,
	SetpointType,
	SwitchMultilevelGetTask,
	SwitchMultilevelSetTask,
	SwitchMultilevelValue,
	SwitchMultilevelVersions,
	TemperatureScale,
	ThermostatMode,
	ThermostatModeEnum,
	ThermostatModeSetTask,
	ThermostatSetPoint,
	ThermostatSetpointSetTask,
} from "@ezwave/controller";
import { Endpoint, ep, LayerEvent } from "@ezwave/layers";
import { toHex } from "@ezwave/shared";
import assert from "assert";
import { Headers, Message } from "mhub";
import { Home } from "./home";
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

interface ReverseMapping {
	controller: Controller;
	endpoint: Endpoint;
}

export class HomeHub {
	private _hub: Hub;
	private _home: Home;
	private _controllers: Controller[];
	private _controllerMappings: ControllerMappings;
	private _reverseMappings: Map<string, ReverseMapping> = new Map();

	public static async create(
		home: Home,
		mainController: Controller,
		hub: Hub,
		controllers: Controller[],
		controllerMappings: ControllerMappings
	): Promise<HomeHub> {
		const homeHub = new this(
			home,
			mainController,
			hub,
			controllers,
			controllerMappings
		);
		await homeHub._initMhub();
		return homeHub;
	}

	private constructor(
		home: Home,
		mainController: Controller,
		hub: Hub,
		controllers: Controller[],
		controllerMappings: ControllerMappings
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

		this._hub = hub;
		this._controllerMappings = controllerMappings;
		this._controllers = controllers.slice();

		this._updateReverseMappings();
		for (const controller of controllers) {
			this._initController(controller);
		}
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
		this._updateReverseMappings();
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
		device.on("sensorMultilevel", (sensorValue: SensorMultilevelValue) => {
			return doPublish(0, "state", "sensorMultilevel/report", {
				sensorType: enumName(sensorValue.sensorType, SensorType),
				scale:
					getScaleName(
						sensorValue.sensorType,
						sensorValue.scaleIndex
					) ?? sensorValue.scaleIndex,
				value: sensorValue.value,
			});
		});
		device.on("switchMultilevel", (switchValue: SwitchMultilevelValue) =>
			doPublish(0, "state", "switchMultilevel/report", switchValue)
		);
		device.on("thermostatMode", (mode: ThermostatMode) =>
			doPublish(0, "state", "thermostatMode/report", {
				mode: enumName(mode.mode, ThermostatModeEnum),
			})
		);
		device.on("thermostatSetpoint", (setpoint: ThermostatSetPoint) =>
			doPublish(0, "state", "thermostatSetpoint/report", {
				setpointType: enumName(setpoint.setpointType, SetpointType),
				scale: enumName(setpoint.scale, TemperatureScale),
				value: setpoint.value,
			})
		);
		device.on("sceneActivation", (sceneActivation: SceneActivation) =>
			doPublish(0, "state", "sceneActivation/report", sceneActivation)
		);
		device.on("battery", (batteryReport: BatteryReport) =>
			doPublish(0, "state", "battery/report", batteryReport)
		);
	}

	private _getName(
		homeId: number,
		nodeId?: number,
		channelId?: number
	): string {
		const controllerMapping = this._controllerMappings[homeId];
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

	private _updateReverseMappings(): void {
		this._reverseMappings.clear();
		// Add numeric / fallback IDs for all devices
		for (const controller of this._controllers) {
			const controllerName = this._controllerMappings[controller.homeId];
			const devices = controller.getDevices();
			for (const device of devices) {
				const rev: ReverseMapping = {
					controller,
					endpoint: ep(device.nodeId),
				};
				if (controllerName) {
					this._reverseMappings.set(
						`${toHex(controller.homeId, 8)}:${toHex(
							device.nodeId,
							2
						)}`,
						rev
					);
				}
				this._reverseMappings.set(
					`${toHex(controller.homeId, 8)}:${toHex(device.nodeId, 2)}`,
					rev
				);
			}
		}
		// Add explicit mappings
		const controllerMap: Map<number, Controller> = new Map();
		for (const controller of this._controllers) {
			controllerMap.set(controller.homeId, controller);
		}
		for (const [homeId, controllerMapping] of Object.entries(
			this._controllerMappings
		)) {
			const controller = controllerMap.get(parseInt(homeId, 10));
			if (!controller || !controllerMapping?.devices) {
				continue;
			}
			for (const [nodeId, deviceMapping] of Object.entries(
				controllerMapping.devices
			)) {
				this._reverseMappings.set(deviceMapping!.name, {
					controller,
					endpoint: ep(parseInt(nodeId, 10)),
				});
			}
		}
	}

	private async _initMhub(): Promise<void> {
		await this._hub.subscribe("command", "/dev/zwave/**", (message) =>
			this._handleZwaveCommand(message)
		);

		// Old 'home-specific' subscriptions, to be moved to external system
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

	private async _handleZwaveCommand(message: Message): Promise<void> {
		const prefix = "/dev/zwave/";
		assert(message.topic.startsWith(prefix));
		const [deviceName, cc, ccCmd] = message.topic
			.slice(prefix.length)
			.split("/", 3);
		const command = `${cc}/${ccCmd}`;
		const mapping = this._reverseMappings.get(deviceName);
		if (!mapping) {
			console.warn(`Ignoring command for unknown device '${deviceName}`);
			return;
		}
		if (!mapping.controller.isAttached()) {
			// Slightly more informative message than if `getDevice()` crashes below.
			console.warn(
				`Ignoring command for unattached device '${deviceName}`
			);
		}
		const device = mapping.controller.getDevice(mapping.endpoint.nodeId);
		switch (command) {
			case "basic/set": {
				if (typeof message.data !== "object") {
					throw new Error("Invalid payload, object expected");
				}
				const value = message.data.value;
				if (typeof value !== "number") {
					throw new Error(
						"Missing/invalid '.value', number expected"
					);
				}
				await device.executeTask(new BasicSetTask(value));
				return;
			}
			case "battery/get": {
				await device.executeTask(new BatteryGetTask());
				return;
			}
			case "sensorMultilevel/report": {
				await device.executeTask(
					new SensorMultilevelReportTask(
						message.data.sensorType,
						message.data.scale,
						message.data.value,
						message.data.precision
					)
				);
				return;
			}
			case "switchMultilevel/get": {
				// TODO Get rid of this manual version stuff
				let version =
					device.supports(CommandClasses.SwitchMultilevel) ?? 1;
				if (version < 1) {
					version = 1;
				} else if (version > 4) {
					version = 4;
				}
				await device.executeTask(
					new SwitchMultilevelGetTask(
						version as SwitchMultilevelVersions
					)
				);
				return;
			}
			case "switchMultilevel/set": {
				if (typeof message.data !== "object") {
					throw new Error("Invalid payload, object expected");
				}
				const value = message.data.value;
				if (typeof value !== "number") {
					throw new Error(
						"Missing/invalid '.value', number expected"
					);
				}
				const dimmingDuration = message.data.dimmingDuration;
				if (
					dimmingDuration !== undefined &&
					typeof dimmingDuration !== "number"
				) {
					throw new Error(
						"Missing/invalid '.dimmingDuration', number or undefined expected"
					);
				}
				await device.executeTask(
					new SwitchMultilevelSetTask(value, dimmingDuration)
				);
				return;
			}
			case "thermostatMode/set": {
				if (typeof message.data !== "object") {
					throw new Error("Invalid payload, object expected");
				}
				const mode = message.data
					.mode as keyof typeof ThermostatModeEnum;
				if (typeof mode !== "string" || ThermostatModeEnum[mode]) {
					throw new Error(
						`Missing/invalid '.mode', expected ModeEnum literal`
					);
				}
				await device.executeTask(
					new ThermostatModeSetTask(ThermostatModeEnum[mode])
				);
				return;
			}
			case "thermostatSetpoint/set": {
				if (typeof message.data !== "object") {
					throw new Error("Invalid payload, object expected");
				}
				await device.executeTask(
					new ThermostatSetpointSetTask(
						SetpointType[
							message.data
								.setpointType as keyof typeof SetpointType
						],
						TemperatureScale[
							message.data.scale as keyof typeof TemperatureScale
						],
						message.data.value,
						message.data.precision
					)
				);
				return;
			}
			default: {
				console.warn(
					`Ignoring unknown command '${command}' for device '${deviceName}'`
				);
			}
		}
	}
}
