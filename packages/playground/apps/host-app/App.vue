<script lang="ts" setup>
import { useMessage, NButton } from 'naive-ui'
import { hostApp } from './app'

const message = useMessage() // eslint-disable-line
const types = ['error', 'info', 'loading', 'success', 'warning']

const events = {}
types.forEach((type) => {
  events[type] = (content: string) => {
    message[type](content)
  }
})

hostApp.listenEvents(events)

const onClick = () => {
  window.open('https://github.com/ralliejs/rallie')
}
</script>

<template>
  <div :style="{ position: 'absolute', left: '20px', top: '20px' }">
    <NButton type="primary" @click="onClick">Github</NButton>
  </div>
</template>
