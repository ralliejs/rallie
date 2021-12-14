module.exports = {
  env: {
    browser: true,
    es6: true,
    commonjs: true,
    jest: true
  },
  extends: [
    'standard',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
    'plugin:vue/vue3-essential'
  ],
  globals: {
    RALLIE_BUS_STORE: true
  },
  settings: {
    react: {
      version: 'detect'
    }
  },
  parser: 'vue-eslint-parser',
  parserOptions: {
    parser: '@typescript-eslint/parser',
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: 2018,
    sourceType: 'module'
  },
  plugins: [
    'react',
    'react-hooks',
    'vue',
    '@typescript-eslint'
  ],
  // 0-ignore; 1-warn; 2-error
  rules: {
    indent: [2, 2],
    'linebreak-style': [2, 'unix'],
    quotes: [2, 'single'],
    semi: [2, 'never'],
    'react/prop-types': 0, // prop-types can be valid by ts
    'react-hooks/rules-of-hooks': 2,
    'react-hooks/exhaustive-deps': 2,
    'node/no-callback-literal': 0
  }
}
