<template>
  <transition name="slideDownUpUi" v-if="dropDownListShow">
    <div v-show="dropDownShow" @mouseleave="buttonLeave" @mouseenter="buttonEnter"
         @blur="DropListBlur" @focus="DropListFocus" :tabindex="-1"
         class="drop-list-surround" :class="`drop-list-${type} drop-list-${size} ${disabledItem ? 'disable-element' : ''}`"
         :style="'top:'+ (m.offsetTop + m.offsetHeight - 1) + 'px; right: ' +  (winWidth - m.offsetLeft - m.offsetWidth) + 'px; '"> <!---->
      <div class="drop-list">
        <div class="drop-list-inner">
          <div :class="{'active': item.id === id && !item.disabled, 'disabled': item.disabled, 'drop-item': item.id !== id && !item.disabled}" v-for="(item, index) in dropDownList" :key="item.id ? item.id : index" @click="choose(item)">{{item.name}}</div>
        </div>
      </div>
    </div>
  </transition>
</template>
<script>
    export default {
        name: "DropList",
        data () {
            let winWidth = document.body.offsetWidth;
            return {
                disabledItem: false, // 是否阻止下拉列表事件
                winWidth, // 浏览器宽度
                type: 'default', // 按钮类型
                interactive: 'hover', //下拉方式 hover-鼠标移上去， click-鼠标点击
                size: 'medium', //按钮尺寸
                dropDownType: 'default', // 下拉列表类型
                dropDownList: [], //下拉列表数据
                dropDownListShow: false, //控制整个下拉列表的dom
                dropDownShow: false,// 下拉列表显示隐藏控制
                id: null, // 选中的列表id
                m: {}/*, //下拉列表位置信息
                i: null*/
            }
        },
        methods: {
            /**
             * 组件聚焦
             */
            focus () {
                this.$el.focus()
            },
            /**
             * 组件失去焦点
             */
            blur () {
                this.$el.blur()
            },
            /**
             * 返回选择项
             * @param item
             */
            /*choose (item) {
                console.log(item);
                if (item.disable) return;
                this.$emit('choose', item)
            }*/
        }
    }
</script>

<style lang="stylus">
  @import "../static/stylus/animate/slideDownUpUi.styl"
  .disable-element
    pointer-events none
  .drop-list-large
    padding-top 9px
  .drop-list-medium
    padding-top 8px
  .drop-list-small
    padding-top 7px
  .drop-list-surround
    /*display block
    text-decoration none*/
    outline 0
    position absolute
    min-width 180px
    max-width 240px
    z-index 100
    .drop-list-input
      height 0
      width 0
      border none
      opacity 0
    .drop-list
      position relative
      z-index 102
      .drop-list-inner
        .active
          background-color $blue-100
        border 1px solid $grey-300
        padding-top 6px
        padding-bottom 6px
        box-shadow 0 5px 10px rgba(31,35,41,.1)
        border-radius 4px
        background-color #ffffff
        .drop-item
          &:hover
            background-color $grey-100
        div
          padding-left 12px
          padding-right 12px
          height 38px
          overflow hidden //超出的文本隐藏
          text-overflow ellipsis //溢出用省略号显示
          white-space nowrap //溢出不换行
          font-size 14px
          line-height 38px
          color $grey-900
          cursor pointer
          &:active, &::after
            background-color $blue-100
        .disabled
          // background-color $red-200
          color $grey-400
          cursor not-allowed
          &:hover, &:active
            background-color #ffffff
            // background-color $red-200

</style>
