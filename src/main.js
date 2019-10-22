import Vue from 'vue';

import 'stylus/main';

import router from './router';
import store from './store';

import App from './App';
import Components from 'index';

// console.log(Components);
Vue.use(Components);

Vue.config.productionTip = false;


import hljs from 'highlight.js'
import 'stylus/github'

Vue.directive('highlight', (el) => {
    let blocks = el.querySelectorAll('pre code');
    blocks.forEach((block) => {
        hljs.highlightBlock(block)
    })
});

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#persagyUi');
