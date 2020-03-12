import Vue from 'vue';
import D from './DOption';
const DOptionExtend=Vue.extend(D);

let DOptionVm=null; // 当前实例

const DropOption=(options) => {
    const {tag, prams}=options;
    const {top, left, height}=tag.target.getBoundingClientRect(); // 根据当前点击的dom对象获取位置
    const dom=document.body;

    DOptionVm=new DOptionExtend({data: prams}); // 实例化
    DOptionVm=DOptionVm.$mount(); // 挂载

    // 设置位置
    DOptionVm.$el.style.top=top+height+'px';
    DOptionVm.$el.style.left=left+'px';

    dom.appendChild(DOptionVm.$el); // 插入dom

    return DOptionVm;
};

DropOption.remove=(vm) => {
    if (!vm) return;
    if (vm._isDestroyed) return;
    vm.$destroy();
    const dom=vm.$el;
    if (dom) dom.parentNode.removeChild(dom);
};

export default DropOption;