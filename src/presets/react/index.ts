import base from '../index/index.ts'

export default {
  config: {
    env: {
      ...base.config.env,
      browser: true,
      worker: true,
    },
    globals: base.config.globals,
    overrides: base.config.overrides,
    parser: base.config.parser,
    parserOptions: {
      ...base.config.parserOptions,
      ecmaFeatures: {
        jsx: true,
      },
    },
    plugins: [
      ...base.config.plugins,
      `react`,
    ],
    settings: {
      ...base.config.settings,
      react: {
        version: `detect`,
      },
    },
  },
  extend: base.extend,
  includedDependencies: [
    ...base.includedDependencies,
    `eslint-plugin-react`,
  ],
  publishimoConfig: {
    name: `${base.publishimoConfig.name}-react`,
    description: `Personal ESLint preset for React/JSX. Intentionally ugly to write code that looks like I feel.`,
    repository: `https://github.com/Jaid/eslint-config-jaid`,
  },
  rules: [
    ...base.rules,
    `jsx`,
    `react`,
    `unicorn-web`,
  ],
}
