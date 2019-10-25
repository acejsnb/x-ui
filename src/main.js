import Vue from 'vue';

import 'stylus/main';

import router from './router';
import store from './store';

import App from './App';
import Components from 'index';



Vue.use(Components);


Vue.config.productionTip = false;

import hljs from 'highlight.js'
import 'stylus/github'

Vue.directive('highlight', (el) => {
    let blocks = el.querySelectorAll('pre');
    blocks.forEach((block) => {
        hljs.highlightBlock(block)
    });
    // let h3 = el.querySelectorAll('h3');
    // h3.forEach((block) => {
    //     console.log('block******', block);
    //     hljs.highlightAuto(block)
    // });
    // let table = el.querySelectorAll('table');
    // table.forEach((block) => {
    //     console.log('block******', block);
    //     hljs.highlightBlock(block)
    // });
});

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#persagyUi');
