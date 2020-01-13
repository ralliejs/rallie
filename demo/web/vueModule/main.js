import Vue from 'vue';
import App from './App.vue';

Vue.config.productionTip = false;

console.log(window.Bus);

window.Bus.global.createSocket('vueSocket', ['text'], (socket) => {
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
