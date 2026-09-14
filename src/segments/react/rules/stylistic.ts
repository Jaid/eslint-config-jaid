import type {Ruleset} from '../../../lib/unpackRuleset.ts'

export const reactStylisticRules = (): Ruleset => {
  return {
    id: 'stylistic',
    warn: {
      jsxClosingBracketLocation: 'line-aligned',
      jsxCurlyBracePresence: [],
      jsxCurlySpacing: [],
      jsxEqualsSpacing: [],
      jsxFirstPropNewLine: 'multiline',
      jsxIndentProps: 2,
      jsxPascalCase: [],
      jsxQuotes: 'prefer-single',
      jsxSelfClosingComp: [],
      jsxTagSpacing: {
        afterOpening: 'never',
        beforeClosing: 'never',
        beforeSelfClosing: 'always',
        closingSlash: 'never',
      },
    },
  }
}
