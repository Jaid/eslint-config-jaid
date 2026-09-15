import type {Plugin} from 'rolldown'
import type {PackageJson} from 'type-fest'

import {fileURLToPath} from 'node:url'

import * as path from 'forward-slash-path'
import fs from 'fs-extra'
import {defineConfig} from 'rolldown'
import {dts} from 'rolldown-plugin-dts'

const rootFolder = import.meta.dirname
const sourceFile = path.join(rootFolder, 'src/main.ts')
const packageJson = await fs.readJson(path.join(rootFolder, 'package.json')) as PackageJson
const mode = process.env.NODE_ENV === 'production' ? 'production' : 'development'
const isProduction = mode === 'production'
const outputFolder = path.join(rootFolder, 'dist', packageJson.name ?? path.basename(rootFolder), mode)
const outputScript = 'lib.js'
const outputTypes = 'lib.d.ts'
const runtimeDependencyNames = [...new Set([
  ...Object.keys(packageJson.dependencies ?? {}),
  ...Object.keys(packageJson.optionalDependencies ?? {}),
  ...Object.keys(packageJson.peerDependencies ?? {}),
])]
await fs.emptyDir(outputFolder)
const packagePlugin = (): Plugin => {
  return {
    name: 'eslint-config-jaid-package',
    async writeBundle() {
      const entryExport: Record<string, string> = {}
      if (isProduction) {
        entryExport.types = `./${outputTypes}`
      }
      entryExport.import = `./${outputScript}`
      entryExport.default = `./${outputScript}`
      const outputPackageJson = structuredClone(packageJson)
      outputPackageJson.type = 'module'
      outputPackageJson.exports = {
        '.': entryExport,
      }
      delete outputPackageJson.devDependencies
      delete outputPackageJson.scripts
      if (isProduction) {
        outputPackageJson.types = `./${outputTypes}`
      } else {
        delete outputPackageJson.types
        outputPackageJson.private = true
      }
      await fs.outputJson(path.join(outputFolder, 'package.json'), outputPackageJson)
    },
  }
}

export default defineConfig({
  input: sourceFile,
  platform: 'node',
  external: id => runtimeDependencyNames.some(dependencyName => id === dependencyName || id.startsWith(`${dependencyName}/`)),
  transform: {
    define: isProduction ? {
      'process.env.NODE_ENV': "'production'",
    } : {},
  },
  output: {
    dir: outputFolder,
    entryFileNames: chunk => (chunk.name.endsWith('.d') ? outputTypes : outputScript),
    format: 'esm',
    minify: isProduction,
  },
  plugins: [
    ...isProduction ? [dts({generator: 'tsc'})] : [],
    packagePlugin(),
  ],
})
