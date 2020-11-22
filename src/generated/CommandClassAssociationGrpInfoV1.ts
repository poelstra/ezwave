/* Auto-generated */

export class CommandClassAssociationGrpInfoV1 {
	public static readonly commandClass = 0x59; // (89);
	public static readonly definition = {"id":89,"name":"COMMAND_CLASS_ASSOCIATION_GRP_INFO","status":"active","version":1,"commands":[{"id":1,"name":"ASSOCIATION_GROUP_NAME_GET","status":"active","params":[{"type":"integer","name":"Grouping Identifier","length":1}]},{"id":2,"name":"ASSOCIATION_GROUP_NAME_REPORT","status":"active","params":[{"type":"integer","name":"Grouping Identifier","length":1},{"type":"integer","name":"Length of Name","length":1},{"type":"text","name":"Name","length":{"name":"Length of Name","mask":255,"shift":0}}]},{"id":3,"name":"ASSOCIATION_GROUP_INFO_GET","status":"active","params":[{"type":"bitfield","name":"Properties1","length":1,"fields":[{"type":"int","name":"Reserved","mask":63,"shift":0},{"type":"bool","name":"List Mode","mask":64,"shift":6},{"type":"bool","name":"Refresh cache","mask":128,"shift":7}]},{"type":"integer","name":"Grouping Identifier","length":1}]},{"id":4,"name":"ASSOCIATION_GROUP_INFO_REPORT","status":"active","params":[{"type":"bitfield","name":"Properties1","length":1,"fields":[{"type":"int","name":"Group Count","mask":63,"shift":0},{"type":"bool","name":"Dynamic Info","mask":64,"shift":6},{"type":"bool","name":"List mode","mask":128,"shift":7}]},{"type":"group","name":"vg1","length":{"name":"Properties1","mask":63,"shift":0},"params":[{"type":"integer","name":"Grouping Identifier","length":1},{"type":"integer","name":"Mode","length":1},{"type":"enum","name":"Profile1","length":1,"values":{"0":"Profile General","32":"Profile Control","49":"Profile Sensor","113":"Profile Notification"}},{"type":"enumunion","name":"Profile2","length":1,"reference":{"name":"Profile1"},"enums":{"0":{"0":"Profile General NA","1":"Profile General Lifeline"},"32":{"1":"Profile Control KEY01","2":"Profile Control KEY02","3":"Profile Control KEY03","4":"Profile Control KEY04","5":"Profile Control KEY05","6":"Profile Control KEY06","7":"Profile Control KEY07","8":"Profile Control KEY08","9":"Profile Control KEY09","10":"Profile Control KEY10","11":"Profile Control KEY11","12":"Profile Control KEY12","13":"Profile Control KEY13","14":"Profile Control KEY14","15":"Profile Control KEY15","16":"Profile Control KEY16","17":"Profile Control KEY17","18":"Profile Control KEY18","19":"Profile Control KEY19","20":"Profile Control KEY20","21":"Profile Control KEY21","22":"Profile Control KEY22","23":"Profile Control KEY23","24":"Profile Control KEY24","25":"Profile Control KEY25","26":"Profile Control KEY26","27":"Profile Control KEY27","28":"Profile Control KEY28","29":"Profile Control KEY29","30":"Profile Control KEY30","31":"Profile Control KEY31","32":"Profile Control KEY32"}}},{"type":"integer","name":"Reserved","length":1},{"type":"integer","name":"Event Code","length":2}]}]},{"id":5,"name":"ASSOCIATION_GROUP_COMMAND_LIST_GET","status":"active","params":[{"type":"bitfield","name":"Properties1","length":1,"fields":[{"type":"int","name":"Reserved","mask":127,"shift":0},{"type":"bool","name":"Allow cache","mask":128,"shift":7}]},{"type":"integer","name":"Grouping Identifier","length":1}]},{"id":6,"name":"ASSOCIATION_GROUP_COMMAND_LIST_REPORT","status":"active","params":[{"type":"integer","name":"Grouping Identifier","length":1},{"type":"integer","name":"List Length","length":1},{"type":"blob","name":"Command","length":{"name":"List Length","mask":255,"shift":0}}]}]};
}

export interface AssociationGroupNameGet {
	_commandClass: 0x59; // (89)
	_command: 0x1; // (1)
	groupingIdentifier: number; // 1 byte unsigned integer
}

export interface AssociationGroupNameReport {
	_commandClass: 0x59; // (89)
	_command: 0x2; // (2)
	groupingIdentifier: number; // 1 byte unsigned integer
	lengthOfName: number; // 1 byte unsigned integer
	// TODO param Name type text
}

export interface AssociationGroupInfoGet {
	_commandClass: 0x59; // (89)
	_command: 0x3; // (3)
	// TODO param Properties1 type bitfield
	groupingIdentifier: number; // 1 byte unsigned integer
}

export interface AssociationGroupInfoReport {
	_commandClass: 0x59; // (89)
	_command: 0x4; // (4)
	// TODO param Properties1 type bitfield
	// TODO param vg1 type group
}

export interface AssociationGroupCommandListGet {
	_commandClass: 0x59; // (89)
	_command: 0x5; // (5)
	// TODO param Properties1 type bitfield
	groupingIdentifier: number; // 1 byte unsigned integer
}

export interface AssociationGroupCommandListReport {
	_commandClass: 0x59; // (89)
	_command: 0x6; // (6)
	groupingIdentifier: number; // 1 byte unsigned integer
	listLength: number; // 1 byte unsigned integer
	// TODO param Command type blob
}