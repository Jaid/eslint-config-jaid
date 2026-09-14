import type {Dict} from 'more-types'

import fs from 'fs-extra'
import {parse} from 'yaml'

import {makeEslintConfig} from '../src/index.ts'

type SuppressionConfig = {
  aliases: Array<{from: string, to: string}>
  allFrom: Array<string>
  rawEntries: Array<string>
  rules: Dict<Array<string>>
}

const suppressionConfig = parse(await fs.readFile('etc/suppressed_in_error_lens.yml', 'utf8')) as SuppressionConfig
for (const alias of suppressionConfig.aliases) {
  suppressionConfig.rules[alias.to] = suppressionConfig.rules[alias.from]
}
for (const rule of Object.keys(suppressionConfig.rules)) {
  suppressionConfig.rules[rule] = suppressionConfig.rules[rule].map(entry => entry.replace(/\/\*$/, ''))
}
const result: Array<string> = []
for (const [pluginId, rules] of Object.entries(suppressionConfig.rules)) {
  for (const rule of rules) {
    result.push(`${pluginId}/${rule}`)
  }
}
const config = makeEslintConfig()
for (const rulesRecord of config) {
  for (const [ruleId, ruleConfig] of Object.entries(rulesRecord.rules ?? {})) {
    if (ruleConfig === 'off') {
      continue
    }
    const [pluginId] = ruleId.split('/')
    if (!suppressionConfig.allFrom.includes(pluginId)) {
      continue
    }
    result.push(ruleId)
  }
}
const resultWithParensSyntax = result.map(entry => `eslint(${entry})`)
resultWithParensSyntax.push(...suppressionConfig.rawEntries)
const resultCleaned = [...new Set(resultWithParensSyntax)].toSorted()
const vscodeConfig = {
  'errorLens.excludeBySource': resultCleaned,
}
console.log(JSON.stringify(vscodeConfig, null, 2))
