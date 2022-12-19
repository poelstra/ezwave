import { BatteryV1 } from "@ezwave/commands";
import { Session } from "../session";
import { Task } from "../task";

export interface BatteryReport {
	/**
	 * Remaining battery percentage, or value "low" in case
	 * of battery low warning.
	 */
	batteryLevel: number | "low";
}

export class BatteryGetTask implements Task<BatteryReport> {
	public inspect(): string {
		return `<BatteryGet>`;
	}

	public async execute(session: Session): Promise<BatteryReport> {
		await session.send(new BatteryV1.BatteryGet());
		const report = await session.waitFor(BatteryV1.BatteryReport);
		return formatBatteryReport(report);
	}

	public merge(_task: this): boolean {
		return true;
	}
}

export function formatBatteryReport(
	report: BatteryV1.BatteryV1BatteryReportData
): BatteryReport {
	return {
		batteryLevel:
			report.batteryLevel === 0xff ? "low" : report.batteryLevel,
	};
}
