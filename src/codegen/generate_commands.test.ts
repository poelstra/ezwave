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
import { SecurityV1 } from "../generated/SecurityV1";
import { ZipV4 } from "../generated/ZipV4";

interface CommandConstructor<T extends object | void>
	extends CommandPacketConstructor<CommandPacket<T>> {
	new (data: T): CommandPacket<T>;
	new (commandAndPayload: Buffer): CommandPacket<T>;
}

function verifyRoundTrip<T extends object | void>(
	Command: CommandConstructor<T>,
	fullPacket: Buffer,
	data: T
): void {
	// Decode
	const packet = new Packet(fullPacket);
	const decoded = packet.as(Command);
	expect(decoded.data).to.deep.equal({ ...data });

	// Encode
	const encoded = new Command(data);
	expect(encoded.serialize()).to.deep.equal(fullPacket);
}

describe("generate_commands", () => {
	it("BasicV2.BasicSet", () => {
		// - byte field
		verifyRoundTrip(BasicV2.BasicSet, Buffer.from([0x20, 0x01, 0x30]), {
			value: 0x30,
		});
	});

	it("BasicV2.BasicReport", () => {
		// - multiple byte fields
		verifyRoundTrip(
			BasicV2.BasicReport,
			Buffer.from([0x20, 0x03, 0x30, 0x1, 0x2]),
			{ currentValue: 0x30, targetValue: 0x1, duration: 0x2 }
		);
	});

	it("AlarmV2.AlarmGet", () => {
		// - integer and enum field
		verifyRoundTrip(
			AlarmV2.AlarmGet,
			Buffer.from([0x71, 0x04, 0x01, 0x08]),
			{
				alarmType: 0x01,
				zwaveAlarmType: ZwaveAlarmTypeEnum.PowerManagement,
			}
		);
	});

	it.skip("VersionV3.VersionZwaveSoftwareReport", () => {
		// - 2- and 3-byte integers
	});

	it.skip("RateTblConfig.RateTblSet", () => {
		// - 4-byte integer
	});

	it("SecurityV1.SecurityMessageEncapsulation", () => {
		// - automatic length buffer followed by two fixed-length fields
		// - sequence info has been merged into encryptedPayload
		// - fields where 'Byte' suffix is removed
		// prettier-ignore
		verifyRoundTrip(
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

	it.skip("MeterV3.MeterReport", () => {
		// - 1 optional field, which depends on:
		//   - a DWORD field (instead of a boolean bitfield element)
		//   - the DWORD field is also used as a normal value (delta time), not just marker bit
		// - there can be 1 or 2 meter values, and both of them must have the same size as
		//   indicated by another field (blob, but actually a number)
		// - the Scale field is split across two different bitfields
	});

	it.skip("MeterV4:MeterReport", () => {
		// - Scale 2 field was added since version 3, which must ONLY be present when the
		//   Scale (1) field has the value 7.
	});

	describe("ZipV4:CommandZipPacket", () => {
		// - three optional fields, two of which are dictated by the same bitfield property
		// - two optional fields dictated by one property, of which the first is an auto-generated one
		// - dynamic field where length-byte itself is included in total size
		it("supports both blob fields being present", () => {
			// prettier-ignore
			verifyRoundTrip(
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
	});

	it.skip("Configuration.ConfigurationBulkReport", () => {
		// - length of parameter group
		// - length of field inside parameter group determined by field outside of it
	});

	it.skip("Configuration.ConfigurationPropertiesReport", () => {
		// - length of multiple fields determined by a single param
	});

	it.skip("DoorLockV4.DoorLockCapabilitiesReport", () => {
		// - length of bitmask
		// - two variable-length fields
	});

	it.skip("EntryControlV1.EntryControlNotification", () => {
		// - optional, variable length field
	});

	it.skip("MeterTblMonitorV3.MeterTblStatusReportData", () => {
		// - Reports To Follow -> check whether this is actually specced correctly in XML
	});

	it.skip("Security2V1.Security2MessageEncapsulationData", () => {
		// - Autogenerated PresenceOf based on vg elements, and moreToFollow flag
	});

	it.skip("TransportServiceV2.CommandFirstSegmentData", () => {
		// - presenceOf based on two different fields, one of them used for the next
	});

	it.skip("ZWaveV1.NodeInfo", () => {
		// - Not a real command, but has explicit Controller bitfield, does need to check presence of BasicDeviceClass field
	});

	it.skip("Schedule.ScheduleStateReport", () => {
		// - Group with auto-length, and remaining field
	});

	it.skip("MultiInstanceAssociation.MultiInstanceAssociationSet", () => {
		// - Group with auto-length followed by marker and another group with ParamRef length
	});
});
