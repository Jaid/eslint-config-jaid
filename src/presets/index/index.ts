import path from 'node:path'
import {fileURLToPath} from 'node:url'

import readFileYaml from 'read-file-yaml'

const dirName = path.dirname(fileURLToPath(import.meta.url))
const baseConfig = await readFileYaml.default(path.join(dirName, `config.yml`))

export default {
  publishimoConfig: {
    name: `eslint-config-jaid`,
  },
  includedDependencies: [
    `@typescript-eslint/parser`,
    `eslint-import-resolver-node`,
    `eslint-import-resolver-typescript`,
    `@typescript-eslint/eslint-plugin`,
    `eslint-plugin-i`,
    `eslint-plugin-import-quotes`,
    `eslint-plugin-jsonc`,
    `eslint-plugin-n`,
    `eslint-plugin-promise`,
    `eslint-plugin-regexp`,
    `eslint-plugin-simple-import-sort`,
    `eslint-plugin-unicorn`,
    `eslint-plugin-yml`,
    `eslint-plugin-you-dont-need-lodash-underscore`,
  ],
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
    `simple-import-sort`,
    `import-quotes`,
    `lodash`,
    `regex`,
    `jsonc`,
    `yml`,
  ],
  extend: [`plugin:you-dont-need-lodash-underscore/all-warn`],
  config: baseConfig,
}
