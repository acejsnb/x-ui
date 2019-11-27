<template>
    <div :class="['p-stick', 'p-stick-'+type]">{{text}}</div>
</template>

<script>
    export default {
        name: "Stick",
        props: {
            data: {
                type: Array,
                default: []
            },
            /**
             * 显示类型
             * @params none-不显示 default-默认颜色 error-错误警告 warning-警告 info-显示信息
             */
            type: {
                type: String,
                default: 'none'
            },
            /**
             * 显示内容
             */
            text: {
                type: String,
                default: ''
            }
        }
    }
</script>

<style lang="stylus">
    .p-stick
        padding 5px 16px
        border-radius 4px
        width 100%
        font-size 12px
        text-align center
        line-height 22px
        &.p-stick-none
            display none
        &.p-stick-default
            background-color $grey-50
            color $grey-600
        &.p-stick-error
            background-color $red-50
            color $red-600
        &.p-stick-warning
            background-color $orange-50
            color $orange-600
        &.p-stick-info
            background-color $blue-50
            color $blue-600

</style>