/**
 * Command Class Z-Wave+ Info, version 1.
 *
 * Auto-generated, do not edit.
 */

import { CommandClassPacket, CommandPacket } from "../commands/command";
import { Packet } from "../commands/packet";
import { CommandDefinition } from "../commands/types";
import CommandClasses from "../generated/CommandClasses";

export enum ZwaveplusInfoV1Commands {
	ZwaveplusInfoGet = 0x01,
	ZwaveplusInfoReport = 0x02,
}

export interface ZwaveplusInfoV1ZwaveplusInfoReportData {
	zWaveVersion: number; // 1 byte unsigned integer
	roleType: RoleTypeEnum; // 1 byte enum value
	nodeType: NodeTypeEnum; // 1 byte enum value
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
	NodeTypeZwaveplusForIpRouter = 0x1,
	NodeTypeZwaveplusForIpGateway = 0x2,
	NodeTypeZwaveplusForIpClientIpNode = 0x3,
	NodeTypeZwaveplusForIpClientZwaveNode = 0x4,
}

// Obsolete
export class ZwaveplusInfoV1 extends CommandClassPacket<ZwaveplusInfoV1Commands> {
	public static readonly commandClass = CommandClasses.ZwaveplusInfo; // 0x5e (94)

	public static matches(packet: Packet): boolean {
		return packet.commandClass === this.commandClass;
	}

	constructor(commandAndPayload: Buffer) {
		super(ZwaveplusInfoV1, commandAndPayload);
	}

	public static readonly ZwaveplusInfoGet = class ZwaveplusInfoGet extends CommandPacket<void> {
		public static readonly CommandClass = ZwaveplusInfoV1;
		public static readonly command = 0x01;
		public static readonly definition = {
			"command": 1,
			"name": "ZwaveplusInfoGet",
			"help": "Z-Wave+ Info Get",
			"status": "active",
			"params": []
		} as CommandDefinition;

		static matches(packet: Packet): boolean {
			return packet.tryAs(ZwaveplusInfoV1)?.command === this.command;
		}

		constructor(data: Buffer | void) {
			super(ZwaveplusInfoGet, data);
		}
	};

	public static readonly ZwaveplusInfoReport = class ZwaveplusInfoReport extends CommandPacket<ZwaveplusInfoV1ZwaveplusInfoReportData> {
		public static readonly CommandClass = ZwaveplusInfoV1;
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
					"type": "enum",
					"name": "nodeType",
					"help": "Node Type",
					"length": 1,
					"values": {
						"0": {
							"name": "NodeTypeZwaveplusNode",
							"help": "NODE_TYPE_ZWAVEPLUS_NODE"
						},
						"1": {
							"name": "NodeTypeZwaveplusForIpRouter",
							"help": "NODE_TYPE_ZWAVEPLUS_FOR_IP_ROUTER"
						},
						"2": {
							"name": "NodeTypeZwaveplusForIpGateway",
							"help": "NODE_TYPE_ZWAVEPLUS_FOR_IP_GATEWAY"
						},
						"3": {
							"name": "NodeTypeZwaveplusForIpClientIpNode",
							"help": "NODE_TYPE_ZWAVEPLUS_FOR_IP_CLIENT_IP_NODE"
						},
						"4": {
							"name": "NodeTypeZwaveplusForIpClientZwaveNode",
							"help": "NODE_TYPE_ZWAVEPLUS_FOR_IP_CLIENT_ZWAVE_NODE"
						}
					}
				}
			]
		} as CommandDefinition;

		static matches(packet: Packet): boolean {
			return packet.tryAs(ZwaveplusInfoV1)?.command === this.command;
		}

		constructor(data: Buffer | ZwaveplusInfoV1ZwaveplusInfoReportData) {
			super(ZwaveplusInfoReport, data);
		}
	};
}

export namespace ZwaveplusInfoV1 {
	export type ZwaveplusInfoGet = InstanceType<typeof ZwaveplusInfoV1.ZwaveplusInfoGet>;
	export type ZwaveplusInfoReport = InstanceType<typeof ZwaveplusInfoV1.ZwaveplusInfoReport>;
}
