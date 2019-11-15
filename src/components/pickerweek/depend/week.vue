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
                <article
                        class="p-picker-child-select-box-icon-svg p-picker-child-select-box-icon-svg-left"
                        @click="prevMonth"
                        v-if="!disableMonthLeft"
                >
                    <ArrowRightSvg />
                </article>
            </section>
            <section class="p-picker-child-select-box-title-text">
                <article>{{yearActive}}年</article>
                <article>{{monthActive}}月</article>
            </section>
            <section class="p-picker-child-select-box-icon">
                <article
                        class="p-picker-child-select-box-icon-svg"
                        @click="nextMonth"
                        v-if="!disableMonthRight"
                >
                    <ArrowRightSvg />
                </article>
                <article
                        class="p-picker-child-select-box-icon-svg"
                        @click="nextYear"
                        v-if="!disableYearRight"
                >
                    <ArrowRightDoubleSvg />
                </article>
            </section>
        </div>
        <div class="p-picker-child-title">
            <section
                    class="p-picker-child-title-item"
                    v-for="wt in weekText"
                    :key="'wt-'+wt"
            >{{wt}}</section>
        </div>
        <div class="p-picker-day-content">
            <div class="p-picker-day-select">
                <section
                        class="p-picker-weeks-list"
                        v-for="(weeks, i) in weeksArray" :key="'weeks'+i"
                >
                    <article class="p-picker-weeks-list-text">
                        {{weeks.year}}
                        <span>{{weeks.th}}</span>
                        周
                    </article>
                    <article
                            class="p-picker-day-text"
                            v-for="(ww, wi) in weeks.weeks"
                            :key="'week-'+ww.th+wi"
                            @click="dayClick(ww)"
                            @mouseenter="dayEnter(ww)"
                    >
                        <span>{{ww.day}}</span>
                    </article>
                </section>
            </div>
        </div>
    </div>
</template>

<script>
    import ArrowRightSvg from '../../static/iconSvg/arrow_right2.svg';
    import ArrowRightDoubleSvg from '../../static/iconSvg/arrow_right_double.svg';

    export default {
        name: "WeekSelect",
        components: { ArrowRightSvg, ArrowRightDoubleSvg },
        props: {
            /**
             * 日期
             */
            yearNow: {
                type: String,
                default: ''
            },
            monthNow: {
                type: String,
                default: ''
            },
            dayNow: {
                type: String,
                default: ''
            },

            yearActive: {
                type: String,
                default: ''
            },
            monthActive: {
                type: String,
                default: ''
            },
            dayActive: {
                type: String,
                default: ''
            },

            yearSelected: {
                type: String,
                default: ''
            },
            monthSelected: {
                type: String,
                default: ''
            },
            daySelected: {
                type: String,
                default: ''
            },

            /**
             * 周列表
             */
            weeksArray: {
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
             * 禁用左箭头-月
             */
            disableMonthLeft: {
                type: Boolean,
                default: false
            },
            /**
             * 禁用右箭头-月
             */
            disableMonthRight: {
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
        computed: {
            weekText() {
                return ['一', '二', '三', '四', '五', '六', '日']
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
             * 上一月
             */
            prevMonth() {
                this.$emit('prevMonth')
            },
            /**
             * 下一月
             */
            nextMonth() {
                this.$emit('nextMonth')
            },
            /**
             * 点击日
             * @param obj
             */
            dayClick(obj) {
                if (obj.flag !== 'n') return;
                this.$emit('change', obj);
            },
            /**
             * 鼠标在day面板上移动
             * @param obj {flag, year, month, day}
             */
            dayEnter(obj) {
                if (!this.multiple || obj.flag !== 'n') return;
                this.$emit('dayEnter', obj);
            }
        }
    }
</script>

<style lang="stylus" scoped>

    @import "../../static/stylus/animate/opacityScale.styl"
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
    .p-picker-day-content
        padding 8px 15px
        width 100%
        height 208px
        .p-picker-day-select
            height 192px
            .p-picker-weeks-list
                position relative
                display flex
                flex-wrap wrap
                margin-bottom 8px
                width 100%
                cursor pointer
                &:hover
                    background-color $grey-grey-200
                .p-picker-weeks-list-text
                    position absolute
                    display flex
                    align-items center
                    justify-content center
                    padding 4px 12px
                    background-color #fff
                    box-shadow 0 2px 10px 0 rgba(31,35,41,0.1)
                    border-radius 4px
                    color $grey-grey-900
                    font-size 14px
                    span
                        color $primary-blue-500
            .p-picker-day-text
                margin-right 16px
                border-width 1px
                border-style solid
                border-color transparent
                border-radius 4px
                width 24px
                height 24px
                line-height @height
                text-align center
                transition background-color .3s
                &:nth-of-type(7n)
                    margin-right 0
                span
                    position relative
                    color $grey-grey-900
                    font-size 14px
                    text-align center
                    transition color .3s
                    user-select none
                    z-index 10

</style>