import "regenerator-runtime/runtime"

import {transformFileAsync} from "@babel/core"
import {expect, it} from "@jest/globals"
import {mkdirp, writeFile} from "fs-extra"
import path from "path"

const pkg = await fs.readJson("package.json")
const dirName = path.dirname(fileURLToPath(import.meta.url))

const srcFolder = path.join(dirName, "..", "src")
const presetsFolder = path.join(srcFolder, "presets")
const rulesFolder = path.join(srcFolder, "rules")
const srcFile = path.join(srcFolder, "ConfigBuilder.js")
const distFolder = path.join(dirName, "..", "dist")
const testDistFolder = path.join(distFolder, "test")
const outputFolder = path.join(testDistFolder, "output")
const configBuilderFile = path.join(testDistFolder, "ConfigBuilder.js")

const presets = ["index", "react"]

it("should run", async () => {
  await mkdirp(testDistFolder)
  const babelResult = await transformFileAsync(srcFile, {
    envName: "development",
  })
  await writeFile(configBuilderFile, babelResult.code)
  const ConfigBuilder = require(configBuilderFile).default
  const configBuilder = new ConfigBuilder({
    pkg,
    outputFolder,
    presetsFolder,
    rulesFolder,
    presets,
    staticFiles: {
      "readme.md": path.join(dirName, "..", "readme.md"),
      "license.txt": path.join(dirName, "..", "license.txt"),
    },
  })
  await configBuilder.run()
})