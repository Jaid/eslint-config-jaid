export const pkg = {
  name: "eslint-config-jaid-react",
  description: "Personal ESLint preset for React/JSX. Intentionally ugly to write code that looks like I feel.",
  keywords: [
    "eslint-preset",
    "eslint",
    "format",
    "formatting",
    "lint",
    "style-guide",
    "style",
    "react",
    "jsx",
    "jaid"
  ]
}

export const includedDependencies = [
  "babel-eslint",
  "eslint-plugin-optimize-regex",
  "eslint-plugin-promise",
  "eslint-plugin-react"
]

export const rules = [
  "es",
  "style",
  "promise",
  "regex",
  "jsx",
  "react"
]

export default {
  parser: "babel-eslint",
  parserOptions: {
    ecmaVersion: 10,
    sourceType: "module"
  },
  plugins: [
    "promise",
    "optimize-regex",
    "react"
  ],
  settings: {
    react: {
      version: "detect"
    }
  }
}