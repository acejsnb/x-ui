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
        <transition name="opacityTop">
            <!--
            v-focus="pickerBoxStatus"
                    v-if="pickerBoxStatus"
                    @blur="pickerBoxHide"
            -->
            <div
                    class="p-picker-main"
                    tabindex="-1"
                    v-focus="pickerBoxStatus"
                    v-if="pickerBoxStatus"
                    @blur="pickerBoxHide"
            >
                <div class="p-picker-time-item-box">
                    <div class="p-picker-time-item-input-box">
                        <section class="p-picker-input p-picker-input-values">
                            <article>{{format==='hms'?`${hourStart}:${minuteStart}:${secondStart}`:`${hourStart}:${minuteStart}`}}</article>
                            <article class="p-picker-input-solstice" v-if="range">至</article>
                            <article v-if="range">{{format==='hms'?`${hourEnd}:${minuteEnd}:${secondEnd}`:`${hourEnd}:${minuteEnd}`}}</article>
                        </section>
                    </div>
                    <div class="p-picker-time-item">
                        <TimeSelect
                                :hour="hourStart"
                                :minute="minuteStart"
                                :second="secondStart"
                                :format="format"
                                @hourChange="hourChangeStart"
                                @minuteChange="minuteChangeStart"
                                @secondChange="secondChangeStart"
                        />
                        <TimeSelect
                                v-if="range"
                                :hour="hourEnd"
                                :minute="minuteEnd"
                                :second="secondEnd"
                                :format="format"
                                @hourChange="hourChangeEnd"
                                @minuteChange="minuteChangeEnd"
                                @secondChange="secondChangeEnd"
                        />
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
    import CountNowDate from 'datePicker/CountNowDate';

    import TimeSelect from './depend/time';
    import Button from 'button/Button';

    import ClearSvg from 'icon/clear2.svg';

    export default {
        name: "Pickertime",
        components: {
            TimeSelect,
            Button,
            ClearSvg
        },
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
                hourStart: '', // 选择的小时-开始时间
                minuteStart: '', // 选择的分钟-开始时间
                secondStart: '', // 选择的秒-开始时间
                hourEnd: '', // 选择的小时-结束时间
                minuteEnd: '', // 选择的分钟-结束时间
                secondEnd: '' // 选择的秒-结束时间
            }
        },
        created() {
            this.setTime();
        },
        methods: {
            /**
             * 打开时间选择盒子
             */
            pickerBoxShow() {
                this.pickerBoxStatus=true;
                this.setTime();
            },
            /**
             * 设置时间
             */
            setTime() {
                const time=this.time;
                let hourS='00', minuteS='00', secondS='00',
                    hourE='', minuteE='', secondE='';
                if (time) {
                    if (time.includes('-')) {
                        const [TS, TE]=time.split('-');
                        const [hhS, mmS, ssS]=TS.split(':');
                        const [hhE, mmE, ssE]=TE.split(':');
                        hourS=hhS;
                        minuteS=mmS;
                        secondS=ssS;
                        hourE=hhE;
                        minuteE=mmE;
                        secondE=ssE;
                    } else {
                        const [hh, mm, ss]=this.time.split(':');
                        hourS=hh;
                        minuteS=mm;
                        secondS=ss;
                    }
                } else {
                    const [YY, MM, DD, hh, mm, ss]=CountNowDate();
                    if (this.range) {
                        hourE=hh;
                        minuteE=mm;
                        secondE=ss;
                    } else {
                        hourS=hh;
                        minuteS=mm;
                        secondS=ss;
                    }
                }
                this.selectedTime=time;
                this.hourStart=hourS;
                this.minuteStart=minuteS;
                this.secondStart=secondS;
                this.hourEnd=hourE;
                this.minuteEnd=minuteE;
                this.secondEnd=secondE;
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
                this.hourStart='';
                this.minuteStart='';
                this.secondStart='';
                this.hourEnd='';
                this.minuteEnd='';
                this.secondEnd='';
                this.$emit('change', '');
                this.pickerClearHide();
            },
            /**
             * 点击小时
             * @param hour
             */
            hourChangeStart(hour) {
                this.hourStart=hour;
            },
            /**
             * 点击分钟
             * @param minute
             */
            minuteChangeStart(minute) {
                this.minuteStart=minute;
            },
            /**
             * 点击秒
             * @param second
             */
            secondChangeStart(second) {
                this.secondStart=second;
            },
            /**
             * 点击小时
             * @param hour
             */
            hourChangeEnd(hour) {
                this.hourEnd=hour;
            },
            /**
             * 点击分钟
             * @param minute
             */
            minuteChangeEnd(minute) {
                this.minuteEnd=minute;
            },
            /**
             * 点击秒
             * @param second
             */
            secondChangeEnd(second) {
                this.secondEnd=second;
            },
            /**
             * 确定
             */
            pickerConfirm() {
                const timeS=this.format==='hms'?this.hourStart+':'+this.minuteStart+':'+this.secondStart:this.hourStart+':'+this.minuteStart;
                const timeE=this.format==='hms'?this.hourEnd+':'+this.minuteEnd+':'+this.secondEnd:this.hourEnd+':'+this.minuteEnd;
                const selectedTime=this.range?timeS+'-'+timeE:timeS;
                this.selectedTime=selectedTime;
                /**
                 * 返回选择的时分秒
                 * @type Function
                 */
                this.$emit('change', selectedTime);
                this.pickerBoxHide();
            }
        }
    }
</script>

<style lang="stylus" scoped>

@import "~stylus/tools.styl"
@import "~stylus/animate/opacityScale.styl"

@import "~stylus/datePicker/pickerInput.styl"

.p-picker-time
    position relative
    .p-picker-main
        outline none
        position absolute
        left 0
        top 0
        background-color #fff
        box-shadow 0 2px 10px 0 rgba(31,35,41,.1)
        border-radius 4px
        height 384px
        z-index 100
        .p-picker-time-item-box
            padding 0 16px
            .p-picker-time-item-input-box
                display flex
                align-items center
                justify-content flex-end
            .p-picker-time-item
                display flex
                align-items center
                justify-content center
                //border 1px solid $grey-grey-200
        .p-picker-time-handle
            padding 16px
            text-align right
            width 100%
            height 42px
            line-height 42px

@keyframes opacityTopIn
    from
        opacity 0
        top -32px
    to
        opacity 1
        top 0
@keyframes opacityTopOut
    from
        opacity 1
        top 0
    to
        opacity 0
        top -32px

.opacityTop-enter-active
    animation opacityTopIn .3s
.opacityTop-leave-active
    animation opacityTopOut .3s

</style>