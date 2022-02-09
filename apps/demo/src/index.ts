/**
 * This demo currently provides a single monolithic process
 * that makes the Z-Wave stick(s) available with automatic
 * reconnect handling, and currently implements the specific
 * control that I need in my home. This should of course be
 * split off to a separate process in the future.
 */

// TODO Extract more logic into reusable @ezwave packages

import { Controller, SwitchBoard } from "@ezwave/controller";
import { CryptoManager, NonceStore } from "@ezwave/security";
import { Framer, Protocol, SerialApi, ZwLibraryType } from "@ezwave/serialapi";
import {
	DEFAULT_SUPPORTED_ZWAVE_USB_IDS,
	SerialPortScanner,
	SerialPortScannerOptions,
} from "@ezwave/serialport";
import { toHex } from "@ezwave/shared";
import main from "async-main";
import { randomBytes } from "crypto";
import * as path from "path";
import "source-map-support/register";
import { Duplex } from "stream";
import { Home } from "./home";
import { HomeHub } from "./homehub";
import { Hub } from "./hub";

function prefixTimestamp(console: Console, method: keyof Console): void {
	const origMethod = console[method] as (
		this: unknown,
		...args: unknown[]
	) => void;
	console[method] = function (this: unknown, ...args: unknown[]) {
		// Don't use e.g. args.unshift, because only the first argument supports printf-formatting
		args[0] = `${new Date().toISOString()} [${method}] ${args[0]}`;
		return origMethod.apply(this, args);
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
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
	serial?: SerialPortScannerOptions;
	hosts?: HostConfig[];
	mhub?: {
		url: string;
		user: string;
		pass: string;
	};
}

async function serialApiFromPort(port: Duplex): Promise<SerialApi> {
	const framer = new Framer(port);
	const protocol = new Protocol(framer);
	// Reset port once we detect it's stuck
	protocol.on("stuck", () => protocol.softReset());
	// We're working with a USB port, which is hard-resetted
	await protocol.hardResetted();
	const serialApi = await SerialApi.create(protocol);
	return serialApi;
}

function prepEnvironment(): void {
	prefixTimestamp(console, "log");
	prefixTimestamp(console, "info");
	prefixTimestamp(console, "warn");
	prefixTimestamp(console, "error");

	// Catch shutdown signals (e.g. when running as a daemon, in Docker, ...)
	const shutdown = (signal: string): void => {
		console.log(`${signal} received, shutting down...`);
		// TODO Clean shutdown of ongoing operations
		console.log("Terminating with exit code 0.");
		process.exit(0);
	};
	process.on("SIGINT", () => shutdown("SIGINT"));
	process.on("SIGTERM", () => shutdown("SIGTERM"));
}

void main(async () => {
	prepEnvironment();

	if (!process.env.DEBUG) {
		console.info(
			"Tip: use `DEBUG=zwave:*` to enable verbose debug info, or e.g. `DEBUG=zwave:*,-zwave:framer:data` for less detail."
		);
	}

	const configPath =
		process.argv[2] ?? path.resolve(__dirname, "../config.json");
	console.log(`Reading configuration from ${configPath}`);
	const config = require(configPath) as Config;

	// Start connection to MHub pubsub daemon
	// TODO Right now this is only used for the 'built-in' HomeHub stuff,
	// see below, but should be adapted later to provide 'raw' access to
	// send/receive things over Z-Wave, and extended with similar API's
	// over MQTT, REST, etc.
	let mhub: Hub | undefined;
	if (config.mhub) {
		mhub = new Hub(config.mhub.url, config.mhub.user, config.mhub.pass);
		void main(() => mhub!.run());
	}

	// Auto-create host (only static controller, for now) once corresponding serial
	// device gets connected.
	const hostFactory = (
		homeId: number,
		nodeId: number,
		type: ZwLibraryType
	): Controller => {
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
	// TODO: This stuff should move to a separate process that talks
	// to the server using MHub/MQTT/REST/etc.
	if (mhub && controllers.length > 0) {
		const myController = controllers[0];
		const home = new Home(myController);
		await HomeHub.create(home, mhub, myController);
	}

	// Add all pre-configured hosts to switchboard
	const switchBoard = new SwitchBoard(hostFactory);
	controllers.forEach((controller) => switchBoard.addHost(controller));

	// Start searching for Serial API devices and connecting them to hosts
	const scannerOptions: SerialPortScannerOptions = {
		expectedPorts: Math.min(controllers.length, 1),
		...config.serial,
	};
	if (
		(!scannerOptions.matches || scannerOptions.matches.length === 0) &&
		(!scannerOptions.ports || scannerOptions.ports.length === 0)
	) {
		scannerOptions.matches = DEFAULT_SUPPORTED_ZWAVE_USB_IDS;
	}
	const scanner = new SerialPortScanner(scannerOptions, async (port) => {
		const serialApi = await serialApiFromPort(port);
		await switchBoard.addDevice(serialApi);
	});
	await scanner.run();
});
