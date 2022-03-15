import { registerBlock, createBlock } from '../src'
import { errors } from '../src/utils'

describe('Test errors', () => {
  test('#case1: apps can not have the same name', () => {
    registerBlock(createBlock('case1'))
    expect(() => {
      registerBlock(createBlock('case1'))
    }).toThrowError(errors.duplicatedBlockName('case1'))
  })
})
