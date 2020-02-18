<template>
    <div class="p-picker-child">
        <div
                class="p-picker-input p-picker-input-double p-picker-input-normal"
                @click="pickerBoxShow"
                @mouseenter="pickerClearShow"
                @mouseleave="pickerClearHide"
        >
            <section
                    :class="['p-picker-input-double-tip', selectedTime?'p-picker-input-values':'p-picker-input-tip']"
            >
                <article class="p-picker-input-tip-values">{{timeStart?timeStart:'开始时间'}}</article>
                <article class="p-picker-input-tip-to">至</article>
                <article class="p-picker-input-tip-values">{{timeEnd?timeEnd:'结束时间'}}</article>
            </section>
            <section class="p-picker-svg-box">
                <ClearSvg class="p-picker-clear-svg" v-if="clearStatus" @click.stop="clearTime" />
                <CalendarSvg v-else />
            </section>
        </div>
        <transition name="opacityTop">
            <!--
            -->
            <div
                    class="p-picker-main"
                    ref="pickerMain"
                    tabindex="-1"
                    v-if="pickerBoxStatus"
                    @mouseenter="pickerMainBlur"
                    @mouseleave="pickerMainFocus"
                    @blur="pickerBoxHide"
            >
                <div class="p-picker-main-item-box">
                    <div class="p-picker-main-item-input-box">
                        <section class="p-picker-input-alert">
                            <article
                                    :class="['p-picker-input-alert-tip', (hourStart&&minuteStart)?'p-picker-input-values':'p-picker-input-tip']"
                            >{{(hourStart&&minuteStart)?`${hourStart}:${minuteStart}${format==='hms'?(':'+secondStart):''}`:'开始时间'}}</article>
                            <article class="p-picker-input-tip-to">至</article>
                            <article
                                    :class="['p-picker-input-alert-tip', (hourEnd&&minuteEnd)?'p-picker-input-values':'p-picker-input-tip']"
                            >{{(hourEnd&&minuteEnd)?`${hourEnd}:${minuteEnd}${format==='hms'?(':'+secondEnd):''}`:'结束时间'}}</article>
                        </section>
                    </div>
                    <div class="p-picker-main-item">
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
                                borderLeft="border-left"
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

                <div class="p-picker-main-handle">
                    <Button type="primary" size="small" @click="pickerConfirm">确定</Button>
                </div>
            </div>
        </transition>
    </div>
</template>

<script>
    import CountNowDate from '../../static/utils/datePicker/CountNowDate';

    import TimeSelect from './time';

    import ClearSvg from '../../static/iconSvg/clear2.svg';
    import CalendarSvg from '../../static/iconSvg/calendar.svg';

    export default {
        name: "panelDoubleTime",
        components: {
            TimeSelect,
            ClearSvg,
            CalendarSvg
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
                blurStatus: false, // 是否可执行blur
                clearStatus: false, // 关闭按钮
                selectedTime: '', // 选中的时间
                timeStart: '',
                timeEnd: '',
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
            pickerMainBlur() {
                this.$nextTick(() => {
                    this.blurStatus=false;
                    if (this.$refs.pickerMain) this.$refs.pickerMain.blur()
                })
            },
            pickerMainFocus() {
                this.$nextTick(() => {
                    this.blurStatus=true;
                    if (this.$refs.pickerMain) this.$refs.pickerMain.focus()
                })
            },
            /**
             * 打开时间选择盒子
             */
            pickerBoxShow() {
                this.pickerBoxStatus=true;
                this.setTime();
            },
            /**
             * 关闭时间选择盒子
             */
            pickerBoxHide() {
                if (this.pickerBoxStatus && this.blurStatus) this.pickerBoxStatus=false;
            },
            /**
             * 设置时间
             */
            setTime() {
                const time=this.time;
                let hourS='00', minuteS='00', secondS='00',
                    hourE='', minuteE='', secondE='';
                if (time && time.includes('-')) {
                    const [TS, TE]=time.split('-');
                    // this.timeStart=TS;
                    // this.timeEnd=TE;
                    const [hhS, mmS, ssS]=TS.split(':');
                    const [hhE, mmE, ssE]=TE.split(':');
                    hourS=hhS;
                    minuteS=mmS;
                    secondS=ssS;
                    hourE=hhE;
                    minuteE=mmE;
                    secondE=ssE;
                } else {
                    const [YY, MM, DD, hh, mm, ss]=CountNowDate();
                    hourE=hh;
                    minuteE=mm;
                    secondE=ss;
                    // this.timeStart=`00:00${this.format==='hms'?':'+'00':''}`;
                    // this.timeEnd=`${hh}:${mm}${this.format==='hms'?':'+ss:''}`;
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
                this.timeStart='';
                this.timeEnd='';
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
                const selectedTime=timeS+'-'+timeE;
                this.timeStart=timeS;
                this.timeEnd=timeE;
                this.selectedTime=selectedTime;
                /**
                 * 返回选择的时分秒
                 * @type Function
                 */
                this.$emit('change', selectedTime);
                this.blurStatus=false;
                this.pickerBoxStatus=false;
            }
        }
    }
</script>
