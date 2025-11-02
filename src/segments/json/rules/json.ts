import type {Linter} from 'eslint'

const warn = 'warn'
const error = 'error'

export const jsonRules = (): Linter.Config['rules'] => ({
  'json/auto': warn,
  'json/no-plus-sign': warn,
  'json/valid-json-number': error,
})
