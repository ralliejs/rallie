<script lang="ts">
import { defineComponent } from 'vue'
import { producer } from './apps'
import { mixinRallieEvents, mixinRallieMethods, mixinRallieState } from '../../../src'

export default defineComponent({
  name: 'Consumer', // eslint-disable-line
  mixins: [
    mixinRallieState(producer, state => ({
      isDarkTheme: state.isDarkTheme,
      count: state.count
    })),
    mixinRallieEvents(producer, {
      printTheme () {
        console.log(this.isDarkTheme ? 'dark' : 'light')
      }
    }),
    mixinRallieMethods(producer, {
      toggleTheme () {
        producer.setState('toggle theme', state => {
          state.isDarkTheme = !state.isDarkTheme
        })
      }
    })
  ]
})
</script>
<template>
  <div data-testid="producer-container" :style="{backgroundColor: isDarkTheme ? 'black' : 'white'}">
    <span data-testid="count">{{ count }}</span>
    <div id="consumer"></div>
  </div>
</template>
