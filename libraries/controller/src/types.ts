export type JsonValue =
	| boolean
	| number
	| string
	// eslint-disable-next-line @rushstack/no-new-null
	| null
	| { [key: string]: JsonValue }
	| JsonValue[];
