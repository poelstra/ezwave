import main from "async-main";
import * as SerialPort from "serialport";
import "source-map-support/register";
import { Duplex } from "stream";
import { delay } from "../common/util";
import { CryptoManager } from "../security/cryptoManager";
import { NonceStore } from "../security/nonceStore";
import { Framer } from "../serialapi/framer";
import { Protocol } from "../serialapi/protocol";
import { SerialApi } from "../serialapi/serialapi";
import { Controller } from "../server/controller";
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

interface Config {
	serial?: string;
	mhub: {
		url: string;
		user: string;
		pass: string;
	};
}

main(async () => {
	prefixTimestamp(console, "log");
	prefixTimestamp(console, "info");
	prefixTimestamp(console, "warn");
	prefixTimestamp(console, "error");

	console.log("Reading configuration...");

	const config = require("../../config.json") as Config;
	const networkKey = require("../../networkkey.json") as string;

	const getFramer = async () => {
		console.log("Connecting to Z-Wave controller...");
		// if (!config.serial) {
		// 	throw new Error(
		// 		"missing serial port in config, please set `serial` property in `config.json`"
		// 	);
		// }
		let port: Duplex | undefined;
		let shownWarning = false;
		while (!port) {
			try {
				port = await open(config.serial);
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
		return new Framer(port);
	};
	const framer = await getFramer();
	const protocol = new Protocol(framer);
	protocol.on("close", () => {
		console.log("Protocol closed, shutting down...");
		process.exit(0);
	});
	await protocol.hardResetted();
	const host = new SerialApi(protocol);

	const nonceStore = new NonceStore();
	const crypto = new CryptoManager(Buffer.from(networkKey, "hex"));
	const controller = new Controller(host, crypto, nonceStore);
	const home = new Home(controller);

	const mhub = new Hub(config.mhub.url, config.mhub.user, config.mhub.pass);
	const homeHub = new HomeHub(home, mhub, controller);
	void homeHub;

	main(() => mhub.run());
	await host.init();

	console.log("initialized");

	//await dumpMultiInstanceInfo(host, HomeDevices.KeukenKoelkast);
	console.log("aanrecht =", await home.getKeukenAanrecht());

	// SDS13783-14 - Encapsulation order overview
	// 1. Encapsulated Command Class (payload), .e.g Basic Set
	// 2. Multi Command
	// 3. Supervision
	// 4. Multi Channel
	// 5. Any one of the following combinations:
	//    a. Security (S0 or S2) followed by transport service
	//    b. Transport Service
	//    c. Security (S0 or S2)
	//    d. CRC16

	// Wait forever
	console.log("---- DONE");

	// await protocol.softReset();

	// console.log("---- RESETTED");

	await new Promise(() => {});
	console.log("wait returned?!");
});
