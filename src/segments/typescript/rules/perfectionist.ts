import type {Ruleset} from 'lib/unpackRuleset.ts'

const objectKeySeries = (...keys: Array<string>) => {
  return {
    type: 'natural',
    groups: keys,
    customGroups: keys.map(key => ({
      groupName: key,
      elementNamePattern: `^${key}$`,
    })),
    useConfigurationIf: {
      allNamesMatchPattern: `^(${keys.join('|')})$`,
    },
  }
}

export const perfectionistRules = (): Ruleset => {
  return {
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
            'type-parent',
            'type-sibling',
            'type-external',
            'type-internal',
            'internal-with-shortcut-type',
            'type-index',
          ],
          'side-effect',
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
        customGroups: [
          {
            groupName: 'internal-with-shortcut-type',
            elementNamePattern: [
              '^src/.+',
              '^lib/.+',
              '^component/.+',
              '^components/.+',
            ],
            modifiers: ['type'],
          },
          {
            groupName: 'internal-with-shortcut',
            elementNamePattern: [
              '^src/.+',
              '^lib/.+',
              '^component/.+',
              '^components/.+',
            ],
          },
          {
            groupName: 'node',
            elementNamePattern: '^(bun|node):.+',
          },
        ],
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
        groups: [
          'exportedTypes',
          'types',
          'exportedFunctionImplementations',
          'functionImplementations',
          'exportedClassImplementations',
          'classImplementations',
          'unknown',
        ],
        customGroups: [
          {
            groupName: 'exportedTypes',
            anyOf: [
              {
                selector: 'interface',
                modifiers: ['export'],
              },
              {
                selector: 'type',
                modifiers: ['export'],
              },
              {
                selector: 'enum',
                modifiers: ['export'],
              },
            ],
            type: 'unsorted',
          },
          {
            groupName: 'types',
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
            groupName: 'exportedFunctionImplementations',
            anyOf: [
              {
                selector: 'function',
                modifiers: ['export'],
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
            groupName: 'exportedClassImplementations',
            anyOf: [
              {
                selector: 'class',
                modifiers: ['export'],
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
  }
}
