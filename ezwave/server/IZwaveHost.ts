import { SerialApi } from "../serialapi/serialapi";

/**
 * SwitchBoard interface to represent any host that
 * can talk to a Z-Wave serial API device, such as Controller.
 */
export interface IZwaveHost {
	readonly homeId: number;
	readonly nodeId: number;

	assignSerialApi(serialApi: SerialApi): void | Promise<void>;
}
