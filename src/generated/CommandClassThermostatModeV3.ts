/* Auto-generated */

export class CommandClassThermostatModeV3 {
	public static readonly commandClass = 0x40; // (64);
	public static readonly definition = {"id":64,"name":"COMMAND_CLASS_THERMOSTAT_MODE","status":"active","version":3,"commands":[{"id":2,"name":"THERMOSTAT_MODE_GET","status":"active","params":[]},{"id":3,"name":"THERMOSTAT_MODE_REPORT","status":"active","params":[{"type":"bitfield","name":"Level","length":1,"fields":[{"type":"enum","name":"Mode","mask":31,"shift":0,"values":{"0":"Off","1":"Heat","2":"Cool","3":"Auto","4":"Auxiliary Heat","5":"Resume","6":"Fan Only","7":"Furnace","8":"Dry Air","9":"Moist Air","10":"Auto Changeover","11":"Energy Save Heat","12":"Energy Save Cool","13":"AWAY","14":"Reserved","15":"FULL POWER","16":"Reserved0","17":"Reserved1","18":"Reserved2","19":"Reserved3","20":"Reserved4","21":"Reserved5","22":"Reserved6","23":"Reserved7","24":"Reserved8","25":"Reserved9","26":"ReservedA","27":"ReservedB","28":"ReservedC","29":"ReservedD","30":"ReservedE","31":"MANUFACTURER SPECIFC"}},{"type":"integer","name":"No of Manufacturer Data fields","mask":224,"shift":5}]},{"type":"blob","name":"Manufacturer Data","length":{"name":"Level","mask":224,"shift":5}}]},{"id":1,"name":"THERMOSTAT_MODE_SET","status":"active","params":[{"type":"bitfield","name":"Level","length":1,"fields":[{"type":"enum","name":"Mode","mask":31,"shift":0,"values":{"0":"Off","1":"Heat","2":"Cool","3":"Auto","4":"Auxiliary Heat","5":"Resume","6":"Fan Only","7":"Furnace","8":"Dry Air","9":"Moist Air","10":"Auto Changeover","11":"Energy Save Heat","12":"Energy Save Cool","13":"AWAY","14":"Reserved","15":"FULL POWER","16":"Reserved0","17":"Reserved1","18":"Reserved2","19":"Reserved3","20":"Reserved4","21":"Reserved5","22":"Reserved6","23":"Reserved7","24":"Reserved8","25":"Reserved9","26":"ReservedA","27":"ReservedB","28":"ReservedC","29":"ReservedD","30":"ReservedE","31":"MANUFACTURER SPECIFC"}},{"type":"integer","name":"No of Manufacturer Data fields","mask":224,"shift":5}]},{"type":"blob","name":"Manufacturer Data","length":{"name":"Level","mask":224,"shift":5}}]},{"id":4,"name":"THERMOSTAT_MODE_SUPPORTED_GET","status":"active","params":[]},{"id":5,"name":"THERMOSTAT_MODE_SUPPORTED_REPORT","status":"active","params":[{"type":"integer","name":"Bit Mask","length":0}]}]};
}

export interface ThermostatModeGet {
	_commandClass: 0x40; // (64)
	_command: 0x2; // (2)
}

export interface ThermostatModeReport {
	_commandClass: 0x40; // (64)
	_command: 0x3; // (3)
	// TODO param Level type bitfield
	// TODO param Manufacturer Data type blob
}

export interface ThermostatModeSet {
	_commandClass: 0x40; // (64)
	_command: 0x1; // (1)
	// TODO param Level type bitfield
	// TODO param Manufacturer Data type blob
}

export interface ThermostatModeSupportedGet {
	_commandClass: 0x40; // (64)
	_command: 0x4; // (4)
}

export interface ThermostatModeSupportedReport {
	_commandClass: 0x40; // (64)
	_command: 0x5; // (5)
	bitMask: number; // 0 byte unsigned integer
}
