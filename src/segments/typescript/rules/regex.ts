import type {Ruleset} from 'lib/unpackRuleset.ts'

// <old>
// export const regexRules = (): Linter.Config['rules'] => ({
//   'no-useless-escape': warn,
//   'no-useless-string-literal': warn,
//   'control-character-escape': warn,
//   'letter-case': [
//     warn,
//     {
//       caseInsensitive: 'lowercase',
//       unicodeEscape: 'uppercase',
//       hexadecimalEscape: 'uppercase',
//       controlEscape: 'lowercase',
//     },
//   ],
//   negation: warn,
//   'no-dupe-characters-character-class': warn,
//   'no-extra-lookaround-assertions': warn,
//   'no-invisible-character': warn,
//   'no-missing-g-flag': warn,
//   'no-trivially-nested-assertion': warn,
//   'no-trivially-nested-quantifier': warn,
//   'no-useless-assertions': warn,
//   'no-useless-backreference': warn,
//   'no-useless-character-class': warn,
//   'no-useless-flag': warn,
//   'no-useless-lazy': warn,
//   'no-useless-quantifier': warn,
//   'no-useless-range': warn,
//   'no-useless-two-nums-quantifier': warn,
//   'optimal-quantifier-concatenation': warn,
//   'prefer-d': warn,
//   'prefer-predefined-assertion': warn,
//   'prefer-quantifier': warn,
//   'sort-alternatives': warn,
//   'sort-character-class-elements': warn,
//   'sort-flags': warn,
//   strict: warn,
// })
// </old>

export const regexRules = (): Ruleset => {
  return {
    id: 'regex',
    warns: {
      noUselessEscape: [],
      noUselessStringLiteral: [],
      controlCharacterEscape: [],
      noDupeCharactersCharacterClass: [],
      noExtraLookaroundAssertions: [],
      noInvisibleCharacter: [],
      noMissingGFlag: [],
      noTriviallyNestedAssertion: [],
      noTriviallyNestedQuantifier: [],
      noUselessAssertions: [],
      noUselessBackreference: [],
      noUselessCharacterClass: [],
      noUselessFlag: [],
      noUselessLazy: [],
      noUselessQuantifier: [],
      noUselessRange: [],
      noUselessTwoNumsQuantifier: [],
      optimalQuantifierConcatenation: [],
      preferD: [],
      preferPredefinedAssertion: [],
      preferQuantifier: [],
      sortAlternatives: [],
      sortCharacterClassElements: [],
      sortFlags: [],
      strict: [],
      letterCase: [
        {
          caseInsensitive: 'lowercase',
          unicodeEscape: 'uppercase',
          hexadecimalEscape: 'uppercase',
          controlEscape: 'lowercase',
        },
      ],
    },
  }
}
