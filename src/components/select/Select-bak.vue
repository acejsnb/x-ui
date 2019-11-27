<template>
    <div class="p-select" :style="{width: width+'px'}" tabindex="-1" @blur="selectBlur">
        <section
                :class="['p-select-title', radius&&'p-select-title-radius']"
                @click="selectBoxHandle"
        >
            <article class="p-select-title-text"><span v-if="title">{{title}}</span><span>{{text}}</span></article>
            <section :class="['p-select-triangle', !optionStatus && 'p-select-triangle-rotate']"><Triangle /></section>
        </section>
        <transition name="slideDownUp">
            <section class="p-select-option-box" v-show="optionStatus">
                <article
                        :class="['p-select-option', value===item.id&&'p-select-option-selected']"
                        v-for="item in data"
                        :key="item.id"
                        @click="optionClick(item.id)"
                        @mouseenter="optionEnter"
                >{{item.name}}</article>
            </section>
        </transition>
    </div>
</template>

<script>
    import Triangle from '../static/iconSvg/triangle.svg';

    export default {
        name: "Select",
        components: { Triangle },
        props: {
            /**
             * 下拉列表数据
             */
            data: {
                type: Array,
                default: []
            },
            /**
             * 绑定的v-model值
             */
            value: {
                type: String,
                default: ''
            },
            /**
             * 下拉列表宽度
             */
            title: {
                type: String,
                default: ''
            },
            /**
             * 下拉列表宽度
             */
            width: {
                type: [String, Number],
                default: '88'
            },
            /**
             * 圆角
             */
            radius: {
                type: Boolean,
                default: false
            }
        },
        data() {
            return {
                text: '',
                optionStatus: false
            }
        },
        created() {
            this.titleFormat(this.value)
        },
        watch: {
            multiple(n, o) {
                if (n !== o) {
                    this.titleFormat(this.value, n)
                }
            }
        },
        methods: {
            // 设置title
            titleFormat(v) {
                this.text=this.data.find(d => d.id === v).name;
            },
            // 打开下拉选择盒子
            selectBoxHandle() {
                if (this.optionStatus) {
                    this.selectBlur();
                } else {
                    this.optionStatus=true;
                }
            },
            // 提交当前选择的值
            optionClick(v) {
                this.titleFormat(v);
                /**
                 * 提交绑定的值
                 */
                this.$emit('input', v);
                this.selectBlur();
            },
            // 子项鼠标移入
            optionEnter(e) {
                const target=e.target;
                const {clientWidth, scrollWidth, title}=target;
                if (!title && scrollWidth > clientWidth) target.title=target.innerText;
            },
            selectBlur() {
                this.optionStatus=false;
            }
        }
    }
</script>

<style lang="stylus">

    @import "../static/stylus/animate/slideDownUp.styl"

    .p-select
        outline none
        position relative
        display inline-block
        vertical-align middle
        &:hover
            .p-select-title
                border-color $blue-500
        &:focus
            .p-select-title
                border-color $blue-500
                box-shadow 0 0 0 2px rgba(0,145,255,.2)
        .p-select-title
            position relative
            padding-left 12px
            padding-right 12px
            background-color #fff
            border 1px solid $grey-400
            border-radius 4px
            width 100%
            height 32px
            line-height @height
            text-align left
            cursor pointer
            z-index 10
            .p-select-title-text
                display block
                width 100%
                height 32px
                color $grey-900
                span
                    display ruby
                    font-size 14px
            .p-select-triangle
                position absolute
                top 0
                right 0
                display flex
                align-items center
                justify-content center
                width 32px
                height @width
                text-align center
                transition transform .3s
            .p-select-triangle-rotate
                transform rotate(180deg)
        .p-select-title-radius
            border-radius 16px
        .p-select-option-box
            position absolute
            left 0
            top 32px
            padding-top 4px
            padding-bottom 4px
            background-color #fff
            border 1px solid $grey-300
            border-radius 4px
            box-shadow 0 5px 10px rgba(31,35,41,.1)
            width 100%
            max-height 136px
            overflow hidden
            z-index 11
            .p-select-option
                padding-left 12px
                padding-top 5px
                padding-bottom 5px
                //width 100%
                //height 32px
                line-height 22px
                color $grey-900
                text-align left
                font-size 14px
                cursor pointer
                overflow hidden
                text-overflow ellipsis
                white-space nowrap
                &:hover
                    background-color $grey-200
                &.p-select-option-selected
                    color $blue-500
                    background-color $blue-100

</style>
