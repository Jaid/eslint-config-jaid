import type {Ruleset} from 'lib/unpackRuleset.ts'

export const regexRules = (): Ruleset => {
  return {
    id: 'regex',
    warn: {
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
      letterCase: {
        caseInsensitive: 'lowercase',
        unicodeEscape: 'uppercase',
        hexadecimalEscape: 'uppercase',
        controlEscape: 'lowercase',
      },
    },
  }
}
