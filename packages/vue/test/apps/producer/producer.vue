<script lang="ts">
import { defineComponent } from 'vue'
import { producer } from './app'
import { stateHook, eventsHook, methodsHook } from '../../../src'

const usePublicState = stateHook(producer.publicState)
const usePrivateState = stateHook(producer.privateState)
const useEvents = eventsHook(producer)
const useMethods = methodsHook(producer)

export default defineComponent(function Producer () {
  const count = usePublicState<number>(state => state.count)
  const isDarkTheme = usePrivateState<boolean>(state => state.isDarkTheme)
  useEvents({
    printTheme () {
      console.log(producer.privateState.get(state => state.isDarkTheme) ? 'dark' : 'light')
    }
  })
  useMethods({
    toggleTheme () {
      producer.privateState.set(state => {
        state.isDarkTheme = !state.isDarkTheme
      })
    }
  })
  return { count, isDarkTheme }
})
</script>
<template>
  <!--TODO: fix the ts error-->
  <div data-testid="producer-container" :style="{backgroundColor: isDarkTheme ? 'black' : 'white'}">
    <span data-testid="count">{{ count }}</span>
    <div id="consumer"></div>
  </div>
</template>
