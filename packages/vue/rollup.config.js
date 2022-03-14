import typescript from 'rollup-plugin-typescript2'
import resolve from '@rollup/plugin-node-resolve'
import commonJs from '@rollup/plugin-commonjs'
import pkg from './package.json'

const commonConfigs = {
  plugins: [resolve(), commonJs(), typescript()],
  external: ['vue', 'rallie'],
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
          rallie: 'Rallie',
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
          rallie: 'Rallie',
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
