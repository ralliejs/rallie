const code = `\
console.error('xxxxxxx')
const bus = window.RALLIE_BUS_STORE.DEFAULT_BUS;
bus.createApp('app-to-test-load-script')
  .onBootstrap(async () => {
    console.log('app-to-test-load-script is created');
  })
`

export default code
