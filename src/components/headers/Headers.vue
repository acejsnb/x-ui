<template>
    <div class="p-headers">
        <Tabs :data="tabData" v-model="tabIdModel" />
        <div class="p-header-left">
            <Select v-if="selectData.length" class="p-header-select" :data="selectData" v-model="selectIdModel" width="120" />
            <Breadcrumb :data="breadData" v-model="breadIdModel" />
        </div>
        <div class="p-header-right" v-if="btnType">
            <Button :type="btnType" @click="btnClick">更多</Button>
        </div>
    </div>
</template>

<script>
    import Tabs from 'tabs/Tabs';
    import Select from 'selectSaas/select';
    import Breadcrumb from 'breadcrumb/Breadcrumb';
    import Button from 'button/Button';

    export default {
        name: "Headers",
        components: { Tabs, Select, Breadcrumb, Button },
        props: {
            /**
             * 标签页id
             */
            tabId: {
                type: String,
                default: ''
            },
            /**
             * 标签页数据
             */
            tabData: {
                type: Array,
                default: []
            },
            /**
             * 下拉列表id
             */
            selectId: {
                type: String,
                default: ''
            },
            /**
             * 下拉列表数据
             */
            selectData: {
                type: Array,
                default: ()=>[]
            },
            /**
             * 面包屑id
             */
            breadId: {
                type: String,
                default: ''
            },
            /**
             * 面包屑数据
             */
            breadData: {
                type: Array,
                default: []
            },
            /**
             * 右侧按钮类型，默认不显示按钮
             */
            btnType: {
                type: String,
                default: ''
            }
        },
        computed: {
            tabIdModel: {
                get() {
                    return this.tabId;
                },
                set(v) {
                    /**
                     * 标签页id改变
                     * @type {Function}
                     */
                    this.$emit('tabChange', v)
                }
            },
            selectIdModel: {
                get() {
                    return this.selectId;
                },
                set(v) {
                    /**
                     * 下拉列表id改变
                     * @type {Function}
                     */
                    this.$emit('selectChange', v)
                }
            },
            breadIdModel: {
                get() {
                    return this.breadId;
                },
                set(v) {
                    /**
                     * 面包屑id改变
                     * @type {Function}
                     */
                    this.$emit('breadChange', v)
                }
            }
        },
        methods: {
            btnClick() {
                /**
                 * 点击右侧按钮的回调
                 * @type {Function}
                 */
                this.$emit('btnClick')
            }
        }
    }
</script>

<style lang="stylus" scoped>

@import "~stylus/tools.styl"

.p-headers
    position relative
    background-color $grey-grey-100
    border-bottom 1px solid $grey-grey-300
    width 100%
    height 48px
    text-align center
    .p-header-left
        position absolute
        left 16px
        top 0
        display flex
        align-items center
        height @height
        .p-header-select
            margin-right 12px
    .p-header-right
        position absolute
        right 16px
        top 0
        display flex
        justify-content flex-end
        align-items center
        height @height

</style>