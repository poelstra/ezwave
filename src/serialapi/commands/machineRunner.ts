import * as debug from "debug";
import { EventObject, Interpreter, InterpreterStatus } from "xstate";
import { Events } from "./events";
import * as util from "util";

const log = debug("zwave:serialapi:machine");

export function runMachineService<TContext, TEvent extends EventObject, R>(
	service: Interpreter<TContext, any, TEvent>,
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
		void pumpEvents(); // ignore result, can't fail (TM)
	});
}
