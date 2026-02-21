import type {Linter} from 'eslint'

import jsonPlugin from 'eslint-plugin-jsonc'
import * as parser from 'jsonc-eslint-parser'

import {unpackRuleset} from 'lib/unpackRuleset.ts'
import {extendIgnores} from 'src/ignores.js'

import {jsonRules} from './rules/json.js'

const config: Linter.Config = {
  plugins: {
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
  rules: unpackRuleset(jsonRules()),
}

export default config
