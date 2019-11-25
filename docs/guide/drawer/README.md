### Drawer

<template>
    <div class="Button">
        <div class="component component-padding">
            <h1>Drawer组件</h1>
            <Button type="primary" @click="drawerShow">drawerShow</Button>
            <Drawer
                    :show="drawerStatus"
                    title="抽屉"
                    :focus="true"
                    :loading="iconLoading"
                    @changeLoading="changeLoading"
                    :btnShow="true"
                    :bottom="true"
                    @changeStatus="changeStatus"
                    @confirm="drawerConfirm"
            >
                <div style="width: 500px;font-size: 20px">
                    123
                    456
                    789
                </div>
            </Drawer>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'DrawerView',
        data() {
            return {
                drawerStatus: false,
                iconLoading: false
            }
        },
        methods: {
            // 改变抽屉显示状态
            changeStatus(v) {
                this.drawerStatus=v
            },
            // 改变loading状态
            changeLoading(v) {
                this.iconLoading=v
            },
            drawerShow() {
                if (this.drawerStatus) return;
                this.drawerStatus=true;
                console.log(this.drawerStatus);
            },
            drawerConfirm() {
                console.log('alertConfirm')
            },
        }
    }
</script>

```vue
<template>
    <div class="Button">
        <div class="component component-padding">
            <h1>Drawer组件</h1>
            <Button type="primary" @click="drawerShow">drawerShow</Button>
            <Drawer
                    :show="drawerStatus"
                    title="抽屉"
                    :focus="true"
                    :loading="iconLoading"
                    @changeLoading="changeLoading"
                    :btnShow="true"
                    :bottom="true"
                    @changeStatus="changeStatus"
                    @confirm="drawerConfirm"
            >
                <div style="width: 500px;font-size: 20px">
                    123
                    456
                    789
                </div>
            </Drawer>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'DrawerView',
        data() {
            return {
                drawerStatus: false,
                iconLoading: false
            }
        },
        methods: {
            // 改变抽屉显示状态
            changeStatus(v) {
                this.drawerStatus=v
            },
            // 改变loading状态
            changeLoading(v) {
                this.iconLoading=v
            },
            drawerShow() {
                if (this.drawerStatus) return;
                this.drawerStatus=true;
                console.log(this.drawerStatus);
            },
            drawerConfirm() {
                console.log('alertConfirm')
            },
        }
    }
</script>

```

### Attributes

| 参数     | 说明  | 类型    | 默认值  | 必须    |
| ------- | ---- | ------ | ------- | ------ |
| show    | 侧拉窗显示状态 | Boolean | false | yes     |
| title    | 标题 | String | '' | no     |
| focus    | 开启鼠标失去焦点自动关闭 | Boolean | false | no     |
| loading    | 是否开启loading效果 | Boolean | false | no     |
| @changeLoading    | 该表loading | Function | false | no     |
| btnShow    | 底部按钮是否显示 | Boolean | false | no     |
| bottom    | 底部按钮是否固定在底部 | Boolean | false | no     |
| @changeStatus    | 控制侧拉窗显示关闭回调 | Function | false | no     |
| @confirm    | 确定按钮点击回调 | Function | false | no     |