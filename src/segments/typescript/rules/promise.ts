import type {Linter} from 'eslint'

const warn = 'warn'

export const promiseRules = (): Linter.Config['rules'] => ({
  'catch-or-return': warn,
  'no-callback-in-promise': warn,
  'no-multiple-resolved': warn,
  'no-promise-in-callback': warn,
  'no-return-in-finally': warn,
  'no-return-wrap': warn,
  'param-names': warn,
  'prefer-await-to-callbacks': warn,
  'prefer-await-to-then': warn,
})
