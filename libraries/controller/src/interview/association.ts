import { CommandClasses, parseCommandClassCommands } from "@ezwave/codec";
import { AssociationGrpInfoV3, AssociationV2 } from "@ezwave/commands";
import {
	ProfileControlEnum,
	ProfileGeneralEnum,
	ProfileIrrigationEnum,
	ProfileMeterEnum,
	ProfileNotificationEnum,
	ProfileSensorEnum,
} from "@ezwave/commands/lib/generated/AssociationGrpInfoV3";
import {
	namedSessionRunner,
	SessionRunner,
	waitForAll,
	waitForFiltered,
} from "../session";

export type Profile =
	| {
			category: AssociationGrpInfoV3.Profile1Enum.ProfileGeneral;
			profile: ProfileGeneralEnum;
	  }
	| {
			category: AssociationGrpInfoV3.Profile1Enum.ProfileControl;
			profile: ProfileControlEnum;
	  }
	| {
			category: AssociationGrpInfoV3.Profile1Enum.ProfileSensor;
			profile: ProfileSensorEnum;
	  }
	| {
			category: AssociationGrpInfoV3.Profile1Enum.ProfileMeter;
			profile: ProfileMeterEnum;
	  }
	| {
			category: AssociationGrpInfoV3.Profile1Enum.ProfileIrrigation;
			profile: ProfileIrrigationEnum;
	  }
	| {
			category: AssociationGrpInfoV3.Profile1Enum.ProfileNotification;
			profile: ProfileNotificationEnum;
	  };

export interface AssociationGroupInfo {
	groupingIdentifier: number;
	maxNodesSupported: number;
	nodeIds: number[];
	name?: string;
	profile?: Profile;
	controlledCommands?: ReadonlyMap<CommandClasses, number[]>;
}

export interface InterviewAssociationsRequest {
	interviewAssociationGroupInfo: boolean;
	refreshCache?: boolean;
}

export function buildInterviewAssociations(
	request: InterviewAssociationsRequest
): SessionRunner<Map<number, AssociationGroupInfo>> {
	return namedSessionRunner(
		"InterviewAssociations",
		request,
		async (session) => {
			await session.send(new AssociationV2.AssociationGroupingsGet());
			const numberOfGroups = (
				await session.waitFor(AssociationV2.AssociationGroupingsReport)
			).supportedGroupings;
			const groups: Map<number, AssociationGroupInfo> = new Map();
			for (let groupId = 1; groupId <= numberOfGroups; groupId++) {
				const assocGroup = await session.execute(
					buildInterviewAssociationGroup({
						groupId,
						interviewAssociationGroupInfo:
							request.interviewAssociationGroupInfo,
						refreshCache: request.refreshCache,
					})
				);
				groups.set(groupId, assocGroup);
			}
			return groups;
		}
	);
}

export interface InterviewAssociationGroupRequest {
	groupId: number;
	interviewAssociationGroupInfo: boolean;
	refreshCache?: boolean;
}

export function buildInterviewAssociationGroup(
	request: InterviewAssociationGroupRequest
): SessionRunner<AssociationGroupInfo> {
	return namedSessionRunner(
		"InterviewAssociationGroup",
		request,
		async (session, request): Promise<AssociationGroupInfo> => {
			await session.send(
				new AssociationV2.AssociationGet({
					groupingIdentifier: request.groupId,
				})
			);
			const reports = await waitForAll(
				session,
				AssociationV2.AssociationReport,
				(report) => report.groupingIdentifier === request.groupId,
				(report) => report.reportsToFollow
			);

			let name: string | undefined;
			let profile: Profile | undefined;
			let controlledCommands: Map<CommandClasses, number[]> | undefined;
			if (request.interviewAssociationGroupInfo) {
				await session.send(
					new AssociationGrpInfoV3.AssociationGroupNameGet({
						groupingIdentifier: request.groupId,
					})
				);
				name = (
					await waitForFiltered(
						session,
						AssociationGrpInfoV3.AssociationGroupNameReport,
						(report) =>
							report.groupingIdentifier === request.groupId
					)
				).name;

				await session.send(
					new AssociationGrpInfoV3.AssociationGroupInfoGet({
						groupingIdentifier: request.groupId,
						refreshCache: request.refreshCache ?? false,
						listMode: false,
					})
				);
				const groupInfo = (
					await waitForFiltered(
						session,
						AssociationGrpInfoV3.AssociationGroupInfoReport,
						(report) =>
							report.vg1[0]?.groupingIdentifier ===
							request.groupId
					)
				).vg1[0];
				profile = {
					category: groupInfo.profile1,
					profile: groupInfo.profile2,
				} as Profile;

				await session.send(
					new AssociationGrpInfoV3.AssociationGroupCommandListGet({
						groupingIdentifier: request.groupId,
						allowCache: !(request.refreshCache ?? false),
					})
				);
				const commands = parseCommandClassCommands(
					(
						await waitForFiltered(
							session,
							AssociationGrpInfoV3.AssociationGroupCommandListReport,
							(report) =>
								report.groupingIdentifier === request.groupId
						)
					).command
				);
				controlledCommands = new Map();
				for (const command of commands) {
					if (!controlledCommands.get(command.commandClass)) {
						controlledCommands.set(command.commandClass, []);
					}
					controlledCommands
						.get(command.commandClass)
						?.push(command.command);
				}
			}
			return {
				groupingIdentifier: reports[0].groupingIdentifier,
				maxNodesSupported: reports[0].maxNodesSupported,
				nodeIds: reports.flatMap((report) => report.nodeIds),
				name,
				profile,
				controlledCommands,
			};
		}
	);
}

export interface RemoveAssociationRequest {
	/**
	 * Association group to remove node IDs from.
	 *
	 * Version 2 and higher support passing grouping ID 0 to remove
	 * a specific set of node IDs or all node IDs in one command.
	 */
	groupingIdentifier: number;

	/**
	 * One or more node IDs to remove, or omit or leave empty to remove all groups.
	 */
	nodeIds?: number[];
}

export function buildRemoveAssociation(
	request: RemoveAssociationRequest
): SessionRunner<void> {
	return namedSessionRunner(
		"RemoveAssociation",
		request,
		async (session, request): Promise<void> => {
			await session.send(
				new AssociationV2.AssociationRemove({
					groupingIdentifier: request.groupingIdentifier,
					nodeIds: request.nodeIds ?? [],
				})
			);
		}
	);
}

export interface AddAssociationRequest {
	/**
	 * Association group to add node IDs to.
	 */
	groupingIdentifier: number;

	/**
	 * One or more node IDs to add.
	 *
	 * Omit or leave empty to remove all groups.
	 */
	nodeIds: number[];
}

export function buildAddAssociation(
	request: AddAssociationRequest
): SessionRunner<void> {
	return namedSessionRunner(
		"AddAssociation",
		request,
		async (session, request): Promise<void> => {
			await session.send(
				new AssociationV2.AssociationSet({
					groupingIdentifier: request.groupingIdentifier,
					nodeIds: request.nodeIds,
				})
			);
		}
	);
}
