/**
 * Command Class Scene Activation, version 1.
 *
 * Auto-generated, do not edit.
 */

import { CommandClassPacket, CommandPacket, Packet } from "@ezwave/codec";
import { CommandClasses, convertFromJsonCommand, JsonCommandDefinition } from "@ezwave/spec";

export enum SceneActivationV1Commands {
	SceneActivationSet = 0x01,
}

export interface SceneActivationV1SceneActivationSetData {
	sceneId: number; // 1 byte unsigned integer
	dimmingDuration: number; // 1 byte unsigned integer
}

export class SceneActivationV1 extends CommandClassPacket<SceneActivationV1Commands> {
	public static readonly commandClass = CommandClasses.SceneActivation; // 0x2b (43)
	public static readonly version = 1;

	public static matches(packet: Packet): boolean {
		return packet.commandClass === this.commandClass;
	}

	constructor(commandAndPayload: Buffer) {
		super(SceneActivationV1, commandAndPayload);
	}

	public static readonly SceneActivationSet = class SceneActivationSet extends CommandPacket<SceneActivationV1SceneActivationSetData> {
		public static readonly CommandClass = SceneActivationV1;
		public static readonly command = 0x01;
		public static readonly definition = convertFromJsonCommand({
			"command": 1,
			"name": "SceneActivationSet",
			"help": "Scene Activation Set",
			"status": "Active",
			"params": [
				{
					"type": "Integer",
					"name": "sceneId",
					"help": "Scene ID",
					"length": 1
				},
				{
					"type": "Integer",
					"name": "dimmingDuration",
					"help": "Dimming Duration",
					"length": 1,
					"values": {
						"0": {
							"name": "Instantly",
							"help": "Instantly"
						},
						"255": {
							"name": "ConfiguredDimmingDuration",
							"help": "configured dimming duration"
						}
					}
				}
			]
		} as JsonCommandDefinition);

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
