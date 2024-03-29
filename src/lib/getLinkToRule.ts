type Mapper = Record<string, (id: string) => string>;

export const pluginMap = {
  i: `https://github.com/un-es/eslint-plugin-i#readme`,
  'import-quotes': () => `https://github.com/xneek/eslint-plugin-import-quotes#readme`,
}

const map: Mapper = {
  '@typescript-eslint': id => `https://typescript-eslint.io/rules/${id}`,
  eslint: id => `https://eslint.org/docs/latest/rules/${id}`,
  i: id => `https://github.com/un-es/eslint-plugin-i#import${id.replaceAll(`-`, ``)}`,
  jsonc: id => `https://ota-meshi.github.io/eslint-plugin-jsonc/rules/${id}.html`,
  n: id => `https://github.com/mysticatea/eslint-plugin-node/blob/master/docs/rules/${id}.md`,
  perfectionist: id => `https://eslint-plugin-perfectionist.azat.io/rules/${id}`,
  promise: id => `https://github.com/eslint-community/eslint-plugin-promise/blob/main/docs/rules/${id}.md`,
  react: id => `https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/${id}.md`,
  regexp: id => `https://ota-meshi.github.io/eslint-plugin-regexp/rules/${id}.html`,
  unicorn: id => `https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/${id}.md`,
  yml: id => `https://ota-meshi.github.io/eslint-plugin-yaml/rules/${id}.html`,
  'you-dont-need-lodash-underscore': id => `https://github.com/you-dont-need/You-Dont-Need-Lodash-Underscore#_${id}`,
}

export default (ruleId: string): string | null => {
  const parts = ruleId.split(`/`)
  let plugin
  let id
  if (parts.length === 1) {
    plugin = `eslint`
    id = parts[0]
  } else {
    plugin = parts[0]
    id = parts[1]
  }
  const resolver = map[plugin] ?? map[plugin.replaceAll(`eslint-plugin-`, ``)]
  if (!resolver) {
    return null
  }
  return resolver(id)
}
