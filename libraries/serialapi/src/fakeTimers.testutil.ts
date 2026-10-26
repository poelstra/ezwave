/**
 * Timers to fake in tests using `sinon.useFakeTimers()`.
 *
 * Recent sinon versions also fake `process.nextTick` and `queueMicrotask` by
 * default, which stalls code (and streams) that rely on them.
 */
export const FAKE_TIMERS: (
	| "setTimeout"
	| "clearTimeout"
	| "setInterval"
	| "clearInterval"
	| "setImmediate"
	| "clearImmediate"
	| "Date"
)[] = [
	"setTimeout",
	"clearTimeout",
	"setInterval",
	"clearInterval",
	"setImmediate",
	"clearImmediate",
	"Date",
];
