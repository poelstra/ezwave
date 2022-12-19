import { ThermostatModeV3, ThermostatSetpointV3 } from "@ezwave/commands";
import { enumToString } from "@ezwave/shared";
import { Session } from "../session";
import { Task } from "../task";

export enum ThermostatModeEnum {
	Off = 0x0,
	Heat = 0x1,
	Cool = 0x2,
	Auto = 0x3,
	AuxiliaryHeat = 0x4,
	Resume = 0x5,
	FanOnly = 0x6,
	Furnace = 0x7,
	DryAir = 0x8,
	MoistAir = 0x9,
	AutoChangeover = 0xa,
	EnergySaveHeat = 0xb,
	EnergySaveCool = 0xc,
	Away = 0xd,
	Reserved = 0xe,
	FullPower = 0xf,
	Reserved0 = 0x10,
	Reserved1 = 0x11,
	Reserved2 = 0x12,
	Reserved3 = 0x13,
	Reserved4 = 0x14,
	Reserved5 = 0x15,
	Reserved6 = 0x16,
	Reserved7 = 0x17,
	Reserved8 = 0x18,
	Reserved9 = 0x19,
	ReservedA = 0x1a,
	ReservedB = 0x1b,
	ReservedC = 0x1c,
	ReservedD = 0x1d,
	ReservedE = 0x1e,
	ManufacturerSpecifc = 0x1f,
}

export interface ThermostatMode {
	mode: ThermostatModeEnum;
}

export enum TemperatureScale {
	Celsius = 0x00,
	Fahrenheit = 0x01,
}

// Note: types MUST match those of CommandClass, see e.g. ThermostatSetpointV3.SetpointTypeEnum
export enum SetpointType {
	NotSupported = 0x0,
	Heating = 0x1,
	Cooling = 0x2,
	Furnace = 0x7,
	DryAir = 0x8,
	MoistAir = 0x9,
	AutoChangeover = 0xa,
	EnergySaveHeating = 0xb,
	EnergySaveCooling = 0xc,
	AwayHeating = 0xd,
	AwayCooling = 0xe,
	FullPower = 0xf,
}

export interface ThermostatSetPoint {
	setpointType: SetpointType;
	scale: TemperatureScale;
	value: number;
}

export class ThermostatModeSetTask implements Task<void> {
	private _mode: ThermostatModeEnum;
	private _manufacturerData: Buffer | undefined;

	public constructor(mode: ThermostatModeEnum, manufacturerData?: Buffer) {
		this._mode = mode;
		this._manufacturerData = manufacturerData;
	}

	public async execute(session: Session): Promise<void> {
		await session.send(
			new ThermostatModeV3.ThermostatModeSet({
				mode: this._mode as number,
				manufacturerData: this._manufacturerData ?? Buffer.alloc(0),
			})
		);
	}

	public inspect(): string {
		return `<ThermostatModeSet value=${enumToString(
			this._mode,
			ThermostatModeEnum
		)} manufacturerData=${this._manufacturerData}>`;
	}

	public merge(task: this): boolean {
		this._mode = task._mode;
		return true;
	}
}

export class ThermostatSetpointSetTask implements Task<void> {
	private _setpointType: SetpointType;
	private _scale: TemperatureScale;
	private _value: number;
	private _precision: number;

	public constructor(
		setpointType: SetpointType,
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
				setpointType: this._setpointType as number,
				scale: this._scale,
				value: buffer,
				precision: this._precision,
			})
		);
	}

	public inspect(): string {
		return `<ThermostatSetpointSet setpointType=${enumToString(
			this._setpointType,
			SetpointType
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
