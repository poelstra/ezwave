/**
 * Convert an enum to its name if possible,
 * or to its numeric value if the name isn't known.
 */
export function enumName<E, K extends E[keyof E]>(
	key: K,
	enumType: E
): keyof E | number {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const name = (enumType as any)[key];
	return name ?? key;
}
