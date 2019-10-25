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