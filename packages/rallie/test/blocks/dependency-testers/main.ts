import { registerBlock, createBlock } from '../../../src/index'

registerBlock(createBlock('dependency-testers/main')).relyOn([
  'dependency-testers/a',
  'dependency-testers/b',
  'dependency-testers/c',
])
