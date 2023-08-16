#!/bin/env tsx
import path from 'node:path'

import fs from 'fs-extra'
import Handlebars from 'handlebars'
import showdown from 'showdown'

import getLinkToRule from 'src/lib/getLinkToRule.ts'
import listRules from 'src/lib/listRules.ts'

const markdownTemplate = `
# Current rules
{{#each currentRules}}
## {{@key}}

|i  |Rule|
|-  |-   |
{{#each this}}
|1|{{rule this}}|
{{/each}}

{{/each}}
`

const rulesFile = path.join(`dist`, `build`, `react`, `index.json`)
const currentRules = await listRules(rulesFile, `getCurrentRules`)
const handlebars = Handlebars.create()
handlebars.registerHelper(`rule`, rule => {
  const link = getLinkToRule(rule.fullId)
  if (link) {
    return `[${rule.id}](${link})`
  }
  return rule.id
})
const markdownTemplateInvoker = handlebars.compile(markdownTemplate)
const markdown = markdownTemplateInvoker({
  currentRules,
})
await fs.outputFile(path.join(`dist`, `page`, `current.md`), markdown)
const converter = new showdown.Converter
const markdownHtml = converter.makeHtml(markdown)
const html = `
<body>
  <style>
  body {
    background: black;
    color: white;
    font-family: Geologica, Rubik, Calibri, sans-serif;
  }
  </style>
  ${markdownHtml}
</body>`
await fs.outputFile(path.join(`dist`, `page`, `current.html`), html)
