import type {PackageJson} from 'type-fest'

import assert from 'node:assert'
import test, {before} from 'node:test'
import {fileURLToPath, pathToFileURL} from 'node:url'

import createDebug from 'debug'
import {ESLint} from 'eslint'
import * as path from 'forward-slash-path'
import fs from 'fs-extra'
import * as lodash from 'lodash-es'

const debug = createDebug(`eslint-config-jaid`)
const pkg = await fs.readJson(`package.json`) as PackageJson
const dirName = path.dirname(fileURLToPath(import.meta.url))
const srcFolder = path.join(dirName, `..`, `src`)
const presetsFolder = path.join(srcFolder, `presets`)
const rulesFolder = path.join(srcFolder, `rules`)
const srcFile = path.join(srcFolder, `ConfigBuilder.ts`)
const distFolder = path.join(dirName, `..`, `dist`)
const testInputFolder = path.join(dirName, `fixture`)
const testDistFolder = path.join(distFolder, `test`)
const outputFolder = path.join(testDistFolder, `output`)
debug(`srcFile: %s`, srcFile)
const presets = [`index`]
before(async () => {
  const {default: ConfigBuilder} = await import(pathToFileURL(srcFile).toString())
  const configBuilder = new ConfigBuilder({
    outputFolder,
    pkg,
    presets,
    presetsFolder,
    rulesFolder,
    staticFiles: {
      "license.txt": path.join(dirName, `..`, `license.txt`),
      "readme.md": path.join(dirName, `..`, `readme.md`),
    },
  })
  await configBuilder.run()
})
test(`should run`, async () => {
  const eslint = new ESLint({
    overrideConfigFile: path.join(distFolder, `build`, `index`, `index.json`),
    useEslintrc: false,
  })
  const [result] = await eslint.lintFiles([path.join(testInputFolder, `basic.ts`)])
  assert.strictEqual(result.errorCount, 0)
  assert.strictEqual(result.warningCount, 3)
  const hits = lodash.sortBy(result.messages.map(message => {
    return lodash.pick(message, [`ruleId`, `severity`])
  }), `ruleId`)
  assert.deepStrictEqual(hits, [
    {
      ruleId: `prefer-const`,
      severity: 1,
    },

    {
      ruleId: `semi`,
      severity: 1,
    },
    {
      ruleId: `unicorn/numeric-separators-style`,
      severity: 1,
    },
  ])
})
