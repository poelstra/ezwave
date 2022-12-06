/**
 * Append the stack trace of `stackTraceError` to given `error`.
 * Useful to provide more meaningful context in case of handling errors in event handlers,
 * where otherwise only the event handler would be shown as the root of the stack trace.
 */
export function appendStack<T>(
	error: T,
	stackTraceError?: Error,
	reason?: string
): T {
	if (!error || !(error instanceof Error)) {
		return error;
	}
	const stack = error.stack;
	let skipLines = 1; // just the error message line from stackTraceError
	if (!stackTraceError) {
		stackTraceError = new Error();
		skipLines = 2; // Also this appendStack function itself
	}

	if (
		typeof stack !== "string" ||
		typeof stackTraceError.stack !== "string"
	) {
		return error;
	}
	reason ??= "previous";
	const lines = [
		`\n... from ${reason}:`,
		...stackTraceError.stack.split("\n").slice(skipLines),
	];
	error.stack = stack + lines.join("\n");
	return error;
}
