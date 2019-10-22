<template>
    <div class="p-headers">
        <Tabs :data="tabData" v-model="tabIdModel" />
        <div class="p-header-left">
            <Select v-if="selectData.length" class="p-header-select" :data="selectData" v-model="selectIdModel" width="120" />
            <Breadcrumb :data="breadData" v-model="breadIdModel" />
        </div>
        <div class="p-header-right" v-if="btnType">
            <Button :type="btnType" @click="$emit('btnClick')">更多</Button>
        </div>
    </div>
</template>

<script>
    import Tabs from 'tabs/Tabs';
    import Select from 'selectSaas/Select';
    import Breadcrumb from 'breadcrumb/Breadcrumb';
    import Button from 'button/Button';

    export default {
        name: "Headers",
        components: { Tabs, Select, Breadcrumb, Button },
        props: {
            tabId: {
                type: String,
                default: ''
            },
            tabData: {
                type: Array,
                default: []
            },
            selectId: {
                type: String,
                default: ''
            },
            selectData: {
                type: Array,
                default: ()=>[]
            },
            breadId: {
                type: String,
                default: ''
            },
            breadData: {
                type: Array,
                default: []
            },
            btnType: {
                type: String,
                default: ''
            }
        },
        computed: {
            // tab标签页绑定的值
            tabIdModel: {
                get() {
                    return this.tabId;
                },
                set(v) {
                    this.$emit('tabChange', v)
                }
            },
            // 下拉列表绑定的值
            selectIdModel: {
                get() {
                    return this.selectId;
                },
                set(v) {
                    this.$emit('selectChange', v)
                }
            },
            // 面包屑绑定的值
            breadIdModel: {
                get() {
                    return this.breadId;
                },
                set(v) {
                    this.$emit('breadChange', v)
                }
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