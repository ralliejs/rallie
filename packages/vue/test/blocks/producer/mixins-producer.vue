<script lang="ts">
import { defineComponent } from 'vue'
import { producer } from './blocks'
import { mixinBlockEvents, mixinBlockMethods, mixinBlockState } from '../../../src'

export default defineComponent({
  mixins: [
    mixinBlockState(producer, (state) => ({
      isDarkTheme: state.isDarkTheme,
      count: state.count,
    })),
    mixinBlockEvents(producer, {
      printTheme() {
        console.log(this.isDarkTheme ? 'dark' : 'light')
      },
    }),
    mixinBlockMethods(producer, {
      toggleTheme() {
        producer.setState('toggle theme', (state) => {
          state.isDarkTheme = !state.isDarkTheme
        })
      },
    }),
  ],
})
</script>
<template>
  <div
    data-testid="producer-container"
    :style="{ backgroundColor: isDarkTheme ? 'black' : 'white' }"
  >
    <span data-testid="count">{{ count }}</span>
    <div id="consumer"></div>
  </div>
</template>
