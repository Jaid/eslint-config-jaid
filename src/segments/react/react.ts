import type {ESLint, Linter} from 'eslint'

import eslintReactPlugin from '@eslint-react/eslint-plugin'
import stylisticPlugin from '@stylistic/eslint-plugin'
import parser from '@typescript-eslint/parser'
import reactHooksPlugin from 'eslint-plugin-react-hooks'

import ignores from '../../ignores.ts'
import {unpackConfigSet} from '../../lib/unpackRuleset.ts'
import {eslintReactRules} from './rules/eslintReact.ts'
import {reactHooksRules} from './rules/reactHooks.ts'
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
    react: eslintReactPlugin as ESLint.Plugin,
    'react-hooks': reactHooksPlugin as unknown as ESLint.Plugin,
    stylistic: stylisticPlugin as ESLint.Plugin,
  },
  rules: unpackConfigSet({
    eslintReact: eslintReactRules(),
    reactHooks: reactHooksRules(),
    stylistic: reactStylisticRules(),
  }),
}

export default config
