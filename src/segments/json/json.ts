import parser from "jsonc-eslint-parser"
import jsonPlugin from "eslint-plugin-jsonc"
import {extendIgnores} from "src/ignores.js"

type FlatConfig = import("eslint").Linter.FlatConfig

const config: FlatConfig = {
  plugins: {
    // @ts-expect-error TS2322
    json: jsonPlugin
  },
  ignores: extendIgnores("package-lock.json", "package.json"),
  files: ["**/*.json"],
  languageOptions: {
    parser,
    parserOptions: {
      jsonSyntax: "JSON"
    }
  },
  name: "eslint-config-jaid/json",
  rules: {
    "json/auto": "warn",
    "json/no-plus-sign": "warn",
    "json/valid-json-number": "error"
  }
}

export default config
