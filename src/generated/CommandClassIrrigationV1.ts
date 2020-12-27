/* Auto-generated */

export class CommandClassIrrigationV1 {
	public static readonly commandClass = 0x6b; // (107);
	public static readonly definition = {"id":107,"name":"COMMAND_CLASS_IRRIGATION","status":"active","version":1,"commands":[{"id":1,"name":"IRRIGATION_SYSTEM_INFO_GET","status":"active","params":[]},{"id":2,"name":"IRRIGATION_SYSTEM_INFO_REPORT","status":"active","params":[{"type":"bitfield","name":"Properties1","length":1,"fields":[{"type":"bool","name":"Master Valve","mask":1,"shift":0},{"type":"integer","name":"Reserved1","mask":6,"shift":1},{"type":"integer","name":"Reserved2","mask":24,"shift":3},{"type":"integer","name":"Reserved3","mask":224,"shift":5}]},{"type":"integer","name":"Total Number of Valves","length":1},{"type":"integer","name":"Total Number of Valve Tables","length":1},{"type":"bitfield","name":"Properties2","length":1,"fields":[{"type":"integer","name":"Valve Table Max Size","mask":15,"shift":0},{"type":"integer","name":"Reserved","mask":240,"shift":4}]}]},{"id":3,"name":"IRRIGATION_SYSTEM_STATUS_GET","status":"active","params":[]},{"id":4,"name":"IRRIGATION_SYSTEM_STATUS_REPORT","status":"active","params":[{"type":"integer","name":"System Voltage","length":1},{"type":"enum","name":"Sensor Status","length":1,"values":{"0":"Flow Sensor Detected","1":"Pressure Sensor Detected","2":"Rain Sensor Detected","3":"Moisture Sensor Detected"}},{"type":"bitfield","name":"Properties1","length":1,"fields":[{"type":"integer","name":"Flow Size","mask":7,"shift":0},{"type":"integer","name":"Flow Scale","mask":24,"shift":3},{"type":"integer","name":"Flow Precision","mask":224,"shift":5}]},{"type":"blob","name":"Flow Value","length":{"name":"Properties1","mask":7,"shift":0}},{"type":"bitfield","name":"Properties2","length":1,"fields":[{"type":"integer","name":"Pressure Size","mask":7,"shift":0},{"type":"integer","name":"Pressure Scale","mask":24,"shift":3},{"type":"integer","name":"Pressure Precision","mask":224,"shift":5}]},{"type":"blob","name":"Pressure Value","length":{"name":"Properties2","mask":7,"shift":0}},{"type":"integer","name":"Shutoff Duration","length":1},{"type":"integer","name":"System Error Status","length":0},{"type":"bitfield","name":"Properties3","length":1,"fields":[{"type":"bool","name":"Master Valve","mask":1,"shift":0},{"type":"integer","name":"Reserved","mask":254,"shift":1}]},{"type":"integer","name":"Valve ID","length":1}]},{"id":5,"name":"IRRIGATION_SYSTEM_CONFIG_SET","status":"active","params":[{"type":"integer","name":"Master Valve Delay","length":1},{"type":"bitfield","name":"Properties1","length":1,"fields":[{"type":"integer","name":"High Pressure Threshold Size","mask":7,"shift":0},{"type":"integer","name":"High Pressure Threshold Scale","mask":24,"shift":3},{"type":"integer","name":"High Pressure Threshold Precision","mask":224,"shift":5}]},{"type":"blob","name":"High Pressure Threshold Value","length":{"name":"Properties1","mask":7,"shift":0}},{"type":"bitfield","name":"Properties2","length":1,"fields":[{"type":"integer","name":"Low Pressure Threshold Size","mask":7,"shift":0},{"type":"integer","name":"Low Pressure Threshold Scale","mask":24,"shift":3},{"type":"integer","name":"Low Pressure Threshold Precision","mask":224,"shift":5}]},{"type":"blob","name":"Low Pressure Threshold Value","length":{"name":"Properties2","mask":7,"shift":0}},{"type":"integer","name":"Sensor Polarity","length":0}]},{"id":6,"name":"IRRIGATION_SYSTEM_CONFIG_GET","status":"active","params":[]},{"id":7,"name":"IRRIGATION_SYSTEM_CONFIG_REPORT","status":"active","params":[{"type":"integer","name":"Master Valve Delay","length":1},{"type":"bitfield","name":"Properties1","length":1,"fields":[{"type":"integer","name":"High Pressure Threshold Size","mask":7,"shift":0},{"type":"integer","name":"High Pressure Threshold Scale","mask":24,"shift":3},{"type":"integer","name":"High Pressure Threshold Precision","mask":224,"shift":5}]},{"type":"blob","name":"High Pressure Threshold Value","length":{"name":"Properties1","mask":7,"shift":0}},{"type":"bitfield","name":"Properties2","length":1,"fields":[{"type":"integer","name":"Low Pressure Threshold Size","mask":7,"shift":0},{"type":"integer","name":"Low Pressure Threshold Scale","mask":24,"shift":3},{"type":"integer","name":"Low Pressure Threshold Precision","mask":224,"shift":5}]},{"type":"blob","name":"Low Pressure Threshold Value","length":{"name":"Properties2","mask":7,"shift":0}},{"type":"integer","name":"Sensor Polarity","length":0}]},{"id":8,"name":"IRRIGATION_VALVE_INFO_GET","status":"active","params":[{"type":"bitfield","name":"Properties1","length":1,"fields":[{"type":"bool","name":"Master Valve","mask":1,"shift":0},{"type":"integer","name":"Reserved","mask":254,"shift":1}]},{"type":"integer","name":"Valve ID","length":1}]},{"id":9,"name":"IRRIGATION_VALVE_INFO_REPORT","status":"active","params":[{"type":"bitfield","name":"Properties1","length":1,"fields":[{"type":"bool","name":"Master","mask":1,"shift":0},{"type":"bool","name":"Connected","mask":2,"shift":1},{"type":"integer","name":"Reserved","mask":252,"shift":2}]},{"type":"integer","name":"Valve ID","length":1},{"type":"integer","name":"Nominal Current","length":1},{"type":"integer","name":"Valve Error Status","length":0}]},{"id":10,"name":"IRRIGATION_VALVE_CONFIG_SET","status":"active","params":[{"type":"bitfield","name":"Properties1","length":1,"fields":[{"type":"bool","name":"Master Valve","mask":1,"shift":0},{"type":"integer","name":"Reserved","mask":254,"shift":1}]},{"type":"integer","name":"Valve ID","length":1},{"type":"integer","name":"Nominal Current High Threshold","length":1},{"type":"integer","name":"Nominal Current Low Threshold","length":1},{"type":"bitfield","name":"Properties2","length":1,"fields":[{"type":"integer","name":"Maximum Flow Size","mask":7,"shift":0},{"type":"integer","name":"Maximum Flow Scale","mask":24,"shift":3},{"type":"integer","name":"Maximum Flow Precision","mask":224,"shift":5}]},{"type":"blob","name":"Maximum Flow Value","length":{"name":"Properties2","mask":7,"shift":0}},{"type":"bitfield","name":"Properties3","length":1,"fields":[{"type":"integer","name":"Flow High Threshold Size","mask":7,"shift":0},{"type":"integer","name":"Flow High Threshold Scale","mask":24,"shift":3},{"type":"integer","name":"Flow High Threshold Precision","mask":224,"shift":5}]},{"type":"blob","name":"Flow High Threshold Value","length":{"name":"Properties3","mask":7,"shift":0}},{"type":"bitfield","name":"Properties4","length":1,"fields":[{"type":"integer","name":"Flow Low Threshold Size","mask":7,"shift":0},{"type":"integer","name":"Flow Low Threshold Scale","mask":24,"shift":3},{"type":"integer","name":"Flow Low Threshold Precision","mask":224,"shift":5}]},{"type":"blob","name":"Flow Low Threshold Value","length":{"name":"Properties4","mask":7,"shift":0}},{"type":"integer","name":"Sensor Usage","length":0}]},{"id":11,"name":"IRRIGATION_VALVE_CONFIG_GET","status":"active","params":[{"type":"bitfield","name":"Properties1","length":1,"fields":[{"type":"bool","name":"Master Valve","mask":1,"shift":0},{"type":"integer","name":"Reserved","mask":254,"shift":1}]},{"type":"integer","name":"Valve ID","length":1}]},{"id":12,"name":"IRRIGATION_VALVE_CONFIG_REPORT","status":"active","params":[{"type":"bitfield","name":"Properties1","length":1,"fields":[{"type":"bool","name":"Master Valve","mask":1,"shift":0},{"type":"integer","name":"Reserved","mask":254,"shift":1}]},{"type":"integer","name":"Valve ID","length":1},{"type":"integer","name":"Nominal Current High Threshold","length":1},{"type":"integer","name":"Nominal Current Low Threshold","length":1},{"type":"bitfield","name":"Properties2","length":1,"fields":[{"type":"integer","name":"Maximum Flow Size","mask":7,"shift":0},{"type":"integer","name":"Maximum Flow Scale","mask":24,"shift":3},{"type":"integer","name":"Maximum Flow Precision","mask":224,"shift":5}]},{"type":"blob","name":"Maximum Flow Value","length":{"name":"Properties2","mask":7,"shift":0}},{"type":"bitfield","name":"Properties3","length":1,"fields":[{"type":"integer","name":"Flow High Threshold Size","mask":7,"shift":0},{"type":"integer","name":"Flow High Threshold Scale","mask":24,"shift":3},{"type":"integer","name":"Flow High Threshold Precision","mask":224,"shift":5}]},{"type":"blob","name":"Flow High Threshold Value","length":{"name":"Properties3","mask":7,"shift":0}},{"type":"bitfield","name":"Properties4","length":1,"fields":[{"type":"integer","name":"Flow Low Threshold Size","mask":7,"shift":0},{"type":"integer","name":"Flow Low Threshold Scale","mask":24,"shift":3},{"type":"integer","name":"Flow Low Threshold Precision","mask":224,"shift":5}]},{"type":"blob","name":"Flow Low Threshold Value","length":{"name":"Properties4","mask":7,"shift":0}},{"type":"integer","name":"Sensor Usage","length":0}]},{"id":13,"name":"IRRIGATION_VALVE_RUN","status":"active","params":[{"type":"bitfield","name":"Properties1","length":1,"fields":[{"type":"bool","name":"Master Valve","mask":1,"shift":0},{"type":"integer","name":"Reserved","mask":254,"shift":1}]},{"type":"integer","name":"Valve ID","length":1},{"type":"integer","name":"Duration","length":2}]},{"id":14,"name":"IRRIGATION_VALVE_TABLE_SET","status":"active","params":[{"type":"integer","name":"Valve Table ID","length":1},{"type":"group","name":"vg1","length":"auto","params":[{"type":"integer","name":"Valve ID","length":1},{"type":"integer","name":"Duration","length":2}]}]},{"id":15,"name":"IRRIGATION_VALVE_TABLE_GET","status":"active","params":[{"type":"integer","name":"Valve Table ID","length":1}]},{"id":16,"name":"IRRIGATION_VALVE_TABLE_REPORT","status":"active","params":[{"type":"integer","name":"Valve Table ID","length":1},{"type":"group","name":"vg1","length":"auto","params":[{"type":"integer","name":"Valve ID","length":1},{"type":"integer","name":"Duration","length":2}]}]},{"id":17,"name":"IRRIGATION_VALVE_TABLE_RUN","status":"active","params":[{"type":"blob","name":"Valve Table ID","length":"auto"}]},{"id":18,"name":"IRRIGATION_SYSTEM_SHUTOFF","status":"active","params":[{"type":"integer","name":"Duration","length":1}]}]};
}

export interface IrrigationSystemInfoGet {
	_commandClass: 0x6b; // (107)
	_command: 0x1; // (1)
}

export interface IrrigationSystemInfoReport {
	_commandClass: 0x6b; // (107)
	_command: 0x2; // (2)
	// TODO param Properties1 type bitfield
	totalNumberOfValves: number; // 1 byte unsigned integer
	totalNumberOfValveTables: number; // 1 byte unsigned integer
	// TODO param Properties2 type bitfield
}

export interface IrrigationSystemStatusGet {
	_commandClass: 0x6b; // (107)
	_command: 0x3; // (3)
}

export interface IrrigationSystemStatusReport {
	_commandClass: 0x6b; // (107)
	_command: 0x4; // (4)
	systemVoltage: number; // 1 byte unsigned integer
	sensorStatus: SensorStatusEnum; // 1 byte enum value
	// TODO param Properties1 type bitfield
	// TODO param Flow Value type blob
	// TODO param Properties2 type bitfield
	// TODO param Pressure Value type blob
	shutoffDuration: number; // 1 byte unsigned integer
	systemErrorStatus: number; // 0 byte unsigned integer
	// TODO param Properties3 type bitfield
	valveID: number; // 1 byte unsigned integer
}

export interface IrrigationSystemConfigSet {
	_commandClass: 0x6b; // (107)
	_command: 0x5; // (5)
	masterValveDelay: number; // 1 byte unsigned integer
	// TODO param Properties1 type bitfield
	// TODO param High Pressure Threshold Value type blob
	// TODO param Properties2 type bitfield
	// TODO param Low Pressure Threshold Value type blob
	sensorPolarity: number; // 0 byte unsigned integer
}

export interface IrrigationSystemConfigGet {
	_commandClass: 0x6b; // (107)
	_command: 0x6; // (6)
}

export interface IrrigationSystemConfigReport {
	_commandClass: 0x6b; // (107)
	_command: 0x7; // (7)
	masterValveDelay: number; // 1 byte unsigned integer
	// TODO param Properties1 type bitfield
	// TODO param High Pressure Threshold Value type blob
	// TODO param Properties2 type bitfield
	// TODO param Low Pressure Threshold Value type blob
	sensorPolarity: number; // 0 byte unsigned integer
}

export interface IrrigationValveInfoGet {
	_commandClass: 0x6b; // (107)
	_command: 0x8; // (8)
	// TODO param Properties1 type bitfield
	valveID: number; // 1 byte unsigned integer
}

export interface IrrigationValveInfoReport {
	_commandClass: 0x6b; // (107)
	_command: 0x9; // (9)
	// TODO param Properties1 type bitfield
	valveID: number; // 1 byte unsigned integer
	nominalCurrent: number; // 1 byte unsigned integer
	valveErrorStatus: number; // 0 byte unsigned integer
}

export interface IrrigationValveConfigSet {
	_commandClass: 0x6b; // (107)
	_command: 0xa; // (10)
	// TODO param Properties1 type bitfield
	valveID: number; // 1 byte unsigned integer
	nominalCurrentHighThreshold: number; // 1 byte unsigned integer
	nominalCurrentLowThreshold: number; // 1 byte unsigned integer
	// TODO param Properties2 type bitfield
	// TODO param Maximum Flow Value type blob
	// TODO param Properties3 type bitfield
	// TODO param Flow High Threshold Value type blob
	// TODO param Properties4 type bitfield
	// TODO param Flow Low Threshold Value type blob
	sensorUsage: number; // 0 byte unsigned integer
}

export interface IrrigationValveConfigGet {
	_commandClass: 0x6b; // (107)
	_command: 0xb; // (11)
	// TODO param Properties1 type bitfield
	valveID: number; // 1 byte unsigned integer
}

export interface IrrigationValveConfigReport {
	_commandClass: 0x6b; // (107)
	_command: 0xc; // (12)
	// TODO param Properties1 type bitfield
	valveID: number; // 1 byte unsigned integer
	nominalCurrentHighThreshold: number; // 1 byte unsigned integer
	nominalCurrentLowThreshold: number; // 1 byte unsigned integer
	// TODO param Properties2 type bitfield
	// TODO param Maximum Flow Value type blob
	// TODO param Properties3 type bitfield
	// TODO param Flow High Threshold Value type blob
	// TODO param Properties4 type bitfield
	// TODO param Flow Low Threshold Value type blob
	sensorUsage: number; // 0 byte unsigned integer
}

export interface IrrigationValveRun {
	_commandClass: 0x6b; // (107)
	_command: 0xd; // (13)
	// TODO param Properties1 type bitfield
	valveID: number; // 1 byte unsigned integer
	duration: number; // 2 byte unsigned integer
}

export interface IrrigationValveTableSet {
	_commandClass: 0x6b; // (107)
	_command: 0xe; // (14)
	valveTableID: number; // 1 byte unsigned integer
	// TODO param vg1 type group
}

export interface IrrigationValveTableGet {
	_commandClass: 0x6b; // (107)
	_command: 0xf; // (15)
	valveTableID: number; // 1 byte unsigned integer
}

export interface IrrigationValveTableReport {
	_commandClass: 0x6b; // (107)
	_command: 0x10; // (16)
	valveTableID: number; // 1 byte unsigned integer
	// TODO param vg1 type group
}

export interface IrrigationValveTableRun {
	_commandClass: 0x6b; // (107)
	_command: 0x11; // (17)
	// TODO param Valve Table ID type blob
}

export interface IrrigationSystemShutoff {
	_commandClass: 0x6b; // (107)
	_command: 0x12; // (18)
	duration: number; // 1 byte unsigned integer
}

export enum SensorStatusEnum {
	FlowSensorDetected = 0x0,
	PressureSensorDetected = 0x1,
	RainSensorDetected = 0x2,
	MoistureSensorDetected = 0x3,
}
