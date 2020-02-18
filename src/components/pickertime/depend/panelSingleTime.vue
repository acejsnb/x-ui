<template>
    <div class="p-picker-child">
        <div
                class="p-picker-input p-picker-input-trigger p-picker-input-single p-picker-input-normal"
                @mouseenter="pickerClearShow"
                @mouseleave="pickerClearHide"
        >
            <section
                    :class="['p-picker-input-tip-single', selectedTime?'p-picker-input-values':'p-picker-input-tip']"
                    @click="pickerBoxShow"
            >{{selectedTime?selectedTime:'选择时间'}}</section>
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
                                    :class="[(hour&&minute)?'p-picker-input-values':'p-picker-input-tip']"
                            >{{(hour&&minute)?`${hour}:${minute}${format==='hms'?(':'+second):''}`:'选择时间'}}</article>
                        </section>
                    </div>
                    <div class="p-picker-main-item">
                        <TimeSelect
                                :range="range"
                                :hour="hour"
                                :minute="minute"
                                :second="second"
                                :format="format"
                                @hourChange="hourChange"
                                @minuteChange="minuteChange"
                                @secondChange="secondChange"
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
        name: "panelSingleTime",
        components: { TimeSelect, ClearSvg, CalendarSvg },
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
                hour: '', // 选择的小时
                minute: '', // 选择的分钟
                second: '', // 选择的秒
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
                let hour='00', minute='00', second='00';
                if (time) {
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
                this.selectedTime=time;
                this.hour=hour;
                this.minute=minute;
                this.second=second;
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
            hourChange(hour) {
                this.hour=hour;
            },
            /**
             * 点击分钟
             * @param minute
             */
            minuteChange(minute) {
                this.minute=minute;
            },
            /**
             * 点击秒
             * @param second
             */
            secondChange(second) {
                this.second=second;
            },
            /**
             * 确定
             */
            pickerConfirm() {
                const timeS=this.format==='hms'?this.hour+':'+this.minute+':'+this.second:this.hour+':'+this.minute;
                const selectedTime=timeS;
                this.selectedTime=timeS;
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
