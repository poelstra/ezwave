module.exports = {
	extends: [
		"./node_modules/@ezwave/ezwave-heft-rig/profiles/default/eslint-config",
	],
	parserOptions: { tsconfigRootDir: __dirname },
	overrides: [
		{
			files: ["src/generated/*.ts"],
			rules: {
				"max-lines": "off",
				"@typescript-eslint/no-unused-vars": "off",
				"@typescript-eslint/naming-convention": [
					"warn",
					{
						selector: "enumMember",
						format: ["PascalCase"],
						// Some auto-generated enums start with a number, and are
						// therefore prefixed with an underscore to make them valid
						// identifiers
						leadingUnderscore: "allow",
					},
				],
			},
		},
	],
};
