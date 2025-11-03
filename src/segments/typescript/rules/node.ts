import type {Ruleset} from 'lib/unpackRuleset.ts'

export const nodeRules = (): Ruleset => {
  return {
    id: 'node',
    warn: {
      noMixedRequires: [],
      noNewRequire: [],
      noPathConcat: [],
    },
  }
}
