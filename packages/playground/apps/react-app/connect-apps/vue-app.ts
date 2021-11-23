import { reactApp } from '../app'

export const vueApp = reactApp.connect<{ count: number }, {}, {}>('vue-app')
