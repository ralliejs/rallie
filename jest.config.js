module.exports = {
  transform: {
    '^.+\\.tsx?$': 'ts-jest'
  },
  rootDir: '.',
  setupFiles: [
    '<rootDir>/jest-setup.js'
  ],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  testEnvironment: 'jsdom',
  coveragePathIgnorePatterns: ['/test/', '/node_modules/', '/dist/', 'index.ts', 'types.ts']
}
