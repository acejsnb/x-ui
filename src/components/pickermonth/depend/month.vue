<template>
    <div class="p-picker-child-select-box">
        <div class="p-picker-child-select-box-title">
            <section class="p-picker-child-select-box-icon">
                <article
                        class="p-picker-child-select-box-icon-svg p-picker-child-select-box-icon-svg-left"
                        @click="prevYear"
                        v-if="!disableYearLeft"
                >
                    <ArrowRightDoubleSvg />
                </article>
            </section>
            <section class="p-picker-child-select-box-title-text">
                <article>{{yearActive}}年</article>
            </section>
            <section class="p-picker-child-select-box-icon">
                <article
                        class="p-picker-child-select-box-icon-svg"
                        @click="nextYear"
                        v-if="!disableYearRight"
                >
                    <ArrowRightDoubleSvg />
                </article>
            </section>
        </div>
        <div class="p-picker-panel-content">
            <div class="p-picker-panel-select">
                <ul>
                    <li
                            :class="[
                                'p-picker-panel-text',
                                (yearNow===ma.year&&monthNow===ma.month)&&'p-picker-panel-text-current',
                                'p-picker-panel-text-'+ma.multiple,
                                'p-picker-panel-text-'+ma.selected
                             ]"
                            v-for="(ma, mai) in monthsArray"
                            :key="'month-'+ma.month+mai"
                            @click="monthClick(ma)"
                            @mouseenter="monthEnter(ma)"
                    >
                        <span>{{ma.monthText}}</span>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
    import ArrowRightDoubleSvg from '../../static/iconSvg/arrow_right_double.svg';

    export default {
        name: "YearSelect",
        components: { ArrowRightDoubleSvg },
        props: {
            /**
             * 日期
             */
            yearNow: {
                type: String,
                default: ''
            },
            yearActive: {
                type: String,
                default: ''
            },
            monthNow: {
                type: String,
                default: ''
            },
            monthActive: {
                type: String,
                default: ''
            },
            monthsArray: {
                type: Array,
                default: []
            },

            /**
             * 禁用左箭头-年
             */
            disableYearLeft: {
                type: Boolean,
                default: false
            },
            /**
             * 禁用右箭头-年
             */
            disableYearRight: {
                type: Boolean,
                default: false
            },
            /**
             * 开启多选
             */
            multiple: {
                type: Boolean,
                default: false
            }
        },
        methods: {
            /**
             * 上一年
             */
            prevYear() {
                this.$emit('prevYear')
            },
            /**
             * 下一年
             */
            nextYear() {
                this.$emit('nextYear')
            },
            /**
             * 点击日
             * @param obj
             */
            monthClick(obj) {
                this.$emit('change', obj);
            },
            /**
             * 鼠标在day面板上移动
             * @param obj
             */
            monthEnter(obj) {
                if (!this.multiple) return;
                this.$emit('monthEnter', obj);
            }
        }
    }
</script>

<style lang="stylus">

@import "../../static/stylus/datePicker/pickerChild.styl"

.p-picker-child-select-box-title
    display flex
    justify-content space-between
    align-items center
    padding-left 16px
    padding-right 16px
    .p-picker-child-select-box-icon
        display flex
        align-items center
        width 68px
        &:nth-of-type(1)
            justify-content flex-start
        &:nth-of-type(3)
            justify-content flex-end
        .p-picker-child-select-box-icon-svg
            padding-top 3px
            width 28px
            height @width
            line-height @width
            text-align center
            cursor pointer
            &:hover
                svg
                    path
                        transition fill .5s
                        fill $primary-blue-500
        .p-picker-child-select-box-icon-svg-left
            transform rotate(-180deg)
.p-picker-child-title
    display flex
    align-items center
    margin-top 12px
    margin-bottom 8px
    padding-left 16px
    .p-picker-child-title-item
        margin-right 16px
        width 24px
        height 24px
        line-height @height
        color $grey-grey-500
        font-size 14px
        text-align center
        user-select none
.p-picker-panel-content
    padding 0 0 12px 15px
    width 100%
    height 236px
    .p-picker-panel-select
        height 224px
        ul
            display flex
            flex-wrap wrap
            width 100%
        .p-picker-panel-text
            margin-right 12px
            margin-top 12px
            border-width 1px
            border-style solid
            border-color transparent
            border-radius 4px
            width 80px
            height 44px
            line-height @height
            text-align center
            cursor pointer
            transition background-color .3s
            &:nth-of-type(3n)
                margin-right 0
            &:hover
                background-color $grey-grey-200
            span
                position relative
                color $grey-grey-900
                font-size 14px
                text-align center
                transition color .3s
                user-select none
                z-index 10
            &.p-picker-panel-text-current
                background-color #fff !important
                border-color $primary-blue-500
                span
                    color $primary-blue-500
            &.p-picker-panel-text-multiple
                position relative
                &::before
                    position absolute
                    top -1px
                    left -7px
                    display inline-block
                    background-color $grey-grey-200
                    width 92px
                    height 44px
                    content ''
            &.p-picker-panel-text-selected
                background-color $primary-blue-500 !important
                span
                    color #fff
                &::before
                    display none
                //&+.p-picker-day-text-multiple
                //    &::before
                //        left -18px
                //        width 48px

</style>