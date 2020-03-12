<template>
  <div class="p-drop-down-button">
    <div @mouseleave="buttonLeave" :class="
        `p-drop-down-button-surround p-drop-down-button-surround-${size}
        ${disabled ? 'p-drop-down-button-surround-disabled ' : ''}
        ${!disabled ? ('p-drop-down-button-surround-' + type) : ''}
        ${ (type === 'primary' || type === 'default') && dropDownType && dropDownType !== 'default' ? `p-drop-down-button-surround-${dropDownType}`: ''}`">
      <div @mouseenter="buttonEnter('left')" @click="handleClick" :class="`p-drop-down-button-inner p-drop-down-button-${type} p-drop-down-button-${size}`">
        <div class="text" v-if="text">{{text}}</div>
        <div class="text" v-else ref="buttonText"><slot/></div>
      </div>
      <div @mouseenter="buttonEnter('right')" @click="handleRightClick" class="p-drop-down-button-surround-triangle" v-if="(type === 'primary' || type === 'default') && dropDownType && dropDownType !== 'default'">
        <TriangleSvg :class="[!triangle && 'p-drop-down-button-rotate', 'p-drop-down-button-triangle']" />
      </div>
    </div>
  </div>
</template>

<script>
    import TriangleSvg from '../static/iconSvg/triangle.svg';
    import DropListToggle from './drop';
    export default {
        name: 'DropDownButton',
        components: { TriangleSvg },
        data () {
            return {
                // 三角形方向
                triangle: false,
                offsetTop: 0, // 按钮距离上边距离
                offsetLeft: 0, // 按钮距离左边距离
                i: null, // 下拉列表定时器
                id: null, // 下拉列表选中id
                listI: null // 下拉列表blur定时器
            }
        },
        props: {
            /**
             * 按钮类型
             * 可选值 【default primary】
             */
            type: {
                type: String,
                default: 'default'
            },
            /**
             * 交互方式
             * 可选值 【tap, hover】
             */
            interactive: {
                type: String,
                default: 'hover'
            },
            /**
             * 下拉列表的选中id
             */
            value: {
                default: ''
            },
            /**
             * 按钮文本
             */
            text: {
                type: String,
                default: ''
            },
            /**
             * 是否禁用
             * 可选值 【true, false】
             */
            disabled: {
                type: Boolean,
                default: false
            },
            /**
             * 按钮类型
             * 可选值 【drop split-drop, default-drop】
             */
            dropDownType: {
                type: String,
                default: 'default'
            },
            /**
             * 按钮类型
             */
            dropDownList: {
                type: Array,
                default: () => []
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
             * 初始化 下拉组件
             */
            initComponent () {
                if ((this.type === 'primary' || this.type === 'default') && this.dropDownType && this.dropDownType !== 'default') {
                    if (!this.offsetTop && !this.offsetLeft) {
                        this.offsetTop = this.$el.offsetTop;
                        this.offsetLeft = this.$el.offsetLeft;
                        this.getOffset(this.$el);
                    }
                    this.id = this.value;
                    this.dropList = DropListToggle({
                        m: { //下拉列表位置
                            offsetTop: this.offsetTop,
                            offsetLeft: this.offsetLeft,
                            offsetWidth: this.$el.offsetWidth,
                            offsetHeight: this.$el.offsetHeight
                        },
                        /*i: this.i,*/
                        size: this.size, //按钮尺寸
                        interactive: this.interactive, //下拉方式 hover-鼠标移上去， click-鼠标点击
                        id: this.id, // 选中的列表id
                        type: this.type, // 按钮类型
                        dropDownList: this.dropDownList, //下拉列表数据
                        dropDownType: this.dropDownType, // 下拉列表类型 drop, split-drop, default-drop
                        choose: this.choose, // 选择列表选项
                        buttonLeave: this.buttonLeave, // 鼠标离开button
                        DropListBlur: this.DropListBlur, //列表失去焦点事件调用
                        DropListFocus: this.DropListFocus, //列表聚焦事件调用
                        buttonEnter: this.buttonEnter //鼠标进入button
                    })
                }
            },
            /**
             * 重置下拉列表数据
             */
            resize () {
                this.$nextTick(() => {
                    if (this.dropList) {
                        this.dropList.m.offsetTop = this.$el.offsetTop;
                        this.dropList.m.offsetLeft = this.$el.offsetLeft;
                        this.dropList.m.offsetWidth = this.$el.offsetWidth;
                        this.dropList.m.offsetHeight = this.$el.offsetHeight;
                        this.dropList.winWidth = document.body.offsetWidth;
                    }
                })
            },
            /**
             * 累计循环获取下拉列表的offsetTop， offsetLeft
             */
            getOffset (obj) {
                if (obj.offsetParent) {
                    this.offsetTop += obj.offsetParent.offsetTop;
                    this.offsetLeft += obj.offsetParent.offsetLeft;
                    this.getOffset(obj.offsetParent)
                }
            },
            /**
             * 鼠标进入
             */
            buttonEnter (type) {
                if (this.type === 'disabled' || this.disabled || (type === 'left' && this.dropDownType === 'split-drop') || this.interactive === 'tap') return;
                if (!this.dropList) {
                    this.initComponent();
                } else {
                    this.resize();
                }
                this.triangle = true;
                if (this.dropList) {
                    if (this.i) clearTimeout(this.i);
                    this.dropList.dropDownListShow = true;
                    this.$nextTick(() => {
                        this.dropList.dropDownShow = true;
                    });
                }
            },
            /**
             * 鼠标离开
             */
            buttonLeave () {
                if (this.type === 'disabled' || this.disabled || this.interactive === 'tap') return;
                this.i = setTimeout(() => {
                    this.triangle = false;
                    if (this.dropList) {
                        this.dropList.dropDownShow = false;
                        // this.dropList.dropDownListShow = false;
                        if (this.i) clearTimeout(this.i);
                    }
                }, 150);
            },
            /**
             * 选择选项
             */
            choose (item) {
                if (item.disabled) return;
                this.dropList.disabledItem = true;
                this.triangle = false;
                this.$emit('input', item.id);
                this.id = item.id;
                if (this.text) {
                    this.$emit('update:text', item.name);
                } else {
                    this.$refs.buttonText.innerHTML = item.name;
                }
                this.dropList.dropDownShow = false;
                this.dropList.id = item.id;
                this.resize();
                setTimeout(() => {
                    this.$nextTick(() => {
                        this.dropList.disabledItem = false;
                    })
                }, 450);

            },
            /**
             * 点击按钮的回调
             */
            handleClick() {
                if (this.type === 'disabled' || this.disabled) return;
                this.$emit('click');

                if (this.interactive === 'tap' && (this.dropDownType === 'drop' || this.dropDownType === 'default-drop')) {
                    this.handleRightClick()
                }
            },
            /**
             * 点击右边箭头，下拉菜单
             */
            handleRightClick () {
                if (this.type === 'disabled' || this.disabled || this.interactive !== 'tap') return;

                if (!this.dropList) {
                    this.initComponent();
                } else {
                    this.resize();
                }

                if (this.listI) {
                    this.triangle = !this.triangle;
                    this.dropList.dropDownShow = !this.dropList.dropDownShow;
                    if (this.dropList.dropDownShow) {
                        this.$nextTick(() => {
                            if (this.dropList.dropDownShow) this.dropList.focus()
                        });
                    }
                    clearTimeout(this.listI);
                    return;
                }

                if (!this.dropList.dropDownListShow) this.dropList.dropDownListShow = true;
                this.triangle = true;
                this.$nextTick(() => {
                    this.dropList.dropDownShow = true;
                    this.$nextTick(() => {
                        if (this.dropList.dropDownShow) this.dropList.focus()
                    });
                })
            },
            /**
             * 列表失去焦点
             */
            DropListBlur () {
                this.listI = setTimeout(() => {
                    this.listI = null;
                    this.triangle = false;
                    if (this.dropList) this.dropList.dropDownShow = false;
                }, 180);
            },
            /**
             * 列表获取焦点
             */
            DropListFocus () {
            }
        }
    }
</script>

<style lang="stylus">
  @import "../static/stylus/animate/slideDownUpUi.styl"
  .p-drop-down-button
    position relative
    display inline-flex
    &+.p-drop-down-button
      margin-left 12px
  .p-drop-down-button-surround
    position relative
    display inline-flex
    align-items center
    justify-content center
    background-color #fff
    border-width 1px
    border-style solid
    border-radius 4px
    transition all .36s
    overflow hidden
    .p-drop-down-button-inner
      padding-left 8px
      padding-right 8px
      transition background-color .36s
    .p-drop-down-button-surround-triangle
      height 100%
      position absolute
      right 0
      top 0
      width 23px
      text-align center
      transition background-color .36s
    .p-drop-down-button-triangle
      vertical-align middle
    .p-drop-down-button-triangle
      transition transform .3s
    .p-drop-down-button-rotate
      transform rotate(180deg)
    .p-drop-down-button-inner
      position relative
      display inline-flex
      align-items center
      justify-content center
      text-align center
      div.text
        position relative
        display ruby
        vertical-align middle
        z-index 1
        user-select none
  .p-drop-down-button-surround-large
    height 40px
    line-height @height - 2
    font-size 16px
    .text
      min-width 64px
      max-width 112px
      //line-height 40px
      overflow hidden
      text-overflow ellipsis
      white-space nowrap
  .p-drop-down-button-surround-medium
    height 32px
    line-height @height - 2
    font-size 14px
    .text
      min-width 64px
      max-width 100px
      //line-height 32px
      overflow hidden
      text-overflow ellipsis
      white-space nowrap
  .p-drop-down-button-surround-small
    height 28px
    line-height @height - 2
    font-size 14px
    .text
      max-width 92px
      //line-height 28px
      overflow hidden
      text-overflow ellipsis
      white-space nowrap
  .p-drop-down-button-surround-default
    background-color #fff
    border-color $grey-400
    color $grey-900
    cursor pointer
    &:hover
      border-color $blue-500
      color $blue-500
      .p-drop-down-button-surround-triangle
        path
          fill $blue-500
    &:active
      border-color $blue-600
      color $blue-600
      .p-drop-down-button-surround-triangle
        path
          fill $blue-600
    &::after
      background radial-gradient(circle, $grey-200 10%, transparent 10%)
      .p-drop-down-button-surround-triangle
        path
          fill $grey-500

  .p-drop-down-button-surround-primary
    background-color $blue-500
    border-color $blue-500
    color #fff
    cursor pointer
    .p-drop-down-button-surround-triangle
      path
        fill #fff
    &:hover
      background-color $blue-400
      border-color $blue-400
    &:active
      background-color $blue-600
      border-color $blue-600
    &::after
      background radial-gradient(circle, $blue-300 10%, transparent 10%)
  .p-drop-down-button-surround-disabled
    border-style none
    background-color $red-200
    color $grey-400
    cursor not-allowed

  .p-drop-down-button-surround-drop,.p-drop-down-button-surround-default-drop
    .p-drop-down-button-inner
      padding-right 0
  .p-drop-down-button-surround-drop.p-drop-down-button-surround-large
    padding-right 32px
    .p-drop-down-button-surround-triangle
      width 32px
  .p-drop-down-button-surround-drop.p-drop-down-button-surround-large.p-drop-down-button-surround-primary,
  .p-drop-down-button-surround-drop.p-drop-down-button-surround-large.p-drop-down-button-surround-default
    .p-drop-down-button-surround-triangle
      svg
        margin-bottom 2px
  .p-drop-down-button-surround-drop.p-drop-down-button-surround-medium
    padding-right 32px
    .p-drop-down-button-surround-triangle
      width 32px
  .p-drop-down-button-surround-drop.p-drop-down-button-surround-medium.p-drop-down-button-surround-primary,
  .p-drop-down-button-surround-drop.p-drop-down-button-surround-medium.p-drop-down-button-surround-default
    .p-drop-down-button-surround-triangle
      svg
        margin-bottom 1px
  .p-drop-down-button-surround-drop.p-drop-down-button-surround-small
    padding-right 24px
    .p-drop-down-button-surround-triangle
      width 24px
  .p-drop-down-button-surround-drop.p-drop-down-button-surround-small.p-drop-down-button-surround-primary,
  .p-drop-down-button-surround-drop.p-drop-down-button-surround-small.p-drop-down-button-surround-default
    .p-drop-down-button-surround-triangle
      svg
        margin-bottom 1px
  .p-drop-down-button-surround-default-drop
    padding-right 24px
    background-color none
    border-style none
    svg
      margin-top 1px
  .p-drop-down-button-surround-split-drop
    padding-right 23px
    &::before
      position absolute
      content ''
      right 22px
      width 1px
      z-index 10
  .p-drop-down-button-surround-split-drop.p-drop-down-button-surround-large.p-drop-down-button-surround-primary,
  .p-drop-down-button-surround-split-drop.p-drop-down-button-surround-large.p-drop-down-button-surround-default,
  .p-drop-down-button-surround-split-drop.p-drop-down-button-surround-large.p-drop-down-button-surround-disabled
    .p-drop-down-button-inner
      padding-right 14px
    padding-right 31px
    &::before
      right 30px
  .p-drop-down-button-surround-split-drop.p-drop-down-button-surround-large.p-drop-down-button-surround-default
    padding-right 31px
  .p-drop-down-button-surround-split-drop.p-drop-down-button-surround-medium.p-drop-down-button-surround-primary,
  .p-drop-down-button-surround-split-drop.p-drop-down-button-surround-medium.p-drop-down-button-surround-default,
  .p-drop-down-button-surround-split-drop.p-drop-down-button-surround-medium.p-drop-down-button-surround-disabled
    .p-drop-down-button-inner
      padding-right 12px
    padding-right 27px
    &::before
      right 26px
  .p-drop-down-button-surround-split-drop.p-drop-down-button-surround-medium.p-drop-down-button-surround-default
    padding-right 27px
  .p-drop-down-button-surround-split-drop.p-drop-down-button-surround-small.p-drop-down-button-surround-default
    padding-right 23px

  .p-drop-down-button-surround-split-drop.p-drop-down-button-surround-default,.p-drop-down-button-surround-split-drop.p-drop-down-button-surround-disabled
    &::before
      background-color $grey-400
  .p-drop-down-button-surround-split-drop.p-drop-down-button-surround-default
    &:active
      //border-color $grey-400
      color $grey-900
      .p-drop-down-button-surround-triangle
        path
          fill #9CA2A9
    &:hover
      //border-color $grey-400
      color $grey-900
      .p-drop-down-button-surround-triangle
        path
          fill #9CA2A9
      &::before
        background-color $grey-400
    .p-drop-down-button-inner
      &:hover
        // background-color $grey-100
        color $blue-500
      &:active
        color $blue-600
    .p-drop-down-button-surround-triangle
      &:hover
        path
          fill $blue-500
      &:active
        path
          fill $blue-600

  .p-drop-down-button-surround-split-drop.p-drop-down-button-surround-disabled
    border none
  .p-drop-down-button-surround-split-drop.p-drop-down-button-surround-primary
    .p-drop-down-button-inner
      background-color $blue-500
    border none
    &::before
      background-color $blue-300
    &:hover
      background-color $blue-500
      .p-drop-down-button-surround-triangle
        background-color $blue-500
    &:active
      background-color $blue-500
      .p-drop-down-button-surround-triangle
        background-color $blue-500
    .p-drop-down-button-inner
      &:hover
        background-color $blue-400
        .p-drop-down-button-surround-triangle
          background-color $blue-500
      &:active
        background-color $blue-600
        .p-drop-down-button-surround-triangle
          background-color $blue-500
    .p-drop-down-button-surround-triangle
      top 0
      right 0
      background-color $blue-500
      &:hover
        background-color $blue-400
      &:active
        background-color $blue-400
  .p-drop-down-button-surround-split-drop.p-drop-down-button-surround-default.p-drop-down-button-surround-large
    .p-drop-down-button-surround-triangle
      width 30px
  .p-drop-down-button-surround-split-drop.p-drop-down-button-surround-default.p-drop-down-button-surround-medium
    .p-drop-down-button-surround-triangle
      width 26px
  .p-drop-down-button-surround-split-drop.p-drop-down-button-surround-default.p-drop-down-button-surround-small
    .p-drop-down-button-surround-triangle
      width 22px
  .p-drop-down-button-surround-split-drop.p-drop-down-button-surround-primary.p-drop-down-button-surround-large,
  .p-drop-down-button-surround-split-drop.p-drop-down-button-surround-disabled.p-drop-down-button-surround-large
    line-height 40px
    .p-drop-down-button-surround-triangle
      border-top-right-radius 4px
      border-bottom-right-radius 4px
      height 40px
      line-height 40px
      width 30px
      &:hover
        width 30px
  .p-drop-down-button-surround-split-drop.p-drop-down-button-surround-disabled.p-drop-down-button-surround-medium,
  .p-drop-down-button-surround-split-drop.p-drop-down-button-surround-primary.p-drop-down-button-surround-medium
    line-height 32px
    .p-drop-down-button-surround-triangle
      border-top-right-radius 4px
      border-bottom-right-radius 4px
      height 32px
      line-height 32px
      width 26px
      &:hover
        width 26px
  .p-drop-down-button-surround-split-drop.p-drop-down-button-surround-disabled.p-drop-down-button-surround-small
  .p-drop-down-button-surround-split-drop.p-drop-down-button-surround-primary.p-drop-down-button-surround-small
    line-height 28px
    .p-drop-down-button-surround-triangle
      border-top-right-radius 4px
      border-bottom-right-radius 4px
      height 28px
      line-height 28px
      width 22px
      &:hover
        width 22px
  .p-drop-down-button-surround-split-drop.p-drop-down-button-surround-large.p-drop-down-button-surround-primary
    &::before
      top 14px
      height 14px
  .p-drop-down-button-surround-split-drop.p-drop-down-button-surround-large.p-drop-down-button-surround-default
    &::before
      top 13px
      height 14px
  .p-drop-down-button-surround-split-drop.p-drop-down-button-surround-medium
    &::before
      top 10px
      height 12px
  .p-drop-down-button-surround-split-drop.p-drop-down-button-surround-small
    &::before
      top 9px
      height 10px
  .p-drop-down-button-surround-primary.p-drop-down-button-surround-split-drop,
  .p-drop-down-button-surround-disabled.p-drop-down-button-surround-split-drop
    .p-drop-down-button-surround-triangle
      svg
        margin-bottom 2px
  .p-drop-down-button-surround-split-drop
    .p-drop-down-button-inner.p-drop-down-button-default
      transition color .36s

</style>
