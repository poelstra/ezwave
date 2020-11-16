import main from "async-main";
import * as SerialPort from "serialport";
import "source-map-support/register";
import { bufferToString } from "../common/util";
import CommandClasses from "../generated/CommandClasses";
import {
	BasicDeviceClassEnum,
	GenericDeviceClassEnum,
} from "../generated/ZwaveCmdClassV1";
import { Codec } from "../serial/codec";
import { Protocol } from "../serial/protocol";
import { parseCommandClasses } from "./command";
import { CryptoManager, NonceStore } from "./crypto";
import { Home } from "./home";
import { HomeHub } from "./homehub";
import { Host, HostEvent } from "./host";
import { Hub } from "./hub";

const SUPPORTED_USB_IDS = [
	"0658:0200", // Sigma Designs, Inc. Aeotec Z-Stick Gen5 (ZW090) - UZB
];

async function open(): Promise<SerialPort> {
	const ports = await SerialPort.list();
	const zwaveSticks = ports.filter((port) =>
		SUPPORTED_USB_IDS.some(
			(id) => id === `${port.vendorId}:${port.productId}`
		)
	);
	if (zwaveSticks.length === 0) {
		throw new Error("no supported Z-Wave controller found");
	}
	const portName = zwaveSticks[0].comName; // TODO support multiple sticks?
	return new Promise<SerialPort>((resolve, reject) => {
		const port: SerialPort = new SerialPort(
			portName,
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

interface CommandClassFrame {
	cmdClass: CommandClass;
}

interface CommandClassCommandFrame extends CommandClassFrame {
	cmd: number;
}

interface SwitchBinary_Set_v1 extends CommandClassCommandFrame {
	cmdClass: CommandClass.SwitchBinary;
	cmd: SwitchBinaryCommand.Set;
	switchValue: number;
}

enum SwitchBinaryCommand {
	Get,
	Set,
	Report,
}

enum CommandClass {
	Basic = 0x20,
	SwitchBinary = 0x25,
}

export class Client {
	protected _host: Host;

	constructor(host: Host) {
		this._host = host;
	}
}

async function dumpMultiInstanceInfo(host: Host, node: number): Promise<void> {
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

async function dumpNodeInfo(host: Host, node: number): Promise<void> {
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

	const config = require("../../config.json") as Config;
	const networkKey = require("../../networkkey.json") as string;

	let port: SerialPort | undefined;
	const getCodec = async () => {
		console.log("connecting to Z-Wave controller...");
		port = await open();
		port.on("close", () => console.log("port closed"));
		console.log("port opened");
		return new Codec(port);
	};
	const protocol = new Protocol(await getCodec(), getCodec);
	const host = new Host(protocol);

	const nonceStore = new NonceStore();
	const crypto = new CryptoManager(Buffer.from(networkKey, "hex"));
	const home = new Home(host, crypto, nonceStore);

	const mhub = new Hub(config.mhub.url, config.mhub.user, config.mhub.pass);
	const homeHub = new HomeHub(home, mhub);

	function handleSecurityNonceGet(event: HostEvent): void {
		if (nonceStore.canGenerateNonce()) {
			const nonce = nonceStore.generate(event.sourceNode);
			console.log(
				`-> received COMMAND_CLASS_SECURITY:SECURITY_NONCE_GET, sending SECURITY_NONCE_REPORT nonce=[${bufferToString(
					nonce.data
				)}]`
			);
			host.zwSendData(
				event.sourceNode,
				Buffer.from([
					CommandClasses.COMMAND_CLASS_SECURITY,
					0x80 /* SECURITY_NONCE_REPORT */,
					...nonce.data,
				])
			);
		} else {
			console.log(
				`-> received COMMAND_CLASS_SECURITY:SECURITY_NONCE_GET, but nonce store is full, ignoring request`
			);
		}
	}

	host.on("event", (event: HostEvent) => {
		console.log(
			`EVENT fromNode=${event.sourceNode} cmdClass=${
				CommandClasses[event.commandClass]
			} cmd=${event.command} payload=[${bufferToString(event.payload)}]`
		);
		if (
			event.commandClass === CommandClasses.COMMAND_CLASS_SECURITY &&
			event.command === 0x40 /* SECURITY_NONCE_GET */
		) {
			handleSecurityNonceGet(event);
		}
		if (
			event.commandClass === CommandClasses.COMMAND_CLASS_SECURITY &&
			(event.command ===
				0xc0 /* SECURITY_MESSAGE_ENCAPSULATION_NONCE_GET */ ||
				event.command === 0x81) /* SECURITY_MESSAGE_ENCAPSULATION */
		) {
			const decoded = crypto.decapsulateS0(
				Buffer.from([
					event.commandClass,
					event.command,
					...event.payload,
				]),
				event.sourceNode,
				1,
				(id) => nonceStore.getAndRelease(id)?.data
			);
			const isSimpleClass = decoded[0] <= 0xf0;
			const decodedClass = isSimpleClass
				? decoded[0]
				: decoded.readUInt16BE(0);
			const decodedEvent: HostEvent = {
				sourceNode: event.sourceNode,
				commandClass: decodedClass,
				command: isSimpleClass ? decoded[1] : decoded[2],
				payload: decoded.slice(isSimpleClass ? 2 : 3),
				rxStatus: event.rxStatus,
			};
			// TODO Don't fake a host event, needs to be replaced with proper security layer
			console.log("-> re-emitting decoded event");
			host.emit("event", decodedEvent);
		}
	});

	main(() => mhub.run());
	await host.init();

	console.log("initialized");

	//await dumpMultiInstanceInfo(host, HomeDevices.KeukenKoelkast);
	await home.getKeukenAanrecht();

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
