import parser from "jsonc-eslint-parser"

type FlatConfig = import("eslint").Linter.FlatConfig

const config: FlatConfig = {
  ignores: ["/dist/", "/out/", "/temp/", "/cache/", "/node_modules/"],
  files: ["*.json", "*.json5", "*.jsonc"],
  languageOptions: {
    parser
  },
  name: "eslint-config-jaid/json",
  rules: {
    "jsonc/auto": "warn",
    "jsonc/no-plus-sign": "warn",
    "jsonc/sort-keys": [
      "warn",
      {
        hasProperties: ["type", "name", "version"],
        pathPattern: "^$",
        order: [
          "name",
          "displayName",
          "version",
          "type",
          "private",
          "description",
          "keywords",
          "author",
          "publisher",
          "homepage",
          "bugs",
          "funding",
          "sponsor",
          "license",
          "repository",
          "main",
          "exports",
          "bin",
          "extensionKind",
          "capabilities",
          "activationEvents",
          "contributes",
          "preview",
          "extensionPack",
          "pricing",
          "categories",
          "icon",
          "galleryBanner",
          "markdown",
          "scripts",
          "wireit",
          "dependencies",
          "peerDependencies",
          "peerDependenciesMeta",
          "optionalDependencies",
          "bundledDependencies",
          "devDependencies",
          { order: { type: "asc", natural: true } },
          "os",
          "cpu",
          "engines"
        ]
      },
      {
        hasProperties: ["type", "name", "version"],
        pathPattern: "^dependencies|peerDependencies|optionalDependencies|bundledDependencies|devDependencies|peerDependenciesMeta$",
        order: { type: "asc", natural: true }
      },
      {
        hasProperties: ["type", "name", "version"],
        pathPattern: "^scripts|wireit$",
        order: { type: "asc", natural: true }
      },
      {
        hasProperties: ["type", "name", "version"],
        pathPattern: "^engines$",
        order: { type: "asc", natural: true }
      }
    ],
    "jsonc/valid-json-number": "error"
  }
}

export default config
