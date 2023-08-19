#!/bin/env tsx
import path from 'node:path'

import fs from 'fs-extra'

import listRules from 'src/lib/listRules.ts'
import makeHtml from 'src/lib/makeHtml.ts'

const rulesFile = path.join(`dist`, `build`, `react`, `index.json`)
const groupedRules = await listRules(rulesFile, `getUnusedRules`)
const {html, markdown} = makeHtml(`Unused rules`, groupedRules)
await Promise.all([
  fs.writeFile(path.join(`dist`, `page`, `unused.html`), html),
  fs.writeFile(path.join(`dist`, `page`, `unused.md`), markdown),
])
