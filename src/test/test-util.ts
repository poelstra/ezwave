import { expect } from "chai";
import * as sinon from "sinon";
import { defer, never, timeout, Timer } from "../common/util";

describe("util", () => {
	describe("timeout", () => {
		let clock: sinon.SinonFakeTimers;
		beforeEach(() => (clock = sinon.useFakeTimers()));
		afterEach(() => clock.restore());

		it("should timeout after given time", async () => {
			let triggered: boolean | Error = false;
			const p = timeout(never(), 1000).then(
				() => (triggered = true),
				(err) => (triggered = err)
			);
			await clock.tickAsync(999);
			expect(triggered).to.equal(false);
			await clock.tickAsync(1);
			expect(triggered).to.be.instanceOf(Error);
		});

		it("should not timeout before given time", async () => {
			const d = defer();
			let triggered: boolean | Error = false;
			const p = timeout(d.promise, 1000).then(
				() => (triggered = true),
				(err) => (triggered = err)
			);
			await clock.tickAsync(999);
			d.resolve(true);
			expect(triggered).to.equal(false);
			await clock.tickAsync(1);
			await p;
			expect(triggered).to.equal(true);
		});

		it("should have sensible stack trace on timeout", async () => {
			let error: Error | undefined;
			function someFunction(): Promise<void> {
				return timeout(never(), 1);
			}
			const p = someFunction().catch((err) => (error = err));
			await clock.tickAsync(1);
			await p;
			expect(error?.stack).to.match(/someFunction/);
		});
	});

	describe("Timer", () => {
		let clock: sinon.SinonFakeTimers;
		beforeEach(() => (clock = sinon.useFakeTimers()));
		afterEach(() => clock.restore());

		it("should start disabled", async () => {
			let triggered: boolean | Error = false;
			const timer = new Timer(1000, () => (triggered = true));
			await clock.tickAsync(2000);
			expect(triggered).to.equal(false);
		});

		it("should timeout after start", async () => {
			let triggered: boolean | Error = false;
			const timer = new Timer(1000, () => (triggered = true));
			await clock.tickAsync(2000);
			expect(triggered).to.equal(false);

			timer.start();
			await clock.tickAsync(999);
			expect(triggered).to.equal(false);

			await clock.tickAsync(1);
			expect(triggered).to.equal(true);
		});

		it("should not restart when already started", async () => {
			let triggered: boolean | Error = false;
			const timer = new Timer(1000, () => (triggered = true));
			await clock.tickAsync(2000);
			expect(triggered).to.equal(false);

			timer.start();
			await clock.tickAsync(999);
			expect(triggered).to.equal(false);

			timer.start();
			await clock.tickAsync(1);
			expect(triggered).to.equal(true);
		});

		it("should not trigger when stopped", async () => {
			let triggered: boolean | Error = false;
			const timer = new Timer(1000, () => (triggered = true));
			timer.start();
			await clock.tickAsync(999);
			expect(triggered).to.equal(false);

			timer.stop();
			await clock.tickAsync(2000);
			expect(triggered).to.equal(false);
		});
	});
});
