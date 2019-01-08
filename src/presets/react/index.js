import base from "../index"

export default {
  pkg: {
    name: `${base.pkg.name}-react`,
    description: "Personal ESLint preset for React/JSX. Intentionally ugly to write code that looks like I feel.",
    keywords: [
      ...base.pkg.keywords,
      "react",
      "jsx"
    ]
  },
  includedDependencies: [
    ...base.includedDependencies,
    "eslint-plugin-react"
  ],
  rules: [
    ...base.rules,
    "jsx",
    "react"
  ],
  config: {
    parser: base.parser,
    parserOptions: base.parserOptions,
    plugins: [
      ...base.config.plugins,
      "react",
    ],
    settings: {
      react: {
        version: "detect"
      }
    }
  }
}