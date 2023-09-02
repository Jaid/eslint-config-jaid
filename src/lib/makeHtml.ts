#!/bin/env tsx
import path from 'node:path'

import fs from 'fs-extra'
import Handlebars from 'handlebars'
import * as lodash from 'lodash-es'
import showdown from 'showdown'

import getLinkToRule from 'src/lib/getLinkToRule.ts'
import {Rule} from 'src/lib/listRules.ts'

type Selector = `current` | `deprecated` | `unused`

export default (title: string, rules: Dictionary<Rule[]>) => {
  const markdownTemplate = `
# {{title}}
{{#each rules}}
## {{@key}}

\\#|Rule
--:|:--
{{#each this}}
{{oneMore @key}}|{{rule this}}
{{/each}}

{{/each}}
`

  const handlebars = Handlebars.create()
  handlebars.registerHelper(`rule`, rule => {
    const link = getLinkToRule(rule.fullId)
    if (link) {
      return `[${rule.id}](${link})`
    }
    return rule.id
  })
  handlebars.registerHelper(`oneMore`, index => Number(index) + 1)
  const markdownTemplateInvoker = handlebars.compile(markdownTemplate)
  const markdown = markdownTemplateInvoker({
    title,
    rules,
  })
  const converter = new showdown.Converter({
    tables: true,
  })
  const markdownHtml = converter.makeHtml(markdown)
  const html = `
<body>
  <style>
  body {
    background: black;
    color: white;
    font-family: Geologica, Rubik, Calibri, sans-serif;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  tbody > tr:nth-child(odd) {
    background: oklch(0.16 0.05 317);
  }
  thead {
    background: oklch(0.77 0.19 317);
    color: black;
  }
  thead > tr > th:first-child {
    border-top-left-radius: 0.5rem;
  }
  thead > tr > th:last-child {
    border-top-right-radius: 0.5rem;
  }
  table {
    border-collapse: collapse;
    min-width: min(100vw, 22em);
  }
  td, th {
    padding: 0.5rem;
  }
  a {
    color: oklch(0.82 0.15 317);
    text-decoration: none;
  }
  a:hover, a:focus, a:active {
    text-decoration: underline;
  }
  body {
    counter-reset: section;
  }
  </style>
  ${markdownHtml}
</body>`
  return {
    html,
    markdown,
  }
}
