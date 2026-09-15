import type {Linter} from 'eslint'

import {makeEslintConfig} from './src/main.ts'

const config: Array<Linter.Config> = makeEslintConfig()
export default config
