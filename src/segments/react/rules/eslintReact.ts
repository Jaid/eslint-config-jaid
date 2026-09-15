import type {Ruleset} from '../../../lib/unpackRuleset.ts'

export const eslintReactRules = (): Ruleset => {
  return {
    id: 'react',
    warn: {
      domNoDangerouslySetInnerhtmlWithChildren: [],
      domNoFindDomNode: [],
      domNoMissingButtonType: [],
      domNoRenderReturnValue: [],
      domNoStringStyleProp: [],
      domNoUnknownProperty: [],
      domNoUnsafeTargetBlank: [],
      domNoVoidElementsWithChildren: [],
      jsxNoChildrenProp: [],
      jsxNoCommentTextnodes: [],
      noContextProvider: [],
      noDirectMutationState: [],
      noDuplicateKey: [],
      noMissingKey: [],
      noNestedComponentDefinitions: [],
      noUseContext: [],
      useMemo: [],
      useState: [],
    },
  }
}
