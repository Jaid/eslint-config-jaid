import type {Linter} from 'eslint'

import jsonPlugin from 'eslint-plugin-jsonc'
import * as parser from 'jsonc-eslint-parser'

import {extendIgnores} from '../../ignores.ts'
import {unpackRuleset} from '../../lib/unpackRuleset.ts'
import {jsonRules} from './rules/json.ts'

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
