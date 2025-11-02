import type {Ruleset} from 'lib/unpackRuleset.ts'

const objectKeySeries = (...keys: Array<string>) => ({
  type: 'natural',
  groups: keys,
  customGroups: Object.fromEntries(keys.map(key => [key, `^${key}$`])),
  useConfigurationIf: {
    allNamesMatchPattern: `^(${keys.join('|')})$`,
  },
})

export const perfectionistRules = (): Ruleset => ({
  id: 'perfectionist',
  warn: {
    sortClasses: {
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
    sortEnums: {
      type: 'natural',
    },
    sortImports: {
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
        type: {
          'internal-with-shortcut-type': 'internal-with-shortcut',
        },
        value: {
          node: '^(bun|node):.+',
          'internal-with-shortcut': [
            '^src/.+',
            '^lib/.+',
            '^component/.+',
            '^components/.+',
          ],
        },
      },
    },
    sortInterfaces: {
      type: 'natural',
    },
    sortNamedExports: {
      type: 'natural',
    },
    sortNamedImports: {
      type: 'natural',
    },
    sortObjectTypes: {
      type: 'natural',
    },
    sortDecorators: {
      type: 'natural',
    },
    sortHeritageClauses: {
      type: 'natural',
    },
    sortUnionTypes: {
      type: 'natural',
      groups: [
        'unknown',
        'literal',
        'keyword',
        'nullish',
      ],
    },
    sortObjects: [
      objectKeySeries('r', 'g', 'b'),
      objectKeySeries('x', 'y', 'z'),
      objectKeySeries('width', 'height'),
      objectKeySeries('id', 'identifier', 'key', 'uuid', 'type', 'name', 'title', 'value', 'description'),
      objectKeySeries('createdAt', 'updatedAt', 'deletedAt'),
      objectKeySeries('before', 'after'),
      objectKeySeries('from', 'to'),
      objectKeySeries('min', 'minimum', 'max', 'maximum'),
      objectKeySeries('in', 'input', 'out', 'output'),
      objectKeySeries('top', 'bottom', 'left', 'right'),
      {
        type: 'unsorted',
      },
    ],
    sortModules: {
      customGroups: [
        {
          groupName: 'typescript',
          anyOf: [
            {
              selector: 'interface',
            },
            {
              selector: 'type',
            },
            {
              selector: 'enum',
            },
          ],
          type: 'unsorted',
        },
        {
          groupName: 'functionImplementations',
          anyOf: [
            {
              selector: 'function',
            },
          ],
          type: 'unsorted',
        },
        {
          groupName: 'classImplementations',
          anyOf: [
            {
              selector: 'class',
            },
          ],
          type: 'unsorted',
        },
      ],
    },
    sortExports: {
      type: 'natural',
    },
  },
})
