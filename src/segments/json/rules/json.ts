import type {Ruleset} from 'lib/unpackRuleset.ts'

export const jsonRules = (): Ruleset => ({
  id: 'json',
  warn: {
    noPlusSign: [],
    indent: [2],
    keySpacing: [],
    objectCurlyNewline: [
      {
        consistent: true,
        multiline: true,
      },
    ],
    objectCurlySpacing: [],
    objectPropertyNewline: [
      {
        allowAllPropertiesOnSameLine: true,
      },
    ],
    commaDangle: ['never'],
    quotes: ['double'],
  },
  error: {
    validJsonNumber: [],
  },
})
