import path from 'node:path'
import {fileURLToPath, pathToFileURL} from 'node:url'

import createDebug from 'debug'

import fs from '../src/lib/esm/fs-extra.js'

const debug = createDebug(`eslint-config-jaid`)

const pkg = await fs.readJson(`package.json`)
const dirName = path.dirname(fileURLToPath(import.meta.url))

const srcFolder = path.join(dirName, `..`, `src`)
const presetsFolder = path.join(srcFolder, `presets`)
const rulesFolder = path.join(srcFolder, `rules`)
const srcFile = path.join(srcFolder, `ConfigBuilder.ts`)
const distFolder = path.join(dirName, `..`, `dist`)
const testDistFolder = path.join(distFolder, `test`)
const outputFolder = path.join(testDistFolder, `output`)

debug(`srcFile: %s`, srcFile)

const presets = [`index`]

it(`should run`, async () => {
  const {default: ConfigBuilder} = await import(pathToFileURL(srcFile))
  const configBuilder = new ConfigBuilder({
    outputFolder,
    pkg,
    presets,
    presetsFolder,
    rulesFolder,
    staticFiles: {
      "license.txt": path.join(dirName, `..`, `license.txt`),
      "readme.md": path.join(dirName, `..`, `readme.md`),
    },
  })
  await configBuilder.run()
})
