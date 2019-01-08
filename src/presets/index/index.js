export const pkg = {
  name: "eslint-config-jaid",
  description: "Personal ESLint preset. Intentionally ugly to write code that looks like I feel.",
  keywords: [
    "eslint-preset",
    "eslint",
    "format",
    "formatting",
    "lint",
    "style-guide",
    "style"
  ],
  scripts: {
    release: "npm publish"
  }
}

export const includedDependencies = [
  "babel-eslint",
  "eslint-plugin-optimize-regex",
  "eslint-plugin-promise"
]

export const rules = [
  "es",
  "style",
  "promise",
  "regex"
]

export default {
  parser: "babel-eslint",
  parserOptions: {
    ecmaVersion: 10,
    sourceType: "module"
  },
  plugins: ["promise", "optimize-regex"]
}