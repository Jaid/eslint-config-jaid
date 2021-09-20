import chalk from "chalk"
import {emp} from "emp"
import filterObj from "filter-obj"
import fs from "fs-extra"
import jsYaml from "js-yaml"
import {countSizeSync} from "list-dir-content-size"
import {pick} from "lodash"
import path from "path"
import prettyBytes from "pretty-bytes"
import publishimo from "publishimo"
import sortKeys from "sort-keys"

export default class ConfigBuilder {

  /**
   * @typedef {object} Options
   * @prop {string[]} presets
   * @prop {string} rulesFolder
   * @prop {string} presetsFolder
   * @prop {string} outputFolder
   * @prop {object} pkg
   * @prop {object} staticFiles
   */

  /**
   * @type {Options}
   */
  options = null

  /**
   * @param {Options} options
   */
  constructor(options) {
    this.options = {
      presets: ["index"],
      ...options,
    }
  }

  async run() {
    const jobs = this.options.presets.map(async preset => {
      const presetSourceFile = path.join(this.options.presetsFolder, preset)
      const {includedDependencies, rules, config, extend, publishimoConfig} = require(presetSourceFile).default
      const buildPath = path.resolve(this.options.outputFolder, preset)
      fs.ensureDirSync(buildPath)
      await emp(buildPath)
      const appliedRules = {}
      for (const rule of rules) {
        const yamlString = fs.readFileSync(path.join(this.options.rulesFolder, `${rule}.yml`), "utf-8")
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
      const dependencies = filterObj(this.options.pkg.dependencies, key => includedDependencies.includes(key))
      const {generatedPkg} = await publishimo({
        ...pick(this.options.pkg, ["license", "version", "author", "repository", "peerDependencies"]),
        ...publishimoConfig,
        dependencies: sortKeys(dependencies),
        main: "index.json",
      })
      fs.outputJsonSync(path.join(buildPath, "package.json"), generatedPkg)
      for (const [fileName, filePath] of Object.entries(this.options.staticFiles)) {
        fs.copyFileSync(filePath, path.join(buildPath, fileName))
      }
      console.log(`${chalk.green(publishimoConfig.name)} ${prettyBytes(countSizeSync(buildPath))}`)
    })
    await Promise.all(jobs)
  }
}