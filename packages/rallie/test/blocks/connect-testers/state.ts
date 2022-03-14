import { registerBlock, createBlock } from '../../../src'

const publicState = {
  count: 0,
  theme: 'white',
}

const privateState = {
  user: 'Mike',
}

type Methods = {
  logout: () => void
  login: (user: string) => void
}
const blockWithPublicState = createBlock<typeof publicState, never, never>('connect-testers/state')
const blockWithPrivateState = createBlock<typeof privateState, never, Methods>(
  'connect-testers/state.private',
)

blockWithPublicState.initState({
  count: 0,
  theme: 'white',
})

blockWithPrivateState.initState(
  {
    user: 'Mike',
  },
  true,
)

blockWithPrivateState.addMethods({
  logout() {
    blockWithPrivateState.setState('log out', (state) => {
      state.user = null
    })
  },
  login(user: string) {
    blockWithPrivateState.setState('log in', (state) => {
      state.user = user
    })
  },
})

let unwatchCount: () => void = null

registerBlock(blockWithPrivateState)
registerBlock(blockWithPublicState)
  .onBootstrap(() => {
    unwatchCount = blockWithPublicState
      .watchState((state) => state.count)
      .do((newValue, oldValue) => {
        console.log(newValue, oldValue)
      })
  })
  .onActivate((newTheme) => {
    blockWithPublicState.setState('change theme', (state) => {
      state.theme = newTheme
    })
  })
  .onDestroy(() => {
    unwatchCount()
  })
