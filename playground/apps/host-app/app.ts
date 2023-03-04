import { createApp } from 'vue'
// @ts-ignore
import Provider from './Provider.vue'
import { hostApp } from './block'
import { NButton, create } from 'naive-ui'

hostApp.addMethods({
  useNaiveUI(this: { trigger: string }) {
    console.log(this.trigger)
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
