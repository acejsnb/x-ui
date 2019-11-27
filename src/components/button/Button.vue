<template>
    <section :class="`p-btn p-btn-${type} p-btn-${size}`" @click="handleClick">
        <!-- @slot html内容 -->
        <span><slot></slot></span>
        <LoadingIcon class="loading" v-if="loading" />
    </section>
</template>

<script>
    import LoadingIcon from '../static/iconSvg/loading.svg';

    export default {
        name: 'Button',
        components: { LoadingIcon },
        props: {
            /**
             * 按钮类型
             * 可选值 【default primary success warning error disabled】
             */
            type: {
                type: String,
                required: true,
                default: 'default'
            },
            /**
             * 按钮loading状态
             */
            loading: {
                type: Boolean,
                default: false
            },
            /**
             * 按钮大小
             * 可选值【large medium small】
             */
            size: {
                type: String,
                default: 'medium'
            }
        },
        methods: {
            /**
             * 点击按钮的回调
             */
            handleClick() {
                if (this.type === 'disabled') return;
                this.$emit('click')
            }
        }
    }
</script>

<style lang="stylus">

    .p-btn
        position relative
        display inline-flex
        align-items center
        justify-content center
        padding-left 8px
        padding-right 8px
        background-color #fff
        border-width 1px
        border-style solid
        border-radius 4px
        transition all .36s
        overflow hidden
        text-align center
        &+.p-btn
            margin-left 12px
        span
            position relative
            display ruby
            vertical-align middle
            z-index 1
            user-select none
        //font-size 14px
        .loading
            margin-left 4px
            vertical-align middle
        &::after
            content ''
            display block
            position absolute
            width 100%
            height 100%
            top 0
            left 0
            pointer-events none
            //设置径向渐
            //background radial-gradient(circle, red 10%, transparent 10.01%) !important
            background-repeat no-repeat
            //background-position 50%
            transform scale(10, 10)
            opacity 0
            transition transform .3s, opacity .5s
        &:active::after
            transform scale(0, 0)
            opacity 1
            //设置初始状
            transition 0s
    .p-btn-large
        //max-width 120px
        min-width 80px
        height 40px
        line-height @height
        span
            font-size 16px
    .p-btn-medium
        //max-width 120px
        min-width 80px
        height 32px
        line-height @height
        span
            font-size 14px
    .p-btn-small
        //max-width 100px
        //min-width 68px
        height 28px
        line-height @height
        span
            font-size 14px
    .p-btn-default
        background-color #fff
        border-color $grey-400
        color $grey-900
        cursor pointer
        &:hover
            border-color $blue-500
            color $blue-500
        &:active
            border-color $blue-600
            color $blue-600
        &::after
            background radial-gradient(circle, $grey-200 10%, transparent 10%)
        .loading
            path
                stroke $grey-400
    .p-btn-primary
        background-color $blue-500
        border-color $blue-500
        color #fff
        cursor pointer
        &:hover
            background-color $blue-400
            border-color $blue-400
        &:active
            background-color $blue-600
            border-color $blue-600
        &::after
            background radial-gradient(circle, $blue-300 10%, transparent 10%)
    .p-btn-success
        background-color $green-500
        border-color $green-500
        color #fff
        cursor pointer
        &:hover
            background-color $green-400
            border-color $green-400
        &:active
            background-color $green-600
            border-color $green-600
        &::after
            background radial-gradient(circle, $green-300 10%, transparent 10%)
    .p-btn-warning
        background-color $orange-500
        border-color $orange-500
        color #fff
        cursor pointer
        &:hover
            background-color $orange-400
            border-color $orange-400
        &:active
            background-color $orange-600
            border-color $orange-600
        &::after
            background radial-gradient(circle, $orange-300 10%, transparent 10%)
    .p-btn-error
        background-color $red-500
        border-color $red-500
        color #fff
        cursor pointer
        &:hover
            background-color $red-400
            border-color $red-400
        &:active
            background-color $red-600
            border-color $red-600
        &::after
            background radial-gradient(circle, $red-300 10%, transparent 10%)
    .p-btn-disabled
        background-color $red-200
        color $grey-400
        cursor not-allowed
    .p-btn-link
        border-style none
        color $blue-500
        cursor pointer
        &:hover
            color $blue-400
        &:active
            color $blue-600

</style>
