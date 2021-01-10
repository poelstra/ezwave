/**
 * Tests for the Z-Wave commands that are automatically generated,
 * and the corresponding decoder/encoder.
 *
 * Detailed edge-case tests for the decoder/encoder are in
 * decoder.test.ts/encoder.test.ts, this file mainly tests expected
 * behavior for 'real-world' Z-Wave commands.
 */

import { expect } from "chai";
import { CommandPacket } from "../commands/command";
import { CommandPacketConstructor, Packet } from "../commands/packet";
import { AlarmV2, ZwaveAlarmTypeEnum } from "../generated/AlarmV2";
import { BasicV2 } from "../generated/BasicV2";
import { MeterPulseV1 } from "../generated/MeterPulseV1";
import { RateTblConfigV1 } from "../generated/RateTblConfigV1";
import { SecurityV1 } from "../generated/SecurityV1";
import { VersionV3 } from "../generated/VersionV3";
import { ZipV4 } from "../generated/ZipV4";

interface CommandConstructor<T extends object | void>
	extends CommandPacketConstructor<CommandPacket<T>> {
	new (data: T): CommandPacket<T>;
	new (commandAndPayload: Buffer): CommandPacket<T>;
}

function verifyRoundTrip<T extends object | void>(
	name: string,
	Command: CommandConstructor<T>,
	fullPacket: Buffer,
	data: T
): void {
	it(`decodes ${name}`, () => {
		const packet = new Packet(fullPacket);
		const decoded = packet.as(Command);
		expect(decoded.data).to.deep.equal({ ...data });
	});

	it(`encodes ${name}`, () => {
		const encoded = new Command(data);
		expect(encoded.serialize()).to.deep.equal(fullPacket);
	});
}

describe("generate_commands", () => {
	describe("BasicV2.BasicSet", () => {
		// - byte field
		verifyRoundTrip(
			"example",
			BasicV2.BasicSet,
			Buffer.from([0x20, 0x01, 0x30]),
			{
				value: 0x30,
			}
		);
	});

	describe("BasicV2.BasicReport", () => {
		// - multiple byte fields
		verifyRoundTrip(
			"example",
			BasicV2.BasicReport,
			Buffer.from([0x20, 0x03, 0x30, 0x1, 0x2]),
			{ currentValue: 0x30, targetValue: 0x1, duration: 0x2 }
		);
	});

	describe("AlarmV2.AlarmGet", () => {
		// - integer and enum field
		verifyRoundTrip(
			"example",
			AlarmV2.AlarmGet,
			Buffer.from([0x71, 0x04, 0x01, 0x08]),
			{
				alarmType: 0x01,
				zwaveAlarmType: ZwaveAlarmTypeEnum.PowerManagement,
			}
		);
	});

	describe("VersionV3.VersionZwaveSoftwareReport", () => {
		// - 2- and 3-byte integers
		// prettier-ignore
		verifyRoundTrip(
			"example", 
			VersionV3.VersionZwaveSoftwareReport,
			Buffer.from([0x86, 0x18,
				0x06, 0x33, 0x09,
				0x00, 0x00, 0x00,
				0x12, 0x34,
				0x00, 0x00, 0x00,
				0x00, 0x00,
				0x00, 0x00, 0x00,
				0x00, 0x00,
				0x00, 0x00, 0x00,
				0x00, 0x00,
			]),
			{
				sdkVersion: 0x063309, // 3 byte unsigned integer, version 06.51.09 (example from SDS13782 Z-Wave Management Command Class Specification.pdf)
				applicationFrameworkApiVersion: 0, // 3 byte unsigned integer
				applicationFrameworkBuildNumber: 0x1234, // 2 byte unsigned integer
				hostInterfaceVersion: 0, // 3 byte unsigned integer
				hostInterfaceBuildNumber: 0, // 2 byte unsigned integer
				zWaveProtocolVersion: 0, // 3 byte unsigned integer
				zWaveProtocolBuildNumber: 0, // 2 byte unsigned integer
				applicationVersion: 0, // 3 byte unsigned integer
				applicationBuildNumber: 0, // 2 byte unsigned integer
			}
		);
	});

	describe("MeterPulseV1.MeterPulseReport", () => {
		// - 4-byte unsigned integer
		verifyRoundTrip(
			"example",
			MeterPulseV1.MeterPulseReport,
			Buffer.from([0x35, 0x05, 0xff, 0xfe, 0xfd, 0xfc]),
			{
				pulseCount: 0xfffefdfc,
			}
		);
	});

	describe("RateTblConfigV1.RateTblSet", () => {
		// - 4-byte integer
		// - short variable-length text field
		// prettier-ignore
		verifyRoundTrip(
			"example", 
			RateTblConfigV1.RateTblSet,
			Buffer.from([0x48, 0x01,
				0x00, 0x05,
				0x41, 0x42, 0x43, 0x44, 0x45,
				0x00, 0x00,
				0xff, 0xfe,
				0x00,
				0xff, 0xfe, 0xfd, 0xfc,
				0x01, 0x02, 0x03, 0x04,
				0x00,
				0x00, 0x00, 0x00, 0x00,
				0x00
			]),
			{
				rateParameterSetId: 0, // 1 byte unsigned integer
				rateType: 0, // properties1[6..5]
				rateCharacter: "ABCDE", // variable length
				startHourLocalTime: 0, // 1 byte unsigned integer
				startMinuteLocalTime: 0, // 1 byte unsigned integer
				durationMinute: 0xfffe, // 2 byte unsigned integer
				consumptionPrecision: 0, // properties2[7..5]
				consumptionScale: 0, // properties2[4..0]
				minConsumptionValue: 0xfffefdfc, // 4 byte unsigned integer
				maxConsumptionValue: 0x01020304, // 4 byte unsigned integer
				maxDemandPrecision: 0, // properties3[7..5]
				maxDemandScale: 0, // properties3[4..0]
				maxDemandValue: 0, // 4 byte unsigned integer
				dcpRateId: 0, // 1 byte unsigned integer
			}
		);
	});

	describe("SecurityV1.SecurityMessageEncapsulation", () => {
		// - automatic length buffer followed by two fixed-length fields
		// - sequence info has been merged into encryptedPayload
		// - fields where 'Byte' suffix is removed
		// prettier-ignore
		verifyRoundTrip(
			"example", 
			SecurityV1.SecurityMessageEncapsulation,
			Buffer.from([0x98, 0x81, 0x11, 0x11, 0x11, 0x11, 0x11, 0x11, 0x11, 0x11, 0x22, 0x33, 0x33, 0x33, 0x44, 0x55, 0x55, 0x55, 0x55, 0x55, 0x55, 0x55, 0x55]),
			{
				initializationVector: Buffer.from([0x11, 0x11, 0x11, 0x11, 0x11, 0x11, 0x11, 0x11]),
				encryptedPayload: Buffer.from([0x22, 0x33, 0x33, 0x33]),
				receiversNonceIdentifier: 0x44,
				messageAuthenticationCode: Buffer.from([0x55, 0x55, 0x55, 0x55, 0x55, 0x55, 0x55, 0x55]),
			}
		);
	});

	describe("ZipV4:CommandZipPacket", () => {
		// - three optional fields, two of which are dictated by the same bitfield property
		// - two optional fields dictated by one property, of which the first is an auto-generated one
		// - dynamic field where length-byte itself is included in total size
		// prettier-ignore
		verifyRoundTrip(
			"supports both blob fields being present",
			ZipV4.CommandZipPacket,
			Buffer.from([0x23, 0x02, 0x00, 0xc0, 0x12, 0x13, 0x14, 0x03, 0x01, 0x02, 0x0a, 0x0b]),
			{
				ackRequest: false, // properties1[7]
				ackResponse: false, // properties1[6]
				nackResponse: false, // properties1[5]
				nackWaiting: false, // properties1[4]
				nackQueueFull: false, // properties1[3]
				nackOptionError: false, // properties1[2]
				moreInformation: false, // properties2[5]
				secureOrigin: false, // properties2[4]
				seqNo: 0x12, // 1 byte unsigned integer
				sourceEndPoint: 0x13, // properties3[6..0]
				bitAddress: false, // properties4[7]
				destinationEndPoint: 0x14, // properties4[6..0]
				headerExtension: Buffer.from([0x01, 0x02]), // variable length
				zWaveCommand: Buffer.from([0x0a, 0x0b]), // automatic length
			}
		);
	});

	describe.skip("MeterV3.MeterReport", () => {
		// - 1 optional field, which depends on:
		//   - a DWORD field (instead of a boolean bitfield element)
		//   - the DWORD field is also used as a normal value (delta time), not just marker bit
		// - there can be 1 or 2 meter values, and both of them must have the same size as
		//   indicated by another field (blob, but actually a number)
		// - the Scale field is split across two different bitfields
	});

	describe.skip("MeterV4:MeterReport", () => {
		// - Scale 2 field was added since version 3, which must ONLY be present when the
		//   Scale (1) field has the value 7.
	});

	describe.skip("Configuration.ConfigurationBulkReport", () => {
		// - length of parameter group
		// - length of field inside parameter group determined by field outside of it
	});

	describe.skip("Configuration.ConfigurationPropertiesReport", () => {
		// - length of multiple fields determined by a single param
	});

	describe.skip("DoorLockV4.DoorLockCapabilitiesReport", () => {
		// - length of bitmask
		// - two variable-length fields
	});

	describe.skip("EntryControlV1.EntryControlNotification", () => {
		// - optional, variable length field
	});

	describe.skip("MeterTblMonitorV3.MeterTblStatusReportData", () => {
		// - Reports To Follow -> check whether this is actually specced correctly in XML
	});

	describe.skip("Security2V1.Security2MessageEncapsulationData", () => {
		// - Autogenerated PresenceOf based on vg elements, and moreToFollow flag
	});

	describe.skip("TransportServiceV2.CommandFirstSegmentData", () => {
		// - presenceOf based on two different fields, one of them used for the next
	});

	describe.skip("ZWaveV1.NodeInfo", () => {
		// - Not a real command, but has explicit Controller bitfield, does need to check presence of BasicDeviceClass field
	});

	describe.skip("Schedule.ScheduleStateReport", () => {
		// - Group with auto-length, and remaining field
	});

	describe.skip("MultiInstanceAssociation.MultiInstanceAssociationSet", () => {
		// - Group with auto-length followed by marker and another group with ParamRef length
	});
});
