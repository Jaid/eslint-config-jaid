import type {TestContext} from 'more-types'
import type * as Main from 'src/index.js'

import stylisticJs from '@stylistic/eslint-plugin-js'
import {ESLint} from 'eslint'
import * as path from 'forward-slash-path'
import {getMainModule} from 'zeug'

const fixturesFolder = path.join(import.meta.dirname, `..`, `fixture`)
const main = await getMainModule<typeof Main>(`eslint-config-jaid`)

export const runTest = async (testContext: TestContext) => {
  const fixtureFolder = path.join(fixturesFolder, testContext.name)
  const srcFolder = path.join(fixtureFolder, `src`)
  const Eslint = loadEslint
  const eslint = new ESLint({
    useEslintrc: false,
    cache: false,
    cwd: fixtureFolder,
    // baseConfig: [
    // main.typescriptConfig
    // ]
  })
  const c = await eslint.calculateConfigForFile(srcFolder + `/a.ts`)
  console.dir({c}, {depth: null})
  // const result = await eslint.lintFiles(srcFolder + `/**/*.ts`)
  // console.dir({result}, {depth: null})
}
