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

  test('#case3: trigger', () => {
    let normalFuncMethodTrigger = ''
    let normalFuncEventTrigger = ''
    type BlockType = {
      methods: {
        normalFunc: () => void
      }
      events: {
        normalFunc: () => void
      }
    }
    const block = createBlock<BlockType>('case3')
    block.addMethods({
      normalFunc(this: { trigger: string }) {
        normalFuncMethodTrigger = this.trigger
      },
    })
    block.listenEvents({
      normalFunc(this: { trigger: string }) {
        normalFuncEventTrigger = this.trigger
      },
    })
    const tester = createBlock('tester')
    const connectedBlock = tester.connect<BlockType>(block.name)
    connectedBlock.methods.normalFunc()
    expect(normalFuncMethodTrigger).toEqual('tester')
    connectedBlock.events.normalFunc()
    expect(normalFuncEventTrigger).toEqual('tester')
    block.methods.normalFunc()
    expect(normalFuncMethodTrigger).toEqual('case3')
    block.events.normalFunc()
    expect(normalFuncEventTrigger).toEqual('case3')
  })
})
