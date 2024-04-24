// BLOCKEDBY: https://github.com/typescript-eslint/typescript-eslint/issues/8211 - Can’t upgrade to ESLint 9 until this is fixed

import jsonConfig from 'src/segments/json/json.js'
import json5Config from 'src/segments/json/json5.js'
import jsoncConfig from 'src/segments/json/jsonc.js'
import packageJsonConfig from 'src/segments/json/packageJson.js'
import typescriptConfig from 'src/segments/typescript/typescript.js'
import yamlConfig from 'src/segments/yaml/yaml.js'

export default [
  jsonConfig,
  jsoncConfig,
  json5Config,
  packageJsonConfig,
  yamlConfig,
  typescriptConfig,
]
