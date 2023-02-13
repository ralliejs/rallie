import { producer, Producer } from './blocks/producer'
import { consumer, Consumer } from './blocks/consumer'
import { render, fireEvent, act, screen, cleanup } from '@testing-library/react'
import { registerBlock } from '@rallie/block'
import React from 'react'

registerBlock(producer)
  .initState({
    isDarkTheme: true,
    count: 0,
  })
  .onActivate(() => {
    render(<Producer />)
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
  .onActivate((containerId) => {
    render(<Consumer />, {
      container: document.getElementById(containerId) as HTMLElement,
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
    await act(async () => {
      fireEvent.click(addCountBtn)
      fireEvent.click(addCountBtn)
      fireEvent.click(addCountBtn)
    })
    expect(count.innerHTML).toEqual('3')
  })

  test('#case2: modify private state by unicaster', async () => {
    console.log = jest.fn()
    const printThemeBtn = await screen.findByText('print theme')
    await act(async () => {
      fireEvent.click(printThemeBtn) // log dark
    })
    const producerContainer = await screen.findByTestId('producer-container')
    const consumerContainer = await screen.findByTestId('consumer-container')
    expect(producerContainer.style.backgroundColor).toEqual('black')
    expect(consumerContainer.style.backgroundColor).toEqual('black')
    const toggleThemeBtn = await screen.findByText('toggle theme')
    await act(async () => {
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
    producer.events.printTheme()
    expect(() => {
      producer.methods.toggleTheme()
    }).toThrowError()
    expect(console.log).toBeCalledTimes(2)
    expect(console.log).toBeCalledWith('dark')
    expect(console.log).toBeCalledWith('light')
  })
})
