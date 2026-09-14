import type {Plugin} from 'rolldown'
import type {PackageJson} from 'type-fest'

import {generateDtsBundle} from 'dts-bundle-generator'
import * as path from 'forward-slash-path'
import fs from 'fs-extra'
import publishimo from 'publishimo'
import {defineConfig} from 'rolldown'

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
      if (isProduction) {
        const [declaration] = generateDtsBundle([
          {
            filePath: sourceFile,
            output: {
              exportReferencedTypes: false,
              noBanner: true,
              sortNodes: true,
            },
          },
        ])
        await fs.outputFile(path.join(outputFolder, outputTypes), declaration)
      }

      const publishimoResult = await publishimo({
        fetchGithub: false,
        pkg: packageJson,
        includeFields: [
          'dependencies',
          'peerDependencies',
          'peerDependenciesMeta',
          'optionalDependencies',
        ],
      })
      const entryExport: Record<string, string> = {
        import: `./${outputScript}`,
        default: `./${outputScript}`,
      }
      if (isProduction) {
        entryExport.types = `./${outputTypes}`
      }
      const outputPackageJson: PackageJson = {
        ...publishimoResult.generatedPkg,
        type: 'module',
        exports: {
          '.': entryExport,
        },
      }
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
    entryFileNames: outputScript,
    format: 'esm',
    sourcemap: 'hidden',
  },
  plugins: [packagePlugin()],
})
