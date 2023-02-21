import { createApp } from 'vue'
import { hostApp } from './blocks/host-app'
import App from './components/App.vue'

export const mount = (container: HTMLElement) => {
  const app = createApp(App)
  const naiveUI = hostApp.methods.useNaiveUI()
  app.use(naiveUI)
  app.mount(container)
}
