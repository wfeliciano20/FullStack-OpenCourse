/* eslint-disable indent */
module.exports = {
	env: {
		browser: true,
		commonjs: true,
		es2021: true,
		jest: true,
		'cypress/globals': true,
	},
	extends: ['eslint:recommended', 'plugin:prettier/recommended'],
	parserOptions: {
		ecmaVersion: 'latest',
		sourceType: 'module',
		ecmaFeatures: {
			jsx: true,
		},
	},
	rules: {
		indent: ['error', 'tab'],
		'linebreak-style': ['error', 'unix'],
		quotes: ['error', 'single'],
		semi: ['error', 'always'],
	},
	plugins: ['prettier', 'cypress'],
};
