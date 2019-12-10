<template>
    <div>
        <div id="app">
            <img alt="Vue logo" src="assets/logo.png">
            <HelloWorld v-bind:text="text"/>
        </div>
    </div>
</template>

<script>
import HelloWorld from './HelloWorld.vue'

export default {
    name: 'app',
    components: {
        HelloWorld
    },
    data:function(){
        return {
            text:'abcde'
        }
    },
    watch:{
        text:function(newValue,oldValue){
            console.log('1', newValue);
        }
    },
    methods:{
        changeText: function(text){
            console.log('2', text);
            this.text = text;
            console.log('text', this.text);
        }
    },
    created: function() {
        console.log('created');
        this.text = window.vueSocket.getState('text');
        window.vueSocket.watchState('text', this.changeText);
    },
    beforeDestroyed: function() {
        console.log('before destroy');
        //window.vueSocket.unwatch('text', this.changeText);
    }
}
</script>

<style scoped>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
