/* Auto-generated */

export class CommandClassZipPortalV1 {
	public static readonly commandClass = 0x61; // (97);
	public static readonly definition = {"id":97,"name":"COMMAND_CLASS_ZIP_PORTAL","status":"active","version":1,"commands":[{"id":1,"name":"GATEWAY_CONFIGURATION_SET","status":"active","params":[{"type":"blob","name":"LAN IPv6 Address","length":16},{"type":"integer","name":"LAN IPv6 Prefix Length","length":1},{"type":"blob","name":"Portal IPv6 Prefix","length":16},{"type":"integer","name":"Portal IPv6 Prefix Length","length":1},{"type":"blob","name":"Default Gateway IPv6 Address","length":16},{"type":"blob","name":"PAN IPv6 Prefix","length":16}]},{"id":2,"name":"GATEWAY_CONFIGURATION_STATUS","status":"active","params":[{"type":"integer","name":"Status","length":1}]},{"id":3,"name":"GATEWAY_CONFIGURATION_GET","status":"active","params":[]},{"id":4,"name":"GATEWAY_CONFIGURATION_REPORT","status":"active","params":[{"type":"blob","name":"LAN IPv6 Address","length":16},{"type":"integer","name":"LAN IPv6 Prefix Length","length":1},{"type":"blob","name":"Portal IPv6 Prefix","length":16},{"type":"integer","name":"Portal IPv6 Prefix Length","length":1},{"type":"blob","name":"Default Gateway IPv6 Address","length":16},{"type":"blob","name":"PAN IPv6 Prefix","length":16}]}]};
}

export interface GatewayConfigurationSet {
	_commandClass: 0x61; // (97)
	_command: 0x1; // (1)
	// TODO param LAN IPv6 Address type blob
	lANIPv6PrefixLength: number; // 1 byte unsigned integer
	// TODO param Portal IPv6 Prefix type blob
	portalIPv6PrefixLength: number; // 1 byte unsigned integer
	// TODO param Default Gateway IPv6 Address type blob
	// TODO param PAN IPv6 Prefix type blob
}

export interface GatewayConfigurationStatus {
	_commandClass: 0x61; // (97)
	_command: 0x2; // (2)
	status: number; // 1 byte unsigned integer
}

export interface GatewayConfigurationGet {
	_commandClass: 0x61; // (97)
	_command: 0x3; // (3)
}

export interface GatewayConfigurationReport {
	_commandClass: 0x61; // (97)
	_command: 0x4; // (4)
	// TODO param LAN IPv6 Address type blob
	lANIPv6PrefixLength: number; // 1 byte unsigned integer
	// TODO param Portal IPv6 Prefix type blob
	portalIPv6PrefixLength: number; // 1 byte unsigned integer
	// TODO param Default Gateway IPv6 Address type blob
	// TODO param PAN IPv6 Prefix type blob
}
