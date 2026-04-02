import type {Linter} from 'eslint'

import jsonPlugin from 'eslint-plugin-jsonc'
import * as parser from 'jsonc-eslint-parser'

import ignores from '../../ignores.ts'
import jsoncConfig from './jsonc.ts'

const config: Linter.Config = {
  plugins: {
    json: jsonPlugin,
  },
  ignores,
  files: ['**/*.json5'],
  languageOptions: {
    parser,
  },
  name: 'eslint-config-jaid/json5',
  rules: jsoncConfig.rules,
}

export default config
