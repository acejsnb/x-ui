<template>
    <div class="p-select" :style="{width: width+'px'}" tabindex="-1" @blur="selectBlur">
        <section class="p-select-title" @click="selectBoxHandle">
            <article class="p-select-title-text"><span>{{title}}</span></article>
            <section :class="['triangle', optionStatus && 'triangleRotate']"><Triangle /></section>
        </section>
        <transition name="slideDownUp">
            <section class="p-select-option-box" v-show="optionStatus">
                <article
                        :class="['option', value===item.id&&'option-selected']"
                        v-for="item in data"
                        :key="item.id"
                        @click="optionClick(item.id)"
                ><span>{{item.name}}</span></article>
            </section>
        </transition>
    </div>
</template>

<script>
import Triangle from 'icon/triangle.svg';

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
        width: {
            type: String,
            default: '88'
        }
    },
    data() {
        return {
            title: '',
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
            this.title=this.data.find(d => d.id === v).name;
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
        selectBlur() {
            this.optionStatus=false;
        }
    }
}
</script>

<style lang="stylus" scoped>

@import "~stylus/tools.styl"
@import "~stylus/animate/slideDownUp.styl"

.p-select
    outline none
    position relative
    display inline-block
    vertical-align middle
    &:hover
        .p-select-title
            border-color $primary-blue-500
    &:focus
        .p-select-title
            border-color $primary-blue-500
            box-shadow 0 0 0 2px rgba(0,145,255,.2)
    .p-select-title
        outline none
        position relative
        padding-left 12px
        padding-right 12px
        background-color #fff
        border 1px solid $grey-grey-400
        border-radius 4px
        width 100%
        height 32px
        line-height @height
        text-align left
        cursor pointer
        z-index 10
        .p-select-title-text
            display block
            text-overflow ellipsis
            white-space nowrap
            overflow hidden
            width 100%
            color $grey-grey-900
            span
                display ruby
                font-size 14px
        .triangle
            position absolute
            top 0
            right 0
            display flex
            align-items center
            justify-content center
            width 32px
            height @width
            text-align center
            transition all .3s
        .triangleRotate
            transform rotate(90deg)
    .p-select-option-box
        position absolute
        left 0
        top 32px
        padding-top 4px
        padding-bottom 4px
        background-color #fff
        border 1px solid $grey-grey-300
        border-radius 4px
        box-shadow 0 5px 10px rgba(31,35,41,.1)
        width 100%
        max-height 136px
        overflow hidden
        z-index 1
        .option
            padding-left 12px
            width 100%
            height 32px
            line-height @height
            color #262626
            text-align left
            cursor pointer
            overflow hidden
            span
                display ruby
                font-size 14px
            &:hover
                background-color $grey-grey-200
            &.option-selected
                color $primary-blue-500
                background-color $primary-blue-100

</style>