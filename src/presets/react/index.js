import base from "../index"

export default {
  publishimoConfig: {
    name: `${base.publishimoConfig.name}-react`,
    fetchGithub: base.publishimoConfig.fetchGithub,
    repository: "https://github.com/Jaid/eslint-config-jaid",
    description: "Personal ESLint preset for React/JSX. Intentionally ugly to write code that looks like I feel.",
  },
  includedDependencies: [
    ...base.includedDependencies,
    "eslint-plugin-react",
  ],
  rules: [
    ...base.rules,
    "jsx",
    "react",
    "unicorn-web",
  ],
  extend: base.extend,
  config: {
    parser: base.config.parser,
    parserOptions: base.config.parserOptions,
    plugins: [
      ...base.config.plugins,
      "react",
    ],
    settings: {
      react: {
        version: "detect",
      },
    },
    globals: base.config.globals,
    env: {
      ...base.config.env,
      browser: true,
      worker: true,
    },
  },
}