<template>
    <div class="p-transfer-select">
        <SelectInput
                :title="title"
                :unit="unit"
                :placeholder="placeholder"
                :triangle="transferShow"
                :data="selectedData"
                :tipPlace="tipPlace"
                :activeClose="activeClose"
                v-model="searchValue"
                @changeValue="changeValue"
                @changeTriangle="changeTriangle"
        />
        <transition name="slideDownUpUi">
            <div class="p-transfer-select-box"
                 v-show="transferShow"
                 @mouseenter="boxEnter"
                 @mouseleave="boxLeave"
            >
                <TransferMini
                        :data="data"
                        :linkage="linkage"
                        :lastStage="lastStage"
                        :height="height"
                        :searchValue="searchValue"
                        @changeValue="changeValue"
                        @cancel="transferCancel"
                        @confirm="transferConfirm"
                />
            </div>
        </transition>
    </div>
</template>

<script>
    import SelectInput from '../selectInput';
    import TransferMini from '../transferMini';
    export default {
        name: "TransferSelect",
        components: { SelectInput, TransferMini },
        props: {
            // 选择内容后的title
            title: {
                type: String,
                default: ''
            },
            // 单位
            unit: {
                type: String,
                default: '个'
            },
            // 占位符
            placeholder: {
                type: String,
                default: '请选择'
            },
            // 提示框位置
            tipPlace: {
                type: String,
                default: 'bottom'
            },
            /*穿梭框数据*/
            data: {
                type: Array,
                default: []
            },
            // 上下级联动
            linkage: {
                type: Boolean,
                default: true
            },
            // 只能选择末级
            lastStage: {
                type: Boolean,
                default: false
            },
            // 只能选择末级
            height: {
                type: [String, Number],
                default: 480
            }
        },
        data() {
            return {
                searchValue: '', // 输入的值
                transferShow: false, // 穿梭框显示
                tipModal: true, // 选择框是否可显示提示
                selectedData: [], // 选中的数据
                activeClose: false // 是否可关闭弹窗
            }
        },
        methods: {
            // 点击改变 三角形方向/弹窗显示状态
            changeTriangle(v) {
                this.transferShow=v;
                this.activeClose=v;
            },
            // 输入的值改变
            changeValue(v) {
                this.searchValue=v;
            },
            boxEnter() {
                this.activeClose=false;
            },
            boxLeave() {
                this.activeClose=true;
            },
            /**
             * 穿梭框取消回调-关闭弹窗
             */
            transferCancel() {
                this.transferShow=false;
            },
            /**
             * 穿梭框确定函数
             * @param ids 选中的id
             * @param sd 选中的数据
             */
            transferConfirm(ids, sd) {
                this.transferCancel();

                this.selectedData=sd;
                this.$emit('confirm', ids);
            }
        }
    }
</script>

<style lang="stylus">
@import "../static/stylus/animate/slideDownUpUi.styl"
.p-transfer-select
    position relative
    display inline-block
    outline none
    width 100%
    .p-transfer-select-box
        position absolute
        top 32px
        left 0
        margin-top 8px
        z-index 101

</style>