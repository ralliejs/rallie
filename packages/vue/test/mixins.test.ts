// @ts-ignore
import { render, fireEvent, screen, cleanup } from '@testing-library/vue'
import { producer } from './blocks/producer'
import { consumer } from './blocks/consumer'
import { registerBlock } from '@rallie/block'

registerBlock(producer)
  .initState({
    isDarkTheme: true,
    count: 0,
  })
  .onActivate(async () => {
    const module = await import('./components/mixins-producer.vue')
    render(module.default)
  })
  .onDestroy(() => {
    cleanup()
    producer.setState('reset the count', (state) => {
      state.count = 0
    })
    producer.setState('reset the theme', (state) => {
      state.isDarkTheme = true
    })
  })

registerBlock(consumer)
  .relyOn(['producer'])
  .onActivate(async (containerId) => {
    const module = await import('./components/hooks-consumer.vue')
    render(module.default, {
      container: document.getElementById(containerId) as HTMLElement,
    })
  })
  .onDestroy(() => {
    cleanup()
  })
describe('Test Vue Mixins', () => {
  beforeEach(async () => {
    await consumer.activate(consumer.name, 'consumer')
  })
  afterEach(async () => {
    await consumer.destroy(consumer.name)
    await consumer.destroy(producer.name)
  })
  test('#case1: modify state directly', async () => {
    const addCountBtn = await screen.findByText('add count')
    const count = await screen.findByTestId('count')
    expect(count.innerHTML).toEqual('0')
    await fireEvent.click(addCountBtn)
    await fireEvent.click(addCountBtn)
    await fireEvent.click(addCountBtn)
    expect(count.innerHTML).toEqual('3')
  })
  test('#case2: modify state by unicaster', async () => {
    console.log = jest.fn()
    const printThemeBtn = await screen.findByText('print theme')
    fireEvent.click(printThemeBtn) // log dark
    const producerContainer = await screen.findByTestId('producer-container')
    const consumerContainer = await screen.findByTestId('consumer-container')
    expect(producerContainer.style.backgroundColor).toEqual('black')
    expect(consumerContainer.style.backgroundColor).toEqual('black')
    const toggleThemeBtn = await screen.findByText('toggle theme')
    await fireEvent.click(toggleThemeBtn)
    expect(producerContainer.style.backgroundColor).toEqual('white')
    expect(consumerContainer.style.backgroundColor).toEqual('white')
    await fireEvent.click(printThemeBtn) // log light
    expect(console.log).toBeCalledTimes(2)
    expect(console.log).toBeCalledWith('dark')
    expect(console.log).toBeCalledWith('light')
  })
  test('#case3: test events', async () => {
    console.log = jest.fn()
    console.warn = jest.fn()
    const printThemeBtn = await screen.findByText('print theme')
    await fireEvent.click(printThemeBtn) // log dark
    const toggleThemeBtn = await screen.findByText('toggle theme')
    await fireEvent.click(toggleThemeBtn)
    await fireEvent.click(printThemeBtn) // log light
    cleanup()
    producer.events.printTheme()
    expect(() => {
      producer.methods.toggleTheme()
    }).toThrowError()
    expect(console.log).toBeCalledTimes(2)
    expect(console.log).toBeCalledWith('dark')
    expect(console.log).toBeCalledWith('light')
  })
})
