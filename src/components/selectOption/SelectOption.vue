<template>
    <section class="p-select-option">
        <article
                :class="['p-select-option-item', selectedId===item.id&&'p-select-option-item-selected']"
                v-for="item in data"
                :key="item.id"
                @click="optionClick(item.id)"
                @mouseenter="optionEnter"
                v-html="item.name"
        ></article>
    </section>
</template>

<script>
    export default {
        name: "SelectOption",
        props: {
            /**
             * 绑定的v-model值
             */
            selectedId: {
                type: String,
                default: ''
            },
            /**
             * 下拉列表数据
             */
            data: {
                type: Array,
                default: []
            }
        },
        methods: {
            // 提交当前选择的值
            optionClick(id) {
                this.$emit('click', id);
            },
            // 子项鼠标移入
            optionEnter(e) {
                const target=e.target;
                const {clientWidth, scrollWidth, title}=target;
                if (!title && scrollWidth > clientWidth) target.title=target.innerText;
            }
        }
    }
</script>

<style lang="stylus">

.p-select-option
    margin-top 8px
    padding-top 4px
    padding-bottom 4px
    background-color #fff
    border 1px solid $grey-300
    border-radius 4px
    box-shadow 0 5px 10px rgba(31,35,41,.1)
    width 100%
    max-height 168px
    overflow-y auto
    .p-select-option-item
        padding-left 12px
        padding-top 5px
        padding-bottom 5px
        width 100%
        height 32px
        line-height 22px
        color $grey-900
        text-align left
        font-size 14px
        cursor pointer
        overflow hidden
        text-overflow ellipsis
        white-space nowrap
        &:hover
            background-color $grey-200
        &.p-select-option-item-selected
            color $blue-500
            background-color $blue-100

</style>