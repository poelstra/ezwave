import "source-map-support/register";

import * as SerialPort from "serialport";
import main from "async-main";
import * as stream from "stream";
import { EventEmitter } from "events";
import {
	FrameType,
	Codec,
	Packet,
	LineError,
	DataType,
	DataPacket,
	SerialAPICommand,
	packetToString,
} from "./codec";
import { delay } from "./util";
import { Protocol } from "./protocol";
import { Host, Command } from "./host";

const SUPPORTED_USB_IDS = [
	"0658:0200", // Sigma Designs, Inc. Aeotec Z-Stick Gen5 (ZW090) - UZB
];

async function open(): Promise<SerialPort> {
	const ports = await SerialPort.list();
	const zwaveSticks = ports.filter(port =>
		SUPPORTED_USB_IDS.some(
			id => id === `${port.vendorId}:${port.productId}`
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
			err => (err ? reject(err) : resolve(port))
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

main(async () => {
	const port = await open();
	port.on("close", () => console.log("port closed"));
	console.log("open");

	await delay(500); // INS12350 6.1.1 With hard reset

	const codec = new Codec(port);
	const protocol = new Protocol(codec);
	const host = new Host(protocol);

	await host.init();
	host.on("event", event => console.log(event));

	const COMMAND_CLASS_BASIC = 0x20;
	const COMMAND_CLASS_BINARY = 0x25;
	const SET = 0x01;
	const GET = 0x02;
	const REPORT = 0x03;

	console.log("initialized");
	await host.zwSendData(22, Buffer.from([COMMAND_CLASS_BINARY, GET]));

	/*console.log("----");
	await delay(1000);
	console.log("----");

	await host.zwSendData(22, Buffer.from([COMMAND_CLASS_BINARY, SET, 0x00]));
	await delay(1000);
	await host.zwSendData(22, Buffer.from([COMMAND_CLASS_BINARY, SET, 0xff]));*/

	// Wait forever
	await new Promise(() => {});
});
