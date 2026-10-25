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

const nodeProfile = require("@rushstack/eslint-config/flat/profile/node");

module.exports = [
	...nodeProfile,
	{
		files: ["**/*.ts", "**/*.tsx"],
		rules: {
			"@typescript-eslint/naming-convention": [
				"warn",
				{
					selector: "default",
					format: ["camelCase"],
				},
				{
					selector: "variable",
					format: ["camelCase", "UPPER_CASE"],
				},
				{
					selector: "parameter",
					// Adding "PascalCase" for the case of passing a contructor.
					// This is not selectable with a "types" (yet), see https://github.com/typescript-eslint/typescript-eslint/issues/1484
					format: ["camelCase", "PascalCase"],
					leadingUnderscore: "allow",
				},
				{
					selector: "memberLike",
					modifiers: ["private"],
					// Adding "PascalCase" for the case of passing a contructor.
					// This is not selectable with a "types" (yet), see https://github.com/typescript-eslint/typescript-eslint/issues/1484
					format: ["camelCase", "PascalCase"],
					leadingUnderscore: "require",
				},
				{
					selector: "property",
					// Adding "PascalCase" for the case of passing a contructor.
					// This is not selectable with a "types" (yet), see https://github.com/typescript-eslint/typescript-eslint/issues/1484
					format: ["camelCase", "PascalCase"],
					leadingUnderscore: "allow",
				},
				{
					selector: "typeLike",
					format: ["PascalCase"],
				},
				{
					selector: "enumMember",
					format: ["PascalCase"],
				},
			],
			"no-void": ["error", { allowAsStatement: true }],
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
		files: ["**/*.machine.ts"],
		rules: {
			"@typescript-eslint/naming-convention": [
				"warn",
				{
					selector: "property",
					// XState machines need special naming for the states etc
					format: ["camelCase", "PascalCase", "UPPER_CASE"],
					leadingUnderscore: "allow",
				},
			],
		},
	},
];
