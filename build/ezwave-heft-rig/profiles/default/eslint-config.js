// This is a workaround for https://github.com/eslint/eslint/issues/3458
require("@rushstack/eslint-config/patch/modern-module-resolution");

module.exports = {
	extends: ["@rushstack/eslint-config/profile/node"],
	overrides: [
		{
			files: ["*.ts", "*.tsx"],
			rules: {
				"@typescript-eslint/naming-convention": 0,
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
							"private-abstract-field",

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
							"private-abstract-method",

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
	],
};
