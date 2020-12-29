/**
 * Command Class Mailbox, version 1.
 *
 * Auto-generated, do not edit.
 */

import { CommandClassPacket, CommandPacket } from "../commands/command";
import { Packet } from "../commands/packet";
import { CommandDefinition } from "../commands/types";
import CommandClasses from "../generated/CommandClasses";

export enum MailboxV1Commands {
	MailboxConfigurationGet = 0x01,
	MailboxConfigurationSet = 0x02,
	MailboxConfigurationReport = 0x03,
	MailboxQueue = 0x04,
	MailboxWakeupNotification = 0x05,
	MailboxNodeFailing = 0x06,
}

export interface MailboxV1MailboxConfigurationSetData {
	// TODO param properties1 type bitfield
	// TODO param forwardingDestinationIPv6Address type blob
	uDPPortNumber: number; // 2 byte unsigned integer
}

export interface MailboxV1MailboxConfigurationReportData {
	// TODO param properties1 type bitfield
	mailboxCapacity: number; // 2 byte unsigned integer
	// TODO param forwardingDestinationIPv6Address type blob
	uDPPortNumber: number; // 2 byte unsigned integer
}

export interface MailboxV1MailboxQueueData {
	sequenceNumber: number; // 1 byte unsigned integer
	// TODO param properties1 type bitfield
	queueHandle: number; // 1 byte unsigned integer
	// TODO param mailboxEntry type blob
}

export interface MailboxV1MailboxWakeupNotificationData {
	queueHandle: number; // 1 byte unsigned integer
}

export interface MailboxV1MailboxNodeFailingData {
	queueHandle: number; // 1 byte unsigned integer
}

export class MailboxV1 extends CommandClassPacket<MailboxV1Commands> {
	public static readonly commandClass = CommandClasses.Mailbox; // 0x69 (105)

	public static matches(packet: Packet): boolean {
		return packet.commandClass === this.commandClass;
	}

	constructor(commandAndPayload: Buffer) {
		super(MailboxV1, commandAndPayload);
	}

	public static readonly MailboxConfigurationGet = class MailboxConfigurationGet extends CommandPacket<void> {
		public static readonly CommandClass = MailboxV1;
		public static readonly command = 0x01;
		public static readonly definition = {
			"command": 1,
			"name": "MailboxConfigurationGet",
			"help": "Mailbox Configuration Get",
			"status": "active",
			"params": []
		} as CommandDefinition;

		static matches(packet: Packet): boolean {
			return packet.tryAs(MailboxV1)?.command === this.command;
		}

		constructor(data: Buffer | void) {
			super(MailboxConfigurationGet, data);
		}
	};

	public static readonly MailboxConfigurationSet = class MailboxConfigurationSet extends CommandPacket<MailboxV1MailboxConfigurationSetData> {
		public static readonly CommandClass = MailboxV1;
		public static readonly command = 0x02;
		public static readonly definition = {
			"command": 2,
			"name": "MailboxConfigurationSet",
			"help": "Mailbox Configuration Set",
			"status": "active",
			"params": [
				{
					"type": "bitfield",
					"name": "properties1",
					"help": "Properties1",
					"length": 1,
					"fields": [
						{
							"type": "enum",
							"name": "Mode",
							"mask": 7,
							"shift": 0,
							"values": {
								"0": "Disable",
								"1": "Enable Mailbox Service",
								"2": "Enable Mailbox Proxy"
							}
						},
						{
							"type": "integer",
							"name": "Reserved",
							"mask": 248,
							"shift": 3
						}
					]
				},
				{
					"type": "blob",
					"name": "forwardingDestinationIPv6Address",
					"help": "Forwarding Destination IPv6 Address",
					"length": 16
				},
				{
					"type": "integer",
					"name": "uDPPortNumber",
					"help": "UDP Port Number",
					"length": 2
				}
			]
		} as CommandDefinition;

		static matches(packet: Packet): boolean {
			return packet.tryAs(MailboxV1)?.command === this.command;
		}

		constructor(data: Buffer | MailboxV1MailboxConfigurationSetData) {
			super(MailboxConfigurationSet, data);
		}
	};

	public static readonly MailboxConfigurationReport = class MailboxConfigurationReport extends CommandPacket<MailboxV1MailboxConfigurationReportData> {
		public static readonly CommandClass = MailboxV1;
		public static readonly command = 0x03;
		public static readonly definition = {
			"command": 3,
			"name": "MailboxConfigurationReport",
			"help": "Mailbox Configuration Report",
			"status": "active",
			"params": [
				{
					"type": "bitfield",
					"name": "properties1",
					"help": "Properties1",
					"length": 1,
					"fields": [
						{
							"type": "enum",
							"name": "Mode",
							"mask": 7,
							"shift": 0,
							"values": {
								"0": "Disable",
								"1": "Enable Mailbox Service",
								"2": "Enable Mailbox Proxy"
							}
						},
						{
							"type": "enum",
							"name": "Supported Modes",
							"mask": 24,
							"shift": 3,
							"values": {
								"0": "Mailbox Service supported",
								"1": "Mailbox Proxy supported"
							}
						},
						{
							"type": "integer",
							"name": "Reserved",
							"mask": 224,
							"shift": 5
						}
					]
				},
				{
					"type": "integer",
					"name": "mailboxCapacity",
					"help": "Mailbox Capacity",
					"length": 2
				},
				{
					"type": "blob",
					"name": "forwardingDestinationIPv6Address",
					"help": "Forwarding Destination IPv6 Address",
					"length": 16
				},
				{
					"type": "integer",
					"name": "uDPPortNumber",
					"help": "UDP Port Number",
					"length": 2
				}
			]
		} as CommandDefinition;

		static matches(packet: Packet): boolean {
			return packet.tryAs(MailboxV1)?.command === this.command;
		}

		constructor(data: Buffer | MailboxV1MailboxConfigurationReportData) {
			super(MailboxConfigurationReport, data);
		}
	};

	public static readonly MailboxQueue = class MailboxQueue extends CommandPacket<MailboxV1MailboxQueueData> {
		public static readonly CommandClass = MailboxV1;
		public static readonly command = 0x04;
		public static readonly definition = {
			"command": 4,
			"name": "MailboxQueue",
			"help": "Mailbox Queue",
			"status": "active",
			"params": [
				{
					"type": "integer",
					"name": "sequenceNumber",
					"help": "Sequence Number",
					"length": 1
				},
				{
					"type": "bitfield",
					"name": "properties1",
					"help": "Properties1",
					"length": 1,
					"fields": [
						{
							"type": "enum",
							"name": "Mode",
							"mask": 3,
							"shift": 0,
							"values": {
								"0": "Push",
								"1": "Pop",
								"2": "Waiting",
								"3": "Ping",
								"4": "ACK",
								"5": "NACK",
								"6": "Queue Full"
							}
						},
						{
							"type": "boolean",
							"name": "Last",
							"mask": 4,
							"shift": 2
						},
						{
							"type": "integer",
							"name": "Reserved",
							"mask": 248,
							"shift": 3
						}
					]
				},
				{
					"type": "integer",
					"name": "queueHandle",
					"help": "Queue Handle",
					"length": 1
				},
				{
					"type": "blob",
					"name": "mailboxEntry",
					"help": "Mailbox Entry",
					"length": "auto"
				}
			]
		} as CommandDefinition;

		static matches(packet: Packet): boolean {
			return packet.tryAs(MailboxV1)?.command === this.command;
		}

		constructor(data: Buffer | MailboxV1MailboxQueueData) {
			super(MailboxQueue, data);
		}
	};

	public static readonly MailboxWakeupNotification = class MailboxWakeupNotification extends CommandPacket<MailboxV1MailboxWakeupNotificationData> {
		public static readonly CommandClass = MailboxV1;
		public static readonly command = 0x05;
		public static readonly definition = {
			"command": 5,
			"name": "MailboxWakeupNotification",
			"help": "Mailbox Wakeup Notification",
			"status": "active",
			"params": [
				{
					"type": "integer",
					"name": "queueHandle",
					"help": "Queue Handle",
					"length": 1
				}
			]
		} as CommandDefinition;

		static matches(packet: Packet): boolean {
			return packet.tryAs(MailboxV1)?.command === this.command;
		}

		constructor(data: Buffer | MailboxV1MailboxWakeupNotificationData) {
			super(MailboxWakeupNotification, data);
		}
	};

	public static readonly MailboxNodeFailing = class MailboxNodeFailing extends CommandPacket<MailboxV1MailboxNodeFailingData> {
		public static readonly CommandClass = MailboxV1;
		public static readonly command = 0x06;
		public static readonly definition = {
			"command": 6,
			"name": "MailboxNodeFailing",
			"help": "Mailbox Failing Node",
			"status": "active",
			"params": [
				{
					"type": "integer",
					"name": "queueHandle",
					"help": "Queue Handle",
					"length": 1
				}
			]
		} as CommandDefinition;

		static matches(packet: Packet): boolean {
			return packet.tryAs(MailboxV1)?.command === this.command;
		}

		constructor(data: Buffer | MailboxV1MailboxNodeFailingData) {
			super(MailboxNodeFailing, data);
		}
	};
}

export namespace MailboxV1 {
	export type MailboxConfigurationGet = InstanceType<typeof MailboxV1.MailboxConfigurationGet>;
	export type MailboxConfigurationSet = InstanceType<typeof MailboxV1.MailboxConfigurationSet>;
	export type MailboxConfigurationReport = InstanceType<typeof MailboxV1.MailboxConfigurationReport>;
	export type MailboxQueue = InstanceType<typeof MailboxV1.MailboxQueue>;
	export type MailboxWakeupNotification = InstanceType<typeof MailboxV1.MailboxWakeupNotification>;
	export type MailboxNodeFailing = InstanceType<typeof MailboxV1.MailboxNodeFailing>;
}
