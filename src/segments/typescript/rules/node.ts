import type {Ruleset} from 'lib/unpackRuleset'

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
