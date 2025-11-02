import type {Linter} from 'eslint'

const warn = 'warn'
const error = 'error'

export const importRules = (): Linter.Config['rules'] => ({
  first: warn,
  'newline-after-import': [
    warn,
    {
      considerComments: true,
    },
  ],
  'no-duplicates': warn,
  'no-mutable-exports': warn,
  'no-self-import': error,
  'no-useless-path-segments': warn,
})
