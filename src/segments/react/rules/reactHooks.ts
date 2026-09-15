import type {Ruleset} from '../../../lib/unpackRuleset.ts'

export const reactHooksRules = (): Ruleset => {
  return {
    id: 'react-hooks',
    warn: {
      exhaustiveDeps: [],
      immutability: [],
      purity: [],
      refs: [],
      rulesOfHooks: [],
      setStateInEffect: [],
      setStateInRender: [],
      staticComponents: [],
    },
  }
}
