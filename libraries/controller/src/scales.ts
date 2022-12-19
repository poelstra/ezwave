// Note: These scale types are only used internally (for now),
// and there may be some duplicates.
// They are derived from "Multilevel Sensor Command Class, list of assigned Multilevel Sensor types and scales.xlsx"
export enum ScaleType {
	Temperature,
	Humidity,
	Mass,
	Acceleration,
	Percentage,
	Acidity,
	Direction,
	Pressure,
	AirPressure,
	Density,
	Unitless,
	GeneralPurpose,
	Illuminance,
	Power,
	Velocity,
	SolarRadiation,
	RainRate,
	TideLevel,
	Weight,
	Voltage,
	Current,
	CarbonDioxideLevel,
	AirFlow,
	TankCapacity,
	Distance,
	AnglePosition,
	Rotation,
	SeismicIntensity,
	SeismicMagnitude,
	Ultraviolet,
	ElectricalResistivity,
	ElectricalConductivity,
	Loudness,
	Moisture,
	Frequency,
	Time,
	ParticulateMatter25,
	FormaldehydeLevel,
	RadonConcentration,
	MethaneDensity,
	VolatileOrganicCompoundLevel,
	CarbonMonoxideLevel,
	SoilSalinity,
	HeartRate,
	BloodPressure,
	BasisMetabolicRate,
	BodyMassIndex,
	WaterFlow,
	WaterPressure,
	RFSignalStrength,
	ParticulateMatter10,
	RespiratoryRate,
	WaterChlorineLevel,
	WaterOxidationReductionPotential,
	AppliedForce,
}

export type ScaleIndex = 0x00 | 0x01 | 0x02 | 0x03;
export type Scales = Partial<Record<ScaleIndex, Scale>>;

export interface Scale {
	name: string;
	unit?: string;
	description?: string;
}

export const scales: Record<ScaleType, Scales> = {
	[ScaleType.Temperature]: {
		0x00: {
			name: "Celsius",
			unit: "°C",
		},
		0x01: {
			name: "Fahrenheit",
			unit: "°F",
		},
	},
	[ScaleType.Humidity]: {
		0x00: {
			name: "Percentage value",
			unit: "%",
		},
		0x01: {
			name: "Absolute humidity",
			unit: "g/m³",
		},
	},
	[ScaleType.Mass]: {
		0x00: {
			name: "Kilogram",
			unit: "kg",
		},
	},
	[ScaleType.Acceleration]: {
		0x00: {
			name: "Meter per square second",
			unit: "m/s²",
		},
	},
	[ScaleType.Percentage]: {
		0x00: {
			name: "Percentage value",
			unit: "%",
		},
	},
	[ScaleType.Acidity]: {
		0x00: {
			name: "Acidity",
			unit: "pH",
		},
	},
	[ScaleType.Direction]: {
		0x00: {
			name: "Degrees",
			unit: "°",
			description:
				"0° = no motion detected, 90° = east, 180° = south, 270° = west, 360° = north",
		},
	},
	[ScaleType.Pressure]: {
		0x00: {
			name: "Kilopascal",
			unit: "kPa",
		},
		0x01: {
			name: "Pound per square inch",
			unit: "psi",
		},
	},
	[ScaleType.AirPressure]: {
		0x00: {
			name: "Kilopascal",
			unit: "kPa",
		},
		0x01: {
			name: "Inches of Mercury",
			unit: "inHg",
		},
	},
	[ScaleType.Density]: {
		0x00: {
			name: "Density",
			unit: "µg/m³",
		},
	},
	[ScaleType.Unitless]: {
		0x00: {
			name: "Unitless",
		},
	},
	[ScaleType.GeneralPurpose]: {
		0x00: {
			name: "Percentage value",
			unit: "%",
		},
		0x01: {
			name: "Dimensionless value",
		},
	},
	[ScaleType.Illuminance]: {
		0x00: {
			name: "Percentage value",
			unit: "%",
		},
		0x01: {
			name: "Lux",
			unit: "Lux",
		},
	},
	[ScaleType.Power]: {
		0x00: {
			name: "Watt",
			unit: "W",
		},
		0x01: {
			name: "Btu/h",
			unit: "Btu/h",
		},
	},
	[ScaleType.Velocity]: {
		0x00: {
			name: "m/s",
			unit: "m/s",
		},
		0x01: {
			name: "Mph",
			unit: "Mph",
		},
	},
	[ScaleType.SolarRadiation]: {
		0x00: {
			name: "Watt per square meter",
			unit: "W/m²",
		},
	},
	[ScaleType.RainRate]: {
		0x00: {
			name: "Millimeter/hour",
			unit: "mm/h",
		},
		0x01: {
			name: "Inches per hour",
			unit: "in/h",
		},
	},
	[ScaleType.TideLevel]: {
		0x00: {
			name: "Meter",
			unit: "m",
		},
		0x01: {
			name: "Feet",
			unit: "ft",
		},
	},
	[ScaleType.Weight]: {
		0x00: {
			name: "Kilogram",
			unit: "kg",
		},
		0x01: {
			name: "Pounds",
			unit: "lb",
		},
	},
	[ScaleType.Voltage]: {
		0x00: {
			name: "Volt",
			unit: "V",
		},
		0x01: {
			name: "Millivolt",
			unit: "mV",
		},
	},
	[ScaleType.Current]: {
		0x00: {
			name: "Ampere",
			unit: "A",
		},
		0x01: {
			name: "Milliampere",
			unit: "mA",
		},
	},
	[ScaleType.CarbonDioxideLevel]: {
		0x00: {
			name: "Parts/million",
			unit: "ppm",
		},
	},
	[ScaleType.AirFlow]: {
		0x00: {
			name: "Cubic meter per hour",
			unit: "m³/h",
		},
		0x01: {
			name: "Cubic feet per minute",
			unit: "cfm",
		},
	},
	[ScaleType.TankCapacity]: {
		0x00: {
			name: "Liter",
			unit: "l",
		},
		0x01: {
			name: "Cubic meter",
			unit: "m³",
		},
		0x02: {
			name: "Gallons",
			unit: "gallon",
		},
	},
	[ScaleType.Distance]: {
		0x00: {
			name: "Meter",
			unit: "m",
		},
		0x01: {
			name: "Centimeter",
			unit: "cm",
		},
		0x02: {
			name: "Feet",
			unit: "ft",
		},
	},
	[ScaleType.AnglePosition]: {
		0x00: {
			name: "Percentage value",
			unit: "%",
		},
		0x01: {
			name: "Degrees relative to north pole of standing eye view",
			unit: "°N",
		},
		0x02: {
			name: "Degrees relative to south pole of standing eye view",
			unit: "°S",
		},
	},
	[ScaleType.Rotation]: {
		0x00: {
			name: "Revolutions per minute",
			unit: "rpm",
		},
		0x01: {
			name: "Hertz",
			unit: "Hz",
		},
	},
	[ScaleType.SeismicIntensity]: {
		0x00: {
			name: "Mercalli",
		},
		0x01: {
			name: "European Macroseismic",
		},
		0x02: {
			name: "Liedu",
		},
		0x03: {
			name: "Shindo",
		},
	},
	[ScaleType.SeismicMagnitude]: {
		0x00: {
			name: "Local",
		},
		0x01: {
			name: "Moment",
		},
		0x02: {
			name: "Surface wave",
		},
		0x03: {
			name: "Body wave",
		},
	},
	[ScaleType.Ultraviolet]: {
		0x00: {
			name: "UV index",
		},
	},
	[ScaleType.ElectricalResistivity]: {
		0x00: {
			name: "Ohm meter",
			unit: "Ωm",
		},
	},
	[ScaleType.ElectricalConductivity]: {
		0x00: {
			name: "Siemens per meter",
			unit: "S/m",
		},
	},
	[ScaleType.Loudness]: {
		0x00: {
			name: "Decibel",
			unit: "dB",
		},
		0x01: {
			name: "A-weighted decibels",
			unit: "dBA",
		},
	},
	[ScaleType.Moisture]: {
		0x00: {
			name: "Percentage value",
			unit: "%",
		},
		0x01: {
			name: "Volume water content",
			unit: "m³/m³",
		},
		0x02: {
			name: "Impedance",
			unit: "kΩ",
		},
		0x03: {
			name: "Water activity",
			unit: "aw",
		},
	},
	[ScaleType.Frequency]: {
		0x00: {
			name: "Hertz",
			unit: "Hz",
			description: "MUST be used until 2.147483647 GHz",
		},
		0x01: {
			name: "Kilohertz",
			unit: "kHz",
			description: "MUST be used after 2.147483647 GHz",
		},
	},
	[ScaleType.Time]: {
		0x00: {
			name: "Second",
			unit: "s",
		},
	},
	[ScaleType.ParticulateMatter25]: {
		0x00: {
			name: "Mole per cubic meter",
			unit: "mol/m³",
		},
		0x01: {
			name: "Microgram per cubic meter",
			unit: "µg/m³",
		},
	},
	[ScaleType.FormaldehydeLevel]: {
		0x00: {
			name: "Mole per cubic meter",
			unit: "mol/m³",
		},
	},
	[ScaleType.RadonConcentration]: {
		0x00: {
			name: "Becquerel per cubic meter",
			unit: "bq/m³",
		},
		0x01: {
			name: "Picocuries per liter",
			unit: "pCi/l",
		},
	},
	[ScaleType.MethaneDensity]: {
		0x00: {
			name: "Mole per cubic meter",
			unit: "mol/m³",
		},
	},
	[ScaleType.VolatileOrganicCompoundLevel]: {
		0x00: {
			name: "Mole per cubic meter",
			unit: "mol/m³",
		},
		0x01: {
			name: "Parts/million",
			unit: "ppm",
		},
	},
	[ScaleType.CarbonMonoxideLevel]: {
		0x00: {
			name: "Mole per cubic meter",
			unit: "mol/m³",
		},
		0x01: {
			name: "Parts/million",
			unit: "ppm",
		},
	},
	[ScaleType.SoilSalinity]: {
		0x00: {
			name: "Mole per cubic meter",
			unit: "mol/m³",
		},
	},
	[ScaleType.HeartRate]: {
		0x00: {
			name: "Beats per minute",
			unit: "bpm",
		},
	},
	[ScaleType.BloodPressure]: {
		0x00: {
			name: "Systolic",
			unit: "mmHg",
		},
		0x01: {
			name: "Diastolic",
			unit: "mmHg",
		},
	},
	[ScaleType.BasisMetabolicRate]: {
		0x00: {
			name: "Joule",
			unit: "J",
		},
	},
	[ScaleType.BodyMassIndex]: {
		0x00: {
			name: "Body Mass Index",
		},
	},
	[ScaleType.WaterFlow]: {
		0x00: {
			name: "Liter per hour",
			unit: "l/h",
		},
	},
	[ScaleType.WaterPressure]: {
		0x00: {
			name: "Kilopascal",
			unit: "kPa",
		},
	},
	[ScaleType.RFSignalStrength]: {
		0x00: {
			name: "RSSI",
			unit: "%",
		},
		0x01: {
			name: "Power Level",
			unit: "dBm",
		},
	},
	[ScaleType.ParticulateMatter10]: {
		0x00: {
			name: "Mole per cubic meter",
			unit: "mol/m³",
		},
		0x01: {
			name: "Microgram per cubic meter",
			unit: "µg/m³",
		},
	},
	[ScaleType.RespiratoryRate]: {
		0x00: {
			name: "Breaths per minute",
			unit: "bpm",
		},
	},
	[ScaleType.WaterChlorineLevel]: {
		0x00: {
			name: "Milligram per liter",
			unit: "mg/l",
		},
	},
	[ScaleType.WaterOxidationReductionPotential]: {
		0x00: {
			name: "Millivolt",
			unit: "mV",
		},
	},
	[ScaleType.AppliedForce]: {
		0x00: {
			name: "Newton",
			unit: "N",
		},
	},
};
