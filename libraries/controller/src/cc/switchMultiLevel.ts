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

export interface SwitchMultiLevelValue {
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

export type SwitchMultiLevelVersions = 1 | 2 | 3 | 4;

export class SwitchMultiLevelSetTask implements Task<void> {
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
				`<SwitchMultiLevelSet`,
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
const switchMultiLevelReports = {
	1: SwitchMultilevelV1.SwitchMultilevelReport,
	2: SwitchMultilevelV2.SwitchMultilevelReport,
	3: SwitchMultilevelV3.SwitchMultilevelReport,
	4: SwitchMultilevelV4.SwitchMultilevelReport,
} as const;

export class SwitchMultiLevelGetTask implements Task<SwitchMultiLevelValue> {
	private _version: SwitchMultiLevelVersions;

	public constructor(version: SwitchMultiLevelVersions) {
		this._version = version;
	}

	public inspect(): string {
		return `<SwitchMultiLevelGet>`;
	}

	public async execute(session: Session): Promise<SwitchMultiLevelValue> {
		await session.send(new SwitchMultilevelV2.SwitchMultilevelGet());
		const constructor = switchMultiLevelReports[this._version];
		const data = await session.waitFor(
			constructor as CommandPacketConstructor<SwitchMultiLevelReports>
		);
		return formatSwitchMultiLevelReport(data);
	}

	public merge(_task: this): boolean {
		return true;
	}
}

export type SwitchMultiLevelReports =
	| SwitchMultilevelV1.SwitchMultilevelReport
	| SwitchMultilevelV2.SwitchMultilevelReport
	| SwitchMultilevelV3.SwitchMultilevelReport
	| SwitchMultilevelV4.SwitchMultilevelReport;

// TODO make this version-based decoding 'automatic'
export function parseSwitchMultiLevelReport(
	packet: Packet,
	version: SwitchMultiLevelVersions
): SwitchMultiLevelReports {
	return packet.as(switchMultiLevelReports[version]);
}

export function formatSwitchMultiLevelReport(
	data: SwitchMultiLevelReports["data"]
): SwitchMultiLevelValue {
	let duration: number | "default" | undefined;
	if ("duration" in data) {
		duration = durationToSeconds(data.duration);
	}
	const switchValue: SwitchMultiLevelValue = {
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
