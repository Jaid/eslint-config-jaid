import type {Linter} from 'eslint'
import type {Arrayable} from 'type-fest'

export type Ruleset<RulesGeneric = unknown> = {
  error?: Dict<Arrayable<unknown>>
  id: string
  warn?: Dict<Arrayable<unknown>>
}

export const unpackRuleset = <RulesGeneric = unknown>(configSet: Ruleset<RulesGeneric>): Linter.Config<RulesGeneric>['rules'] => {

}
