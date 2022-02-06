import { packetToString } from "@ezwave/codec";
import { DestinationType } from "@ezwave/serialapi";
import { Endpoint, LayerCommand, LayerEvent } from "./layer";

export function endPointToString(endpoint: Endpoint): string {
	return `${endpoint.nodeId}${
		endpoint.channel ? `:${endpoint.channel}` : ""
	}`;
}

export function layerEventToString(event: LayerEvent<any>): string {
	return `from=${endPointToString(event.endpoint)} type=${
		DestinationType[event.packetType]
	} packet=${packetToString(event.packet)}`;
}

export function layerCommandToString(command: LayerCommand): string {
	return `to=${endPointToString(command.endpoint)}${
		command.secure ? " secure=true" : ""
	} packet=${packetToString(command.packet)}`;
}
