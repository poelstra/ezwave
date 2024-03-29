/**
 * Command Class Z-Wave+ Info, version 2.
 *
 * Auto-generated, do not edit.
 */

import { CommandClasses, CommandClassPacket, CommandPacket, Packet } from "@ezwave/codec";
import { CommandDefinition, convertFromJsonCommand, JsonCommandDefinition } from "@ezwave/spec";

export enum ZwaveplusInfoV2Commands {
	ZwaveplusInfoGet = 0x01,
	ZwaveplusInfoReport = 0x02,
}

export interface ZwaveplusInfoV2ZwaveplusInfoReportData {
	zWaveVersion: number; // 1 byte unsigned integer
	roleType: RoleTypeEnum; // 1 byte enum value
	nodeType: NodeTypeEnum; // 1 byte enum value
	installerIconType: number; // 2 byte unsigned integer
	userIconType: number; // 2 byte unsigned integer
}

export enum RoleTypeEnum {
	RoleTypeControllerCentralStatic = 0x0,
	RoleTypeControllerSubStatic = 0x1,
	RoleTypeControllerPortable = 0x2,
	RoleTypeControllerPortableReporting = 0x3,
	RoleTypeSlavePortable = 0x4,
	RoleTypeSlaveAlwaysOn = 0x5,
	RoleTypeSlaveSleepingReporting = 0x6,
	RoleTypeSlaveSleepingListening = 0x7,
}

export enum NodeTypeEnum {
	NodeTypeZwaveplusNode = 0x0,
	NodeTypeZwaveplusForIpGateway = 0x2,
}

export class ZwaveplusInfoV2 extends CommandClassPacket<ZwaveplusInfoV2Commands> {
	public static readonly commandClass: number = CommandClasses.ZwaveplusInfo; // 0x5e (94)
	public static readonly version: number = 2;

	public static matches(packet: Packet): boolean {
		return packet.commandClass === this.commandClass;
	}

	public constructor(commandAndPayload: Buffer) {
		super(ZwaveplusInfoV2, commandAndPayload);
	}
}

export class ZwaveplusInfoGet extends CommandPacket<void> {
	public static readonly CommandClass: typeof ZwaveplusInfoV2 = ZwaveplusInfoV2;
	public static readonly command: number = 0x01; // 1
	public static readonly definition: CommandDefinition = convertFromJsonCommand({
		"command": 1,
		"name": "ZwaveplusInfoGet",
		"help": "Z-Wave+ Info Get",
		"status": "Active",
		"params": []
	} as JsonCommandDefinition);

	public static matches(packet: Packet): boolean {
		return packet.tryAs(ZwaveplusInfoV2)?.command === this.command;
	}

	public constructor(data: Buffer | void) {
		super(ZwaveplusInfoGet, data);
	}
};

export class ZwaveplusInfoReport extends CommandPacket<ZwaveplusInfoV2ZwaveplusInfoReportData> {
	public static readonly CommandClass: typeof ZwaveplusInfoV2 = ZwaveplusInfoV2;
	public static readonly command: number = 0x02; // 2
	public static readonly definition: CommandDefinition = convertFromJsonCommand({
		"command": 2,
		"name": "ZwaveplusInfoReport",
		"help": "Z-Wave+ Info Report",
		"status": "Active",
		"params": [
			{
				"type": "Integer",
				"name": "zWaveVersion",
				"help": "Z-Wave+ Version",
				"length": 1
			},
			{
				"type": "Enum",
				"name": "roleType",
				"help": "Role Type",
				"length": 1,
				"values": {
					"0": {
						"name": "RoleTypeControllerCentralStatic",
						"help": "ROLE_TYPE_CONTROLLER_CENTRAL_STATIC"
					},
					"1": {
						"name": "RoleTypeControllerSubStatic",
						"help": "ROLE_TYPE_CONTROLLER_SUB_STATIC"
					},
					"2": {
						"name": "RoleTypeControllerPortable",
						"help": "ROLE_TYPE_CONTROLLER_PORTABLE"
					},
					"3": {
						"name": "RoleTypeControllerPortableReporting",
						"help": "ROLE_TYPE_CONTROLLER_PORTABLE_REPORTING"
					},
					"4": {
						"name": "RoleTypeSlavePortable",
						"help": "ROLE_TYPE_SLAVE_PORTABLE"
					},
					"5": {
						"name": "RoleTypeSlaveAlwaysOn",
						"help": "ROLE_TYPE_SLAVE_ALWAYS_ON"
					},
					"6": {
						"name": "RoleTypeSlaveSleepingReporting",
						"help": "ROLE_TYPE_SLAVE_SLEEPING_REPORTING"
					},
					"7": {
						"name": "RoleTypeSlaveSleepingListening",
						"help": "ROLE_TYPE_SLAVE_SLEEPING_LISTENING"
					}
				}
			},
			{
				"type": "Enum",
				"name": "nodeType",
				"help": "Node Type",
				"length": 1,
				"values": {
					"0": {
						"name": "NodeTypeZwaveplusNode",
						"help": "NODE_TYPE_ZWAVEPLUS_NODE"
					},
					"2": {
						"name": "NodeTypeZwaveplusForIpGateway",
						"help": "NODE_TYPE_ZWAVEPLUS_FOR_IP_GATEWAY"
					}
				}
			},
			{
				"type": "Integer",
				"name": "installerIconType",
				"help": "Installer Icon Type",
				"length": 2
			},
			{
				"type": "Integer",
				"name": "userIconType",
				"help": "User Icon Type",
				"length": 2
			}
		]
	} as JsonCommandDefinition);

	public static matches(packet: Packet): boolean {
		return packet.tryAs(ZwaveplusInfoV2)?.command === this.command;
	}

	public constructor(data: Buffer | ZwaveplusInfoV2ZwaveplusInfoReportData) {
		super(ZwaveplusInfoReport, data);
	}
};
