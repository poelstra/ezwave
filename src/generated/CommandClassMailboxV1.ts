/* Auto-generated */

export class CommandClassMailboxV1 {
	public static readonly commandClass = 0x69; // (105);
	public static readonly definition = {"id":105,"name":"COMMAND_CLASS_MAILBOX","status":"active","version":1,"commands":[{"id":1,"name":"MAILBOX_CONFIGURATION_GET","status":"active","params":[]},{"id":2,"name":"MAILBOX_CONFIGURATION_SET","status":"active","params":[{"type":"bitfield","name":"Properties1","length":1,"fields":[{"type":"enum","name":"Mode","mask":7,"shift":0,"values":{"0":"Disable","1":"Enable Mailbox Service","2":"Enable Mailbox Proxy"}},{"type":"int","name":"Reserved","mask":248,"shift":3}]},{"type":"blob","name":"Forwarding Destination IPv6 Address","length":16},{"type":"integer","name":"UDP Port Number","length":2}]},{"id":3,"name":"MAILBOX_CONFIGURATION_REPORT","status":"active","params":[{"type":"bitfield","name":"Properties1","length":1,"fields":[{"type":"enum","name":"Mode","mask":7,"shift":0,"values":{"0":"Disable","1":"Enable Mailbox Service","2":"Enable Mailbox Proxy"}},{"type":"enum","name":"Supported Modes","mask":24,"shift":3,"values":{"0":"Mailbox Service supported","1":"Mailbox Proxy supported"}},{"type":"int","name":"Reserved","mask":224,"shift":5}]},{"type":"integer","name":"Mailbox Capacity","length":2},{"type":"blob","name":"Forwarding Destination IPv6 Address","length":16},{"type":"integer","name":"UDP Port Number","length":2}]},{"id":4,"name":"MAILBOX_QUEUE","status":"active","params":[{"type":"integer","name":"Sequence Number","length":1},{"type":"bitfield","name":"Properties1","length":1,"fields":[{"type":"enum","name":"Mode","mask":3,"shift":0,"values":{"0":"Push","1":"Pop","2":"Waiting","3":"Ping","4":"ACK","5":"NACK","6":"Queue Full"}},{"type":"bool","name":"Last","mask":4,"shift":2},{"type":"int","name":"Reserved","mask":248,"shift":3}]},{"type":"integer","name":"Queue Handle","length":1},{"type":"blob","name":"Mailbox Entry","length":"auto"}]},{"id":5,"name":"MAILBOX_WAKEUP_NOTIFICATION","status":"active","params":[{"type":"integer","name":"Queue Handle","length":1}]},{"id":6,"name":"MAILBOX_NODE_FAILING","status":"active","params":[{"type":"integer","name":"Queue Handle","length":1}]}]};
}

export interface MailboxConfigurationGet {
	_commandClass: 0x69; // (105)
	_command: 0x1; // (1)
}

export interface MailboxConfigurationSet {
	_commandClass: 0x69; // (105)
	_command: 0x2; // (2)
	// TODO param Properties1 type bitfield
	// TODO param Forwarding Destination IPv6 Address type blob
	uDPPortNumber: number; // 2 byte unsigned integer
}

export interface MailboxConfigurationReport {
	_commandClass: 0x69; // (105)
	_command: 0x3; // (3)
	// TODO param Properties1 type bitfield
	mailboxCapacity: number; // 2 byte unsigned integer
	// TODO param Forwarding Destination IPv6 Address type blob
	uDPPortNumber: number; // 2 byte unsigned integer
}

export interface MailboxQueue {
	_commandClass: 0x69; // (105)
	_command: 0x4; // (4)
	sequenceNumber: number; // 1 byte unsigned integer
	// TODO param Properties1 type bitfield
	queueHandle: number; // 1 byte unsigned integer
	// TODO param Mailbox Entry type blob
}

export interface MailboxWakeupNotification {
	_commandClass: 0x69; // (105)
	_command: 0x5; // (5)
	queueHandle: number; // 1 byte unsigned integer
}

export interface MailboxNodeFailing {
	_commandClass: 0x69; // (105)
	_command: 0x6; // (6)
	queueHandle: number; // 1 byte unsigned integer
}
