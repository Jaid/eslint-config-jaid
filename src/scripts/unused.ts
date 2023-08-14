#!/bin/env tsx
import execa from 'execa'
import path from 'path'
import eslintFindRules from 'eslint-find-rules'
import * as lodash from 'lodash-es'
import {firstMatch} from 'super-regex'

await execa('npm', ['run', 'build'])
const rulesFile = path.join('dist', 'build', 'react', 'index.json')
const ruleFinder = await eslintFindRules(rulesFile)
const unusedRules: string[] = ruleFinder.getUnusedRules().filter(ruleId => {
  return ruleId.split('/').length <= 2
})
interface Rule {
  id: string
  plugin?: string
}
const rules: Rule[] = unusedRules.map(ruleId => {
  const parts = ruleId.split('/')
  if (parts.length === 1) {
    return {
      id: ruleId,
      plugin: 'eslint'
    }
  }
  return {
    id: parts[1],
    plugin: parts[0]
  }
})
const groupedRules = lodash.groupBy(rules, "plugin")
for (const [plugin, ruleList] of Object.entries(groupedRules)) {
  console.log(`\n${plugin}:`)
  for (const rule of ruleList) {
    console.log(`- ${rule.id}`)
  }
}
