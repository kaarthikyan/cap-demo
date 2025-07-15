// .eslintrc.js
module.exports = {
    root: true,
    extends: [
        'next/core-web-vitals',
        'plugin:prettier/recommended', // Show Prettier issues as ESLint issues
    ],
    rules: {
        indent: ['error', 2]
        // Add your custom rules if needed
    },
};
