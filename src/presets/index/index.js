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
    "eslint-plugin-you-dont-need-lodash-underscore",
  ],
  rules: [
    "es",
    "style",
    "promise",
    "regex",
    "unicorn",
    "import",
  ],
  extend: ["plugin:you-dont-need-lodash-underscore/all-warn"],
  config: {
    parser: "babel-eslint",
    parserOptions: {
      ecmaVersion: 10,
      sourceType: "module",
      requireConfigFile: false,
    },
    plugins: [
      "promise",
      "optimize-regex",
      "unicorn",
      "import",
    ],
    globals: {
      require: "readonly",
      _PKG_TITLE: "readonly",
      _PKG_NAME: "readonly",
      _PKG_VERSION: "readonly",
      _PKG_DOMAIN: "readonly",
      GOOGLE_ANALYTICS_TRACKING_ID: "readonly",
    },
    env: {
      node: true,
      jest: true,
    },
  },
}