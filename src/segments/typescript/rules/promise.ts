import type {Ruleset} from 'lib/unpackRuleset.ts'

export const promiseRules = (): Ruleset => ({
  id: 'promise',
  warn: {
    catchOrReturn: [],
    noCallbackInPromise: [],
    noMultipleResolved: [],
    noPromiseInCallback: [],
    noReturnInFinally: [],
    noReturnWrap: [],
    paramNames: [],
    preferAwaitToCallbacks: [],
    preferAwaitToThen: [],
  },
})
