import main from "async-main";
import * as SerialPort from "serialport";
import "source-map-support/register";
import { Duplex } from "stream";
import CommandClasses from "../generated/CommandClasses";
import {
	BasicDeviceClassEnum,
	GenericDeviceClassEnum,
} from "../generated/ZwaveCmdClassV1";
import { Framer } from "../serialapi/framer";
import { Protocol } from "../serialapi/protocol";
import { parseCommandClasses } from "./commandClassInfo";
import { Controller } from "./controller";
import { CryptoManager, NonceStore } from "./crypto";
import { Home } from "./home";
import { HomeHub } from "./homehub";
import { SerialApi } from "../serialapi/serialapi";
import { Hub } from "./hub";
import { promisify } from "util";

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

async function dumpMultiInstanceInfo(
	host: SerialApi,
	node: number
): Promise<void> {
	// Fetch number of endpoints
	await host.zwSendData(
		node,
		Buffer.from([
			CommandClasses.COMMAND_CLASS_MULTI_CHANNEL,
			7 /*  MULTI_CHANNEL_END_POINT_GET */,
		])
	);
	const report = await host.waitFor(
		1000 /* TODO what should this timeout be? */,
		(event) =>
			event.sourceNode === node &&
			event.commandClass === CommandClasses.COMMAND_CLASS_MULTI_CHANNEL &&
			event.command === 8 /* MULTI_CHANNEL_END_POINT_REPORT */
	);
	const individualEndPoints = report.payload[1] & 127;

	// Fetch generic command device class, specific device class and list of command classes for each endpoint
	for (let i = 1; i <= individualEndPoints; i++) {
		await host.zwSendData(
			node,
			Buffer.from([
				CommandClasses.COMMAND_CLASS_MULTI_CHANNEL,
				0x09 /* MULTI_CHANNEL_CAPABILITY_GET */,
				i,
			])
		);
		const capReport = await host.waitFor(
			1000 /* TODO what should this timeout be? */,
			(event) =>
				event.sourceNode === node &&
				event.commandClass ===
					CommandClasses.COMMAND_CLASS_MULTI_CHANNEL &&
				event.command === 10 /* MULTI_CHANNEL_CAPABILITY_REPORT */ &&
				(event.payload[0] & 127) === i
		);
		const endpoint = capReport.payload[0] & 127;
		const genericClass = capReport.payload[1];
		const specificClass = capReport.payload[2];
		const classes = parseCommandClasses(capReport.payload.slice(3));
		console.log(
			"Endpoint",
			`index=${endpoint}`,
			`genericClass=${GenericDeviceClassEnum[genericClass]}`,
			`specificClass=${specificClass}`,
			`supported=${classes.supported
				.map((c) => CommandClasses[c].slice("COMMAND_CLASS_".length))
				.join(",")}`,
			`controlled=${classes.controlled
				.map((c) => CommandClasses[c].slice("COMMAND_CLASS_".length))
				.join(",")}`
		);
	}
}

async function dumpNodeInfo(host: SerialApi, node: number): Promise<void> {
	const nodeInfo = await host.zwRequestNodeInfo(node);
	console.log(
		"NodeInfo",
		`node=${nodeInfo.nodeId}`,
		`basicClass=${BasicDeviceClassEnum[nodeInfo.basicClass]}`,
		`genericClass=${GenericDeviceClassEnum[nodeInfo.genericClass]}`,
		`specificClass=${nodeInfo.specificClass}`,
		`supported=${nodeInfo.commandClasses.supported
			.map((c) => CommandClasses[c].slice("COMMAND_CLASS_".length))
			.join(",")}`,
		`controlled=${nodeInfo.commandClasses.controlled
			.map((c) => CommandClasses[c].slice("COMMAND_CLASS_".length))
			.join(",")}`
	);
}

function prefixTimestamp(console: Console, method: keyof Console): void {
	const origMethod = console[method];
	console[method] = function (this: any, ...args: any[]) {
		args.unshift(`[${new Date().toISOString()}] [${method}]`);
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

	let port: Duplex | undefined;
	const getFramer = async () => {
		console.log("Connecting to Z-Wave controller...");
		// if (!config.serial) {
		// 	throw new Error(
		// 		"missing serial port in config, please set `serial` property in `config.json`"
		// 	);
		// }
		port = await open(config.serial);
		port.on("close", () => console.log("port closed"));
		console.log("port opened");
		return new Framer(port);
	};
	const framer = await getFramer();
	const protocol = new Protocol(framer);
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
	await new Promise(() => {});
	console.log("wait returned?!");
});
