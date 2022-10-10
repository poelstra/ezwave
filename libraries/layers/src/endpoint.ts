export interface Endpoint {
	nodeId: number;
	channel?: number;
}

/**
 * Helper to more easily create an endpoint object.
 */

export function ep(nodeId: number, channel?: number): Endpoint {
	return {
		nodeId,
		channel,
	};
}

export function isSameEndpoint(ep1: Endpoint, ep2: Endpoint): boolean {
	return (
		ep1.nodeId === ep2.nodeId && (ep1.channel ?? 0) === (ep2.channel ?? 0)
	);
}
