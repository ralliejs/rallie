import Vue from 'vue';
import App from './App.vue';

Vue.config.productionTip = false;

const bus = window.__Bus__.host;
bus.createApp('vue-app')
  .bootstrap(async (config) => {
    new Vue({
      render: h => h(App),
    }).$mount(config.mountPoint);
  });
