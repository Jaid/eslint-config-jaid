import json5Config from 'src/segments/json/json5.js'
import jsonConfig from 'src/segments/json/json.js'
import jsoncConfig from 'src/segments/json/jsonc.js'
import packageJsonConfig from 'src/segments/json/packageJson.js'
import typescriptConfig from 'src/segments/typescript/typescript.js'
import yamlConfig from 'src/segments/yaml/yaml.js'

const allSegments = [
  jsonConfig,
  jsoncConfig,
  json5Config,
  packageJsonConfig,
  yamlConfig,
  typescriptConfig,
]

export {jsonConfig}
export {json5Config}
export {jsoncConfig}
export {packageJsonConfig}
export {typescriptConfig}
export {yamlConfig}

export const makeEslintConfig = () => {
  return [...allSegments]
}

export default allSegments
