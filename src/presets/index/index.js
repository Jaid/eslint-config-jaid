export default {
  pkg: {
    name: "eslint-config-jaid",
    description: "Personal ESLint preset. Intentionally ugly to write code that looks like I feel.",
    keywords: [
      "eslint-preset",
      "eslint",
      "format",
      "formatting",
      "lint",
      "style-guide",
      "style",
      "jaid",
      "promise",
      "import",
      "unicorn"
    ]
  },
  includedDependencies: [
    "babel-eslint",
    "eslint-plugin-optimize-regex",
    "eslint-plugin-promise",
    "eslint-plugin-unicorn",
    "eslint-plugin-import"
  ],
  rules: [
    "es",
    "style",
    "promise",
    "regex",
    "unicorn",
    "import"
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
      "unicorn"
      "import"
    ]
  }
}