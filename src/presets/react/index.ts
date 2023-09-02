import {Immer} from 'immer'

import setup from '../index/index.js'

const immer = new Immer
immer.setAutoFreeze(false)
export default immer.produce(setup, draft => {
  draft.config.env.browser = true
  draft.config.env.worker = true
  draft.config.overrides.push({
    files: [`*.jsx`, `*.tsx`],
  })
  draft.config.parserOptions.ecmaFeatures = {
    jsx: true,
  }
  draft.config.plugins.push(`react`)
  draft.config.settings.react = {
    version: `detect`,
  }
  draft.includedDependencies.push(`eslint-plugin-react`)
  draft.rules.push(`jsx`, `react`, `react-jsx`, `unicorn-web`)
  draft.publishimoConfig = {
    name: `${setup.publishimoConfig.name}-react`,
    description: `Personal ESLint preset for React/JSX. Intentionally ugly to write code that looks like I feel.`,
    repository: `https://github.com/Jaid/eslint-config-jaid`,
  }
})
