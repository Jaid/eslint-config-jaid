import chalk from "chalk"
import {emp} from "emp"
import filterObj from "filter-obj"
import fs from "fs-extra"
import jsYaml from "js-yaml"
import {countSizeSync} from "list-dir-content-size"
import {pick} from "lodash-es"
import path from "path"
import prettyBytes from "pretty-bytes"
import publishimo from "./lib/esm/publishimo.js"
import sortKeys from "sort-keys"
import {fileURLToPath} from "node:url"

const pkg = await fs.readJson("package.json")
const dirName = path.dirname(fileURLToPath(import.meta.url))

const presets = fs.readdirSync(path.join(dirName, "presets"))

const jobs = presets.map(async preset => {
  const {default: importedModule} = await import(`./presets/${preset}/index.js`)
  const {includedDependencies, rules, config, extend, publishimoConfig} = importedModule
  const buildPath = path.resolve(dirName, "..", "dist", "build", preset)
  fs.ensureDirSync(buildPath)
  await emp(buildPath)
  const appliedRules = {}
  for (const rule of rules) {
    const yamlString = fs.readFileSync(path.join(dirName, "rules", `${rule}.yml`), "utf-8")
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
  fs.outputJsonSync(path.join(buildPath, "index.json"), eslintConfig)
  const dependencies = filterObj(pkg.dependencies, key => includedDependencies.includes(key))
  const {generatedPkg} = await publishimo({
    ...pick(pkg, ["license", "version", "author", "repository", "peerDependencies"]),
    ...publishimoConfig,
    dependencies: sortKeys(dependencies),
    main: "index.json",
  })
  fs.outputJsonSync(path.join(buildPath, "package.json"), generatedPkg)
  fs.copyFileSync(path.join(dirName, "..", "license.txt"), path.join(buildPath, "license.txt"))
  fs.copyFileSync(path.join(dirName, "..", "readme.md"), path.join(buildPath, "readme.md"))
  console.log(`${chalk.green(publishimoConfig.name)} ${prettyBytes(countSizeSync(buildPath))}`)
})

Promise.all(jobs).catch(error => {
  console.error(error)
})