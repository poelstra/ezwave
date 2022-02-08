/**
 * Command Class Mailbox, version 1.
 *
 * Auto-generated, do not edit.
 */

import { CommandClasses, CommandClassPacket, CommandPacket, Packet } from "@ezwave/codec";
import { CommandDefinition, convertFromJsonCommand, JsonCommandDefinition } from "@ezwave/spec";

export enum MailboxV1Commands {
	MailboxConfigurationGet = 0x01,
	MailboxConfigurationSet = 0x02,
	MailboxConfigurationReport = 0x03,
	MailboxQueue = 0x04,
	MailboxWakeupNotification = 0x05,
	MailboxNodeFailing = 0x06,
}

export interface MailboxV1MailboxConfigurationSetData {
	mode: ModeEnum; // properties1[2..0]
	forwardingDestinationIpv6Address: Buffer; // 16 bytes
	udpPortNumber: number; // 2 byte unsigned integer
}

export interface MailboxV1MailboxConfigurationReportData {
	supportedModes: SupportedModesEnum; // properties1[4..3]
	mode: ModeEnum; // properties1[2..0]
	mailboxCapacity: number; // 2 byte unsigned integer
	forwardingDestinationIpv6Address: Buffer; // 16 bytes
	udpPortNumber: number; // 2 byte unsigned integer
}

export interface MailboxV1MailboxQueueData {
	sequenceNumber: number; // 1 byte unsigned integer
	last: boolean; // properties1[2]
	mode: Mode2Enum; // properties1[1..0]
	queueHandle: number; // 1 byte unsigned integer
	mailboxEntry: Buffer; // automatic length
}

export interface MailboxV1MailboxWakeupNotificationData {
	queueHandle: number; // 1 byte unsigned integer
}

export interface MailboxV1MailboxNodeFailingData {
	queueHandle: number; // 1 byte unsigned integer
}

export enum ModeEnum {
	Disable = 0x0,
	EnableMailboxService = 0x1,
	EnableMailboxProxy = 0x2,
}

export enum SupportedModesEnum {
	MailboxServiceSupported = 0x0,
	MailboxProxySupported = 0x1,
}

export enum Mode2Enum {
	Push = 0x0,
	Pop = 0x1,
	Waiting = 0x2,
	Ping = 0x3,
	Ack = 0x4,
	Nack = 0x5,
	QueueFull = 0x6,
}

export class MailboxV1 extends CommandClassPacket<MailboxV1Commands> {
	public static readonly commandClass: number = CommandClasses.Mailbox; // 0x69 (105)
	public static readonly version: number = 1;

	public static matches(packet: Packet): boolean {
		return packet.commandClass === this.commandClass;
	}

	public constructor(commandAndPayload: Buffer) {
		super(MailboxV1, commandAndPayload);
	}
}

export class MailboxConfigurationGet extends CommandPacket<void> {
	public static readonly CommandClass: typeof MailboxV1 = MailboxV1;
	public static readonly command: number = 0x01; // 1
	public static readonly definition: CommandDefinition = convertFromJsonCommand({
		"command": 1,
		"name": "MailboxConfigurationGet",
		"help": "Mailbox Configuration Get",
		"status": "Active",
		"params": []
	} as JsonCommandDefinition);

	public static matches(packet: Packet): boolean {
		return packet.tryAs(MailboxV1)?.command === this.command;
	}

	public constructor(data: Buffer | void) {
		super(MailboxConfigurationGet, data);
	}
};

export class MailboxConfigurationSet extends CommandPacket<MailboxV1MailboxConfigurationSetData> {
	public static readonly CommandClass: typeof MailboxV1 = MailboxV1;
	public static readonly command: number = 0x02; // 2
	public static readonly definition: CommandDefinition = convertFromJsonCommand({
		"command": 2,
		"name": "MailboxConfigurationSet",
		"help": "Mailbox Configuration Set",
		"status": "Active",
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
						"mask": 248,
						"shift": 3,
						"reserved": true
					},
					{
						"fieldType": "Enum",
						"name": "mode",
						"mask": 7,
						"shift": 0,
						"values": {
							"0": {
								"name": "Disable",
								"help": "Disable"
							},
							"1": {
								"name": "EnableMailboxService",
								"help": "Enable Mailbox Service"
							},
							"2": {
								"name": "EnableMailboxProxy",
								"help": "Enable Mailbox Proxy"
							}
						}
					}
				]
			},
			{
				"type": "Blob",
				"name": "forwardingDestinationIpv6Address",
				"help": "Forwarding Destination IPv6 Address",
				"length": 16
			},
			{
				"type": "Integer",
				"name": "udpPortNumber",
				"help": "UDP Port Number",
				"length": 2
			}
		]
	} as JsonCommandDefinition);

	public static matches(packet: Packet): boolean {
		return packet.tryAs(MailboxV1)?.command === this.command;
	}

	public constructor(data: Buffer | MailboxV1MailboxConfigurationSetData) {
		super(MailboxConfigurationSet, data);
	}
};

export class MailboxConfigurationReport extends CommandPacket<MailboxV1MailboxConfigurationReportData> {
	public static readonly CommandClass: typeof MailboxV1 = MailboxV1;
	public static readonly command: number = 0x03; // 3
	public static readonly definition: CommandDefinition = convertFromJsonCommand({
		"command": 3,
		"name": "MailboxConfigurationReport",
		"help": "Mailbox Configuration Report",
		"status": "Active",
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
						"mask": 224,
						"shift": 5,
						"reserved": true
					},
					{
						"fieldType": "Enum",
						"name": "supportedModes",
						"mask": 24,
						"shift": 3,
						"values": {
							"0": {
								"name": "MailboxServiceSupported",
								"help": "Mailbox Service supported"
							},
							"1": {
								"name": "MailboxProxySupported",
								"help": "Mailbox Proxy supported"
							}
						}
					},
					{
						"fieldType": "Enum",
						"name": "mode",
						"mask": 7,
						"shift": 0,
						"values": {
							"0": {
								"name": "Disable",
								"help": "Disable"
							},
							"1": {
								"name": "EnableMailboxService",
								"help": "Enable Mailbox Service"
							},
							"2": {
								"name": "EnableMailboxProxy",
								"help": "Enable Mailbox Proxy"
							}
						}
					}
				]
			},
			{
				"type": "Integer",
				"name": "mailboxCapacity",
				"help": "Mailbox Capacity",
				"length": 2
			},
			{
				"type": "Blob",
				"name": "forwardingDestinationIpv6Address",
				"help": "Forwarding Destination IPv6 Address",
				"length": 16
			},
			{
				"type": "Integer",
				"name": "udpPortNumber",
				"help": "UDP Port Number",
				"length": 2
			}
		]
	} as JsonCommandDefinition);

	public static matches(packet: Packet): boolean {
		return packet.tryAs(MailboxV1)?.command === this.command;
	}

	public constructor(data: Buffer | MailboxV1MailboxConfigurationReportData) {
		super(MailboxConfigurationReport, data);
	}
};

export class MailboxQueue extends CommandPacket<MailboxV1MailboxQueueData> {
	public static readonly CommandClass: typeof MailboxV1 = MailboxV1;
	public static readonly command: number = 0x04; // 4
	public static readonly definition: CommandDefinition = convertFromJsonCommand({
		"command": 4,
		"name": "MailboxQueue",
		"help": "Mailbox Queue",
		"status": "Active",
		"params": [
			{
				"type": "Integer",
				"name": "sequenceNumber",
				"help": "Sequence Number",
				"length": 1
			},
			{
				"type": "Bitfield",
				"name": "properties1",
				"help": "Properties1",
				"length": 1,
				"fields": [
					{
						"fieldType": "Integer",
						"name": "reserved",
						"mask": 248,
						"shift": 3,
						"reserved": true
					},
					{
						"fieldType": "Boolean",
						"name": "last",
						"mask": 4,
						"shift": 2
					},
					{
						"fieldType": "Enum",
						"name": "mode",
						"mask": 3,
						"shift": 0,
						"values": {
							"0": {
								"name": "Push",
								"help": "Push"
							},
							"1": {
								"name": "Pop",
								"help": "Pop"
							},
							"2": {
								"name": "Waiting",
								"help": "Waiting"
							},
							"3": {
								"name": "Ping",
								"help": "Ping"
							},
							"4": {
								"name": "Ack",
								"help": "ACK"
							},
							"5": {
								"name": "Nack",
								"help": "NACK"
							},
							"6": {
								"name": "QueueFull",
								"help": "Queue Full"
							}
						}
					}
				]
			},
			{
				"type": "Integer",
				"name": "queueHandle",
				"help": "Queue Handle",
				"length": 1
			},
			{
				"type": "Blob",
				"name": "mailboxEntry",
				"help": "Mailbox Entry",
				"length": {
					"lengthType": "Auto"
				}
			}
		]
	} as JsonCommandDefinition);

	public static matches(packet: Packet): boolean {
		return packet.tryAs(MailboxV1)?.command === this.command;
	}

	public constructor(data: Buffer | MailboxV1MailboxQueueData) {
		super(MailboxQueue, data);
	}
};

export class MailboxWakeupNotification extends CommandPacket<MailboxV1MailboxWakeupNotificationData> {
	public static readonly CommandClass: typeof MailboxV1 = MailboxV1;
	public static readonly command: number = 0x05; // 5
	public static readonly definition: CommandDefinition = convertFromJsonCommand({
		"command": 5,
		"name": "MailboxWakeupNotification",
		"help": "Mailbox Wakeup Notification",
		"status": "Active",
		"params": [
			{
				"type": "Integer",
				"name": "queueHandle",
				"help": "Queue Handle",
				"length": 1
			}
		]
	} as JsonCommandDefinition);

	public static matches(packet: Packet): boolean {
		return packet.tryAs(MailboxV1)?.command === this.command;
	}

	public constructor(data: Buffer | MailboxV1MailboxWakeupNotificationData) {
		super(MailboxWakeupNotification, data);
	}
};

export class MailboxNodeFailing extends CommandPacket<MailboxV1MailboxNodeFailingData> {
	public static readonly CommandClass: typeof MailboxV1 = MailboxV1;
	public static readonly command: number = 0x06; // 6
	public static readonly definition: CommandDefinition = convertFromJsonCommand({
		"command": 6,
		"name": "MailboxNodeFailing",
		"help": "Mailbox Failing Node",
		"status": "Active",
		"params": [
			{
				"type": "Integer",
				"name": "queueHandle",
				"help": "Queue Handle",
				"length": 1
			}
		]
	} as JsonCommandDefinition);

	public static matches(packet: Packet): boolean {
		return packet.tryAs(MailboxV1)?.command === this.command;
	}

	public constructor(data: Buffer | MailboxV1MailboxNodeFailingData) {
		super(MailboxNodeFailing, data);
	}
};
