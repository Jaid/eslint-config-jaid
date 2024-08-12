import type {Dict, TestContext} from 'more-types'
import type * as Main from 'src/index.js'
import type {AsyncReturnType} from 'type-fest'

import {ESLint} from 'eslint'
import * as path from 'forward-slash-path'
import {globby} from 'globby'
import {type IterableElement} from 'type-fest'
import {getMainModule, toCleanYamlFile} from 'zeug'

const fixturesFolder = path.join(import.meta.dirname, `..`, `fixture`)
const outFolder = path.join(import.meta.dirname, `..`, `..`, `out`, `test`)
const main = await getMainModule<typeof Main>(`eslint-config-jaid`)

export const runTest = async (testContext: TestContext) => {
  const fixtureFolder = path.join(fixturesFolder, testContext.name)
  const srcFolder = path.join(fixtureFolder, `src`)
  const eslint = new ESLint({
    baseConfig: [main.typescriptConfig],
    cwd: fixtureFolder,
  })
  const tsNames = await globby([`**/*.{js,ts}`], {
    cwd: fixtureFolder,
    onlyFiles: true,
  })
  const calculatedConfig = await eslint.calculateConfigForFile(path.join(srcFolder, tsNames[0]))
  await toCleanYamlFile(calculatedConfig, path.join(outFolder, `config.yml`))
  const results: Dict<IterableElement<AsyncReturnType<typeof eslint.lintFiles>>> = {}
  for (const tsName of tsNames) {
    const scriptFile = path.join(fixtureFolder, tsName)
    const result = await eslint.lintFiles(scriptFile)
    results[tsName] = result[0]
    await toCleanYamlFile(result, path.join(outFolder, `result`, `${tsName}.yml`))
  }
}
