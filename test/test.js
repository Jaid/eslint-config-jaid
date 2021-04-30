import "regenerator-runtime/runtime"

import {mkdirp, writeFile} from "fs-extra"

import {expect, it} from "@jest/globals"
import path from "path"
import {transformFileAsync} from "@babel/core"

const pkg = require("../package.json")

const srcFolder = path.join(__dirname, "..", "src")
const presetsFolder = path.join(srcFolder, "presets")
const rulesFolder = path.join(srcFolder, "rules")
const srcFile = path.join(srcFolder, "ConfigBuilder.js")
const distFolder = path.join(__dirname, "..", "dist")
const testDistFolder = path.join(distFolder, "test")
const outputFolder = path.join(testDistFolder, "output")
const configBuilderFile = path.join(testDistFolder, "ConfigBuilder.js")

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
    presets: ["index", "react"],
    staticFiles: {
      "readme.md": path.join(__dirname, "..", "readme.md"),
      "license.txt": path.join(__dirname, "..", "license.txt"),
    },
  })
  await configBuilder.run()
})