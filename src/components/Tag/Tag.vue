<template>
    <div :class="['p-tag', 'p-tag-'+size, 'p-tag-'+type, 'p-tag-'+status]">
        <slot></slot>
    </div>
</template>

<script>
    export default {
        name: "Tag",
        props: {
            /**
             * 标签大小
             * @value big/small
             */
            size: {
                type: String,
                default: 'big'
            },
            /**
             * 标签类型
             * @value blue cyan turquoise green lime yellow orange red carmine purple grey
             * @value blue-better cyan-better turquoise-better green-better lime-better yellow-better orange-better red-better carmine-better purple-better grey-better
             * @value blue-weak cyan-weak turquoise-weak green-weak lime-weak yellow-weak orange-weak red-weak carmine-weak purple-weak grey-weak
             */
            type: {
                type: String,
                default: 'grey'
            }
        },
        computed: {
            status() {
                if (this.type.includes('weak')) return 'weak';
                if (this.type.includes('better')) return 'better';
            }
        }
    }
</script>

<style lang="stylus">
    .p-tag
        display inline-block
        padding 0 8px
        border-radius 2px
        cursor pointer
        &+.p-tag
            margin-left 8px
            margin-bottom 4px
        &.p-tag-big
            line-height 24px
            font-size 14px
            &+.p-tag-big
                margin-left 8px
        &.p-tag-small
            line-height 18px
            font-size 12px
            &+.p-tag-small
                margin-left 4px
        &.p-tag-weak
            position relative
            color $grey-900
            &::before
                position absolute
                top 6px
                left -4px
                display block
                width 6px
                height @width
                border-radius 3px
                content ''
        &.p-tag-better
            position relative
            color $grey-900
            &::before
                position absolute
                top 9px
                left -4px
                display block
                width 6px
                height @width
                border-radius 3px
                content ''
        &.p-tag-blue
            background-color $blue-100
            color $blue-700
        &.p-tag-turquoise
            background-color $turquoise-100
            color $turquoise-700
        &.p-tag-cyan
            background-color $cyan-100
            color $cyan-700
        &.p-tag-green
            background-color $green-100
            color $green-700
        &.p-tag-lime
            background-color $lime-100
            color $lime-700
        &.p-tag-yellow
            background-color $yellow-100
            color $yellow-700
        &.p-tag-orange
            background-color $orange-100
            color $orange-700
        &.p-tag-red
            background-color $red-100
            color $red-700
        &.p-tag-carmine
            background-color $carmine-100
            color $carmine-700
        &.p-tag-purple
            background-color $purple-100
            color $purple-700
        &.p-tag-grey
            background-color $grey-200
            color $grey-800
        &.p-tag-blue-weak
            &::before
                background-color $blue-500
        &.p-tag-turquoise-weak
            &::before
                background-color $turquoise-500
        &.p-tag-cyan-weak
            &::before
                background-color $cyan-500
        &.p-tag-green-weak
            &::before
                background-color $green-500
        &.p-tag-lime-weak
            &::before
                background-color $lime-500
        &.p-tag-yellow-weak
            &::before
                background-color $yellow-500
        &.p-tag-orange-weak
            &::before
                background-color $orange-500
        &.p-tag-red-weak
            &::before
                background-color $red-500
        &.p-tag-carmine-weak
            &::before
                background-color $carmine-500
        &.p-tag-purple-weak
            &::before
                background-color $purple-500
        &.p-tag-grey-weak
            &::before
                background-color $grey-500
        &.p-tag-blue-better
            &::before
                background-color $blue-500
        &.p-tag-turquoise-better
            &::before
                background-color $turquoise-500
        &.p-tag-cyan-better
            &::before
                background-color $cyan-500
        &.p-tag-green-better
            &::before
                background-color $green-500
        &.p-tag-lime-better
            &::before
                background-color $lime-500
        &.p-tag-yellow-better
            &::before
                background-color $yellow-500
        &.p-tag-orange-better
            &::before
                background-color $orange-500
        &.p-tag-red-better
            &::before
                background-color $red-500
        &.p-tag-carmine-better
            &::before
                background-color $carmine-500
        &.p-tag-purple-better
            &::before
                background-color $purple-500
        &.p-tag-grey-better
            &::before
                background-color $grey-500

</style>