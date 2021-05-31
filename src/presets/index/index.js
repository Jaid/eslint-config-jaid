export default {
  publishimoConfig: {
    name: "eslint-config-jaid",
    fetchGithub: true,
  },
  includedDependencies: [
    "@babel/eslint-parser",
    "eslint-plugin-optimize-regex",
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
    "regex",
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
      ecmaVersion: 10,
      sourceType: "module",
      requireConfigFile: false,
      ecmaFeatures: {
        legacyDecorators: true,
      },
    },
    plugins: [
      "node",
      "promise",
      "optimize-regex",
      "unicorn",
      "import",
      "simple-import-sort",
    ],
    globals: {
      require: "readonly",
      GOOGLE_ANALYTICS_TRACKING_ID: "readonly",
      __non_webpack_require__: "readonly",
    },
    env: {
      es6: true,
      "shared-node-browser": true,
      node: true,
      jest: true,
    },
  },
}