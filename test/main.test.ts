import {expect, test} from 'bun:test'

import {ESLint} from 'eslint'
import packageJsonPlugin from 'eslint-plugin-package-json'

import {makeEslintConfig} from '../src/main.ts'
import jsonConfig from '../src/segments/json/json.ts'
import packageJsonConfig from '../src/segments/json/packageJson.ts'
import markdownConfig from '../src/segments/markdown/markdown.ts'
import reactConfig from '../src/segments/react/react.ts'
import typescriptConfig from '../src/segments/typescript/typescript.ts'
import yamlConfig from '../src/segments/yaml/yaml.ts'
import {lintFixture} from './lib/lintFixture.ts'

const timeout = 60_000
const modernUnicornRuleIds = [
  'unicorn/prefer-dispose',
  'unicorn/no-array-concat-in-loop',
  'unicorn/no-array-fill-with-reference-type',
  'unicorn/no-unsafe-promise-all-settled-values',
  'unicorn/no-loop-iterable-mutation',
  'unicorn/no-uncalled-method',
  'unicorn/prefer-regexp-escape',
  'unicorn/prefer-iterator-helpers',
  'unicorn/prefer-promise-with-resolvers',
  'unicorn/prefer-array-from-async',
  'unicorn/prefer-error-is-error',
  'unicorn/prefer-abort-signal-timeout',
  'unicorn/prefer-abort-signal-any',
  'unicorn/no-multiple-promise-resolver-calls',
  'unicorn/no-duplicate-logical-operands',
  'unicorn/no-duplicate-if-branches',
  'unicorn/prefer-object-iterable-methods',
  'unicorn/consistent-optional-chaining',
  'unicorn/prefer-set-methods',
  'unicorn/no-unsafe-json-serialization',
  'unicorn/no-incomplete-accessor-override',
  'unicorn/prefer-promise-static-methods',
  'unicorn/no-invalid-property-descriptor',
  'unicorn/no-invalid-dom-token',
  'unicorn/no-prevent-default-in-passive-listener',
  'unicorn/no-invalid-temporal-arithmetic',
  'unicorn/require-text-decoder-streaming',
] as const
const eslintReactRuleIds = [
  'react/no-context-provider',
  'react/no-duplicate-key',
  'react/no-use-context',
  'react/use-memo',
  'react/use-state',
] as const
const zodRuleIds = [
  'zod/array-style',
  'zod/no-any-schema',
  'zod/no-coerce-boolean',
  'zod/no-conflicting-checks',
  'zod/no-empty-custom-schema',
  'zod/no-native-enum',
  'zod/no-number-schema-with-finite',
  'zod/no-number-schema-with-int',
  'zod/no-number-schema-with-is-finite',
  'zod/no-number-schema-with-is-int',
  'zod/no-number-schema-with-safe',
  'zod/no-number-schema-with-step',
  'zod/no-optional-and-default-together',
  'zod/no-promise-schema',
  'zod/no-schema-with-is-nullable',
  'zod/no-schema-with-is-optional',
  'zod/no-throw-in-refine',
  'zod/no-transform-in-record-key',
  'zod/no-unnecessary-readonly',
  'zod/prefer-enum-over-literal-union',
  'zod/prefer-loose-object',
  'zod/prefer-map-set-size-over-min-max',
  'zod/prefer-meta-last',
  'zod/prefer-nullish',
  'zod/prefer-strict-object',
  'zod/prefer-string-length-over-min-max',
  'zod/prefer-top-level-string-formats',
  'zod/prefer-trim-before-string-length-checks',
  'zod/prefer-validate',
  'zod/require-brand-type-parameter',
  'zod/require-error-message',
] as const
const packageJsonRuleIds = [
  'package-json/bin-name-casing',
  'package-json/repository-shorthand',
  'package-json/prefer-rolling-workspace-spec',
  'package-json/scripts-name-casing',
  'package-json/specify-peers-locally',
  'package-json/unique-dependencies',
  'package-json/require-name',
  'package-json/require-type',
  'package-json/require-version',
  'package-json/require-description',
] as const
const additionalReactRuleIds = [
  'stylistic/jsx-shorthand-boolean',
  'stylistic/jsx-shorthand-fragment',
  'react/no-forward-ref',
  'react/dom-no-use-form-state',
  'react/web-api-no-leaked-event-listener',
  'react/web-api-no-leaked-fetch',
  'react/jsx-no-useless-fragment',
  'react/jsx-no-key-after-spread',
  'react/no-unstable-default-props',
  'react-hooks/static-components',
  'react-hooks/immutability',
  'react-hooks/purity',
  'react-hooks/refs',
  'react-hooks/set-state-in-render',
  'react-hooks/set-state-in-effect',
] as const
const additionalTypescriptRuleIds = [
  'import/no-commonjs',
  'unicorn/prefer-group-by',
  'unicorn/prefer-promise-try',
  'unicorn/prefer-get-or-insert-computed',
  'unicorn/prefer-iterator-to-array',
  'unicorn/prefer-uint8array-base64',
  'typescript/no-useless-default-assignment',
  'typescript/no-unnecessary-type-conversion',
  'typescript/no-unnecessary-type-parameters',
  'typescript/no-unsafe-enum-assignment',
  'typescript/no-misused-spread',
  'regex/no-unused-capturing-group',
  'perfectionist/sort-array-includes',
  'perfectionist/sort-import-attributes',
  'perfectionist/sort-export-attributes',
  'unicorn/prefer-includes-over-repeated-comparisons',
  'unicorn/no-boolean-sort-comparator',
  'unicorn/prefer-uint8array-hex',
  'unicorn/prefer-iterator-to-array-at-end',
  'unicorn/no-duplicate-loops',
  'unicorn/prefer-array-iterable-methods',
  'unicorn/prefer-direct-iteration',
  'unicorn/prefer-array-last-methods',
  'unicorn/prefer-export-from',
  'unicorn/no-declarations-before-early-exit',
  'unicorn/prefer-continue',
  'unicorn/no-unnecessary-array-flat-map',
  'unicorn/no-unnecessary-splice',
  'unicorn/prefer-array-from-map',
  'unicorn/prefer-iterable-in-constructor',
  'unicorn/no-useless-set-construction',
  'unicorn/no-unused-iterator-helper',
  'unicorn/no-unused-builtin-method-return',
  'unicorn/prefer-hoisting-branch-code',
  'unicorn/no-useless-coercion',
  'unicorn/no-useless-boolean-cast',
  'unicorn/no-useless-logical-operand',
  'unicorn/no-mismatched-map-key',
  'unicorn/no-unsafe-string-replacement',
  'unicorn/no-unreadable-new-expression',
  'unicorn/no-unnecessary-default-arguments',
] as const
test('makeEslintConfig excludes a rule by full id only', () => {
  const config = makeEslintConfig({
    excludeRules: ['stylistic/quotes'],
  })
  const typescript = config.find(segment => segment.name === 'eslint-config-jaid/typescript')
  const json = config.find(segment => segment.name === 'eslint-config-jaid/json')
  expect(typescript?.rules?.['stylistic/quotes']).toBeUndefined()
  expect(json?.rules?.['json/quotes']).toBeDefined()
})
test('makeEslintConfig excludes matching rule names across plugins', () => {
  const config = makeEslintConfig({
    excludeRules: ['quotes'],
  })
  for (const segment of config) {
    for (const ruleId of Object.keys(segment.rules ?? {})) {
      expect(ruleId.split('/').at(-1)).not.toBe('quotes')
    }
  }
})
test('makeEslintConfig excludes complete segments', () => {
  const config = makeEslintConfig({
    excludeSegments: ['json', 'react'],
  })
  const names = config.map(segment => segment.name)
  expect(names).not.toContain('eslint-config-jaid/json')
  expect(names).not.toContain('eslint-config-jaid/jsonc')
  expect(names).not.toContain('eslint-config-jaid/json5')
  expect(names).not.toContain('eslint-config-jaid/packageJson')
  expect(names).not.toContain('eslint-config-jaid/launchJson')
  expect(names).not.toContain('eslint-config-jaid/react')
  expect(names).toContain('eslint-config-jaid/yaml')
  expect(names).toContain('eslint-config-jaid/typescript')
})
test('package.json rules are enabled', () => {
  for (const ruleId of packageJsonRuleIds) {
    expect(packageJsonConfig.rules?.[ruleId]).toEqual(['warn'])
  }
  const validRuleNames = Object.keys(packageJsonPlugin.rules).filter(name => name.startsWith('valid-'))
  for (const validRuleName of validRuleNames) {
    expect(packageJsonConfig.rules?.[`package-json/${validRuleName}`]).toEqual(['warn'])
  }
  expect(packageJsonConfig.rules?.['package-json/restrict-dependency-ranges']).toEqual([
    'warn',
    {
      forDependencyTypes: ['dependencies', 'devDependencies', 'optionalDependencies'],
      rangeType: 'pin',
    },
  ])
})
test('Markdown rules are enabled', () => {
  expect(markdownConfig.language).toBe('markdown/gfm')
  expect(markdownConfig.rules?.['markdown/heading-increment']).toEqual(['warn'])
  expect(markdownConfig.rules?.['markdown/no-empty-images']).toEqual(['warn'])
  expect(markdownConfig.rules?.['markdown/no-empty-links']).toEqual(['warn'])
  expect(markdownConfig.rules?.['markdown/no-duplicate-headings']).toEqual([
    'warn',
    {
      checkSiblingsOnly: true,
    },
  ])
})
test('modern Unicorn rules are enabled', () => {
  for (const ruleId of modernUnicornRuleIds) {
    expect(typescriptConfig.rules?.[ruleId]).toEqual(['warn'])
  }
})
test('nested ternary rules preserve readable parentheses', () => {
  expect(typescriptConfig.rules?.['no-nested-ternary']).toBeUndefined()
  expect(typescriptConfig.rules?.['unicorn/no-nested-ternary']).toEqual(['warn'])
  expect(typescriptConfig.rules?.['stylistic/no-extra-parens']).toEqual([
    'warn',
    'all',
    {
      ignoredNodes: ['ArrowFunctionExpression[body.type=ConditionalExpression]'],
      nestedConditionalExpressions: false,
    },
  ])
})
test('nested ternary autofixes are stable across runs', async () => {
  const eslint = new ESLint({
    fix: true,
    overrideConfig: [typescriptConfig],
    overrideConfigFile: true,
  })
  const filePath = 'test/fixture/clean-ts/src/index.ts'
  const source = `function pick(first: boolean, second: boolean) {
  return first ? 'first' : second ? 'second' : 'fallback'
}
`
  const expected = source.replace(" : second ? 'second' : 'fallback'", " : (second ? 'second' : 'fallback')")
  const [first] = await eslint.lintText(source, {filePath})
  expect(first.output).toBe(expected)
  expect(first.messages).toEqual([])
  const [second] = await eslint.lintText(expected, {filePath})
  expect(second.output).toBeUndefined()
  expect(second.messages).toEqual([])
}, timeout)
test('hoisted functions are permitted but forward variable references are not', async () => {
  expect(typescriptConfig.rules?.['typescript/no-use-before-define']).toEqual(['warn', {functions: false}])
  const eslint = new ESLint({
    overrideConfig: [typescriptConfig],
    overrideConfigFile: true,
  })
  const [result] = await eslint.lintText(`const value = later
const later = 1
const output = getValue()
function getValue() {
  return later
}
`, {filePath: 'test/fixture/clean-ts/src/index.ts'})
  expect(result.messages.filter(message => message.ruleId === 'typescript/no-use-before-define').map(message => message.message)).toEqual([
    "'later' was used before it was defined.",
  ])
}, timeout)
test('constructor and Promise executor naming rules are relaxed', () => {
  expect(typescriptConfig.rules?.['new-cap']).toEqual(['warn', {capIsNew: false}])
  expect(typescriptConfig.rules?.['no-underscore-dangle']).toBeUndefined()
  expect(typescriptConfig.rules?.['promise/param-names']).toEqual([
    'warn',
    {
      rejectPattern: '^_?reject',
      resolvePattern: '^_?resolve',
    },
  ])
})
test('arguments matching their parameter defaults trigger unicorn/no-unnecessary-default-arguments', async () => {
  const eslint = new ESLint({
    overrideConfig: [typescriptConfig],
    overrideConfigFile: true,
  })
  const [result] = await eslint.lintText(`const retry = (attempts = 3) => attempts
export const output = retry(3)
`, {filePath: 'test/fixture/clean-ts/src/index.ts'})
  expect(result.messages.map(message => message.ruleId)).toContain('unicorn/no-unnecessary-default-arguments')
}, timeout)
test('overbroad Promise preferences are disabled', () => {
  expect(typescriptConfig.rules?.['promise/prefer-await-to-callbacks']).toBeUndefined()
  expect(typescriptConfig.rules?.['promise/prefer-await-to-then']).toBeUndefined()
})
test('additional TypeScript rules are enabled', () => {
  for (const ruleId of additionalTypescriptRuleIds) {
    expect(typescriptConfig.rules?.[ruleId]).toEqual(['warn'])
  }
  expect(typescriptConfig.rules?.['typescript/await-thenable']).toBeUndefined()
  expect(typescriptConfig.rules?.['unicorn/consistent-conditional-object-spread']).toEqual(['warn', 'ternary'])
  expect(typescriptConfig.settings?.perfectionist).toEqual({type: 'natural'})
  expect(typescriptConfig.rules?.['perfectionist/sort-jsx-props']).toEqual([
    'warn',
    {
      type: 'natural',
      groups: ['key', 'id', 'className', 'if', 'some', 'all', 'not', 'none', 'then', 'else', 'normal', 'ref', 'event', 'children'],
      customGroups: [
        {
          groupName: 'key',
          elementNamePattern: '^key$',
        },
        {
          groupName: 'id',
          elementNamePattern: '^id$',
        },
        {
          groupName: 'className',
          elementNamePattern: '^className$',
        },
        {
          groupName: 'if',
          elementNamePattern: '^if$',
        },
        {
          groupName: 'some',
          elementNamePattern: '^some$',
        },
        {
          groupName: 'all',
          elementNamePattern: '^all$',
        },
        {
          groupName: 'not',
          elementNamePattern: '^not$',
        },
        {
          groupName: 'none',
          elementNamePattern: '^none$',
        },
        {
          groupName: 'then',
          elementNamePattern: '^then$',
        },
        {
          groupName: 'else',
          elementNamePattern: '^else$',
        },
        {
          groupName: 'normal',
          elementNamePattern: '^(?!(?:key|id|className|if|some|all|not|none|then|else|ref|children|on[A-Z].*)$)',
        },
        {
          groupName: 'ref',
          elementNamePattern: '^ref$',
        },
        {
          groupName: 'event',
          elementNamePattern: '^on[A-Z]',
        },
        {
          groupName: 'children',
          elementNamePattern: '^children$',
        },
      ],
      useConfigurationIf: {
        tagMatchesPattern: '^Branch$',
      },
    },
    {
      type: 'natural',
      groups: ['key', 'id', 'className', 'normal', 'ref', 'event', 'children'],
      customGroups: [
        {
          groupName: 'key',
          elementNamePattern: '^key$',
        },
        {
          groupName: 'id',
          elementNamePattern: '^id$',
        },
        {
          groupName: 'className',
          elementNamePattern: '^className$',
        },
        {
          groupName: 'normal',
          elementNamePattern: '^(?!(?:key|id|className|ref|children|on[A-Z].*)$)',
        },
        {
          groupName: 'ref',
          elementNamePattern: '^ref$',
        },
        {
          groupName: 'event',
          elementNamePattern: '^on[A-Z]',
        },
        {
          groupName: 'children',
          elementNamePattern: '^children$',
        },
      ],
    },
  ])
})
test('Zod rules are enabled', () => {
  for (const ruleId of zodRuleIds) {
    expect(typescriptConfig.rules?.[ruleId]).toEqual(['warn'])
  }
  expect(typescriptConfig.rules?.['zod/no-string-schema-with-uuid']).toBeUndefined()
})
test('additional React rules are enabled', () => {
  for (const ruleId of additionalReactRuleIds) {
    expect(reactConfig.rules?.[ruleId]).toEqual(['warn'])
  }
})
test('clean TypeScript source produces no issues', async () => {
  const result = await lintFixture('clean-ts', typescriptConfig)
  const issues = result.results.flatMap(fileResult => fileResult.messages.map(message => ({
    column: message.column,
    filePath: fileResult.filePath,
    line: message.line,
    message: message.message,
    ruleId: message.ruleId,
  })))
  expect(issues).toEqual([])
  expect(result.errorCount).toBe(0)
  expect(result.warningCount).toBe(0)
}, timeout)
test('semicolons trigger stylistic/semi', async () => {
  const result = await lintFixture('violations-ts', typescriptConfig, {pattern: 'src/semicolons.ts'})
  expect(result.ruleIds).toContain('stylistic/semi')
}, timeout)
test('double quotes trigger stylistic/quotes', async () => {
  const result = await lintFixture('violations-ts', typescriptConfig, {pattern: 'src/double-quotes.ts'})
  expect(result.ruleIds).toContain('stylistic/quotes')
}, timeout)
test('var declaration triggers no-var', async () => {
  const result = await lintFixture('violations-ts', typescriptConfig, {pattern: 'src/mutable-binding.ts'})
  expect(result.ruleIds).toContain('no-var')
}, timeout)
test('non-reassigned let triggers prefer-const', async () => {
  const result = await lintFixture('violations-ts', typescriptConfig, {pattern: 'src/prefer-const.ts'})
  expect(result.ruleIds).toContain('prefer-const')
}, timeout)
test('TypeScript wrapper object types trigger typescript/no-wrapper-object-types', async () => {
  const result = await lintFixture('violations-ts', typescriptConfig, {pattern: 'src/wrapper-types.ts'})
  expect(result.ruleIds).toContain('typescript/no-wrapper-object-types')
}, timeout)
test('unsorted imports trigger perfectionist/sort-imports', async () => {
  const result = await lintFixture('violations-ts', typescriptConfig, {pattern: 'src/unsorted-imports.ts'})
  expect(result.ruleIds).toContain('perfectionist/sort-imports')
}, timeout)
test('selected react rules are enabled', () => {
  for (const ruleId of eslintReactRuleIds) {
    expect(reactConfig.rules?.[ruleId]).toEqual(['warn'])
  }
})
test('clean React source produces no issues', async () => {
  const result = await lintFixture('react', reactConfig, {pattern: 'src/clean.tsx'})
  expect(result.errorCount).toBe(0)
  expect(result.warningCount).toBe(0)
}, timeout)
test('React list items without keys trigger react/no-missing-key', async () => {
  const result = await lintFixture('react', reactConfig, {pattern: 'src/missing-key.tsx'})
  expect(result.ruleIds).toContain('react/no-missing-key')
}, timeout)
test('conditional hooks trigger react-hooks/rules-of-hooks', async () => {
  const result = await lintFixture('react', reactConfig, {pattern: 'src/conditional-hook.tsx'})
  expect(result.ruleIds).toContain('react-hooks/rules-of-hooks')
}, timeout)
test('react/dom-no-unknown-property is disabled', () => {
  expect(reactConfig.rules?.['react/dom-no-unknown-property']).toBeUndefined()
})
test('double-quoted JSX attributes trigger stylistic/jsx-quotes', async () => {
  const result = await lintFixture('react', reactConfig, {pattern: 'src/double-quotes.tsx'})
  expect(result.ruleIds).toContain('stylistic/jsx-quotes')
}, timeout)
test('non-self-closing empty components trigger stylistic/jsx-self-closing-comp', async () => {
  const result = await lintFixture('react', reactConfig, {pattern: 'src/non-self-closing.tsx'})
  expect(result.ruleIds).toContain('stylistic/jsx-self-closing-comp')
}, timeout)
test('clean JSON source produces no issues', async () => {
  const result = await lintFixture('clean-json', jsonConfig, {pattern: 'data.json'})
  expect(result.errorCount).toBe(0)
  expect(result.warningCount).toBe(0)
}, timeout)
test('clean YAML source produces no issues', async () => {
  const result = await lintFixture('clean-yaml', yamlConfig, {pattern: 'config.yml'})
  expect(result.errorCount).toBe(0)
  expect(result.warningCount).toBe(0)
}, timeout)
