import { Packet } from "@ezwave/codec";
import { BasicV1, SwitchBinaryV1, SwitchMultilevelV1 } from "@ezwave/commands";
import { Controller } from "@ezwave/controller";
import { LayerEvent } from "@ezwave/layers";
import { EventEmitter } from "events";

export enum HomeDevices {
	Controller = 1, // *LB, Static Controller, Static PC Controller, AEON Labs ZW090 Z-Stick Gen5 EU, Stick, Meterkast, , 9:42:29 PM, Ready
	Misc = 10, // LBR, Routing Slave, Binary Power Switch, Unknown: id=0000 Unknown: type=0000, id=0000, Misc, Garage, off, 9:42:52 PM, Ready
	BadkamerLeds = 11, // LBR+, Z-Wave+ node Always On Slave, On/Off Power Switch, FIBARO System FGWPE/F Wall Plug Gen5, Leds badkamer, Badkamer, on, 3:26:05 PM, Ready
	BadkamerThermostaat = 13, // FBR+, Z-Wave+ node Listening Sleeping Slave, Thermostat HVAC, EUROtronic EUR_SPIRITZ Wall Radiator Thermostat, Verwarming, Badkamer, 0, 10:26:19 AM, Ready
	BadkamerSensor = 14, // BR, Routing Slave, Routing Multilevel Sensor, , Multisensor, Badkamer, , 8:51:06 AM, Probe (sleeping)
	ZolderAfzuiging = 15, // LBR+, Z-Wave+ node Always On Slave, On/Off Power Switch, AEON Labs ZW132 Dual Nano Switch, Afzuiging, Zolder, on, 7:30:02 AM, Ready
	KeukenBar = 16, // LBR+, Z-Wave+ node Always On Slave, Light Dimmer Switch, FIBARO System FGD212 Dimmer 2, Spots Bar, Keuken, 0, 3:45:46 PM, Ready
	BijkeukenBuitenlamp = 22, // LBR+, Z-Wave+ node Always On Slave, On/Off Power Switch, AEON Labs ZW116 Nano Switch, Buitenlamp acht, Bijkeuken, off, 3:47:32 PM, Ready
	KeukenAanrecht = 23, // LBR+, Z-Wave+ node Always On Slave, Light Dimmer Switch, FIBARO System FGD212 Dimmer 2, Spots Aanrecht, Keuken, 0, 3:10:07 PM, Ready
	KeukenKoelkast = 24, // LBR, Routing Slave, Multilevel Power Switch, FIBARO System FGRGBWM441 RGBW Controller, Leds Koelkast, Keuken, 0, 8:51:43 AM, Ready
	EetkamerLamp = 25, // LBR+, Z-Wave+ node Always On Slave, Light Dimmer Switch, FIBARO System FGD212 Dimmer 2, Lamp tafel, Eetkamer, 0, 3:30:57 PM, Ready
}

export class Home extends EventEmitter {
	private _lastAanrecht = 0;

	constructor(public controller: Controller) {
		super();
		this.controller.on("attach", async () => {
			try {
				console.log("Controller attached");
				await this._handleControllerAttached();
			} catch (err) {
				console.warn("Home controller initial get failed", err);
			}
		});
		this.controller.on("detach", () => {
			console.log("Controller detached");
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
				this._lastAanrecht === level;
				this.emit("value", "aanrecht", level);
			}
		}
	}

	private async _handleControllerAttached(): Promise<void> {
		await this.getKeukenAanrecht();
	}

	async setMisc(on: boolean): Promise<void> {
		return this._setBasic(HomeDevices.Misc, on);
	}

	async setBadkamerLeds(on: boolean): Promise<void> {
		return this._setBasic(HomeDevices.BadkamerLeds, on);
	}

	async setBadkamerThermostaat(value: number): Promise<void> {
		await this._setMultilevel(HomeDevices.BadkamerThermostaat, value);
	}

	async setZolderAfzuiging(level: 0 | 1): Promise<void> {
		await this.controller.send({
			endpoint: { nodeId: HomeDevices.ZolderAfzuiging, channel: 1 },
			packet: new SwitchBinaryV1.SwitchBinarySet({
				switchValue: level === 1 ? 0xff : 0x00,
			}),
		});
	}

	async setKeukenBar(level: number): Promise<void> {
		return this._setMultilevel(HomeDevices.KeukenBar, level);
	}

	async setBijkeukenBuitenlamp(on: boolean): Promise<void> {
		return this._setBasic(HomeDevices.BijkeukenBuitenlamp, on);
	}

	async setKeukenAanrecht(level: number): Promise<void> {
		const switchCmd = new SwitchMultilevelV1.SwitchMultilevelSet({
			value: level < 100 ? level : 99,
		});
		await this.controller.send({
			endpoint: { nodeId: HomeDevices.KeukenAanrecht, channel: 1 },
			packet: switchCmd,
			secure: true,
		});
		this._lastAanrecht = level;
	}

	async getKeukenAanrecht(): Promise<number> {
		// prettier-ignore
		const reply = await this.controller.sendAndWaitFor(
			{
				endpoint: { channel: 1, nodeId: HomeDevices.KeukenAanrecht },
				packet: new SwitchMultilevelV1.SwitchMultilevelGet(),
				secure: true,
			},
			(event) => event.packet.tryAs(SwitchMultilevelV1.SwitchMultilevelReport)
		);
		const level = reply.packet.data.value;
		this._lastAanrecht = level;
		return level;
	}

	async setKeukenKoelkast(level: number): Promise<void> {
		return this._setMultilevel(HomeDevices.KeukenKoelkast, level);
	}

	async setTafel(level: number): Promise<void> {
		return this._setMultilevel(HomeDevices.EetkamerLamp, level);
	}

	async _setMultilevel(node: number, level: number): Promise<void> {
		if (level >= 100 && level < 255) {
			// Z-Wave maximum value is 99...
			level = 99;
		}
		await this.controller.send({
			endpoint: { nodeId: node },
			packet: new SwitchMultilevelV1.SwitchMultilevelSet({
				value: level,
			}),
		});
	}

	async _setBasic(node: number, on: boolean): Promise<void> {
		await this.controller.send({
			endpoint: { nodeId: node },
			packet: new BasicV1.BasicSet({ value: on ? 0xff : 0x00 }),
		});
	}
}
