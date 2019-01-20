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
    },
    plugins: [
      "promise",
      "optimize-regex",
      "unicorn",
      "import",
    ],
  },
}