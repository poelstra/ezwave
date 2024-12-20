import { Packet } from "@ezwave/codec";
import { BasicV1, SwitchBinaryV1, SwitchMultilevelV1 } from "@ezwave/commands";
import { Controller, Device, ep } from "@ezwave/controller";
import { Endpoint, LayerEvent } from "@ezwave/layers";
import { EventEmitter } from "events";

export enum ControllerIds {
	MainController = 3743991572,
	DevController = 3984265931,
}

export enum HomeDevices {
	Controller = 1, // *LB, Static Controller, Static PC Controller, AEON Labs ZW090 Z-Stick Gen5 EU, Stick, Meterkast, , 9:42:29 PM, Ready
	Misc = 10, // LBR, Routing Slave, Binary Power Switch, Unknown: id=0000 Unknown: type=0000, id=0000, Misc, Garage, off, 9:42:52 PM, Ready
	BadkamerLeds = 11, // LBR+, Z-Wave+ node Always On Slave, On/Off Power Switch, FIBARO System FGWPE/F Wall Plug Gen5, Leds badkamer, Badkamer, on, 3:26:05 PM, Ready
	// BadkamerThermostaat = 13, // FBR+, Z-Wave+ node Listening Sleeping Slave, Thermostat HVAC, EUROtronic EUR_SPIRITZ Wall Radiator Thermostat, Verwarming, Badkamer, 0, 10:26:19 AM, Ready
	ZolderAfzuiging = 15, // LBR+, Z-Wave+ node Always On Slave, On/Off Power Switch, AEON Labs ZW132 Dual Nano Switch, Afzuiging, Zolder, on, 7:30:02 AM, Ready
	KeukenBar = 16, // LBR+, Z-Wave+ node Always On Slave, Light Dimmer Switch, FIBARO System FGD212 Dimmer 2, Spots Bar, Keuken, 0, 3:45:46 PM, Ready
	BijkeukenBuitenlamp = 22, // LBR+, Z-Wave+ node Always On Slave, On/Off Power Switch, AEON Labs ZW116 Nano Switch, Buitenlamp acht, Bijkeuken, off, 3:47:32 PM, Ready
	KeukenAanrecht = 23, // LBR+, Z-Wave+ node Always On Slave, Light Dimmer Switch, FIBARO System FGD212 Dimmer 2, Spots Aanrecht, Keuken, 0, 3:10:07 PM, Ready
	KeukenKoelkast = 24, // LBR, Routing Slave, Multilevel Power Switch, FIBARO System FGRGBWM441 RGBW Controller, Leds Koelkast, Keuken, 0, 8:51:43 AM, Ready
	EetkamerLamp = 25, // LBR+, Z-Wave+ node Always On Slave, Light Dimmer Switch, FIBARO System FGD212 Dimmer 2, Lamp tafel, Eetkamer, 0, 3:30:57 PM, Ready
	BadkamerSensor = 26, // BR, Routing Slave, Routing Multilevel Sensor, , Multisensor, Badkamer, , 8:51:06 AM, Probe (sleeping)
	BadkamerThermostaat = 38, // FBR+, Z-Wave+ node Listening Sleeping Slave, Thermostat HVAC, EUROtronic EUR_SPIRITZ Wall Radiator Thermostat, Verwarming, Badkamer, 0, 10:26:19 AM, Ready
}

export enum DevHomeDevices {
	Controller = 1,
	MiscSwitch = 3,
	Thermostat1 = 4,
	AerQ1 = 5,
}

export async function setupThermostat(
	controller: Controller,
	nodeId: number
): Promise<void> {
	// https://eurotronic.org/wp-content/uploads/2021/07/Spirit_Z-Wave_Plus_Installation-and-Operation-Guide_web.pdf
	const device = controller.getDevice(nodeId);

	// Configure battery reports once a day
	await device.setConfiguration(4, 1);
	// Temperature reporting in 0.1C steps (0, 1..50)
	await device.setConfiguration(5, 5); // TODO set back to 0 when using external sensor?
	// Valve opening reporting in percent (0, 1..100)
	await device.setConfiguration(6, 1);
	// Window open detection (0 = disable, 1..3 = low,medium,high sensitivity)
	await device.setConfiguration(7, 0);
	// Temperature offset compensation in 0.1C steps (-50..50, -128 = external sensor)
	await device.setConfiguration(8, -128);
}

export async function setupThermostatNew(device: Device): Promise<void> {
	// https://eurotronic.org/wp-content/uploads/2021/07/Spirit_Z-Wave_Plus_Installation-and-Operation-Guide_web.pdf

	// Configure battery reports once a day
	await device.setConfiguration(4, 1);
	// Temperature reporting in 0.1C steps (0, 1..50)
	await device.setConfiguration(5, 5);
	// Valve opening reporting in percent (0, 1..100)
	await device.setConfiguration(6, 0);
	// Window open detection (0 = disable, 1..3 = low,medium,high sensitivity)
	await device.setConfiguration(7, 0);
	// Temperature offset compensation in 0.1C steps (-50..50, -128 = external sensor)
	//await device.setConfiguration(8, -128);
}

export async function setupThermostatBadkamer(device: Device): Promise<void> {
	// https://eurotronic.org/wp-content/uploads/2021/07/Spirit_Z-Wave_Plus_Installation-and-Operation-Guide_web.pdf

	// Configure battery reports once a day
	await device.setConfiguration(4, 1);
	// Temperature reporting in 0.1C steps (0, 1..50)
	await device.setConfiguration(5, 10);
	// Valve opening reporting in percent (0, 1..100)
	await device.setConfiguration(6, 0);
	// Window open detection (0 = disable, 1..3 = low,medium,high sensitivity)
	await device.setConfiguration(7, 0);
	// Temperature offset compensation in 0.1C steps (-50..50, -128 = external sensor)
	//await device.setConfiguration(8, -128);
}

export async function setupAerQNew(device: Device): Promise<void> {
	// https://aeotec.freshdesk.com/support/solutions/articles/6000227918-a%C3%ABrq-temperature-and-humidity-sensor-user-guide-

	// Lifeline temperature reports in 0.1C steps (0, 1..100), default 20
	await device.setConfiguration(1, 1);
	// Checking period for param 1&2 in minutes (1..255), default 15
	await device.setConfiguration(3, 5);
	// Sensor report after inclusion. (ZWA039 V2.0 or higher) (bit 0 = battery, 1 = temp, 2 = humidity, 3 = dew point), default 15
	// Note: seems humidity and dew point are swapped in the docs, so 2 = dew point, 3 = humidity
	await device.setConfiguration(65, 0b1011);
}

export async function setupAerQ(
	controller: Controller,
	sensorNodeId: number,
	thermostatEndpoints: Endpoint[]
): Promise<void> {
	// https://aeotec.freshdesk.com/support/solutions/articles/6000227918-a%C3%ABrq-temperature-and-humidity-sensor-user-guide-
	const device = controller.getDevice(sensorNodeId);

	// Lifeline temperature reports in 0.1C steps (0, 1..100), default 20
	await device.setConfiguration(1, 1);
	// Sensor report after inclusion. (ZWA039 V2.0 or higher) (bit 0 = battery, 1 = temp, 2 = humidity, 3 = dew point), default 15
	await device.setConfiguration(65, 0b1011);

	// Associate temp sensor to valve
	await device.addAssociations(6, thermostatEndpoints);
}

export class Home extends EventEmitter {
	public controller: Controller;

	public constructor(controller: Controller) {
		super();
		this.controller = controller;
		this.controller.on("attach", async () => {
			try {
				console.log("Home controller attached, initializing...");
				await this._handleControllerAttached();
				console.log("Home initialized");
			} catch (err) {
				// Don't close/detach controller, keep running to handle any other commands.
				console.warn("Home initialization failed", err);
			}
		});
		this.controller.on("detach", () => {
			console.log("Home controller detached");
		});
		this.controller.on("event", (event: LayerEvent<Packet>) => {
			this._handleControllerEvent(event).catch((err: unknown) =>
				console.warn(
					"Home controller event dispatch failed for",
					event,
					err
				)
			);
		});
	}

	public async setMisc(on: boolean): Promise<void> {
		return this._setBasic(HomeDevices.Misc, on);
	}

	public async setBadkamerLeds(on: boolean): Promise<void> {
		return this._setBasic(HomeDevices.BadkamerLeds, on);
	}

	public async setBadkamerThermostaat(value: number): Promise<void> {
		await this._setMultilevel(HomeDevices.BadkamerThermostaat, value);
	}

	public async setZolderAfzuiging(level: 0 | 1): Promise<void> {
		await this.controller.send({
			endpoint: ep(HomeDevices.ZolderAfzuiging, 1),
			packet: new SwitchBinaryV1.SwitchBinarySet({
				switchValue: level === 1 ? 0xff : 0x00,
			}),
		});
	}

	public async setKeukenBar(level: number): Promise<void> {
		return this._setMultilevel(HomeDevices.KeukenBar, level);
	}

	public async setBijkeukenBuitenlamp(on: boolean): Promise<void> {
		return this._setBasic(HomeDevices.BijkeukenBuitenlamp, on);
	}

	public async setKeukenAanrecht(level: number): Promise<void> {
		const switchCmd = new SwitchMultilevelV1.SwitchMultilevelSet({
			value: level < 100 ? level : 99,
		});
		await this.controller.send({
			endpoint: ep(HomeDevices.KeukenAanrecht, 1),
			packet: switchCmd,
			secure: true,
		});
	}

	public async getKeukenAanrecht(): Promise<number> {
		const reply = await this.controller.execute(
			ep(HomeDevices.KeukenAanrecht, 1),
			async (session) => {
				await session.send(
					new SwitchMultilevelV1.SwitchMultilevelGet(),
					{ secure: true }
				);
				return session.waitFor(
					SwitchMultilevelV1.SwitchMultilevelReport
				);
			}
		);
		const level = reply.value;
		return level;
	}

	public async setKeukenKoelkast(level: number): Promise<void> {
		return this._setMultilevel(HomeDevices.KeukenKoelkast, level);
	}

	public async setTafel(level: number): Promise<void> {
		return this._setMultilevel(HomeDevices.EetkamerLamp, level);
	}

	private async _setMultilevel(node: number, level: number): Promise<void> {
		if (level >= 100 && level < 255) {
			// Z-Wave maximum value is 99...
			level = 99;
		}
		await this.controller.send({
			endpoint: ep(node),
			packet: new SwitchMultilevelV1.SwitchMultilevelSet({
				value: level,
			}),
		});
	}

	private async _setBasic(node: number, on: boolean): Promise<void> {
		await this.controller.send({
			endpoint: ep(node),
			packet: new BasicV1.BasicSet({ value: on ? 0xff : 0x00 }),
		});
	}

	private async _handleControllerEvent(
		event: LayerEvent<Packet>
	): Promise<void> {
		if (event.packet.is(SwitchMultilevelV1.SwitchMultilevelReport)) {
			const level = event.packet.as(
				SwitchMultilevelV1.SwitchMultilevelReport
			).data.value;
			console.log(
				`-> received SWITCH_MULTILEVEL_REPORT, node=${
					event.endpoint.nodeId
				}${
					event.endpoint.channel
						? `, channel=${event.endpoint.channel}`
						: ""
				} level=${level}`
			);
			if (
				event.endpoint.nodeId === HomeDevices.KeukenAanrecht &&
				(event.endpoint.channel === undefined ||
					event.endpoint.channel === 1)
			) {
				// TODO Sometimes, the node sends an unsollicited SWITCH_MULTILEVEL_REPORT,
				// but sometimes it only does that encapsulated in a MULTI_CHANNEL message.
				// Figure out when/why.
				this.emit("value", "aanrecht", level);
			}
		}
	}

	private async _handleControllerAttached(): Promise<void> {
		// Request current value of certain lights to ensure we're in sync
		// (i.e. in case someone manually toggled the attached light switch)
		await this.getKeukenAanrecht();
	}
}
