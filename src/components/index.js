/**
 * 所有组件打包
 */
import 'stylus/main.styl';

import Icon from './icon/Icon';
import Button from './button/Button';
import Modal from './modal/Modal';
import Drawer from './drawer/Drawer';
import Toggle from './toggle';
import Dropdown from './dropdown';
import Dropgroup from './dropgroup';
import Select from './select';
import Badge from './badge';
import Divider from './divider';
import Carouseltext from './carouseltext';
import Tabs from './tabs';
import Breadcrumb from './breadcrumb';
import Pickertime from './pickertime';
import Pickerday from './pickerday';
import Pickerweek from './pickerweek';
import Pickeryear from './pickeryear';
import Pickermonth from './pickermonth';
import Tree from './tree';
// import Selectcheck from './selectcheck';

import Headers from './headers';

import Message from './message'; // 函数式组件

const Components = {
    Icon
    ,Button
    ,Modal
    ,Drawer
    ,Toggle
    ,Dropdown
    ,Dropgroup
    ,Select
    ,Badge
    ,Divider
    ,Carouseltext
    ,Tabs
    ,Breadcrumb
    ,Pickertime
    ,Pickerday
    ,Pickerweek
    ,Pickermonth
    ,Pickeryear
    ,Tree

    ,Headers

    ,Message
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
