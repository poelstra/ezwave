/* Auto-generated */

export class CommandClassSecurityPanelZoneV1 {
	public static readonly commandClass = 0x2e; // (46);
	public static readonly definition = {"id":46,"name":"COMMAND_CLASS_SECURITY_PANEL_ZONE","status":"active","version":1,"commands":[{"id":1,"name":"SECURITY_PANEL_ZONE_NUMBER_SUPPORTED_GET","status":"active","params":[]},{"id":5,"name":"SECURITY_PANEL_ZONE_STATE_GET","status":"active","params":[{"type":"integer","name":"Zone Number","length":1}]},{"id":6,"name":"SECURITY_PANEL_ZONE_STATE_REPORT","status":"active","params":[{"type":"integer","name":"Zone number","length":1},{"type":"integer","name":"Zone State","length":1,"values":{"0":"Faulted","1":"Not-Faulted","2":"Bypass Faulted","3":"Bypass Not-Faulted"}}]},{"id":2,"name":"SECURITY_PANEL_ZONE_SUPPORTED_REPORT","status":"active","params":[{"type":"bitfield","name":"Parameters1","length":1,"fields":[{"type":"int","name":"Zones Supported","mask":127,"shift":0},{"type":"bool","name":"ZM","mask":128,"shift":7}]}]},{"id":3,"name":"SECURITY_PANEL_ZONE_TYPE_GET","status":"active","params":[{"type":"integer","name":"Zone Number","length":1}]},{"id":4,"name":"SECURITY_PANEL_ZONE_TYPE_REPORT","status":"active","params":[{"type":"integer","name":"Zone Number","length":1},{"type":"integer","name":"Zone Type","length":1,"values":{"1":"Alarm Zone","2":"Notification Zone"}}]}]};
}

export interface SecurityPanelZoneNumberSupportedGet {
	_commandClass: 0x2e; // (46)
	_command: 0x1; // (1)
}

export interface SecurityPanelZoneStateGet {
	_commandClass: 0x2e; // (46)
	_command: 0x5; // (5)
	zoneNumber: number; // 1 byte unsigned integer
}

export interface SecurityPanelZoneStateReport {
	_commandClass: 0x2e; // (46)
	_command: 0x6; // (6)
	zoneNumber: number; // 1 byte unsigned integer
	zoneState: number; // 1 byte unsigned integer
}

export interface SecurityPanelZoneSupportedReport {
	_commandClass: 0x2e; // (46)
	_command: 0x2; // (2)
	// TODO param Parameters1 type bitfield
}

export interface SecurityPanelZoneTypeGet {
	_commandClass: 0x2e; // (46)
	_command: 0x3; // (3)
	zoneNumber: number; // 1 byte unsigned integer
}

export interface SecurityPanelZoneTypeReport {
	_commandClass: 0x2e; // (46)
	_command: 0x4; // (4)
	zoneNumber: number; // 1 byte unsigned integer
	zoneType: number; // 1 byte unsigned integer
}
