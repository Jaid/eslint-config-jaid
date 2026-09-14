import type {Linter} from 'eslint'

import {makeEslintConfig} from './src/index.ts'

const config: Linter.Config[] = makeEslintConfig()
export default config
