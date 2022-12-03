import { CommandClassInfo } from "@ezwave/codec";

export enum ZwLibraryType {
	Na0 = 0x00, // Not applicable
	StaticController = 0x01,
	Controller = 0x02,
	EnhancedSlave = 0x03,
	Slave = 0x04,
	Installer = 0x05,
	RoutingSlave = 0x06,
	BridgeController = 0x07,
	Dut = 0x08, // Device Under Test
	Na1 = 0x09, // Not applicable
	AvRemote = 0x0a,
	AvDevice = 0x0b,
}

export interface HomeAndNodeId {
	/**
	 * 4-byte home ID of chip connected to serial API.
	 */
	homeId: number;

	/**
	 * Z-Wave Node ID [1..232] of chip connected to serial API.
	 */
	nodeId: number;
}

export interface NodeInfoResponse {
	nodeId: number;
	basicClass: number; // TODO BasicDeviceClassEnum
	genericClass: number; // TODO GenericDeviceClassEnum
	specificClass: number; // 'subclass' within GenericDeviceClassEnum
	commandClasses: CommandClassInfo;
}

export enum TxStatus {
	/**
	 * Transmission completed and successful.
	 *
	 * This value is used to indicate that the transmission was
	 * successful, and acknowledged if an acknowledged transmission
	 * was requested.
	 */
	Ok = 0x00,

	/**
	 * Transmission completed but no Acknowledgment.
	 *
	 * This value is used to indicate that the transmission was completed,
	 * but no Acknowledgment has been received from the destination.
	 * The node may be sleeping.
	 */
	NoAck = 0x01,

	/**
	 * Transmission failed.
	 *
	 * This value is used to indicate that the transmission could not be done.
	 * Could be because the network is busy/congested.
	 */
	Fail = 0x02,

	/**
	 * Transmission failed due to routing being locked/busy.
	 */
	NotIdle = 0x03,

	/**
	 * Transmission failed due to routing resolution. This value is used to
	 * indicate that the transmission could not be done due to missing route
	 * or failed route resolution.
	 */
	NoRoute = 0x04,

	/**
	 * Transmission completed and successful, including S2 resynchronization
	 * back-off.
	 *
	 * This value is used to indicate that the transmission was successful,
	 * and acknowledged and that the destination has successfully decrypted
	 * the message.
	 * This status MUST be used only if the Z-Wave module performed Security
	 * encryption.
	 */
	Verified = 0x05,
}
