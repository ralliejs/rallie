import typescript from 'rollup-plugin-typescript2'
import resolve from '@rollup/plugin-node-resolve'
import commonJs from '@rollup/plugin-commonjs'
import pkg from './package.json'

export default {
  input: './src/index.ts',
  output: [{
    file: pkg.main,
    format: 'umd',
    name: 'RallieReact',
    exports: 'named'
  }, {
    file: pkg.module,
    format: 'es',
    exports: 'named'
  }],
  plugins: [
    resolve(),
    commonJs(),
    typescript()
  ]
}
