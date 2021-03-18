import { Queue } from "./queue";
import { defer } from "./util";

describe("common/queue", () => {
	describe("Queue", () => {
		it("should start callback", async () => {
			const q = new Queue();
			const stub = jest.fn();
			// eslint-disable-next-line @typescript-eslint/no-floating-promises
			q.add(stub);
			expect(stub).toBeCalledTimes(1);
			expect(stub).toBeCalledWith();
			expect(stub.mock.instances).toEqual([undefined]);
		});

		it("should wait until callback returns", async () => {
			const q = new Queue();
			const d = defer<number>();
			let done: number | undefined = undefined;
			const result = q
				.add(() => d.promise)
				.then((value) => (done = value));
			await Promise.resolve(); // tick
			expect(done).toBeUndefined();
			d.resolve(42);
			await result;
			expect(done).toBe(42);
		});

		it("should wait with second callback until first returns", async () => {
			const q = new Queue();
			const d1 = defer<number>();
			let done1: number | undefined = undefined;
			const result1 = q
				.add(() => d1.promise)
				.then((value) => (done1 = value));

			const stub2 = jest.fn();
			// eslint-disable-next-line @typescript-eslint/no-floating-promises
			q.add(stub2);

			await Promise.resolve(); // tick
			expect(done1).toBeUndefined();
			expect(stub2).toBeCalledTimes(0);

			d1.resolve(42);
			await result1;
			expect(done1).toBe(42);

			expect(stub2).toBeCalledTimes(1);
		});
	});
});
