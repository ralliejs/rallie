// @ts-ignore
import { render, fireEvent, screen, cleanup } from '@testing-library/vue'
import { Producer, producer } from './apps/producer'
import { Consumer, consumer } from './apps/consumer'
import { registerApp } from 'rallie'

registerApp(producer)
  .onActivate(() => {
    render(Producer)
  })
  .onDestroy(() => {
    cleanup()
  })

registerApp(consumer)
  .relyOn(['producer'])
  .onActivate((containerId) => {
    render(Consumer, {
      container: document.getElementById(containerId)
    })
  })
  .onDestroy(() => {
    cleanup()
  })
describe('Test Vue hooks', () => {
  beforeEach(async () => {
    await consumer.activate(consumer.name, 'consumer')
  })

  afterEach(async () => {
    await consumer.destroy(consumer.name)
    await consumer.destroy(producer.name)
  })

  test('#case1: modify public state directly', async () => {
    const addCountBtn = await screen.findByText('add count')
    const count = await screen.findByTestId('count')
    expect(count.innerHTML).toEqual('0')
    await fireEvent.click(addCountBtn)
    await fireEvent.click(addCountBtn)
    await fireEvent.click(addCountBtn)
    expect(count.innerHTML).toEqual('3')
  })

  test('#case2: modify private state by unicaster', async () => {
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
    fireEvent.click(printThemeBtn) // log dark
    const toggleThemeBtn = await screen.findByText('toggle theme')
    fireEvent.click(toggleThemeBtn)
    fireEvent.click(printThemeBtn) // log light
    cleanup()
    producer.broadcaster.printTheme()
    expect(() => {
      producer.unicaster.toggleTheme()
    }).toThrowError()
    expect(console.log).toBeCalledTimes(2)
    expect(console.log).toBeCalledWith('dark')
    expect(console.log).toBeCalledWith('light')
    expect(console.warn).toBeCalledWith('[rallie] you have emitted printTheme broadcast, but there is no listener of this event')
  })
})
