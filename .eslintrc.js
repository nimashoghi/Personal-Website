module.exports = {
    globals: {
        __PATH_PREFIX__: true,
    },
    parser: "@typescript-eslint/parser",
    parserOptions: {
        project: "./tsconfig.json",
    },
    extends: [
        "eslint:recommended",
        "plugin:@typescript-eslint/eslint-recommended",
        "plugin:@typescript-eslint/recommended",
        "plugin:@typescript-eslint/recommended-requiring-type-checking",
        "react-app",
        "plugin:prettier/recommended",
    ],
    rules: {
        "@typescript-eslint/no-angle-bracket-type-assertion": 0,
        "@typescript-eslint/explicit-function-return-type": 0,
    },
}
