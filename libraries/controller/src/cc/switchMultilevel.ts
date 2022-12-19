import { CommandPacketConstructor, Packet } from "@ezwave/codec";
import {
	SwitchMultilevelV1,
	SwitchMultilevelV2,
	SwitchMultilevelV3,
	SwitchMultilevelV4,
} from "@ezwave/commands";
import { isDefined } from "@ezwave/shared";
import { durationToSeconds } from "../conversion";
import { Session } from "../session";
import { Task } from "../task";

export interface SwitchMultilevelValue {
	/**
	 * Current value.
	 * 0 = off, 1..99 = on percentage, 0xFE = unknown, 0xFF = 'on' (deprecated)
	 */
	currentValue: number;

	/**
	 * Target value.
	 * 0 = off, 1..99 = on percentage, 0xFE = unknown, 0xFF = 'on' (deprecated)
	 */
	targetValue?: number;

	/**
	 * Duration to reach target value from current value in seconds,
	 * or "default"
	 */
	duration?: number | "default";
}

export type SwitchMultilevelVersions = 1 | 2 | 3 | 4;

export class SwitchMultilevelSetTask implements Task<void> {
	private _value: number;
	private _dimmingDuration?: number;

	public constructor(value: number, dimmingDuration?: number) {
		this._value = value;
		this._dimmingDuration = dimmingDuration;
	}

	public async execute(session: Session): Promise<void> {
		let value = this._value;
		if (value >= 100 && value < 255) {
			// Z-Wave maximum value is 99, but 255 is special ('on' / last)
			value = 99;
		}
		const packet =
			this._dimmingDuration !== undefined
				? new SwitchMultilevelV2.SwitchMultilevelSet({
						value: value,
						dimmingDuration: this._dimmingDuration,
				  })
				: new SwitchMultilevelV1.SwitchMultilevelSet({ value: value });
		await session.send(packet);
	}

	public inspect(): string {
		return (
			[
				`<SwitchMultilevelSet`,
				`value=${this._value}`,
				this._dimmingDuration !== undefined
					? `dimmingDuration=${this._dimmingDuration}`
					: undefined,
			]
				.filter(isDefined)
				.join(" ") + `>`
		);
	}

	public merge(task: this): boolean {
		this._value = task._value;
		this._dimmingDuration = task._dimmingDuration;
		return true;
	}
}

// eslint-disable-next-line @rushstack/typedef-var
const switchMultilevelReports = {
	1: SwitchMultilevelV1.SwitchMultilevelReport,
	2: SwitchMultilevelV2.SwitchMultilevelReport,
	3: SwitchMultilevelV3.SwitchMultilevelReport,
	4: SwitchMultilevelV4.SwitchMultilevelReport,
} as const;

export class SwitchMultilevelGetTask implements Task<SwitchMultilevelValue> {
	private _version: SwitchMultilevelVersions;

	public constructor(version: SwitchMultilevelVersions) {
		this._version = version;
	}

	public inspect(): string {
		return `<SwitchMultilevelGet>`;
	}

	public async execute(session: Session): Promise<SwitchMultilevelValue> {
		await session.send(new SwitchMultilevelV2.SwitchMultilevelGet());
		const constructor = switchMultilevelReports[this._version];
		const data = await session.waitFor(
			constructor as CommandPacketConstructor<SwitchMultilevelReports>
		);
		return formatSwitchMultilevelReport(data);
	}

	public merge(_task: this): boolean {
		return _task._version === this._version;
	}
}

export type SwitchMultilevelReports =
	| SwitchMultilevelV1.SwitchMultilevelReport
	| SwitchMultilevelV2.SwitchMultilevelReport
	| SwitchMultilevelV3.SwitchMultilevelReport
	| SwitchMultilevelV4.SwitchMultilevelReport;

// TODO make this version-based decoding 'automatic'
export function parseSwitchMultilevelReport(
	packet: Packet,
	version: SwitchMultilevelVersions
): SwitchMultilevelReports {
	return packet.as(switchMultilevelReports[version]);
}

export function formatSwitchMultilevelReport(
	data: SwitchMultilevelReports["data"]
): SwitchMultilevelValue {
	let duration: number | "default" | undefined;
	if ("duration" in data) {
		duration = durationToSeconds(data.duration);
	}
	const switchValue: SwitchMultilevelValue = {
		currentValue: "currentValue" in data ? data.currentValue : data.value,
	};
	if ("targetValue" in data) {
		switchValue.targetValue = data.targetValue;
	}
	if ("duration" in data) {
		switchValue.duration = duration;
	}
	return switchValue;
}
