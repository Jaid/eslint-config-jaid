import type {Ruleset} from '../../../lib/unpackRuleset.ts'

export const eslintReactRules = (): Ruleset => {
  return {
    id: '@eslint-react',
    warn: {
      domNoDangerouslySetInnerhtmlWithChildren: [],
      domNoFindDomNode: [],
      domNoMissingButtonType: [],
      domNoRenderReturnValue: [],
      domNoStringStyleProp: [],
      domNoUnknownProperty: [],
      domNoUnsafeTargetBlank: [],
      domNoVoidElementsWithChildren: [],
      jsxNoCommentTextnodes: [],
      jsxNoChildrenProp: [],
      noDirectMutationState: [],
      noMissingKey: [],
      noNestedComponentDefinitions: [],
      noStringRefs: [],
    },
  }
}
