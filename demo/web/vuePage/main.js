import Vue from 'vue';
import App from './App.vue';
import {getBus} from '@runnan/obvious';

Vue.config.productionTip = false;
const bus = getBus('global');

bus.DEPRECATED_createSocket('vueSocket', ['text'], (socket) => {
    let vueApp = null;
    socket.on('mountVuePage', () => {
        vueApp = new Vue({
            render: h => h(App),
        });
        vueApp.$mount('#_vueRoot');
    });

    socket.on('unmountVuePage', () => {
        document.getElementById('vueRoot').innerHTML = "<div id='_vueRoot'></div>"; // eslint-disable-line
    });
});
