import typescript from 'rollup-plugin-typescript2'
import resolve from '@rollup/plugin-node-resolve'
import commonJs from '@rollup/plugin-commonjs'
import terser from '@rollup/plugin-terser'
import replace from '@rollup/plugin-replace'
import { readFileSync } from 'node:fs'

const pkg = JSON.parse(readFileSync('package.json', { encoding: 'utf8' }))

export default {
  input: './src/index.ts',
  output: [
    {
      file: pkg.main,
      format: 'umd',
      name: 'RallieCore',
      exports: 'named',
    },
    {
      file: pkg.module,
      format: 'es',
      exports: 'named',
    },
  ],
  plugins: [
    replace({ 'process.env.NODE_ENV': JSON.stringify('production') }),
    resolve(),
    commonJs(),
    typescript(),
    terser(),
  ],
}
