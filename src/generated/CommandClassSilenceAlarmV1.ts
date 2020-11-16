/* Auto-generated */

export class CommandClassSilenceAlarmV1 {
	public static readonly commandClass = 0x9d; // (157);
	public static readonly definition = {"id":157,"name":"COMMAND_CLASS_SILENCE_ALARM","status":"active","version":1,"commands":[{"id":1,"name":"SENSOR_ALARM_SET","status":"active","params":[{"type":"integer","name":"Mode","length":1,"values":{"0":"Disable sounding of all sensor alarms","1":"Disable sounding of all sensor alarms independent of bit mask which have received the alarm","2":"Disable sounding of all sensor alarms according to bit mask","3":"Disable sounding of all sensor alarms according to bit mask which have received the alarm"}},{"type":"integer","name":"Seconds","length":2},{"type":"integer","name":"Number of Bit Masks","length":1},{"type":"blob","name":"Bit Mask","length":{"name":"Number of Bit Masks","mask":255,"shift":0}}]}]};
}

export interface SensorAlarmSet {
	_commandClass: 0x9d; // (157)
	_command: 0x1; // (1)
	mode: number; // 1 byte unsigned integer
	seconds: number; // 2 byte unsigned integer
	numberOfBitMasks: number; // 1 byte unsigned integer
	// TODO param Bit Mask type blob
}
