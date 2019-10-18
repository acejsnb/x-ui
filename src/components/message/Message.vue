<template>
    <transition name="fadeDownUp">
        <div v-show="visible" :class="`p-message p-message-${type}`">
            <section class="msg">
                <article class="text">{{message}}</article>
            </section>
            <section class="p-message-close" @click="closeNode"><IconClose /></section>
        </div>
    </transition>
</template>

<script>
    import IconClose from 'icon/icon_close_white.svg';

    export default {
        name: 'Message',
        components: { IconClose },
        data() {
            return {
                type: 'info',
                message: '',
                visible: false
            }
        },
        methods: {
            closeNode() { // 移除当前节点
                this.$el.parentNode.removeChild(this.$el);
            }
        }
    }
</script>

<style lang="stylus">
@import "~stylus/tools.styl"
@import "~stylus/animate/fadeDownUp.styl"

.p-message
  position relative
  display flex
  justify-content space-between
  align-items flex-start
  padding 8px 8px 8px 16px
  border-radius 4px
  box-shadow 0 2px 10px 0 rgba(98,28,24,.2)
  min-width 216px
  max-width 576px
  min-height 24px
  &+.p-message
    margin-top 24px
  .text
    padding-left 8px
    font-size 14px
    line-height 22px
    color #fff
  .p-message-close
    margin-left 8px
    margin-top 4px
    cursor pointer
    text-align right
    svg
      vertical-align middle
.p-message-info
  background-color $primary-blue-500
.p-message-success
  background-color $success-turquoise-500
.p-message-warning
  background-color $warning-orange-400
.p-message-error
  background-color $error-red-400

</style>
