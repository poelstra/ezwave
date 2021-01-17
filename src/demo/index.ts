import main from "async-main";
import { randomBytes } from "crypto";
import { once } from "events";
import * as SerialPort from "serialport";
import "source-map-support/register";
import { Duplex } from "stream";
import { delay, toHex } from "../common/util";
import { CryptoManager } from "../security/cryptoManager";
import { NonceStore } from "../security/nonceStore";
import { Framer } from "../serialapi/framer";
import { Protocol } from "../serialapi/protocol";
import { SerialApi, ZwLibraryType } from "../serialapi/serialapi";
import { Controller } from "../server/controller";
import { SwitchBoard } from "../server/switchBoard";
import { Home } from "./home";
import { HomeHub } from "./homehub";
import { Hub } from "./hub";

const SUPPORTED_USB_IDS = [
	"0658:0200", // Sigma Designs, Inc. Aeotec Z-Stick Gen5 (ZW090) - UZB
];

async function open(portName?: string): Promise<SerialPort> {
	if (!portName) {
		const ports = await SerialPort.list();
		const zwaveSticks = ports.filter((port) =>
			SUPPORTED_USB_IDS.some(
				(id) => id === `${port.vendorId}:${port.productId}`
			)
		);
		if (zwaveSticks.length === 0) {
			throw new Error("no supported Z-Wave controller found");
		}
		portName = zwaveSticks[0].comName; // TODO support multiple sticks?
	}
	return new Promise<SerialPort>((resolve, reject) => {
		const port: SerialPort = new SerialPort(
			portName!,
			{
				baudRate: 115200,
				parity: "none",
				dataBits: 8,
				stopBits: 1,
			},
			(err) => (err ? reject(err) : resolve(port))
		);
	});
}

function prefixTimestamp(console: Console, method: keyof Console): void {
	const origMethod = console[method] as (this: any, ...args: any[]) => void;
	console[method] = function (this: any, ...args: any[]) {
		args.unshift(`${new Date().toISOString()} [${method}]`);
		return origMethod.apply(this, args);
	} as any;
}

interface HostConfig {
	homeId: number;
	nodeId: number;
	type: keyof typeof ZwLibraryType;

	/**
	 * 16 bytes as array of 16 numbers, or string of 32 hex chars
	 */
	networkKey: number[] | string;
}

interface Config {
	serial?: string;
	hosts?: HostConfig[];
	mhub: {
		url: string;
		user: string;
		pass: string;
	};
}

async function getSerialApi(
	serialPort: string | undefined
): Promise<SerialApi> {
	console.log("Connecting to Z-Wave device...");
	let port: Duplex | undefined;
	let shownWarning = false;
	while (!port) {
		try {
			port = await open(serialPort);
		} catch (err) {
			if (!shownWarning) {
				console.warn(
					`Error opening Z-Wave port, retrying: ${err.message}`
				);
				shownWarning = true;
			}
			await delay(3000);
		}
	}
	port.on("close", () => console.log("serial port closed"));
	console.log("serial port opened");
	const framer = new Framer(port);
	const protocol = new Protocol(framer);
	await protocol.hardResetted();
	const serialApi = new SerialApi(protocol);
	await serialApi.init();
	return serialApi;
}

main(async () => {
	prefixTimestamp(console, "log");
	prefixTimestamp(console, "info");
	prefixTimestamp(console, "warn");
	prefixTimestamp(console, "error");

	console.log("Reading configuration...");
	const config = require("../../config.json") as Config;

	// if (!config.serial) {
	// 	throw new Error(
	// 		"missing serial port in config, please set `serial` property in `config.json`"
	// 	);
	// }

	// Start connection to MHub
	const mhub = new Hub(config.mhub.url, config.mhub.user, config.mhub.pass);
	main(() => mhub.run());

	// Auto-create host (only static controller, for now) once corresponding serial
	// device gets connected.
	const hostFactory = (
		homeId: number,
		nodeId: number,
		type: ZwLibraryType
	) => {
		const typeStr = ZwLibraryType[type] as keyof typeof ZwLibraryType;
		let hostConfig = config.hosts?.find(
			(entry) =>
				entry.homeId === homeId &&
				entry.nodeId === nodeId &&
				entry.type === typeStr
		);
		if (!hostConfig) {
			hostConfig = {
				homeId,
				nodeId,
				type: typeStr,
				networkKey: randomBytes(16).toString("hex"),
			};
			// TODO Config file should probably be automatically saved, otherwise any secure
			// inclusions performed by this new controller would become unusable after restart,
			// if the user didn't see this message.
			console.warn(
				`unknown homeId / nodeId / type, got homeId=0x${toHex(
					homeId,
					8
				)} (${homeId}), nodeId=${nodeId}, type=${typeStr}, please add and adapt the following configuration:`,
				hostConfig
			);
		}
		const networkKey =
			typeof hostConfig.networkKey === "string"
				? Buffer.from(hostConfig.networkKey, "hex")
				: Buffer.from(hostConfig.networkKey);

		const nonceStore = new NonceStore();
		const crypto = new CryptoManager(networkKey);

		if (type !== ZwLibraryType.StaticController) {
			throw new Error(
				`only static controllers supported for now, connected device is ${typeStr}`
			);
		}
		const controller = new Controller(homeId, nodeId, crypto, nonceStore);
		return controller;
	};

	// Instantiate all controllers from configuration file
	const controllers =
		config.hosts?.map((hostConfig) =>
			hostFactory(
				hostConfig.homeId,
				hostConfig.nodeId,
				ZwLibraryType[hostConfig.type]
			)
		) ?? [];

	// My specific home only has one Z-Wave controller, which
	// is the first entry in the config. So use that.
	if (controllers.length > 0) {
		const myController = controllers[0];
		const home = new Home(myController);
		const homeHub = new HomeHub(home, mhub, myController);
		void homeHub;
	}

	// Add all pre-configured hosts to switchboard
	const switchBoard = new SwitchBoard(hostFactory);
	controllers.forEach((controller) => switchBoard.addHost(controller));

	// Start searching for Serial API devices and connecting them to hosts
	while (true) {
		const serialApi = await getSerialApi(config.serial);
		await switchBoard.addDevice(serialApi);
		await once(serialApi, "close");
	}
});
