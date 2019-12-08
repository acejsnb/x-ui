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
import SelectSearch from './selectSearch';
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
import TreeStage from './treeStage';
import TreeBi from './treeBi';
import Shake from './shake';
import Stick from './stick';
import Tag from './tag';
import TransferBi from './transferBi';

import Headers from './headers';

import Message from './message'; // 函数式组件

import Checkbox from './checkbox';
import Radio from './radio';

const Components = {
    Icon
    ,Button
    ,Modal
    ,Drawer
    ,Toggle
    ,Dropdown
    ,DropGroup
    ,Select
    ,SelectSearch
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
    ,TreeStage
    ,TreeBi
    ,Shake
    ,Stick
    ,Tag
    ,TransferBi

    ,Headers

    ,Message

    // 未公开组件
    ,Checkbox
    ,Radio
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
