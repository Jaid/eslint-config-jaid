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
    `@typescript-eslint/eslint-plugin`,
    `eslint-plugin-n`,
    `eslint-plugin-promise`,
    `eslint-plugin-unicorn`,
    `eslint-plugin-i`,
    `eslint-plugin-simple-import-sort`,
    `eslint-plugin-you-dont-need-lodash-underscore`,
    `eslint-plugin-import-quotes`,
    `eslint-import-resolver-typescript`,
    `eslint-import-resolver-node`,
    `eslint-plugin-regexp`,
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
  ],
  extend: [`plugin:you-dont-need-lodash-underscore/all-warn`],
  config: baseConfig,
}
