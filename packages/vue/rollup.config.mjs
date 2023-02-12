import typescript from 'rollup-plugin-typescript2'
import resolve from '@rollup/plugin-node-resolve'
import commonJs from '@rollup/plugin-commonjs'
import { readFileSync } from "node:fs"

const pkg = JSON.parse(readFileSync('package.json', {encoding: 'utf8'}))

const commonConfigs = {
  plugins: [resolve(), commonJs(), typescript()],
  external: ['vue', '@rallie/block'],
}

export default [
  {
    input: './src/index.ts',
    output: [
      {
        file: pkg.main,
        format: 'umd',
        name: 'RallieVue',
        exports: 'named',
        globals: {
          vue: 'Vue',
          '@rallie/block': 'RallieBlock',
        },
      },
      {
        file: pkg.module,
        format: 'es',
        exports: 'named',
      },
    ],
    ...commonConfigs,
  },
  {
    input: './src/mixins.ts',
    output: [
      {
        file: './dist/mixin.umd.js',
        format: 'umd',
        name: 'RallieVueMixin',
        exports: 'named',
        globals: {
          '@rallie/block': 'RallieBlock',
        },
      },
      {
        file: './dist/mixin.js',
        format: 'es',
        exports: 'named',
      },
    ],
    ...commonConfigs,
  },
]
