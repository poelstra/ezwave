/* Auto-generated */

export class CommandClassNetworkManagementInstallationMaintenanceV2 {
	public static readonly commandClass = 0x67; // (103);
	public static readonly definition = {"id":103,"name":"COMMAND_CLASS_NETWORK_MANAGEMENT_INSTALLATION_MAINTENANCE","status":"active","version":2,"commands":[{"id":1,"name":"PRIORITY_ROUTE_SET","status":"active","params":[{"type":"integer","name":"NodeID","length":1,"valueType":"NODE_NUMBER"},{"type":"integer","name":"Repeater 1","length":1,"valueType":"NODE_NUMBER"},{"type":"integer","name":"Repeater 2","length":1,"valueType":"NODE_NUMBER"},{"type":"integer","name":"Repeater 3","length":1,"valueType":"NODE_NUMBER"},{"type":"integer","name":"Repeater 4","length":1,"valueType":"NODE_NUMBER"},{"type":"enum","name":"Speed","length":1,"values":{"1":"9.6 kbit/sec","2":"40 kbit/sec","3":"100 kbit/sec"}}]},{"id":2,"name":"PRIORITY_ROUTE_GET","status":"active","params":[{"type":"integer","name":"NodeID","length":1,"valueType":"NODE_NUMBER"}]},{"id":3,"name":"PRIORITY_ROUTE_REPORT","status":"active","params":[{"type":"integer","name":"NodeID","length":1,"valueType":"NODE_NUMBER"},{"type":"enum","name":"Type","length":1,"values":{"0":"None","1":"ZW_PRIORITY_ROUTE_ZW_LWR","2":"ZW_PRIORITY_ROUTE_ZW_NLWR","16":"ZW_PRIORITY_ROUTE_APP_PR"}},{"type":"integer","name":"Repeater 1","length":1,"valueType":"NODE_NUMBER"},{"type":"integer","name":"Repeater 2","length":1,"valueType":"NODE_NUMBER"},{"type":"integer","name":"Repeater 3","length":1,"valueType":"NODE_NUMBER"},{"type":"integer","name":"Repeater 4","length":1,"valueType":"NODE_NUMBER"},{"type":"enum","name":"Speed","length":1,"values":{"1":"9.6 kbit/sec","2":"40 kbit/sec","3":"100 kbit/sec"}}]},{"id":4,"name":"STATISTICS_GET","status":"active","params":[{"type":"integer","name":"NodeID","length":1,"valueType":"NODE_NUMBER"}]},{"id":5,"name":"STATISTICS_REPORT","status":"active","params":[{"type":"integer","name":"NodeID","length":1,"valueType":"NODE_NUMBER"},{"type":"group","name":"Statistics","length":"auto","params":[{"type":"enum","name":"Type","length":1,"values":{"0":"Route Changes (RC)","1":"Transmission Count (TC)","2":"Neighbors (NB)","3":"Packet Error Count (PEC)","4":"Sum of transmission times (TS)","5":"Sum of transmission times squrared (TS2)"}},{"type":"integer","name":"Length","length":1},{"type":"blob","name":"Value","length":{"name":"Length","mask":255,"shift":0}}]}]},{"id":6,"name":"STATISTICS_CLEAR","status":"active","params":[]},{"id":7,"name":"RSSI_GET","status":"active","params":[]},{"id":8,"name":"RSSI_REPORT","status":"active","params":[{"type":"integer","name":"Channel 1 RSSI","length":1},{"type":"integer","name":"Channel 2 RSSI","length":1},{"type":"integer","name":"Channel 3 RSSI","length":1}]}]};
}

export interface PriorityRouteSet {
	_commandClass: 0x67; // (103)
	_command: 0x1; // (1)
	nodeID: number; // 1 byte unsigned integer
	repeater1: number; // 1 byte unsigned integer
	repeater2: number; // 1 byte unsigned integer
	repeater3: number; // 1 byte unsigned integer
	repeater4: number; // 1 byte unsigned integer
	speed: SpeedEnum; // 1 byte enum value
}

export interface PriorityRouteGet {
	_commandClass: 0x67; // (103)
	_command: 0x2; // (2)
	nodeID: number; // 1 byte unsigned integer
}

export interface PriorityRouteReport {
	_commandClass: 0x67; // (103)
	_command: 0x3; // (3)
	nodeID: number; // 1 byte unsigned integer
	type: TypeEnum; // 1 byte enum value
	repeater1: number; // 1 byte unsigned integer
	repeater2: number; // 1 byte unsigned integer
	repeater3: number; // 1 byte unsigned integer
	repeater4: number; // 1 byte unsigned integer
	speed: SpeedEnum; // 1 byte enum value
}

export interface StatisticsGet {
	_commandClass: 0x67; // (103)
	_command: 0x4; // (4)
	nodeID: number; // 1 byte unsigned integer
}

export interface StatisticsReport {
	_commandClass: 0x67; // (103)
	_command: 0x5; // (5)
	nodeID: number; // 1 byte unsigned integer
	// TODO param Statistics type group
}

export interface StatisticsClear {
	_commandClass: 0x67; // (103)
	_command: 0x6; // (6)
}

export interface RssiGet {
	_commandClass: 0x67; // (103)
	_command: 0x7; // (7)
}

export interface RssiReport {
	_commandClass: 0x67; // (103)
	_command: 0x8; // (8)
	channel1RSSI: number; // 1 byte unsigned integer
	channel2RSSI: number; // 1 byte unsigned integer
	channel3RSSI: number; // 1 byte unsigned integer
}

export enum SpeedEnum {
	_96KbitSec = 0x1,
	_40KbitSec = 0x2,
	_100KbitSec = 0x3,
}

export enum TypeEnum {
	None = 0x0,
	ZwPriorityRouteZwLwr = 0x1,
	ZwPriorityRouteZwNlwr = 0x2,
	ZwPriorityRouteAppPr = 0x10,
}
