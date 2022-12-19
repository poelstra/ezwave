import { ThermostatModeV3, ThermostatSetpointV3 } from "@ezwave/commands";
import { enumToString } from "@ezwave/shared";
import { Session } from "../session";
import { Task } from "../task";

export interface ThermostatMode {
	mode: keyof typeof ThermostatModeV3.ModeEnum;
}

export enum TemperatureScale {
	Celsius = 0x00,
	Fahrenheit = 0x01,
}

export interface ThermostatSetPoint {
	setpointType: keyof typeof ThermostatSetpointV3.SetpointTypeEnum;
	scale: keyof typeof TemperatureScale;
	value: number;
}

export class ThermostatModeSetTask implements Task<void> {
	private _mode: ThermostatModeV3.ModeEnum;
	private _manufacturerData: Buffer | undefined;

	public constructor(
		mode: ThermostatModeV3.ModeEnum,
		manufacturerData?: Buffer
	) {
		this._mode = mode;
		this._manufacturerData = manufacturerData;
	}

	public async execute(session: Session): Promise<void> {
		await session.send(
			new ThermostatModeV3.ThermostatModeSet({
				mode: this._mode,
				manufacturerData: this._manufacturerData ?? Buffer.alloc(0),
			})
		);
	}

	public inspect(): string {
		return `<ThermostatModeSet value=${enumToString(
			this._mode,
			ThermostatModeV3.ModeEnum
		)} manufacturerData=${this._manufacturerData}>`;
	}

	public merge(task: this): boolean {
		this._mode = task._mode;
		return true;
	}
}

export class ThermostatSetpointSetTask implements Task<void> {
	private _setpointType: ThermostatSetpointV3.SetpointTypeEnum;
	private _scale: TemperatureScale;
	private _value: number;
	private _precision: number;

	public constructor(
		setpointType: ThermostatSetpointV3.SetpointTypeEnum,
		scale: TemperatureScale,
		value: number,
		precision: number
	) {
		this._setpointType = setpointType;
		this._scale = scale;
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
			new ThermostatSetpointV3.ThermostatSetpointSet({
				setpointType: this._setpointType,
				scale: this._scale,
				value: buffer,
				precision: this._precision,
			})
		);
	}

	public inspect(): string {
		return `<ThermostatSetpointSet setpointType=${enumToString(
			this._setpointType,
			ThermostatSetpointV3.SetpointTypeEnum
		)} scale=${enumToString(
			this._scale,
			TemperatureScale
		)} value=${this._value.toFixed(this._precision)} precision=${
			this._precision
		}>`;
	}

	public merge(task: this): boolean {
		this._setpointType = task._setpointType;
		this._scale = task._scale;
		this._value = task._value;
		this._precision = task._precision;
		return true;
	}
}
