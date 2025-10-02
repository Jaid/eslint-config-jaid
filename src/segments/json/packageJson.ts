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
  files: ['**/package.json'],
  languageOptions: {
    parser,
    parserOptions: {
      jsonSyntax: 'JSON',
    },
  },
  name: 'eslint-config-jaid/packageJson',
  rules: {
    ...jsonConfig.rules,
    'json/sort-keys': [
      'warn',
      {
        pathPattern: '^$',
        order: [
          'name',
          'displayName',
          'version',
          'type',
          'private',
          'description',
          'keywords',
          'author',
          'publisher',
          'homepage',
          'bugs',
          'funding',
          'sponsor',
          'license',
          'repository',
          'main',
          'exports',
          'bin',
          'extensionKind',
          'capabilities',
          'activationEvents',
          'contributes',
          'preview',
          'extensionPack',
          'pricing',
          'categories',
          'icon',
          'galleryBanner',
          'markdown',
          'scripts',
          'wireit',
          'dependencies',
          'peerDependencies',
          'peerDependenciesMeta',
          'optionalDependencies',
          'bundledDependencies',
          'devDependencies',
          {
            order: {
              type: 'asc',
              natural: true,
            },
          },
          'os',
          'cpu',
          'engines',
        ],
      },
      {
        pathPattern: '^dependencies|peerDependencies|optionalDependencies|bundledDependencies|devDependencies|peerDependenciesMeta$',
        order: {
          type: 'asc',
          natural: true,
        },
      },
      {
        pathPattern: '^scripts|wireit$',
        order: {
          type: 'asc',
          natural: true,
        },
      },
      {
        pathPattern: '^engines$',
        order: {
          type: 'asc',
          natural: true,
        },
      },
    ],
  },
}

export default config
