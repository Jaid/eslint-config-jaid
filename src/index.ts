import * as lodash from 'lodash-es'

import ignores from './ignores.ts'
import json5Config from './segments/json/json5.ts'
import jsonConfig from './segments/json/json.ts'
import jsoncConfig from './segments/json/jsonc.ts'
import launchJsonConfig from './segments/json/launchJson.ts'
import packageJsonConfig from './segments/json/packageJson.ts'
import typescriptConfig from './segments/typescript/typescript.ts'
import yamlConfig from './segments/yaml/yaml.ts'

const allSegments = [
  jsonConfig,
  jsoncConfig,
  json5Config,
  packageJsonConfig,
  launchJsonConfig,
  yamlConfig,
  typescriptConfig,
]

export {jsonConfig}
export {json5Config}
export {jsoncConfig}
export {packageJsonConfig}
export {launchJsonConfig}
export {typescriptConfig}
export {yamlConfig}

export const makeEslintConfig = () => {
  return [
    {
      ignores,
    },
    ...Object.entries(allSegments).map(entry => {
      const [id, segment] = entry
      if (segment.ignores) {
        segment.ignores = lodash.difference(segment.ignores, ignores)
      }
      return segment
    }),
  ]
}

export default makeEslintConfig()
