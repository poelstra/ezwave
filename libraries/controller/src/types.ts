export type JsonValue =
	| boolean
	| number
	| string
	// eslint-disable-next-line no-restricted-syntax -- JSON itself has `null`, not `undefined`
	| null
	| { [key: string]: JsonValue }
	| JsonValue[];
