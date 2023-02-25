import { createBlock } from '../src'
import { errors } from '../src/utils'

describe('Test errors and warnings', () => {
  test('#case1: blocks can not have the same name', () => {
    createBlock('case1')
    expect(() => {
      createBlock('case1')
    }).toThrowError(errors.duplicatedBlockName('case1'))
  })

  test('#case2: state should be readonly', () => {
    const block = createBlock<{
      state: {
        count: number
      }
    }>('case2')
    block.initState({
      count: 0,
    })
    expect(() => {
      block.state = {
        count: 1,
      }
    }).toThrowError(errors.stateIsReadonly('case2'))
  })
})
