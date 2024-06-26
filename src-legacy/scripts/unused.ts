#!/bin/env tsx
import * as path from 'forward-slash-path'

import listRules from 'lib/listRules.js'

const rulesFile = path.join(`dist`, `build`, `react`, `index.json`)
const groupedRules = await listRules(rulesFile, `getUnusedRules`)
for (const [plugin, ruleList] of Object.entries(groupedRules)) {
  console.log(`\n${plugin}:`)
  for (const rule of ruleList) {
    console.log(`- ${rule.id}`)
  }
}
