/**
 * 所有组件打包
 */

import '../components/base';
import Button from '../components/Button';
import DropDownButton from '../components/DropDownButton';
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
import PickerDate from '../components/PickerDate';
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
import Checkbox from '../components/Checkbox';
import CheckboxGroup from '../components/CheckboxGroup';
import Radio from '../components/Radio';
import RadioGroup from '../components/RadioGroup';
import Avatar from '../components/Avatar';
import FileUpload from '../components/FileUpload';
import ImageUpload from '../components/ImageUpload';
import Table from '../components/Table';
import Pagination from '../components/Pagination';
import Popover from '../components/Popover';

// 组合组件
import Headers from '../components/Headers';

// 函数式组件
import Message from '../components/Message';
import Loading from '../components/Loading';

// 未公开组件
import TransferMini from '../components/TransferMini';
import Shake from '../components/Shake';
import TreeStage from '../components/TreeStage';
import CarouselText from '../components/CarouselText';
import SelectInput from '../components/SelectInput';
import Input from '../components/Input';
import Icon from '../components/Icon';

// 自定义指令
import Inserted from '../components/Tooltip'

const Components = {
    Button
    ,DropDownButton
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
    ,PickerDate
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
    ,Avatar
    ,FileUpload
    ,ImageUpload
    ,Table
    ,Pagination

    ,Checkbox
    ,CheckboxGroup
    ,Radio
    ,RadioGroup

    ,Icon
    ,Popover

    // 组合组件
    ,Headers

    // 函数式组件
    ,Message
    ,Loading

    // 未公开组件
    ,TransferMini
    ,Shake
    ,TreeStage
    ,CarouselText
    ,SelectInput
    ,Input
};

const install = Vue => Object.keys(Components).forEach(name => {
    Vue.directive('ptitle', {
        inserted: Inserted
    });

    if (name === 'Message') Vue.prototype.$message = Message;
    else if (name === 'Loading') Vue.prototype.$loading = Loading;
    else Vue.component(name, Components[name]);
});

/* 支持使用标签的方式引入 */
if (typeof window !== 'undefined' && window.Vue) {
    install(window.Vue);
}

Components.install=install;

export default Components;
