import { expect } from "chai";
import { SecurityV1 } from "../classes/SecurityV1";
import { SwitchMultilevelV1 } from "../classes/SwitchMultilevelV1";
import {
	Dispatch,
	DispatchNext,
	Layer,
	LayerCommand,
	LayerEvent,
	Send,
	Sender,
	SendNext,
} from "../commands/layer";
import { Packet } from "../commands/packet";
import { Requester } from "../commands/requester";
import { Stack } from "../commands/stack";
import { DestinationType } from "../serialapi/serialapi";

class FakeSecurityLayer implements Layer {
	private _requester = new Requester();

	async dispatch(
		event: LayerEvent<Packet>,
		next: DispatchNext,
		sender: Sender
	): Promise<void> {
		this._requester.dispatch(event);

		if (event.packet.is(SecurityV1.NonceGet)) {
			await sender.send({
				endpoint: event.endpoint,
				packet: new SecurityV1.NonceReport({
					nonce: Buffer.alloc(8, 0x55),
				}),
			});
			return;
		}

		// Nonce report is handled in _secureSend()
		if (event.packet.is(SecurityV1.NonceReport)) {
			return;
		}

		const encap = event.packet.tryAs(SecurityV1.MessageEncapsulation);
		if (!encap) {
			return await next(event, sender);
		}

		const ev: LayerEvent<Packet> = {
			...event,
			packet: Packet.from(encap.data.encryptedPayload),
		};
		const secureSend = this._makeSecureSender(sender);
		await next(ev, secureSend);
	}

	async send(
		command: LayerCommand,
		next: SendNext,
		send: Sender
	): Promise<boolean> {
		const secureSend = this._makeSecureSender(send);
		return await next(command, secureSend);
	}

	private _makeSecureSender(upstreamSender: Sender): Sender {
		return {
			send: (command) => this._secureSend(command, upstreamSender),
			packetCapacity: () => upstreamSender.packetCapacity() - 20,
		};
	}

	private async _secureSend(
		command: LayerCommand,
		send: Sender
	): Promise<boolean> {
		if (command.secure) {
			const nonceEvent = await this._requester.sendAndWaitFor(
				{
					endpoint: command.endpoint,
					packet: new SecurityV1.NonceGet(),
				},
				send.send,
				(evt) => evt.packet.tryAs(SecurityV1.NonceReport)
			);
			if (!nonceEvent) {
				// Send was suppressed, stop further processing.
				return false;
			}
			const senderNonce = Buffer.alloc(8, 0x44);
			const encapsulated = new SecurityV1.MessageEncapsulation({
				initializationVector: senderNonce,
				encryptedPayload: command.packet.serialize(),
				receiversNonceIdentifier: nonceEvent.packet.data.nonce[0],
				messageAuthenticationCode: Buffer.alloc(8, 0x66),
			});
			return send.send({
				...command,
				packet: encapsulated,
			});
		} else {
			return send.send(command);
		}
	}
}

class DoSomethingLayer implements Layer {
	async dispatch(
		event: LayerEvent<Packet>,
		next: DispatchNext,
		send: Sender
	): Promise<void> {
		console.log("start doSomething", event);
		if (event.packet.is(SwitchMultilevelV1.Set)) {
			console.log("SWITCH");
		} else if (event.packet.is(SwitchMultilevelV1.Get)) {
			console.log("SWITCH GET");
			await send.send({
				endpoint: event.endpoint,
				packet: new SwitchMultilevelV1.Report({ value: 80 }),
				secure: true,
			});
		}
		await next(event, send);
		console.log("end doSomething");
	}
}

describe("layers", () => {
	let stack: Stack;
	let send: Send;
	let dispatch: Dispatch;

	beforeEach(() => {
		const sender: Sender = {
			send: (command) => send(command),
			packetCapacity: () => 54,
		};
		const dispatcher: Dispatch = (event) => dispatch(event);
		stack = new Stack(sender, dispatcher)
			.use(new FakeSecurityLayer())
			.use(new DoSomethingLayer());
	});

	it("sends simple message", async () => {
		const actualSends: Packet[] = [];
		const expectedSends: Packet[] = [
			new SwitchMultilevelV1.Set({ value: 20 }),
		];
		send = (command) => {
			actualSends.push(command.packet);
			console.log("--> send", command);
			command.afterSend && command.afterSend();
			return true;
		};
		await stack.send({
			endpoint: { nodeId: 2 },
			packet: new SwitchMultilevelV1.Set({ value: 20 }),
		});
		expect(actualSends).to.deep.equal(expectedSends);
	});

	it("sends secure message", async () => {
		const actualSends: Packet[] = [];
		const expectedSends: Packet[] = [
			new SecurityV1.NonceGet(),
			new SecurityV1.MessageEncapsulation({
				initializationVector: Buffer.alloc(8, 0x44),
				encryptedPayload: new SwitchMultilevelV1.Set({
					value: 20,
				}).serialize(),
				receiversNonceIdentifier: 0xaa,
				messageAuthenticationCode: Buffer.alloc(8, 0x66),
			}),
		];
		send = async (command) => {
			actualSends.push(command.packet);
			console.log("--> send", command);
			command.afterSend && command.afterSend();
			// Mimick response from remote device
			if (command.packet.is(SecurityV1.NonceGet)) {
				await stack.dispatch({
					packetType: DestinationType.Singlecast,
					endpoint: command.endpoint,
					packet: new SecurityV1.NonceReport({
						nonce: Buffer.alloc(8, 0xaa),
					}),
				});
			}
			return true;
		};
		await stack.send({
			endpoint: { nodeId: 2 },
			packet: new SwitchMultilevelV1.Set({ value: 20 }),
			secure: true,
		});
		expect(actualSends).to.deep.equal(expectedSends);
	});

	it("correctly discards too early packets", async () => {
		const actualSends: Packet[] = [];
		const expectedSends: Packet[] = [
			new SecurityV1.NonceGet(),
			new SecurityV1.MessageEncapsulation({
				initializationVector: Buffer.alloc(8, 0x44),
				encryptedPayload: new SwitchMultilevelV1.Set({
					value: 20,
				}).serialize(),
				receiversNonceIdentifier: 0x88,
				messageAuthenticationCode: Buffer.alloc(8, 0x66),
			}),
		];
		let afterSendCalled = 0;
		send = async (command) => {
			actualSends.push(command.packet);
			console.log("--> send", command);

			// Mimick response from remote device, but act like we just
			// received a package before we *actually* sent out our
			// nonce_get.
			if (command.packet.is(SecurityV1.NonceGet)) {
				await stack.dispatch({
					packetType: DestinationType.Singlecast,
					endpoint: command.endpoint,
					packet: new SecurityV1.NonceReport({
						nonce: Buffer.alloc(8, 0x77),
					}),
				});
			}
			command.afterSend && command.afterSend();
			if (command.packet.is(SecurityV1.NonceGet)) {
				expect(afterSendCalled).to.equal(0);
				await stack.dispatch({
					packetType: DestinationType.Singlecast,
					endpoint: command.endpoint,
					packet: new SecurityV1.NonceReport({
						nonce: Buffer.alloc(8, 0x88),
					}),
				});
			}
			return true;
		};
		await stack.send({
			endpoint: { nodeId: 2 },
			packet: new SwitchMultilevelV1.Set({ value: 20 }),
			secure: true,
			afterSend: () => afterSendCalled++,
		});
		expect(actualSends).to.deep.equal(expectedSends);
		expect(afterSendCalled).to.equal(1);
	});

	it("handles events", async () => {
		// source event, final dispatches, sent packets
		const tests: [Packet, Packet[], Packet[]][] = [
			[
				new SwitchMultilevelV1.Report({ value: 0 }),
				[new SwitchMultilevelV1.Report({ value: 0 })],
				[],
			],
			[
				new SecurityV1.NonceGet(),
				[],
				[new SecurityV1.NonceReport({ nonce: Buffer.alloc(8, 0x55) })],
			],
			[
				new SecurityV1.MessageEncapsulation({
					initializationVector: Buffer.alloc(8, 0x11),
					encryptedPayload: new SwitchMultilevelV1.Set({
						value: 99,
					}).serialize(),
					receiversNonceIdentifier: 0xaa,
					messageAuthenticationCode: Buffer.alloc(8, 0x77),
				}),
				[
					Packet.from(
						new SwitchMultilevelV1.Set({ value: 99 }).serialize()
					),
				],
				[],
			],
			[
				new SecurityV1.MessageEncapsulation({
					initializationVector: Buffer.alloc(8, 0x11),
					encryptedPayload: new SwitchMultilevelV1.Get().serialize(),
					receiversNonceIdentifier: 0x12,
					messageAuthenticationCode: Buffer.alloc(8, 0x77),
				}),
				[Packet.from(new SwitchMultilevelV1.Get().serialize())],
				[
					new SecurityV1.NonceGet(),
					new SecurityV1.MessageEncapsulation({
						initializationVector: Buffer.alloc(8, 0x44),
						encryptedPayload: new SwitchMultilevelV1.Report({
							value: 80,
						}).serialize(),
						receiversNonceIdentifier: 0xaa,
						messageAuthenticationCode: Buffer.alloc(8, 0x66),
					}),
				],
			],
		];
		let actualSends: Packet[];
		send = async (command) => {
			console.log("--> send", command);
			actualSends.push(command.packet);
			command.afterSend && command.afterSend();
			// Mimick response from remote device
			if (command.packet.is(SecurityV1.NonceGet)) {
				await stack.dispatch({
					packetType: DestinationType.Singlecast,
					endpoint: command.endpoint,
					packet: new SecurityV1.NonceReport({
						nonce: Buffer.alloc(8, 0xaa),
					}),
				});
			}
			return true;
		};
		let actualDispatches: Packet[];
		dispatch = (event) => {
			console.log("--> final dispatch", event);
			actualDispatches.push(event.packet);
		};
		for (const [ev, expectedDispatches, expectedSends] of tests) {
			actualSends = [];
			actualDispatches = [];
			console.log(`<-- dispatch`, ev);
			await stack.dispatch({
				packetType: DestinationType.Singlecast,
				endpoint: { nodeId: 12 },
				packet: ev,
			});
			expect(actualDispatches).to.deep.equal(expectedDispatches);
			expect(actualSends).to.deep.equal(expectedSends);
			console.log("");
		}
	});
});
