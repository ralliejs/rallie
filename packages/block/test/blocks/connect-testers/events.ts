import { createBlock, registerBlock } from '../../../src'

const block = createBlock<{
  state: {
    count: number
  }
  events: {
    log: (text: string) => void
    error: (text: string) => void
    record: (text: string) => void
  }
}>('connect-testers/events')

let removeEvents: () => void

registerBlock(block)
  .onBootstrap(() => {
    removeEvents = block.listenEvents({
      log(text) {
        console.log(text)
        block.events.record(text)
      },
      error(text) {
        console.error(text)
        block.events.record(text)
      },
    })
  })
  .onDestroy(() => {
    removeEvents()
  })
  .setup(({ initState }) => {
    initState({
      count: 0,
    })
  })
