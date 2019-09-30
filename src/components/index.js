
import Icon from './icon/Icon';
import Button from './button/Button';
import Modal from './modal/Modal';
import Drawer from './drawer/Drawer';
import Toggle from './toggle';

import Message from './message'; // 函数式组件
// import Message from './message/Message';
import List from './list';

const Components = {
    Icon
    ,Button
    ,Modal
    ,Drawer
    ,Toggle

    ,Message
    ,List
};

const install = Vue => Object.keys(Components).forEach(name => {
    if (name === 'Message') Vue.prototype.$message = Message;
    else Vue.component(name, Components[name]);
});

/* 支持使用标签的方式引入 */
if (typeof window !== 'undefined' && window.Vue) {
    install(window.Vue);
}

Components.install=install;

export default Components;
