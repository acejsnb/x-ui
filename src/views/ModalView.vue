<template>
    <div class="Button">
        <div class="component component-padding">
            <h1>Modal组件</h1>
            <Button type="primary" @click="modalShowDefault">modalShowDefault</Button>
            <Button type="primary" @click="modalShowFull">modalShowFull</Button>
            <Button type="primary" @click="modalShowSmall">modalShowSmall</Button>
            <!--
                组件说明:
                    show
                    title
                    iconLoading
                    mode full-全屏显示 default-(默认值)自适应宽高 small-最小对话框
                    close
                    confirm
            -->
            <Modal
                    :show="modalStatusDefault"
                    title="弹窗提示"
                    :iconLoading="true"
                    mode="default"
                    @close="modalClose"
                    @confirm="modalConfirm"
            >
                <div style="font-size: 20px; width: 600px">
                    123
                    <br><br><br><br><br><br><br><br>
                    <br><br><br><br><br><br><br><br>
                    <br><br><br><br><br><br><br><br>
                    <br><br><br><br><br><br><br><br>
                    456
                </div>
            </Modal>
            <Modal
                    :show="modalStatusFull"
                    title="弹窗提示"
                    :iconLoading="true"
                    mode="full"
                    @close="modalClose"
                    @confirm="modalConfirm"
            >
                <div style="font-size: 20px; width: 600px">
                    123
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
                    <br><br><br><br><br><br><br><br>
                    <br><br><br><br><br><br><br><br>
                    456
                </div>
            </Modal>
            <Modal
                    :show="modalStatusSmall"
                    title="弹窗提示"
                    :iconLoading="true"
                    mode="small"
                    @close="modalClose"
                    @confirm="modalConfirm"
            >
                <div style="font-size: 20px;">
                    123
                    456
                </div>
            </Modal>
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
        name: 'ModalView',
        data() {
            return {
                modalStatusDefault: false,
                modalStatusFull: false,
                modalStatusSmall: false,
            }
        },
        methods: {
            modalShowDefault() {
                this.modalStatusDefault=true
            },
            modalShowFull() {
                this.modalStatusFull=true
            },
            modalShowSmall() {
                this.modalStatusSmall=true
            },
            modalClose() {
                this.modalStatusDefault=false;
                this.modalStatusFull=false;
                this.modalStatusSmall=false;
            },
            modalConfirm() {
                console.log('alertConfirm')
            },
        }
    }
</script>

<style lang="stylus" scoped>

</style>
