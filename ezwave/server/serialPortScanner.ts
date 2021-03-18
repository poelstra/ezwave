/**
 * Proof of concept Serial Port scanner.
 *
 * Continuously scans for serial ports, opens new ones and hands
 * them off to whoever needs them.
 */

import debug from "debug";
import { promises as pfs } from "fs";
import * as SerialPort from "serialport";
import { Duplex } from "stream";
import { InterruptibleSleep } from "../common/util";

const log = debug("zwave:serialportscanner");

export const DEFAULT_SUPPORTED_ZWAVE_USB_IDS = [
	"10c4:ea60", // Aeotec Z-Stick Gen2
	"0658:0200", // Sigma Designs, Inc. Aeotec Z-Stick Gen5 (ZW090) - UZB
];

export interface SerialPortScannerOptions {
	/**
	 * List of strings to match against either USB vendor/product ID (lowercase),
	 * and/or full path of serial port device.
	 *
	 * Uses udev to scan.
	 *
	 * @example `["0658:0200"]`.
	 * @see DEFAULT_SUPPORTED_ZWAVE_USB_IDS
	 */
	matches?: string[];

	/**
	 * List of full serial port paths.
	 *
	 * These can be symlinks to actual serial devices.
	 *
	 * @example `["/dev/serial/by-id/usb-0658_0200-if00"]`.
	 */
	ports?: string[];

	/**
	 * Scan interval in milliseconds.
	 *
	 * Used when the expected number of devices is lower than the actual
	 * number of connected devices.
	 */
	scanInterval?: number;

	/**
	 * Idle scan interval in milliseconds.
	 *
	 * Used when the expected number of devices is connected.
	 * Typically (much) higher than the `scanInterval`.
	 */
	idleScanInterval?: number;

	/**
	 * Expected number of connected serial ports.
	 */
	expectedPorts?: number;
}

export const DEFAULT_SERIAL_PORT_SCANNER_OPTIONS: Required<SerialPortScannerOptions> = {
	matches: [],
	ports: [],
	scanInterval: 1000,
	idleScanInterval: 5 * 60 * 1000,
	expectedPorts: 1,
};

/**
 * Continuously scan for possibly useable serial ports and try to open them.
 */
export class SerialPortScanner {
	private _options: Required<SerialPortScannerOptions>;
	private _matches: Set<string>;
	private _onOpen: (duplex: Duplex) => void | Promise<void>;
	private _ports = new Set<string>();

	/**
	 * Create serial port scanner.
	 * @param options Scanner options. At least one matcher and/or one explicit port need to be given.
	 * @param onOpen  Callback called whenever a new device is found and successfully opened.
	 *     Receives the opened duplex stream. If callback returns an error, the port is actively
	 *     closed again, but will be retried on the next scan.
	 */
	constructor(
		options: SerialPortScannerOptions,
		onOpen: (duplex: Duplex) => void | Promise<void>
	) {
		this._options = { ...DEFAULT_SERIAL_PORT_SCANNER_OPTIONS, ...options };
		if (
			this._options.matches.length === 0 &&
			this._options.ports.length === 0
		) {
			throw new Error(
				"invalid options: minimum one port or match filter must be given"
			);
		}
		this._matches = new Set(this._options.matches);
		this._onOpen = onOpen;
	}

	async run(): Promise<never> {
		log(
			`serial port scanner started, scanning for matches=[${[
				...this._options.matches.values(),
			]}], ports=[${this._options.ports}]`
		);

		const sleeper = new InterruptibleSleep();
		while (true) {
			const newPorts = await this._scan();

			for (const comName of newPorts) {
				try {
					log(`found new serial port ${comName}`);
					const port = await this._open(comName);
					log(`serial port ${comName} opened`);
					this._ports.add(comName);
					port.once("close", () => {
						log(`serial port ${comName} closed`);
						this._ports.delete(comName);
						sleeper.interrupt();
					});
					try {
						await this._onOpen(port);
					} catch (err) {
						log(`error initializing serial port ${comName}:`, err);
						this._ports.delete(comName);
						port.destroy();
					}
				} catch (err) {
					log(`error opening serial port ${comName}:`, err);
				}
			}

			// Scanning is fairly expensive (~200ms on my i7 laptop),
			// so lower the scanning interval if possible, but keep responsive
			// if something happens (i.e. existing port closes).
			const interval =
				this._ports.size < this._options.expectedPorts
					? this._options.scanInterval
					: this._options.idleScanInterval;
			await sleeper.sleep(interval);
		}
	}

	private async _scan(): Promise<string[]> {
		// Build a list of all supported ports
		const ports = this._matches.size > 0 ? await SerialPort.list() : [];
		const supportedPorts = ports.filter(
			(port) =>
				(port.pnpId ? this._matches.has(port.pnpId) : false) ||
				this._matches.has(`${port.vendorId}:${port.productId}`)
		);

		// Convert explicitly given port names to actual device names,
		// to prevent the same port from being listed twice under
		// different names. Especially happens if an explicit port is
		// given as a /dev/serial/by-id/* name
		const existingPorts: string[] = [];
		for (const port of this._options.ports) {
			try {
				existingPorts.push(await pfs.realpath(port));
			} catch {}
		}

		const foundPortNames = new Set([
			...existingPorts,
			...supportedPorts.map((port) => port.path),
		]);

		// Remove ports that no longer exist, just in case
		for (const comName of this._ports) {
			if (!foundPortNames.has(comName)) {
				this._ports.delete(comName);
			}
		}

		// Filter out entries that are already open
		const newPorts = [...foundPortNames.values()].filter(
			(path) => !this._ports.has(path)
		);
		return newPorts;
	}

	private async _open(comName: string): Promise<SerialPort> {
		return new Promise<SerialPort>((resolve, reject) => {
			const port: SerialPort = new SerialPort(
				comName,
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
}
