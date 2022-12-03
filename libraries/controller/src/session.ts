import { CommandPacket, CommandPacketConstructor, Packet } from "@ezwave/codec";
import { ICommandSessionRunner } from "@ezwave/serialapi";
import { timeout } from "@ezwave/shared";
import { inspect } from "util";

export interface SessionRunner<Result> {
	(session: Session): Promise<Result>;
	inspect?(): string;
}

export interface ControllerSessionRunner<T> {
	(session: ControllerSession): Promise<T>;
	inspect?(): string;
}

export interface SessionExecutor<T> {
	dispatch(packet: Packet): void;
	run(): Promise<T>;
}

export type PacketMapper<T> = (packet: Packet) => T | undefined;

export interface Session {
	send(packet: Packet, options?: SendOptions): Promise<void>;

	waitFor<R extends CommandPacket<void | object>>(
		expectedResponseType: CommandPacketConstructor<R>,
		options?: WaitForOptions
	): Promise<R["data"]>;
	waitFor<R>(
		packetMapper: PacketMapper<R>,
		options?: WaitForOptions
	): Promise<R>;

	execute<T>(runner: SessionRunner<T>): Promise<T>;
}

export interface ControllerSession extends Session {
	execute<T>(runner: ControllerSessionRunner<T>): Promise<T>;

	executeSerialCommand<T>(
		// TODO Change ICommandSessionRunner to this same session mechanism?
		runner: ICommandSessionRunner<T>
	): Promise<T>;
}

export interface RootControllerSession {
	send(packet: Packet, sendOptions?: SendOptions): Promise<void>;
	executeSerial<T>(runner: ICommandSessionRunner<T>): Promise<T>;
}

interface Waiter<T> {
	mapper: PacketMapper<T>;
	resolve: (result: T | Promise<T>) => void;
}

// TODO move to generic place?
function isMapper<T extends Packet>(
	x: CommandPacketConstructor<T> | PacketMapper<T>
): x is PacketMapper<T> {
	return !("matches" in x);
}

export interface SendOptions {
	/**
	 * Whether to send command securely.
	 *
	 * Defaults to true if unspecified. // TODO Currently still false, because S0 layer can't check whether other side actually supports it
	 */
	secure?: boolean;

	/**
	 * Timeout of request in milliseconds.
	 */
	timeout?: number;
}

export interface WaitForOptions {
	/**
	 * Timeout of request in milliseconds.
	 */
	timeout?: number;
}

const DEFAULT_WAIT_FOR_OPTIONS: Required<WaitForOptions> = {
	timeout: 10 * 1000,
};

export type SerialCommandExecutor<T> = (
	// TODO Change ICommandSessionRunner to ControllerSession?
	runner: ICommandSessionRunner<T>
) => Promise<T>;

// TODO Probably better to convert this into a function, returning the two independent interfaces
class SessionManager<T> implements ControllerSession, SessionExecutor<T> {
	private _rootSession: RootControllerSession;
	private _runner: ControllerSessionRunner<T>;
	private _packets: Packet[] = [];
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	private _waiter: Waiter<any> | undefined;
	private _nested: SessionManager<unknown> | undefined;
	private _closed: boolean = false;

	/* SessionExecutor interface */

	public constructor(
		runner: ControllerSessionRunner<T>,
		rootSession: RootControllerSession
	) {
		this._rootSession = rootSession;
		this._runner = runner;
	}

	public dispatch(packet: Packet): void {
		if (this._nested) {
			this._nested.dispatch(packet);
			return;
		}
		this._packets.push(packet);
		this._pump();
	}

	public async run(): Promise<T> {
		try {
			return await this._runner(this);
		} finally {
			this._close();
		}
	}

	/* Session interface */

	public async send(
		packet: Packet,
		sendOptions?: SendOptions
	): Promise<void> {
		this._checkActive();
		return this._rootSession.send(packet, sendOptions);
	}

	public waitFor<R extends CommandPacket<void | object>>(
		expectedResponseType: CommandPacketConstructor<R>,
		options?: WaitForOptions | undefined
	): Promise<R["data"]>;
	public waitFor<R>(
		mapper: PacketMapper<R>,
		options?: WaitForOptions | undefined
	): Promise<R>;
	public async waitFor<R>(
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		packetOrMapper: CommandPacketConstructor<any> | PacketMapper<R>,
		options?: WaitForOptions
	): Promise<R> {
		this._checkActive();
		if (this._waiter) {
			throw new Error("waitFor already active on this session");
		}

		let mapper: PacketMapper<R>;
		if (isMapper(packetOrMapper)) {
			mapper = packetOrMapper;
		} else {
			// Note: the mapper just returns the packet (not its data),
			// as the data may be void. This would cause the mapper to
			// keep searching. Instead, we pick the data after a match
			// is made.
			const packetConstructor = packetOrMapper;
			mapper = (packet: Packet) => packet.tryAs(packetConstructor);
		}

		const requiredOptions = {
			...DEFAULT_WAIT_FOR_OPTIONS,
			...options,
		};

		try {
			const result = new Promise<R>((resolve) => {
				this._waiter = {
					mapper,
					resolve,
				};
			});
			this._pump();
			const mappedResult = await timeout(
				result,
				requiredOptions.timeout,
				`waitFor timed out after ${requiredOptions.timeout}ms`
			);
			if (!isMapper(packetOrMapper)) {
				// eslint-disable-next-line @typescript-eslint/no-explicit-any
				return (mappedResult as unknown as CommandPacket<any>).data;
			}
			return mappedResult;
		} finally {
			this._waiter = undefined;
		}
	}

	public async execute<R>(runner: SessionRunner<R>): Promise<R> {
		this._checkActive();
		try {
			const nested = new SessionManager(runner, this._rootSession);
			this._nested = nested;

			// Transfer 'unused' events in current session to child
			this._nested._packets = this._packets;
			this._packets = [];

			return await nested.run();
		} finally {
			// Transfer 'unused' events in child to current
			this._packets = this._nested!._packets;
			this._nested!._packets = [];
			this._nested = undefined;
		}
	}

	public async executeSerialCommand<T>(
		runner: ICommandSessionRunner<T>
	): Promise<T> {
		this._checkActive();
		return this._rootSession.executeSerial(runner);
	}

	private _close(): void {
		this._closed = true;
		if (this._waiter) {
			this._waiter.resolve(Promise.reject(new Error("session closed")));
		}
	}

	private _checkActive(): void {
		if (this._closed) {
			throw new Error("session already closed");
		}
		if (this._nested) {
			throw new Error("nested session is active");
		}
	}

	private _pump(): void {
		if (!this._waiter) {
			return;
		}
		const packet = this._packets.pop();
		if (!packet) {
			return;
		}
		try {
			const mapped = this._waiter.mapper(packet);
			if (mapped !== undefined) {
				this._waiter.resolve(mapped);
				// Synchronously unassign, as new packet may already arrive
				// while previous waiter is still resolving, and we want these
				// packets to be queued up for next waitFor().
				this._waiter = undefined;
			}
		} catch (err) {
			// Mapper crashed, return it to waitFor()
			this._waiter?.resolve(Promise.reject(err));
			this._waiter = undefined;
		}
	}
}

export function buildControllerSessionExecutor<T>(
	runner: ControllerSessionRunner<T>,
	rootSession: RootControllerSession
): SessionExecutor<T> {
	return new SessionManager(runner, rootSession);
}

export function named<T>(
	name: string,
	runner: ControllerSessionRunner<T>
): ControllerSessionRunner<T> {
	const namedRunner: ControllerSessionRunner<T> = (
		session: ControllerSession
	): Promise<T> => runner(session);
	namedRunner.inspect = () => name;
	return namedRunner;
}

// TODO Anonymous lambda's are nice to type, but a mess to get a name for.
// Not sure the current approach is better/nicer than explicitly passing name/args
// to e.g. execute(), or passing an object to execute().
export function namedSessionRunner<Result, Request = void>(
	name: string,
	request: Request,
	runner: (session: Session, request: Request) => Promise<Result>
): SessionRunner<Result> {
	const functionNamer: { [name: string]: SessionRunner<Result> } = {
		[name]: (session: Session): Promise<Result> => runner(session, request),
	};
	const namedRunner = functionNamer[name];
	if (request === undefined) {
		namedRunner.inspect = () => `<${name}>`;
	} else {
		namedRunner.inspect = () =>
			`<${name} request=${inspect(request, { depth: 10 })}>`;
	}
	return namedRunner;
}

export async function waitForFiltered<R extends CommandPacket<void | object>>(
	session: Session,
	expectedResponseType: CommandPacketConstructor<R>,
	filter: (data: R["data"]) => boolean,
	options?: WaitForOptions
): Promise<R["data"]> {
	return session.waitFor((packet) => {
		const parsedPacket = packet.tryAs(expectedResponseType);
		return parsedPacket && filter(parsedPacket.data)
			? parsedPacket.data
			: undefined;
	}, options);
}

// TODO Consider moving elsewhere, e.g. commands
// TODO Consider adding metadata to CommandPackets to automatically return
//      the right type of responses for a given request
export async function waitForAll<R extends CommandPacket<void | object>>(
	session: Session,
	expectedResponseType: CommandPacketConstructor<R>,
	matcher: (data: R["data"]) => boolean,
	reportsToFollowMapper: (report: R["data"]) => number,
	waitForOptions?: WaitForOptions
): Promise<R["data"][]> {
	const rawReports = new Map<number, R["data"]>();
	// eslint-disable-next-line no-constant-condition
	while (true) {
		const report = await waitForFiltered(
			session,
			expectedResponseType,
			matcher,
			waitForOptions
		);
		const reportsToFollow = reportsToFollowMapper(report);
		rawReports.set(reportsToFollow, report);
		if (reportsToFollow === 0) {
			// Done
			break;
		}
	}
	const numReports = Math.max(...rawReports.keys()) + 1;
	if (numReports !== rawReports.size) {
		throw new Error(
			`invalid number of reports received, expected ${numReports}, got ${rawReports.size}`
		);
	}

	const reports: R["data"][] = [];
	for (let i = 0; i < numReports; i++) {
		// We stored the reports in reverse order of retrieval, so iterate
		// backwards
		const report = rawReports.get(numReports - i - 1);
		if (!report) {
			throw new Error(
				`invalid number of reports received, missing report ${i} out of ${numReports}`
			);
		}
		reports.push(report);
	}

	return reports;
}
