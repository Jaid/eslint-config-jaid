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
      jsxIndent: 2,
      jsxIndentProps: 2,
      jsxQuotes: 'prefer-single',
      jsxTagSpacing: {
        afterOpening: 'never',
        beforeClosing: 'never',
        beforeSelfClosing: 'never',
        closingSlash: 'never',
      },
    },
  }
}
