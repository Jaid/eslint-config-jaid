import type {Linter} from 'eslint'

import {ESLint} from 'eslint'
import * as path from 'forward-slash-path'

const fixturesFolder = path.join(import.meta.dirname, '..', 'fixture')

type Options = {
  pattern?: string
}

type LintResult = {
  errorCount: number
  ruleIds: string[]
  warningCount: number
  results: ESLint.LintResult[]
}

export const lintFixture = async (
  fixtureName: string,
  config: Linter.Config | Linter.Config[],
  options: Options = {},
): Promise<LintResult> => {
  const fixtureFolder = path.join(fixturesFolder, fixtureName)
  const baseConfig = Array.isArray(config) ? config : [config]
  const eslint = new ESLint({
    baseConfig,
    cwd: fixtureFolder,
    overrideConfigFile: true,
  })
  const pattern = options.pattern ?? 'src/**/*.ts'
  const results = await eslint.lintFiles([pattern])
  const errorCount = results.reduce((sum, r) => sum + r.errorCount, 0)
  const warningCount = results.reduce((sum, r) => sum + r.warningCount, 0)
  const messages = results.flatMap(r => r.messages)
  const ruleIds = [
    ...new Set(
      messages
        .map(m => m.ruleId)
        .filter((id): id is string => id !== null),
    ),
  ]
  return {
    errorCount,
    results,
    ruleIds,
    warningCount,
  }
}
