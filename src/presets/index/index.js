export default {
  publishimoConfig: {
    name: "eslint-config-jaid",
    fetchGithub: true,
  },
  includedDependencies: [
    "@babel/eslint-parser",
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
    parser: "@babel/eslint-parser",
    parserOptions: {
      sourceType: "module",
      requireConfigFile: false,
      ecmaFeatures: {
        legacyDecorators: true,
      },
    },
    plugins: [
      "node",
      "promise",
      "unicorn",
      "import",
      "simple-import-sort",
    ],
    globals: {
      GOOGLE_ANALYTICS_TRACKING_ID: "readonly",
      __non_webpack_require__: "readonly",
    },
    env: {
      es2021: true,
      "shared-node-browser": true,
      node: true,
    },
  },
}