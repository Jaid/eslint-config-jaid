import type {Linter} from 'eslint'

const warn = 'warn'

export const eslintRules = (): Linter.Config['rules'] => ({
  'prefer-template': warn,
  'operator-assignment': warn,
  'object-shorthand': warn,
  'no-useless-rename': warn,
  'no-else-return': warn,
  'new-cap': warn,
  'no-eq-null': warn,
  'no-extend-native': warn,
  'no-lonely-if': warn,
  'no-multi-assign': warn,
  'no-nested-ternary': warn,
  'no-object-constructor': warn,
  'no-underscore-dangle': [
    warn,
    {
      allow: ['__REDUX_DEVTOOLS_EXTENSION_COMPOSE__'],
    },
  ],
  'no-unneeded-ternary': warn,
  'no-with': warn,
  'one-var': [
    warn,
    'never',
  ],
  'prefer-const': warn,
  'prefer-exponentiation-operator': warn,
  'sort-vars': warn,
})
