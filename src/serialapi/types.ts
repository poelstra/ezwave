export enum ZwLibraryType {
	StaticController = 0x01,
	Controller = 0x02,
	EnhancedSlave = 0x03,
	Slave = 0x04,
	Installer = 0x05,
	RoutingSlave = 0x06,
	BridgeController = 0x07,
	Dut = 0x08,
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
