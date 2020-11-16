/* Auto-generated */

export class CommandClassMeterTblConfigV1 {
	public static readonly commandClass = 0x3c; // (60);
	public static readonly definition = {"id":60,"name":"COMMAND_CLASS_METER_TBL_CONFIG","status":"active","version":1,"commands":[{"id":1,"name":"METER_TBL_TABLE_POINT_ADM_NO_SET","status":"active","params":[{"type":"bitfield","name":"Properties1","length":1,"fields":[{"type":"int","name":"Number of Characters","mask":31,"shift":0},{"type":"int","name":"Reserved","mask":224,"shift":5}]},{"type":"blob","name":"Meter Point Adm Number Character","length":{"name":"Properties1","mask":31,"shift":0}}]}]};
}

export interface MeterTblTablePointAdmNoSet {
	_commandClass: 0x3c; // (60)
	_command: 0x1; // (1)
	// TODO param Properties1 type bitfield
	// TODO param Meter Point Adm Number Character type blob
}
