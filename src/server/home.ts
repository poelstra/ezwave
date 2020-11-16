import { randomBytes } from "crypto";
import { bufferToString } from "../common/util";

import CommandClasses from "../generated/CommandClasses";
import { CryptoManager, NonceStore } from "./crypto";
import { Host, HostEvent } from "./host";

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

export class Home {
	private _lastAanrecht = 0;

	constructor(
		public host: Host,
		public crypto: CryptoManager,
		public nonceStore: NonceStore
	) {
		this.host.on("event", (event: HostEvent) => {
			this._handleHostEvent(event).catch((err: unknown) =>
				console.warn("Home host event dispatch failed for", event, err)
			);
		});
	}

	private async _handleHostEvent(event: HostEvent): Promise<void> {
		if (
			event.commandClass ===
				CommandClasses.COMMAND_CLASS_SWITCH_MULTILEVEL &&
			event.command === 3 /* report */
		) {
			const level = event.payload[0];
			console.log(
				`-> received SWITCH_MULTILEVEL_REPORT, node=${event.sourceNode} level=${level}`
			);
			if (event.sourceNode === HomeDevices.KeukenAanrecht) {
				// TODO Sometimes, the node sends an unsollicited SWITCH_MULTILEVEL_REPORT,
				// but sometimes it only does that encapsulated in a MULTI_CHANNEL message.
				// Figure out when/why.
				this._lastAanrecht === level;
			}
		}
	}

	async setMisc(on: boolean): Promise<void> {
		return this._setBasic(HomeDevices.Misc, on);
	}

	async setBadkamerLeds(on: boolean): Promise<void> {
		return this._setBasic(HomeDevices.BadkamerLeds, on);
	}

	async setBadkamerThermostaat(value: number): Promise<void> {
		// await this.host.zwSendData(
		// 	HomeDevices.BadkamerThermostaat,
		// 	Buffer.from([
		// 		CommandClasses.COMMAND_CLASS_THERMOSTAT_MODE,
		// 		1, // THERMOSTAT_MODE_SET
		// 		31, // Manufacturer-specific, no manuf. data fields
		// 	])
		// );
		await this._setMultilevel(HomeDevices.BadkamerThermostaat, value);
	}

	async setZolderAfzuiging(level: 0 | 1): Promise<void> {
		await this.host.zwSendData(
			HomeDevices.ZolderAfzuiging,
			Buffer.from([
				CommandClasses.COMMAND_CLASS_MULTI_INSTANCE,
				0x0d /* MULTI_CHANNEL_CMD_ENCAP */,
				0 /* source */,
				1 /* destination */,
				CommandClasses.COMMAND_CLASS_SWITCH_BINARY,
				0x01 /* SET */,
				level === 1 ? 0xff : 0x00,
			])
		);
	}

	async setKeukenBar(level: number): Promise<void> {
		return this._setMultilevel(HomeDevices.KeukenBar, level);
	}

	async setBijkeukenBuitenlamp(on: boolean): Promise<void> {
		return this._setBasic(HomeDevices.BijkeukenBuitenlamp, on);
	}

	async setKeukenAanrecht(level: number): Promise<void> {
		// prettier-ignore
		const message = Buffer.from([
			CommandClasses.COMMAND_CLASS_MULTI_CHANNEL,
			0x0d, /* MULTI_CHANNEL_CMD_ENCAP */
			0x01, /* source */
			0x01, /* dest */
			CommandClasses.COMMAND_CLASS_SWITCH_MULTILEVEL,
			0x01 /* SET */,
			level < 100 ? level : 99,
		]);
		await this._sendS0Encrypted(HomeDevices.KeukenAanrecht, message);
		this._lastAanrecht = level;
	}

	async getKeukenAanrecht(): Promise<number> {
		// prettier-ignore
		const message = Buffer.from([
			CommandClasses.COMMAND_CLASS_MULTI_CHANNEL,
			0x0d, /* MULTI_CHANNEL_CMD_ENCAP */
			0x01, /* source */
			0x01, /* dest */
			CommandClasses.COMMAND_CLASS_SWITCH_MULTILEVEL,
			0x02 /* GET */
		]);
		await this._sendS0Encrypted(HomeDevices.KeukenAanrecht, message);
		const reply = await this.host.waitFor(
			3000,
			(event) =>
				event.sourceNode === HomeDevices.KeukenAanrecht &&
				event.commandClass ===
					CommandClasses.COMMAND_CLASS_MULTI_CHANNEL &&
				event.command === 13 &&
				event.payload[0] === 1 /* source */ &&
				event.payload[1] === 1 /* destination */ &&
				event.payload[2] ===
					CommandClasses.COMMAND_CLASS_SWITCH_MULTILEVEL &&
				event.payload[3] === 3 /* report */
		);
		const level = reply.payload[4];
		this._lastAanrecht = level;
		return level;
	}

	private async _sendS0Encrypted(
		node: number,
		payload: Buffer
	): Promise<void> {
		console.log(
			`-> sending encrypted node=${node}, payload=[${bufferToString(
				payload
			)}]`
		);
		await this.host.zwSendData(
			node,
			Buffer.from([
				CommandClasses.COMMAND_CLASS_SECURITY,
				0x40 /* SECURITY_NONCE_GET */,
			])
		);
		const nonce = await this.host.waitFor(
			3000,
			(event) =>
				event.sourceNode === node &&
				event.commandClass === CommandClasses.COMMAND_CLASS_SECURITY &&
				event.command === 0x80 /* SECURITY_NONCE_REPORT */
		);

		const destination = node;
		const senderNonce = randomBytes(8);
		const encapsulated = this.crypto.encapsulateS0(
			payload,
			1,
			destination,
			senderNonce,
			nonce.payload,
			false
		);
		await this.host.zwSendData(destination, encapsulated);
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
		await this.host.zwSendData(
			node,
			Buffer.from([
				CommandClasses.COMMAND_CLASS_SWITCH_MULTILEVEL,
				0x01 /* SET */,
				level,
			])
		);
	}

	async _setBasic(node: number, on: boolean): Promise<void> {
		await this.host.zwSendData(
			node,
			Buffer.from([
				CommandClasses.COMMAND_CLASS_BASIC,
				0x01 /* SET */,
				on ? 0xff : 0x00,
			])
		);
	}
}
