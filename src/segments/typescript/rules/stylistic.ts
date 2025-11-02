import type {Linter} from 'eslint'

const warn = 'warn'

export const stylisticRules = (): Linter.Config['rules'] => ({
  'curly-newline': warn,
  'type-named-tuple-spacing': warn,
  'type-generic-spacing': warn,
  'nonblock-statement-body-position': [
    warn,
    'below',
  ],
  'multiline-ternary': [
    warn,
    'never',
  ],
  'block-spacing': warn,
  'multiline-comment-style': [
    warn,
    'separate-lines',
  ],
  'brace-style': warn,
  'comma-spacing': warn,
  'function-call-spacing': warn,
  indent: [
    warn,
    2,
  ],
  'key-spacing': warn,
  'keyword-spacing': warn,
  // 'lines-between-class-members': [
  //   warn,
  //   'never',
  // ],
  'object-curly-spacing': warn,
  'padding-line-between-statements': [
    warn,
    {
      blankLine: 'never',
      prev: '*',
      next: '*',
    },
    {
      blankLine: 'any',
      prev: 'import',
      next: '*',
    },
    {
      blankLine: 'any',
      prev: '*',
      next: 'export',
    },
    {
      blankLine: 'any',
      prev: 'import',
      next: 'type',
    },
    {
      blankLine: 'any',
      prev: 'type',
      next: '*',
    },
    {
      blankLine: 'any',
      prev: '*',
      next: 'type',
    },
    {
      blankLine: 'any',
      prev: 'type',
      next: 'type',
    },
    {
      blankLine: 'any',
      prev: 'export',
      next: '*',
    },
  ],
  quotes: [
    warn,
    'single',
    {
      avoidEscape: true,
    },
  ],
  'space-before-blocks': warn,
  'space-before-function-paren': [
    warn,
    {
      anonymous: 'always',
      named: 'never',
      asyncArrow: 'always',
    },
  ],
  'space-infix-ops': warn,
  'member-delimiter-style': [
    warn,
    {
      singleline: {
        delimiter: 'comma',
        requireLast: false,
      },
      multiline: {
        delimiter: 'none',
        requireLast: false,
      },
    },
  ],
  'type-annotation-spacing': warn,
  'array-bracket-newline': [
    warn,
    {
      multiline: true,
    },
  ],
  'array-bracket-spacing': warn,
  'array-element-newline': [
    warn,
    'consistent',
  ],
  'arrow-parens': [
    warn,
    'as-needed',
  ],
  'arrow-spacing': warn,
  'comma-dangle': [
    warn,
    {
      arrays: 'always-multiline',
      objects: 'always-multiline',
      imports: 'always-multiline',
      exports: 'always-multiline',
      functions: 'always-multiline',
      enums: 'always-multiline',
      generics: 'always-multiline',
      tuples: 'always-multiline',
    },
  ],
  'comma-style': warn,
  'computed-property-spacing': warn,
  'dot-location': [
    warn,
    'property',
  ],
  'eol-last': warn,
  'function-paren-newline': [
    warn,
    'never',
  ],
  'implicit-arrow-linebreak': warn,
  'linebreak-style': [
    warn,
    'unix',
  ],
  'new-parens': [
    warn,
    'never',
  ],
  'no-extra-parens': warn,
  'no-floating-decimal': warn,
  'no-multiple-empty-lines': [
    warn,
    {
      max: 1,
      maxEOF: 1,
      maxBOF: 0,
    },
  ],
  'no-tabs': warn,
  'no-trailing-spaces': warn,
  'no-whitespace-before-property': warn,
  'object-curly-newline': [
    warn,
    {
      ObjectExpression: {
        consistent: true,
        minProperties: 2,
        multiline: true,
      },
      ObjectPattern: 'never',
      ImportDeclaration: 'never',
    },
  ],
  'object-property-newline': warn,
  'operator-linebreak': [
    warn,
    'before',
  ],
  'padded-blocks': [
    warn,
    'never',
  ],
  'quote-props': [
    warn,
    'as-needed',
  ],
  'rest-spread-spacing': warn,
  'space-in-parens': warn,
  'space-unary-ops': warn,
  'spaced-comment': warn,
  'switch-colon-spacing': warn,
  'template-curly-spacing': warn,
  'template-tag-spacing': warn,
  'yield-star-spacing': warn,
  'function-call-argument-newline': [
    warn,
    'never',
  ],
  'generator-star-spacing': warn,
  'max-statements-per-line': warn,
  'newline-per-chained-call': warn,
  'no-confusing-arrow': warn,
  'no-multi-spaces': warn,
  semi: [
    warn,
    'never',
  ],
})
