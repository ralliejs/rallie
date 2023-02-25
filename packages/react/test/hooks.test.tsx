import React from 'react'
import { block, Component, type BlockService } from './blocks'
import { render, fireEvent, act, screen, cleanup } from '@testing-library/react'
import { createBlock } from '@rallie/block'

block
  .initState({
    locale: 'en',
    count: 0,
    funcState: () => console.log('trigger funcState'),
  })
  .onActivate(() => {
    block.addMethods({
      mount() {
        render(<Component />)
      },
      unmount() {
        cleanup()
        block.setState('reset state', (state) => {
          state.count = 0
          state.locale = 'en'
        })
      },
    })
  })

const tester = createBlock('tester')
describe('Test React hooks', () => {
  beforeAll(async () => {
    await act(async () => {
      await tester.activate(block.name)
    })
  })

  beforeEach(async () => {
    await act(async () => {
      tester.connect<BlockService>(block.name).methods.mount()
    })
  })

  afterEach(async () => {
    await act(async () => {
      tester.connect<BlockService>(block.name).methods.unmount()
    })
  })

  test('#case1: test normal state', async () => {
    const count = await screen.findByText(/count:/)
    const locale = await screen.findByText(/locale:/)
    expect(count.innerHTML).toEqual('count: 0')
    expect(locale.innerHTML).toEqual('locale: en')
  })

  test('#case2: test function state', async () => {
    console.log = jest.fn()
    const triggerFuncBtn = await screen.findByText('trigger funcState')
    await act(async () => {
      fireEvent.click(triggerFuncBtn)
    })
    expect(console.log).toBeCalledTimes(1)
    expect(console.log).toBeCalledWith('trigger funcState')
  })

  test('#case3: test event', async () => {
    console.log = jest.fn()
    const printCountBtn = await screen.findByText('print count')
    const incrementCountBtn = await screen.findByText('increment count')
    const count = await screen.findByText(/count:/)
    await act(async () => {
      fireEvent.click(incrementCountBtn)
    })
    await act(async () => {
      fireEvent.click(printCountBtn)
    })
    await act(async () => {
      fireEvent.click(incrementCountBtn)
    })
    await act(async () => {
      fireEvent.click(printCountBtn)
    })
    expect(count.innerHTML).toEqual('count: 2')
    expect(console.log).toBeCalledTimes(2)
    expect(console.log).toBeCalledWith(1)
    expect(console.log).toBeCalledWith(2)
  })

  test('#case4: test methods', async () => {
    const switchLocaleBtn = await screen.findByText('switch locale')
    const locale = await screen.findByText(/locale:/)
    await act(async () => {
      fireEvent.click(switchLocaleBtn)
    })
    expect(locale.innerHTML).toEqual('locale: zh')
    await act(async () => {
      fireEvent.click(switchLocaleBtn)
    })
    expect(locale.innerHTML).toEqual('locale: en')
  })
})
