import * as Vue from 'vue'
import App from './App.vue'
import * as Rallie from 'rallie'

interface PublicState {
  count: number
}

let app = null

if (!Rallie.existApp('vite-app')) {
  app = Rallie.createApp<PublicState>('vite-app', (configurator) => {
    configurator
      .initPublicState({
        count: 0
      })
      .onBootstrap((containerId: string) => {
        Vue.createApp(App).mount(containerId)
      })
  })
  app.runInHostMode(() => {
    Rallie.activateApp('vite-app', '#app')
  })
}

export default app
