// Shared Vitest base config for @ezwave packages. Consume from a package's
// own vitest.config.ts via:
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
