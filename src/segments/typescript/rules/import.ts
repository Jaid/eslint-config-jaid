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
     // WAITINGFOR https://github.com/un-ts/eslint-plugin-import-x/issues/437
     // WAITINGFOR https://github.com/un-ts/eslint-plugin-import-x/issues/413
     // WAITINGFOR v5 – We currently have to manually enable fixing, this will be default in v5: https://github.com/un-ts/eslint-plugin-import-x/blob/master/docs/rules/extensions.md
    // extensions: [
    //   "ignorePackages",
    //   {
    //     fix: true,
    //   },
    // ],
    consistentTypeSpecifierStyle: [],
  },
  error: {
    noSelfImport: [],
  },
})
