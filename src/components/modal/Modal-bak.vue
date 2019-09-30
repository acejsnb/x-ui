<template>
    <div class="p-modal">
        <transition name="modalBg">
            <div class="p-modal-bg" @click="onClose" v-if="show"></div>
        </transition>
        <transition name="modal">
            <div :class="['p-modal-main', contentMax&&'p-modal-main-max']" v-if="show" :style="{left: modalMainLeft+'px'}">
                <div class="p-modal-title">
                    <section class="p-title-text">{{title}}</section>
                    <Icon type="close" class="p-modal-title-icon" @click="onClose" />
                </div>
                <div :class="['p-modal-content', contentMax?'p-modal-content-max':'p-modal-content-normal']" :style="{height: contentMax?(contentHeight+'px'):'auto'}">
                    <div class="p-modal-content-main" ref="modalContentMain">
                        <slot></slot>
                    </div>
                </div>
                <div class="p-modal-handle">
                    <Button type="default" @click="onClose">取消</Button>
                    <Button type="primary" @click="onConfirm" :loading="loading">确定</Button>
                </div>
            </div>
        </transition>
    </div>
</template>

<script>
    import Icon from 'icon';
    import Button from 'button';

    export default {
        name: 'Modal',
        components: { Icon, Button },
        props: {
            show: {
                type: Boolean,
                default: false,
                require: true
            },
            title: {
                type: String,
                default: '',
                require: true
            },
            iconLoading: {
                type: Boolean,
                default: false
            },
            // full-全屏显示 default-(默认值)自适应宽高 small-最小对话框
            mode: {
                type: String,
                default: 'default'
            }
        },
        data() {
            return {
                loading: false // 确定按钮的loading属性
                ,modalMainLeft: 0 // 内容距离左边位置
                ,contentMax: false // 内容是否达到最大高度
                ,contentHeight: 77 // 内容是否达到最大高度
            }
        },
        watch: {
            show(n, o) {
                if (n !== o) {
                    if (n) {
                        this.loading=false;
                        document.body.style.overflow='hidden';
                        this.countPos();
                    } else {
                        document.body.style.overflow='auto';
                    }
                }
            }
        },
        mounted() {
            this.countPos();
            window.addEventListener('resize', this.countPos);
        },
        methods: {
            // 动态计算弹窗
            countPos() {
                const bodyWidth=window.innerWidth;
                const bodyHeight=window.innerHeight;
                this.$nextTick(() => {
                    const mc=this.$refs.modalContentMain;
                    if (!mc) return;
                    const modalContentWidth=mc.clientWidth;
                    const modalContentHeight=mc.clientHeight;
                    this.modalMainLeft=(bodyWidth - modalContentWidth-64)/2;
                    if (bodyHeight - modalContentHeight-64 <= 120) {
                        this.contentHeight=bodyHeight-249;
                        this.contentMax=true;
                    }
                });
            },
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
            window.removeEventListener('resize', this.countPos);
        }
    }
</script>

<style lang="stylus">
@import "~stylus/tools.styl"

.p-modal-bg
  position fixed
  left 0
  top 0
  background-color rgba(100,108,115,.5)
  width 100%
  height 100%
  z-index 999
.p-modal-main
  position fixed
  top 120px
  background-color #fff
  border-radius 4px
  min-width 420px
  max-width 1260px
  min-height 206px
  z-index 999
.p-modal-main-max
  top 60px
.p-modal-title
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
  .p-modal-title-icon
    position absolute
    top 16px
    right 28px
.p-modal-content
  margin-bottom 72px
  padding 16px 32px
  width 100%
  min-height 77px
.p-modal-content-normal
  max-height 648px
.p-modal-content-max
  overflow auto
.p-modal-handle
  position absolute
  right 0
  bottom 0
  background-color #fff
  padding 20px 32px
  box-shadow 0 -2px 10px 0 rgba(31,35,41,.1)
  width 100%
  text-align right

@keyframes modalBgIn
  from
    opacity 0
  to
    opacity 1
@keyframes modalBgOut
  from
    opacity 1
  to
    opacity 0
.modalBg-enter-active
  animation modalBgIn .3s
.modalBg-leave-active
  animation modalBgOut .3s

@keyframes bounceIn
  from
    opacity 0
    transform scale3d(.8, .8, .8)
  to
    opacity 1
    transform scale3d(1, 1, 1)
@keyframes bounceOut
  from
    opacity 1
    transform scale3d(1, 1, 1)
  to
    opacity 0
    transform scale3d(.8, .8, .8)
.modal-enter-active
  animation bounceIn .3s
.modal-leave-active
  animation bounceOut .3s

</style>
