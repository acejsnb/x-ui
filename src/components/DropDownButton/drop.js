import Vue from 'vue';
import DropList from './DropList';
const DropListConstructor = Vue.extend(DropList);

let instance = null; // 当前实例

const DropListToggle = (op) => {
    instance = new DropListConstructor({ // 实例化一个带有content内容的Notice
        data: {
            /*i: op.i,*/
            type: op.type,
            interactive: op.interactive,
            id: op.id,
            size: op.size,
            dropDownList: op.dropDownList,
            dropDownType: op.dropDownType,
            m: op.m,
        }, // 在这里将你传过来的参数匹配到DropList.vue组件的data
        methods: {
            choose: op.choose,
            buttonLeave: op.buttonLeave,
            DropListBlur: op.DropListBlur,
            DropListFocus: op.DropListFocus,
            buttonEnter: op.buttonEnter
        }
    });
    instance.vm = instance.$mount(); // 挂载但是并未插入dom，是一个完整的Vue实例
    document.body.appendChild(instance.vm.$el); // 将dom插入body
    return instance
};

export default DropListToggle;
