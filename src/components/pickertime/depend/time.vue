<template>
<!--    <div :class="['p-picker-time-select-box', 'p-picker-time-select-box-'+format]">-->
    <div class="p-picker-time-select-box">
        <div class="p-picker-time-title">
            <section :class="['p-picker-time-title-item', 'p-picker-time-title-item-'+format]">时</section>
            <section :class="['p-picker-time-title-item', 'p-picker-time-title-item-'+format]">分</section>
            <section :class="['p-picker-time-title-item', 'p-picker-time-title-item-'+format]" v-if="format==='hms'">秒</section>
        </div>
        <div class="p-picker-time-content">
            <div
                    :class="['p-picker-time-select', 'p-picker-time-select-'+format]"
                    ref="hoursDom">
                <ul>
                    <li
                            :class="['p-picker-time-text', hour===hh&&'p-picker-time-text-selected']"
                            v-for="(hh, hi) in hours"
                            :key="'hour'+hi+hh"
                            @click="hourClick(hh)"
                    ><span>{{hh}}</span></li>
                </ul>
            </div>
            <div
                    :class="['p-picker-time-select', 'p-picker-time-select-'+format]"
                    ref="minutesDom">
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
                    v-if="format==='hms'">
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
    import CountNumber from 'datePicker/CountNumber';

    export default {
        name: "TimeSelect",
        directives: {
            /**
             * 自定义指令
             */
            focus: {
                inserted: function inserted(e, ct) {
                    if (ct.value) e.focus();
                }
            }
        },
        props: {
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
                this.scrollTopTimer(hour*32, 'hoursDom');
                this.$emit('hourChange', hour);
            },
            /**
             * 点击分钟
             * @param minute
             */
            minuteClick(minute) {
                this.scrollTopTimer(minute*32, 'minutesDom');
                this.$emit('minuteChange', minute);
            },
            /**
             * 点击秒
             * @param second
             */
            secondClick(second) {
                this.scrollTopTimer(second*32, 'secondsDom');
                this.$emit('secondChange', second);
            },
            /**
             * 滚动条过度
             * @param st 滚动到的scrollTop
             * @param obj 当前ref对象
             */
            scrollTopTimer(st, obj) {
                let top = this.$refs[obj].scrollTop;
                let differ=st-top; // 差值
                let remain=differ; // 剩余差值
                this.timer=setInterval(() => {
                    let speed = window.Math.ceil(remain / 3);
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
            }
        }
    }
</script>

<style lang="stylus" scoped>

@import "~stylus/tools.styl"
@import "~stylus/animate/opacityScale.styl"

//.p-picker-time-select-box-hms
//    width 296px
//.p-picker-time-select-box-hm
//    width 197.33px
.p-picker-time-select-box
    border 1px solid $grey-grey-200
    width 296px
    &+.p-picker-time-select-box
        border-left 0
    .p-picker-time-title
        display flex
        align-items center
        justify-content space-around
        margin-top 12px
        margin-bottom 8px
        .p-picker-time-title-item-hms
            width 98px
        .p-picker-time-title-item-hm
            width 147px
        .p-picker-time-title-item
            //width 98.66px
            height 24px
            line-height @height
            color $grey-grey-500
            font-size 14px
            text-align center
    .p-picker-time-content
        display flex
        justify-content space-around
        padding-top 8px
        padding-bottom 8px
        width 100%
        height 208px
        overflow hidden
        .p-picker-time-select-hms
            padding-left 36px
            width 98px
        .p-picker-time-select-hm
            padding-left 60px
            width 147px
        .p-picker-time-select
            height 192px
            overflow hidden
            &:hover
                overflow-y auto
            ul
                position relative
                padding-bottom 160px
                width 100%
            .p-picker-time-text
                margin-bottom 8px
                width 100%
                height 24px
                span
                    display block
                    border-radius 4px
                    width 24px
                    height @width
                    line-height @height
                    color $grey-grey-900
                    font-size 14px
                    text-align center
                    cursor pointer
                    transition background .3s
                    user-select none
                    &:hover
                        background-color $grey-grey-200
                &.p-picker-time-text-selected
                    span
                        background-color $primary-blue-500
                        color #fff

</style>