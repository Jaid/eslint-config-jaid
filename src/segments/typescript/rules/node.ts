import type {Ruleset} from 'lib/unpackRuleset.ts'

export const nodeRules = (): Ruleset => ({
  id: 'node',
  warn: {
    noMixedRequires: [],
    noNewRequire: [],
    noPathConcat: [],
    noSync: [],
  },
})
