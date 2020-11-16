/* Auto-generated */

export class CommandClassPrepaymentV1 {
	public static readonly commandClass = 0x3f; // (63);
	public static readonly definition = {"id":63,"name":"COMMAND_CLASS_PREPAYMENT","status":"active","version":1,"commands":[{"id":1,"name":"PREPAYMENT_BALANCE_GET","status":"active","params":[{"type":"bitfield","name":"Properties1","length":1,"fields":[{"type":"int","name":"Reserved","mask":63,"shift":0},{"type":"enum","name":"Balance Type","mask":192,"shift":6,"values":{"0":"Utility","1":"Monetary"}}]}]},{"id":2,"name":"PREPAYMENT_BALANCE_REPORT","status":"active","params":[{"type":"bitfield","name":"Properties1","length":1,"fields":[{"type":"int","name":"Meter type","mask":63,"shift":0},{"type":"int","name":"Balance Type","mask":192,"shift":6}]},{"type":"bitfield","name":"Properties2","length":1,"fields":[{"type":"int","name":"Scale","mask":31,"shift":0},{"type":"int","name":"Balance Precision","mask":224,"shift":5}]},{"type":"integer","name":"Balance Value","length":4},{"type":"bitfield","name":"Properties3","length":1,"fields":[{"type":"int","name":"Reserved1","mask":31,"shift":0},{"type":"int","name":"Debt Precision","mask":224,"shift":5}]},{"type":"integer","name":"Debt","length":4},{"type":"bitfield","name":"Properties4","length":1,"fields":[{"type":"int","name":"Reserved2","mask":31,"shift":0},{"type":"int","name":"Emer Credit Precision","mask":224,"shift":5}]},{"type":"integer","name":"Emer Credit","length":4},{"type":"integer","name":"Currency","length":3},{"type":"integer","name":"Debt Recovery Percentage","length":1}]},{"id":3,"name":"PREPAYMENT_SUPPORTED_GET","status":"active","params":[]},{"id":4,"name":"PREPAYMENT_SUPPORTED_REPORT","status":"active","params":[{"type":"bitfield","name":"Properties1","length":1,"fields":[{"type":"int","name":"Types Supported","mask":15,"shift":0},{"type":"int","name":"Reserved","mask":240,"shift":4}]}]}]};
}

export interface PrepaymentBalanceGet {
	_commandClass: 0x3f; // (63)
	_command: 0x1; // (1)
	// TODO param Properties1 type bitfield
}

export interface PrepaymentBalanceReport {
	_commandClass: 0x3f; // (63)
	_command: 0x2; // (2)
	// TODO param Properties1 type bitfield
	// TODO param Properties2 type bitfield
	balanceValue: number; // 4 byte unsigned integer
	// TODO param Properties3 type bitfield
	debt: number; // 4 byte unsigned integer
	// TODO param Properties4 type bitfield
	emerCredit: number; // 4 byte unsigned integer
	currency: number; // 3 byte unsigned integer
	debtRecoveryPercentage: number; // 1 byte unsigned integer
}

export interface PrepaymentSupportedGet {
	_commandClass: 0x3f; // (63)
	_command: 0x3; // (3)
}

export interface PrepaymentSupportedReport {
	_commandClass: 0x3f; // (63)
	_command: 0x4; // (4)
	// TODO param Properties1 type bitfield
}
