const code = `\
/**
 * this is a file which does not use 'bus.createApp' 
 * to create an app, when it's activated, there should
 * be an error to be throwed
 **/

const doSomething = () => {
  console.log('app-invalid loaded');
};
doSomething();
`

export default code
