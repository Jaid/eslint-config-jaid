import type {Linter} from 'eslint'
import type {Arrayable} from 'type-fest'

import * as lodash from 'lodash-es'

export type Ruleset<RulesGeneric = unknown> = {
  error?: Dict<Arrayable<unknown>>
  id: string
  warn?: Dict<Arrayable<unknown>>
}

export const unpackRuleset = <RulesGeneric = unknown>(ruleset: Ruleset<RulesGeneric>): Linter.Config<RulesGeneric>['rules'] => {
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
}
