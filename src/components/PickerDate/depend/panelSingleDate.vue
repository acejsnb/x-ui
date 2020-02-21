<template>
    <div class="p-picker-child">
        <div
                :class="[
                    'p-picker-input', 'p-picker-input-trigger', 'p-picker-input-single',
                    quickSwitch?'p-picker-input-triangle':'p-picker-input-normal'
                ]"
                @mouseenter="pickerClearShow"
                @mouseleave="pickerClearHide"
        >
            <i
                    v-if="quickSwitch"
                    :class="['p-picker-triangle', 'p-picker-triangle-left', !selectedDate&&'p-picker-triangle-disabled']"
                    @click="quickLeft"
            ><TrianglePickerLeft /></i>
            <section
                    :class="['p-picker-input-tip-single', selectedDate?'p-picker-input-values':'p-picker-input-tip', 'p-picker-ellipsis']"
                    @click="pickerBoxShow"
                    @mouseover="pickerEllipsis"
            >{{selectedDate?selectedDate:'选择日期'}}</section>
            <section v-if="!quickSwitch" :class="['p-picker-svg-box', (selectedDate&&format==='hms')&&'p-picker-left-box-shadow']">
                <ClearSvg class="p-picker-clear-svg" v-if="clearStatus" @click.stop="clearTime" />
                <CalendarSvg v-else />
            </section>
            <i v-if="quickSwitch"
               :class="[
                   'p-picker-triangle', 'p-picker-triangle-right',
                    (selectedDate&&format==='hms')&&'p-picker-left-box-shadow',
                    !selectedDate&&'p-picker-triangle-disabled'
               ]"
               @click="quickRight"
            ><TrianglePickerRight /></i>
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
                        <section class="p-picker-input-alert p-picker-input-alert-picker">
                            <article
                                    :class="[(yearSelected&&monthSelected&&daySelected)?'p-picker-input-values':'p-picker-input-tip']"
                            >{{(yearSelected&&monthSelected&&daySelected)?`${yearSelected}.${monthSelected}.${daySelected}${format?(' '+time):''}`:'请选择日期'}}</article>
                        </section>
                        <TabDate v-model="tabKey" />
                    </div>
                    <div class="p-picker-main-item">
                        <div :class="['p-picker-child-select-box', 'p-picker-child-select-box-'+borderLeft]">
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
                                    <article class="p-picker-active-title" @click="yearActiveClick">{{yearActive}}年</article>
                                    <article class="p-picker-active-title" @click="monthActiveClick">{{monthActive}}月</article>
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
                            <div class="p-picker-child-title" v-if="tabKey==='day' || tabKey==='week'">
                                <section
                                        class="p-picker-child-title-item"
                                        v-for="wt in weekText"
                                        :key="'wt-'+wt"
                                >{{wt}}</section>
                            </div>

                            <template>
                                <Day
                                        v-if="tabKey==='day'"
                                        :yearNow="yearNow"
                                        :monthNow="monthNow"
                                        :dayNow="dayNow"
                                        :daysArray="daysArray"
                                        @change="dayChange"
                                />
                                <Week
                                        v-else-if="tabKey==='week'"
                                        :weeksArray="weeksArray"
                                        @change="weekChange"
                                />
                                <Month
                                        v-else-if="tabKey==='month'"
                                        :monthsArray="monthsArray"
                                        @change="monthChange"
                                />
                                <Year
                                        v-else-if="tabKey==='year'"
                                        :yearsArray="yearsArray"
                                        @change="yearChange"
                                />
                                <Time
                                        v-else
                                        ref="timeSelect"
                                        :time="time"
                                        :format="format"
                                        @change="timeChange"
                                />
                            </template>
                        </div>
                    </div>
                </div>

                <div class="p-picker-main-handle">
                    <span
                            v-if="format&&tabKey==='day'"
                            :class="['p-picker-handle-time', daySelected?'p-picker-handle-time-normal':'p-picker-handle-time-disabled']"
                            @click="panelTimeOpen"
                    >选择时间</span>
                    <template>
                        <Button v-if="tabKey==='day'" type="primary" size="small" @click="panelTimeClose">确定</Button>
                        <Button v-else :type="btnType" size="small" @click="pickerConfirm">确定</Button>
                    </template>
                </div>
            </div>
        </transition>
    </div>
</template>

<script>
    import CountDay from '../../static/utils/datePicker/CountDay';
    import CountWeek from '../../static/utils/datePicker/CountWeek';
    import CountMonth from '../../static/utils/datePicker/CountMonth';
    import CountYear from '../../static/utils/datePicker/CountYear';
    import CountBeforeOrAfterDay from '../../static/utils/datePicker/CountBeforeOrAfterDay';

    import CountNextYear from '../../static/utils/datePicker/CountNextYear';
    import CountPrevYear from '../../static/utils/datePicker/CountPrevYear';
    import CountNextMonth from '../../static/utils/datePicker/CountNextMonth';
    import CountPrevMonth from '../../static/utils/datePicker/CountPrevMonth';

    import Button from '../../Button';

    import Day from './day';
    import Week from './week';
    import Month from './month';
    import Year from './year';

    import Time from '../../PickerTime/depend/time';
    import TabDate from './tabDate';

    import ClearSvg from '../../static/iconSvg/clear2.svg';
    import CalendarSvg from '../../static/iconSvg/calendar.svg';
    import TrianglePickerLeft from '../../static/iconSvg/triangle_picker_left.svg';
    import TrianglePickerRight from '../../static/iconSvg/triangle_picker_right.svg';
    import ArrowRightSvg from '../../static/iconSvg/arrow_right2.svg';
    import ArrowRightDoubleSvg from '../../static/iconSvg/arrow_right_double.svg';
    export default {
        name: "panelSingleDate",
        components: {
            Button,

            Day,
            Week,
            Year,
            Month,
            Time,

            TabDate,
            ClearSvg,
            CalendarSvg,
            TrianglePickerLeft,
            TrianglePickerRight,
            ArrowRightSvg,
            ArrowRightDoubleSvg
        },
        props: {
            // 左边框
            borderLeft: {
                type: String,
                default: ''
            },
            /**
             * 传入的日期
             */
            date: {
                type: String,
                default: ''
            },
            // 是否显示时分秒 可选值[hms, hm]
            format: {
                type: String,
                default: ''
            },

            // weeks-按照年or周排序 【year、month】
            sort: {
                type: String,
                default: 'year'
            },
            // 快速切换时间
            quickSwitch: {
                type: Boolean,
                default: false
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
            }
        },
        data() {
            return {
                btnType: 'disabled', // 按钮状态
                pickerBoxStatus: false, // 显示选择时间框
                blurStatus: false, // 是否可执行blur
                clearStatus: false, // 关闭按钮
                selectedDate: '', // 选中的时间
                time: '', // 时分|时分秒

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

                thTextSelected: '', // 选择的第几周 String
                weeksSelected: [], // 选择的周列表

                daysArray: [], // 日列表
                weeksArray: [], // 周列表
                monthsArray: [], // 月列表
                yearsArray: [], // 年列表
                panelYear: false, // 显示年面板
                panelMonth: false, // 显示月面板
                panelTime: false, // 显示时分(秒)面板
                tabKey: 'day' // 日周月年切换显示
            }
        },
        computed: {
            weekText() {
                return ['一', '二', '三', '四', '五', '六', '日']
            }
        },
        watch: {
            // 监听日期改变
            date(n, o) {
                if (n === o) return;
                this.paramsChange(this.tabKey, n);
            },
            // 选择时间框状态改变
            pickerBoxStatus(n) {
                if (n) return;
            },
            // 日周月年切换显示
            tabKey(n, o) {
                if (n === o) return;
                console.log('日周月年切换显示:::', n);
                this.paramsChange(n, this.date);
            }
        },
        created() {
            // 初始化日期对象
            this.dayInit(this.date);
        },
        methods: {
            // 文字超出显示省略号
            pickerEllipsis(e) {
                const target=e.target;
                const {clientWidth, scrollWidth}=target;
                if (scrollWidth > clientWidth) target.title=target.innerText;
            },
            /**
             * 改变按钮状态
             */
            changeBtnType(str) {
                if (str && str.replace(/\./g, '')) this.btnType='primary';
                else this.btnType='disabled';
            },
            /**
             * 格式化传入的时间
             * @param date String '2020.02.14 08:09:10'
             */
            setSelectedDate(date) {
                this.selectedDate=date;
                this.changeBtnType(date);
                let sDate='', time='';
                if (date) {
                    if (this.format && date.includes(':')) {
                        const [d, t]=date.split(' ');
                        sDate=d;
                        time=t;
                    } else {
                        sDate=date;
                    }
                }
                this.time=time;
                return [sDate, time]
            },
            // 参数改变设置面板初始化
            paramsChange(params, date) {
                switch (params) {
                    case 'day':
                        this.dayInit(date);
                        break;
                    case 'week':
                        this.weekInit(date);
                        break;
                    case 'month':
                        this.monthInit(date);
                        break;
                    case 'year':
                        this.yearInit(date);
                        break;
                    default:
                        break;
                }
            },
            /**
             * 初始化日期对象
             */
            dayInit(date) {
                const [tDate, time]=this.setSelectedDate(date);
                this.countDay=new CountDay(tDate); // 当前计算天的对象
                this.daysArray=this.countDay.getDaysArray();
                const [year, month, day]=this.countDay.countNowDate(); // 获取当前时间、日期
                this.yearNow=year;
                this.monthNow=month;
                this.dayNow=day;
                this.setDay(tDate, time);
            },
            weekInit(date) {
                const countWeek=new CountWeek({date, sort: this.sort});
                this.weeksArray=countWeek.getWeeksArray();
                this.countWeek=countWeek;
                // const [year, month]=countWeek.countNowDate();
                // this.yearNow=year;
                // this.monthNow=month;

                this.setWeek(date);
            },
            monthInit(date) {
                const countMonth=new CountMonth(date);
                this.monthsArray=countMonth.getMonthsArray();
                // const [year, month]=countMonth.countNowMonth();
                // this.yearNow=year;
                // this.monthNow=month;

                this.setMonth(date);
            },
            yearInit(date) {
                this.countYear=new CountYear(date); // 当前计算年的对象
                // this.yearNow=this.countYear.countNowYear(); // 获取当前年
                this.yearsArray=this.countYear.getYearsArray();

                this.setYear(date);
            },
            /**
             * 设置选择的年月日
             * @param date String 2019.10.31
             * @param time String 09:10:31
             */
            setDay(date, time) {
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

                this.time=time;
                this.yearActive=yearActive;
                this.monthActive=monthActive;
                this.dayActive=dayActive;
                this.yearSelected=year;
                this.monthSelected=month;
                this.daySelected=day;
                this.changeDaysArray({year, month, day});
            },
            setWeek(date) {
                this.selectedDate=date;
                this.changeBtnType(date);
                if (date) {
                    const [sd, ed]=date.split('-');
                    if (ed - sd < 6) {
                        // 一周时间必须等于七天
                        console.error('Date error, there must be seven days in a week.');
                        return;
                    }
                    const [year, month]=sd.split('.');
                    const wa=this.weeksArray;

                    this.yearSelected=year;
                    this.monthSelected=month;
                    this.yearActive=year;
                    this.monthActive=month;

                    const {weeks, thText}=wa.find(d => {
                        const dw=d.weeks;
                        const dStr=dw[0].year+'.'+dw[0].month+'.'+dw[0].day+'-'+dw[6].year+'.'+dw[6].month+'.'+dw[6].day;
                        return (dStr === date);
                    });
                    this.weeksSelected=weeks;
                    this.thTextSelected=thText;
                    this.changeWeeksArray(thText);
                } else {
                    this.yearActive=this.yearNow;
                    this.monthActive=this.monthNow;
                }
            },
            setMonth(date) {
                this.selectedDate=date;
                if (date) {
                    const [year, m]=date.split('.');
                    const month=m?m:'';
                    this.yearSelected=year;
                    this.monthSelected=month;
                    this.yearActive=year;
                    this.monthActive=month;
                    this.changeMonthsArray({year, month});
                } else {
                    this.yearActive=this.yearNow;
                    this.monthActive=this.monthNow;
                    this.changeMonthsArray({year: '', month: ''});
                }
            },
            setYear(date) {
                this.changeYearsArray(date);
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
            changeWeeksArray(thText) {
                this.weeksArray=this.weeksArray.map(d => {
                    if (d.thText===thText) d.selected='selected';
                    else d.selected='';
                    return d;
                })
            },
            changeMonthsArray({year, month}) {
                this.yearSelected=year;
                this.monthSelected=month;
                this.monthsArray=this.monthsArray.map(d => {
                    if (d.year===year && d.month===month) d.selected='selected';
                    else d.selected='';
                    return d;
                })
            },
            changeYearsArray(year) {
                this.yearSelected=year;
                this.yearsArray=this.yearsArray.map(d => {
                    if (d.year===year) d.selected='selected';
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
                this.time='';
                this.yearSelected='';
                this.monthSelected='';
                this.daySelected='';
                this.$emit('change', '');
                this.pickerClearHide();
            },

            // 时间选择主体失去焦点
            pickerMainBlur() {
                this.$nextTick(() => {
                    this.blurStatus=false;
                    this.$refs.pickerMain.blur()
                })
            },
            // 时间选择主体获取焦点
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
            // 点击active的年，去选择active的年
            yearActiveClick() {
                this.$emit('panelYearHandle', true, true);
            },
            // 点击active的月，去选择active的月
            monthActiveClick() {
                this.$emit('panelMonthHandle', true, true);
            },
            /**
             * 点击日期-日改变
             * @param obj {year, month, day}
             */
            dayChange({year, month, day}) {
                this.yearSelected=year;
                this.monthSelected=month;
                this.daySelected=day;
                this.btnType='primary';
                this.changeDaysArray({year, month, day});
            },
            /**
             * 点击日期-周改变
             * @param {year, month, thText}
             */
            weekChange({weeks, year, month, thText}) {
                this.weeksSelected=weeks;
                this.yearSelected=year;
                this.monthSelected=month;
                this.thTextSelected=thText;
                this.btnType='primary';
                this.changeWeeksArray(thText);
            },
            /**
             * 点击日期-月改变
             * @param {year, month}
             */
            monthChange({year, month}) {
                this.yearSelected=year;
                this.monthSelected=month;
                this.btnType='primary';
                this.changeMonthsArray({year, month});
            },
            /**
             * 点击日期-年改变
             * @param {year}
             */
            yearChange({year}) {
                this.yearSelected=year;
                this.btnType='primary';
                this.changeYearsArray(year);
            },
            /**
             * 点击日期-时间改变
             * @param time
             */
            timeChange(time) {
                this.time=time;
            },

            // 时间面板显示切换
            panelTimeOpen() {
                this.tabKey='time';
                setTimeout(() => {
                    this.$refs.timeSelect.setTimeDom();
                })
            },
            // 关闭时分(秒)面板
            panelTimeClose() {
                this.tabKey='day';
            },
            // 快速选择-设置时间 flat可选值【add，min】
            setQuickDate(flag) {
                const [Y, M, D]=CountBeforeOrAfterDay(this.yearSelected, this.monthSelected, this.daySelected, flag==='min'?-1:1);

                const selectedDate=Y+'.'+M+'.'+D+`${this.format?' '+this.time:''}`;
                this.yearSelected=Y;
                this.monthSelected=M;
                this.daySelected=D;
                this.selectedDate=selectedDate;
                this.init();
                this.$emit('change', selectedDate);
            },
            // 向左快速选择
            quickLeft() {
                if (!this.selectedDate) return;
                this.setQuickDate('min');
            },
            // 向右快速选择
            quickRight() {
                if (!this.selectedDate) return;
                this.setQuickDate('add');
            },

            /**
             * 确定
             */
            pickerConfirm() {
                const selectedDate=this.yearSelected+'.'+this.monthSelected+'.'+this.daySelected+`${this.format?' '+this.time:''}`;
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
