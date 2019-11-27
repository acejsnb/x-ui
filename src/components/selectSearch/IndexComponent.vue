<template>
    <div class="p-select-search-component">
        <SelectSingleSearch
                :selectedId="value"
                :width="width"
                :data="data"
                @click="optionClick"
        />
    </div>
</template>

<script>
    import SelectSingleSearch from './depend/SelectSingleSearch';

    export default {
        name: "SelectSearch",
        components: { SelectSingleSearch },
        props: {
            /* 单选模式相关数据 -s*/
            // v-model绑定的值
            value: {
                type: String,
                default: ''
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
            }
            /* 单选模式相关数据 -e*/
        },
        methods: {
            /* 单选模式相关函数 -s*/
            // 提交当前选择的值
            optionClick(id) {
                this.$emit('input', id);
            }
            /* 单选模式相关函数 -e*/
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
        .p-select-search-field-text
            position absolute
            left 0
            top 0
            padding-left 12px
            width 100%
            height 32px
            line-height 32px
            color $grey-400
            font-size 14px
            z-index 1
        .p-select-search-field
            .p-select-field-item
                position relative
                display inline-block
                z-index 2
                .p-select-choice
                    display inline-block
                    margin-top 4px
                    margin-right 4px
                    padding-left 8px
                    padding-right 28px
                    background-color $grey-200
                    border-radius 2px
                    height 24px
                    line-height @height
                    font-size 14px
                    color $grey-900
                .p-select-choice-name
                    padding-left 0
                    padding-right 0
                    background none
                .p-select-choice-clear
                    position absolute
                    top 9px
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
        //transform translateY(8px)
        z-index 99
        .p-select-drop-down-not
            padding 16px 12px
            background-color #fff
            border 1px solid $grey-300
            border-radius 4px
            box-shadow 0 2px 10px 0 rgba(31,35,41,.1)
            color $grey-400
            font-size 14px


</style>