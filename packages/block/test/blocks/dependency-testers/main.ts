import { createBlock } from '../../../src/index'

createBlock('dependency-testers/main').relyOn([
  'dependency-testers/a',
  'dependency-testers/b',
  'dependency-testers/c',
])
