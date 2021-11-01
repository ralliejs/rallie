<script lang="ts">
import { defineComponent } from 'vue'
// @ts-ignore
import { producer } from './app'
import { getStateHook, getBroadcastHook, getUnicastHook } from '../../../src'

const usePublicState = getStateHook(producer.publicState)
const usePrivateState = getStateHook(producer.privateState)
const useBroadcast = getBroadcastHook(producer)
const useUnicast = getUnicastHook(producer)

export default defineComponent(function Producer () {
  const count = usePublicState<number>(state => state.count)
  const isDarkTheme = usePrivateState<boolean>(state => state.isDarkTheme)
  useBroadcast({
    printTheme () {
      console.log(producer.privateState.get(state => state.isDarkTheme) ? 'light' : 'dark')
    }
  })
  useUnicast({
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
