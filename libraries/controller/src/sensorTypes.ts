import { toHex } from "@ezwave/shared";
import { ScaleIndex, scales, ScaleType } from "./scales";

// Note: numerical values MUST equal those of the ZWave spec, see
// "Multilevel Sensor Command Class, list of assigned Multilevel Sensor types and scales.xlsx"
export enum SensorType {
	Temperature = 0x1,
	GeneralPurposeValue = 0x2,
	Luminance = 0x3,
	Power = 0x4,
	RelativeHumidity = 0x5,
	Velocity = 0x6,
	Direction = 0x7,
	AtmosphericPressure = 0x8,
	BarometricPressure = 0x9,
	SolarRadiation = 0xa,
	DewPoint = 0xb,
	RainRate = 0xc,
	TideLevel = 0xd,
	Weight = 0xe,
	Voltage = 0xf,
	Current = 0x10,
	CO2Level = 0x11,
	AirFlow = 0x12,
	TankCapacity = 0x13,
	Distance = 0x14,
	AnglePosition = 0x15,
	Rotation = 0x16,
	WaterTemperature = 0x17,
	SoilTemperature = 0x18,
	SeismicIntensity = 0x19,
	SeismicMagnitude = 0x1a,
	Ultraviolet = 0x1b,
	ElectricalResistivity = 0x1c,
	ElectricalConductivity = 0x1d,
	Loudness = 0x1e,
	Moisture = 0x1f,
	Frequency = 0x20,
	Time = 0x21,
	TargetTemperature = 0x22,
	// eslint-disable-next-line @typescript-eslint/naming-convention
	ParticulateMatter2_5 = 0x23,
	FormaldehydeCH2OLevel = 0x24,
	RadonConcentration = 0x25,
	MethaneDensityCH4 = 0x26,
	VolatileOrganicCompound = 0x27,
	CarbonMonoxideCOLevel = 0x28,
	SoilHumidity = 0x29,
	SoilReactivity = 0x2a,
	SoilSalinity = 0x2b,
	HeartRate = 0x2c,
	BloodPressure = 0x2d,
	MuscleMass = 0x2e,
	FatMass = 0x2f,
	BoneMass = 0x30,
	TotalBodyWaterTBW = 0x31,
	BasicMetabolicRateBMR = 0x32,
	BodyMassIndexBMI = 0x33,
	AccelerationXAxis = 0x34,
	AccelerationYAxis = 0x35,
	AccelerationZAxis = 0x36,
	SmokeDensity = 0x37,
	WaterFlow = 0x38,
	WaterPressure = 0x39,
	RFSignalStrength = 0x3a,
	ParticulateMatter10 = 0x3b,
	RespiratoryRate = 0x3c,
	RelativeModulationLevel = 0x3d,
	BoilerWaterTemperature = 0x3e,
	DomesticHotWaterTemperature = 0x3f,
	OutsideTemperature = 0x40,
	ExhaustTemperature = 0x41,
	WaterChlorineLevel = 0x42,
	WaterAcidity = 0x43,
	WaterOxidationReductionPotential = 0x44,
	HeartRateLFHFRatio = 0x45,
	MotionDirection = 0x46,
	AppliedForce = 0x47,
	ReturnAirTemperature = 0x48,
	SupplyAirTemperature = 0x49,
	CondenserCoilTemperature = 0x4a,
	EvaporatorCoilTemperature = 0x4b,
	LiquidLineTemperature = 0x4c,
	DischargeLineTemperature = 0x4d,
	SuctionPressure = 0x4e,
	DischargePressure = 0x4f,
	DefrostTemperature = 0x50,
	Ozone = 0x51,
	SulfurDioxide = 0x52,
	NitrogenDioxide = 0x53,
	Ammonia = 0x54,
	Lead = 0x55,
	ParticulateMatter1 = 0x56,
	PersonCounterEntering = 0x57,
	PersonCounterExiting = 0x58,
}

export interface SensorTypeInfo {
	label: string;
	scaleType: ScaleType;
}

export const sensorTypes: Partial<Record<SensorType, SensorTypeInfo>> = {
	[SensorType.Temperature]: {
		label: "Air temperature",
		scaleType: ScaleType.Temperature,
	},
	[SensorType.GeneralPurposeValue]: {
		label: "General purpose",
		scaleType: ScaleType.GeneralPurpose,
	},
	[SensorType.Luminance]: {
		label: "Illuminance",
		scaleType: ScaleType.Illuminance,
	},
	[SensorType.Power]: {
		label: "Power",
		scaleType: ScaleType.Power,
	},
	[SensorType.RelativeHumidity]: {
		label: "Humidity",
		scaleType: ScaleType.Humidity,
	},
	[SensorType.Velocity]: {
		label: "Velocity",
		scaleType: ScaleType.Velocity,
	},
	[SensorType.Direction]: {
		label: "Direction",
		scaleType: ScaleType.Direction,
	},
	[SensorType.AtmosphericPressure]: {
		label: "Atmospheric pressure",
		scaleType: ScaleType.AirPressure,
	},
	[SensorType.BarometricPressure]: {
		label: "Barometric pressure",
		scaleType: ScaleType.AirPressure,
	},
	[SensorType.SolarRadiation]: {
		label: "Solar radiation",
		scaleType: ScaleType.SolarRadiation,
	},
	[SensorType.DewPoint]: {
		label: "Dew point",
		scaleType: ScaleType.Temperature,
	},
	[SensorType.RainRate]: {
		label: "Rain rate",
		scaleType: ScaleType.RainRate,
	},
	[SensorType.TideLevel]: {
		label: "Tide level",
		scaleType: ScaleType.TideLevel,
	},
	[SensorType.Weight]: {
		label: "Weight",
		scaleType: ScaleType.Weight,
	},
	[SensorType.Voltage]: {
		label: "Voltage",
		scaleType: ScaleType.Voltage,
	},
	[SensorType.Current]: {
		label: "Current",
		scaleType: ScaleType.Current,
	},
	[SensorType.CO2Level]: {
		label: "Carbon dioxide (CO₂) level",
		scaleType: ScaleType.CarbonDioxideLevel,
	},
	[SensorType.AirFlow]: {
		label: "Air flow",
		scaleType: ScaleType.AirFlow,
	},
	[SensorType.TankCapacity]: {
		label: "Tank capacity",
		scaleType: ScaleType.TankCapacity,
	},
	[SensorType.Distance]: {
		label: "Distance",
		scaleType: ScaleType.Distance,
	},
	[SensorType.AnglePosition]: {
		label: "Angle position",
		scaleType: ScaleType.AnglePosition,
	},
	[SensorType.Rotation]: {
		label: "Rotation",
		scaleType: ScaleType.Rotation,
	},
	[SensorType.WaterTemperature]: {
		label: "Water temperature",
		scaleType: ScaleType.Temperature,
	},
	[SensorType.SoilTemperature]: {
		label: "Soil temperature",
		scaleType: ScaleType.Temperature,
	},
	[SensorType.SeismicIntensity]: {
		label: "Seismic Intensity",
		scaleType: ScaleType.SeismicIntensity,
	},
	[SensorType.SeismicMagnitude]: {
		label: "Seismic magnitude",
		scaleType: ScaleType.SeismicMagnitude,
	},
	[SensorType.Ultraviolet]: {
		label: "Ultraviolet",
		scaleType: ScaleType.Ultraviolet,
	},
	[SensorType.ElectricalResistivity]: {
		label: "Electrical resistivity",
		scaleType: ScaleType.ElectricalResistivity,
	},
	[SensorType.ElectricalConductivity]: {
		label: "Electrical conductivity",
		scaleType: ScaleType.ElectricalConductivity,
	},
	[SensorType.Loudness]: {
		label: "Loudness",
		scaleType: ScaleType.Loudness,
	},
	[SensorType.Moisture]: {
		label: "Moisture",
		scaleType: ScaleType.Moisture,
	},
	[SensorType.Frequency]: {
		label: "Frequency",
		scaleType: ScaleType.Frequency,
	},
	[SensorType.Time]: {
		label: "Time",
		scaleType: ScaleType.Time,
	},
	[SensorType.TargetTemperature]: {
		label: "Target temperature",
		scaleType: ScaleType.Temperature,
	},
	[SensorType.ParticulateMatter2_5]: {
		label: "Particulate Matter 2.5",
		scaleType: ScaleType.ParticulateMatter25,
	},
	[SensorType.FormaldehydeCH2OLevel]: {
		label: "Formaldehyde (CH₂O) level",
		scaleType: ScaleType.FormaldehydeLevel,
	},
	[SensorType.RadonConcentration]: {
		label: "Radon concentration",
		scaleType: ScaleType.RadonConcentration,
	},
	[SensorType.MethaneDensityCH4]: {
		label: "Methane (CH₄) density",
		scaleType: ScaleType.MethaneDensity,
	},
	[SensorType.VolatileOrganicCompound]: {
		label: "Volatile Organic Compound level",
		scaleType: ScaleType.VolatileOrganicCompoundLevel,
	},
	[SensorType.CarbonMonoxideCOLevel]: {
		label: "Carbon monoxide (CO) level",
		scaleType: ScaleType.CarbonMonoxideLevel,
	},
	[SensorType.SoilHumidity]: {
		label: "Soil humidity",
		scaleType: ScaleType.Percentage,
	},
	[SensorType.SoilReactivity]: {
		label: "Soil reactivity",
		scaleType: ScaleType.Acidity,
	},
	[SensorType.SoilSalinity]: {
		label: "Soil salinity",
		scaleType: ScaleType.SoilSalinity,
	},
	[SensorType.HeartRate]: {
		label: "Heart rate",
		scaleType: ScaleType.HeartRate,
	},
	[SensorType.BloodPressure]: {
		label: "Blood pressure",
		scaleType: ScaleType.BloodPressure,
	},
	[SensorType.MuscleMass]: {
		label: "Muscle mass",
		scaleType: ScaleType.Mass,
	},
	[SensorType.FatMass]: {
		label: "Fat mass",
		scaleType: ScaleType.Mass,
	},
	[SensorType.BoneMass]: {
		label: "Bone mass",
		scaleType: ScaleType.Mass,
	},
	[SensorType.TotalBodyWaterTBW]: {
		label: "Total body water (TBW)",
		scaleType: ScaleType.Mass,
	},
	[SensorType.BasicMetabolicRateBMR]: {
		label: "Basis metabolic rate (BMR)",
		scaleType: ScaleType.BasisMetabolicRate,
	},
	[SensorType.BodyMassIndexBMI]: {
		label: "Body Mass Index (BMI)",
		scaleType: ScaleType.BodyMassIndex,
	},
	[SensorType.AccelerationXAxis]: {
		label: "Acceleration X-axis",
		scaleType: ScaleType.Acceleration,
	},
	[SensorType.AccelerationYAxis]: {
		label: "Acceleration Y-axis",
		scaleType: ScaleType.Acceleration,
	},
	[SensorType.AccelerationZAxis]: {
		label: "Acceleration Z-axis",
		scaleType: ScaleType.Acceleration,
	},
	[SensorType.SmokeDensity]: {
		label: "Smoke density",
		scaleType: ScaleType.Percentage,
	},
	[SensorType.WaterFlow]: {
		label: "Water flow",
		scaleType: ScaleType.WaterFlow,
	},
	[SensorType.WaterPressure]: {
		label: "Water pressure",
		scaleType: ScaleType.WaterPressure,
	},
	[SensorType.RFSignalStrength]: {
		label: "RF signal strength",
		scaleType: ScaleType.RFSignalStrength,
	},
	[SensorType.ParticulateMatter10]: {
		label: "Particulate Matter 10",
		scaleType: ScaleType.ParticulateMatter10,
	},
	[SensorType.RespiratoryRate]: {
		label: "Respiratory rate",
		scaleType: ScaleType.RespiratoryRate,
	},
	[SensorType.RelativeModulationLevel]: {
		label: "Relative Modulation level",
		scaleType: ScaleType.Percentage,
	},
	[SensorType.BoilerWaterTemperature]: {
		label: "Boiler water temperature",
		scaleType: ScaleType.Temperature,
	},
	[SensorType.DomesticHotWaterTemperature]: {
		label: "Domestic Hot Water (DHW) temperature",
		scaleType: ScaleType.Temperature,
	},
	[SensorType.OutsideTemperature]: {
		label: "Outside temperature",
		scaleType: ScaleType.Temperature,
	},
	[SensorType.ExhaustTemperature]: {
		label: "Exhaust temperature",
		scaleType: ScaleType.Temperature,
	},
	[SensorType.WaterChlorineLevel]: {
		label: "Water Chlorine level",
		scaleType: ScaleType.WaterChlorineLevel,
	},
	[SensorType.WaterAcidity]: {
		label: "Water acidity",
		scaleType: ScaleType.Acidity,
	},
	[SensorType.WaterOxidationReductionPotential]: {
		label: "Water Oxidation reduction potential",
		scaleType: ScaleType.WaterOxidationReductionPotential,
	},
	[SensorType.HeartRateLFHFRatio]: {
		label: "Heart Rate LF/HF ratio",
		scaleType: ScaleType.Unitless,
	},
	[SensorType.MotionDirection]: {
		label: "Motion Direction",
		scaleType: ScaleType.Direction,
	},
	[SensorType.AppliedForce]: {
		label: "Applied force on the sensor",
		scaleType: ScaleType.AppliedForce,
	},
	[SensorType.ReturnAirTemperature]: {
		label: "Return Air temperature",
		scaleType: ScaleType.Temperature,
	},
	[SensorType.SupplyAirTemperature]: {
		label: "Supply Air temperature",
		scaleType: ScaleType.Temperature,
	},
	[SensorType.CondenserCoilTemperature]: {
		label: "Condenser Coil temperature",
		scaleType: ScaleType.Temperature,
	},
	[SensorType.EvaporatorCoilTemperature]: {
		label: "Evaporator Coil temperature",
		scaleType: ScaleType.Temperature,
	},
	[SensorType.LiquidLineTemperature]: {
		label: "Liquid Line temperature",
		scaleType: ScaleType.Temperature,
	},
	[SensorType.DischargeLineTemperature]: {
		label: "Discharge Line temperature",
		scaleType: ScaleType.Temperature,
	},
	[SensorType.SuctionPressure]: {
		label: "Suction Pressure",
		scaleType: ScaleType.Pressure,
	},
	[SensorType.DischargePressure]: {
		label: "Discharge Pressure",
		scaleType: ScaleType.Pressure,
	},
	[SensorType.DefrostTemperature]: {
		label: "Defrost temperature",
		scaleType: ScaleType.Temperature,
	},
	[SensorType.Ozone]: {
		label: "Ozone",
		scaleType: ScaleType.Density,
	},
	[SensorType.SulfurDioxide]: {
		label: "Sulfur dioxide",
		scaleType: ScaleType.Density,
	},
	[SensorType.NitrogenDioxide]: {
		label: "Nitrogen dioxide",
		scaleType: ScaleType.Density,
	},
	[SensorType.Ammonia]: {
		label: "Ammonia",
		scaleType: ScaleType.Density,
	},
	[SensorType.Lead]: {
		label: "Lead",
		scaleType: ScaleType.Density,
	},
	[SensorType.ParticulateMatter1]: {
		label: "Particulate Matter 1",
		scaleType: ScaleType.Density,
	},
	[SensorType.PersonCounterEntering]: {
		label: "Person counter (entering)",
		scaleType: ScaleType.Unitless,
	},
	[SensorType.PersonCounterExiting]: {
		label: "Person counter (exiting)",
		scaleType: ScaleType.Unitless,
	},
};

export function getScaleName(
	sensorType: SensorType,
	scaleIndex: ScaleIndex
): string | undefined {
	const scaleType = sensorTypes[sensorType]?.scaleType;
	if (scaleType === undefined) {
		return undefined;
	}
	return scales[scaleType][scaleIndex]?.name;
}

export function getScaleIndex(
	sensorType: SensorType,
	scaleName: string
): ScaleIndex {
	const scaleType = sensorTypes[sensorType]?.scaleType;
	if (scaleType === undefined) {
		throw new Error(`unknown sensor type 0x${toHex(sensorType, 2)}`);
	}
	for (const [index, scale] of Object.entries(scales[scaleType])) {
		if (scale.name === scaleName) {
			return parseInt(index, 10) as ScaleIndex;
		}
	}
	const validNames = Array.from(Object.values(scales[scaleType])).map(
		(scale) => scale.name
	);
	throw new Error(
		`unknown scale name '${scaleName}', expected one of: ${validNames.join(
			", "
		)}`
	);
}
