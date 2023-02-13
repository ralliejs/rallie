import { registerBlock, createBlock } from '../../../src'

const publicState = {
  count: 0,
  theme: 'white',
}

const privateState = {
  user: 'Mike' as string | null,
}

const blockWithPublicState = createBlock<{
  state: typeof publicState
}>('connect-testers/state')
const blockWithPrivateState = createBlock<{
  state: typeof privateState
  methods: {
    logout: () => void
    login: (user: string) => void
  }
}>('connect-testers/state.private')

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

let unwatchCount: () => void = () => {}

registerBlock(blockWithPrivateState).initState(
  {
    user: 'Mike',
  },
  true,
)
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
  .initState({
    count: 0,
    theme: 'white',
  })
