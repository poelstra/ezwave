import { Packet } from "@ezwave/codec";
import { SecurityV1, SwitchMultilevelV1 } from "@ezwave/commands";
import { DestinationType } from "@ezwave/serialapi";
import {
	Dispatch,
	DispatchNext,
	Layer,
	LayerCommand,
	LayerEvent,
	Send,
	Sender,
	SendNext,
} from "./layer";
import { Requester } from "./requester";
import { Stack } from "./stack";

class FakeSecurityLayer implements Layer {
	private _requester: Requester = new Requester();

	public async dispatch(
		event: LayerEvent<Packet>,
		next: DispatchNext,
		sender: Sender
	): Promise<void> {
		this._requester.dispatch(event);

		if (event.packet.is(SecurityV1.SecurityNonceGet)) {
			await sender.send({
				endpoint: event.endpoint,
				packet: new SecurityV1.SecurityNonceReport({
					nonce: Buffer.alloc(8, 0x55),
				}),
			});
			return;
		}

		// Nonce report is handled in _secureSend()
		if (event.packet.is(SecurityV1.SecurityNonceReport)) {
			return;
		}

		const encap = event.packet.tryAs(
			SecurityV1.SecurityMessageEncapsulation
		);
		if (!encap) {
			return await next(event, sender);
		}

		const ev: LayerEvent<Packet> = {
			...event,
			packet: new Packet(encap.data.encryptedPayload),
		};
		const secureSend = this._makeSecureSender(sender);
		await next(ev, secureSend);
	}

	public async send(
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
					packet: new SecurityV1.SecurityNonceGet(),
				},
				send.send,
				(evt) => evt.packet.tryAs(SecurityV1.SecurityNonceReport)
			);
			if (!nonceEvent) {
				// Send was suppressed, stop further processing.
				return false;
			}
			const senderNonce = Buffer.alloc(8, 0x44);
			const encapsulated = new SecurityV1.SecurityMessageEncapsulation({
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
	public async dispatch(
		event: LayerEvent<Packet>,
		next: DispatchNext,
		send: Sender
	): Promise<void> {
		console.log("start doSomething", event);
		if (event.packet.is(SwitchMultilevelV1.SwitchMultilevelSet)) {
			console.log("SWITCH");
		} else if (event.packet.is(SwitchMultilevelV1.SwitchMultilevelGet)) {
			console.log("SWITCH GET");
			await send.send({
				endpoint: event.endpoint,
				packet: new SwitchMultilevelV1.SwitchMultilevelReport({
					value: 80,
				}),
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
			new SwitchMultilevelV1.SwitchMultilevelSet({ value: 20 }),
		];
		send = (command) => {
			actualSends.push(command.packet);
			console.log("--> send", command);
			// eslint-disable-next-line no-unused-expressions
			command.afterSend && command.afterSend();
			return true;
		};
		await stack.send({
			endpoint: { nodeId: 2 },
			packet: new SwitchMultilevelV1.SwitchMultilevelSet({ value: 20 }),
		});
		expect(actualSends).toEqual(expectedSends);
	});

	it("sends secure message", async () => {
		const actualSends: Packet[] = [];
		const expectedSends: Packet[] = [
			new SecurityV1.SecurityNonceGet(),
			new SecurityV1.SecurityMessageEncapsulation({
				initializationVector: Buffer.alloc(8, 0x44),
				encryptedPayload: new SwitchMultilevelV1.SwitchMultilevelSet({
					value: 20,
				}).serialize(),
				receiversNonceIdentifier: 0xaa,
				messageAuthenticationCode: Buffer.alloc(8, 0x66),
			}),
		];
		send = async (command) => {
			actualSends.push(command.packet);
			console.log("--> send", command);
			// eslint-disable-next-line no-unused-expressions
			command.afterSend && command.afterSend();
			// Mimick response from remote device
			if (command.packet.is(SecurityV1.SecurityNonceGet)) {
				await stack.dispatch({
					destinationType: DestinationType.Singlecast,
					endpoint: command.endpoint,
					packet: new SecurityV1.SecurityNonceReport({
						nonce: Buffer.alloc(8, 0xaa),
					}),
					secure: false,
				});
			}
			return true;
		};
		await stack.send({
			endpoint: { nodeId: 2 },
			packet: new SwitchMultilevelV1.SwitchMultilevelSet({ value: 20 }),
			secure: true,
		});
		expect(actualSends).toEqual(expectedSends);
	});

	it("correctly discards too early packets", async () => {
		const actualSends: Packet[] = [];
		const expectedSends: Packet[] = [
			new SecurityV1.SecurityNonceGet(),
			new SecurityV1.SecurityMessageEncapsulation({
				initializationVector: Buffer.alloc(8, 0x44),
				encryptedPayload: new SwitchMultilevelV1.SwitchMultilevelSet({
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
			if (command.packet.is(SecurityV1.SecurityNonceGet)) {
				await stack.dispatch({
					destinationType: DestinationType.Singlecast,
					endpoint: command.endpoint,
					packet: new SecurityV1.SecurityNonceReport({
						nonce: Buffer.alloc(8, 0x77),
					}),
					secure: false,
				});
			}
			// eslint-disable-next-line no-unused-expressions
			command.afterSend && command.afterSend();
			if (command.packet.is(SecurityV1.SecurityNonceGet)) {
				expect(afterSendCalled).toBe(0);
				await stack.dispatch({
					destinationType: DestinationType.Singlecast,
					endpoint: command.endpoint,
					packet: new SecurityV1.SecurityNonceReport({
						nonce: Buffer.alloc(8, 0x88),
					}),
					secure: false,
				});
			}
			return true;
		};
		await stack.send({
			endpoint: { nodeId: 2 },
			packet: new SwitchMultilevelV1.SwitchMultilevelSet({ value: 20 }),
			secure: true,
			afterSend: () => afterSendCalled++,
		});
		expect(actualSends).toEqual(expectedSends);
		expect(afterSendCalled).toBe(1);
	});

	it("handles events", async () => {
		// source event, final dispatches, sent packets
		const tests: [Packet, Packet[], Packet[]][] = [
			[
				new SwitchMultilevelV1.SwitchMultilevelReport({ value: 0 }),
				[new SwitchMultilevelV1.SwitchMultilevelReport({ value: 0 })],
				[],
			],
			[
				new SecurityV1.SecurityNonceGet(),
				[],
				[
					new SecurityV1.SecurityNonceReport({
						nonce: Buffer.alloc(8, 0x55),
					}),
				],
			],
			[
				new SecurityV1.SecurityMessageEncapsulation({
					initializationVector: Buffer.alloc(8, 0x11),
					encryptedPayload:
						new SwitchMultilevelV1.SwitchMultilevelSet({
							value: 99,
						}).serialize(),
					receiversNonceIdentifier: 0xaa,
					messageAuthenticationCode: Buffer.alloc(8, 0x77),
				}),
				[
					new Packet(
						new SwitchMultilevelV1.SwitchMultilevelSet({
							value: 99,
						}).serialize()
					),
				],
				[],
			],
			[
				new SecurityV1.SecurityMessageEncapsulation({
					initializationVector: Buffer.alloc(8, 0x11),
					encryptedPayload:
						new SwitchMultilevelV1.SwitchMultilevelGet().serialize(),
					receiversNonceIdentifier: 0x12,
					messageAuthenticationCode: Buffer.alloc(8, 0x77),
				}),
				[
					new Packet(
						new SwitchMultilevelV1.SwitchMultilevelGet().serialize()
					),
				],
				[
					new SecurityV1.SecurityNonceGet(),
					new SecurityV1.SecurityMessageEncapsulation({
						initializationVector: Buffer.alloc(8, 0x44),
						encryptedPayload:
							new SwitchMultilevelV1.SwitchMultilevelReport({
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
			// eslint-disable-next-line no-unused-expressions
			command.afterSend && command.afterSend();
			// Mimick response from remote device
			if (command.packet.is(SecurityV1.SecurityNonceGet)) {
				await stack.dispatch({
					destinationType: DestinationType.Singlecast,
					endpoint: command.endpoint,
					packet: new SecurityV1.SecurityNonceReport({
						nonce: Buffer.alloc(8, 0xaa),
					}),
					secure: false,
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
				destinationType: DestinationType.Singlecast,
				endpoint: { nodeId: 12 },
				packet: ev,
				secure: false,
			});
			expect(actualDispatches).toEqual(expectedDispatches);
			expect(actualSends).toEqual(expectedSends);
			console.log("");
		}
	});
});
