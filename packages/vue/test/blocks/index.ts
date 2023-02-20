import { createBlock } from '@rallie/block'

export type BlockService = {
  state: {
    locale: 'en' | 'zh'
    count: number
  }
  events: {
    incrementCount: () => void
    printCount: () => void
  }
  methods: {
    switchLocale: () => void
    mount: () => void | Promise<void>
    unmount: () => void
  }
}

export const block = createBlock<BlockService>('block')
