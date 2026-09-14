import type {Ruleset} from '../../../lib/unpackRuleset.ts'

export const reactRules = (): Ruleset => {
  return {
    id: 'react',
    warn: {
      buttonHasType: [],
      checkedRequiresOnchangeOrReadonly: [],
      jsxKey: [],
      jsxNoCommentTextnodes: [],
      jsxNoDuplicateProps: [],
      jsxNoLeakedRender: [],
      jsxNoTargetBlank: [],
      jsxPascalCase: [],
      jsxUsesVars: [],
      noChildrenProp: [],
      noDangerWithChildren: [],
      noDeprecated: [],
      noDirectMutationState: [],
      noFindDomNode: [],
      noIsMounted: [],
      noRenderReturnValue: [],
      noStringRefs: [],
      noUnknownProperty: [],
      requireRenderReturn: [],
      selfClosingComp: [],
      stylePropObject: [],
      voidDomElementsNoChildren: [],
    },
  }
}
