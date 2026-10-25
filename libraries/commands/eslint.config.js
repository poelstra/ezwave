const base = require("@ezwave/build-config/eslint.config.js");

module.exports = [
	...base,
	{ languageOptions: { parserOptions: { tsconfigRootDir: __dirname } } },
];
