/**
 * This demo currently provides a single monolithic process
 * that makes the Z-Wave stick(s) available with automatic
 * reconnect handling, and currently implements the specific
 * control that I need in my home. This should of course be
 * split off to a separate process in the future.
 */

// TODO Extract more logic into reusable @ezwave packages

import {
	Controller,
	DeviceCache,
	SimpleFileStorage,
	SwitchBoard,
	ThrottledStorage,
} from "@ezwave/controller";
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
import { readFile } from "fs/promises";
import * as path from "path";
import SerialPort from "serialport";
import "source-map-support/register";
import { ControllerIds, Home } from "./home";
import {
	HomeHub,
	NetworkMapping,
	NetworkMappings,
	NodeMapping,
} from "./homehub";
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
	// TODO Move to NetworkConfig
	networkKey: number[] | string;
}

interface NetworkConfig {
	/**
	 * Home ID of network.
	 */
	homeId: number;

	/**
	 * Network name.
	 *
	 * If not given, its homeId is used instead, formatted as an 8-digit hexadecimal
	 * number.
	 * Note: the controller device itself can be given an explicit name by listing
	 * its nodeId in `devices`.
	 */
	name: string;

	/**
	 * Specify specific info about each device.
	 *
	 * Devices not specified in the list, but available in the controller(s)
	 * will use default values.
	 */
	nodes: NodeConfig[];
}

interface NodeConfig {
	/**
	 * Node ID of ZWave node.
	 */
	nodeId: number;

	/**
	 * Name of device on message bus.
	 *
	 * The default device name is <controller_name_or_id>:<device_id>,
	 * where device_id is a 2-digit hex number without '0x' prefix.
	 */
	name: string;
}

interface Config {
	/**
	 * Serial port configuration.
	 *
	 * Determines which serial devices (ports) will be considered for
	 * opening to see whether they are in fact a ZWave SerialAPI device.
	 */
	serial?: SerialPortScannerOptions;

	/**
	 * ZWave Serial API hosts (aka controllers) configuration.
	 */
	hosts?: HostConfig[];

	/**
	 * Network configuration.
	 *
	 * Multiple networks can be active at the same time, each with
	 * at least one controller.
	 */
	networks: NetworkConfig[];

	/**
	 * Folder to store persistent information about controllers and
	 * devices. Path is given relative to folder of configuration file.
	 *
	 * Default is "./cache".
	 */
	cacheDir?: string;

	/**
	 * MHub message bus configuration.
	 */
	mhub?: {
		url: string;
		user: string;
		pass: string;
	};
}

async function serialApiFromPort(port: SerialPort): Promise<SerialApi> {
	const framer = new Framer(port);
	const protocol = new Protocol(framer);
	// Reset port once we detect it's stuck
	protocol.on("stuck", () => protocol.softReset());
	// We're working with a USB port, which is hard-resetted
	await protocol.hardResetted();
	const serialApi = await SerialApi.create(protocol);
	serialApi.on("error", (_err) => {
		// Apparently, calling destroy() isn't properly implemented
		// in node-serialport: it says it closes, but actually doesn't.
		// So use 'normal' close instead for now.
		//port.destroy();
		port.close();
	});
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

	Error.stackTraceLimit = 100;
	process.on("uncaughtException", (err, origin) => {
		console.error(`FATAL ERROR ${origin}:`, err);
		process.exit(1);
	});
}

void main(async () => {
	prepEnvironment();

	if (!process.env.DEBUG) {
		console.info(
			"Tip: use `DEBUG=zwave:*` to enable verbose debug info, or e.g. `DEBUG=zwave:*,-zwave:framer:data` for less detail."
		);
	}

	// Parse configuration
	const configPath =
		process.argv[2] ?? path.resolve(__dirname, "../config.json");
	console.log(`Reading configuration from ${configPath}`);
	const config = JSON.parse(await readFile(configPath, "utf8")) as Config;
	const configFolder = path.dirname(configPath);
	const cacheRoot = path.resolve(configFolder, config.cacheDir ?? "./cache");

	const networkMappings: NetworkMappings = {};
	for (const networkConfig of config.networks ?? []) {
		if (!networkConfig.homeId) {
			throw new Error("missing 'homeId' in networkConfig");
		}
		const networkMapping: NetworkMapping = {
			name: networkConfig.name ?? toHex(networkConfig.homeId, 8),
			nodes: {},
		};
		networkMappings[networkConfig.homeId] = networkMapping;
		for (const nodeConfig of networkConfig.nodes) {
			const nodeMapping: NodeMapping = {
				name:
					nodeConfig.name ??
					`${networkMapping.name}.${toHex(nodeConfig.nodeId, 2)}`,
			};
			networkMapping.nodes[nodeConfig.nodeId] = nodeMapping;
		}
	}

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

	// Auto-create host once corresponding serial
	// device gets connected.
	const hostFactory = async (
		homeId: number,
		nodeId: number,
		type: ZwLibraryType
	): Promise<Controller> => {
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
				`unknown/new controller homeId=0x${toHex(
					homeId,
					8
				)} (${homeId}), nodeId=${nodeId}, type=${typeStr}`
			);
			console.warn(
				`Generated new (random) network key. To keep using this device, please add the following snippet to your config's "hosts" section:\n${JSON.stringify(
					hostConfig,
					undefined,
					"    "
				)}`
			);
		}
		const networkKey =
			typeof hostConfig.networkKey === "string"
				? Buffer.from(hostConfig.networkKey, "hex")
				: Buffer.from(hostConfig.networkKey);

		const nonceStore = new NonceStore();
		const crypto = new CryptoManager(networkKey);

		if (
			!(
				type === ZwLibraryType.StaticController ||
				type === ZwLibraryType.BridgeController
			)
		) {
			throw new Error(
				`only static and bridge controllers are supported, connected device is ${typeStr}`
			);
		}

		const controllerCacheRoot = path.resolve(
			cacheRoot,
			`${toHex(homeId, 8)}`
		);
		const fileStorage = new SimpleFileStorage(controllerCacheRoot);
		await fileStorage.init();
		const throttledStorage = new ThrottledStorage(fileStorage, 1000);
		const deviceCache = new DeviceCache(throttledStorage);
		const controller = new Controller(
			homeId,
			nodeId,
			crypto,
			nonceStore,
			deviceCache
		);
		return controller;
	};

	// Instantiate all controllers from configuration file
	const controllers = await Promise.all(
		config.hosts?.map((hostConfig) =>
			hostFactory(
				hostConfig.homeId,
				hostConfig.nodeId,
				ZwLibraryType[hostConfig.type]
			)
		) ?? []
	);

	// My specific home only has one Z-Wave controller, which
	// is the first entry in the config. So use that.
	// TODO: This stuff should move to a separate process that talks
	// to the server using MHub/MQTT/REST/etc. (and then no longer only
	// make things work on my specific home ID...)
	const martinsMainController = controllers.find(
		(controller) => controller.homeId === ControllerIds.MainController
	);
	const home = martinsMainController
		? new Home(martinsMainController)
		: undefined;

	// I have an additional 'development dongle'
	const martinsDevController = controllers.find(
		(controller) => controller.homeId === ControllerIds.DevController
	);
	if (martinsDevController) {
		// This is mainly for sending one-off initialization commands, and
		// should be removed some day.
		martinsDevController.once("ready", async () => {
			try {
				console.log(`Initializing DevController...`);
				// await setupThermostat(DevHomeDevices.Thermostat1);
				// await setupAerQ(HomeDevices.AerQ1, [ep(HomeDevices.Thermostat1)]);
				console.log(`Initializing DevController done`);
			} catch (err) {
				// Don't close/detach controller, keep running to handle any other commands.
				console.warn("Initialization failed", err);
			}
		});
	}

	if (home && mhub && martinsMainController && martinsDevController) {
		await HomeHub.create(
			home,
			martinsMainController,
			mhub,
			[martinsMainController, martinsDevController],
			networkMappings
		);
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
