import type {Ruleset} from 'lib/unpackRuleset.ts'

export const yamlRules = (): Ruleset => ({
  id: 'yaml',
  warn: {
    blockMapping: [],
    blockMappingColonIndicatorNewline: [],
    blockSequence: [],
    blockSequenceHyphenIndicatorNewline: [
      'never',
      {
        nestedHyphen: 'never',
      },
    ],
    flowSequenceBracketSpacing: [],
    indent: [
      2,
      {
        indentBlockSequences: false,
      },
    ],
    keySpacing: [],
    noMultipleEmptyLines: {
      max: 1,
      maxBOF: 0,
      maxEOF: 1,
    },
    noTabIndent: [],
    noTrailingZeros: [],
    plainScalar: [],
    quotes: {
      prefer: 'single',
      avoidEscape: true,
    },
    spacedComment: [],
  },
})
