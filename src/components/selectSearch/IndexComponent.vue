<template>
    <div class="p-select-search-component">
        <!--
            mt-多选树形结构
            mn-多选一维结构
            st-单选树形结构
            sn-单选一维结构
        -->
        <SelectMultipleSearchTree
                v-if="flat==='mt'"
                :linkage="linkage"
                :accept="accept"
                :selectedIds="selectedIds"
                :disabled="disabled"
                :width="width"
                :data="data"
                @change="optionClickMultiple"
        />
        <SelectMultipleSearch
                v-else-if="flat==='mn'"
                :accept="accept"
                :selectedIds="selectedIds"
                :disabled="disabled"
                :width="width"
                :data="data"
                @change="optionClickMultiple"
        />
        <SelectSingleSearchTree
                v-else-if="flat==='st'"
                :selectedId="value"
                :disabled="disabled"
                :width="width"
                :data="data"
                @change="optionClickSingle"
        />
        <SelectSingleSearch
                v-else-if="flat==='sn'"
                :selectedId="value"
                :disabled="disabled"
                :width="width"
                :data="data"
                @change="optionClickSingle"
        />
    </div>
</template>

<script>
    import SelectMultipleSearchTree from './depend/selectMultipleSearchTree';
    import SelectMultipleSearch from './depend/selectMultipleSearch';
    import SelectSingleSearch from './depend/selectSingleSearch';
    import SelectSingleSearchTree from './depend/selectSingleSearchTree';

    export default {
        name: "SelectSearch",
        components: { SelectMultipleSearchTree, SelectMultipleSearch, SelectSingleSearch, SelectSingleSearchTree },
        props: {
            // 是否禁用
            disabled: {
                type: Boolean,
                default: false
            },
            // 盒子宽度
            width: {
                type: [String, Number],
                default: 240
            },
            // 传入的数据
            data: {
                type: Array,
                default: []
            },
            /* 单选模式相关数据 -s*/
            // v-model绑定的值
            value: {
                type: String,
                default: ''
            },
            /* 单选模式相关数据 -e*/
            /* 多选选模式相关数据 -s*/
            multiple: {
                type: Boolean,
                default: false
            },
            // 联动
            linkage: {
                type: Boolean,
                default: true
            },
            // 收纳
            accept: {
                type: Boolean,
                default: true
            },
            // 选中的id组
            selectedIds: {
                type: Array,
                default: () => []
            }
            /* 多选选模式相关数据 -e*/
        },
        computed: {
            /*
            *   mt-多选树形结构
            *   mn-多选一维结构
            *   st-单选树形结构
            *   sn-单选一维结构
            */
            flat() {
                const mul=this.multiple;
                const tree=this.data.some(item => item.children && item.children.length); // 判断数组是一维还是多维 返回true表示多维
                if (mul && tree) return 'mt';
                else if (mul && !tree) return 'mn';
                else if (!mul && tree) return 'st';
                else if (!mul && !tree) return 'sn';
            }
        },
        methods: {
            // 提交当前选择的值-多选
            optionClickMultiple(ids) {
                this.$emit('change', ids);
            },
            // 提交当前选择的值-单选
            optionClickSingle(id) {
                this.$emit('input', id);
            }
        }
    }
</script>

<style lang="stylus">
@import "../static/stylus/animate/selectDownUp.styl"

.p-select-search-component
    display inline

.p-select-search
    position relative
    display inline-block
    z-index 100
    .p-select-search-box
        position relative
        padding-left 12px
        padding-right @padding-left
        background-color #fff
        border 1px solid $grey-400
        border-radius 4px
        width 100%
        min-height 32px
        overflow hidden
        cursor pointer
        z-index 101
        transition all .3s
        &:hover
            border-color $blue-500
        &.p-select-search-box-focus
            border-color $blue-500
            box-shadow 0 0 0 2px rgba(0,145,255,.2)
        &.p-select-search-box-disabled
            background-color $grey-400
            cursor not-allowed
            &:hover
                border-color $grey-400
        .p-select-search-field-text
            position absolute
            left 0
            top 0
            padding-left 12px
            width 100%
            height 30px
            line-height @height
            color $grey-400
            font-size 14px
            z-index 1
            &.p-select-choice-name
                color $grey-900
        .p-select-search-field
            &.p-select-search-field-accept
                max-width 93%
                max-height 96px
                overflow-y auto
            .p-select-field-item
                position relative
                display inline-block
                vertical-align top
                z-index 2
                .p-select-choice
                    display inline-block
                    margin-top 3px
                    margin-right 4px
                    padding-left 8px
                    padding-right 28px
                    background-color $grey-200
                    border-radius 2px
                    max-width 120px
                    height 24px
                    line-height @height
                    font-size 14px
                    color $grey-900
                    white-space nowrap
                    text-overflow ellipsis
                    overflow hidden
                    &.p-select-choice-more
                        padding-right 8px
                .p-select-choice-name
                    padding-left 0
                    padding-right 0
                    background none
                .p-select-choice-clear
                    position absolute
                    top 8px
                    right 12px
                    z-index 5
                    cursor pointer
                    svg
                        &:hover
                            path
                                transition fill .3s
                                fill $blue-500
                .p-select-search-input
                    outline none
                    border 0
                    background none
                    width .75em
                    max-width 100%
                    height 30px
                    line-height @height
                    font-size 14px
        .p-select-search-triangle
            position absolute
            top 8px
            right 8px
            svg
                transition transform .3s
            .p-select-search-triangle-rotate
                transform rotate(180deg)
    .p-select-drop-down-box
        position absolute
        top 100%
        left 0
        width 100%
        max-height 184px
        z-index 99
        .p-select-drop-down-not
            margin-top 8px
            padding 16px 12px
            background-color #fff
            border 1px solid $grey-300
            border-radius 4px
            box-shadow 0 2px 10px 0 rgba(31,35,41,.1)
            color $grey-400
            font-size 14px
        .p-select-drop-down-tree
            margin-top 8px
            background-color #fff
            border 1px solid $grey-300
            border-radius 4px
            box-shadow 0 5px 10px rgba(31,35,41,.1)
            max-height 184px
            overflow-y auto


</style>