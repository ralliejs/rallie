import { render, fireEvent, screen, cleanup } from '@testing-library/vue'
import { block, type BlockService } from './blocks'
// @ts-ignore
import HooksTester from './components/hooks-tester.vue'
import { registerBlock, createBlock } from '@rallie/block'

registerBlock(block)
  .initState({
    locale: 'en',
    count: 0,
    funcState: () => console.log('trigger funcState'),
  })
  .onActivate(() => {
    block.addMethods({
      mount() {
        render(HooksTester)
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
registerBlock(tester)
describe('Test Vue hooks', () => {
  beforeAll(async () => {
    await tester.activate(block.name)
  })

  beforeEach(() => {
    tester.connect<BlockService>(block.name).methods.mount()
  })

  afterEach(() => {
    tester.connect<BlockService>(block.name).methods.unmount()
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
    await fireEvent.click(triggerFuncBtn)
    expect(console.log).toBeCalledTimes(1)
    expect(console.log).toBeCalledWith('trigger funcState')
  })

  test('#case3: test event', async () => {
    console.log = jest.fn()
    const printCountBtn = await screen.findByText('print count')
    const incrementCountBtn = await screen.findByText('increment count')
    const count = await screen.findByText(/count:/)
    await fireEvent.click(incrementCountBtn)
    await fireEvent.click(printCountBtn)
    await fireEvent.click(incrementCountBtn)
    await fireEvent.click(printCountBtn)
    expect(count.innerHTML).toEqual('count: 2')
    expect(console.log).toBeCalledTimes(2)
    expect(console.log).toBeCalledWith(1)
    expect(console.log).toBeCalledWith(2)
  })

  test('#case4: test methods', async () => {
    const switchLocaleBtn = await screen.findByText('switch locale')
    const locale = await screen.findByText(/locale:/)
    await fireEvent.click(switchLocaleBtn)
    expect(locale.innerHTML).toEqual('locale: zh')
    await fireEvent.click(switchLocaleBtn)
    expect(locale.innerHTML).toEqual('locale: en')
  })
})
