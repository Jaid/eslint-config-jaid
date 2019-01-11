export default {
  pkg: {
    name: "eslint-config-jaid",
    description: "Personal ESLint preset. Intentionally ugly to write code that looks like I feel.",
    keywords: [
      "eslint-preset",
      "eslint",
      "eslint-config",
      "format",
      "formatting",
      "lint",
      "style-guide",
      "style",
      "jaid",
      "promise",
      "import",
      "unicorn",
      "lodash",
      "no-lodash",
      "underscore"
    ]
  },
  includedDependencies: [
    "babel-eslint",
    "eslint-plugin-optimize-regex",
    "eslint-plugin-promise",
    "eslint-plugin-unicorn",
    "eslint-plugin-import",
    "eslint-plugin-you-dont-need-lodash-underscore"
  ],
  rules: [
    "es",
    "style",
    "promise",
    "regex",
    "unicorn",
    "import"
  ],
  extend: [
    "plugin:you-dont-need-lodash-underscore/all-warn"
  ],
  config: {
    parser: "babel-eslint",
    parserOptions: {
      ecmaVersion: 10,
      sourceType: "module"
    },
    plugins: [
      "promise",
      "optimize-regex",
      "unicorn",
      "import"
    ]
  }
}