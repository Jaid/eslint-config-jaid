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
      domNoUseFormState: [],
      domNoVoidElementsWithChildren: [],
      jsxNoChildrenProp: [],
      jsxNoCommentTextnodes: [],
      jsxNoKeyAfterSpread: [],
      jsxNoUselessFragment: [],
      noContextProvider: [],
      noDirectMutationState: [],
      noDuplicateKey: [],
      noForwardRef: [],
      noMissingKey: [],
      noNestedComponentDefinitions: [],
      noUnstableDefaultProps: [],
      noUseContext: [],
      useMemo: [],
      useState: [],
      webApiNoLeakedEventListener: [],
      webApiNoLeakedFetch: [],
    },
  }
}
