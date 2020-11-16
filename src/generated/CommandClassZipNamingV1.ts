/* Auto-generated */

export class CommandClassZipNamingV1 {
	public static readonly commandClass = 0x68; // (104);
	public static readonly definition = {"id":104,"name":"COMMAND_CLASS_ZIP_NAMING","status":"active","version":1,"commands":[{"id":1,"name":"ZIP_NAMING_NAME_SET","status":"active","params":[{"type":"text","name":"Name","length":"auto"}]},{"id":2,"name":"ZIP_NAMING_NAME_GET","status":"active","params":[]},{"id":3,"name":"ZIP_NAMING_NAME_REPORT","status":"active","params":[{"type":"text","name":"Name","length":"auto"}]},{"id":4,"name":"ZIP_NAMING_LOCATION_SET","status":"active","params":[{"type":"text","name":"Location","length":"auto"}]},{"id":5,"name":"ZIP_NAMING_LOCATION_GET","status":"active","params":[]},{"id":6,"name":"ZIP_NAMING_LOCATION_REPORT","status":"active","params":[{"type":"text","name":"Location","length":"auto"}]}]};
}

export interface ZipNamingNameSet {
	_commandClass: 0x68; // (104)
	_command: 0x1; // (1)
	// TODO param Name type text
}

export interface ZipNamingNameGet {
	_commandClass: 0x68; // (104)
	_command: 0x2; // (2)
}

export interface ZipNamingNameReport {
	_commandClass: 0x68; // (104)
	_command: 0x3; // (3)
	// TODO param Name type text
}

export interface ZipNamingLocationSet {
	_commandClass: 0x68; // (104)
	_command: 0x4; // (4)
	// TODO param Location type text
}

export interface ZipNamingLocationGet {
	_commandClass: 0x68; // (104)
	_command: 0x5; // (5)
}

export interface ZipNamingLocationReport {
	_commandClass: 0x68; // (104)
	_command: 0x6; // (6)
	// TODO param Location type text
}
