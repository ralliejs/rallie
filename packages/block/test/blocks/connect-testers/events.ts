import { createBlock } from '../../../src'

const block = createBlock<{
  events: {
    log: (text: string) => void
    cancelListen: () => void
  }
}>('connect-testers/events').onActivate(() => {
  const cancelListen = block.listenEvents({
    log: (text) => console.log(text),
    cancelListen: () => {
      cancelListen()
    },
  })
})
