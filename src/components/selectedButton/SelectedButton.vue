<template>
    <div class="p-selected-button">
        <div
                :class="['p-selected-button-content', placeholderStatus&&'p-selected-button-content-placeholder']"
                @click="handleClick"
                @mouseenter="setTipStatus"
                @mouseleave="setTipStatus"
        >
            <span>{{titleText}}</span>
            <TriangleSvg :class="[!triangle&&'p-selected-button-rotate']" />
        </div>
        <transition :name="'slide'+tipPlace">
            <div
                    v-show="tipShow"
                    :class="['p-selected-button-tip', 'p-selected-button-tip-'+tipPlace]"
                    :style="selectedTipStyle"
            >
                <section ref="selectedTipItem" :class="['p-selected-button-tip-item', (tipHeight>98)&&'p-selected-button-tip-overflow']">{{tipText}}</section>
            </div>
        </transition>
    </div>
</template>

<script>
    import TriangleSvg from '../static/iconSvg/triangle.svg';

    export default {
        name: "SelectedButton",
        components: { TriangleSvg },
        props: {
            // 选择内容后的title
            title: {
                type: String,
                default: ''
            },
            // 占位符
            placeholder: {
                type: String,
                default: '请选择'
            },
            // 单位
            unit: {
                type: String,
                default: '个'
            },
            // 选中的数据
            data: {
                type: Array,
                default: []
            },
            // 三角形方向
            triangle: {
                type: Boolean,
                default: false
            },
            // 提示框位置
            tipPlace: {
                type: String,
                default: 'bottom'
            },
            // 提示框是否可显示
            // tipModal: {
            //     type: Boolean,
            //     default: true
            // }
        },
        data() {
            return {
                tipHeight: 0, // 文字(高度)是否超出
                selectedTipStyle: { bottom: 0, left: 0 },
                tipShow: false
            }
        },
        computed: {
            // 占位符是否显示
            placeholderStatus() {
                return this.data.length === 0
            },
            // 设置按钮显示占位内容
            titleText() {
                const sd=this.data;
                if (sd && sd.length) return this.title+sd.length+this.unit;
                else return this.placeholder;
            },
            // 提示框数据
            tipText() {
                const data=JSON.parse(JSON.stringify(this.data));
                const len=data.length-1;
                let text='';
                data.forEach((d, i) => {
                    if (i<len) {
                        text+=d.name+'、';
                    } else {
                        text+=d.name;
                    }
                });
                return text;
            }
        },
        watch: {
            tipHeight(n, o) {
                if (n >= 98) {
                    switch (this.tipPlace) {
                        case 'top':
                            this.selectedTipStyle={
                                top: '-108px',
                                left: 0
                            };
                            break;
                        case 'bottom':
                            this.selectedTipStyle={
                                bottom: '-108px',
                                left: 0
                            };
                            break;
                        case 'left':
                            this.selectedTipStyle={
                                top: '-36px',
                                left: '-288px'
                            };
                            break;
                        case 'right':
                            this.selectedTipStyle={
                                top: '-36px',
                                right: '-288px'
                            };
                            break;
                        default:
                            this.selectedTipStyle={
                                bottom: '-36px',
                                left: 0
                            };
                            break;
                    }
                } else {
                    switch (this.tipPlace) {
                        case 'top':
                            this.selectedTipStyle={
                                top: -(n+8)+'px',
                                left: 0
                            };
                            break;
                        case 'bottom':
                            this.selectedTipStyle={
                                bottom: -(n+8)+'px',
                                left: 0
                            };
                            break;
                        case 'left':
                            this.selectedTipStyle={
                                top: -(n/2-12)+'px',
                                left: '-288px'
                            };
                            break;
                        case 'right':
                            this.selectedTipStyle={
                                top: -(n/2-12)+'px',
                                right: '-288px'
                            };
                            break;
                        default:
                            this.selectedTipStyle={
                                bottom: '-36px',
                                left: 0
                            };
                            break;
                    }
                }
            },
            // 监听提示框可显示状态改变
            tipModal(n, o) {
                if (n === o) return;
                if (!n) this.tipShow=false;
            }
        },
        methods: {
            // 设置tip显示状态
            setTipStatus() {
                if (this.tipShow) {
                    this.tipShow=false;
                } else {
                    const sd=this.data;
                    if (sd && sd.length) {
                        this.tipShow=true;
                        if (!this.tipHeight) {
                            this.$nextTick(() => {
                                const height=this.$refs.selectedTipItem.scrollHeight;
                                this.tipHeight=height+32;
                            });
                        }
                    }
                }
            },
            // 点击
            handleClick() {
                this.$emit('changeTriangle', !this.triangle);
            }
        }
    }
</script>

<style lang="stylus">
.p-selected-button
    position relative
    display inline-block
    width 100%
    min-width 120px
    //max-width 192px
    //height 32px
    .p-selected-button-content
        display flex
        align-items center
        justify-content space-between
        padding 5px 8px 5px 12px
        background-color #fff
        border 1px solid $grey-400
        border-radius 4px
        width 100%
        height 32px
        line-height @height
        font-size 14px
        cursor pointer
        transition border .3s
        &:hover
            border-color $blue-500
        &:active
            border-color $blue-600
        span
            color $grey-900
        svg
            transition transform .3s
        .p-selected-button-rotate
            transform rotate(180deg)
        &.p-selected-button-content-placeholder
            span
                color $grey-400
    .p-selected-button-tip
        position absolute
        padding 16px 20px
        background-color #fff
        border-radius 4px
        pointer-events none
        width 280px
        max-height 104px
        z-index 100
        &:after
            position absolute
            display inline-block
            border-style solid
            border-width 4px
            width 0
            height 0
            transform rotate(-45deg);
            z-index 0
            content ''
        .p-selected-button-tip-item
            position relative
            overflow hidden
            max-height 66px
            line-height 22px
            font-size 14px
            word-wrap break-word
            word-break break-all
        .p-selected-button-tip-overflow
            &:after
                position absolute
                right 0
                bottom 0
                display inline-block
                width 20px
                height 22px
                background-color #fff
                content '...'
    .p-selected-button-tip-top
        box-shadow 0 2px 10px 0 rgba(31,35,41,.1)
        &:after
            bottom -4px
            left 32px
            border-color transparent transparent #fff #fff
            box-shadow -2px 2px 4px 0 rgba(31,35,41,.1)
            z-index -1
    .p-selected-button-tip-bottom
        box-shadow -2px 0 10px 0 rgba(31,35,41,.1)
        &:after
            top -4px
            left 32px
            border-color #fff #fff transparent transparent
            box-shadow 2px -2px 4px 0 rgba(31,35,41,.1)
    .p-selected-button-tip-left
        box-shadow 2px 0 10px 0 rgba(31,35,41,.1)
        &:after
            top 49%
            right -4px
            border-color transparent #fff #fff transparent
            box-shadow 2px 2px 4px 0 rgba(31,35,41,.1)
    .p-selected-button-tip-right
        box-shadow 0 -2px 10px 0 rgba(31,35,41,.1)
        &:after
            top 49%
            left -4px
            border-color #fff transparent transparent #fff
            box-shadow -2px -2px 4px 0 rgba(31,35,41,.1)

@keyframes slidetop
    from
        opacity 0
        transform translateY(32px)
    to
        opacity 1
        transform translateY(0)
.slidetop-enter-active
    animation slidetop .3s
.slidetop-leave-active
    animation slidetop .3s reverse
@keyframes slidebottom
    from
        opacity 0
        transform translateY(-32px)
    to
        opacity 1
        transform translateY(0)
.slidebottom-enter-active
    animation slidebottom .3s
.slidebottom-leave-active
    animation slidebottom .3s reverse
@keyframes slideleft
    from
        opacity 0
        transform translateX(32px)
    to
        opacity 1
        transform translateX(0)
.slideleft-enter-active
    animation slideleft .3s
.slideleft-leave-active
    animation slideleft .3s reverse
@keyframes slideright
    from
        opacity 0
        transform translateX(-32px)
    to
        opacity 1
        transform translateX(0)
.slideright-enter-active
    animation slideright .3s
.slideright-leave-active
    animation slideright .3s reverse

</style>