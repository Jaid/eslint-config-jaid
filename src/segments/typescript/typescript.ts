import type {ESLint, Linter} from 'eslint'

import stylisticPlugin from '@stylistic/eslint-plugin'
import typescriptPlugin from '@typescript-eslint/eslint-plugin'
import parser, {type ParserOptions} from '@typescript-eslint/parser'
import * as tsResolver from 'eslint-import-resolver-typescript'
import importQuotesPlugin from 'eslint-plugin-import-quotes'
import importPlugin from 'eslint-plugin-import-x'
import nodePlugin from 'eslint-plugin-n'
import perfectionistPlugin from 'eslint-plugin-perfectionist'
import promisePlugin from 'eslint-plugin-promise'
import regexPlugin from 'eslint-plugin-regexp'
import unicornPlugin from 'eslint-plugin-unicorn'

import ignores from 'src/ignores.js'

const objectKeySeries = (...keys: Array<string>) => ({
  type: 'natural',
  groups: keys,
  customGroups: Object.fromEntries(keys.map(key => [key, `^${key}$`])),
  useConfigurationIf: {
    allNamesMatchPattern: `^(${keys.join('|')})$`,
  },
})
const warn = 'warn'
const error = 'error'
const eslintRules: Linter.Config['rules'] = {
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
}
const typescriptRules: Linter.Config['rules'] = {
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
}
const stylisticRules: Linter.Config['rules'] = {
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
  'lines-between-class-members': [
    warn,
    'never',
  ],
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
}
const nodeRules: Linter.Config['rules'] = {
  'no-mixed-requires': warn,
  'no-new-require': warn,
  'no-path-concat': warn,
  'no-sync': warn,
}
const promiseRules: Linter.Config['rules'] = {
  'catch-or-return': warn,
  'no-callback-in-promise': warn,
  'no-multiple-resolved': warn,
  'no-promise-in-callback': warn,
  'no-return-in-finally': warn,
  'no-return-wrap': warn,
  'param-names': warn,
  'prefer-await-to-callbacks': warn,
  'prefer-await-to-then': warn,
}
const unicornRules: Linter.Config['rules'] = {
  'no-for-loop': warn,
  'no-console-spaces': warn,
  'prefer-array-some': warn,
  'prefer-includes': warn,
  'prefer-modern-dom-apis': warn,
  'prefer-object-from-entries': warn,
  'prefer-query-selector': warn,
  'prevent-abbreviations': [
    warn,
    {
      replacements: {
        args: false,
        dir: {
          directory: false,
          direction: false,
          folder: true,
        },
        i: {
          index: false,
        },
        opt: {
          option: true,
        },
        props: {
          properties: false,
        },
      },
    },
  ],
  'switch-case-braces': warn,
  'template-indent': warn,
  'catch-error-name': warn,
  'consistent-function-scoping': warn,
  'error-message': warn,
  'escape-case': warn,
  'expiring-todo-comments': warn,
  'new-for-builtins': warn,
  'no-array-for-each': warn,
  'no-await-expression-member': warn,
  'no-hex-escape': warn,
  'no-nested-ternary': warn,
  'no-new-array': warn,
  'no-new-buffer': warn,
  'no-thenable': warn,
  'no-unnecessary-await': warn,
  'no-useless-fallback-in-spread': warn,
  'no-useless-length-check': warn,
  'no-useless-promise-resolve-reject': warn,
  'no-useless-spread': warn,
  'no-useless-undefined': warn,
  'no-zero-fractions': warn,
  'number-literal-case': warn,
  'numeric-separators-style': warn,
  'prefer-add-event-listener': warn,
  'prefer-array-find': warn,
  'prefer-array-flat': warn,
  'prefer-array-flat-map': warn,
  'prefer-array-index-of': warn,
  'prefer-at': warn,
  'prefer-blob-reading-methods': warn,
  'prefer-code-point': warn,
  'prefer-date-now': warn,
  'prefer-logical-operator-over-ternary': warn,
  'prefer-math-trunc': warn,
  'prefer-modern-math-apis': warn,
  'prefer-module': warn,
  'prefer-native-coercion-functions': warn,
  'prefer-negative-index': warn,
  'prefer-number-properties': warn,
  'prefer-prototype-methods': warn,
  'prefer-regexp-test': warn,
  'prefer-set-has': warn,
  'prefer-set-size': warn,
  'prefer-spread': warn,
  'prefer-string-replace-all': warn,
  'prefer-string-slice': warn,
  'prefer-string-starts-ends-with': warn,
  'prefer-string-trim-start-end': warn,
  'prefer-top-level-await': warn,
  'prefer-type-error': warn,
  'relative-url-style': warn,
  'text-encoding-identifier-case': warn,
  'throw-new-error': warn,
  'prefer-structured-clone': warn,
  'no-unnecessary-slice-end': warn,
  'prefer-global-this': warn,
  'prefer-math-min-max': warn,
  'consistent-existence-index-check': warn,
  'consistent-date-clone': warn,
  'no-instanceof-builtins': warn,
  'no-accessor-recursion': warn,
  'prefer-import-meta-properties': warn,
  'no-unnecessary-array-flat-depth': warn,
  'no-unnecessary-array-splice-count': warn,
  'prefer-class-fields': warn,
  'no-array-reverse': warn,
  'require-module-specifiers': warn,
  'no-useless-error-capture-stack-trace': warn,
  'prefer-classlist-toggle': warn,
  'require-module-attributes': warn,
  'no-array-sort': warn,
}
const importRules: Linter.Config['rules'] = {
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
}
const importQuotesRules: Linter.Config['rules'] = {
  'import-quotes': [
    warn,
    'single',
  ],
}
const regexRules: Linter.Config['rules'] = {
  'no-useless-escape': warn,
  'no-useless-string-literal': warn,
  'control-character-escape': warn,
  'letter-case': [
    warn,
    {
      caseInsensitive: 'lowercase',
      unicodeEscape: 'uppercase',
      hexadecimalEscape: 'uppercase',
      controlEscape: 'lowercase',
    },
  ],
  negation: warn,
  'no-dupe-characters-character-class': warn,
  'no-extra-lookaround-assertions': warn,
  'no-invisible-character': warn,
  'no-missing-g-flag': warn,
  'no-trivially-nested-assertion': warn,
  'no-trivially-nested-quantifier': warn,
  'no-useless-assertions': warn,
  'no-useless-backreference': warn,
  'no-useless-character-class': warn,
  'no-useless-flag': warn,
  'no-useless-lazy': warn,
  'no-useless-quantifier': warn,
  'no-useless-range': warn,
  'no-useless-two-nums-quantifier': warn,
  'optimal-quantifier-concatenation': warn,
  'prefer-d': warn,
  'prefer-predefined-assertion': warn,
  'prefer-quantifier': warn,
  'sort-alternatives': warn,
  'sort-character-class-elements': warn,
  'sort-flags': warn,
  strict: warn,
}
const perfectionistRules: Linter.Config['rules'] = {
  'sort-classes': [
    warn,
    {
      type: 'natural',
      groups: [
        'static-property',
        'static-method',
        'static-private-method',
        'index-signature',
        'property',
        'private-property',
        'constructor',
        [
          'get-method',
          'set-method',
        ],
        'method',
        'private-method',
        'unknown',
      ],
    },
  ],
  'sort-enums': [
    warn,
    {
      type: 'natural',
    },
  ],
  'sort-imports': [
    warn,
    {
      type: 'natural',
      groups: [
        [
          'parent-type',
          'sibling-type',
          'external-type',
          'internal-type',
          'internal-with-shortcut-type',
          'index-type',
        ],
        'side-effect',
        'object',
        [
          'builtin',
          'node',
        ],
        'external',
        [
          'internal',
          'internal-with-shortcut',
        ],
        [
          'parent',
          'sibling',
        ],
        'style',
        'unknown',
      ],
      customGroups: {
        value: {
          node: '^(bun|node):.+',
          'internal-with-shortcut': [
            '^src/.+',
            '^lib/.+',
            '^component/.+',
            '^components/.+',
          ],
        },
        type: {
          'internal-with-shortcut-type': 'internal-with-shortcut',
        },
      },
    },
  ],
  'sort-interfaces': [
    warn,
    {
      type: 'natural',
    },
  ],
  'sort-named-exports': [
    warn,
    {
      type: 'natural',
    },
  ],
  'sort-named-imports': [
    warn,
    {
      type: 'natural',
    },
  ],
  'sort-object-types': [
    warn,
    {
      type: 'natural',
    },
  ],
  'sort-decorators': [
    warn,
    {
      type: 'natural',
    },
  ],
  'sort-heritage-clauses': [
    warn,
    {
      type: 'natural',
    },
  ],
  'sort-union-types': [
    warn,
    {
      type: 'natural',
      groups: [
        'unknown',
        'literal',
        'keyword',
        'nullish',
      ],
    },
  ],
  'sort-objects': [
    warn,
    objectKeySeries('r', 'g', 'b'),
    objectKeySeries('x', 'y', 'z'),
    objectKeySeries('width', 'height'),
    objectKeySeries('id', 'key', 'uuid', 'type', 'name', 'title', 'value', 'description'),
    objectKeySeries('createdAt', 'updatedAt', 'deletedAt'),
    objectKeySeries('before', 'after'),
    objectKeySeries('from', 'to'),
    objectKeySeries('min', 'max'),
    objectKeySeries('key', 'value'),
    {
      type: 'unsorted',
    },
  ],
}
const compileRules = (rulesMap: Record<string, NonNullable<Linter.Config['rules']>>) => {
  const result: Linter.Config['rules'] = {}
  for (const [pluginName, rules] of Object.entries(rulesMap)) {
    for (const [ruleName, ruleValue] of Object.entries(rules)) {
      const key = pluginName === 'eslint' ? ruleName : `${pluginName}/${ruleName}`
      result[key] = ruleValue
    }
  }
  return result
}
const globs = [
  '**/*.ts',
  '**/*.tsx',
  '**/*.mts',
  '**/*.mtsx',
  '**/*.cts',
  '**/*.ctsx',
]
const config: Linter.Config = {
  plugins: {
    typescript: typescriptPlugin as unknown as ESLint.Plugin,
    stylistic: stylisticPlugin as ESLint.Plugin,
    node: nodePlugin,
    promise: promisePlugin as ESLint.Plugin,
    unicorn: unicornPlugin as ESLint.Plugin,
    // @ts-expect-error ts(2352)
    import: importPlugin as ESLint.Plugin,
    importQuotes: importQuotesPlugin as ESLint.Plugin,
    regex: regexPlugin as ESLint.Plugin,
    perfectionist: perfectionistPlugin as ESLint.Plugin,
  },
  ignores,
  files: globs,
  languageOptions: {
    parser,
    parserOptions: {
      projectService: {
        maximumDefaultProjectFileMatchCount_THIS_WILL_SLOW_DOWN_LINTING: Infinity,
        defaultProject: './tsconfig.json',
      },
    } as Linter.ParserOptions & ParserOptions,
  },
  name: 'eslint-config-jaid/typescript',
  rules: compileRules({
    eslint: eslintRules,
    typescript: typescriptRules,
    node: nodeRules,
    promise: promiseRules,
    unicorn: unicornRules,
    import: importRules,
    importQuotes: importQuotesRules,
    regex: regexRules,
    perfectionist: perfectionistRules,
    stylistic: stylisticRules,
  }),
  settings: {
    'import-x/resolver': {
      name: 'tsResolver',
      resolver: tsResolver,
    },
    'import-x/parsers': {
      '@typescript-eslint/parser': globs,
    },
  },
}

export default config
