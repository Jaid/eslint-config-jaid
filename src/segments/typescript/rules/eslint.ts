import type {Ruleset} from 'lib/unpackRuleset.ts'

export const eslintRules = (): Ruleset => ({
  id: 'eslint',
  warn: {
    preferTemplate: [],
    operatorAssignment: [],
    objectShorthand: [],
    noUselessRename: [],
    noElseReturn: [],
    newCap: [],
    noEqNull: [],
    noExtendNative: [],
    noLonelyIf: [],
    noMultiAssign: [],
    noNestedTernary: [],
    noObjectConstructor: [],
    noUnderscoreDangle: {
      allow: ['__REDUX_DEVTOOLS_EXTENSION_COMPOSE__'],
    },
    noUnneededTernary: [],
    noWith: [],
    oneVar: 'never',
    preferConst: [],
    preferExponentiationOperator: [],
    sortVars: [],
  },
})
