import type {Ruleset} from 'lib/unpackRuleset.ts'

export const jsonRules = (): Ruleset => ({
  id: 'json',
  warn: {
    auto: [],
    noPlusSign: [],
  },
  error: {
    validJsonNumber: [],
  },
})
