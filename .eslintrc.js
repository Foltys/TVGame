module.exports = {
	parser: '@typescript-eslint/parser',
	parserOptions: {
		sourceType: 'module',
	},
	env: {
		node: true,
	},
	globals: {
		Proxy: true,
		Map: true,
		test: true,
		Symbol: true,
		Promise: true,
		Set: true,
	},
	plugins: ['@typescript-eslint'],
	extends: [
		'@sbks/eslint-config/default',
		'plugin:@typescript-eslint/recommended',
		'prettier/@typescript-eslint',
		'plugin:prettier/recommended',
	],
	settings: {
		'import/resolver': {
			node: {
				extensions: ['.js', '.ts'],
				paths: ['./src', './test', './scripts'],
				moduleDirectory: ['node_modules'],
			},
		},
	},
	rules: {
		// product specific rules
		'no-else-return': 'error',
		'no-return-await': 'error',
		'no-lonely-if': 'error',
		'@typescript-eslint/no-shadow': 'error',
		'no-throw-literal': 'error',
		camelcase: 'off',
		'no-use-before-define': 'off',
		complexity: ['warn', 6],
		'no-var': 'error', // https://eslint.org/docs/rules/no-var
		'import/no-commonjs': 'error', // https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/no-commonjs.md
		'no-bitwise': 'error', // https://eslint.org/docs/rules/no-bitwise
		'import/no-duplicates': 'error', // https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/no-duplicates.md
		'function-paren-newline': ['error', 'consistent'], // https://eslint.org/docs/rules/function-paren-newline
		'no-warning-comments': ['warn', { location: 'anywhere' }],
		'no-undef': 'error', // https://eslint.org/docs/rules/no-undef
		// 'no-param-reassign': 'error',

		'@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_+' }], // https://github.com/bradzacher/eslint-plugin-typescript/blob/master/docs/rules/no-unused-vars.md

		'@typescript-eslint/camelcase': 'off', // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/camelcase.md
		'@typescript-eslint/no-explicit-any': 'off', // https://github.com/bradzacher/eslint-plugin-typescript/blob/master/docs/rules/no-explicit-any.md
		'@typescript-eslint/explicit-function-return-type': 'off', // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/explicit-function-return-type.md
		'@typescript-eslint/no-use-before-define': 'off', // https://github.com/bradzacher/eslint-plugin-typescript/blob/master/docs/rules/no-use-before-define.md,
		'@typescript-eslint/prefer-interface': 'off',
		'@typescript-eslint/no-empty-function': 'off',
		'@typescript-eslint/explicit-module-boundary-types': 'off',
		'consistent-return': 'warn',
		'@typescript-eslint/ban-types': 'warn',
		semi: 'never',
	},
	overrides: [
		{
			files: ['**/*.ts'],
			env: {},
			rules: {
				'no-useless-constructor': 'off',
			},
		},
		{
			files: ['**/*.d.ts'],
			env: {},
			rules: {
				'no-dupe-class-members': 'off',
			},
		},
		{
			files: ['scripts/**/*'],
			env: {},
			rules: {
				complexity: ['error', 10],
				'@typescript-eslint/no-var-requires': 'off',
			},
		},
		{
			files: ['test/**/*.js', '**/*.js'],
			env: {},
			rules: {
				'import/no-commonjs': 'off',
				'@typescript-eslint/no-var-requires': 'off',
			},
		},
		{
			files: ['src/**/*.test.ts', 'test/**/*.ts', 'src/**/*.test.js'],
			env: {
				mocha: true,
			},
			rules: {
				'import/no-commonjs': 'off',
				'no-unused-expressions': 'off',
				'@typescript-eslint/no-var-requires': 'off',
			},
		},
	],
}
