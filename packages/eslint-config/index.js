require("@rushstack/eslint-patch/modern-module-resolution");

module.exports = {
  parser: "@typescript-eslint/parser",
  settings: {
    "import/core-modules": [],
    "import/resolver": {
      typescript: {},
      node: {},
    },
  },
  extends: [
    "turbo",
    "eslint:recommended",
    "plugin:import/errors",
    "plugin:@typescript-eslint/recommended",
    "plugin:prettier/recommended",
  ],
  plugins: ["simple-import-sort"],
  parserOptions: {
    sourceType: "module",
    ecmaVersion: 2020,
  },
  rules: {
    // Turbo
    "turbo/no-undeclared-env-vars": "off",
    // Common
    "no-console": ["error", { allow: ["warn", "error", "info"] }],
    "import/no-unresolved": "off",
    "import/no-dynamic-require": "off",
    "import/prefer-default-export": "off",
    "import/no-named-as-default": "off",
    "import/no-extraneous-dependencies": "off",
    "import/extensions": "off",
    "arrow-body-style": [1, "as-needed"],
    // Using prettier
    indent: 0,
    "no-mixed-operators": [
      0,
      {
        allowSamePrecedence: 1,
      },
    ],
    "no-underscore-dangle": "off",
    "no-unused-vars": "off",
    // Import
    "import/first": "error",
    "import/exports-last": "off",
    // TypeScript
    "@typescript-eslint/explicit-function-return-type": "off",
    "@typescript-eslint/explicit-module-boundary-types": "off",
    "@typescript-eslint/no-non-null-assertion": "off",
    "@typescript-eslint/no-empty-interface": "off",
    "@typescript-eslint/no-use-before-define": ["error"],
    "@typescript-eslint/ban-ts-comment": "off",
    "@typescript-eslint/no-unused-expressions": "off",
    "@typescript-eslint/ban-types": "off",
    "@typescript-eslint/no-wrapper-object-types": "off",
    "@typescript-eslint/no-unused-vars": [
      "error",
      {
        argsIgnorePattern: "^_",
        varsIgnorePattern: "^_",
        caughtErrorsIgnorePattern: "^_",
      },
    ],
    "@typescript-eslint/no-namespace": "off",
    "@typescript-eslint/no-explicit-any": "warn",
    "import/order": "off",
    "simple-import-sort/imports": [
      "error",
      {
        groups: [
          // `react` first, `next` second, then packages starting with a character
          ["^react$", "^next", "^[a-z@]"],
          // Aliased folders
          ["^@/"],
          // Imports starting with `../`
          ["^\\.\\.(?!/?$)", "^\\.\\./?$"],
          // Imports starting with `./`
          ["^\\./(?=.*/)(?!/?$)", "^\\.(?!/?$)", "^\\./?$"],
          // Style imports
          ["^.+\\.s?css$"],
          // Side effect imports
          ["^\\u0000"],
        ],
      },
    ],
  },
};
