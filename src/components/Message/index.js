import Vue from 'vue';
import MsgBox from './depend/messageBox';
import Msg from './Message';
const MessageBox = Vue.extend(MsgBox);
const MessageConstructor = Vue.extend(Msg);

let instanceBox = null // 当前实例盒子
    ,instance = null // 当前实例
    ,instances = [] // 实例组
    ,seed = 0
    ,timers = [];

const Message = (options) => {
    if (Vue.prototype.$isServer) return; // 当前 Vue 实例是否运行于服务器。
    options = options || {};
    if (typeof options === 'string') { // 如果只传入字符串，将其设置为显示的信息
        options = {
            message: options // 这里的message就是message.vue中data中的message
        };
    }
    let id = 'message_' + seed++;

    // 消息提示盒子实例化
    if (!instanceBox) {
        instanceBox = new MessageBox();
        instanceBox=instanceBox.$mount();
        document.body.appendChild(instanceBox.$el); // 将dom插入body
    }

    instance = new MessageConstructor({ // 实例化一个带有content内容的Notice
        data: options // 在这里将你传过来的参数匹配到message.vue组件的data
    });
    instance.id = id;
    instance = instance.$mount(); // 挂载但是并未插入dom，是一个完整的Vue实例
    // console.log('instance::', instance);
    instance.visible = true; // 这里修改message.vue数据中的visible,这样message组件就显示出来
    instanceBox.$el.appendChild(instance.$el);
    instance.$el.style.zIndex=seed + 1001; // 后插入的Notice组件z-index加一，保证能盖在之前的上面
    instance.$el.style.transform='translateZ(0)'; // 解决transform带来的z-index失效
    instances.push(instance);
    Message.setTimer(id, instance);

    return instance;
};

['success', 'warning', 'info', 'error'].forEach(type => {
    Message[type] = options => {
        if (typeof options === 'string') {
            options = {
                message: options
            };
        }
        options.type = type;
        return Message(options);
    };
});

/**
 * 设置定时器
 * @param id 当前实例id
 * @param instance 当前实例
 */
Message.setTimer = (id, instance) => {
    timers.push(window.setTimeout(() => {
        Message.clearTimer(id, instance)
    }, 3000))
};

Message.clearTimer = (id, instance) => {
    window.clearTimeout(timers[id]);
    instance.visible = false;
    instance.$el.style.transition='all .3s';
    instance.$el.style.opacity='.5';
    instance.$el.style.marginTop='0';
    setTimeout(() => {
        instance.$destroy();
        instanceBox.$el.removeChild(instance.$el);
        const ind=instances.findIndex(d => d.id === id);
        timers.splice(ind, 1);
        instances.splice(ind, 1);
    }, 300)
};

export default Message;
