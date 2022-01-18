<script lang="ts">
import { defineComponent } from 'vue'
import { producer } from './apps'
import { useRallieState, useRallieEvents, useRallieMethods } from '../../../src'

export default defineComponent(function Producer () {
  const count = useRallieState(producer, state => state.count)
  const isDarkTheme = useRallieState(producer, state => state.isDarkTheme)
  useRallieEvents(producer, {
    printTheme () {
      console.log(producer.state.isDarkTheme ? 'dark' : 'light')
    }
  })
  useRallieMethods(producer, {
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
