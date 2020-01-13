module.exports = {
    transform: {
        '^.+\\.tsx?$': 'ts-jest',
    },
    rootDir: '.',
    setupFiles: [
        '<rootDir>/setup-fetch.js'
    ],
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
};