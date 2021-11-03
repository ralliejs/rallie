import { producer, Producer } from './apps/producer'
import { consumer, Consumer } from './apps/consumer'
import { render, fireEvent, act, screen, cleanup } from '@testing-library/react'
import { registerApp } from 'rallie'

registerApp(producer)
  .onActivate(() => {
    // @ts-ignore
    render(<Producer />) // TODO: fix the ts error
  })
  .onDestroy(() => {
    cleanup()
    producer.publicState.set(state => { state.count = 0 })
    producer.privateState.set(state => { state.isDarkTheme = true })
  })

registerApp(consumer)
  .relyOn(['producer'])
  .onActivate((containerId) => {
    // @ts-ignore
    render(<Consumer />, { // TODO: fix the ts error
      container: document.getElementById(containerId)
    })
  })
  .onDestroy(() => {
    cleanup()
  })
describe('Test React hooks', () => {
  beforeEach(async () => {
    await act(async () => {
      await consumer.activate(consumer.name, 'consumer')
    })
  })

  afterEach(async () => {
    await act(async () => {
      await consumer.destroy(consumer.name)
      await consumer.destroy(producer.name)
    })
  })

  test('#case1: modify public state directly', async () => {
    const addCountBtn = await screen.findByText('add count')
    const count = await screen.findByTestId('count')
    expect(count.innerHTML).toEqual('0')
    act(() => {
      fireEvent.click(addCountBtn)
      fireEvent.click(addCountBtn)
      fireEvent.click(addCountBtn)
    })
    expect(count.innerHTML).toEqual('3')
  })

  test('#case2: modify private state by unicaster', async () => {
    console.log = jest.fn()
    const printThemeBtn = await screen.findByText('print theme')
    act(() => {
      fireEvent.click(printThemeBtn) // log dark
    })
    const producerContainer = await screen.findByTestId('producer-container')
    const consumerContainer = await screen.findByTestId('consumer-container')
    expect(producerContainer.style.backgroundColor).toEqual('black')
    expect(consumerContainer.style.backgroundColor).toEqual('black')
    const toggleThemeBtn = await screen.findByText('toggle theme')
    act(() => {
      fireEvent.click(toggleThemeBtn)
    })
    expect(producerContainer.style.backgroundColor).toEqual('white')
    expect(consumerContainer.style.backgroundColor).toEqual('white')
    act(() => {
      fireEvent.click(printThemeBtn) // log light
    })
    expect(console.log).toBeCalledTimes(2)
    expect(console.log).toBeCalledWith('dark')
    expect(console.log).toBeCalledWith('light')
  })

  test('#case3: test events', async () => {
    console.log = jest.fn()
    console.warn = jest.fn()
    const printThemeBtn = await screen.findByText('print theme')
    act(() => {
      fireEvent.click(printThemeBtn) // log dark
    })
    const toggleThemeBtn = await screen.findByText('toggle theme')
    act(() => {
      fireEvent.click(toggleThemeBtn)
      fireEvent.click(printThemeBtn) // log light
    })
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
