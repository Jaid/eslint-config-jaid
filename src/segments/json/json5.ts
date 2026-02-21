import type {Linter} from 'eslint'

import jsonPlugin from 'eslint-plugin-jsonc'
import * as parser from 'jsonc-eslint-parser'

import ignores from 'src/ignores.js'
import jsoncConfig from 'src/segments/json/jsonc.js'

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
