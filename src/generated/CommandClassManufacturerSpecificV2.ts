/* Auto-generated */

export class CommandClassManufacturerSpecificV2 {
	public static readonly commandClass = 0x72; // (114);
	public static readonly definition = {"id":114,"name":"COMMAND_CLASS_MANUFACTURER_SPECIFIC","status":"active","version":2,"commands":[{"id":4,"name":"MANUFACTURER_SPECIFIC_GET","status":"active","params":[]},{"id":5,"name":"MANUFACTURER_SPECIFIC_REPORT","status":"active","params":[{"type":"integer","name":"Manufacturer ID","length":2},{"type":"integer","name":"Product Type ID","length":2},{"type":"integer","name":"Product ID","length":2}]},{"id":6,"name":"DEVICE_SPECIFIC_GET","status":"active","params":[{"type":"bitfield","name":"Properties1","length":1,"fields":[{"type":"enum","name":"Device ID Type","mask":7,"shift":0,"values":{"0":"Reserved","1":"Serial Number"}},{"type":"integer","name":"Reserved","mask":248,"shift":3}]}]},{"id":7,"name":"DEVICE_SPECIFIC_REPORT","status":"active","params":[{"type":"bitfield","name":"Properties1","length":1,"fields":[{"type":"enum","name":"Device ID Type","mask":7,"shift":0,"values":{"0":"Reserved","1":"Serial Number"}},{"type":"integer","name":"Reserved","mask":248,"shift":3}]},{"type":"bitfield","name":"Properties2","length":1,"fields":[{"type":"integer","name":"Device ID Data Length Indicator","mask":31,"shift":0},{"type":"enum","name":"Device ID Data Format","mask":224,"shift":5,"values":{"0":"Reserved","1":"Binary"}}]},{"type":"blob","name":"Device ID Data","length":{"name":"Properties2","mask":31,"shift":0}}]}]};
}

export interface ManufacturerSpecificGet {
	_commandClass: 0x72; // (114)
	_command: 0x4; // (4)
}

export interface ManufacturerSpecificReport {
	_commandClass: 0x72; // (114)
	_command: 0x5; // (5)
	manufacturerID: number; // 2 byte unsigned integer
	productTypeID: number; // 2 byte unsigned integer
	productID: number; // 2 byte unsigned integer
}

export interface DeviceSpecificGet {
	_commandClass: 0x72; // (114)
	_command: 0x6; // (6)
	// TODO param Properties1 type bitfield
}

export interface DeviceSpecificReport {
	_commandClass: 0x72; // (114)
	_command: 0x7; // (7)
	// TODO param Properties1 type bitfield
	// TODO param Properties2 type bitfield
	// TODO param Device ID Data type blob
}
