import parser from 'yaml-eslint-parser'
import yamlPlugin from 'eslint-plugin-yml'
import type {ESLint} from 'eslint'
import ignores from "src/ignores.js"

type FlatConfig = import('eslint').Linter.FlatConfig

const config: FlatConfig = {
  plugins: {
    yaml: yamlPlugin as ESLint.Plugin
  },
  ignores,
  files: ["*.yml", "*.yaml"],
  languageOptions: {
    parser
  },
  name: "eslint-config-jaid/yaml",
  rules: {
    "yaml/block-mapping": "warn",
    "yaml/block-mapping-colon-indicator-newline": "warn",
    "yaml/block-sequence": "warn",
    "yaml/block-sequence-hyphen-indicator-newline": [
      "warn",
      "never",
      {
        nestedHyphen: "never"
      }
    ],
    "yaml/flow-sequence-bracket-spacing": "warn",
    "yaml/indent": [
      "warn",
      2,
      {
        indentBlockSequences: false
      }
    ],
    "yaml/key-spacing": "warn",
    "yaml/no-multiple-empty-lines": [
      "warn",
      {
        max: 1,
        maxBOF: 0,
        maxEOF: 1
      }
    ],
    "yaml/no-tab-indent": "warn",
    "yaml/no-trailing-zeros": "warn",
    "yaml/plain-scalar": "warn",
    "yaml/quotes": [
      "warn",
      {
        prefer: "single",
        avoidEscape: true
      }
    ],
    "yaml/spaced-comment": "warn"
  }
}

export default config
