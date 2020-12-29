/**
 * Command Class Scene Activation, version 1.
 *
 * Auto-generated, do not edit.
 */

import { CommandClassPacket, CommandPacket } from "../commands/command";
import { Packet } from "../commands/packet";
import { CommandDefinition } from "../commands/types";
import CommandClasses from "../generated/CommandClasses";

export enum SceneActivationV1Commands {
	SceneActivationSet = 0x01,
}

export interface SceneActivationV1SceneActivationSetData {
	sceneID: number; // 1 byte unsigned integer
	dimmingDuration: number; // 1 byte unsigned integer
}

export class SceneActivationV1 extends CommandClassPacket<SceneActivationV1Commands> {
	public static readonly commandClass = CommandClasses.SceneActivation; // 0x2b (43)

	public static matches(packet: Packet): boolean {
		return packet.commandClass === this.commandClass;
	}

	constructor(commandAndPayload: Buffer) {
		super(SceneActivationV1, commandAndPayload);
	}

	public static readonly SceneActivationSet = class SceneActivationSet extends CommandPacket<SceneActivationV1SceneActivationSetData> {
		public static readonly CommandClass = SceneActivationV1;
		public static readonly command = 0x01;
		public static readonly definition = {
			"command": 1,
			"name": "SceneActivationSet",
			"help": "Scene Activation Set",
			"status": "active",
			"params": [
				{
					"type": "integer",
					"name": "sceneID",
					"help": "Scene ID",
					"length": 1
				},
				{
					"type": "integer",
					"name": "dimmingDuration",
					"help": "Dimming Duration",
					"length": 1,
					"values": {
						"0": "Instantly",
						"255": "configured dimming duration"
					}
				}
			]
		} as CommandDefinition;

		static matches(packet: Packet): boolean {
			return packet.tryAs(SceneActivationV1)?.command === this.command;
		}

		constructor(data: Buffer | SceneActivationV1SceneActivationSetData) {
			super(SceneActivationSet, data);
		}
	};
}

export namespace SceneActivationV1 {
	export type SceneActivationSet = InstanceType<typeof SceneActivationV1.SceneActivationSet>;
}
