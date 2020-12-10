import Vue from 'vue';
import App from './App.vue';
import {getBus} from 'obvious-core';

Vue.config.productionTip = false;

const bus = getBus('host');
bus.createApp('vue-app')
  .bootstrap(async (config) => {
    new Vue({
      render: h => h(App),
    }).$mount(config.mountPoint);
  });
