/* eslint-disable @typescript-eslint/naming-convention */ // TODO Just change the naming of the enum members, below?

/**
 * List of Serial API command / response codes.
 */
export enum SerialApiCommandCode {
	SERIAL_API_GET_INIT_DATA = 0x02,
	SERIAL_API_APPL_NODE_INFORMATION = 0x03,
	APPLICATION_COMMAND_HANDLER = 0x04,
	ZW_GET_CONTROLLER_CAPABILITIES = 0x05,
	SERIAL_API_SET_TIMEOUTS = 0x06,
	SERIAL_API_GET_CAPABILITIES = 0x07,
	SERIAL_API_SOFT_RESET = 0x08,
	SERIAL_API_STARTED = 0x0a,
	ZW_SEND_NODE_INFORMATION = 0x12,
	ZW_SEND_DATA = 0x13,
	ZW_GET_VERSION = 0x15,
	ZW_SEND_DATA_ABORT = 0x16,
	ZW_R_F_POWER_LEVEL_SET = 0x17,
	ZW_GET_RANDOM = 0x1c,
	ZW_MEMORY_GET_ID = 0x20,
	MEMORY_GET_BYTE = 0x21,
	ZW_READ_MEMORY = 0x23,
	ZW_SET_LEARN_NODE_STATE = 0x40,
	ZW_GET_NODE_PROTOCOL_INFO = 0x41,
	ZW_SET_DEFAULT = 0x42,
	ZW_NEW_CONTROLLER = 0x43,
	ZW_REPLICATION_COMMAND_COMPLETE = 0x44,
	ZW_REPLICATION_SEND_DATA = 0x45,

	/**
	 * Assigns 4 controller computed routes between 2 nodes.
	 */
	ZW_ASSIGN_RETURN_ROUTE = 0x46,

	ZW_DELETE_RETURN_ROUTE = 0x47,
	ZW_REQUEST_NODE_NEIGHBOR_UPDATE = 0x48,
	ZW_APPLICATION_UPDATE = 0x49,
	ZW_ADD_NODE_TO_NETWORK = 0x4a,
	ZW_REMOVE_NODE_FROM_NETWORK = 0x4b,
	ZW_CREATE_NEW_PRIMARY = 0x4c,
	ZW_CONTROLLER_CHANGE = 0x4d,

	/**
	 * Assigns an Application Priority Route between 2 nodes.
	 *
	 * Will always be used first, before any other stored routes.
	 * Should never automatically be emitted by the app, only on user request.
	 * Should mostly/only be used to force nodes close to each other to try
	 * direct communication first. Set to all-zeroes in that case.
	 */
	ZW_ASSIGN_PRIORITY_ROUTE = 0x4f,

	ZW_SET_LEARN_MODE = 0x50,

	/**
	 * Assigns 4 controller computed routes from the end node to the controller.
	 *
	 * Shorthand for ZW_ASSIGN_RETURN_ROUTE, using SUC's node ID as destination node,
	 * which is in most cases the Primary Controller.
	 */
	ZW_ASSIGN_SUC_RETURN_ROUTE = 0x51,

	ZW_ENABLE_SUC = 0x52,
	ZW_REQUEST_NETWORK_UPDATE = 0x53,
	ZW_SET_SUC_NODE_ID = 0x54,
	ZW_DELETE_SUC_RETURN_ROUTE = 0x55,
	ZW_GET_SUC_NODE_ID = 0x56,

	/**
	 * Assigns an Application Priority Route from the controller to an end node.
	 *
	 * Shorthand for ZW_ASSIGN_PRIORITY_ROUTE, using SUC's node ID as destination node,
	 * which is in most cases the Primary Controller.
	 */
	ZW_ASSIGN_PRIORITY_SUC_RETURN_ROUTE = 0x58,

	ZW_REQUEST_NODE_NEIGHBOR_UPDATE_OPTIONS = 0x5a,
	ZW_EXPLORE_REQUEST_INCLUSION = 0x5e,
	ZW_REQUEST_NODE_INFO = 0x60,
	ZW_REMOVE_FAILED_NODE_ID = 0x61,
	ZW_IS_FAILED_NODE_ID = 0x62,
	ZW_REPLACE_FAILED_NODE = 0x63,
	ZW_GET_ROUTING_INFO = 0x80,

	/**
	 * Get Application Priority Route from the controller to a node.
	 *
	 * Returns LWR if no route was set yet.
	 */
	ZW_GET_PRIORITY_ROUTE = 0x92,

	/**
	 * Assigns an Application Priority Route from the controller to a node.
	 *
	 * Should never automatically be emitted by the app, only on user request.
	 * Should mostly/only be used to force nodes close to the controller to try
	 * direct communication first. Set to all-zeroes in that case.
	 */
	ZW_SET_PRIORITY_ROUTE = 0x93,

	SERIAL_API_SLAVE_NODE_INFO = 0xa0,
	APPLICATION_SLAVE_COMMAND_HANDLER = 0xa1,
	ZW_SEND_SLAVE_NODE_INFO = 0xa2,
	ZW_SEND_SLAVE_DATA = 0xa3,
	ZW_SET_SLAVE_LEARN_MODE = 0xa4,
	ZW_GET_VIRTUAL_NODES = 0xa5,
	ZW_IS_VIRTUAL_NODE = 0xa6,
	BRIDGE_APPLICATION_COMMAND_HANDLER = 0xa8,
	ZW_WATCHDOG_ENABLE = 0xb6,
	ZW_WATCHDOG_DISABLE = 0xb7,
	ZW_WATCHDOG_KICK = 0xb8,
	ZW_SET_PROMISCUOUS_MODE = 0xd0,
	PROMISCUOUS_APPLICATION_COMMAND_HANDLER = 0xd1,
}

export function serialApiCommandToString(x: number): string {
	if (typeof x !== "number") {
		return `<invalid SerialAPICommand '${x}'>`;
	}
	if (x in SerialApiCommandCode) {
		return SerialApiCommandCode[x];
	}
	return `UNKNOWN_CMD_0x${x.toString(16)}`;
}
