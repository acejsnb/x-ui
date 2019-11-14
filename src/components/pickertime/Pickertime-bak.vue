<template>
    <div class="p-picker-time">
        <div
                :class="['p-picker-input', 'p-picker-input-border', selectedTime&&'p-picker-input-values']"
                @click="pickerBoxShow"
                @mouseover="pickerClearShow"
                @mouseout="pickerClearHide"
        >
            <section>{{selectedTime?selectedTime:'请选择时间'}}</section>
            <transition name="opacityScale">
                <ClearSvg v-show="clearStatus" class="clearSvg" @click.stop="clearTime" />
            </transition>
        </div>
        <transition name="slideDownUp">
            <!--
            <div
                    class="p-picker-time-select-box"
                    tabindex="-1"
                    v-focus="pickerBoxStatus"
                    v-if="pickerBoxStatus"
                    @blur="pickerBoxHide"
            >
                -->
            <div
                    :class="['p-picker-time-select-box', 'p-picker-time-select-box-'+format]"
                    tabindex="-1"
                    v-focus="pickerBoxStatus"
                    v-if="pickerBoxStatus"
                    @blur="pickerBoxHide"
            >
                <div class="p-picker-input p-picker-input-values">{{format==='hms'?`${hour}:${minute}:${second}`:`${hour}:${minute}`}}</div>
                <div class="p-picker-time-title">
                    <section>时</section>
                    <section>分</section>
                    <section v-if="format==='hms'">秒</section>
                </div>
                <div class="p-picker-time-content">
                    <div class="p-picker-time-select" ref="hours">
                        <ul>
                            <li
                                    :class="['p-picker-time-text', hour===hh&&'p-picker-time-text-selected']"
                                    v-for="(hh, hi) in hours"
                                    :key="'hour'+hi+hh"
                                    @click="hourClick(hh)"
                            ><span>{{hh}}</span></li>
                        </ul>
                    </div>
                    <div class="p-picker-time-select" ref="minutes">
                        <ul>
                            <li
                                    :class="['p-picker-time-text', minute===mm&&'p-picker-time-text-selected']"
                                    v-for="(mm, mi) in minutes"
                                    :key="'minute'+mi+mm"
                                    @click="minuteClick(mm)"
                            ><span>{{mm}}</span></li>
                        </ul>
                    </div>
                    <div class="p-picker-time-select" ref="seconds" v-if="format==='hms'">
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
                <div class="p-picker-time-handle">
                    <Button type="primary" size="small" @click="pickerConfirm">确定</Button>
                </div>
            </div>
        </transition>
    </div>
</template>

<script>
    import CountNumber from 'datePicker/CountNumber';
    import CountNowDate from 'datePicker/CountNowDate';

    import Button from '../button/Button';

    import ClearSvg from 'icon/clear2.svg';

    export default {
        name: "PickerTime",
        components: { Button, ClearSvg },
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
             * 设置时间
             */
            time: {
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
            /**
             * 时间段
             * @value 【false-时间点（默认值），true-时间段】
             */
            range: {
                type: Boolean,
                default: false
            }
        },
        data() {
            return {
                pickerBoxStatus: false, // 显示选择时间框
                clearStatus: false, // 关闭按钮
                selectedTime: '', // 选中的时间
                hour: '', // 选择的小时
                minute: '', // 选择的分钟
                second: '' // 选择的秒
            }
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
        created() {
            const T=this.time;
            const [hh, mm, ss]=T.split(':');
            this.selectedTime=T;
            this.hour=hh;
            this.minute=mm;
            this.second=ss;
        },
        methods: {
            /**
             * 打开时间选择盒子
             */
            pickerBoxShow() {
                console.log('----this.time', this.time);
                this.pickerBoxStatus=true;
                let hour='', minute='', second='';
                if (this.time) {
                    const [hh, mm, ss]=this.time.split(':');
                    hour=hh;
                    minute=mm;
                    second=ss;
                } else {
                    const [YY, MM, DD, hh, mm, ss]=CountNowDate();
                    hour=hh;
                    minute=mm;
                    second=ss;
                }
                this.hour=hour;
                this.minute=minute;
                this.second=second;
                this.$nextTick(() => {
                    this.$refs.hours.scrollTop=hour*28;
                    this.$refs.minutes.scrollTop=minute*28;
                    this.$refs.seconds.scrollTop=second*28;
                });
            },
            /**
             * 关闭时间选择盒子
             */
            pickerBoxHide() {
                this.pickerBoxStatus=false;
            },
            /**
             * 显示清除按钮
             */
            pickerClearShow() {
                if (this.selectedTime) this.clearStatus=true;
            },
            /**
             * 隐藏清除按钮
             */
            pickerClearHide() {
                this.clearStatus=false;
            },
            /**
             * 清除时间
             */
            clearTime() {
                this.selectedTime='';
                this.hour='';
                this.minute='';
                this.second='';
                this.$emit('change', '');
                this.pickerClearHide();
            },
            /**
             * 点击小时
             * @param hour
             */
            hourClick(hour) {
                this.hour=hour;
                this.scrollTopTimer(hour*28, 'hours');
            },
            /**
             * 点击分钟
             * @param minute
             */
            minuteClick(minute) {
                this.minute=minute;
                this.scrollTopTimer(minute*28, 'minutes');
            },
            /**
             * 点击秒
             * @param second
             */
            secondClick(second) {
                this.second=second;
                this.scrollTopTimer(second*28, 'seconds');
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
                    let speed = Math.ceil(remain / 3);
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
            /**
             * 确定
             */
            pickerConfirm() {
                const time=this.format==='hms'?this.hour+':'+this.minute+':'+this.second:this.hour+':'+this.minute;
                this.selectedTime=time;
                /**
                 * 返回选择的时分秒
                 * @type Function
                 */
                this.$emit('change', time);
                this.pickerBoxHide();
            }
        }
    }
</script>

<style lang="stylus" scoped>

@import "~stylus/tools.styl"
@import "~stylus/animate/slideDownUp.styl"
@import "~stylus/animate/opacityScale.styl"

@import "~stylus/datePicker/pickerInput.styl"

.p-picker-time
    position relative
    .p-picker-time-select-box-hms
        width 300px
    .p-picker-time-select-box-hm
        width 200px
    .p-picker-time-select-box
        position absolute
        left 0
        top 0
        background-color #fff
        box-shadow 0 2px 10px 0 rgba(31,35,41,.1)
        border-radius 4px
        height 292px
        z-index 100
        .p-picker-time-title
            display flex
            align-items center
            margin-bottom 4px
            > section
                width 100px
                height 24px
                line-height @height
                color $grey-grey-500
                font-size 14px
                text-align center
        .p-picker-time-content
            display flex
            justify-content space-around
            padding-top 8px
            padding-bottom @padding-top
            border-top 1px solid $grey-grey-200
            border-bottom 1px solid $grey-grey-200
            width 100%
            height 184px
            overflow hidden
            .p-picker-time-select
                width 100px
                max-height 194px
                overflow hidden
                &:hover
                    overflow-y auto
                ul
                    position relative
                    padding-bottom 136px
                    width 100%
                .p-picker-time-text
                    margin-bottom 4px
                    padding-left 36px
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
        .p-picker-time-handle
            padding-left 16px
            padding-right 16px
            text-align right
            width 100%
            height 42px
            line-height 42px

</style>