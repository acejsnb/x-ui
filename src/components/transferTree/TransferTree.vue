<template>
    <div class="p-transfer-select"
         tabindex="-1"
         @blur="transferBlur"
         ref="transferSelect"
    >
        <SelectedButton
                :title="title"
                :unit="unit"
                :placeholder="placeholder"
                :triangle="triangle"
                :data="selectedData"
                :tipPlace="tipPlace"
                @changeTriangle="changeTriangle"
        />
        <transition name="slideDownUpUi">
            <div class="p-transfer-select-box"
                 v-show="transferShow"
                 @mouseenter="boxEnter"
                 @mouseleave="boxLeave"
            >
                <Transfer
                        :data="data"
                        :linkage="linkage"
                        :lastStage="lastStage"
                        :height="height"
                        @cancel="transferCancel"
                        @confirm="transferConfirm"
                />
            </div>
        </transition>
    </div>
</template>

<script>
    import SelectedButton from '../selectedButton';
    import Transfer from '../transfer';
    export default {
        name: "TransferTree",
        components: { SelectedButton, Transfer },
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
                triangle: false, // 三角形
                transferShow: false, // 穿梭框显示
                tipModal: true, // 选择框是否可显示提示
                // 选中的数据
                selectedData: [],
                activeClose: false // 是否可关闭弹窗
            }
        },
        methods: {
            // 点击改变三角形方向
            changeTriangle() {
                const status=!this.triangle;
                this.triangle=status;
                this.transferShow=status;
                this.activeClose=status;
            },
            // 失去焦点
            transferBlur() {
                if (this.activeClose) this.closeBox();
            },
            // 关闭弹窗
            closeBox() {
                this.triangle=false;
                this.transferShow=false;
            },
            boxEnter() {
                this.activeClose=false;
            },
            boxLeave() {
                this.activeClose=true;
                this.$refs.transferSelect.focus();
            },
            /**
             * 穿梭框取消回调
             * @param ids 选中的id
             * @param sd 选中的数据
             */
            transferCancel(ids, sd) {
                this.activeClose=true;
                this.closeBox();
            },
            /**
             * 穿梭框确定函数
             * @param ids 选中的id
             * @param sd 选中的数据
             */
            transferConfirm(ids, sd) {
                this.activeClose=true;
                this.closeBox();

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