const eslintPluginPrettierRecommended = require('eslint-plugin-prettier/recommended');
const prettierConfig = require('./prettier.config.js');

module.exports = [
    // Any other config imports go at the top
    eslintPluginPrettierRecommended,
    {
        rules: {
            'prettier/prettier': ['error', prettierConfig],
        },
    },
];
