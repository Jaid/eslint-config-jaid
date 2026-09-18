import type {Linter} from 'eslint'

import markdownPlugin from '@eslint/markdown'

import ignores from '../../ignores.ts'

const config: Linter.Config = {
  files: ['**/*.md'],
  ignores,
  language: 'markdown/gfm',
  name: 'eslint-config-jaid/markdown',
  plugins: {
    markdown: markdownPlugin,
  },
  rules: {
    'markdown/heading-increment': ['warn'],
    'markdown/no-duplicate-headings': ['warn', {
      checkSiblingsOnly: true,
    }],
    'markdown/no-empty-images': ['warn'],
    'markdown/no-empty-links': ['warn'],
  },
}

export default config
