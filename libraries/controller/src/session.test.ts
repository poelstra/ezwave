import { BasicV1 } from "@ezwave/commands";
import { BasicV1BasicReportData } from "@ezwave/commands/lib/generated/BasicV1";
import { ZwGetVersion } from "@ezwave/serialapi";
import { defer, nextTick } from "@ezwave/shared";
import {
	buildControllerSessionExecutor,
	ControllerSessionRunner,
	RootControllerSession,
	SendOptions,
} from "./session";

const basicGetPacket = new BasicV1.BasicGet();
const basicReportPacket = new BasicV1.BasicReport({ value: 42 });

function createMockSession(): RootControllerSession {
	return {
		controllerId: 1,
		executeSerial: jest.fn(),
		send: jest.fn(),
	};
}

describe("transaction", () => {
	describe("SessionManager", () => {
		it("supports send", async () => {
			const sendOptions: SendOptions = {};
			const runner: ControllerSessionRunner<void> = async (session) => {
				await session.send(basicGetPacket, sendOptions);
			};
			const mockSession = createMockSession();
			const sessionExecutor = buildControllerSessionExecutor(
				runner,
				mockSession
			);
			await sessionExecutor.run();
			expect(mockSession.send).toBeCalledTimes(1);
			expect(mockSession.send).lastCalledWith(
				basicGetPacket,
				sendOptions
			);
		});

		it("supports waitFor and response", async () => {
			let awaited;
			const runner: ControllerSessionRunner<number> = async (session) => {
				awaited = await session.waitFor(BasicV1.BasicReport);
				return 123;
			};
			const mockSession = createMockSession();
			const sessionExecutor = buildControllerSessionExecutor(
				runner,
				mockSession
			);
			const result = sessionExecutor.run();
			await nextTick();
			expect(awaited).toBeUndefined();

			sessionExecutor.dispatch(basicReportPacket);
			await nextTick();
			expect(awaited).toEqual({ value: 42 });
			await expect(result).resolves.toEqual(123);
		});

		it("supports nested session", async () => {
			const innerRunner: ControllerSessionRunner<number> = async (
				session
			) => {
				await session.send(basicGetPacket);
				return 123;
			};
			const outerRunner: ControllerSessionRunner<number> = async (
				session
			) => {
				// Start inner runner
				const innerRun = session.execute(innerRunner);

				// Current session must be 'blocked' for that duration
				const send = session.send(basicReportPacket);
				const executeSerial = session.executeSerialCommand(
					new ZwGetVersion()
				);
				const nestedExecute2 = session.execute(async () => {});
				await expect(send).rejects.toThrowError("nested session");
				await expect(executeSerial).rejects.toThrowError(
					"nested session"
				);
				await expect(nestedExecute2).rejects.toThrowError(
					"nested session"
				);

				const awaited = await innerRun;

				// After inner session ends, everything should work again
				await session.send(basicReportPacket);
				return awaited;
			};
			const mockSession = createMockSession();
			const sessionExecutor = buildControllerSessionExecutor(
				outerRunner,
				mockSession
			);
			const result = await sessionExecutor.run();
			expect(mockSession.send).toBeCalledTimes(2);
			expect(mockSession.send).nthCalledWith(
				1,
				basicGetPacket,
				undefined
			);
			expect(mockSession.send).nthCalledWith(
				2,
				basicReportPacket,
				undefined
			);
			expect(result).toEqual(123);
		});

		it("forwards 'unused' events between sessions", async () => {
			const beforeInnerSession = defer<void>();
			const duringInnerSession = defer<void>();
			const innerRunner: ControllerSessionRunner<number> = async (
				session
			) => {
				await session.waitFor(BasicV1.BasicGet);
				await duringInnerSession.promise;
				return 123;
			};
			const outerRunner: ControllerSessionRunner<
				BasicV1BasicReportData
			> = async (session) => {
				await beforeInnerSession.promise;
				await session.execute(innerRunner);
				return await session.waitFor(BasicV1.BasicReport);
			};
			const mockSession = createMockSession();
			const sessionExecutor = buildControllerSessionExecutor(
				outerRunner,
				mockSession
			);
			const resultP = sessionExecutor.run();
			// Dispatch first packet in outer session
			sessionExecutor.dispatch(basicGetPacket);
			beforeInnerSession.resolve();
			// Ensure we're waiting in the inner session
			await nextTick();
			// Dispatch packet in inner session
			sessionExecutor.dispatch(basicReportPacket);
			duringInnerSession.resolve();
			await expect(resultP).resolves.toEqual({ value: 42 });
		});
	});
});
