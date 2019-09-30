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
                    iconLoading 点击确定是否出现loading效果 false Boolean false
                    bottom 是否固定在底部 false Boolean false
                    close 关闭弹窗函数 无  Function true
                    confirm 关闭弹窗函数 无  Function false
            -->
            <Drawer
                    :show="drawerStatus"
                    title="弹窗提示"
                    :focus="false"
                    :iconLoading="true"
                    :bottom="true"
                    @close="drawerClose"
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
                drawerStatus: false
            }
        },
        methods: {
            drawerShow() {
                this.drawerStatus=true
            },
            drawerClose() {
                this.drawerStatus=false
            },
            drawerConfirm() {
                console.log('alertConfirm')
            },
        }
    }
</script>

<style lang="stylus" scoped>

</style>
