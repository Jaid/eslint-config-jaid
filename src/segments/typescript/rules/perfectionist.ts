import type {Linter} from 'eslint'

const warn = 'warn'
const objectKeySeries = (...keys: Array<string>) => ({
  type: 'natural',
  groups: keys,
  customGroups: Object.fromEntries(keys.map(key => [key, `^${key}$`])),
  useConfigurationIf: {
    allNamesMatchPattern: `^(${keys.join('|')})$`,
  },
})

export const perfectionistRules = (): Linter.Config['rules'] => ({
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
})
