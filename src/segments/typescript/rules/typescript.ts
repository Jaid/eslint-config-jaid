import type {Ruleset} from 'lib/unpackRuleset.ts'

export const typescriptRules = (): Ruleset => {
  return {
    id: 'typescript',
    warn: {
      preferFunctionType: [],
      noWrapperObjectTypes: [],
      noExtraNonNullAssertion: [],
      noDuplicateTypeConstituents: [],
      banTsComment: {
        'ts-expect-error': {descriptionFormat: String.raw`^ +(ts\(\d+\)|TS\d+)( .+$|$)`},
        'ts-ignore': true,
        'ts-nocheck': false,
        'ts-check': false,
      },
      noBaseToString: [],
      noMisusedPromises: [],
      noNonNullAssertedNullishCoalescing: [],
      noNonNullAssertedOptionalChain: [],
      noRedundantTypeConstituents: [],
      noUnnecessaryBooleanLiteralCompare: [],
      noUnnecessaryCondition: {
        allowConstantLoopConditions: true,
      },
      noUnnecessaryQualifier: [],
      noUnnecessaryTypeArguments: [],
      noUnnecessaryTypeAssertion: [],
      noUnnecessaryTypeConstraint: [],
      noUnsafeArgument: [],
      noUnsafeAssignment: [],
      noUnsafeCall: [],
      noUnsafeDeclarationMerging: [],
      noUnsafeEnumComparison: [],
      noUnsafeMemberAccess: [],
      noUnsafeReturn: [],
      noUnsafeUnaryMinus: [],
      preferIncludes: [],
      preferOptionalChain: [],
      preferReduceTypeParameter: [],
      preferStringStartsEndsWith: [],
      restrictTemplateExpressions: [],
      unboundMethod: {
        ignoreStatic: true,
      },
      dotNotation: [],
      noArrayConstructor: [],
      noDupeClassMembers: [],
      noRestrictedImports: [
        {
          name: 'lodash',
          message: 'Use es-toolkit',
        },
        {
          name: 'ensure-array',
          message: 'Use sure-array',
        },
        {
          name: '@absolunet/fsp',
          message: 'Use fs-extra',
        },
        {
          name: '@absolunet/fss',
          message: 'Use fs-extra',
        },
        {
          name: 'opn',
          message: 'Use open',
        },
        {
          name: 'pify',
          message: 'Use util.promisify',
        },
        {
          name: 'fs/promises',
          message: 'Use fs-extra (more stable)',
        },
        {
          name: 'node:fs/promises',
          message: 'Use fs-extra (more stable)',
        },
        {
          name: 'execall',
          message: 'Use super-regex',
        },
        {
          name: 'js-yaml',
          message: 'Use yaml',
        },
        {
          name: 'jest',
          message: 'Use bun:test',
        },
        {
          name: '@types/jest',
          message: 'Use bun:test',
        },
        {
          name: 'jest-extended',
          message: 'Use bun:test',
        },
        {
          name: 'jest-light-runner',
          message: 'Use bun:test',
        },
        {
          name: 'node:test',
          message: 'Use bun:test',
        },
        {
          name: 'emp',
          message: 'Use fs-extra (emptyDir)',
        },
        {
          name: 'rollup',
          importNames: ['MaybeArray'],
          message: 'Use Arrayable from type-fest',
        },
        {
          name: 'ts-xor',
          message: 'Use Xor from type-fest',
        },
        {
          name: 'delay',
          message: 'Use Bun.sleep() or Bun.sleepSync()',
        },
        {
          name: 'lodash-es',
          message: 'Use es-toolkit',
        },
        {
          name: 'winston',
          message: 'Use pino',
        },
        {
          name: 'got',
          message: 'Use ky',
        },
        {
          name: 'wrap-ansi',
          message: 'Use Bun.wrapAnsi()',
        },
        {
          name: 'strip-ansi',
          message: 'Use Bun.stripAnsi()',
        },
        {
          name: 'uuid',
          message: 'Use nanoid or crypto.randomUUID() or Bun.randomUUIDv7()',
        },
        {
          name: 'string-width',
          message: 'Use Bun.stringWidth()',
        },
      ],
      noShadow: [],
      onlyThrowError: [],
      noUseBeforeDefine: [],
      noUselessConstructor: [],
      preferRegexpExec: [],
      requireArraySortCompare: [],
      returnAwait: [],
      arrayType: {
        default: 'generic',
      },
      classLiteralPropertyStyle: [],
      consistentGenericConstructors: [],
      consistentIndexedObjectStyle: [],
      consistentTypeAssertions: {
        assertionStyle: 'as',
        objectLiteralTypeAssertions: 'allow',
      },
      consistentTypeExports: [],
      consistentTypeImports: {
        prefer: 'type-imports',
        disallowTypeAnnotations: false,
        fixStyle: 'separate-type-imports',
      },
      methodSignatureStyle: [],
      noMeaninglessVoidOperator: [],
      noUnnecessaryTemplateExpression: [],
      preferAsConst: [],
      noDeprecated: [],
      noDuplicateEnumValues: [],
      noArrayDelete: [],
      noFloatingPromises: {
        ignoreVoid: false,
      },
      noImportTypeSideEffects: [],
    },
  }
}
