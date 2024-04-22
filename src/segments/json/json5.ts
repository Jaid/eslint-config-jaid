import jsonPlugin from 'eslint-plugin-jsonc'
import parser from 'jsonc-eslint-parser'

import ignores from 'src/ignores.js'
import jsoncConfig from 'src/segments/json/jsonc.js'

type FlatConfig = import(`eslint`).Linter.FlatConfig

const config: FlatConfig = {
  plugins: {
    // @ts-expect-error TS2322
    json: jsonPlugin
  },
  ignores,
  files: [`**/*.json5`],
  languageOptions: {
    parser
  },
  name: `eslint-config-jaid/json5`,
  rules: jsoncConfig.rules
}

export default config
