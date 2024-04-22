import parser from "jsonc-eslint-parser"
import jsonPlugin from "eslint-plugin-jsonc"
import ignores from "src/ignores.js"
import jsonConfig from "src/segments/json/json.js"

type FlatConfig = import("eslint").Linter.FlatConfig

const config: FlatConfig = {
  plugins: {
    // @ts-expect-error TS2322
    json: jsonPlugin
  },
  ignores,
  files: ["**/*.jsonc"],
  languageOptions: {
    parser,
    parserOptions: {
      jsonSyntax: "JSONC"
    }
  },
  name: "eslint-config-jaid/jsonc",
  rules: jsonConfig.rules
}

export default config
