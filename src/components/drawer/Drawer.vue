<template>
    <transition name="slideRightLeft">
        <div class="p-drawer" :tabindex="focus&&-1" v-focus="focus" @blur="onClose" v-if="show">
            <div class="p-drawer-title" v-show="title">
                <section class="p-title-text">{{title}}</section>
                <Icon type="close" class="p-drawer-title-icon" @click="onClose" />
            </div>
            <div :class="['p-drawer-content', bottom&&'p-drawer-content-bottom']">
                <!-- @slot html内容 -->
                <slot></slot>
            </div>
<!--            <div :class="['p-drawer-handle', bottom&&'p-drawer-handle-bottom']" v-if="btnShow">-->
            <div :class="['p-drawer-handle', bottom&&'p-drawer-handle-bottom']" v-if="bottom">
                <Button type="primary" @click="onConfirm" :loading="loading">确定</Button>
                <Button type="default" @click="onClose">取消</Button>
            </div>
        </div>
    </transition>
</template>

<script>
    import Icon from '../icon';
    import Button from '../button';

    export default {
        name: 'Drawer',
        components: { Icon, Button },
        props: {
            /**
             * 侧拉窗显示状态
             */
            show: {
                type: Boolean,
                default: false,
                require: true
            },
            /**
             * 是否聚焦（也就是失去交掉是否关闭侧拉窗）
             */
            focus: {
                type: Boolean,
                default: false
            },
            /**
             * 侧拉窗标题
             */
            title: {
                type: String,
                default: '',
                require: true
            },
            /**
             * 点击确定按钮 是否加载确定按钮loading动画
             */
            loading: {
                type: Boolean,
                default: false
            },
            /**
             * 是否固定底部操作栏
             */
            bottom: {
                type: Boolean,
                default: false
            }
        },
        directives: {
            /**
             * 自定义指令
             */
            focus: {
                inserted(e, ct) {
                    if (ct.value) e.focus();
                }
            }
        },
        methods: {
            /**
             * 关闭侧拉窗
             */
            onClose() {
                if (this.loading) this.$emit('changeLoading', false);
                this.$emit('changeStatus', false);
            },
            /**
             * 点击确定按钮执行的回调
             */
            onConfirm() {
                if (this.loading) return;
                this.$emit('changeLoading', true);
                this.$emit('confirm');
            }
        }
    }
</script>

<style lang="stylus">
@import "../static/stylus/animate/slideRightLeft.styl"

.p-drawer
  outline none
  position fixed
  right 0
  top 48px
  background-color #fff
  box-shadow 0 2px 10px 0 rgba(31,35,41,.1)
  min-width 304px
  max-width 680px
  height calc(100% - 48px)
  z-index 899
.p-drawer-title
  position relative
  padding-left 32px
  padding-right 32px
  border-bottom 1px solid $grey-grey-300
  width 100%
  height 56px
  line-height @height
  .p-title-text
    max-width 98%
    color $grey-grey-900
    font-size 16px
    overflow hidden
    text-overflow ellipsis
    white-space nowrap
  .p-drawer-title-icon
    position absolute
    top 16px
    right 28px
    overflow-y auto
.p-drawer-content
  padding 12px 32px
  width 100%
  height calc(100% - 56px)
  overflow auto
.p-drawer-content-bottom
  height calc(100% - 128px)
.p-drawer-handle
  padding 20px 32px
  background-color #fff
  width 100%
.p-drawer-handle-bottom
  position absolute
  right 0
  bottom 0
  box-shadow 0 -2px 10px 0 rgba(31,35,41,.1)

</style>
