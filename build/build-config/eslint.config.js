// Shared ESLint flat config for @ezwave packages.
//
// Consumers extend this from their own eslint.config.js and append a config
// object setting `languageOptions.parserOptions.tsconfigRootDir: __dirname`,
// since that path must be resolved relative to the consuming package, not
// this shared one. For example:
//
//   const base = require("@ezwave/build-config/eslint.config.js");
//   module.exports = [
//     ...base,
//     { languageOptions: { parserOptions: { tsconfigRootDir: __dirname } } },
//   ];

const js = require("@eslint/js");
const tsPlugin = require("@typescript-eslint/eslint-plugin");

module.exports = [
	js.configs.recommended,
	...tsPlugin.configs["flat/recommended"],
	{
		files: ["**/*.ts", "**/*.tsx"],
		languageOptions: {
			parserOptions: {
				project: "./tsconfig.json",
			},
		},
		rules: {
			"no-void": ["error", { allowAsStatement: true }],
			"@typescript-eslint/no-unused-vars": [
				"warn",
				{ argsIgnorePattern: "^_", caughtErrorsIgnorePattern: "^_" },
			],
			// `class Foo extends EventEmitter` + `interface Foo { on(...): this }` is the
			// standard pattern for typing EventEmitter subclasses' events; it's deliberate here.
			"@typescript-eslint/no-unsafe-declaration-merging": "off",
			"@typescript-eslint/no-floating-promises": "error",
			// Equivalent of @rushstack/no-new-null, without the extra dependency.
			"no-restricted-syntax": [
				"error",
				{
					selector: "TSNullKeyword",
					message:
						'Usage of "null" is deprecated except when describing legacy APIs; use "undefined" instead.',
				},
				{
					selector: "Literal[value=null]",
					message:
						'Usage of "null" is deprecated except when describing legacy APIs; use "undefined" instead.',
				},
			],
			"no-bitwise": "warn",
			// Core correctness/security rules enabled by the old Rush-based config
			// that plain eslint/typescript-eslint "recommended" don't include.
			"accessor-pairs": "error",
			"dot-notation": "error",
			eqeqeq: "error",
			"guard-for-in": "error",
			"no-caller": "error",
			"no-eval": "error",
			"no-extend-native": "error",
			"no-extra-label": "error",
			"no-implied-eval": "error",
			"no-label-var": "error",
			"no-lone-blocks": "error",
			"no-multi-str": "error",
			"no-new": "error",
			"no-new-func": "error",
			"no-new-object": "error",
			"no-new-wrappers": "error",
			"no-octal-escape": "error",
			"no-return-assign": "error",
			"no-script-url": "error",
			"no-self-compare": "error",
			"no-sequences": "error",
			"no-throw-literal": "error",
			"no-unmodified-loop-condition": "error",
			"no-useless-concat": "error",
			"require-atomic-updates": "error",
			"@typescript-eslint/member-ordering": [
				"warn",
				{
					default: [
						// Index signature
						"signature",

						// Fields
						"public-static-field",
						"protected-static-field",
						"private-static-field",

						"public-decorated-field",
						"protected-decorated-field",
						"private-decorated-field",

						"public-instance-field",
						"protected-instance-field",
						"private-instance-field",

						"public-abstract-field",
						"protected-abstract-field",

						"public-field",
						"protected-field",
						"private-field",

						"static-field",
						"instance-field",
						"abstract-field",

						"decorated-field",

						"field",

						// Static Methods
						"public-static-method",
						"protected-static-method",
						"private-static-method",

						// Constructors
						"public-constructor",
						"protected-constructor",
						"private-constructor",
						"constructor",

						// Instance methods
						"public-decorated-method",
						"protected-decorated-method",
						"private-decorated-method",

						"public-instance-method",
						"protected-instance-method",
						"private-instance-method",

						"public-abstract-method",
						"protected-abstract-method",

						"public-method",
						"protected-method",
						"private-method",

						"static-method",
						"instance-method",
						"abstract-method",

						"decorated-method",

						"method",
					],
				},
			],
		},
	},
	{
		// Generated from external data (e.g. the official Z-Wave XML spec) and
		// regenerated on every build, so its contents aren't ours to "fix".
		files: ["**/generated/**"],
		rules: {
			"@typescript-eslint/no-duplicate-enum-values": "off",
			// The generator's templates emit a fixed set of imports per file,
			// not all of which end up used by every generated command class.
			"@typescript-eslint/no-unused-vars": "off",
		},
	},
	{
		// Reassigning properties on a shared fake/mock between awaits is the
		// normal way tests drive a mock's behavior step by step; there's no
		// real concurrency here for the rule to protect against.
		files: ["**/*.test.ts"],
		rules: {
			"require-atomic-updates": "off",
		},
	},
];
