import type {Ruleset} from '../../../lib/unpackRuleset.ts'

export const reactHooksRules = (): Ruleset => {
  return {
    id: 'react-hooks',
    warn: {
      exhaustiveDeps: [],
      rulesOfHooks: [],
    },
  }
}
