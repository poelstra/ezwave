/**
 * Command Class Network Management Installation and Maintenance, version 1.
 *
 * Auto-generated, do not edit.
 */

import { CommandClassPacket, CommandPacket } from "../commands/command";
import { Packet } from "../commands/packet";
import { CommandDefinition } from "../commands/types";
import CommandClasses from "../generated/CommandClasses";

export enum NetworkManagementInstallationMaintenanceV1Commands {
	PriorityRouteSet = 0x01,
	PriorityRouteGet = 0x02,
	PriorityRouteReport = 0x03,
	StatisticsGet = 0x04,
	StatisticsReport = 0x05,
	StatisticsClear = 0x06,
}

export interface NetworkManagementInstallationMaintenanceV1PriorityRouteSetData {
	nodeID: number; // 1 byte unsigned integer
	repeater1: number; // 1 byte unsigned integer
	repeater2: number; // 1 byte unsigned integer
	repeater3: number; // 1 byte unsigned integer
	repeater4: number; // 1 byte unsigned integer
	speed: SpeedEnum; // 1 byte enum value
}

export interface NetworkManagementInstallationMaintenanceV1PriorityRouteGetData {
	nodeID: number; // 1 byte unsigned integer
}

export interface NetworkManagementInstallationMaintenanceV1PriorityRouteReportData {
	nodeID: number; // 1 byte unsigned integer
	type: TypeEnum; // 1 byte enum value
	repeater1: number; // 1 byte unsigned integer
	repeater2: number; // 1 byte unsigned integer
	repeater3: number; // 1 byte unsigned integer
	repeater4: number; // 1 byte unsigned integer
	speed: SpeedEnum; // 1 byte enum value
}

export interface NetworkManagementInstallationMaintenanceV1StatisticsGetData {
	nodeID: number; // 1 byte unsigned integer
}

export interface NetworkManagementInstallationMaintenanceV1StatisticsReportData {
	nodeID: number; // 1 byte unsigned integer
	// TODO param statistics type group
}

export enum SpeedEnum {
	_96KbitSec = 0x1,
	_40KbitSec = 0x2,
	_100KbitSec = 0x3,
}

export enum TypeEnum {
	None = 0x0,
	ZwPriorityRouteZwLwr = 0x1,
	ZwPriorityRouteZwNlwr = 0x2,
	ZwPriorityRouteAppPr = 0x10,
}

export class NetworkManagementInstallationMaintenanceV1 extends CommandClassPacket<NetworkManagementInstallationMaintenanceV1Commands> {
	public static readonly commandClass = CommandClasses.NetworkManagementInstallationMaintenance; // 0x67 (103)

	public static matches(packet: Packet): boolean {
		return packet.commandClass === this.commandClass;
	}

	constructor(commandAndPayload: Buffer) {
		super(NetworkManagementInstallationMaintenanceV1, commandAndPayload);
	}

	public static readonly PriorityRouteSet = class PriorityRouteSet extends CommandPacket<NetworkManagementInstallationMaintenanceV1PriorityRouteSetData> {
		public static readonly CommandClass = NetworkManagementInstallationMaintenanceV1;
		public static readonly command = 0x01;
		public static readonly definition = {
			"command": 1,
			"name": "PriorityRouteSet",
			"help": "Priority Route Set",
			"status": "active",
			"params": [
				{
					"type": "integer",
					"name": "nodeID",
					"help": "NodeID",
					"length": 1,
					"valueType": "NODE_NUMBER"
				},
				{
					"type": "integer",
					"name": "repeater1",
					"help": "Repeater 1",
					"length": 1,
					"valueType": "NODE_NUMBER"
				},
				{
					"type": "integer",
					"name": "repeater2",
					"help": "Repeater 2",
					"length": 1,
					"valueType": "NODE_NUMBER"
				},
				{
					"type": "integer",
					"name": "repeater3",
					"help": "Repeater 3",
					"length": 1,
					"valueType": "NODE_NUMBER"
				},
				{
					"type": "integer",
					"name": "repeater4",
					"help": "Repeater 4",
					"length": 1,
					"valueType": "NODE_NUMBER"
				},
				{
					"type": "enum",
					"name": "speed",
					"help": "Speed",
					"length": 1,
					"values": {
						"1": {
							"name": "96KbitSec",
							"help": "9.6 kbit/sec"
						},
						"2": {
							"name": "40KbitSec",
							"help": "40 kbit/sec"
						},
						"3": {
							"name": "100KbitSec",
							"help": "100 kbit/sec"
						}
					}
				}
			]
		} as CommandDefinition;

		static matches(packet: Packet): boolean {
			return packet.tryAs(NetworkManagementInstallationMaintenanceV1)?.command === this.command;
		}

		constructor(data: Buffer | NetworkManagementInstallationMaintenanceV1PriorityRouteSetData) {
			super(PriorityRouteSet, data);
		}
	};

	public static readonly PriorityRouteGet = class PriorityRouteGet extends CommandPacket<NetworkManagementInstallationMaintenanceV1PriorityRouteGetData> {
		public static readonly CommandClass = NetworkManagementInstallationMaintenanceV1;
		public static readonly command = 0x02;
		public static readonly definition = {
			"command": 2,
			"name": "PriorityRouteGet",
			"help": "Priority Route Get",
			"status": "active",
			"params": [
				{
					"type": "integer",
					"name": "nodeID",
					"help": "NodeID",
					"length": 1,
					"valueType": "NODE_NUMBER"
				}
			]
		} as CommandDefinition;

		static matches(packet: Packet): boolean {
			return packet.tryAs(NetworkManagementInstallationMaintenanceV1)?.command === this.command;
		}

		constructor(data: Buffer | NetworkManagementInstallationMaintenanceV1PriorityRouteGetData) {
			super(PriorityRouteGet, data);
		}
	};

	public static readonly PriorityRouteReport = class PriorityRouteReport extends CommandPacket<NetworkManagementInstallationMaintenanceV1PriorityRouteReportData> {
		public static readonly CommandClass = NetworkManagementInstallationMaintenanceV1;
		public static readonly command = 0x03;
		public static readonly definition = {
			"command": 3,
			"name": "PriorityRouteReport",
			"help": "Priority Route Report",
			"status": "active",
			"params": [
				{
					"type": "integer",
					"name": "nodeID",
					"help": "NodeID",
					"length": 1,
					"valueType": "NODE_NUMBER"
				},
				{
					"type": "enum",
					"name": "type",
					"help": "Type",
					"length": 1,
					"values": {
						"0": {
							"name": "None",
							"help": "None"
						},
						"1": {
							"name": "ZwPriorityRouteZwLwr",
							"help": "ZW_PRIORITY_ROUTE_ZW_LWR"
						},
						"2": {
							"name": "ZwPriorityRouteZwNlwr",
							"help": "ZW_PRIORITY_ROUTE_ZW_NLWR"
						},
						"16": {
							"name": "ZwPriorityRouteAppPr",
							"help": "ZW_PRIORITY_ROUTE_APP_PR"
						}
					}
				},
				{
					"type": "integer",
					"name": "repeater1",
					"help": "Repeater 1",
					"length": 1,
					"valueType": "NODE_NUMBER"
				},
				{
					"type": "integer",
					"name": "repeater2",
					"help": "Repeater 2",
					"length": 1,
					"valueType": "NODE_NUMBER"
				},
				{
					"type": "integer",
					"name": "repeater3",
					"help": "Repeater 3",
					"length": 1,
					"valueType": "NODE_NUMBER"
				},
				{
					"type": "integer",
					"name": "repeater4",
					"help": "Repeater 4",
					"length": 1,
					"valueType": "NODE_NUMBER"
				},
				{
					"type": "enum",
					"name": "speed",
					"help": "Speed",
					"length": 1,
					"values": {
						"1": {
							"name": "96KbitSec",
							"help": "9.6 kbit/sec"
						},
						"2": {
							"name": "40KbitSec",
							"help": "40 kbit/sec"
						},
						"3": {
							"name": "100KbitSec",
							"help": "100 kbit/sec"
						}
					}
				}
			]
		} as CommandDefinition;

		static matches(packet: Packet): boolean {
			return packet.tryAs(NetworkManagementInstallationMaintenanceV1)?.command === this.command;
		}

		constructor(data: Buffer | NetworkManagementInstallationMaintenanceV1PriorityRouteReportData) {
			super(PriorityRouteReport, data);
		}
	};

	public static readonly StatisticsGet = class StatisticsGet extends CommandPacket<NetworkManagementInstallationMaintenanceV1StatisticsGetData> {
		public static readonly CommandClass = NetworkManagementInstallationMaintenanceV1;
		public static readonly command = 0x04;
		public static readonly definition = {
			"command": 4,
			"name": "StatisticsGet",
			"help": "Statistics Get",
			"status": "active",
			"params": [
				{
					"type": "integer",
					"name": "nodeID",
					"help": "NodeID",
					"length": 1,
					"valueType": "NODE_NUMBER"
				}
			]
		} as CommandDefinition;

		static matches(packet: Packet): boolean {
			return packet.tryAs(NetworkManagementInstallationMaintenanceV1)?.command === this.command;
		}

		constructor(data: Buffer | NetworkManagementInstallationMaintenanceV1StatisticsGetData) {
			super(StatisticsGet, data);
		}
	};

	public static readonly StatisticsReport = class StatisticsReport extends CommandPacket<NetworkManagementInstallationMaintenanceV1StatisticsReportData> {
		public static readonly CommandClass = NetworkManagementInstallationMaintenanceV1;
		public static readonly command = 0x05;
		public static readonly definition = {
			"command": 5,
			"name": "StatisticsReport",
			"help": "Statistics Report",
			"status": "active",
			"params": [
				{
					"type": "integer",
					"name": "nodeID",
					"help": "NodeID",
					"length": 1,
					"valueType": "NODE_NUMBER"
				},
				{
					"type": "group",
					"name": "statistics",
					"help": "Statistics",
					"length": "auto",
					"params": [
						{
							"type": "enum",
							"name": "type",
							"help": "Type",
							"length": 1,
							"values": {
								"0": {
									"name": "RouteChangesRC",
									"help": "Route Changes (RC)"
								},
								"1": {
									"name": "TransmissionCountTC",
									"help": "Transmission Count (TC)"
								},
								"2": {
									"name": "NeighborsNB",
									"help": "Neighbors (NB)"
								},
								"3": {
									"name": "PacketErrorCountPEC",
									"help": "Packet Error Count (PEC)"
								},
								"4": {
									"name": "SumOfTransmissionTimesTS",
									"help": "Sum of transmission times (TS)"
								},
								"5": {
									"name": "SumOfTransmissionTimesSquraredTS2",
									"help": "Sum of transmission times squrared (TS2)"
								}
							}
						},
						{
							"type": "integer",
							"name": "length",
							"help": "Length",
							"length": 1
						},
						{
							"type": "blob",
							"name": "value",
							"help": "Value",
							"length": {
								"name": "Length"
							}
						}
					]
				}
			]
		} as CommandDefinition;

		static matches(packet: Packet): boolean {
			return packet.tryAs(NetworkManagementInstallationMaintenanceV1)?.command === this.command;
		}

		constructor(data: Buffer | NetworkManagementInstallationMaintenanceV1StatisticsReportData) {
			super(StatisticsReport, data);
		}
	};

	public static readonly StatisticsClear = class StatisticsClear extends CommandPacket<void> {
		public static readonly CommandClass = NetworkManagementInstallationMaintenanceV1;
		public static readonly command = 0x06;
		public static readonly definition = {
			"command": 6,
			"name": "StatisticsClear",
			"help": "Statistics Clear",
			"status": "active",
			"params": []
		} as CommandDefinition;

		static matches(packet: Packet): boolean {
			return packet.tryAs(NetworkManagementInstallationMaintenanceV1)?.command === this.command;
		}

		constructor(data: Buffer | void) {
			super(StatisticsClear, data);
		}
	};
}

export namespace NetworkManagementInstallationMaintenanceV1 {
	export type PriorityRouteSet = InstanceType<typeof NetworkManagementInstallationMaintenanceV1.PriorityRouteSet>;
	export type PriorityRouteGet = InstanceType<typeof NetworkManagementInstallationMaintenanceV1.PriorityRouteGet>;
	export type PriorityRouteReport = InstanceType<typeof NetworkManagementInstallationMaintenanceV1.PriorityRouteReport>;
	export type StatisticsGet = InstanceType<typeof NetworkManagementInstallationMaintenanceV1.StatisticsGet>;
	export type StatisticsReport = InstanceType<typeof NetworkManagementInstallationMaintenanceV1.StatisticsReport>;
	export type StatisticsClear = InstanceType<typeof NetworkManagementInstallationMaintenanceV1.StatisticsClear>;
}
