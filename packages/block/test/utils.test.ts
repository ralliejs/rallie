import { registerBlock, createBlock } from '../src'
import { errors, warnings } from '../src/utils'

describe('Test errors and warnings', () => {
  test('#case1: blocks can not have the same name', () => {
    registerBlock(createBlock('case1'))
    expect(() => {
      registerBlock(createBlock('case1'))
    }).toThrowError(errors.duplicatedBlockName('case1'))
  })

  test('#case2: state should be initialized before registering', () => {
    console.warn = jest.fn()
    const block = createBlock<{
      state: {
        count: number
      }
    }>('case2')
    registerBlock(block)
    block.initState({
      count: 0,
    })
    expect(console.warn).toHaveBeenCalledWith(warnings.suggestToInitStateBeforeRegister('case2'))
  })

  test('#case3: only created block can be registered', () => {
    const block3 = createBlock('case3')
    const block2 = block3.connect('block2')
    expect(() => {
      // @ts-ignore
      registerBlock(block2)
    }).toThrowError(errors.invalidBlock('block2'))
  })

  test('#case4: state should be readonly', () => {
    const block = createBlock<{
      state: {
        count: number
      }
    }>('case4')
    block.initState({
      count: 0,
    })
    expect(() => {
      block.state = {
        count: 1,
      }
    }).toThrowError(errors.stateIsReadonly('case4'))
  })
})
