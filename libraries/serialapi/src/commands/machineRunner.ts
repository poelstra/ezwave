import debug from "debug";
import * as util from "util";
import {
	Actor,
	AnyActor,
	AnyStateMachine,
	EventFromLogic,
	OutputFrom,
} from "xstate";
import { Events } from "./events";

const log: debug.Debugger = debug("zwave:serialapi:machine");

/**
 * Run a state machine actor to completion, feeding it with the given events.
 *
 * @param typedActor Actor to start (must not have been started yet).
 * @param events Events to forward to the actor.
 * @returns Output of the machine when it reaches its final state.
 *     Rejects when getting events fails, or when the machine itself fails.
 */
export function runMachineActor<TMachine extends AnyStateMachine>(
	typedActor: Actor<TMachine>,
	events: Events<EventFromLogic<TMachine>>
): Promise<OutputFrom<TMachine>> {
	// Snapshot type of a generic machine can't be resolved here
	const actor: AnyActor = typedActor;
	return new Promise<OutputFrom<TMachine>>((resolve, reject) => {
		actor.subscribe({
			next: (snapshot) => {
				log(
					`transition actor=${actor.id} newState=${util.inspect(
						snapshot.value
					)}`
				);
				if (snapshot.status === "done") {
					resolve(snapshot.output as OutputFrom<TMachine>);
				}
			},
			error: reject,
		});
		const pumpEvents = async (): Promise<void> => {
			try {
				while (actor.getSnapshot().status === "active") {
					const event = await events.get();
					if (actor.getSnapshot().status !== "active") {
						break;
					}
					log(`event actor=${actor.id} event=${util.inspect(event)}`);
					actor.send(event);
				}
			} catch (err) {
				reject(err);
				actor.stop();
			}
		};
		actor.start();
		void pumpEvents(); // ignore result, can't fail (TM)
	});
}
