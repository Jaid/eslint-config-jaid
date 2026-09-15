import {expect, test} from 'bun:test'

import {makeEslintConfig} from '../src/main.ts'
import jsonConfig from '../src/segments/json/json.ts'
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
] as const
const eslintReactRuleIds = [
  'react/no-context-provider',
  'react/no-duplicate-key',
  'react/no-use-context',
  'react/use-memo',
  'react/use-state',
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
  'perfectionist/sort-jsx-props',
  'import/no-commonjs',
  'unicorn/prefer-group-by',
  'unicorn/prefer-promise-try',
  'unicorn/prefer-get-or-insert-computed',
  'unicorn/prefer-iterator-to-array',
  'unicorn/prefer-uint8array-base64',
  'typescript/no-useless-default-assignment',
  'typescript/no-unnecessary-type-conversion',
  'typescript/no-unnecessary-type-parameters',
  'typescript/await-thenable',
  'typescript/no-misused-spread',
  'regex/no-unused-capturing-group',
  'perfectionist/sort-array-includes',
  'perfectionist/sort-import-attributes',
  'perfectionist/sort-export-attributes',
  'unicorn/prefer-includes-over-repeated-comparisons',
  'unicorn/no-boolean-sort-comparator',
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
test('modern Unicorn rules are enabled', () => {
  for (const ruleId of modernUnicornRuleIds) {
    expect(typescriptConfig.rules?.[ruleId]).toEqual(['warn'])
  }
})
test('additional TypeScript rules are enabled', () => {
  for (const ruleId of additionalTypescriptRuleIds) {
    expect(typescriptConfig.rules?.[ruleId]).toEqual(['warn'])
  }
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
test('unknown DOM properties trigger react/dom-no-unknown-property', async () => {
  const result = await lintFixture('react', reactConfig, {pattern: 'src/unknown-property.tsx'})
  expect(result.ruleIds).toContain('react/dom-no-unknown-property')
}, timeout)
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
