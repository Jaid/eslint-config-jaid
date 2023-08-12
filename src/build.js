import path from "node:path"
import {fileURLToPath, pathToFileURL} from "node:url"

import chalk from "chalk"
import {emp} from "emp"
import {includeKeys} from "filter-obj"
import jsYaml from "js-yaml"
import {countSizeSync} from "list-dir-content-size"
import {pick} from "lodash-es"
import prettyBytes from "pretty-bytes"
import sortKeys from "sort-keys"

import fs from "./lib/esm/fs-extra.js"
import publishimo from "./lib/esm/publishimo.js"

const pkg = await fs.readJson("package.json")
const dirName = path.dirname(fileURLToPath(import.meta.url))

const presets = await fs.readdir(path.join(dirName, "presets"))

const jobs = presets.map(async preset => {
  const importUrl = pathToFileURL(path.resolve(dirName, "presets", preset, "index.js")).toString()
  const {default: importedModule} = await import(importUrl)
  const {includedDependencies, rules, config, extend, publishimoConfig} = importedModule
  const buildPath = path.resolve(dirName, "..", "dist", "build", preset)
  await fs.ensureDir(buildPath)
  await emp(buildPath)
  const appliedRules = {}
  for (const rule of rules) {
    const yamlString = await fs.readFile(path.join(dirName, "rules", `${rule}.yml`), "utf8")
    const minifiedYamlString = yamlString
      .replaceAll("OFF", "0")
      .replaceAll("WARN", "1")
      .replaceAll("ERROR", "2")
    const loadedRules = jsYaml.load(minifiedYamlString)
    Object.assign(appliedRules, loadedRules)
  }
  const eslintConfig = sortKeys({
    ...config,
    extends: extend,
    rules: sortKeys(appliedRules),
  })
  await fs.outputJson(path.join(buildPath, "index.json"), eslintConfig)
  const dependencies = includeKeys(pkg.dependencies, key => includedDependencies.includes(key))
  const {generatedPkg} = await publishimo({
    ...pick(pkg, ["license", "version", "author", "repository", "peerDependencies"]),
    ...publishimoConfig,
    dependencies: sortKeys(dependencies),
    main: "index.json",
  })
  await fs.outputJson(path.join(buildPath, "package.json"), generatedPkg)
  await fs.copyFile(path.join(dirName, "..", "license.txt"), path.join(buildPath, "license.txt"))
  await fs.copyFile(path.join(dirName, "..", "readme.md"), path.join(buildPath, "readme.md"))
  console.log(`${chalk.green(publishimoConfig.name)} ${prettyBytes(countSizeSync(buildPath))}`)
})

await Promise.all(jobs)