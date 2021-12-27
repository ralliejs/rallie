<script lang="ts">
import { defineComponent } from 'vue'
import { producer } from './apps'
import { stateHook, eventsHook, methodsHook } from '../../../src'

const useProducerState = stateHook(producer)
const useProducerEvents = eventsHook(producer)
const useProducerMethods = methodsHook(producer)

export default defineComponent(function Producer () {
  const count = useProducerState<number>(state => state.count)
  const isDarkTheme = useProducerState<boolean>(state => state.isDarkTheme)
  useProducerEvents({
    printTheme () {
      console.log(producer.state.isDarkTheme ? 'dark' : 'light')
    }
  })
  useProducerMethods({
    toggleTheme () {
      producer.setState('toggle theme', state => {
        state.isDarkTheme = !state.isDarkTheme
      })
    }
  })
  return { count, isDarkTheme }
})
</script>
<template>
  <div data-testid="producer-container" :style="{backgroundColor: isDarkTheme ? 'black' : 'white'}">
    <span data-testid="count">{{ count }}</span>
    <div id="consumer"></div>
  </div>
</template>
