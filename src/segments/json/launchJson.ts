import type {Linter} from 'eslint'

import jsonPlugin from 'eslint-plugin-jsonc'
import parser from 'jsonc-eslint-parser'

import ignores from 'src/ignores.js'
import jsonConfig from 'src/segments/json/json.js'

const config: Linter.Config = {
  plugins: {
    // @ts-expect-error TS2322
    json: jsonPlugin,
  },
  ignores,
  files: ['**/.vscode/launch.json'],
  languageOptions: {
    parser,
    parserOptions: {
      jsonSyntax: 'JSON',
    },
  },
  name: 'eslint-config-jaid/launchJson',
  rules: {
    ...jsonConfig.rules,
    'json/sort-keys': [
      'warn',
      {
        pathPattern: '^$',
        order: [
          'version',
          'configurations',
        ],
      },
      {
        pathPattern: '^configurations\\[\\d+\\]$',
        order: [
          'name',
          'request',
          'type',
          'args',
          'preLaunchTask',
        ],
      },
    ],
  },
}

export default config
