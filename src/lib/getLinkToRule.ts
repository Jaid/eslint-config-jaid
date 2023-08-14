type Mapper = {
  [key: string]: (id: string) => string
}

export const pluginMap = {
  'eslint-plugin-import-quotes': () => 'https://github.com/xneek/eslint-plugin-import-quotes#readme',
  'eslint-plugin-import': 'https://github.com/import-js/eslint-plugin-import',
}

const map: Mapper = {
  eslint: id => `https://eslint.org/docs/latest/rules/${id}`,
  'eslint-plugin-import': id => `https://github.com/import-js/eslint-plugin-import#import${id.replaceAll('-', '')}`,
  'eslint-plugin-you-dont-need-lodash-underscore': id => `https://github.com/you-dont-need/You-Dont-Need-Lodash-Underscore#_${id}`,
  'eslint-plugin-node': id => `https://github.com/mysticatea/eslint-plugin-node/blob/master/docs/rules/${id}.md`,
  'eslint-plugin-promise': id => `https://github.com/eslint-community/eslint-plugin-promise/blob/main/docs/rules/${id}.md`,
  'eslint-plugin-react': id => `https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/${id}.md`,
  '@typescript-eslint': id => `https://typescript-eslint.io/rules/${id}`,
  'eslint-plugin-unicorn': id => `https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/${id}.md`
}

export default (ruleId: string): string | null => {
  const parts = ruleId.split('/')
  let plugin
  let id
  if (parts.length === 1) {
    plugin = 'eslint'
    id = parts[0]
  } else {
    plugin = parts[0]
    id = parts[1]
  }
  if (!map[plugin]) {
    return null
  }
  return map[plugin](id)
}
