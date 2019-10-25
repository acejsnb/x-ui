### 示例
```vue
<template>
    <div class="Button">
        <div class="component component-padding">
            <h1>Message组件</h1>
            <Button type="default" @click="messageInfo">info</Button>
            <Button type="primary" @click="messageSuccess">success</Button>
            <Button type="warning" @click="messageWarning">warning</Button>
            <Button type="error" @click="messageError">error</Button>
        </div>
    </div>
</template>

<script>
    export default {
        name: "MessageView",
        methods: {
            messageInfo() {
                this.$message.info('这是一条消息');
            },
            messageSuccess() {
                this.$message.success('Oh,yes');
            },
            messageWarning() {
                this.$message.warning('Oh,no');
            },
            messageError() {
                this.$message({
                    type: 'error',
                    message: `
                        错了哦，这是一条错误消息
                        错了哦，这是一条错误消息
                        错了哦，这是一条错误消息
                        错了哦，这是一条错误消息
                        错了哦，这是一条错误消息
                        错了哦，这是一条错误消息
                        错了哦，这是一条错误消息
                        错了哦，这是一条错误消息
                    `
                });
            },
        }
    }
</script>

```

### Attributes

| 参数     | 说明  | 类型    | 默认值  | 必须    |
| ------- | ---- | ------ | ------- | ------ |
| type    | 类型(可选 info/success/warning/error) | String | -- | Yes     |
| message    | 提示内容 | String | ‘’  | no     |
