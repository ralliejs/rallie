module.exports = {
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
    '^.+\\.vue$': '@vue/vue3-jest',
  },
  rootDir: '.',
  setupFiles: ['<rootDir>/jest-setup.js'],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  testEnvironment: 'jsdom',
  testEnvironmentOptions: {
    resources: 'usable',
    runScripts: 'dangerously',
    customExportConditions: ['node', 'node-addons'],
  },
  coveragePathIgnorePatterns: ['/test/', '/node_modules/', '/dist/', 'index.ts', 'types.ts'],
}
