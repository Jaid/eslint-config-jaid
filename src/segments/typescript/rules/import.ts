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
    extensions: [
      "ignorePackages",
      {
        fix: true, // We currently have to manually enable fixing, this will be default in v5: https://github.com/un-ts/eslint-plugin-import-x/blob/master/docs/rules/extensions.md
      },
    ],
    consistentTypeSpecifierStyle: [],
  },
  error: {
    noSelfImport: [],
  },
})
