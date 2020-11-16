/* Auto-generated */

export class ZwaveCmdClassV1 {
	public static readonly commandClass = 0x1; // (1);
	public static readonly definition = {"id":1,"name":"ZWAVE_CMD_CLASS","status":"active","version":1,"commands":[{"id":23,"name":"ACCEPT_LOST","status":"active","params":[]},{"id":3,"name":"ASSIGN_ID","status":"active","params":[]},{"id":12,"name":"ASSIGN_RETURN_ROUTE","status":"active","params":[]},{"id":20,"name":"CMD_ASSIGN_SUC_RETURN_ROUTE","status":"active","params":[]},{"id":16,"name":"CMD_AUTOMATIC_CONTROLLER_UPDATE_START","status":"active","params":[]},{"id":31,"name":"CMD_NODES_EXIST","status":"active","params":[]},{"id":32,"name":"CMD_NODES_EXIST_REPLY","status":"active","params":[]},{"id":34,"name":"CMD_SET_NWI_MODE","status":"active","params":[]},{"id":7,"name":"COMMAND_COMPLETE","status":"active","params":[]},{"id":4,"name":"FIND_NODES_IN_RANGE","status":"active","params":[]},{"id":5,"name":"GET_NODES_IN_RANGE","status":"active","params":[]},{"id":22,"name":"LOST","status":"active","params":[]},{"id":13,"name":"NEW_NODE_REGISTERED","status":"active","params":[]},{"id":14,"name":"NEW_RANGE_REGISTERED","status":"active","params":[]},{"id":1,"name":"NODE_INFO","status":"active","params":[{"type":"bitfield","name":"Properties1","length":1,"fields":[{"type":"enum","name":"Protocol Version","mask":7,"shift":0,"values":{"0":"Reserved","1":"Z-Wave Version 2.0","2":"Z-Wave version ZDK 5.0x, ZDK 4.2x","3":"Z-Wave version ZDK 4.5x and ZDK 6.0x","4":"Reserved","5":"Reserved","6":"Reserved","7":"Reserved"}},{"type":"enum","name":"Max baud rate","mask":56,"shift":3,"values":{"0":"Reserved","1":"9.6 kbps","2":"40 kbps"}},{"type":"bool","name":"Routing","mask":64,"shift":6},{"type":"bool","name":"Listening","mask":128,"shift":7}]},{"type":"bitfield","name":"Properties2","length":1,"fields":[{"type":"bool","name":"Security","mask":1,"shift":0},{"type":"bool","name":"Controller","mask":2,"shift":1},{"type":"bool","name":"Specific Device","mask":4,"shift":2},{"type":"bool","name":"Routing Slave","mask":8,"shift":3},{"type":"bool","name":"Beam capability","mask":16,"shift":4},{"type":"bool","name":"Sensor 250ms","mask":32,"shift":5},{"type":"bool","name":"Sensor 1000ms","mask":64,"shift":6},{"type":"bool","name":"Optional Functionality","mask":128,"shift":7}]},{"type":"bitfield","name":"Properties3","length":1,"fields":[{"type":"enum","name":"Speed Extension","mask":7,"shift":0,"values":{"0":"Reserved","1":"100 kbps","2":"200 kbps"}},{"type":"int","name":"Reserved2","mask":248,"shift":3}]},{"type":"enum","name":"Basic Device Class","optional":{"name":"Properties2","mask":2},"length":1,"values":{"1":"BASIC_TYPE_CONTROLLER","2":"BASIC_TYPE_STATIC_CONTROLLER","3":"BASIC_TYPE_SLAVE","4":"BASIC_TYPE_ROUTING_SLAVE"}},{"type":"enum","name":"Generic Device Class","length":1,"valueType":"GEN_DEV_REF","values":{"1":"GENERIC_TYPE_GENERIC_CONTROLLER","2":"GENERIC_TYPE_STATIC_CONTROLLER","3":"GENERIC_TYPE_AV_CONTROL_POINT","4":"GENERIC_TYPE_DISPLAY","5":"GENERIC_TYPE_NETWORK_EXTENDER","6":"GENERIC_TYPE_APPLIANCE","7":"GENERIC_TYPE_SENSOR_NOTIFICATION","8":"GENERIC_TYPE_THERMOSTAT","9":"GENERIC_TYPE_WINDOW_COVERING","15":"GENERIC_TYPE_REPEATER_SLAVE","16":"GENERIC_TYPE_SWITCH_BINARY","17":"GENERIC_TYPE_SWITCH_MULTILEVEL","18":"GENERIC_TYPE_SWITCH_REMOTE","19":"GENERIC_TYPE_SWITCH_TOGGLE","21":"GENERIC_TYPE_ZIP_NODE","22":"GENERIC_TYPE_VENTILATION","23":"GENERIC_TYPE_SECURITY_PANEL","24":"GENERIC_TYPE_WALL_CONTROLLER","32":"GENERIC_TYPE_SENSOR_BINARY","33":"GENERIC_TYPE_SENSOR_MULTILEVEL","48":"GENERIC_TYPE_METER_PULSE","49":"GENERIC_TYPE_METER","64":"GENERIC_TYPE_ENTRY_CONTROL","80":"GENERIC_TYPE_SEMI_INTEROPERABLE","161":"GENERIC_TYPE_SENSOR_ALARM","255":"GENERIC_TYPE_NON_INTEROPERABLE"}},{"type":"enumunion","name":"Specific Device Class","length":1,"reference":{"name":"Generic Device Class"},"valueType":"SPEC_DEV_REF"},{"type":"enumarray","name":"Command Classes","length":"auto","valueType":"CMD_CLASS_REF"}]},{"id":6,"name":"NODE_RANGE_INFO","status":"active","params":[]},{"id":0,"name":"ZWAVE_CMD_NOP","status":"active","params":[]},{"id":24,"name":"CMD_NOP_POWER","status":"active","params":[]},{"id":2,"name":"REQUEST_NODE_INFO","status":"active","params":[]},{"id":25,"name":"ZWAVE_CMD_RESERVE_NODE_IDS","status":"active","params":[]},{"id":26,"name":"CMD_RESERVED_IDS","status":"active","params":[]},{"id":18,"name":"CMD_SET_SUC","status":"active","params":[]},{"id":19,"name":"CMD_SET_SUC_ACK","status":"active","params":[]},{"id":21,"name":"CMD_STATIC_ROUTE_REQUEST","status":"active","params":[]},{"id":17,"name":"CMD_SUC_NODE_ID","status":"active","params":[]},{"id":11,"name":"TRANSFER_END","status":"active","params":[]},{"id":15,"name":"TRANSFER_NEW_PRIMARY_COMPLETE","status":"active","params":[]},{"id":9,"name":"TRANSFER_NODE_INFO","status":"active","params":[]},{"id":8,"name":"TRANSFER_PRESENTATION","status":"active","params":[]},{"id":10,"name":"TRANSFER_RANGE_INFO","status":"active","params":[]},{"id":35,"name":"EXCLUDE_REQUEST","status":"active","params":[]},{"id":36,"name":"ASSIGN_RETURN_ROUTE_PRIORITY","status":"active","params":[]},{"id":37,"name":"ASSIGN_SUC_RETURN_ROUTE_PRIORITY","status":"active","params":[]}]};
}

export interface AcceptLost {
	_commandClass: 0x1; // (1)
	_command: 0x17; // (23)
}

export interface AssignId {
	_commandClass: 0x1; // (1)
	_command: 0x3; // (3)
}

export interface AssignReturnRoute {
	_commandClass: 0x1; // (1)
	_command: 0xc; // (12)
}

export interface CmdAssignSucReturnRoute {
	_commandClass: 0x1; // (1)
	_command: 0x14; // (20)
}

export interface CmdAutomaticControllerUpdateStart {
	_commandClass: 0x1; // (1)
	_command: 0x10; // (16)
}

export interface CmdNodesExist {
	_commandClass: 0x1; // (1)
	_command: 0x1f; // (31)
}

export interface CmdNodesExistReply {
	_commandClass: 0x1; // (1)
	_command: 0x20; // (32)
}

export interface CmdSetNwiMode {
	_commandClass: 0x1; // (1)
	_command: 0x22; // (34)
}

export interface CommandComplete {
	_commandClass: 0x1; // (1)
	_command: 0x7; // (7)
}

export interface FindNodesInRange {
	_commandClass: 0x1; // (1)
	_command: 0x4; // (4)
}

export interface GetNodesInRange {
	_commandClass: 0x1; // (1)
	_command: 0x5; // (5)
}

export interface Lost {
	_commandClass: 0x1; // (1)
	_command: 0x16; // (22)
}

export interface NewNodeRegistered {
	_commandClass: 0x1; // (1)
	_command: 0xd; // (13)
}

export interface NewRangeRegistered {
	_commandClass: 0x1; // (1)
	_command: 0xe; // (14)
}

export interface NodeInfo {
	_commandClass: 0x1; // (1)
	_command: 0x1; // (1)
	// TODO param Properties1 type bitfield
	// TODO param Properties2 type bitfield
	// TODO param Properties3 type bitfield
	basicDeviceClass?: BasicDeviceClassEnum; // 1 byte enum value
	genericDeviceClass: GenericDeviceClassEnum; // 1 byte enum value
	// TODO param Specific Device Class type enumunion
	// TODO param Command Classes type enumarray
}

export interface NodeRangeInfo {
	_commandClass: 0x1; // (1)
	_command: 0x6; // (6)
}

export interface ZwaveCmdNop {
	_commandClass: 0x1; // (1)
	_command: 0x0; // (0)
}

export interface CmdNopPower {
	_commandClass: 0x1; // (1)
	_command: 0x18; // (24)
}

export interface RequestNodeInfo {
	_commandClass: 0x1; // (1)
	_command: 0x2; // (2)
}

export interface ZwaveCmdReserveNodeIds {
	_commandClass: 0x1; // (1)
	_command: 0x19; // (25)
}

export interface CmdReservedIds {
	_commandClass: 0x1; // (1)
	_command: 0x1a; // (26)
}

export interface CmdSetSuc {
	_commandClass: 0x1; // (1)
	_command: 0x12; // (18)
}

export interface CmdSetSucAck {
	_commandClass: 0x1; // (1)
	_command: 0x13; // (19)
}

export interface CmdStaticRouteRequest {
	_commandClass: 0x1; // (1)
	_command: 0x15; // (21)
}

export interface CmdSucNodeId {
	_commandClass: 0x1; // (1)
	_command: 0x11; // (17)
}

export interface TransferEnd {
	_commandClass: 0x1; // (1)
	_command: 0xb; // (11)
}

export interface TransferNewPrimaryComplete {
	_commandClass: 0x1; // (1)
	_command: 0xf; // (15)
}

export interface TransferNodeInfo {
	_commandClass: 0x1; // (1)
	_command: 0x9; // (9)
}

export interface TransferPresentation {
	_commandClass: 0x1; // (1)
	_command: 0x8; // (8)
}

export interface TransferRangeInfo {
	_commandClass: 0x1; // (1)
	_command: 0xa; // (10)
}

export interface ExcludeRequest {
	_commandClass: 0x1; // (1)
	_command: 0x23; // (35)
}

export interface AssignReturnRoutePriority {
	_commandClass: 0x1; // (1)
	_command: 0x24; // (36)
}

export interface AssignSucReturnRoutePriority {
	_commandClass: 0x1; // (1)
	_command: 0x25; // (37)
}

export enum BasicDeviceClassEnum {
	BasicTypeController = 0x1,
	BasicTypeStaticController = 0x2,
	BasicTypeSlave = 0x3,
	BasicTypeRoutingSlave = 0x4,
}

export enum GenericDeviceClassEnum {
	GenericTypeGenericController = 0x1,
	GenericTypeStaticController = 0x2,
	GenericTypeAvControlPoint = 0x3,
	GenericTypeDisplay = 0x4,
	GenericTypeNetworkExtender = 0x5,
	GenericTypeAppliance = 0x6,
	GenericTypeSensorNotification = 0x7,
	GenericTypeThermostat = 0x8,
	GenericTypeWindowCovering = 0x9,
	GenericTypeRepeaterSlave = 0xf,
	GenericTypeSwitchBinary = 0x10,
	GenericTypeSwitchMultilevel = 0x11,
	GenericTypeSwitchRemote = 0x12,
	GenericTypeSwitchToggle = 0x13,
	GenericTypeZipNode = 0x15,
	GenericTypeVentilation = 0x16,
	GenericTypeSecurityPanel = 0x17,
	GenericTypeWallController = 0x18,
	GenericTypeSensorBinary = 0x20,
	GenericTypeSensorMultilevel = 0x21,
	GenericTypeMeterPulse = 0x30,
	GenericTypeMeter = 0x31,
	GenericTypeEntryControl = 0x40,
	GenericTypeSemiInteroperable = 0x50,
	GenericTypeSensorAlarm = 0xa1,
	GenericTypeNonInteroperable = 0xff,
}
