import Vue from 'vue';
import App from './App.vue';

Vue.config.productionTip = false;

window.globalBus.createSocket('vueSocket', ['text'], (socket) => {
    console.log('created vue socket');
    window.vueSocket = socket;
    window.vueApp = null; 
    socket.on('mountVuePage', () => {
        window.vueApp = new Vue({
            render: h => h(App),
        });
        window.vueApp.$mount('#_vueRoot');
    });

    socket.on('unmountVuePage', () => {
        document.getElementById('vueRoot').innerHTML = "<div id='_vueRoot'></div>"; // eslint-disable-line
    });
});
