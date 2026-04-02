import type {Linter} from 'eslint'

import jsonPlugin from 'eslint-plugin-jsonc'
import * as parser from 'jsonc-eslint-parser'

import ignores from '../../ignores.ts'
import jsonConfig from './json.ts'

const config: Linter.Config = {
  plugins: {
    json: jsonPlugin,
  },
  ignores,
  files: ['**/*.jsonc'],
  languageOptions: {
    parser,
    parserOptions: {
      jsonSyntax: 'JSONC',
    },
  },
  name: 'eslint-config-jaid/jsonc',
  rules: jsonConfig.rules,
}

export default config
