import { createApp } from '../../../src'

type PublicState = {
  value: number
}

type PrivateState = {
  value: number
}

const app = createApp<PublicState, PrivateState>('connect-testers/state', configurator => {
  let unWatchPublicState: () => void = null
  configurator
    .initPublicState({
      value: 0
    })
    .initPrivateState({
      value: 0
    })
    .onBootstrap(() => {
      unWatchPublicState = app.publicState.watch(state => state.value).do((newValue, oldValue) => {
        console.log(newValue, oldValue)
      })
    })
    .onActivate((newPrivateStateValue) => {
      app.privateState.set(state => {
        state.value = newPrivateStateValue
      })
    })
    .onDestroy(() => {
      unWatchPublicState()
    })
})
