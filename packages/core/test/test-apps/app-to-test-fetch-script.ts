const code = `\
const bus = window.RALLIE_BUS_STORE.DEFAULT_BUS;
bus.createApp('app-to-test-fetch-script')
  .relyOn([
    'lib:react'
  ])
  .onBootstrap(async () => {
    console.log('app-to-test-fetch-script is created');
  })
`

export default code
