import type {Linter} from 'eslint'

const warn = 'warn'

export const typescriptRules = (): Linter.Config['rules'] => ({
  'prefer-function-type': warn,
  'no-wrapper-object-types': warn,
  'no-extra-non-null-assertion': warn,
  'no-duplicate-type-constituents': warn,
  'ban-ts-comment': [
    warn,
    {
      'ts-expect-error': {descriptionFormat: '^ +(ts\\(\\d+\\)|TS\\d+)( .+$|$)'},
      'ts-ignore': true,
      'ts-nocheck': false,
      'ts-check': false,
    },
  ],
  'no-base-to-string': warn,
  'no-misused-promises': warn,
  'no-non-null-asserted-nullish-coalescing': warn,
  'no-non-null-asserted-optional-chain': warn,
  'no-redundant-type-constituents': warn,
  'no-unnecessary-boolean-literal-compare': warn,
  'no-unnecessary-condition': [
    warn,
    {
      allowConstantLoopConditions: true,
    },
  ],
  'no-unnecessary-qualifier': warn,
  'no-unnecessary-type-arguments': warn,
  'no-unnecessary-type-assertion': warn,
  'no-unnecessary-type-constraint': warn,
  'no-unsafe-argument': warn,
  'no-unsafe-assignment': warn,
  'no-unsafe-call': warn,
  'no-unsafe-declaration-merging': warn,
  'no-unsafe-enum-comparison': warn,
  'no-unsafe-member-access': warn,
  'no-unsafe-return': warn,
  'no-unsafe-unary-minus': warn,
  'prefer-includes': warn,
  'prefer-optional-chain': warn,
  'prefer-reduce-type-parameter': warn,
  'prefer-string-starts-ends-with': warn,
  'restrict-template-expressions': warn,
  'unbound-method': [
    warn,
    {
      ignoreStatic: true,
    },
  ],
  'dot-notation': warn,
  'no-array-constructor': warn,
  'no-dupe-class-members': warn,
  'no-redeclare': warn,
  'no-restricted-imports': [
    warn,
    {
      name: 'lodash',
      message: 'Use lodash-es',
    },
    {
      name: 'ensure-array',
      message: 'Use sure-array',
    },
    {
      name: '@absolunet/fsp',
      message: 'Use fs-extra',
    },
    {
      name: '@absolunet/fss',
      message: 'Use fs-extra',
    },
    {
      name: 'opn',
      message: 'Use open',
    },
    {
      name: 'pify',
      message: 'Use util.promisify',
    },
    {
      name: 'fs/promises',
      message: 'Use fs-extra (more stable)',
    },
    {
      name: 'node:fs/promises',
      message: 'Use fs-extra (more stable)',
    },
    {
      name: 'execall',
      message: 'Use super-regex',
    },
    {
      name: 'js-yaml',
      message: 'Use yaml',
    },
    {
      name: 'jest',
      message: 'Use bun:test',
    },
    {
      name: '@types/jest',
      message: 'Use bun:test',
    },
    {
      name: 'jest-extended',
      message: 'Use bun:test',
    },
    {
      name: 'jest-light-runner',
      message: 'Use bun:test',
    },
    {
      name: 'node:test',
      message: 'Use bun:test',
    },
    {
      name: 'emp',
      message: 'Use fs-extra (emptyDir)',
    },
    {
      name: 'rollup',
      importNames: ['MaybeArray'],
      message: 'Use Arrayable from type-fest',
    },
    {
      name: 'ts-xor',
      message: 'Use Xor from type-fest',
    },
  ],
  'no-shadow': warn,
  'only-throw-error': warn,
  'no-use-before-define': warn,
  'no-useless-constructor': warn,
  'prefer-regexp-exec': warn,
  'require-array-sort-compare': warn,
  'return-await': warn,
  'array-type': [
    warn,
    {
      default: 'generic',
    },
  ],
  'class-literal-property-style': warn,
  'consistent-generic-constructors': warn,
  'consistent-indexed-object-style': warn,
  'consistent-type-assertions': [
    warn,
    {
      assertionStyle: 'as',
      objectLiteralTypeAssertions: 'allow',
    },
  ],
  'consistent-type-exports': warn,
  'consistent-type-imports': [
    warn,
    {
      prefer: 'type-imports',
      disallowTypeAnnotations: false,
      fixStyle: 'separate-type-imports',
    },
  ],
  'method-signature-style': warn,
  'no-meaningless-void-operator': warn,
  'no-unnecessary-template-expression': warn,
  'prefer-as-const': warn,
  'no-deprecated': warn,
  'no-duplicate-enum-values': warn,
  'no-array-delete': warn,
  'no-floating-promises': [
    warn,
    {
      ignoreVoid: false,
    },
  ],
  'no-import-type-side-effects': warn,
})
