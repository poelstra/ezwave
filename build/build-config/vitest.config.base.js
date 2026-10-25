// Shared Vitest base config for @ezwave packages. Consume from a package's
// own vitest.config.mts (.mts, not .ts, so Vite's config loader sees
// unambiguous ESM and doesn't warn about ESM syntax in a CJS-looking file)
// via:
//
//   import { defineConfig } from "vitest/config";
//   import base from "@ezwave/build-config/vitest.config.base.js";
//
//   export default defineConfig(base);

module.exports = {
	test: {
		environment: "node",
		include: ["src/**/*.test.ts"],
	},
};
