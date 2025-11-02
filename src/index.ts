import * as lodash from 'lodash-es'

import ignores from 'src/ignores.ts'
import json5Config from 'src/segments/json/json5.js'
import jsonConfig from 'src/segments/json/json.js'
import jsoncConfig from 'src/segments/json/jsonc.js'
import launchJsonConfig from 'src/segments/json/launchJson.js'
import packageJsonConfig from 'src/segments/json/packageJson.js'
import typescriptConfig from 'src/segments/typescript/typescript.js'
import yamlConfig from 'src/segments/yaml/yaml.js'

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
