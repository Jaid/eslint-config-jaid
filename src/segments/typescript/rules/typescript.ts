import type {Ruleset} from 'lib/unpackRuleset.ts'

export const typescriptRules = (): Ruleset => ({
  id: 'typescript',
  warn: {
    preferFunctionType: [],
    noWrapperObjectTypes: [],
    noExtraNonNullAssertion: [],
    noDuplicateTypeConstituents: [],
    banTsComment: {
      'ts-expect-error': {descriptionFormat: '^ +(ts\\(\\d+\\)|TS\\d+)( .+$|$)'},
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
    noRedeclare: [],
    noRestrictedImports: [
      {
        name: 'lodash',
        message: 'Use lodash-es',
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
})
