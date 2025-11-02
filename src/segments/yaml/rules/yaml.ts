import type {Linter} from 'eslint'

const warn = 'warn'

export const yamlRules = (): Linter.Config['rules'] => ({
  'yaml/block-mapping': warn,
  'yaml/block-mapping-colon-indicator-newline': warn,
  'yaml/block-sequence': warn,
  'yaml/block-sequence-hyphen-indicator-newline': [
    warn,
    'never',
    {
      nestedHyphen: 'never',
    },
  ],
  'yaml/flow-sequence-bracket-spacing': warn,
  'yaml/indent': [
    warn,
    2,
    {
      indentBlockSequences: false,
    },
  ],
  'yaml/key-spacing': warn,
  'yaml/no-multiple-empty-lines': [
    warn,
    {
      max: 1,
      maxBOF: 0,
      maxEOF: 1,
    },
  ],
  'yaml/no-tab-indent': warn,
  'yaml/no-trailing-zeros': warn,
  'yaml/plain-scalar': warn,
  'yaml/quotes': [
    warn,
    {
      prefer: 'single',
      avoidEscape: true,
    },
  ],
  'yaml/spaced-comment': warn,
})
