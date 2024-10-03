import type {Linter} from 'eslint'

import jsonPlugin from 'eslint-plugin-jsonc'
import parser from 'jsonc-eslint-parser'

import {extendIgnores} from 'src/ignores.js'

const config: Linter.FlatConfig = {
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
  rules: {
    'json/auto': 'warn',
    'json/no-plus-sign': 'warn',
    'json/valid-json-number': 'error',
  },
}

export default config
