/**
 * Command Class Z/IP 6lowpan, version 1.
 *
 * Auto-generated, do not edit.
 */

import { CommandClassPacket, CommandPacket } from "../command";
import * as jsonSpec from "../jsonSpec";
import { Packet } from "../packet";
import { convertFromJsonCommand } from "../specHelpers";
import CommandClasses from "./CommandClasses";

export enum Zip6lowpanV1Commands {
	LowpanFirstFragment = 0xc0,
	LowpanSubsequentFragment = 0xe0,
}

export interface Zip6lowpanV1LowpanFirstFragmentData {
	datagramSize1: number; // properties1[2..0]
	datagramSize2: number; // 1 byte unsigned integer
	datagramTag: number; // 1 byte unsigned integer
	payload: Buffer; // automatic length
}

export interface Zip6lowpanV1LowpanSubsequentFragmentData {
	datagramSize1: number; // properties1[2..0]
	datagramSize2: number; // 1 byte unsigned integer
	datagramTag: number; // 1 byte unsigned integer
	datagramOffset: number; // 1 byte unsigned integer
	payload: Buffer; // automatic length
}

export class Zip6lowpanV1 extends CommandClassPacket<Zip6lowpanV1Commands> {
	public static readonly commandClass = CommandClasses.Zip6lowpan; // 0x4f (79)
	public static readonly version = 1;
	public static readonly commandMask = 0xf8;

	public static matches(packet: Packet): boolean {
		return packet.commandClass === this.commandClass;
	}

	constructor(commandAndPayload: Buffer) {
		super(Zip6lowpanV1, commandAndPayload);
	}

	public static readonly LowpanFirstFragment = class LowpanFirstFragment extends CommandPacket<Zip6lowpanV1LowpanFirstFragmentData> {
		public static readonly CommandClass = Zip6lowpanV1;
		public static readonly command = 0xc0;
		public static readonly definition = convertFromJsonCommand({
			"command": 192,
			"name": "LowpanFirstFragment",
			"help": "Lowpan First Fragment",
			"status": "Active",
			"cmdMask": 248,
			"params": [
				{
					"type": "Bitfield",
					"name": "properties1",
					"help": "Properties1",
					"length": 1,
					"fields": [
						{
							"fieldType": "Integer",
							"name": "datagramSize1",
							"mask": 7,
							"shift": 0
						}
					],
					"cmdMask": 7
				},
				{
					"type": "Integer",
					"name": "datagramSize2",
					"help": "Datagram Size 2",
					"length": 1
				},
				{
					"type": "Integer",
					"name": "datagramTag",
					"help": "Datagram Tag",
					"length": 1
				},
				{
					"type": "Blob",
					"name": "payload",
					"help": "Payload",
					"length": {
						"lengthType": "Auto"
					}
				}
			]
		} as jsonSpec.CommandDefinition);

		static matches(packet: Packet): boolean {
			return packet.tryAs(Zip6lowpanV1)?.command === this.command;
		}

		constructor(data: Buffer | Zip6lowpanV1LowpanFirstFragmentData) {
			super(LowpanFirstFragment, data);
		}
	};

	public static readonly LowpanSubsequentFragment = class LowpanSubsequentFragment extends CommandPacket<Zip6lowpanV1LowpanSubsequentFragmentData> {
		public static readonly CommandClass = Zip6lowpanV1;
		public static readonly command = 0xe0;
		public static readonly definition = convertFromJsonCommand({
			"command": 224,
			"name": "LowpanSubsequentFragment",
			"help": "Lowpan Subsequent Fragment",
			"status": "Active",
			"cmdMask": 248,
			"params": [
				{
					"type": "Bitfield",
					"name": "properties1",
					"help": "Properties1",
					"length": 1,
					"fields": [
						{
							"fieldType": "Integer",
							"name": "datagramSize1",
							"mask": 7,
							"shift": 0
						}
					],
					"cmdMask": 7
				},
				{
					"type": "Integer",
					"name": "datagramSize2",
					"help": "Datagram Size 2",
					"length": 1
				},
				{
					"type": "Integer",
					"name": "datagramTag",
					"help": "Datagram Tag",
					"length": 1
				},
				{
					"type": "Integer",
					"name": "datagramOffset",
					"help": "Datagram Offset",
					"length": 1
				},
				{
					"type": "Blob",
					"name": "payload",
					"help": "Payload",
					"length": {
						"lengthType": "Auto"
					}
				}
			]
		} as jsonSpec.CommandDefinition);

		static matches(packet: Packet): boolean {
			return packet.tryAs(Zip6lowpanV1)?.command === this.command;
		}

		constructor(data: Buffer | Zip6lowpanV1LowpanSubsequentFragmentData) {
			super(LowpanSubsequentFragment, data);
		}
	};
}

export namespace Zip6lowpanV1 {
	export type LowpanFirstFragment = InstanceType<typeof Zip6lowpanV1.LowpanFirstFragment>;
	export type LowpanSubsequentFragment = InstanceType<typeof Zip6lowpanV1.LowpanSubsequentFragment>;
}
