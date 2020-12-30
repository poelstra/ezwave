/**
 * Command Class Inclusion Controller, version 1.
 *
 * Auto-generated, do not edit.
 */

import { CommandClassPacket, CommandPacket } from "../commands/command";
import { Packet } from "../commands/packet";
import { CommandDefinition } from "../commands/types";
import CommandClasses from "../generated/CommandClasses";

export enum InclusionControllerV1Commands {
	Initiate = 0x01,
	Complete = 0x02,
}

export interface InclusionControllerV1InitiateData {
	nodeID: number; // 1 byte unsigned integer
	stepID: StepIDEnum; // 1 byte enum value
}

export interface InclusionControllerV1CompleteData {
	stepID: StepIDEnum; // 1 byte enum value
	status: StatusEnum; // 1 byte enum value
}

export enum StepIDEnum {
	ProxyInclusion = 0x1,
	S0Inclusion = 0x2,
	ProxyInclusionReplace = 0x3,
}

export enum StatusEnum {
	StepOk = 0x1,
	StepUserRejected = 0x2,
	StepFailed = 0x3,
	StepNotSupported = 0x4,
}

export class InclusionControllerV1 extends CommandClassPacket<InclusionControllerV1Commands> {
	public static readonly commandClass = CommandClasses.InclusionController; // 0x74 (116)

	public static matches(packet: Packet): boolean {
		return packet.commandClass === this.commandClass;
	}

	constructor(commandAndPayload: Buffer) {
		super(InclusionControllerV1, commandAndPayload);
	}

	public static readonly Initiate = class Initiate extends CommandPacket<InclusionControllerV1InitiateData> {
		public static readonly CommandClass = InclusionControllerV1;
		public static readonly command = 0x01;
		public static readonly definition = {
			"command": 1,
			"name": "Initiate",
			"help": "Initiate",
			"status": "active",
			"params": [
				{
					"type": "integer",
					"name": "nodeID",
					"help": "Node ID",
					"length": 1,
					"valueType": "NODE_NUMBER"
				},
				{
					"type": "enum",
					"name": "stepID",
					"help": "Step ID",
					"length": 1,
					"values": {
						"1": {
							"name": "ProxyInclusion",
							"help": "PROXY_INCLUSION"
						},
						"2": {
							"name": "S0Inclusion",
							"help": "S0_INCLUSION"
						},
						"3": {
							"name": "ProxyInclusionReplace",
							"help": "PROXY_INCLUSION_REPLACE"
						}
					}
				}
			]
		} as CommandDefinition;

		static matches(packet: Packet): boolean {
			return packet.tryAs(InclusionControllerV1)?.command === this.command;
		}

		constructor(data: Buffer | InclusionControllerV1InitiateData) {
			super(Initiate, data);
		}
	};

	public static readonly Complete = class Complete extends CommandPacket<InclusionControllerV1CompleteData> {
		public static readonly CommandClass = InclusionControllerV1;
		public static readonly command = 0x02;
		public static readonly definition = {
			"command": 2,
			"name": "Complete",
			"help": "Complete",
			"status": "active",
			"params": [
				{
					"type": "enum",
					"name": "stepID",
					"help": "Step ID",
					"length": 1,
					"values": {
						"1": {
							"name": "ProxyInclusion",
							"help": "PROXY_INCLUSION"
						},
						"2": {
							"name": "S0Inclusion",
							"help": "S0_INCLUSION"
						},
						"3": {
							"name": "ProxyInclusionReplace",
							"help": "PROXY_INCLUSION_REPLACE"
						}
					}
				},
				{
					"type": "enum",
					"name": "status",
					"help": "Status",
					"length": 1,
					"values": {
						"1": {
							"name": "StepOk",
							"help": "STEP_OK"
						},
						"2": {
							"name": "StepUserRejected",
							"help": "STEP_USER_REJECTED"
						},
						"3": {
							"name": "StepFailed",
							"help": "STEP_FAILED"
						},
						"4": {
							"name": "StepNotSupported",
							"help": "STEP_NOT_SUPPORTED"
						}
					}
				}
			]
		} as CommandDefinition;

		static matches(packet: Packet): boolean {
			return packet.tryAs(InclusionControllerV1)?.command === this.command;
		}

		constructor(data: Buffer | InclusionControllerV1CompleteData) {
			super(Complete, data);
		}
	};
}

export namespace InclusionControllerV1 {
	export type Initiate = InstanceType<typeof InclusionControllerV1.Initiate>;
	export type Complete = InstanceType<typeof InclusionControllerV1.Complete>;
}
