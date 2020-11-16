/* Auto-generated */

export class CommandClassRateTblConfigV1 {
	public static readonly commandClass = 0x48; // (72);
	public static readonly definition = {"id":72,"name":"COMMAND_CLASS_RATE_TBL_CONFIG","status":"active","version":1,"commands":[{"id":2,"name":"RATE_TBL_REMOVE","status":"active","params":[{"type":"bitfield","name":"Properties1","length":1,"fields":[{"type":"int","name":"Rate Parameter Set IDs","mask":63,"shift":0},{"type":"int","name":"Reserved","mask":192,"shift":6}]},{"type":"blob","name":"Rate Parameter Set ID","length":{"name":"Properties1","mask":63,"shift":0}}]},{"id":1,"name":"RATE_TBL_SET","status":"active","params":[{"type":"integer","name":"Rate Parameter Set ID","length":1},{"type":"bitfield","name":"Properties1","length":1,"fields":[{"type":"int","name":"Number of Rate Char","mask":31,"shift":0},{"type":"int","name":"Rate Type","mask":96,"shift":5},{"type":"bool","name":"Reserved","mask":128,"shift":7}]},{"type":"blob","name":"Rate Character","length":{"name":"Properties1","mask":31,"shift":0}},{"type":"integer","name":"Start Hour Local Time","length":1},{"type":"integer","name":"Start Minute Local Time","length":1},{"type":"integer","name":"Duration Minute","length":2},{"type":"bitfield","name":"Properties2","length":1,"fields":[{"type":"int","name":"Consumption Scale","mask":31,"shift":0},{"type":"int","name":"Consumption Precision","mask":224,"shift":5}]},{"type":"integer","name":"Min Consumption Value","length":4},{"type":"integer","name":"Max Consumption Value","length":4},{"type":"bitfield","name":"Properties3","length":1,"fields":[{"type":"int","name":"Max Demand Scale","mask":31,"shift":0},{"type":"int","name":"Max Demand Precision","mask":224,"shift":5}]},{"type":"integer","name":"Max Demand Value","length":4},{"type":"integer","name":"DCP Rate ID","length":1}]}]};
}

export interface RateTblRemove {
	_commandClass: 0x48; // (72)
	_command: 0x2; // (2)
	// TODO param Properties1 type bitfield
	// TODO param Rate Parameter Set ID type blob
}

export interface RateTblSet {
	_commandClass: 0x48; // (72)
	_command: 0x1; // (1)
	rateParameterSetID: number; // 1 byte unsigned integer
	// TODO param Properties1 type bitfield
	// TODO param Rate Character type blob
	startHourLocalTime: number; // 1 byte unsigned integer
	startMinuteLocalTime: number; // 1 byte unsigned integer
	durationMinute: number; // 2 byte unsigned integer
	// TODO param Properties2 type bitfield
	minConsumptionValue: number; // 4 byte unsigned integer
	maxConsumptionValue: number; // 4 byte unsigned integer
	// TODO param Properties3 type bitfield
	maxDemandValue: number; // 4 byte unsigned integer
	dCPRateID: number; // 1 byte unsigned integer
}
