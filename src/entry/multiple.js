/**
 * 所有组件打包
 */

import '../components/base';
import Button from '../components/Button';
import Modal from '../components/Modal';
import Drawer from '../components/Drawer';
import Toggle from '../components/Toggle';
import Dropdown from '../components/Dropdown';
import DropGroup from '../components/DropGroup';
import Select from '../components/Select';
import SelectSearch from '../components/SelectSearch';
import Badge from '../components/Badge';
import Divider from '../components/Divider';
import Tabs from '../components/Tabs';
import Breadcrumb from '../components/Breadcrumb';
import PickerTime from '../components/PickerTime';
import PickerDay from '../components/PickerDay';
import PickerWeek from '../components/PickerWeek';
import PickerYear from '../components/PickerYear';
import PickerMonth from '../components/PickerMonth';
import Tree from '../components/Tree';
import TreeBi from '../components/TreeBi';
import Stick from '../components/Stick';
import Tag from '../components/Tag';
import Transfer from '../components/Transfer';
import TransferSelect from '../components/TransferSelect';
import TransferSelectModal from '../components/TransferSelectModal';

// 组合组件
import Headers from '../components/Headers';

// 函数式组件
import Message from '../components/Message';

// 未公开组件
import TransferMini from '../components/TransferMini';
import Shake from '../components/Shake';
import TreeStage from '../components/TreeStage';
import CarouselText from '../components/CarouselText';
import SelectButton from '../components/SelectButton';
import SelectInput from '../components/SelectInput';
import Checkbox from '../components/Checkbox';
import Radio from '../components/Radio';
import Input from '../components/Input';
import Icon from '../components/Icon';

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
if (typeof window !== undefined && window.Vue) {
    install(window.Vue);
}

Components.install=install;

export default Components;
