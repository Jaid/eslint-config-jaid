import type {Ruleset} from 'lib/unpackRuleset.ts'

export const importRules = (): Ruleset => ({
  id: 'import',
  warn: {
    first: [],
    newlineAfterImport: {
      considerComments: true,
    },
    noDuplicates: [],
    noMutableExports: [],
    noUselessPathSegments: [],
  },
  error: {
    noSelfImport: [],
  },
})
