import type {ESLint, Linter} from 'eslint'

import stylisticPlugin from '@stylistic/eslint-plugin'
import typescriptPlugin from '@typescript-eslint/eslint-plugin'
import parser, {type ParserOptions} from '@typescript-eslint/parser'
import {createTypeScriptImportResolver} from 'eslint-import-resolver-typescript'
import importQuotesPlugin from 'eslint-plugin-import-quotes'
import importPlugin, {createNodeResolver} from 'eslint-plugin-import-x'
import nodePlugin from 'eslint-plugin-n'
import perfectionistPlugin from 'eslint-plugin-perfectionist'
import promisePlugin from 'eslint-plugin-promise'
import regexPlugin from 'eslint-plugin-regexp'
import unicornPlugin from 'eslint-plugin-unicorn'

import ignores from 'src/ignores.js'

import {eslintRules} from './rules/eslint.js'
import {importRules} from './rules/import.js'
import {importQuotesRules} from './rules/importQuotes.js'
import {nodeRules} from './rules/node.js'
import {perfectionistRules} from './rules/perfectionist.js'
import {promiseRules} from './rules/promise.js'
import {regexRules} from './rules/regex.js'
import {stylisticRules} from './rules/stylistic.js'
import {typescriptRules} from './rules/typescript.js'
import {unicornRules} from './rules/unicorn.js'

const compileRules = (rulesMap: Record<string, Linter.Config['rules']>) => {
  const result: Linter.Config['rules'] = {}
  for (const [pluginName, rules] of Object.entries(rulesMap)) {
    if (!rules)
      continue
    for (const [ruleName, ruleValue] of Object.entries(rules)) {
      const key = pluginName === 'eslint' ? ruleName : `${pluginName}/${ruleName}`
      result[key] = ruleValue
    }
  }
  return result
}
const config: Linter.Config = {
  plugins: {
    typescript: typescriptPlugin as unknown as ESLint.Plugin,
    stylistic: stylisticPlugin as ESLint.Plugin,
    node: nodePlugin,
    promise: promisePlugin as ESLint.Plugin,
    unicorn: unicornPlugin as ESLint.Plugin,
    // @ts-expect-error ts(2352)
    import: importPlugin as ESLint.Plugin,
    importQuotes: importQuotesPlugin as ESLint.Plugin,
    regex: regexPlugin as ESLint.Plugin,
    perfectionist: perfectionistPlugin as ESLint.Plugin,
  },
  ignores,
  files: [
    '**/*.ts',
    '**/*.tsx',
    '**/*.mts',
    '**/*.mtsx',
    '**/*.cts',
    '**/*.ctsx',
  ],
  languageOptions: {
    parser,
    parserOptions: {
      projectService: {
        maximumDefaultProjectFileMatchCount_THIS_WILL_SLOW_DOWN_LINTING: Infinity,
        defaultProject: './tsconfig.json',
      },
    } as Linter.ParserOptions & ParserOptions,
  },
  name: 'eslint-config-jaid/typescript',
  rules: compileRules({
    eslint: eslintRules(),
    typescript: typescriptRules(),
    stylistic: stylisticRules(),
    node: nodeRules(),
    promise: promiseRules(),
    unicorn: unicornRules(),
    import: importRules(),
    importQuotes: importQuotesRules(),
    regex: regexRules(),
    perfectionist: perfectionistRules(),
  }),
  settings: {
    'import-x/resolver-next': [
      createTypeScriptImportResolver(),
      createNodeResolver(),
    ],
  },
}

export default config
