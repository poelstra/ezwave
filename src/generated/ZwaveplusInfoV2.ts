/**
 * Command Class Z-Wave+ Info, version 2.
 *
 * Auto-generated, do not edit.
 */

import { CommandClassPacket, CommandPacket } from "../commands/command";
import { Packet } from "../commands/packet";
import { CommandDefinition } from "../commands/types";
import CommandClasses from "../generated/CommandClasses";

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

export class ZwaveplusInfoV2 extends CommandClassPacket<ZwaveplusInfoV2Commands> {
	public static readonly commandClass = CommandClasses.ZwaveplusInfo; // 0x5e (94)

	public static matches(packet: Packet): boolean {
		return packet.commandClass === this.commandClass;
	}

	constructor(commandAndPayload: Buffer) {
		super(ZwaveplusInfoV2, commandAndPayload);
	}

	public static readonly ZwaveplusInfoGet = class ZwaveplusInfoGet extends CommandPacket<void> {
		public static readonly CommandClass = ZwaveplusInfoV2;
		public static readonly command = 0x01;
		public static readonly definition = {
			"command": 1,
			"name": "ZwaveplusInfoGet",
			"help": "Z-Wave+ Info Get",
			"status": "active",
			"params": []
		} as CommandDefinition;

		static matches(packet: Packet): boolean {
			return packet.tryAs(ZwaveplusInfoV2)?.command === this.command;
		}

		constructor(data: Buffer | void) {
			super(ZwaveplusInfoGet, data);
		}
	};

	public static readonly ZwaveplusInfoReport = class ZwaveplusInfoReport extends CommandPacket<ZwaveplusInfoV2ZwaveplusInfoReportData> {
		public static readonly CommandClass = ZwaveplusInfoV2;
		public static readonly command = 0x02;
		public static readonly definition = {
			"command": 2,
			"name": "ZwaveplusInfoReport",
			"help": "Z-Wave+ Info Report",
			"status": "active",
			"params": [
				{
					"type": "integer",
					"name": "zWaveVersion",
					"help": "Z-Wave+ Version",
					"length": 1
				},
				{
					"type": "enum",
					"name": "roleType",
					"help": "Role Type",
					"length": 1,
					"values": {
						"0": "ROLE_TYPE_CONTROLLER_CENTRAL_STATIC",
						"1": "ROLE_TYPE_CONTROLLER_SUB_STATIC",
						"2": "ROLE_TYPE_CONTROLLER_PORTABLE",
						"3": "ROLE_TYPE_CONTROLLER_PORTABLE_REPORTING",
						"4": "ROLE_TYPE_SLAVE_PORTABLE",
						"5": "ROLE_TYPE_SLAVE_ALWAYS_ON",
						"6": "ROLE_TYPE_SLAVE_SLEEPING_REPORTING",
						"7": "ROLE_TYPE_SLAVE_SLEEPING_LISTENING"
					}
				},
				{
					"type": "enum",
					"name": "nodeType",
					"help": "Node Type",
					"length": 1,
					"values": {
						"0": "NODE_TYPE_ZWAVEPLUS_NODE",
						"2": "NODE_TYPE_ZWAVEPLUS_FOR_IP_GATEWAY"
					}
				},
				{
					"type": "integer",
					"name": "installerIconType",
					"help": "Installer Icon Type",
					"length": 2
				},
				{
					"type": "integer",
					"name": "userIconType",
					"help": "User Icon Type",
					"length": 2
				}
			]
		} as CommandDefinition;

		static matches(packet: Packet): boolean {
			return packet.tryAs(ZwaveplusInfoV2)?.command === this.command;
		}

		constructor(data: Buffer | ZwaveplusInfoV2ZwaveplusInfoReportData) {
			super(ZwaveplusInfoReport, data);
		}
	};
}

export namespace ZwaveplusInfoV2 {
	export type ZwaveplusInfoGet = InstanceType<typeof ZwaveplusInfoV2.ZwaveplusInfoGet>;
	export type ZwaveplusInfoReport = InstanceType<typeof ZwaveplusInfoV2.ZwaveplusInfoReport>;
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
