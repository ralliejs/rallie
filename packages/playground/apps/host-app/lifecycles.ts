import { createApp } from 'vue'
import Provider from './Provider.vue'
import { hostApp } from './block'
import { NButton, create } from 'naive-ui'

export const onBootstrap = () => {
  hostApp.addMethods({
    useNaiveUI: () => {
      const naive = create({
        components: [NButton],
      })
      return naive
    },
  })
  const root = document.createElement('div')
  const instance = createApp(Provider)
  instance.mount(root)
  document.body.appendChild(root)
}
