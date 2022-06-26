export default {
  publishimoConfig: {
    name: "eslint-config-jaid",
    fetchGithub: true,
  },
  includedDependencies: [
    "@typescript-eslint/parser",
    "@typescript-eslint/eslint-plugin",
    "eslint-plugin-node",
    "eslint-plugin-promise",
    "eslint-plugin-unicorn",
    "eslint-plugin-import",
    "eslint-plugin-simple-import-sort",
    "eslint-plugin-you-dont-need-lodash-underscore",
  ],
  rules: [
    "es",
    "style",
    "promise",
    "node",
    "unicorn",
    "unicorn-node",
    "import",
    "simple-import-sort",
    "lodash",
  ],
  extend: ["plugin:you-dont-need-lodash-underscore/all-warn"],
  config: {
    parser: "@typescript-eslint/parser",
    parserOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
    },
    plugins: [
      "node",
      "promise",
      "unicorn",
      "import",
      "simple-import-sort",
      "@typescript-eslint"
    ],
    globals: {
      GOOGLE_ANALYTICS_TRACKING_ID: "readonly",
      __non_webpack_require__: "readonly",
      it: "readonly", // HACK Needed until resolved: https://github.com/nicolo-ribaudo/jest-light-runner/issues/42
      afterAll: "readonly", // HACK Needed until resolved: https://github.com/nicolo-ribaudo/jest-light-runner/issues/42
      expect: "readonly", // HACK Needed until resolved: https://github.com/nicolo-ribaudo/jest-light-runner/issues/42
    },
    env: {
      es2022: true,
      node: true,
      "shared-node-browser": true,
    },
  },
}