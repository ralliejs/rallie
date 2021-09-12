module.exports = {
  env: {
    browser: true,
    es6: true,
    commonjs: true,
    jest: true
  },
  extends: [
    'standard'
  ],
  globals: {
    __Bus__: true
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module'
  },
  plugins: [
    '@typescript-eslint'
  ],
  rules: {
    indent: ['error', 2],
    'linebreak-style': ['error', 'unix'],
    quotes: ['error', 'single'],
    semi: ['error', 'never']
  }
}
