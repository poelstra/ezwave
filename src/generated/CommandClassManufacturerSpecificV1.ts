/* Auto-generated */

export class CommandClassManufacturerSpecificV1 {
	public static readonly commandClass = 0x72; // (114);
	public static readonly definition = {"id":114,"name":"COMMAND_CLASS_MANUFACTURER_SPECIFIC","status":"active","version":1,"commands":[{"id":4,"name":"MANUFACTURER_SPECIFIC_GET","status":"active","params":[]},{"id":5,"name":"MANUFACTURER_SPECIFIC_REPORT","status":"active","params":[{"type":"integer","name":"Manufacturer ID","length":2},{"type":"integer","name":"Product Type ID","length":2},{"type":"integer","name":"Product ID","length":2}]}]};
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
