/**
 * Command Class Network Management Installation and Maintenance, version 2.
 *
 * Auto-generated, do not edit.
 */

import { CommandClassPacket, CommandPacket } from "../commands/command";
import * as jsonSpec from "../commands/jsonSpec";
import { Packet } from "../commands/packet";
import { convertFromJsonCommand } from "../commands/specHelpers";
import CommandClasses from "../generated/CommandClasses";

export enum NetworkManagementInstallationMaintenanceV2Commands {
	PriorityRouteSet = 0x01,
	PriorityRouteGet = 0x02,
	PriorityRouteReport = 0x03,
	StatisticsGet = 0x04,
	StatisticsReport = 0x05,
	StatisticsClear = 0x06,
	RssiGet = 0x07,
	RssiReport = 0x08,
}

export interface NetworkManagementInstallationMaintenanceV2PriorityRouteSetData {
	nodeId: number; // 1 byte unsigned integer
	repeater1: number; // 1 byte unsigned integer
	repeater2: number; // 1 byte unsigned integer
	repeater3: number; // 1 byte unsigned integer
	repeater4: number; // 1 byte unsigned integer
	speed: SpeedEnum; // 1 byte enum value
}

export interface NetworkManagementInstallationMaintenanceV2PriorityRouteGetData {
	nodeId: number; // 1 byte unsigned integer
}

export interface NetworkManagementInstallationMaintenanceV2PriorityRouteReportData {
	nodeId: number; // 1 byte unsigned integer
	type: TypeEnum; // 1 byte enum value
	repeater1: number; // 1 byte unsigned integer
	repeater2: number; // 1 byte unsigned integer
	repeater3: number; // 1 byte unsigned integer
	repeater4: number; // 1 byte unsigned integer
	speed: SpeedEnum; // 1 byte enum value
}

export interface NetworkManagementInstallationMaintenanceV2StatisticsGetData {
	nodeId: number; // 1 byte unsigned integer
}

export interface NetworkManagementInstallationMaintenanceV2StatisticsReportData {
	nodeId: number; // 1 byte unsigned integer
	// TODO param statistics type group
}

export interface NetworkManagementInstallationMaintenanceV2RssiReportData {
	channel1Rssi: number; // 1 byte unsigned integer
	channel2Rssi: number; // 1 byte unsigned integer
	channel3Rssi: number; // 1 byte unsigned integer
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

export class NetworkManagementInstallationMaintenanceV2 extends CommandClassPacket<NetworkManagementInstallationMaintenanceV2Commands> {
	public static readonly commandClass = CommandClasses.NetworkManagementInstallationMaintenance; // 0x67 (103)

	public static matches(packet: Packet): boolean {
		return packet.commandClass === this.commandClass;
	}

	constructor(commandAndPayload: Buffer) {
		super(NetworkManagementInstallationMaintenanceV2, commandAndPayload);
	}

	public static readonly PriorityRouteSet = class PriorityRouteSet extends CommandPacket<NetworkManagementInstallationMaintenanceV2PriorityRouteSetData> {
		public static readonly CommandClass = NetworkManagementInstallationMaintenanceV2;
		public static readonly command = 0x01;
		public static readonly definition = convertFromJsonCommand({
			"command": 1,
			"name": "PriorityRouteSet",
			"help": "Priority Route Set",
			"status": "active",
			"params": [
				{
					"type": "integer",
					"name": "nodeId",
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
		} as jsonSpec.CommandDefinition);

		static matches(packet: Packet): boolean {
			return packet.tryAs(NetworkManagementInstallationMaintenanceV2)?.command === this.command;
		}

		constructor(data: Buffer | NetworkManagementInstallationMaintenanceV2PriorityRouteSetData) {
			super(PriorityRouteSet, data);
		}
	};

	public static readonly PriorityRouteGet = class PriorityRouteGet extends CommandPacket<NetworkManagementInstallationMaintenanceV2PriorityRouteGetData> {
		public static readonly CommandClass = NetworkManagementInstallationMaintenanceV2;
		public static readonly command = 0x02;
		public static readonly definition = convertFromJsonCommand({
			"command": 2,
			"name": "PriorityRouteGet",
			"help": "Priority Route Get",
			"status": "active",
			"params": [
				{
					"type": "integer",
					"name": "nodeId",
					"help": "NodeID",
					"length": 1,
					"valueType": "NODE_NUMBER"
				}
			]
		} as jsonSpec.CommandDefinition);

		static matches(packet: Packet): boolean {
			return packet.tryAs(NetworkManagementInstallationMaintenanceV2)?.command === this.command;
		}

		constructor(data: Buffer | NetworkManagementInstallationMaintenanceV2PriorityRouteGetData) {
			super(PriorityRouteGet, data);
		}
	};

	public static readonly PriorityRouteReport = class PriorityRouteReport extends CommandPacket<NetworkManagementInstallationMaintenanceV2PriorityRouteReportData> {
		public static readonly CommandClass = NetworkManagementInstallationMaintenanceV2;
		public static readonly command = 0x03;
		public static readonly definition = convertFromJsonCommand({
			"command": 3,
			"name": "PriorityRouteReport",
			"help": "Priority Route Report",
			"status": "active",
			"params": [
				{
					"type": "integer",
					"name": "nodeId",
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
		} as jsonSpec.CommandDefinition);

		static matches(packet: Packet): boolean {
			return packet.tryAs(NetworkManagementInstallationMaintenanceV2)?.command === this.command;
		}

		constructor(data: Buffer | NetworkManagementInstallationMaintenanceV2PriorityRouteReportData) {
			super(PriorityRouteReport, data);
		}
	};

	public static readonly StatisticsGet = class StatisticsGet extends CommandPacket<NetworkManagementInstallationMaintenanceV2StatisticsGetData> {
		public static readonly CommandClass = NetworkManagementInstallationMaintenanceV2;
		public static readonly command = 0x04;
		public static readonly definition = convertFromJsonCommand({
			"command": 4,
			"name": "StatisticsGet",
			"help": "Statistics Get",
			"status": "active",
			"params": [
				{
					"type": "integer",
					"name": "nodeId",
					"help": "NodeID",
					"length": 1,
					"valueType": "NODE_NUMBER"
				}
			]
		} as jsonSpec.CommandDefinition);

		static matches(packet: Packet): boolean {
			return packet.tryAs(NetworkManagementInstallationMaintenanceV2)?.command === this.command;
		}

		constructor(data: Buffer | NetworkManagementInstallationMaintenanceV2StatisticsGetData) {
			super(StatisticsGet, data);
		}
	};

	// TODO This command is not yet fully supported by the decoder/encoder
	public static readonly StatisticsReport = class StatisticsReport extends CommandPacket<NetworkManagementInstallationMaintenanceV2StatisticsReportData> {
		public static readonly CommandClass = NetworkManagementInstallationMaintenanceV2;
		public static readonly command = 0x05;
		public static readonly definition = convertFromJsonCommand({
			"command": 5,
			"name": "StatisticsReport",
			"help": "Statistics Report",
			"status": "active",
			"params": [
				{
					"type": "integer",
					"name": "nodeId",
					"help": "NodeID",
					"length": 1,
					"valueType": "NODE_NUMBER"
				},
				{
					"type": "group",
					"name": "statistics",
					"help": "Statistics",
					"length": {
						"lengthType": "auto",
						"endOffset": 0
					},
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
							"length": 1,
							"lengthOf": {
								"refs": [
									"statistics.value"
								]
							}
						},
						{
							"type": "blob",
							"name": "value",
							"help": "Value",
							"length": {
								"lengthType": "ref",
								"from": {
									"ref": "statistics.length"
								}
							}
						}
					]
				}
			]
		} as jsonSpec.CommandDefinition);

		static matches(packet: Packet): boolean {
			return packet.tryAs(NetworkManagementInstallationMaintenanceV2)?.command === this.command;
		}

		constructor(data: Buffer | NetworkManagementInstallationMaintenanceV2StatisticsReportData) {
			super(StatisticsReport, data);
		}
	};

	public static readonly StatisticsClear = class StatisticsClear extends CommandPacket<void> {
		public static readonly CommandClass = NetworkManagementInstallationMaintenanceV2;
		public static readonly command = 0x06;
		public static readonly definition = convertFromJsonCommand({
			"command": 6,
			"name": "StatisticsClear",
			"help": "Statistics Clear",
			"status": "active",
			"params": []
		} as jsonSpec.CommandDefinition);

		static matches(packet: Packet): boolean {
			return packet.tryAs(NetworkManagementInstallationMaintenanceV2)?.command === this.command;
		}

		constructor(data: Buffer | void) {
			super(StatisticsClear, data);
		}
	};

	public static readonly RssiGet = class RssiGet extends CommandPacket<void> {
		public static readonly CommandClass = NetworkManagementInstallationMaintenanceV2;
		public static readonly command = 0x07;
		public static readonly definition = convertFromJsonCommand({
			"command": 7,
			"name": "RssiGet",
			"help": "RSSI Get",
			"status": "active",
			"params": []
		} as jsonSpec.CommandDefinition);

		static matches(packet: Packet): boolean {
			return packet.tryAs(NetworkManagementInstallationMaintenanceV2)?.command === this.command;
		}

		constructor(data: Buffer | void) {
			super(RssiGet, data);
		}
	};

	public static readonly RssiReport = class RssiReport extends CommandPacket<NetworkManagementInstallationMaintenanceV2RssiReportData> {
		public static readonly CommandClass = NetworkManagementInstallationMaintenanceV2;
		public static readonly command = 0x08;
		public static readonly definition = convertFromJsonCommand({
			"command": 8,
			"name": "RssiReport",
			"help": "RSSI Report",
			"status": "active",
			"params": [
				{
					"type": "integer",
					"name": "channel1Rssi",
					"help": "Channel 1 RSSI",
					"length": 1
				},
				{
					"type": "integer",
					"name": "channel2Rssi",
					"help": "Channel 2 RSSI",
					"length": 1
				},
				{
					"type": "integer",
					"name": "channel3Rssi",
					"help": "Channel 3 RSSI",
					"length": 1
				}
			]
		} as jsonSpec.CommandDefinition);

		static matches(packet: Packet): boolean {
			return packet.tryAs(NetworkManagementInstallationMaintenanceV2)?.command === this.command;
		}

		constructor(data: Buffer | NetworkManagementInstallationMaintenanceV2RssiReportData) {
			super(RssiReport, data);
		}
	};
}

export namespace NetworkManagementInstallationMaintenanceV2 {
	export type PriorityRouteSet = InstanceType<typeof NetworkManagementInstallationMaintenanceV2.PriorityRouteSet>;
	export type PriorityRouteGet = InstanceType<typeof NetworkManagementInstallationMaintenanceV2.PriorityRouteGet>;
	export type PriorityRouteReport = InstanceType<typeof NetworkManagementInstallationMaintenanceV2.PriorityRouteReport>;
	export type StatisticsGet = InstanceType<typeof NetworkManagementInstallationMaintenanceV2.StatisticsGet>;
	export type StatisticsReport = InstanceType<typeof NetworkManagementInstallationMaintenanceV2.StatisticsReport>;
	export type StatisticsClear = InstanceType<typeof NetworkManagementInstallationMaintenanceV2.StatisticsClear>;
	export type RssiGet = InstanceType<typeof NetworkManagementInstallationMaintenanceV2.RssiGet>;
	export type RssiReport = InstanceType<typeof NetworkManagementInstallationMaintenanceV2.RssiReport>;
}
