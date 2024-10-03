const ignores = [
  '/dist/',
  '/out/',
  '/temp/',
  '/cache/',
  '/node_modules/',
]

export const extendIgnores = (...additionalIgnores: Array<string>) => {
  return [
    ...ignores,
    ...additionalIgnores,
  ]
}

export default ignores
