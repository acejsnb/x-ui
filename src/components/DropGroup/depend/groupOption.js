import Vue from 'vue';
import G from './GOption';
const GOptionExtend=Vue.extend(G);

let GOptionVm=null; // 当前实例

const GroupOption=(options) => {
    const {tag, prams}=options;
    const {top, left, height}=tag.target.getBoundingClientRect(); // 根据当前点击的dom对象获取位置
    const dom=document.body;

    GOptionVm=new GOptionExtend({data: prams}); // 实例化
    GOptionVm=GOptionVm.$mount(); // 挂载

    // 设置位置
    GOptionVm.$el.style.top=top+height+'px';
    GOptionVm.$el.style.left=left+'px';

    dom.appendChild(GOptionVm.$el); // 插入dom

    return GOptionVm;
};

GroupOption.remove=(vm) => {
    if (!vm) return;
    if (vm._isDestroyed) return;
    vm.$destroy();
    const dom=vm.$el;
    if (dom) dom.parentNode.removeChild(dom);
};

export default GroupOption;