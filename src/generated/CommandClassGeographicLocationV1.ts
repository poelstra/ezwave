/* Auto-generated */

export class CommandClassGeographicLocationV1 {
	public static readonly commandClass = 0x8c; // (140);
	public static readonly definition = {"id":140,"name":"COMMAND_CLASS_GEOGRAPHIC_LOCATION","status":"active","version":1,"commands":[{"id":2,"name":"GEOGRAPHIC_LOCATION_GET","status":"active","params":[]},{"id":3,"name":"GEOGRAPHIC_LOCATION_REPORT","status":"active","params":[{"type":"integer","name":"Longitude Degrees","length":1},{"type":"bitfield","name":"Level","length":1,"fields":[{"type":"integer","name":"Longitude Minutes","mask":127,"shift":0},{"type":"bool","name":"Long. Sign","mask":128,"shift":7}]},{"type":"integer","name":"Latitude Degrees","length":1},{"type":"bitfield","name":"Level2","length":1,"fields":[{"type":"integer","name":"Latitude Minutes","mask":127,"shift":0},{"type":"bool","name":"Lat. Sign","mask":128,"shift":7}]}]},{"id":1,"name":"GEOGRAPHIC_LOCATION_SET","status":"active","params":[{"type":"integer","name":"Longitude Degrees","length":1},{"type":"bitfield","name":"Level","length":1,"fields":[{"type":"integer","name":"Longitude Minutes","mask":127,"shift":0},{"type":"bool","name":"Long. Sign","mask":128,"shift":7}]},{"type":"integer","name":"Latitude Degrees","length":1},{"type":"bitfield","name":"Level2","length":1,"fields":[{"type":"integer","name":"Latitude Minutes","mask":127,"shift":0},{"type":"bool","name":"Lat. Sign","mask":128,"shift":7}]}]}]};
}

export interface GeographicLocationGet {
	_commandClass: 0x8c; // (140)
	_command: 0x2; // (2)
}

export interface GeographicLocationReport {
	_commandClass: 0x8c; // (140)
	_command: 0x3; // (3)
	longitudeDegrees: number; // 1 byte unsigned integer
	// TODO param Level type bitfield
	latitudeDegrees: number; // 1 byte unsigned integer
	// TODO param Level2 type bitfield
}

export interface GeographicLocationSet {
	_commandClass: 0x8c; // (140)
	_command: 0x1; // (1)
	longitudeDegrees: number; // 1 byte unsigned integer
	// TODO param Level type bitfield
	latitudeDegrees: number; // 1 byte unsigned integer
	// TODO param Level2 type bitfield
}
