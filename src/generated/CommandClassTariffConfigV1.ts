/* Auto-generated */

export class CommandClassTariffConfigV1 {
	public static readonly commandClass = 0x4a; // (74);
	public static readonly definition = {"id":74,"name":"COMMAND_CLASS_TARIFF_CONFIG","status":"active","version":1,"commands":[{"id":3,"name":"TARIFF_TBL_REMOVE","status":"active","params":[{"type":"bitfield","name":"Properties1","length":1,"fields":[{"type":"int","name":"Rate Parameter Set IDs","mask":63,"shift":0},{"type":"int","name":"Reserved","mask":192,"shift":6}]},{"type":"blob","name":"Rate Parameter Set ID","length":{"name":"Properties1","mask":63,"shift":0}}]},{"id":2,"name":"TARIFF_TBL_SET","status":"active","params":[{"type":"integer","name":"Rate Parameter Set ID","length":1},{"type":"bitfield","name":"Properties1","length":1,"fields":[{"type":"int","name":"Reserved","mask":31,"shift":0},{"type":"int","name":"Tariff Precision","mask":224,"shift":5}]},{"type":"integer","name":"Tariff Value","length":4}]},{"id":1,"name":"TARIFF_TBL_SUPPLIER_SET","status":"active","params":[{"type":"integer","name":"Year","length":2},{"type":"integer","name":"Month","length":1},{"type":"integer","name":"Day","length":1},{"type":"integer","name":"Hour Local Time","length":1},{"type":"integer","name":"Minute Local Time","length":1},{"type":"integer","name":"Second Local Time","length":1},{"type":"integer","name":"Currency","length":3},{"type":"bitfield","name":"Properties1","length":1,"fields":[{"type":"int","name":"Standing Charge Period","mask":31,"shift":0},{"type":"int","name":"Standing Charge Precision","mask":224,"shift":5}]},{"type":"integer","name":"Standing Charge Value","length":4},{"type":"bitfield","name":"Properties2","length":1,"fields":[{"type":"int","name":"Number of Supplier Characters","mask":31,"shift":0},{"type":"int","name":"Reserved","mask":224,"shift":5}]},{"type":"blob","name":"Supplier Character","length":{"name":"Properties2","mask":31,"shift":0}}]}]};
}

export interface TariffTblRemove {
	_commandClass: 0x4a; // (74)
	_command: 0x3; // (3)
	// TODO param Properties1 type bitfield
	// TODO param Rate Parameter Set ID type blob
}

export interface TariffTblSet {
	_commandClass: 0x4a; // (74)
	_command: 0x2; // (2)
	rateParameterSetID: number; // 1 byte unsigned integer
	// TODO param Properties1 type bitfield
	tariffValue: number; // 4 byte unsigned integer
}

export interface TariffTblSupplierSet {
	_commandClass: 0x4a; // (74)
	_command: 0x1; // (1)
	year: number; // 2 byte unsigned integer
	month: number; // 1 byte unsigned integer
	day: number; // 1 byte unsigned integer
	hourLocalTime: number; // 1 byte unsigned integer
	minuteLocalTime: number; // 1 byte unsigned integer
	secondLocalTime: number; // 1 byte unsigned integer
	currency: number; // 3 byte unsigned integer
	// TODO param Properties1 type bitfield
	standingChargeValue: number; // 4 byte unsigned integer
	// TODO param Properties2 type bitfield
	// TODO param Supplier Character type blob
}
