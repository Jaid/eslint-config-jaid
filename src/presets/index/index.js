export default {
  publishimoConfig: {
    name: "eslint-config-jaid",
    fetchGithub: true,
  },
  includedDependencies: [
    "babel-eslint",
    "eslint-plugin-optimize-regex",
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
    "regex",
    "unicorn",
    "import",
    "simple-import-sort",
    "lodash",
  ],
  extend: ["plugin:you-dont-need-lodash-underscore/all-warn"],
  config: {
    parser: "babel-eslint",
    parserOptions: {
      ecmaVersion: 10,
      sourceType: "module",
      requireConfigFile: false,
      ecmaFeatures: {
        legacyDecorators: true,
      },
    },
    plugins: [
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