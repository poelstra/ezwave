import { Codec, DataType, Packet, FrameType, LineError, SerialAPICommand, packetToString, DataPacket, SimplePacket, bufferToString } from "./codec";
import { EventEmitter } from "events";
import * as Queue from "promise-queue";
import { Timer, delay, Deferred, defer } from "./util";

const ACK_TIMEOUT = 1600;
const REQ_TIMEOUT = 5000; // TODO: random value for now, should depend on specific call?
const MAX_RETRANSMISSIONS = 3;

export class Protocol extends EventEmitter {
	private _codec: Codec;
	private _invalidPackets = 0;
	private _requests = new Queue(1, Infinity);
	private _ackResult: ((packet: SimplePacket) => void) | undefined;
	private _ackTimer: Timer;
	private _reqResult: Deferred<DataPacket> | undefined;
	private _reqPacket: DataPacket | undefined;
	private _reqTimer: Timer;

	constructor(codec: Codec) {
		super();
		this._codec = codec;
		this._codec.on("data", (packet) => this._handlePacket(packet));
		this._codec.on("lineError", (error) => this._handleLineError(error));
		this._codec.on("close", () => this.emit("reset"));

		this._ackTimer = new Timer(ACK_TIMEOUT, () => this._handleAckTimeout());
		this._reqTimer = new Timer(REQ_TIMEOUT, () => this._handleReqTimeout());
	}

	/*public async sendRaw(packet: Packet): Promise<Packet> {
		return this._sendRaw(packet);
	}*/

	public async send(cmd: SerialAPICommand, params?: Buffer): Promise<void> {
		const packet: DataPacket = {
			frameType: FrameType.SOF,
			dataType: DataType.REQ,
			command: cmd,
			params: params ? params : Buffer.alloc(1)
		};
		return this._requests.add(() => this._send(packet));
	}

	public async request(cmd: SerialAPICommand, params?: Buffer): Promise<Buffer> {
		const request: DataPacket = {
			frameType: FrameType.SOF,
			dataType: DataType.REQ,
			command: cmd,
			params: params ? params : Buffer.alloc(1)
		};
		return this._requests.add(async (): Promise<Buffer> => {
			console.log("BEGIN REQUEST", cmd, params ? bufferToString(params) : "");
			this._reqResult = defer<DataPacket>();
			const result = this._reqResult.promise;
			this._reqPacket = request;
			this._reqTimer.start();
			await this._send(request);
			const resultPacket = await result;
			console.log("END REQUEST", bufferToString(resultPacket.params));
			return resultPacket.params;
		});
	}

	private _handlePacket(packet: Packet): void {
		console.log("\tRECV", packetToString(packet));
		switch (packet.frameType) {
			case FrameType.ACK:
			case FrameType.NAK:
			case FrameType.CAN:
				if (this._ackResult) {
					this._ackResult(packet);
					this._ackResult = undefined;
					this._ackTimer.stop();
				}
				break;
			case FrameType.SOF:
				switch (packet.dataType) {
					case DataType.REQ:
						this.emit("event", packet);
						this._sendRaw({ frameType: FrameType.ACK });
						break;
					case DataType.RES:
						if (this._reqResult && this._reqPacket && this._reqPacket.command === packet.command) {
							this._reqResult.resolve(packet);
							this._reqResult = undefined;
							this._reqPacket = undefined;
							this._reqTimer.stop();
						} else {
							console.warn("WARN", "unknown response");
						}
						this._sendRaw({ frameType: FrameType.ACK });
						break;
					default:
						// INS12350 5.4.3 Type
						// A receiving end MUST ignore reserved Type values
				}
				break;
		}
	}

	private _handleLineError(lineError: LineError): void {
		console.warn("WARN", LineError[lineError]);
		this._sendRaw({ frameType: FrameType.NAK });

		// INS12350 6.4.2 Persistent CRC errors
		this._invalidPackets++;
		if (this._invalidPackets === 3) {
			this.emit("reset"); // Request driver to be closed and re-constructed
			return;
		}
	}

	private _handleAckTimeout(): void {
		console.warn("WARN", "ACK timeout");
		if (this._ackResult) {
			// INS12350 6.2.2
			// The loss of a Data frame MUST be treated as the reception of a NAK frame; refer to 6.3.
			this._ackResult({ frameType: FrameType.NAK });
			this._ackResult = undefined;
		}
	}

	private _handleReqTimeout(): void {
		console.warn("WARN", "REQ timeout");
		if (this._reqResult) {
			this._reqResult.reject(new Error("timeout"));
			this._reqResult = undefined;
		}
	}

	private async _send(packet: DataPacket): Promise<void> {
		for (let i = 0; i <= MAX_RETRANSMISSIONS; i++) {
			const result = await this._sendDataAndWaitForACK(packet);
			if (result.frameType === FrameType.ACK) {
				// Done
				return;
			}
			// Retransmit after waiting period
			await delay(100 + i * 1000);
		}
		// More than 3 retransmissions, reset driver
		this.emit("reset");
	}

	private async _sendDataAndWaitForACK(packet: DataPacket): Promise<SimplePacket> {
		return new Promise<SimplePacket>((resolve) => {
			if (this._ackResult) {
				throw new Error("internal error: previous request still pending");
			}
			this._ackTimer.start();
			this._ackResult = resolve;
			this._sendRaw(packet);
		});
	}

	private _sendRaw(packet: Packet): void {
		console.log("\tSEND", packetToString(packet));
		this._codec.write(packet);
	}
}
