import path from "node:path"
import {fileURLToPath} from "node:url"

import createDebug from "debug"

import fs from "../src/lib/esm/fs-extra.js"

const debug = createDebug("eslint-config-jaid")

const pkg = await fs.readJson("package.json")
const dirName = path.dirname(fileURLToPath(import.meta.url))

const srcFolder = path.join(dirName, "..", "src")
const presetsFolder = path.join(srcFolder, "presets")
const rulesFolder = path.join(srcFolder, "rules")
const srcFile = path.join(srcFolder, "ConfigBuilder.js")
const distFolder = path.join(dirName, "..", "dist")
const testDistFolder = path.join(distFolder, "test")
const outputFolder = path.join(testDistFolder, "output")

debug("srcFile: %s", srcFile)

const presets = ["index"]

it("should run", async () => {
  const {default: ConfigBuilder} = await import(srcFile)
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