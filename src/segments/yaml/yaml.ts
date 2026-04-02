import type {Linter} from 'eslint'

import yamlPlugin from 'eslint-plugin-yml'
import * as parser from 'yaml-eslint-parser'

import ignores from '../../ignores.ts'
import {unpackRuleset} from '../../lib/unpackRuleset.ts'
import {yamlRules} from './rules/yaml.ts'

const config: Linter.Config = {
  plugins: {
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
