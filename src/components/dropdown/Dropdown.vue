<template>
    <div class="p-drop" @mouseenter="dropdownShow" @mouseleave="dropdownHide">
        <section class="p-drop-title">
            <article class="p-drop-title-content">
                <!-- @slot html内容 -->
                <slot></slot>
            </article>
            <article :class="['p-drop-triangle', !optionStatus && 'p-drop-triangle-rotate']"><Triangle /></article>
        </section>
        <transition name="slideDownUpUi">
            <section :class="['p-drop-option', 'p-drop-option-'+position]" v-show="optionStatus">
                <article
                        :class="['p-drop-option-item', value===item.id&&'option-selected', item.disabled&&'option-disable']"
                        v-for="item in data"
                        :key="item.id"
                        @click="optionClick(item.id, item.disabled)"
                        @mouseenter="optionEnter"
                >
                    <i class="p-drop-option-svg" v-if="item.icon" v-html="item.icon"></i>
                    <span>{{item.name}}</span>
                </article>
            </section>
        </transition>
    </div>
</template>

<script>
    import Triangle from '../static/iconSvg/triangle.svg';

    export default {
        name: "Dropdown",
        components: { Triangle },
        props: {
            /**
             * 数据列表
             */
            data: {
                type: Array,
                default: [],
                require: true
            },
            /**
             * 绑定的v-model值
             */
            value: {
                type: String,
                default: ''
            },
            /**
             * 下拉菜单位置，可选值【left， right】
             */
            position: {
                type: String,
                default: 'left'
            }
        },
        data() {
            return {
                /**
                 * 下拉菜单状态
                 */
                optionStatus: false
            }
        },
        methods: {
            dropdownShow() {
                this.optionStatus=true;
            },
            dropdownHide() {
                this.optionStatus=false;
            },
            // 子项鼠标移入
            optionEnter(e) {
                const target=e.target;
                const {clientWidth, scrollWidth, title}=target;
                if (!title && scrollWidth > clientWidth) target.title=target.innerText;
            },
            /**
             * 提交当前选择的值
             * @param v 返回值
             * @param disabled 是否禁用点击
             */
            optionClick(v, disabled) {
                if (disabled) return;
                this.$emit('input', v);
                this.dropdownHide();
            }
        }
    }
</script>

<style lang="stylus">

    @import "../static/stylus/animate/slideDownUpUi.styl"

    .p-drop
        position relative
        display inline-block
        vertical-align middle
        .p-drop-title
            position relative
            padding-right 16px
            cursor pointer
            z-index 10
            .p-drop-title-content
                font-size 14px
                color $grey-900
            .p-drop-triangle
                position absolute
                right 0
                top 50%
                transform translateY(-8px)
                svg
                    transition transform .3s
            .p-drop-triangle-rotate
                svg
                    transform rotate(180deg)
        .p-drop-option
            position absolute
            top 100%
            padding-top 4px
            padding-bottom 4px
            background-color #fff
            border 1px solid $grey-300
            border-radius 4px
            box-shadow 0 5px 10px rgba(31,35,41,.1)
            min-width 120px
            max-width 240px
            max-height 138px
            overflow-y auto
            z-index 11
            .p-drop-option-item
                padding 5px 12px
                //width 100%
                //height 32px
                font-size 14px
                color $grey-900
                cursor pointer
                white-space nowrap
                text-overflow ellipsis
                overflow hidden
                .p-drop-option-svg
                    margin-right 8px
                    svg
                        vertical-align middle
                span
                    vertical-align middle
                    line-height 22px
                &:hover
                    background-color $grey-200
                &.option-selected
                    color $blue-500
                    background-color $blue-100
                    .p-drop-option-svg
                        svg
                            path
                                fill $blue-500
                &.option-disable
                    color $grey-400 !important
                    cursor not-allowed
        .p-drop-option-left
            left 0
        .p-drop-option-right
            right 0

</style>
