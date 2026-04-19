import type {OutputOptions, RolldownOptions} from 'rolldown'

import {buildConfig} from 'rollup-config-factory'

const supportedGeneratedCodeKeys = [
  'preset',
  'profilerNames',
  'symbols',
] as const satisfies Array<keyof NonNullable<OutputOptions['generatedCode']>>
const removeRolldownIncompatibleOutputOptions = (output: OutputOptions) => {
  const generatedCode = output.generatedCode
  if (!generatedCode) {
    return output
  }
  // rollup-config-factory still emits Rollup-only generatedCode flags that Rolldown rejects.
  const supportedGeneratedCode = Object.fromEntries(supportedGeneratedCodeKeys
    .map(key => [key, generatedCode[key]] as const)
    .filter((entry): entry is [typeof entry[0], NonNullable<typeof entry[1]>] => entry[1] !== undefined))
  if (Object.keys(supportedGeneratedCode).length === 0) {
    delete output.generatedCode
    return output
  }
  output.generatedCode = supportedGeneratedCode
  return output
}
const config = await buildConfig() as RolldownOptions
if (Array.isArray(config.output)) {
  config.output = config.output.map(output => removeRolldownIncompatibleOutputOptions(output))
} else if (config.output) {
  config.output = removeRolldownIncompatibleOutputOptions(config.output)
}

export default config
