// Root Vitest config, so VSCode's Vitest extension (and `vitest` run directly
// from the repo root) see one combined project listing all packages' tests,
// instead of discovering each package's vitest.config.mts as its own
// separate, independent project. Each package keeps its own config (which
// still works standalone, e.g. via `pnpm --filter <pkg> test` / Turborepo);
// this just lists them so they're grouped together too.
import { defineConfig } from "vitest/config";

export default defineConfig({
	test: {
		projects: ["libraries/*/vitest.config.mts"],
	},
});
