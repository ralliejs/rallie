import { registerBlock, createBlock } from '@rallie/block'
import { jsdelivrLibraryLoader, dynamicImportLoader, htmlLoader } from './middlewares' // eslint-disable-line
import loadHtml from '@rallie/load-html' // eslint-disable-line

const starter = createBlock('starter')

starter.run((env) => {
  const { isEntry } = env
  env.use(
    jsdelivrLibraryLoader({
      vue: `@3.2.45/dist/vue.global${isEntry ? '' : '.prod'}.js`,
    }),
  )
  env.use(dynamicImportLoader)
  // you can try to use the htmlLoader to replace the dynamicImportLoader
  // env.use(loadHtml())
  // env.use(htmlLoader)

  registerBlock(starter).onActivate(async () => {
    const mountApp = async (name: string) => {
      await starter.activate(name)
      const reactApp = starter.connect<any>(name)
      await reactApp.methods.mount(document.getElementById(name))
    }
    await Promise.all([mountApp('react-app'), mountApp('vue-app')])
  })

  if (isEntry) {
    starter.activate(starter.name)
  }
})
