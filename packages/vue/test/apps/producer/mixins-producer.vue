<script lang="ts">
import { defineComponent } from 'vue'
import { producer } from './apps'
import { stateMixin, eventsMixin, methodsMixin } from '../../../src'

export default defineComponent({
  name: 'Consumer', // eslint-disable-line
  mixins: [
    stateMixin(producer)(state => ({
      isDarkTheme: state.isDarkTheme,
      count: state.count
    })),
    eventsMixin(producer)({
      printTheme () {
        console.log(this.isDarkTheme ? 'dark' : 'light')
      }
    }),
    methodsMixin(producer)({
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
