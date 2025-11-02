import type {Linter} from 'eslint'

import yamlPlugin from 'eslint-plugin-yml'
import parser from 'yaml-eslint-parser'

import {unpackRuleset} from 'lib/unpackRuleset.ts'
import ignores from 'src/ignores.js'

import {yamlRules} from './rules/yaml.js'

const config: Linter.Config = {
  plugins: {
    // @ts-expect-error TS2322
    yaml: yamlPlugin,
  },
  ignores,
  files: ['*.yml', '*.yaml'],
  languageOptions: {
    parser,
  },
  name: 'eslint-config-jaid/yaml',
  rules: unpackRuleset(yamlRules()),
}

export default config
