import type {Ruleset} from 'lib/unpackRuleset.ts'

export const importQuotesRules = (): Ruleset => ({
  id: 'importQuotes',
  warn: {
    importQuotes: 'single',
  },
})
