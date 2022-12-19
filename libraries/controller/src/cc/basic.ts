import { BasicV2 } from "@ezwave/commands";
import { Session } from "../session";
import { Task } from "../task";

export class BasicSetTask implements Task<void> {
	private _value: number;

	public constructor(value: number) {
		this._value = value;
	}

	public async execute(session: Session): Promise<void> {
		let level = this._value;
		if (level >= 100 && level < 254) {
			// Z-Wave maximum value is 99, but 255 is special ('on' / last)
			level = 99;
		}
		await session.send(
			new BasicV2.BasicSet({
				value: level,
			})
		);
	}

	public inspect(): string {
		return `<BasicSet value=${this._value}>`;
	}

	public merge(task: this): boolean {
		this._value = task._value;
		return true;
	}
}
