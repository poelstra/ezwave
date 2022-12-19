/**
 * Convert duration value to number of seconds.
 *
 * Duration value are typically used to specify dimming durations.
 * If the input value is `0xff`, the factory default value is returned.
 */
export function durationToSeconds(
	duration: number,
	factoryDefault: number
): number;
export function durationToSeconds(
	duration: number,
	factoryDefault?: number
): number | "default";
export function durationToSeconds(
	duration: number,
	factoryDefault?: number
): number | "default" {
	// * 0x00 = instantly
	// * 0x01..0x7F = 1 second to 127 seconds in 1 second resolution
	// * 0x80..0xFE = 1 minute to 127 minutes in 1 minute resolution
	// * 0xFF = Factory default duration
	if (duration === 0) {
		return 0;
	} else if (duration >= 0x01 && duration <= 0x7f) {
		return duration;
	} else if (duration >= 0x80 && duration <= 0xfe) {
		return (duration - 0x7f) * 60;
	} else {
		return factoryDefault ?? "default";
	}
}

export function durationToText(duration: number): string {
	if (duration === 0) {
		return "instantly";
	} else if (duration >= 0x01 && duration <= 0x7f) {
		return `${duration}s`;
	} else if (duration >= 0x80 && duration <= 0xfe) {
		return `${duration}m`;
	} else {
		return "default";
	}
}
