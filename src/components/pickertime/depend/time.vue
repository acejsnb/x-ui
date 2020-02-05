<template>
    <div :class="['p-picker-child-select-box', 'p-picker-child-select-box-'+borderLeft]">
        <div class="p-picker-child-select-box-title" v-if="range">
            <section class="p-picker-child-select-box-title-text">
                <article>{{title}}</article>
            </section>
        </div>
        <div class="p-picker-child-title">
            <section :class="['p-picker-time-title-item', 'p-picker-time-title-item-'+format]">时</section>
            <section :class="['p-picker-time-title-item', 'p-picker-time-title-item-'+format]">分</section>
            <section :class="['p-picker-time-title-item', 'p-picker-time-title-item-'+format]" v-if="format==='hms'">秒</section>
        </div>
        <div class="p-picker-time-content">
            <div
                    :class="['p-picker-time-select', 'p-picker-time-select-'+format]"
                    ref="hoursDom"
                    @scroll="hourScroll"
                    @mousedown="hourDown"
                    @mouseup="hourUp"
            >
                <ul>
                    <li
                            :class="['p-picker-time-text', hour===hh&&'p-picker-time-text-selected']"
                            v-for="(hh, hi) in hours"
                            :key="'hour'+hi+hh"
                            @click.stop="hourClick(hh)"
                    ><span>{{hh}}</span></li>
                </ul>
            </div>
            <div
                    :class="['p-picker-time-select', 'p-picker-time-select-'+format]"
                    ref="minutesDom"
                    @scroll="minuteScroll"
                    @mousedown="minuteDown"
                    @mouseup="minuteUp"
            >
                <ul>
                    <li
                            :class="['p-picker-time-text', minute===mm&&'p-picker-time-text-selected']"
                            v-for="(mm, mi) in minutes"
                            :key="'minute'+mi+mm"
                            @click="minuteClick(mm)"
                    ><span>{{mm}}</span></li>
                </ul>
            </div>
            <div
                    :class="['p-picker-time-select', 'p-picker-time-select-'+format]"
                    ref="secondsDom"
                    @scroll="secondScroll"
                    @mousedown="secondDown"
                    @mouseup="secondUp"
                    v-if="format==='hms'"
            >
                <ul>
                    <li
                            :class="['p-picker-time-text', second===ss&&'p-picker-time-text-selected']"
                            v-for="(ss, si) in seconds"
                            :key="'second'+si+ss"
                            @click="secondClick(ss)"
                    ><span>{{ss}}</span></li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
    import CountNumber from '../../static/utils/datePicker/CountNumber';

    export default {
        name: "TimeSelect",
        props: {
            // 左边框
            borderLeft: {
                type: String,
                default: ''
            },
            /**
             * 时间title
             */
            title: {
                type: String,
                default: ''
            },
            /**
             * 继承父级range
             */
            range: {
                type: Boolean,
                default: false
            },
            /**
             * 选择的小时
             */
            hour: {
                type: String,
                default: ''
            },
            /**
             * 选择的分钟
             */
            minute: {
                type: String,
                default: ''
            },
            /**
             * 选择的秒
             */
            second: {
                type: String,
                default: ''
            },
            /**
             * 时间格式
             * @value 可选值 【hms-时分秒（默认值），hm-时分】
             */
            format: {
                type: String,
                default: 'hms'
            },
        },
        computed: {
            hours() {
                return CountNumber(0, 24)
            },
            minutes() {
                return CountNumber(0, 60)
            },
            seconds() {
                return CountNumber(0, 60)
            }
        },
        mounted() {
            this.$nextTick(() => {
                this.$refs.hoursDom.scrollTop=this.hour*32;
                this.$refs.minutesDom.scrollTop=this.minute*32;
                if (this.$refs.secondsDom) this.$refs.secondsDom.scrollTop=this.second*32;
            });
        },
        methods: {
            /**
             * 点击小时
             * @param hour
             */
            hourClick(hour) {
                this.hourMouse=true;
                this.scrollTopTimer(hour*32, 'hoursDom');
                this.$emit('hourChange', hour);
            },
            /**
             * 点击分钟
             * @param minute
             */
            minuteClick(minute) {
                this.minuteMouse=true;
                this.scrollTopTimer(minute*32, 'minutesDom');
                this.$emit('minuteChange', minute);
            },
            /**
             * 点击秒
             * @param second
             */
            secondClick(second) {
                this.secondMouse=true;
                this.scrollTopTimer(second*32, 'secondsDom');
                this.$emit('secondChange', second);
            },
            /**
             * 滚动条过度
             * @param st 滚动到的scrollTop
             * @param obj 当前ref对象
             */
            scrollTopTimer(st, obj) {
                if (!obj) return;
                let top = this.$refs[obj].scrollTop;
                let differ=st-top; // 差值
                let remain=differ; // 剩余差值
                this.timer=setInterval(() => {
                    let speed = window.Math.round(remain / 3);
                    if (speed <= 0) window.clearInterval(this.timer);
                    remain=remain-speed;
                    if (differ) {
                        this.$refs[obj].scrollTop+=speed;
                    } else {
                        this.$refs[obj].scrollTop-=speed;
                    }
                    if (remain<=0) {
                        window.clearInterval(this.timer);
                        this.$refs[obj].scrollTop=st;
                    }
                }, 30)
            },
            // 小时相关scroll
            hourDown() {
                this.hourMouse=true;
            },
            hourUp(e) {
                this.hourMouse=false;
                this.hourScroll(this.$refs.hoursDom)
            },
            hourScroll(e) {
                if (this.hourTimer) clearTimeout(this.hourTimer);
                const target=e.target || e;
                const st=window.Math.round(target.scrollTop/32);
                this.hourTimer=setTimeout(() => {
                    if (!this.hourMouse) target.scrollTop=st*32;
                }, 30);
            },
            // 分钟相关scroll
            minuteDown() {
                this.minuteMouse=true;
            },
            minuteUp() {
                this.minuteMouse=false;
                this.hourScroll(this.$refs.minutesDom)
            },
            minuteScroll(e) {
                if (this.minuteTimer) clearTimeout(this.minuteTimer);
                const target=e.target || e;
                const st=window.Math.round(target.scrollTop/32);
                this.minuteTimer=setTimeout(() => {
                    if (!this.minuteMouse) target.scrollTop=st*32;
                }, 30);
            },
            // 秒钟相关scroll
            secondDown() {
                this.secondMouse=true;
            },
            secondUp() {
                this.secondMouse=false;
                this.hourScroll(this.$refs.secondsDom)
            },
            secondScroll(e) {
                if (this.secondTimer) clearTimeout(this.secondTimer);
                const target=e.target || e;
                const st=window.Math.floor(target.scrollTop/32);
                this.secondTimer=setTimeout(() => {
                    if (!this.secondMouse) target.scrollTop=st*32;
                }, 30);
            }
        }
    }
</script>

<style lang="stylus">

    @import "../../static/stylus/animate/opacityScale.styl"
    @import "../../static/stylus/datePicker/pickerChild.styl"

    .p-picker-child-title
        display flex
        align-items center
        justify-content space-around
        margin-top 12px
        margin-bottom 8px
        padding-left 16px
        padding-right 16px
        .p-picker-child-title-item
            height 24px
            line-height @height
            color $grey-500
            font-size 14px
            text-align center
    .p-picker-time-content
        position relative
        display flex
        justify-content space-around
        padding 8px 16px
        width 100%
        height 208px
        overflow hidden
        &::before
            position absolute
            display block
            background-color $grey-200
            border-radius 4px
            width 262px
            height 24px
            z-index 9
            content ''
        .p-picker-time-select-hms
            width 98px
            ul
                li
                    padding-left 36px
        .p-picker-time-select-hm
            width 147px
            ul
                li
                    padding-left 60px
        .p-picker-time-select
            position relative
            z-index 10
            height 192px
            overflow hidden
            &:hover
                overflow-y auto
            ul
                padding-bottom 160px
                width 100%
            .p-picker-time-text
                margin-bottom 8px
                width 100%
                height 24px
                line-height @height
                &:hover
                    background-color $grey-200
                    border-radius 4px
                span
                    color $grey-900
                    font-size 14px
                    text-align center
                    cursor pointer
                    transition color .3s
                    user-select none
                    &:hover
                        background-color $grey-200
                &.p-picker-time-text-selected
                    span
                        color $blue-500


</style>