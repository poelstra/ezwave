/**
 * Command Class Transport Service, version 2.
 *
 * Auto-generated, do not edit.
 */

import { CommandClasses, CommandClassPacket, CommandPacket, Packet } from "@ezwave/codec";
import { convertFromJsonCommand, JsonCommandDefinition } from "@ezwave/spec";

export enum TransportServiceV2Commands {
	CommandFirstSegment = 0xc0,
	CommandSegmentComplete = 0xe8,
	CommandSegmentRequest = 0xc8,
	CommandSegmentWait = 0xf0,
	CommandSubsequentSegment = 0xe0,
}

export interface TransportServiceV2CommandFirstSegmentData {
	datagramSize1: number; // properties1[2..0]
	datagramSize2: number; // 1 byte unsigned integer
	sessionId: number; // properties2[7..4]
	headerExtension?: Buffer; // variable length
	payload: Buffer; // automatic length
	frameCheckSequence: number; // 2 byte unsigned integer
}

export interface TransportServiceV2CommandSegmentCompleteData {
	sessionId: number; // properties2[7..4]
}

export interface TransportServiceV2CommandSegmentRequestData {
	sessionId: number; // properties2[7..4]
	datagramOffset1: number; // properties2[2..0]
	datagramOffset2: number; // 1 byte unsigned integer
}

export interface TransportServiceV2CommandSegmentWaitData {
	pendingFragments: number; // 1 byte unsigned integer
}

export interface TransportServiceV2CommandSubsequentSegmentData {
	datagramSize1: number; // properties1[2..0]
	datagramSize2: number; // 1 byte unsigned integer
	sessionId: number; // properties2[7..4]
	datagramOffset1: number; // properties2[2..0]
	datagramOffset2: number; // 1 byte unsigned integer
	headerExtension?: Buffer; // variable length
	payload: Buffer; // automatic length
	frameCheckSequence: number; // 2 byte unsigned integer
}

export class TransportServiceV2 extends CommandClassPacket<TransportServiceV2Commands> {
	public static readonly commandClass = CommandClasses.TransportService; // 0x55 (85)
	public static readonly version = 2;
	public static readonly commandMask = 0xf8;

	public static matches(packet: Packet): boolean {
		return packet.commandClass === this.commandClass;
	}

	constructor(commandAndPayload: Buffer) {
		super(TransportServiceV2, commandAndPayload);
	}
}

export class CommandFirstSegment extends CommandPacket<TransportServiceV2CommandFirstSegmentData> {
	public static readonly CommandClass = TransportServiceV2;
	public static readonly command = 0xc0; // 192
	public static readonly definition = convertFromJsonCommand({
		"command": 192,
		"name": "CommandFirstSegment",
		"help": "First Segment",
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
				"help": "datagram_size_2",
				"length": 1
			},
			{
				"type": "Bitfield",
				"name": "properties2",
				"help": "Properties2",
				"length": 1,
				"fields": [
					{
						"fieldType": "Integer",
						"name": "sessionId",
						"mask": 240,
						"shift": 4
					},
					{
						"fieldType": "Boolean",
						"name": "ext",
						"mask": 8,
						"shift": 3,
						"presenceOf": {
							"refs": [
								"headerExtensionLength",
								"headerExtension"
							]
						},
						"isAutogenerated": true
					},
					{
						"fieldType": "Integer",
						"name": "reserved",
						"mask": 7,
						"shift": 0,
						"reserved": true
					}
				]
			},
			{
				"type": "Integer",
				"name": "headerExtensionLength",
				"help": "Header Extension Length",
				"optional": {
					"ref": "properties2.ext"
				},
				"length": 1,
				"lengthOf": {
					"refs": [
						"headerExtension"
					]
				},
				"isAutogenerated": true
			},
			{
				"type": "Blob",
				"name": "headerExtension",
				"help": "Header Extension",
				"optional": {
					"ref": "properties2.ext"
				},
				"length": {
					"lengthType": "Ref",
					"from": {
						"ref": "headerExtensionLength"
					}
				}
			},
			{
				"type": "Blob",
				"name": "payload",
				"help": "Payload",
				"length": {
					"lengthType": "Auto"
				}
			},
			{
				"type": "Integer",
				"name": "frameCheckSequence",
				"help": "Frame Check Sequence",
				"length": 2
			}
		]
	} as JsonCommandDefinition);

	static matches(packet: Packet): boolean {
		return packet.tryAs(TransportServiceV2)?.command === this.command;
	}

	constructor(data: Buffer | TransportServiceV2CommandFirstSegmentData) {
		super(CommandFirstSegment, data);
	}
};

export class CommandSegmentComplete extends CommandPacket<TransportServiceV2CommandSegmentCompleteData> {
	public static readonly CommandClass = TransportServiceV2;
	public static readonly command = 0xe8; // 232
	public static readonly definition = convertFromJsonCommand({
		"command": 232,
		"name": "CommandSegmentComplete",
		"help": "Segment Complete",
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
						"name": "reserved",
						"mask": 7,
						"shift": 0,
						"reserved": true
					}
				],
				"cmdMask": 7
			},
			{
				"type": "Bitfield",
				"name": "properties2",
				"help": "Properties2",
				"length": 1,
				"fields": [
					{
						"fieldType": "Integer",
						"name": "sessionId",
						"mask": 240,
						"shift": 4
					},
					{
						"fieldType": "Integer",
						"name": "reserved2",
						"mask": 15,
						"shift": 0,
						"reserved": true
					}
				]
			}
		]
	} as JsonCommandDefinition);

	static matches(packet: Packet): boolean {
		return packet.tryAs(TransportServiceV2)?.command === this.command;
	}

	constructor(data: Buffer | TransportServiceV2CommandSegmentCompleteData) {
		super(CommandSegmentComplete, data);
	}
};

export class CommandSegmentRequest extends CommandPacket<TransportServiceV2CommandSegmentRequestData> {
	public static readonly CommandClass = TransportServiceV2;
	public static readonly command = 0xc8; // 200
	public static readonly definition = convertFromJsonCommand({
		"command": 200,
		"name": "CommandSegmentRequest",
		"help": "Segment Request",
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
						"name": "reserved",
						"mask": 7,
						"shift": 0,
						"reserved": true
					}
				],
				"cmdMask": 7
			},
			{
				"type": "Bitfield",
				"name": "properties2",
				"help": "Properties2",
				"length": 1,
				"fields": [
					{
						"fieldType": "Integer",
						"name": "sessionId",
						"mask": 240,
						"shift": 4
					},
					{
						"fieldType": "Boolean",
						"name": "reserved2",
						"mask": 8,
						"shift": 3,
						"reserved": true
					},
					{
						"fieldType": "Integer",
						"name": "datagramOffset1",
						"mask": 7,
						"shift": 0
					}
				]
			},
			{
				"type": "Integer",
				"name": "datagramOffset2",
				"help": "datagram_offset_2",
				"length": 1
			}
		]
	} as JsonCommandDefinition);

	static matches(packet: Packet): boolean {
		return packet.tryAs(TransportServiceV2)?.command === this.command;
	}

	constructor(data: Buffer | TransportServiceV2CommandSegmentRequestData) {
		super(CommandSegmentRequest, data);
	}
};

export class CommandSegmentWait extends CommandPacket<TransportServiceV2CommandSegmentWaitData> {
	public static readonly CommandClass = TransportServiceV2;
	public static readonly command = 0xf0; // 240
	public static readonly definition = convertFromJsonCommand({
		"command": 240,
		"name": "CommandSegmentWait",
		"help": "Segment Wait",
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
						"name": "reserved",
						"mask": 7,
						"shift": 0,
						"reserved": true
					}
				],
				"cmdMask": 7
			},
			{
				"type": "Integer",
				"name": "pendingFragments",
				"help": "pending_fragments",
				"length": 1
			}
		]
	} as JsonCommandDefinition);

	static matches(packet: Packet): boolean {
		return packet.tryAs(TransportServiceV2)?.command === this.command;
	}

	constructor(data: Buffer | TransportServiceV2CommandSegmentWaitData) {
		super(CommandSegmentWait, data);
	}
};

export class CommandSubsequentSegment extends CommandPacket<TransportServiceV2CommandSubsequentSegmentData> {
	public static readonly CommandClass = TransportServiceV2;
	public static readonly command = 0xe0; // 224
	public static readonly definition = convertFromJsonCommand({
		"command": 224,
		"name": "CommandSubsequentSegment",
		"help": "Subsequent Segment",
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
				"help": "datagram_size_2",
				"length": 1
			},
			{
				"type": "Bitfield",
				"name": "properties2",
				"help": "Properties2",
				"length": 1,
				"fields": [
					{
						"fieldType": "Integer",
						"name": "sessionId",
						"mask": 240,
						"shift": 4
					},
					{
						"fieldType": "Boolean",
						"name": "ext",
						"mask": 8,
						"shift": 3,
						"presenceOf": {
							"refs": [
								"headerExtensionLength",
								"headerExtension"
							]
						},
						"isAutogenerated": true
					},
					{
						"fieldType": "Integer",
						"name": "datagramOffset1",
						"mask": 7,
						"shift": 0
					}
				]
			},
			{
				"type": "Integer",
				"name": "datagramOffset2",
				"help": "datagram_offset_2",
				"length": 1
			},
			{
				"type": "Integer",
				"name": "headerExtensionLength",
				"help": "Header Extension Length",
				"optional": {
					"ref": "properties2.ext"
				},
				"length": 1,
				"lengthOf": {
					"refs": [
						"headerExtension"
					]
				},
				"isAutogenerated": true
			},
			{
				"type": "Blob",
				"name": "headerExtension",
				"help": "Header Extension",
				"optional": {
					"ref": "properties2.ext"
				},
				"length": {
					"lengthType": "Ref",
					"from": {
						"ref": "headerExtensionLength"
					}
				}
			},
			{
				"type": "Blob",
				"name": "payload",
				"help": "Payload",
				"length": {
					"lengthType": "Auto"
				}
			},
			{
				"type": "Integer",
				"name": "frameCheckSequence",
				"help": "Frame Check Sequence",
				"length": 2
			}
		]
	} as JsonCommandDefinition);

	static matches(packet: Packet): boolean {
		return packet.tryAs(TransportServiceV2)?.command === this.command;
	}

	constructor(data: Buffer | TransportServiceV2CommandSubsequentSegmentData) {
		super(CommandSubsequentSegment, data);
	}
};
