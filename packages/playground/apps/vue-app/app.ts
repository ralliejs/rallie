import { App } from 'rallie'
import { stateHook } from '@rallie/vue'

export const app = new App('vue-app', {
  state: {
    public: {
      count: 0
    }
  }
})

export const usePublicState = stateHook(app.publicState)
