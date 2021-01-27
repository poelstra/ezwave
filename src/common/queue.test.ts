import * as chai from "chai";
import { expect } from "chai";
import * as chaiAsPromised from "chai-as-promised";
import { describe, it } from "mocha";
import * as sinon from "sinon";
import { Queue } from "./queue";
import { defer } from "./util";

chai.use(chaiAsPromised);

describe("common/queue", () => {
	describe("Queue", () => {
		it("should start callback", async () => {
			const q = new Queue();
			const stub = sinon.stub();
			q.add(stub);
			expect(stub.calledOnceWithExactly()).to.equal(true);
			expect(stub.thisValues).to.deep.equal([undefined]);
		});

		it("should wait until callback returns", async () => {
			const q = new Queue();
			const d = defer<number>();
			let done: number | undefined = undefined;
			const result = q
				.add(() => d.promise)
				.then((value) => (done = value));
			await Promise.resolve(); // tick
			expect(done).to.equal(undefined);
			d.resolve(42);
			await result;
			expect(done).to.equal(42);
		});

		it("should wait with second callback until first returns", async () => {
			const q = new Queue();
			const d1 = defer<number>();
			const d2 = defer<number>();
			let done1: number | undefined = undefined;
			let done2: number | undefined = undefined;
			const result1 = q
				.add(() => d1.promise)
				.then((value) => (done1 = value));

			const stub2 = sinon.stub();
			q.add(stub2);

			await Promise.resolve(); // tick
			expect(done1).to.equal(undefined);
			expect(stub2.notCalled).to.equal(true);

			d1.resolve(42);
			await result1;
			expect(done1).to.equal(42);

			expect(stub2.calledOnce).to.equal(true);
		});
	});
});
