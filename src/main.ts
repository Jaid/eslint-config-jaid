import type {Linter} from 'eslint'

import ignores from './ignores.ts'
import json5Config from './segments/json/json5.ts'
import jsonConfig from './segments/json/json.ts'
import jsoncConfig from './segments/json/jsonc.ts'
import launchJsonConfig from './segments/json/launchJson.ts'
import packageJsonConfig from './segments/json/packageJson.ts'
import reactConfig from './segments/react/react.ts'
import typescriptConfig from './segments/typescript/typescript.ts'
import yamlConfig from './segments/yaml/yaml.ts'

export type EslintConfigSegment = 'json' | 'react' | 'typescript' | 'yaml'
export type MakeEslintConfigOptions = {
  excludeRules?: Array<string>
  excludeSegments?: Array<EslintConfigSegment>
}

const segmentGroups = [
  {
    id: 'json',
    configs: [
      jsonConfig,
      jsoncConfig,
      json5Config,
      packageJsonConfig,
      launchJsonConfig,
    ],
  },
  {
    id: 'yaml',
    configs: [yamlConfig],
  },
  {
    id: 'react',
    configs: [reactConfig],
  },
  {
    id: 'typescript',
    configs: [typescriptConfig],
  },
] as const satisfies ReadonlyArray<{
  configs: ReadonlyArray<Linter.Config>
  id: EslintConfigSegment
}>
const ignoredPaths = new Set(ignores)

export {jsonConfig}
export {json5Config}
export {jsoncConfig}
export {packageJsonConfig}
export {launchJsonConfig}
export {reactConfig}
export {typescriptConfig}
export {yamlConfig}

const getRuleName = (ruleId: string) => {
  return ruleId.slice(ruleId.lastIndexOf('/') + 1)
}

export const makeEslintConfig = (options: MakeEslintConfigOptions = {}): Array<Linter.Config> => {
  const excludedSegments = new Set(options.excludeSegments)
  const excludedRuleIds = new Set(options.excludeRules?.filter(ruleId => ruleId.includes('/')))
  const excludedRuleNames = new Set(options.excludeRules?.filter(ruleId => !ruleId.includes('/')))
  const segments = segmentGroups.flatMap(group => {
    if (excludedSegments.has(group.id)) {
      return []
    }
    return group.configs.map(segment => {
      const result: Linter.Config = {
        ...segment,
      }
      if (segment.ignores) {
        result.ignores = segment.ignores.filter(ignore => !ignoredPaths.has(ignore))
      }
      if (segment.rules) {
        result.rules = Object.fromEntries(Object.entries(segment.rules).filter(([ruleId]) => {
          return !excludedRuleIds.has(ruleId) && !excludedRuleNames.has(getRuleName(ruleId))
        }))
      }
      return result
    })
  })
  return [
    {
      ignores,
    },
    ...segments,
  ]
}

const config: Array<Linter.Config> = makeEslintConfig()
export default config
