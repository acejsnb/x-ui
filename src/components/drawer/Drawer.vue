<template>
    <transition name="slideRightLeft">
        <div class="p-drawer" :tabindex="focus&&-1" v-focus="focus" @blur="onClose" v-if="show">
            <div class="p-drawer-title">
                <section class="p-title-text">{{title}}</section>
                <Icon type="close" class="p-drawer-title-icon" @click="onClose" />
            </div>
            <div :class="['p-drawer-content', bottom&&'p-drawer-content-bottom']">
                <slot></slot>
            </div>
            <div :class="['p-drawer-handle', bottom&&'p-drawer-handle-bottom']">
                <Button type="primary" @click="onConfirm" :loading="loading">确定</Button>
                <Button type="default" @click="onClose">取消</Button>
            </div>
        </div>
    </transition>
</template>

<script>
    import Icon from 'icon';
    import Button from 'button';

    export default {
        name: 'Drawer',
        components: { Icon, Button },
        props: {
            // 抽屉显示
            show: {
                type: Boolean,
                default: false,
                require: true
            },
            // 是否聚焦
            focus: {
                type: Boolean,
                default: false
            },
            // 抽屉标题
            title: {
                type: String,
                default: '',
                require: true
            },
            // 是否可加载确定按钮loading动画
            iconLoading: {
                type: Boolean,
                default: false
            },
            // 是否固定底部操作栏
            bottom: {
                type: Boolean,
                default: false
            }
        },
        directives: {
            // 自定义指令
            focus: {
                inserted(e, ct) {
                    if (ct.value) e.focus();
                }
            }
        },
        data() {
            return {
                loading: false // 确定按钮的loading属性
            }
        },
        watch: {
            show(n, o) {
                if (n !== o) {
                    if (n) {
                        this.loading=false;
                        document.body.style.overflow='hidden';
                    } else {
                        document.body.style.overflow='auto';
                    }
                }
            }
        },
        methods: {
            onClose() {
                this.$emit('close');
            },
            onConfirm() {
                if (this.loading) return;
                if (this.iconLoading) {
                    this.loading=true;
                }
                this.$emit('confirm');
            }
        },
        beforeDestroy() {
            document.body.style.overflow='auto';
        }
    }
</script>

<style lang="stylus">
@import "~stylus/tools.styl"
@import "~stylus/animate/slideRightLeft.styl"

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
  height 48px
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
    top 12px
    right 28px
    overflow-y auto
.p-drawer-content
  padding 16px 32px
  width 100%
.p-drawer-content-bottom
  height calc(100% - 120px)
  overflow auto
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
