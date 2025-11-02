import type {Linter} from 'eslint'
import type {Arrayable} from 'type-fest'

import * as lodash from 'lodash-es'

export type Ruleset<RulesGeneric = unknown> = {
  error?: Dict<Arrayable<unknown>>
  id: string
  warn?: Dict<Arrayable<unknown>>
}

export const unpackRuleset = (ruleset: Ruleset): Linter.Config['rules'] => {
  const resolveRuleId = (internalId: string) => {
    if (internalId.includes('/')) {
      const [pluginName, ruleName] = internalId.split('/')
      const kebabName = lodash.kebabCase(ruleName)
      return `${pluginName}/${kebabName}`
    }
    const kebabName = lodash.kebabCase(internalId)
    if (ruleset.id === 'eslint') {
      return kebabName
    }
    return `${ruleset.id}/${kebabName}`
  }
  const result: Linter.Config['rules'] = {}
  for (const [severity, rules] of [['warn', ruleset.warn], ['error', ruleset.error]] as const) {
    if (!rules) {
      continue
    }
    for (const [internalId, value] of Object.entries(rules)) {
      const ruleId = resolveRuleId(internalId)
      if (Array.isArray(value)) {
        result[ruleId] = [severity, ...(value as Array<unknown>)]
      } else {
        result[ruleId] = [severity, value]
      }
    }
  }
  return result
}

export const unpackConfigSet = (rulesets: Record<string, Ruleset>): Linter.Config['rules'] => {
  const result: Linter.Config['rules'] = {}
  for (const ruleset of Object.values(rulesets)) {
    Object.assign(result, unpackRuleset(ruleset))
  }
  return result
}
