#!/bin/env tsx
import * as path from 'forward-slash-path'

import fs from 'fs-extra'
import listRules from 'lib/listRules.js'
import makeHtml from 'lib/makeHtml.js'

const rulesFile = path.join(`dist`, `build`, `react`, `index.json`)
const groupedRules = await listRules(rulesFile, `getCurrentRules`)
const {html, markdown} = makeHtml(`Active rules`, groupedRules)
await Promise.all([
  fs.writeFile(path.join(`dist`, `page`, `active.html`), html),
  fs.writeFile(path.join(`dist`, `page`, `active.md`), markdown),
])
