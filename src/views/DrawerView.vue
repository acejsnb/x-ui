<template>
    <div class="Button">
        <div class="component component-padding">
            <h1 @click="drawerShow">Drawer组件</h1>
            <Button type="primary" @click="drawerShow">drawerShow</Button>
            <!--
                组件说明:
                    参数   说明           默认值   类型   是否必须
                    show  控制弹窗隐藏显示 false   Boolean true
                    title 弹窗标题  '' String false
                    focus 是否自动关闭弹窗 false Boolean false
                    loading 点击确定是否出现loading效果 false Boolean false
                    changeLoading 改变加载中状态 false Function false
                    btnShow 底部操作按钮是否显示 false Boolean false
                    bottom 操作按钮是否固定在底部 false Boolean false
                    changeDrawerStatus 打开/关闭弹窗函数 无  Function true
                    confirm 弹窗确定函数 无  Function false
            -->
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
            <div style="font-size: 16px;">
                <br><br><br><br><br><br><br><br>
                <br><br><br><br><br><br><br><br>
                <br><br><br><br><br><br><br><br>
                <br><br><br><br><br><br><br><br>
                <br><br><br><br><br><br><br><br>
                <br><br><br><br><br><br><br><br>
                <br><br><br><br><br><br><br><br>
                <br><br><br><br><br><br><br><br>
                <br><br><br><br><br><br><br><br>
                <br><br><br><br><br><br><br><br>
                <br><br><br><br><br><br><br><br>
                <br><br><br><br><br><br><br><br>
                <br><br><br><br><br><br><br><br>
                <br><br><br><br><br><br><br><br>
                <br><br><br><br><br><br><br><br>
                <br><br><br><br><br><br><br><br>
                <br><br><br><br><br><br><br><br>
                <br><br><br><br><br><br><br><br>
            </div>
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

<style lang="stylus" scoped>

</style>
