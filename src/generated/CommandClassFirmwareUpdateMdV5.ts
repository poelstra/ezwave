/* Auto-generated */

export class CommandClassFirmwareUpdateMdV5 {
	public static readonly commandClass = 0x7a; // (122);
	public static readonly definition = {"id":122,"name":"COMMAND_CLASS_FIRMWARE_UPDATE_MD","status":"active","version":5,"commands":[{"id":1,"name":"FIRMWARE_MD_GET","status":"active","params":[]},{"id":2,"name":"FIRMWARE_MD_REPORT","status":"active","params":[{"type":"integer","name":"Manufacturer ID","length":2},{"type":"integer","name":"Firmware 0 ID","length":2},{"type":"integer","name":"Firmware 0 Checksum","length":2},{"type":"integer","name":"Firmware Upgradable","length":1},{"type":"integer","name":"Number of Firmware Targets","length":1},{"type":"integer","name":"Max Fragment Size","length":2},{"type":"group","name":"vg1","length":{"name":"Number of Firmware Targets","mask":255,"shift":0},"params":[{"type":"integer","name":"Firmware ID","length":2}]},{"type":"integer","name":"Hardware Version","length":1}]},{"id":5,"name":"FIRMWARE_UPDATE_MD_GET","status":"active","params":[{"type":"integer","name":"Number of Reports","length":1},{"type":"bitfield","name":"Properties1","length":1,"fields":[{"type":"int","name":"Report number 1","mask":127,"shift":0},{"type":"bool","name":"zero","mask":128,"shift":7}]},{"type":"integer","name":"Report number 2","length":1}]},{"id":6,"name":"FIRMWARE_UPDATE_MD_REPORT","status":"active","params":[{"type":"bitfield","name":"Properties1","length":1,"fields":[{"type":"int","name":"Report number 1","mask":127,"shift":0},{"type":"bool","name":"Last","mask":128,"shift":7}]},{"type":"integer","name":"Report number 2","length":1},{"type":"blob","name":"Data","length":"auto"},{"type":"integer","name":"Checksum","length":2}]},{"id":3,"name":"FIRMWARE_UPDATE_MD_REQUEST_GET","status":"active","params":[{"type":"integer","name":"Manufacturer ID","length":2},{"type":"integer","name":"Firmware ID","length":2},{"type":"integer","name":"Checksum","length":2},{"type":"integer","name":"Firmware Target","length":1},{"type":"integer","name":"Fragment Size","length":2},{"type":"bitfield","name":"Properties1","length":1,"fields":[{"type":"bool","name":"Activation","mask":1,"shift":0},{"type":"int","name":"Reserved","mask":254,"shift":1}]},{"type":"integer","name":"Hardware Version","length":1}]},{"id":4,"name":"FIRMWARE_UPDATE_MD_REQUEST_REPORT","status":"active","params":[{"type":"enum","name":"Status","length":1,"values":{"0":"Invalid combination","1":"Requires authentication","2":"Invalid Fragment Size","3":"Not upgradable","4":"Invalid Hardware Version","255":"Valid combination"}}]},{"id":7,"name":"FIRMWARE_UPDATE_MD_STATUS_REPORT","status":"active","params":[{"type":"enum","name":"Status","length":1,"values":{"0":"unable to receive without checksum error","1":"unable to receive","2":"does not match the Manufacturer ID","3":"does not match the Firmware ID","4":"does not match the Firmware Target","5":"Invalid file header information","6":"Invalid file header format","7":"Insufficient memory","8":"does not match the Hardware version","253":"successfully, waiting for activation","254":"successfully stored","255":"successfully"}},{"type":"integer","name":"WaitTime","length":2}]},{"id":8,"name":"FIRMWARE_UPDATE_ACTIVATION_SET","status":"active","params":[{"type":"integer","name":"Manufacturer ID","length":2},{"type":"integer","name":"Firmware ID","length":2},{"type":"integer","name":"Checksum","length":2},{"type":"integer","name":"Firmware Target","length":1},{"type":"integer","name":"Hardware Version","length":1}]},{"id":9,"name":"FIRMWARE_UPDATE_ACTIVATION_STATUS_REPORT","status":"active","params":[{"type":"integer","name":"Manufacturer ID","length":2},{"type":"integer","name":"Firmware ID","length":2},{"type":"integer","name":"Checksum","length":2},{"type":"integer","name":"Firmware Target","length":1},{"type":"enum","name":"Firmware Update Status","length":1,"values":{"0":"Invalid combination","1":"Error activating the firmware","255":"Firmware update completed successfully"}},{"type":"integer","name":"Hardware Version","length":1}]},{"id":10,"name":"FIRMWARE_UPDATE_MD_PREPARE_GET","status":"active","params":[{"type":"integer","name":"Manufacturer ID","length":2},{"type":"integer","name":"Firmware ID","length":2},{"type":"integer","name":"Firmware Target","length":1},{"type":"integer","name":"Fragment Size","length":2},{"type":"integer","name":"Hardware Version","length":1}]},{"id":11,"name":"FIRMWARE_UPDATE_MD_PREPARE_REPORT","status":"active","params":[{"type":"enum","name":"Status","length":1,"values":{"0":"Invalid combination","1":"Requires authentication","2":"Invalid Fragment Size","3":"Not upgradable","4":"Invalid Hardware Version","255":"Valid combination"}},{"type":"integer","name":"Firmware Checksum","length":2}]}]};
}

export interface FirmwareMdGet {
	_commandClass: 0x7a; // (122)
	_command: 0x1; // (1)
}

export interface FirmwareMdReport {
	_commandClass: 0x7a; // (122)
	_command: 0x2; // (2)
	manufacturerID: number; // 2 byte unsigned integer
	firmware0ID: number; // 2 byte unsigned integer
	firmware0Checksum: number; // 2 byte unsigned integer
	firmwareUpgradable: number; // 1 byte unsigned integer
	numberOfFirmwareTargets: number; // 1 byte unsigned integer
	maxFragmentSize: number; // 2 byte unsigned integer
	// TODO param vg1 type group
	hardwareVersion: number; // 1 byte unsigned integer
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
	checksum: number; // 2 byte unsigned integer
}

export interface FirmwareUpdateMdRequestGet {
	_commandClass: 0x7a; // (122)
	_command: 0x3; // (3)
	manufacturerID: number; // 2 byte unsigned integer
	firmwareID: number; // 2 byte unsigned integer
	checksum: number; // 2 byte unsigned integer
	firmwareTarget: number; // 1 byte unsigned integer
	fragmentSize: number; // 2 byte unsigned integer
	// TODO param Properties1 type bitfield
	hardwareVersion: number; // 1 byte unsigned integer
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
	waitTime: number; // 2 byte unsigned integer
}

export interface FirmwareUpdateActivationSet {
	_commandClass: 0x7a; // (122)
	_command: 0x8; // (8)
	manufacturerID: number; // 2 byte unsigned integer
	firmwareID: number; // 2 byte unsigned integer
	checksum: number; // 2 byte unsigned integer
	firmwareTarget: number; // 1 byte unsigned integer
	hardwareVersion: number; // 1 byte unsigned integer
}

export interface FirmwareUpdateActivationStatusReport {
	_commandClass: 0x7a; // (122)
	_command: 0x9; // (9)
	manufacturerID: number; // 2 byte unsigned integer
	firmwareID: number; // 2 byte unsigned integer
	checksum: number; // 2 byte unsigned integer
	firmwareTarget: number; // 1 byte unsigned integer
	firmwareUpdateStatus: FirmwareUpdateStatusEnum; // 1 byte enum value
	hardwareVersion: number; // 1 byte unsigned integer
}

export interface FirmwareUpdateMdPrepareGet {
	_commandClass: 0x7a; // (122)
	_command: 0xa; // (10)
	manufacturerID: number; // 2 byte unsigned integer
	firmwareID: number; // 2 byte unsigned integer
	firmwareTarget: number; // 1 byte unsigned integer
	fragmentSize: number; // 2 byte unsigned integer
	hardwareVersion: number; // 1 byte unsigned integer
}

export interface FirmwareUpdateMdPrepareReport {
	_commandClass: 0x7a; // (122)
	_command: 0xb; // (11)
	status: StatusEnum; // 1 byte enum value
	firmwareChecksum: number; // 2 byte unsigned integer
}

export enum StatusEnum {
	InvalidCombination = 0x0,
	RequiresAuthentication = 0x1,
	InvalidFragmentSize = 0x2,
	NotUpgradable = 0x3,
	InvalidHardwareVersion = 0x4,
	ValidCombination = 0xff,
}

export enum Status2Enum {
	UnableToReceiveWithoutChecksumError = 0x0,
	UnableToReceive = 0x1,
	DoesNotMatchTheManufacturerID = 0x2,
	DoesNotMatchTheFirmwareID = 0x3,
	DoesNotMatchTheFirmwareTarget = 0x4,
	InvalidFileHeaderInformation = 0x5,
	InvalidFileHeaderFormat = 0x6,
	InsufficientMemory = 0x7,
	DoesNotMatchTheHardwareVersion = 0x8,
	SuccessfullyWaitingForActivation = 0xfd,
	SuccessfullyStored = 0xfe,
	Successfully = 0xff,
}

export enum FirmwareUpdateStatusEnum {
	InvalidCombination = 0x0,
	ErrorActivatingTheFirmware = 0x1,
	FirmwareUpdateCompletedSuccessfully = 0xff,
}
