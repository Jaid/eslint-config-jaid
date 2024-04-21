import * as path from 'forward-slash-path'
import {fileURLToPath} from 'node:url'

import readFileYaml from 'read-file-yaml'

const dirName = path.dirname(fileURLToPath(import.meta.url))
const baseConfig: Record<string, any> = await readFileYaml.default(path.join(dirName, `config.yml`))

export default {
  config: baseConfig,
  extend: [`plugin:you-dont-need-lodash-underscore/all-warn`],
  includedDependencies: [
    `@typescript-eslint/eslint-plugin`,
    `@typescript-eslint/parser`,
    `eslint-import-resolver-node`,
    `eslint-import-resolver-typescript`,
    `eslint-plugin-i`,
    `eslint-plugin-import-quotes`,
    `eslint-plugin-jsonc`,
    `eslint-plugin-n`,
    `eslint-plugin-perfectionist`,
    `eslint-plugin-promise`,
    `eslint-plugin-regexp`,
    `eslint-plugin-unicorn`,
    `eslint-plugin-yml`,
    `eslint-plugin-you-dont-need-lodash-underscore`,
    `eslint`,
  ],
  publishimoConfig: {
    name: `eslint-config-jaid`,
  },
  rules: [
    `typescript`,
    `typescript-override-eslint`,
    `es`,
    `typescript-style`,
    `style`,
    `promise`,
    `node`,
    `unicorn`,
    `unicorn-node`,
    `import`,
    `import-quotes`,
    `lodash`,
    `regex`,
    `perfectionist`,
    `jsonc`,
    `yml`,
  ],
}
