import type {ESLint, Linter} from 'eslint'

import stylisticPlugin from '@stylistic/eslint-plugin'
import parser from '@typescript-eslint/parser'
import reactPlugin from 'eslint-plugin-react'
import reactHooksPlugin from 'eslint-plugin-react-hooks'

import ignores from '../../ignores.ts'
import {unpackConfigSet} from '../../lib/unpackRuleset.ts'
import {reactHooksRules} from './rules/reactHooks.ts'
import {reactRules} from './rules/react.ts'
import {reactStylisticRules} from './rules/stylistic.ts'

const config: Linter.Config = {
  files: [
    '**/*.jsx',
    '**/*.mjsx',
    '**/*.mtsx',
    '**/*.tsx',
  ],
  ignores,
  languageOptions: {
    parser,
    parserOptions: {
      ecmaFeatures: {
        jsx: true,
      },
    },
  },
  name: 'eslint-config-jaid/react',
  plugins: {
    react: reactPlugin as unknown as ESLint.Plugin,
    'react-hooks': reactHooksPlugin as unknown as ESLint.Plugin,
    stylistic: stylisticPlugin as ESLint.Plugin,
  },
  rules: unpackConfigSet({
    react: reactRules(),
    reactHooks: reactHooksRules(),
    stylistic: reactStylisticRules(),
  }),
  settings: {
    react: {
      version: 'detect',
    },
  },
}

export default config
