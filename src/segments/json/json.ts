import type {Linter} from 'eslint'

import jsonPlugin from 'eslint-plugin-jsonc'
import parser from 'jsonc-eslint-parser'

import {extendIgnores} from 'src/ignores.js'

import {jsonRules} from './rules/json.js'

const config: Linter.Config = {
  plugins: {
    // @ts-expect-error TS2322
    json: jsonPlugin,
  },
  ignores: extendIgnores('package-lock.json', 'package.json'),
  files: ['**/*.json'],
  languageOptions: {
    parser,
    parserOptions: {
      jsonSyntax: 'JSON',
    },
  },
  name: 'eslint-config-jaid/json',
  rules: jsonRules(),
}

export default config
