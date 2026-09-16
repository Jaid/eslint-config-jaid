import type {Ruleset} from '../../../lib/unpackRuleset.ts'

export const zodRules = (): Ruleset => ({
  id: 'zod',
  warn: {
    arrayStyle: [],
    noEmptyCustomSchema: [],
    noNumberSchemaWithFinite: [],
    noNumberSchemaWithInt: [],
    noNumberSchemaWithIsFinite: [],
    noNumberSchemaWithIsInt: [],
    noNumberSchemaWithSafe: [],
    noNumberSchemaWithStep: [],
    noOptionalAndDefaultTogether: [],
    noPromiseSchema: [],
    noSchemaWithIsNullable: [],
    noSchemaWithIsOptional: [],
    noStringSchemaWithUuid: [],
    preferEnumOverLiteralUnion: [],
    preferLooseObject: [],
    preferMetaLast: [],
    preferStrictObject: [],
    preferTopLevelStringFormats: [],
    preferTrimBeforeStringLengthChecks: [],
  },
})
