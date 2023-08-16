import path from 'node:path'
import {pathToFileURL} from 'node:url'

import chalk from 'chalk'
import createDebug from 'debug'
import {emp} from 'emp'
import filterObj from 'filter-obj'
import fs from 'fs-extra'
import jsYaml from 'js-yaml'
import {countSizeSync} from 'list-dir-content-size'
import {pick} from 'lodash-es'
import prettyBytes from 'pretty-bytes'
import sortKeys from 'sort-keys'

import publishimo from './lib/esm/publishimo.js'

const debug = createDebug(`eslint-config-jaid`)

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
      presets: [`index`],
      ...options,
    }
  }

  async run() {
    debug(`configBuilder: %O`, this)
    const jobs = this.options.presets.map(async preset => {
      const presetSourceFile = path.join(this.options.presetsFolder, preset, `index.ts`)
      const {default: importedModule} = await import(pathToFileURL(presetSourceFile))
      const {includedDependencies, rules, config, extend, publishimoConfig} = importedModule
      debug(`importedModule: %O`, importedModule)
      const buildPath = path.resolve(this.options.outputFolder, preset)
      await fs.ensureDir(buildPath)
      await emp(buildPath)
      const appliedRules = {}
      for (const rule of rules) {
        const yamlString = await fs.readFile(path.join(this.options.rulesFolder, `${rule}.yml`), `utf8`)
        const minifiedYamlString = yamlString
          .replaceAll(`OFF`, `0`)
          .replaceAll(`WARN`, `1`)
          .replaceAll(`ERROR`, `2`)
        const loadedRules = jsYaml.load(minifiedYamlString)
        Object.assign(appliedRules, loadedRules)
      }
      const eslintConfig = sortKeys({
        ...config,
        extends: extend,
        rules: sortKeys(appliedRules),
      })
      await fs.outputJson(path.join(buildPath, `index.json`), eslintConfig)
      const dependencies = filterObj(this.options.pkg.dependencies, key => includedDependencies.includes(key))
      const {generatedPkg} = await publishimo({
        ...pick(this.options.pkg, [`license`, `version`, `author`, `repository`, `peerDependencies`]),
        ...publishimoConfig,
        dependencies: sortKeys(dependencies),
        main: `index.json`,
      })
      await fs.outputJson(path.join(buildPath, `package.json`), generatedPkg)
      for (const [fileName, filePath] of Object.entries(this.options.staticFiles)) {
        await fs.copyFile(filePath, path.join(buildPath, fileName))
      }
      console.log(`${chalk.green(publishimoConfig.name)} ${prettyBytes(countSizeSync(buildPath))}`)
    })
    await Promise.all(jobs)
  }
}
