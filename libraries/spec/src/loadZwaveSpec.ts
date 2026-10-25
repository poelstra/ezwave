import { readFileSync } from "fs";
import { join } from "path";
import { ZwaveSpec } from "./jsonSpec";

let cachedSpec: ZwaveSpec | undefined;

/**
 * Load (and cache) the Z-Wave JSON specification generated at build time
 * from the official XML specification (see `generator/xml2json.ts`).
 */
export function loadZwaveSpec(): ZwaveSpec {
	if (!cachedSpec) {
		const raw = readFileSync(join(__dirname, "zwave.json"), "utf8");
		cachedSpec = JSON.parse(raw) as ZwaveSpec;
	}
	return cachedSpec;
}
