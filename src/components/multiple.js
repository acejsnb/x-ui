/**
 * 所有组件打包
 */

import Button from './button';
import Modal from './modal';
import Drawer from './drawer';
import Toggle from './toggle';
import Dropdown from './dropdown';
import DropGroup from './dropGroup';
import Select from './select';
import SelectSearch from './selectSearch';
import Badge from './badge';
import Divider from './divider';
import Tabs from './tabs';
import Breadcrumb from './breadcrumb';
import PickerTime from './pickerTime';
import PickerDay from './pickerDay';
import PickerWeek from './pickerWeek';
import PickerYear from './pickerYear';
import PickerMonth from './pickerMonth';
import Tree from './tree';
import TreeBi from './treeBi';
import Stick from './stick';
import Tag from './tag';
import Transfer from './transfer';
import TransferSelect from './transferSelect';
import TransferSelectModal from './transferSelectModal';

// 组合组件
import Headers from './headers';

// 函数式组件
import Message from './message';

// 未公开组件
import TransferMini from './transferMini';
import Shake from './shake';
import TreeStage from './treeStage';
import CarouselText from './carouselText';
import SelectButton from './selectButton';
import SelectInput from './selectInput';
import Checkbox from './checkbox';
import Radio from './radio';
import Input from './input';
import Icon from './icon';

const Components = {
    Button
    ,Modal
    ,Drawer
    ,Toggle
    ,Dropdown
    ,DropGroup
    ,Select
    ,SelectSearch
    ,Badge
    ,Divider
    ,Tabs
    ,Breadcrumb
    ,PickerTime
    ,PickerDay
    ,PickerWeek
    ,PickerMonth
    ,PickerYear
    ,Tree
    ,TreeBi
    ,Stick
    ,Tag
    ,Transfer
    ,TransferSelect
    ,TransferSelectModal

    // 组合组件
    ,Headers

    // 函数式组件
    ,Message

    // 未公开组件
    ,TransferMini
    ,Shake
    ,TreeStage
    ,CarouselText
    ,SelectButton
    ,SelectInput
    ,Checkbox
    ,Radio
    ,Input
    ,Icon
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
