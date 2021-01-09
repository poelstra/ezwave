/**
 * Command Class Application Status, version 1.
 *
 * Auto-generated, do not edit.
 */

import { CommandClassPacket, CommandPacket } from "../commands/command";
import * as jsonSpec from "../commands/jsonSpec";
import { Packet } from "../commands/packet";
import { convertFromJsonCommand } from "../commands/specHelpers";
import CommandClasses from "../generated/CommandClasses";

export enum ApplicationStatusV1Commands {
	ApplicationBusy = 0x01,
	ApplicationRejectedRequest = 0x02,
}

export interface ApplicationStatusV1ApplicationBusyData {
	status: StatusEnum; // 1 byte enum value
	waitTime: number; // 1 byte unsigned integer
}

export interface ApplicationStatusV1ApplicationRejectedRequestData {
	status: number; // 1 byte unsigned integer
}

export enum StatusEnum {
	TryAgainLater = 0x0,
	TryAgainInWaitTimeSeconds = 0x1,
	RequestQueuedExecutedLater = 0x2,
}

export class ApplicationStatusV1 extends CommandClassPacket<ApplicationStatusV1Commands> {
	public static readonly commandClass = CommandClasses.ApplicationStatus; // 0x22 (34)

	public static matches(packet: Packet): boolean {
		return packet.commandClass === this.commandClass;
	}

	constructor(commandAndPayload: Buffer) {
		super(ApplicationStatusV1, commandAndPayload);
	}

	public static readonly ApplicationBusy = class ApplicationBusy extends CommandPacket<ApplicationStatusV1ApplicationBusyData> {
		public static readonly CommandClass = ApplicationStatusV1;
		public static readonly command = 0x01;
		public static readonly definition = convertFromJsonCommand({
			"command": 1,
			"name": "ApplicationBusy",
			"help": "Application Busy",
			"status": "active",
			"params": [
				{
					"type": "enum",
					"name": "status",
					"help": "Status",
					"length": 1,
					"values": {
						"0": {
							"name": "TryAgainLater",
							"help": "Try again later"
						},
						"1": {
							"name": "TryAgainInWaitTimeSeconds",
							"help": "Try again in Wait Time seconds"
						},
						"2": {
							"name": "RequestQueuedExecutedLater",
							"help": "Request queued, executed later"
						}
					}
				},
				{
					"type": "integer",
					"name": "waitTime",
					"help": "Wait Time",
					"length": 1
				}
			]
		} as jsonSpec.CommandDefinition);

		static matches(packet: Packet): boolean {
			return packet.tryAs(ApplicationStatusV1)?.command === this.command;
		}

		constructor(data: Buffer | ApplicationStatusV1ApplicationBusyData) {
			super(ApplicationBusy, data);
		}
	};

	public static readonly ApplicationRejectedRequest = class ApplicationRejectedRequest extends CommandPacket<ApplicationStatusV1ApplicationRejectedRequestData> {
		public static readonly CommandClass = ApplicationStatusV1;
		public static readonly command = 0x02;
		public static readonly definition = convertFromJsonCommand({
			"command": 2,
			"name": "ApplicationRejectedRequest",
			"help": "Application Rejected Request",
			"status": "active",
			"params": [
				{
					"type": "integer",
					"name": "status",
					"help": "Status",
					"length": 1
				}
			]
		} as jsonSpec.CommandDefinition);

		static matches(packet: Packet): boolean {
			return packet.tryAs(ApplicationStatusV1)?.command === this.command;
		}

		constructor(data: Buffer | ApplicationStatusV1ApplicationRejectedRequestData) {
			super(ApplicationRejectedRequest, data);
		}
	};
}

export namespace ApplicationStatusV1 {
	export type ApplicationBusy = InstanceType<typeof ApplicationStatusV1.ApplicationBusy>;
	export type ApplicationRejectedRequest = InstanceType<typeof ApplicationStatusV1.ApplicationRejectedRequest>;
}
