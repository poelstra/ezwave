import { SerialApi } from "@ezwave/serialapi";
import { ZwLibraryType } from "@ezwave/serialapi/lib/commands/types";
import { toHex } from "@ezwave/shared";
import { IZwaveHost } from "./IZwaveHost";

export type HostFactory = (
	homeId: number,
	nodeId: number,
	type: ZwLibraryType
) => IZwaveHost | Promise<IZwaveHost>;

/**
 * Map connected and initialized Serial API devices to existing
 * controllers, or create new ones on the fly.
 *
 * This ensures:
 * - that multiple controllers are simultaneously supported (with different
 *   home IDs, or even with the same home ID but different node IDs), and
 * - serial devices can be removed and plugged back in (e.g. Aeon Labs Z-Stick)
 * - that even if the corresponding serial device is (temporarily) absent,
 *   other components can still query status, enqueue configuration changes,
 *   etc.
 *
 * The switchboard is agnostic to the type of serial device, it is up to the
 * hostFactory to provide a suitable implementation that type of serial device.
 */
export class SwitchBoard {
	private _hostFactory: HostFactory;
	private _hosts = new Map<string, IZwaveHost>();

	constructor(hostFactory: HostFactory) {
		this._hostFactory = hostFactory;
	}

	public addHost(host: IZwaveHost): void {
		const key = homeAndIdToKey(host.homeId, host.nodeId);
		if (this._hosts.has(key)) {
			throw new Error(`host for ${key} already exists`);
		}
		this._hosts.set(key, host);
	}

	public async addDevice(serialApi: SerialApi): Promise<void> {
		const { homeId, nodeId } = serialApi.getHomeAndNodeId();
		const type = serialApi.getLibraryType();
		const key = homeAndIdToKey(homeId, nodeId);

		let host = this._hosts.get(key);
		if (!host) {
			host = await this._hostFactory(homeId, nodeId, type);
			if (host.homeId !== homeId || host.nodeId !== nodeId) {
				throw new Error(
					"invalid host created by factory: home/node ID mismatch"
				);
			}
			this._hosts.set(key, host);
		}
		await host.assignSerialApi(serialApi);
	}
}

function homeAndIdToKey(homeId: number, nodeId: number): string {
	return `${toHex(homeId, 8)}.${nodeId}`;
}
