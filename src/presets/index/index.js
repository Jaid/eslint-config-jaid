import path from "node:path"
import {fileURLToPath} from "node:url"

import readFileYaml from "read-file-yaml"

const dirName = path.dirname(fileURLToPath(import.meta.url))
const baseConfig = await readFileYaml.default(path.join(dirName, "config.yml"))

export default {
  publishimoConfig: {
    name: "eslint-config-jaid",
    fetchGithub: true,
  },
  includedDependencies: [
    "@typescript-eslint/parser",
    "@typescript-eslint/eslint-plugin",
    "eslint-plugin-node",
    "eslint-plugin-promise",
    "eslint-plugin-unicorn",
    "eslint-plugin-import",
    "eslint-plugin-simple-import-sort",
    "eslint-plugin-you-dont-need-lodash-underscore",
  ],
  rules: [
    "es",
    "style",
    "promise",
    "node",
    "unicorn",
    "unicorn-node",
    "import",
    "simple-import-sort",
    "lodash",
  ],
  extend: ["plugin:you-dont-need-lodash-underscore/all-warn"],
  config: baseConfig,
}