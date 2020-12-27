/* Auto-generated */

// deprecated
export class CommandClassFirmwareUpdateMdV1 {
	public static readonly commandClass = 0x7a; // (122);
	public static readonly definition = {"id":122,"name":"COMMAND_CLASS_FIRMWARE_UPDATE_MD","status":"deprecated","version":1,"commands":[{"id":1,"name":"FIRMWARE_MD_GET","status":"active","params":[]},{"id":2,"name":"FIRMWARE_MD_REPORT","status":"active","params":[{"type":"integer","name":"Manufacturer ID","length":2},{"type":"integer","name":"Firmware ID","length":2},{"type":"integer","name":"Checksum","length":2}]},{"id":5,"name":"FIRMWARE_UPDATE_MD_GET","status":"active","params":[{"type":"integer","name":"Number of Reports","length":1},{"type":"bitfield","name":"Properties1","length":1,"fields":[{"type":"integer","name":"Report number 1","mask":127,"shift":0},{"type":"bool","name":"zero","mask":128,"shift":7}]},{"type":"integer","name":"Report number 2","length":1}]},{"id":6,"name":"FIRMWARE_UPDATE_MD_REPORT","status":"active","params":[{"type":"bitfield","name":"Properties1","length":1,"fields":[{"type":"integer","name":"Report number 1","mask":127,"shift":0},{"type":"bool","name":"Last","mask":128,"shift":7}]},{"type":"integer","name":"Report number 2","length":1},{"type":"blob","name":"Data","length":"auto"}]},{"id":3,"name":"FIRMWARE_UPDATE_MD_REQUEST_GET","status":"active","params":[{"type":"integer","name":"Manufacturer ID","length":2},{"type":"integer","name":"Firmware ID","length":2},{"type":"integer","name":"Checksum","length":2}]},{"id":4,"name":"FIRMWARE_UPDATE_MD_REQUEST_REPORT","status":"active","params":[{"type":"enum","name":"Status","length":1,"values":{"0":"Invalid combination","1":"Requires authentication","255":"Valid combination"}}]},{"id":7,"name":"FIRMWARE_UPDATE_MD_STATUS_REPORT","status":"active","params":[{"type":"enum","name":"Status","length":1,"values":{"0":"unable to receive without checksum error","1":"unable to receive","255":"successfully"}}]}]};
}

export interface FirmwareMdGet {
	_commandClass: 0x7a; // (122)
	_command: 0x1; // (1)
}

export interface FirmwareMdReport {
	_commandClass: 0x7a; // (122)
	_command: 0x2; // (2)
	manufacturerID: number; // 2 byte unsigned integer
	firmwareID: number; // 2 byte unsigned integer
	checksum: number; // 2 byte unsigned integer
}

export interface FirmwareUpdateMdGet {
	_commandClass: 0x7a; // (122)
	_command: 0x5; // (5)
	numberOfReports: number; // 1 byte unsigned integer
	// TODO param Properties1 type bitfield
	reportNumber2: number; // 1 byte unsigned integer
}

export interface FirmwareUpdateMdReport {
	_commandClass: 0x7a; // (122)
	_command: 0x6; // (6)
	// TODO param Properties1 type bitfield
	reportNumber2: number; // 1 byte unsigned integer
	// TODO param Data type blob
}

export interface FirmwareUpdateMdRequestGet {
	_commandClass: 0x7a; // (122)
	_command: 0x3; // (3)
	manufacturerID: number; // 2 byte unsigned integer
	firmwareID: number; // 2 byte unsigned integer
	checksum: number; // 2 byte unsigned integer
}

export interface FirmwareUpdateMdRequestReport {
	_commandClass: 0x7a; // (122)
	_command: 0x4; // (4)
	status: StatusEnum; // 1 byte enum value
}

export interface FirmwareUpdateMdStatusReport {
	_commandClass: 0x7a; // (122)
	_command: 0x7; // (7)
	status: Status2Enum; // 1 byte enum value
}

export enum StatusEnum {
	InvalidCombination = 0x0,
	RequiresAuthentication = 0x1,
	ValidCombination = 0xff,
}

export enum Status2Enum {
	UnableToReceiveWithoutChecksumError = 0x0,
	UnableToReceive = 0x1,
	Successfully = 0xff,
}
