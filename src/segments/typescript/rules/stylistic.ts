import type {Ruleset} from '../../../lib/unpackRuleset.ts'

export const stylisticRules = (): Ruleset => {
  return {
    id: 'stylistic',
    warn: {
      curlyNewline: [],
      typeNamedTupleSpacing: [],
      // typeGenericSpacing: [], // BLOCKEDBY currently not working: `const set = new Set<string>\nconsole.dir(set)` gets merged into one line
      nonblockStatementBodyPosition: 'below',
      multilineTernary: 'never',
      blockSpacing: [],
      multilineCommentStyle: 'separate-lines',
      braceStyle: [],
      commaSpacing: [],
      functionCallSpacing: [],
      indent: [
        2,
        {
          ignoreComments: true,
        },
      ],
      keySpacing: [],
      keywordSpacing: [],
      listStyle: {
        empty: 'never',
        overrides: {
          '{}': {
            singleLine: {
              spacing: 'never',
            },
          },
          ObjectExpression: {
            singleLine: {
              maxItems: 1,
            },
          },
          TSInterfaceBody: {
            singleLine: {
              maxItems: 1,
            },
          },
          TSTypeLiteral: {
            singleLine: {
              maxItems: 1,
            },
          },
        },
      },
      paddingLineBetweenStatements: [
        {
          blankLine: 'never',
          prev: '*',
          next: '*',
        },
        {
          blankLine: 'any',
          prev: 'import',
          next: '*',
        },
        {
          blankLine: 'any',
          prev: '*',
          next: 'export',
        },
        {
          blankLine: 'any',
          prev: 'import',
          next: 'type',
        },
        {
          blankLine: 'any',
          prev: 'type',
          next: '*',
        },
        {
          blankLine: 'any',
          prev: '*',
          next: 'type',
        },
        {
          blankLine: 'any',
          prev: 'type',
          next: 'type',
        },
        {
          blankLine: 'any',
          prev: 'export',
          next: '*',
        },
      ],
      quotes: [
        'single',
        {
          avoidEscape: true,
        },
      ],
      spaceBeforeBlocks: [],
      spaceBeforeFunctionParen: {
        anonymous: 'always',
        named: 'never',
        asyncArrow: 'always',
      },
      spaceInfixOps: [],
      memberDelimiterStyle: {
        singleline: {
          delimiter: 'comma',
          requireLast: false,
        },
        multiline: {
          delimiter: 'none',
          requireLast: false,
        },
      },
      typeAnnotationSpacing: [],
      arrowParens: 'as-needed',
      arrowSpacing: [],
      commaDangle: {
        arrays: 'always-multiline',
        objects: 'always-multiline',
        imports: 'always-multiline',
        exports: 'always-multiline',
        functions: 'always-multiline',
        enums: 'always-multiline',
        generics: 'always-multiline',
        tuples: 'always-multiline',
      },
      commaStyle: [],
      computedPropertySpacing: [],
      dotLocation: 'property',
      eolLast: [],
      implicitArrowLinebreak: [],
      linebreakStyle: 'unix',
      newParens: 'never',
      noExtraParens: [],
      noFloatingDecimal: [],
      noMultipleEmptyLines: {
        max: 1,
        maxEOF: 1,
        maxBOF: 0,
      },
      noTabs: [],
      noTrailingSpaces: [],
      noWhitespaceBeforeProperty: [],
      operatorLinebreak: 'before',
      paddedBlocks: 'never',
      quoteProps: 'as-needed',
      restSpreadSpacing: [],
      spaceInParens: [],
      spaceUnaryOps: [],
      spacedComment: [],
      switchColonSpacing: [],
      templateCurlySpacing: [],
      templateTagSpacing: [],
      yieldStarSpacing: [],
      generatorStarSpacing: [],
      maxStatementsPerLine: [],
      noConfusingArrow: [],
      noMultiSpaces: [],
      semi: 'never',
    },
  }
}
