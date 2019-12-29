import Vue from 'vue';
import App from './App.vue';

Vue.config.productionTip = false;

window.globalBus.createSocket('vueSocket', ['text'], (socket) => {
    console.log('created vue socket'); 
    socket.on('mountVuePage', () => {
        const vueApp = new Vue({
            render: h => h(App),
        });
        vueApp.$mount('#_vueRoot');
    });

    socket.on('unmountVuePage', () => {
        document.getElementById('vueRoot').innerHTML = "<div id='_vueRoot'></div>"; // eslint-disable-line
    });
});
