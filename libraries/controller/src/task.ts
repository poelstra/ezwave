import { Session } from "./session";
import { JsonValue } from "./types";

export interface Task<R> {
	inspect(): string;
	execute(session: Session): Promise<R>;
	merge?(task: this): boolean;
}

export interface ControllerTask<R> extends Task<R> {
	execute(ControllerSession: Session): Promise<R>;
}

export interface Serializable {
	serialize(): JsonValue;
}

export interface Deserializer<T> {
	name: string;
	constructFrom(value: JsonValue): T;
}
