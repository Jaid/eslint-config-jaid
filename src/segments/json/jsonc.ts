import type {Linter} from 'eslint'
import jsonPlugin from 'eslint-plugin-jsonc'
import parser from 'jsonc-eslint-parser'

import ignores from 'src/ignores.js'
import jsonConfig from 'src/segments/json/json.js'

const config: Linter.FlatConfig = {
  plugins: {
    // @ts-expect-error TS2322
    json: jsonPlugin
  },
  ignores,
  files: [`**/*.jsonc`],
  languageOptions: {
    parser,
    parserOptions: {
      jsonSyntax: `JSONC`
    }
  },
  name: `eslint-config-jaid/jsonc`,
  rules: jsonConfig.rules
}

export default config
