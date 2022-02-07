/**
 * Command Class Scene Activation, version 1.
 *
 * Auto-generated, do not edit.
 */

import { CommandClasses, CommandClassPacket, CommandPacket, Packet } from "@ezwave/codec";
import { convertFromJsonCommand, JsonCommandDefinition } from "@ezwave/spec";

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

	public constructor(commandAndPayload: Buffer) {
		super(SceneActivationV1, commandAndPayload);
	}
}

export class SceneActivationSet extends CommandPacket<SceneActivationV1SceneActivationSetData> {
	public static readonly CommandClass = SceneActivationV1;
	public static readonly command = 0x01; // 1
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

	public constructor(data: Buffer | SceneActivationV1SceneActivationSetData) {
		super(SceneActivationSet, data);
	}
};
