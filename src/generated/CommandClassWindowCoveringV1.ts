/* Auto-generated */

export class CommandClassWindowCoveringV1 {
	public static readonly commandClass = 0x6a; // (106);
	public static readonly definition = {"id":106,"name":"COMMAND_CLASS_WINDOW_COVERING","status":"active","version":1,"commands":[{"id":1,"name":"WINDOW_COVERING_SUPPORTED_GET","status":"active","params":[]},{"id":2,"name":"WINDOW_COVERING_SUPPORTED_REPORT","status":"active","params":[{"type":"bitfield","name":"Properties1","length":1,"fields":[{"type":"integer","name":"Number of Parameter Mask bytes","mask":15,"shift":0},{"type":"integer","name":"Reserved","mask":240,"shift":4}]},{"type":"integer","name":"Parameter Mask","length":0}]},{"id":3,"name":"WINDOW_COVERING_GET","status":"active","params":[{"type":"enum","name":"Parameter ID","length":1,"values":{"0":"out_left 1","1":"out_left 2","2":"out_right 1","3":"out_right 2","4":"in_left 1","5":"in_left 2","6":"in_right 1","7":"in_right 2","8":"in_right_left 1","9":"in_right_left 2","10":"Vertical slats angle 1","11":"Vertical slats angle 2","12":"out_bottom 1","13":"out_bottom 2","14":"out_top 1","15":"out_top 2","16":"in_bottom 1","17":"in_bottom 2","18":"in_top 2","19":"in_top_bottom 1","20":"in_top_bottom 2","21":"Horizontal slats angle 1","22":"Horizontal slats angle 2"}}]},{"id":4,"name":"WINDOW_COVERING_REPORT","status":"active","params":[{"type":"enum","name":"Parameter ID","length":1,"values":{"0":"out_left 1","1":"out_left 2","2":"out_right 1","3":"out_right 2","4":"in_left 1","5":"in_left 2","6":"in_right 1","7":"in_right 2","8":"in_right_left 1","9":"in_right_left 2","10":"Vertical slats angle 1","11":"Vertical slats angle 2","12":"out_bottom 1","13":"out_bottom 2","14":"out_top 1","15":"out_top 2","16":"in_bottom 1","17":"in_bottom 2","18":"in_top 2","19":"in_top_bottom 1","20":"in_top_bottom 2","21":"Horizontal slats angle 1","22":"Horizontal slats angle 2"}},{"type":"integer","name":"Current Value","length":1},{"type":"integer","name":"Target Value","length":1},{"type":"integer","name":"Duration","length":1}]},{"id":5,"name":"WINDOW_COVERING_SET","status":"active","params":[{"type":"bitfield","name":"Properties1","length":1,"fields":[{"type":"integer","name":"Parameter Count","mask":31,"shift":0},{"type":"integer","name":"Reserved","mask":224,"shift":5}]},{"type":"group","name":"vg1","length":{"name":"Properties1","mask":31,"shift":0},"params":[{"type":"enum","name":"Parameter ID","length":1,"values":{"0":"out_left 1","1":"out_left 2","2":"out_right 1","3":"out_right 2","4":"in_left 1","5":"in_left 2","6":"in_right 1","7":"in_right 2","8":"in_right_left 1","9":"in_right_left 2","10":"Vertical slats angle 1","11":"Vertical slats angle 2","12":"out_bottom 1","13":"out_bottom 2","14":"out_top 1","15":"out_top 2","16":"in_bottom 1","17":"in_bottom 2","18":"in_top 2","19":"in_top_bottom 1","20":"in_top_bottom 2","21":"Horizontal slats angle 1","22":"Horizontal slats angle 2"}},{"type":"integer","name":"Value","length":1}]},{"type":"integer","name":"Duration","length":1}]},{"id":6,"name":"WINDOW_COVERING_START_LEVEL_CHANGE","status":"active","params":[{"type":"bitfield","name":"Properties1","length":1,"fields":[{"type":"integer","name":"Res1","mask":63,"shift":0},{"type":"bool","name":"Up Down","mask":64,"shift":6},{"type":"bool","name":"Res2","mask":128,"shift":7}]},{"type":"enum","name":"Parameter ID","length":1,"values":{"0":"out_left 1","1":"out_left 2","2":"out_right 1","3":"out_right 2","4":"in_left 1","5":"in_left 2","6":"in_right 1","7":"in_right 2","8":"in_right_left 1","9":"in_right_left 2","10":"Vertical slats angle 1","11":"Vertical slats angle 2","12":"out_bottom 1","13":"out_bottom 2","14":"out_top 1","15":"out_top 2","16":"in_bottom 1","17":"in_bottom 2","18":"in_top 2","19":"in_top_bottom 1","20":"in_top_bottom 2","21":"Horizontal slats angle 1","22":"Horizontal slats angle 2"}},{"type":"integer","name":"Duration","length":1}]},{"id":7,"name":"WINDOW_COVERING_STOP_LEVEL_CHANGE","status":"active","params":[{"type":"enum","name":"Parameter ID","length":1,"values":{"0":"out_left 1","1":"out_left 2","2":"out_right 1","3":"out_right 2","4":"in_left 1","5":"in_left 2","6":"in_right 1","7":"in_right 2","8":"in_right_left 1","9":"in_right_left 2","10":"Vertical slats angle 1","11":"Vertical slats angle 2","12":"out_bottom 1","13":"out_bottom 2","14":"out_top 1","15":"out_top 2","16":"in_bottom 1","17":"in_bottom 2","18":"in_top 2","19":"in_top_bottom 1","20":"in_top_bottom 2","21":"Horizontal slats angle 1","22":"Horizontal slats angle 2"}}]}]};
}

export interface WindowCoveringSupportedGet {
	_commandClass: 0x6a; // (106)
	_command: 0x1; // (1)
}

export interface WindowCoveringSupportedReport {
	_commandClass: 0x6a; // (106)
	_command: 0x2; // (2)
	// TODO param Properties1 type bitfield
	parameterMask: number; // 0 byte unsigned integer
}

export interface WindowCoveringGet {
	_commandClass: 0x6a; // (106)
	_command: 0x3; // (3)
	parameterID: ParameterIDEnum; // 1 byte enum value
}

export interface WindowCoveringReport {
	_commandClass: 0x6a; // (106)
	_command: 0x4; // (4)
	parameterID: ParameterIDEnum; // 1 byte enum value
	currentValue: number; // 1 byte unsigned integer
	targetValue: number; // 1 byte unsigned integer
	duration: number; // 1 byte unsigned integer
}

export interface WindowCoveringSet {
	_commandClass: 0x6a; // (106)
	_command: 0x5; // (5)
	// TODO param Properties1 type bitfield
	// TODO param vg1 type group
	duration: number; // 1 byte unsigned integer
}

export interface WindowCoveringStartLevelChange {
	_commandClass: 0x6a; // (106)
	_command: 0x6; // (6)
	// TODO param Properties1 type bitfield
	parameterID: ParameterIDEnum; // 1 byte enum value
	duration: number; // 1 byte unsigned integer
}

export interface WindowCoveringStopLevelChange {
	_commandClass: 0x6a; // (106)
	_command: 0x7; // (7)
	parameterID: ParameterIDEnum; // 1 byte enum value
}

export enum ParameterIDEnum {
	OutLeft1 = 0x0,
	OutLeft2 = 0x1,
	OutRight1 = 0x2,
	OutRight2 = 0x3,
	InLeft1 = 0x4,
	InLeft2 = 0x5,
	InRight1 = 0x6,
	InRight2 = 0x7,
	InRightLeft1 = 0x8,
	InRightLeft2 = 0x9,
	VerticalSlatsAngle1 = 0xa,
	VerticalSlatsAngle2 = 0xb,
	OutBottom1 = 0xc,
	OutBottom2 = 0xd,
	OutTop1 = 0xe,
	OutTop2 = 0xf,
	InBottom1 = 0x10,
	InBottom2 = 0x11,
	InTop2 = 0x12,
	InTopBottom1 = 0x13,
	InTopBottom2 = 0x14,
	HorizontalSlatsAngle1 = 0x15,
	HorizontalSlatsAngle2 = 0x16,
}
