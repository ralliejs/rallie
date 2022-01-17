const code = `\
(function() {
  const bus = window.RALLIE_BUS_STORE.DEFAULT_BUS;
  bus.createApp('valid-app')
    .relyOn([
      'lib:react'
    ])
    .onBootstrap(async () => {
      console.log('valid-app is created');
    })
})()
`

export default code
