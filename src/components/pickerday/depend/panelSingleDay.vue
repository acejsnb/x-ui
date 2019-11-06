<template>
    <div class="p-picker-child">
        <div
                class="p-picker-input"
                @click="pickerBoxShow"
                @mouseenter="pickerClearShow"
                @mouseleave="pickerClearHide"
        >
            <section
                    :class="['p-picker-input-tip', selectedDate&&'p-picker-input-values']"
            >{{selectedDate?selectedDate:'请选择日期'}}</section>
            <transition name="opacityScale">
                <ClearSvg v-show="clearStatus" class="clearSvg" @click.stop="clearTime" />
            </transition>
        </div>
        <transition name="opacityTop">
            <!--
            -->
            <div
                    class="p-picker-main"
                    ref="pickerMain"
                    tabindex="-1"
                    v-show="pickerBoxStatus"
                    @mouseenter="pickerMainBlur"
                    @mouseleave="pickerMainFocus"
                    @blur="pickerBoxHide"
            >
                <div class="p-picker-main-item-box">
                    <div class="p-picker-main-item-input-box">
                        <section class="p-picker-input p-picker-input-values-default">
                            <article
                                    :class="[(yearSelected&&monthSelected&&daySelected)&&'p-picker-input-values']"
                            >{{(yearSelected&&monthSelected&&daySelected)?`${yearSelected}.${monthSelected}.${daySelected}`:'请选择日期'}}</article>
                        </section>
                    </div>
                    <div class="p-picker-main-item">
                        <DaySelect
                                :yearNow="yearNow"
                                :monthNow="monthNow"
                                :dayNow="dayNow"
                                :yearActive="yearActive"
                                :monthActive="monthActive"
                                :dayActive="dayActive"
                                :yearSelected="yearSelected"
                                :monthSelected="monthSelected"
                                :daySelected="daySelected"
                                :daysArray="daysArray"
                                @prevYear="prevYear"
                                @nextYear="nextYear"
                                @prevMonth="prevMonth"
                                @nextMonth="nextMonth"
                                @change="changeDate"
                        />
                    </div>
                </div>

                <div class="p-picker-main-handle">
                    <Button :type="btnType" size="small" @click="pickerConfirm">确定</Button>
                </div>
            </div>
        </transition>
    </div>
</template>

<script>
    import CountDay from 'datePicker/CountDay';

    import CountNextYear from 'datePicker/CountNextYear';
    import CountPrevYear from 'datePicker/CountPrevYear';
    import CountNextMonth from 'datePicker/CountNextMonth';
    import CountPrevMonth from 'datePicker/CountPrevMonth';

    import DaySelect from './day';
    import Button from 'button/Button';

    import ClearSvg from 'icon/clear2.svg';
    export default {
        name: "panelSingleDay",
        components: {
            DaySelect,
            Button,
            ClearSvg
        },
        props: {
            /**
             * 传入的日期
             */
            date: {
                type: String,
                default: ''
            }
        },
        data() {
            return {
                btnType: 'disabled', // 按钮状态
                pickerBoxStatus: false, // 显示选择时间框
                blurStatus: false, // 是否可执行blur
                clearStatus: false, // 关闭按钮
                selectedDate: '', // 选中的时间

                yearNow: '', // 当前年
                monthNow: '', // 当前月
                dayNow: '', // 当前日

                // 活动的年月日
                yearActive: '',
                monthActive: '',
                dayActive: '',

                yearSelected: '', // 选择的年
                monthSelected: '', // 选择的月
                daySelected: '', // 选择的日

                daysArray: [] // 日列表
            }
        },
        created() {
            // 初始化日期对象
            this.init();
        },
        methods: {
            /**
             * 改变按钮状态
             */
            changeBtnType(str) {
                if (str && str.replace(/\./g, '')) this.btnType='primary';
                else this.btnType='disabled';
            },
            /**
             * 初始化日期对象
             */
            init() {
                this.countDay=new CountDay(this.date); // 当前计算天的对象
                this.daysArray=this.countDay.getDaysArray();
                const [year, month, day]=this.countDay.countNowDate(); // 获取当前时间、日期
                this.yearNow=year;
                this.monthNow=month;
                this.dayNow=day;
                this.setDate(this.date);
            },
            /**
             * 设置选择的年月日
             * @param date String 2019.10.31
             */
            setDate(date) {
                this.selectedDate=date;
                this.changeBtnType(date);
                let year='', month='', day='',
                    yearActive='', monthActive='', dayActive='';
                if (date) {
                    const [YY, MM, DD]=date.split('.'); // 获取传入的时间、日期
                    year=YY;
                    month=MM;
                    day=DD;
                    yearActive=YY;
                    monthActive=MM;
                    dayActive=DD;
                } else {
                    yearActive=this.yearNow;
                    monthActive=this.monthNow;
                    dayActive=this.dayNow;
                }

                this.yearActive=yearActive;
                this.monthActive=monthActive;
                this.dayActive=dayActive;
                this.yearSelected=year;
                this.monthSelected=month;
                this.daySelected=day;
                this.changeDaysArray({year, month, day});
            },
            /**
             * 改变选中状态
             * @param obj {year, month, day}
             */
            changeDaysArray({year, month, day}) {
                this.daysArray=this.daysArray.map(d => {
                    if (d.year===year&&d.month===month&&d.day===day) d.selected='selected';
                    else d.selected='';
                    return d;
                })
            },
            /**
             * 显示清除按钮
             */
            pickerClearShow() {
                if (this.selectedDate) this.clearStatus=true;
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
                this.selectedDate='';
                // this.yearNow='';
                // this.monthNow='';
                // this.dayNow='';
                this.yearSelected='';
                this.monthSelected='';
                this.daySelected='';
                this.$emit('change', '');
                this.pickerClearHide();
            },

            pickerMainBlur() {
                this.$nextTick(() => {
                    this.blurStatus=false;
                    this.$refs.pickerMain.blur()
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
            },
            /**
             * 关闭时间选择盒子
             */
            pickerBoxHide() {
                if (this.pickerBoxStatus && this.blurStatus) this.pickerBoxStatus=false;
            },
            /**
             * 切换日期
             * @param date String '2019.10.31'
             */
            switchDate(date) {
                this.countDay=new CountDay(date); // 当前计算天的对象
                this.daysArray=this.countDay.getDaysArray();
                const [yearActive, monthActive, dayActive]=date.split('.'); // 获取传入的时间、日期
                this.yearActive=yearActive;
                this.monthActive=monthActive;
                this.dayActive=dayActive;
            },
            /**
             * 上一年
             */
            prevYear() {
                const date=CountPrevYear([this.yearActive, this.monthActive, this.dayActive]);
                this.switchDate(date);
            },
            /**
             * 下一年
             */
            nextYear() {
                const date=CountNextYear([this.yearActive, this.monthActive, this.dayActive]);
                this.switchDate(date);
            },
            /**
             * 上一月
             */
            prevMonth() {
                const date=CountPrevMonth([this.yearActive, this.monthActive, this.dayActive]);
                this.switchDate(date);
            },
            /**
             * 下一月
             */
            nextMonth() {
                const date=CountNextMonth([this.yearActive, this.monthActive, this.dayActive]);
                this.switchDate(date);
            },
            /**
             * 点击日期
             * @param obj {year, month, day}
             */
            changeDate({year, month, day}) {
                this.yearSelected=year;
                this.monthSelected=month;
                this.daySelected=day;
                this.btnType='primary';
                this.changeDaysArray({year, month, day});
            },
            /**
             * 确定
             */
            pickerConfirm() {
                const selectedDate=this.yearSelected+'.'+this.monthSelected+'.'+this.daySelected;
                this.selectedDate=selectedDate;
                this.blurStatus=false;
                this.pickerBoxStatus=false;
                /**
                 * 返回选择的时分秒
                 * @type Function
                 */
                this.$emit('change', selectedDate);
            }
        }
    }
</script>

<style lang="stylus">

</style>