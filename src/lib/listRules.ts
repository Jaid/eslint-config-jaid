#!/bin/env tsx
import eslintFindRules from 'eslint-find-rules'
import * as lodash from 'lodash-es'

export type RuleFinderFunction = `getCurrentRules` | `getDeprecatedRules` | `getUnusedRules`

export interface Rule {
  id: string
  fullId: string
  plugin?: string
}

export default async (eslintConfigFile: string, ruleFinderFunction: RuleFinderFunction) => {
  const ruleFinder = await eslintFindRules(eslintConfigFile)
  const unusedRules: string[] = ruleFinder[ruleFinderFunction]().filter(ruleId => {
    return ruleId.split(`/`).length <= 2
  })
  const rules: Rule[] = unusedRules.map(ruleId => {
    const parts = ruleId.split(`/`)
    if (parts.length === 1) {
      return {
        id: ruleId,
        fullId: ruleId,
        plugin: `eslint`,
      }
    }
    return {
      id: parts[1],
      fullId: ruleId,
      plugin: parts[0],
    }
  })
  const groupedRules = lodash.groupBy(rules, `plugin`)
  return groupedRules
}
