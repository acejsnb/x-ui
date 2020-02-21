<template>
    <div class="p-picker-day-content">
        <div class="p-picker-day-select">
            <ul>
                <li
                        :class="[
                                'p-picker-day-text',
                                'p-picker-day-text-'+da.flag,
                                (yearNow===da.year&&monthNow===da.month&&dayNow===da.day&&da.flag==='n'&&'p-picker-day-text-current'),
                                da.flag==='n'&&('p-picker-day-text-'+da.selected),
                                multiple&&'p-picker-day-text-'+da.multiple
                            ]"
                        v-for="(da, dai) in daysArray"
                        :key="'day-'+da.day+dai"
                        @click="dayClick(da)"
                >
                    <span>{{da.day}}</span>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Day",
        props: {
            yearNow: {
                type: String,
                default: ''
            },
            monthNow: {
                type: String,
                default: ''
            },
            dayNow: {
                type: String,
                default: ''
            },
            daysArray: {
                type: Array,
                default: () => []
            },
            multiple: {
                type: Boolean,
                default: false
            }
        },
        methods: {
            dayClick(day) {
                this.$emit('change', day)
            }
        }
    }
</script>

<style lang="stylus">

    @import "../../static/stylus/datePicker/pickerChild.styl"

    .p-picker-child-select-box-title
        display flex
        justify-content space-between
        align-items center
        padding-left 16px
        padding-right 16px
        .p-picker-child-select-box-icon
            display flex
            align-items center
            width 68px
            &:nth-of-type(1)
                justify-content flex-start
            &:nth-of-type(3)
                justify-content flex-end
            .p-picker-child-select-box-icon-svg
                padding-top 3px
                width 28px
                height @width
                line-height @width
                text-align center
                cursor pointer
                &:hover
                    svg
                        path
                            transition fill .5s
                            fill $blue-500
            .p-picker-child-select-box-icon-svg-left
                transform rotate(-180deg)
    .p-picker-child-title
        display flex
        align-items center
        margin-top 12px
        margin-bottom 8px
        padding-left 16px
        .p-picker-child-title-item
            margin-right 16px
            width 24px
            height 24px
            line-height @height
            color $grey-500
            font-size 14px
            text-align center
            user-select none
            &:nth-of-type(7n)
                margin-right 0
    .p-picker-day-content
        padding 8px 0 8px 16px
        width 100%
        height 208px
        .p-picker-day-select
            height 192px
            ul
                display flex
                flex-wrap wrap
                width 100%
            .p-picker-day-text
                margin-right 16px
                margin-bottom 8px
                border-width 1px
                border-style solid
                border-color transparent
                border-radius 4px
                width 24px
                height 24px
                text-align center
                transition background-color .3s
                &:nth-of-type(7n)
                    margin-right 0
                span
                    position relative
                    line-height 24px
                    color $grey-900
                    font-size 14px
                    text-align center
                    transition color .3s
                    user-select none
                    z-index 10
                &.p-picker-day-text-n
                    cursor pointer
                    &:hover
                        background-color $grey-200
                &.p-picker-day-text-p,
                &.p-picker-day-text-f
                    span
                        color $grey-400
                &.p-picker-day-text-current
                    background-color #fff !important
                    border-color $blue-500
                    span
                        color $blue-500
                &.p-picker-day-text-multiple
                    position relative
                    &::before
                        position absolute
                        top -1px
                        left -10px
                        display inline-block
                        background-color $grey-200
                        width 40px
                        height 24px
                        content ''
                &.p-picker-day-text-selected
                    background-color $blue-500 !important
                    span
                        color #fff
                    &::before
                        display none

</style>
