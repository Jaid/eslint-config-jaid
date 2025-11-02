import type {Linter} from 'eslint'

const warn = 'warn'

export const importQuotesRules = (): Linter.Config['rules'] => ({
  'import-quotes': [
    warn,
    'single',
  ],
})
