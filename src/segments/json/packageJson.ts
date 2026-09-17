import type {Linter} from 'eslint'

import jsonPlugin from 'eslint-plugin-jsonc'
import packageJsonPlugin from 'eslint-plugin-package-json'
import * as parser from 'jsonc-eslint-parser'

import ignores from '../../ignores.ts'
import {unpackRuleset} from '../../lib/unpackRuleset.ts'
import jsonConfig from './json.ts'
import {packageJsonRules} from './rules/packageJson.ts'

const config: Linter.Config = {
  plugins: {
    json: jsonPlugin,
    'package-json': packageJsonPlugin,
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
    ...unpackRuleset(packageJsonRules()),
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
          'imports',
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
      {
        pathPattern: '^contributes\.commands\\[\\d+\\]$',
        order: [
          'command',
          'title',
          'shortTitle',
          {
            order: {
              type: 'asc',
              natural: true,
            },
          },
        ],
      },
      {
        pathPattern: '^contributes\.configuration\.properties\\["[\\w\\.-]+"\\]$',
        order: [
          'title',
          'type',
          'items',
          'default',
          'minimum',
          'maximum',
          'enum',
          'enumItemLabels',
          'enumDescriptions',
          'description',
          'markdownDescription',
          {
            order: {
              type: 'asc',
              natural: true,
            },
          },
        ],
      },
    ],
  },
}

export default config
