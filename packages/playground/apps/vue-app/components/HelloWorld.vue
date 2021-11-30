<script setup lang="ts">
import { vueApp } from '../app'
import { stateHook } from '@rallie/vue'

defineProps({ msg: String }) // eslint-disable-line

const count = stateHook(vueApp)(state => state.count)
const addCount = () => {
  vueApp.setState(state => { state.count++ })
}

const hint = {
  currentMode: 'host',
  navigationMode: 'remote',
  navigationLink: '/rallie/index.html'
}
vueApp.runInRemoteMode(() => {
  hint.currentMode = 'remote'
  hint.navigationMode = 'host'
  hint.navigationLink = '/rallie/apps/vue-app/index.html'
})

</script>

<template>
  <h1>{{ msg }}</h1>

  <p>
    This app is running in <strong>{{ hint.currentMode }}</strong> mode,
    click <a :href="hint.navigationLink">here</a> to see how it works in {{ hint.navigationMode }} mode
  </p>
  <p>the count can be get, set and watched by the react app</p>
  <n-button @click="addCount">count is: {{ count }}</n-button>
  <p>the host app provide a method service to use naive-ui's button component</p>
  <p>
    Edit
    <code>components/HelloWorld.vue</code> to test hot module replacement.
  </p>
  <p>
    <a href="https://vitejs.dev/guide/features.html" target="_blank">
      Vite Docs
    </a>
    |
    <a href="https://v3.vuejs.org/" target="_blank">Vue 3 Docs</a>
  </p>
</template>

<style scoped>
a {
  color: #42b983;
}

label {
  margin: 0 0.5em;
  font-weight: bold;
}

code {
  background-color: #eee;
  padding: 2px 4px;
  border-radius: 4px;
  color: #304455;
}
</style>
