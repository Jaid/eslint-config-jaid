import type {Linter} from 'eslint'

const warn = 'warn'

export const nodeRules = (): Linter.Config['rules'] => ({
  'no-mixed-requires': warn,
  'no-new-require': warn,
  'no-path-concat': warn,
  'no-sync': warn,
})
