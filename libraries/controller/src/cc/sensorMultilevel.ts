import { SensorMultilevelV11 } from "@ezwave/commands";
import { enumToString, toHex } from "@ezwave/shared";
import { getScaleIndex } from "..";
import { ScaleIndex } from "../scales";
import { getScaleName, SensorType } from "../sensorTypes";
import { Session } from "../session";
import { Task } from "../task";

export interface SensorMultilevelValue {
	sensorType: SensorType;
	scaleIndex: ScaleIndex;
	value: number;
}

export class SensorMultilevelReportTask implements Task<void> {
	private _sensorType: SensorType;
	private _scaleIndex: ScaleIndex;
	private _value: number;
	private _precision: number;

	public constructor(
		sensorType: keyof typeof SensorType | SensorType,
		scale: string | ScaleIndex,
		value: number,
		precision: number
	) {
		if (typeof sensorType === "string") {
			sensorType = SensorType[sensorType];
			if (sensorType === undefined) {
				throw new Error(`unknown sensor type '${sensorType}'`);
			}
		}
		this._sensorType = sensorType;
		if (typeof scale === "string") {
			scale = getScaleIndex(sensorType, scale);
		}
		this._scaleIndex = scale;
		this._value =
			Math.round(value * Math.pow(10, precision)) /
			Math.pow(10, precision);
		this._precision = precision;
	}

	public async execute(session: Session): Promise<void> {
		const value = this._value * Math.pow(10, this._precision);
		let buffer: Buffer;
		if (value >= -128 && value <= 127) {
			buffer = Buffer.alloc(1);
			buffer.writeInt8(value);
		} else if (value >= -32768 && value <= 32767) {
			buffer = Buffer.alloc(2);
			buffer.writeInt16BE(value);
		} else {
			buffer = Buffer.alloc(4);
			buffer.writeInt32BE(value);
		}
		await session.send(
			new SensorMultilevelV11.SensorMultilevelReport({
				sensorType: this
					._sensorType as number as SensorMultilevelV11.SensorTypeEnum,
				scale: this._scaleIndex,
				sensorValue: buffer,
				precision: this._precision,
			})
		);
	}

	public inspect(): string {
		const scaleName =
			getScaleName(this._sensorType, this._scaleIndex) ??
			`0x${toHex(this._scaleIndex)}`;
		return `<SensorMultilevelReport sensorType=${enumToString(
			this._sensorType,
			SensorType
		)} scale=${scaleName} value=${this._value.toFixed(
			this._precision
		)} precision=${this._precision}>`;
	}

	public merge(task: this): boolean {
		this._sensorType = task._sensorType;
		this._scaleIndex = task._scaleIndex;
		this._value = task._value;
		this._precision = task._precision;
		return true;
	}
}
