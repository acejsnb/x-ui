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
  border-color $grey-grey-400
  color $grey-grey-900
  cursor pointer
  &:hover
    border-color $primary-blue-500
    color $primary-blue-500
  &:active
    border-color $primary-blue-600
    color $primary-blue-600
  &::after
    background radial-gradient(circle, $grey-grey-200 10%, transparent 10%)
  .loading
    path
      stroke $grey-grey-400
.p-btn-primary
  background-color $primary-blue-500
  border-color $primary-blue-500
  color #fff
  cursor pointer
  &:hover
    background-color $primary-blue-400
    border-color $primary-blue-400
  &:active
    background-color $primary-blue-600
    border-color $primary-blue-600
  &::after
    background radial-gradient(circle, $primary-blue-300 10%, transparent 10%)
.p-btn-success
  background-color $success-green-500
  border-color $success-green-500
  color #fff
  cursor pointer
  &:hover
    background-color $success-green-400
    border-color $success-green-400
  &:active
    background-color $success-green-600
    border-color $success-green-600
  &::after
    background radial-gradient(circle, $success-green-300 10%, transparent 10%)
.p-btn-warning
  background-color $warning-orange-500
  border-color $warning-orange-500
  color #fff
  cursor pointer
  &:hover
    background-color $warning-orange-400
    border-color $warning-orange-400
  &:active
    background-color $warning-orange-600
    border-color $warning-orange-600
  &::after
    background radial-gradient(circle, $warning-orange-300 10%, transparent 10%)
.p-btn-error
  background-color $error-red-500
  border-color $error-red-500
  color #fff
  cursor pointer
  &:hover
    background-color $error-red-400
    border-color $error-red-400
  &:active
    background-color $error-red-600
    border-color $error-red-600
  &::after
    background radial-gradient(circle, $error-red-300 10%, transparent 10%)
.p-btn-disabled
  background-color $error-red-200
  color $grey-grey-400
  cursor not-allowed
.p-btn-link
  border-style none
  color $primary-blue-500
  cursor pointer
  &:hover
    color $primary-blue-400
  &:active
    color $primary-blue-600

</style>
