import type {ParserOptions} from '@typescript-eslint/parser'
import type {ESLint, Linter} from 'eslint'

import stylisticPlugin from '@stylistic/eslint-plugin'
import typescriptPlugin from '@typescript-eslint/eslint-plugin'
import parser from '@typescript-eslint/parser'
import {createTypeScriptImportResolver} from 'eslint-import-resolver-typescript'
import esPlugin from 'eslint-plugin-es-x'
import importQuotesPlugin from 'eslint-plugin-import-quotes'
import importPlugin, {createNodeResolver} from 'eslint-plugin-import-x'
import nodePlugin from 'eslint-plugin-n'
import perfectionistPlugin from 'eslint-plugin-perfectionist'
import promisePlugin from 'eslint-plugin-promise'
import regexPlugin from 'eslint-plugin-regexp'
import unicornPlugin from 'eslint-plugin-unicorn'

import {unpackConfigSet} from 'lib/unpackRuleset.ts'
import ignores from 'src/ignores.ts'

import {esRules} from './rules/es.ts'
import {eslintRules} from './rules/eslint.ts'
import {importRules} from './rules/import.ts'
import {importQuotesRules} from './rules/importQuotes.ts'
import {nodeRules} from './rules/node.ts'
import {perfectionistRules} from './rules/perfectionist.ts'
import {promiseRules} from './rules/promise.ts'
import {regexRules} from './rules/regex.ts'
import {stylisticRules} from './rules/stylistic.ts'
import {typescriptRules} from './rules/typescript.ts'
import {unicornRules} from './rules/unicorn.ts'

const config: Linter.Config = {
  plugins: {
    typescript: typescriptPlugin as unknown as ESLint.Plugin,
    stylistic: stylisticPlugin as ESLint.Plugin,
    node: nodePlugin,
    promise: promisePlugin as ESLint.Plugin,
    es: esPlugin as ESLint.Plugin,
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
  ],
  languageOptions: {
    parser,
    parserOptions: {
      projectService: {
        maximumDefaultProjectFileMatchCount_THIS_WILL_SLOW_DOWN_LINTING: Infinity,
        defaultProject: './tsconfig.tson',
      },
    } as Linter.ParserOptions & ParserOptions,
  },
  name: 'eslint-config-jaid/typescript',
  rules: unpackConfigSet({
    eslint: eslintRules(),
    typescript: typescriptRules(),
    stylistic: stylisticRules(),
    node: nodeRules(),
    promise: promiseRules(),
    es: esRules(),
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
