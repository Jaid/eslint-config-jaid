import type {Plugin} from 'rolldown'
import type {PackageJson} from 'type-fest'

import * as path from 'forward-slash-path'
import fs from 'fs-extra'
import {defineConfig} from 'rolldown'
import {dts} from 'rolldown-plugin-dts'

const rootFolder = import.meta.dirname
const sourceFile = path.join(rootFolder, 'src/index.ts')
const packageJson = await fs.readJson(path.join(rootFolder, 'package.json')) as PackageJson
const mode = process.env.NODE_ENV === 'production' ? 'production' : 'development'
const isProduction = mode === 'production'
const outputFolder = path.join(rootFolder, 'dist/package', packageJson.name ?? 'eslint-config-jaid', mode)
const outputScript = 'lib.js'
const outputTypes = 'lib.d.ts'

await fs.emptyDir(outputFolder)

const packagePlugin = (): Plugin => {
  return {
    name: 'eslint-config-jaid-package',
    async writeBundle() {
      const entryExport: Record<string, string> = {
        import: `./${outputScript}`,
        default: `./${outputScript}`,
      }
      if (isProduction) {
        entryExport.types = `./${outputTypes}`
      }
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
        outputPackageJson.private = true
      }
      await fs.outputJson(path.join(outputFolder, 'package.json'), outputPackageJson, {spaces: 2})
    },
  }
}

export default defineConfig({
  input: sourceFile,
  platform: 'node',
  external: /^[^./](?!:[/\\])/u,
  output: {
    dir: outputFolder,
    entryFileNames: chunk => chunk.name.endsWith('.d') ? outputTypes : outputScript,
    format: 'esm',
    sourcemap: 'hidden',
  },
  plugins: [
    ...(isProduction ? [dts({generator: 'tsc'})] : []),
    packagePlugin(),
  ],
})
