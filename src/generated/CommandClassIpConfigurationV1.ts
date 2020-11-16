/* Auto-generated */

// obsolete
export class CommandClassIpConfigurationV1 {
	public static readonly commandClass = 0x9a; // (154);
	public static readonly definition = {"id":154,"name":"COMMAND_CLASS_IP_CONFIGURATION","status":"obsolete","version":1,"commands":[{"id":2,"name":"IP_CONFIGURATION_GET","status":"active","params":[]},{"id":4,"name":"IP_CONFIGURATION_RELEASE","status":"active","params":[]},{"id":5,"name":"IP_CONFIGURATION_RENEW","status":"active","params":[]},{"id":3,"name":"IP_CONFIGURATION_REPORT","status":"active","params":[{"type":"bitfield","name":"Properties1","length":1,"fields":[{"type":"bool","name":"Auto DNS","mask":1,"shift":0},{"type":"bool","name":"Auto IP","mask":2,"shift":1},{"type":"int","name":"Reserved","mask":252,"shift":2}]},{"type":"integer","name":"IP Address","length":4},{"type":"integer","name":"Subnet Mask","length":4},{"type":"integer","name":"Gateway","length":4},{"type":"integer","name":"DNS1","length":4},{"type":"integer","name":"DNS2","length":4},{"type":"integer","name":"LeaseTime","length":4}]},{"id":1,"name":"IP_CONFIGURATION_SET","status":"active","params":[{"type":"bitfield","name":"Properties1","length":1,"fields":[{"type":"bool","name":"Auto DNS","mask":1,"shift":0},{"type":"bool","name":"Auto IP","mask":2,"shift":1},{"type":"int","name":"Reserved","mask":252,"shift":2}]},{"type":"integer","name":"IP Address","length":4},{"type":"integer","name":"Subnet Mask","length":4},{"type":"integer","name":"Gateway","length":4},{"type":"integer","name":"DNS1","length":4},{"type":"integer","name":"DNS2","length":4}]}]};
}

export interface IpConfigurationGet {
	_commandClass: 0x9a; // (154)
	_command: 0x2; // (2)
}

export interface IpConfigurationRelease {
	_commandClass: 0x9a; // (154)
	_command: 0x4; // (4)
}

export interface IpConfigurationRenew {
	_commandClass: 0x9a; // (154)
	_command: 0x5; // (5)
}

export interface IpConfigurationReport {
	_commandClass: 0x9a; // (154)
	_command: 0x3; // (3)
	// TODO param Properties1 type bitfield
	iPAddress: number; // 4 byte unsigned integer
	subnetMask: number; // 4 byte unsigned integer
	gateway: number; // 4 byte unsigned integer
	dns1: number; // 4 byte unsigned integer
	dns2: number; // 4 byte unsigned integer
	leaseTime: number; // 4 byte unsigned integer
}

export interface IpConfigurationSet {
	_commandClass: 0x9a; // (154)
	_command: 0x1; // (1)
	// TODO param Properties1 type bitfield
	iPAddress: number; // 4 byte unsigned integer
	subnetMask: number; // 4 byte unsigned integer
	gateway: number; // 4 byte unsigned integer
	dns1: number; // 4 byte unsigned integer
	dns2: number; // 4 byte unsigned integer
}
