/**
 * v-clickoutside
 * @desc 点击元素外面才会触发的事件
 */
export default {
  bind (el, binding, vnode) {
    
      function documentHandler (e) {
          
          if (el.contains(e.target)) { // 如果点击的是绑定元素则不执行绑定函数
              return false;
          }
          if (binding.expression && !e.target.classList.contains('p-select-option')) { // 如果点击的不是绑定元素则执行绑定函数
              binding.value(e);
          }
      }
      el.__vueClickOutside__ = documentHandler;  
      document.addEventListener('click', documentHandler); // 添加事件监听
  },
  unbind (el, binding) {
      document.removeEventListener('click', el.__vueClickOutside__);  // 移除事件监听
      delete el.__vueClickOutside__;
  }
};
