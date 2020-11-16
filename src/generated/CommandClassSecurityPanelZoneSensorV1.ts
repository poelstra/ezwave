/* Auto-generated */

export class CommandClassSecurityPanelZoneSensorV1 {
	public static readonly commandClass = 0x2f; // (47);
	public static readonly definition = {"id":47,"name":"COMMAND_CLASS_SECURITY_PANEL_ZONE_SENSOR","status":"active","version":1,"commands":[{"id":2,"name":"COMMAND_CLASS_SECURITY_PANEL_ZONE_SENSOR_INSTALLED_REPORT","status":"active","params":[{"type":"integer","name":"Zone number","length":1},{"type":"integer","name":"Number of Sensors","length":1}]},{"id":3,"name":"SECURITY_PANEL_ZONE_SENSOR_TYPE_GET","status":"active","params":[{"type":"integer","name":"Zone Number","length":1},{"type":"integer","name":"Sensor Number","length":1}]},{"id":4,"name":"SECURITY_PANEL_ZONE_SENSOR_TYPE_REPORT","status":"active","params":[{"type":"integer","name":"Zone Number","length":1},{"type":"integer","name":"Sensor Number","length":1},{"type":"integer","name":"ZWave Alarm Type","length":1}]},{"id":1,"name":"SECURITY_PANEL_ZONE_SENSOR_INSTALLED_GET","status":"active","params":[{"type":"integer","name":"Zone number","length":1}]},{"id":5,"name":"SECURITY_PANEL_ZONE_SENSOR_STATE_GET","status":"active","params":[{"type":"integer","name":"Zone Number","length":1},{"type":"integer","name":"Sensor Number","length":1}]},{"id":6,"name":"SECURITY_PANEL_ZONE_SENSOR_STATE_REPORT","status":"active","params":[{"type":"integer","name":"Zone Number","length":1},{"type":"integer","name":"Sensor Number","length":1},{"type":"integer","name":"ZWave Alarm Type","length":1},{"type":"integer","name":"ZWave Alarm Event","length":1},{"type":"integer","name":"Event Parameters","length":1}]}]};
}

export interface CommandClassSecurityPanelZoneSensorInstalledReport {
	_commandClass: 0x2f; // (47)
	_command: 0x2; // (2)
	zoneNumber: number; // 1 byte unsigned integer
	numberOfSensors: number; // 1 byte unsigned integer
}

export interface SecurityPanelZoneSensorTypeGet {
	_commandClass: 0x2f; // (47)
	_command: 0x3; // (3)
	zoneNumber: number; // 1 byte unsigned integer
	sensorNumber: number; // 1 byte unsigned integer
}

export interface SecurityPanelZoneSensorTypeReport {
	_commandClass: 0x2f; // (47)
	_command: 0x4; // (4)
	zoneNumber: number; // 1 byte unsigned integer
	sensorNumber: number; // 1 byte unsigned integer
	zWaveAlarmType: number; // 1 byte unsigned integer
}

export interface SecurityPanelZoneSensorInstalledGet {
	_commandClass: 0x2f; // (47)
	_command: 0x1; // (1)
	zoneNumber: number; // 1 byte unsigned integer
}

export interface SecurityPanelZoneSensorStateGet {
	_commandClass: 0x2f; // (47)
	_command: 0x5; // (5)
	zoneNumber: number; // 1 byte unsigned integer
	sensorNumber: number; // 1 byte unsigned integer
}

export interface SecurityPanelZoneSensorStateReport {
	_commandClass: 0x2f; // (47)
	_command: 0x6; // (6)
	zoneNumber: number; // 1 byte unsigned integer
	sensorNumber: number; // 1 byte unsigned integer
	zWaveAlarmType: number; // 1 byte unsigned integer
	zWaveAlarmEvent: number; // 1 byte unsigned integer
	eventParameters: number; // 1 byte unsigned integer
}
