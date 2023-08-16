#!/bin/env tsx
import path from 'node:path'

import eslintFindRules from 'eslint-find-rules'
import execa from 'execa'
import * as lodash from 'lodash-es'

type RuleFinderFunction = `getCurrentRules` | `getDeprecatedRules` | `getUnusedRules`

type Rule = {
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
