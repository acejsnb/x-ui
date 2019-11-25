/**
 * 所有组件打包
 */

import Icon from './icon/Icon';
import Button from './button/Button';
import Modal from './modal/Modal';
import Drawer from './drawer/Drawer';
import Toggle from './toggle';
import Dropdown from './dropdown';
import DropGroup from './dropGroup';
import Select from './select';
import Badge from './badge';
import Divider from './divider';
import CarouselText from './carouselText';
import Tabs from './tabs';
import Breadcrumb from './breadcrumb';
import PickerTime from './pickerTime';
import PickerDay from './pickerDay';
import PickerWeek from './pickerWeek';
import PickerYear from './pickerYear';
import PickerMonth from './pickerMonth';
import Tree from './tree';
import Shake from './shake';
import Stick from './stick';

import Headers from './headers';

import Message from './message'; // 函数式组件

const Components = {
    Icon
    ,Button
    ,Modal
    ,Drawer
    ,Toggle
    ,Dropdown
    ,DropGroup
    ,Select
    ,Badge
    ,Divider
    ,CarouselText
    ,Tabs
    ,Breadcrumb
    ,PickerTime
    ,PickerDay
    ,PickerWeek
    ,PickerMonth
    ,PickerYear
    ,Tree
    ,Shake
    ,Stick

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
