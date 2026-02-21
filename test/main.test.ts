import {expect, test} from 'bun:test'

import jsonConfig from 'src/segments/json/json.ts'
import typescriptConfig from 'src/segments/typescript/typescript.ts'
import yamlConfig from 'src/segments/yaml/yaml.ts'

import {lintFixture} from './lib/lintFixture.ts'

const timeout = 60_000

test('clean TypeScript source produces no issues', async () => {
  const result = await lintFixture('clean-ts', typescriptConfig)
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
