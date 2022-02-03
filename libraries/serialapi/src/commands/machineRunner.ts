import { InterpreterWithMatches } from "@xstate/compiled";
import debug from "debug";
import * as util from "util";
import { EventObject, InterpreterStatus } from "xstate";
import { Events } from "./events";

const log = debug("zwave:serialapi:machine");

export function runMachineService<TEvent extends EventObject, R>(
	service: InterpreterWithMatches<any, any, TEvent, any>,
	events: Events<TEvent>
): Promise<R> {
	return new Promise<R>((resolve, reject) => {
		service.onDone((event) => resolve(event.data));
		service.onTransition((state, event) => {
			log(
				`transition service=${service.id} event=${util.inspect(
					event
				)} newState=${util.inspect(state.value)}`
			);
		});
		const pumpEvents = async () => {
			try {
				while (service.status === InterpreterStatus.Running) {
					const event = await events.get();
					service.send(event);
				}
			} catch (err) {
				reject(err);
				service.stop();
			}
		};
		service.start();
		// eslint-disable-next-line no-void
		void pumpEvents(); // ignore result, can't fail (TM)
	});
}
