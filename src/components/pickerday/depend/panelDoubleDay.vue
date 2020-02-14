<template>
    <div class="p-picker-child">
        <div
                :class="['p-picker-input', format?'p-picker-input-double-time':'p-picker-input-double']"
                @click="pickerBoxShow"
                @mouseover="pickerClearShow"
                @mouseout="pickerClearHide"
        >
            <section
                    :class="['p-picker-input-tip-double', selectedDate?'p-picker-input-values':'p-picker-input-tip']"
            >
                <article class="p-picker-input-tip-double-values">{{dateStart?(`${dateStart}${format?(' '+timeStart):''}`):'开始日期'}}</article>
                <article class="p-picker-input-tip-to">至</article>
                <article class="p-picker-input-tip-double-values">{{dateEnd?(`${dateEnd}${format?(' '+timeEnd):''}`):'结束日期'}}</article>
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
                    v-show="pickerBoxStatus"
                    @mouseenter="pickerMainBlur"
                    @mouseleave="pickerMainFocus"
                    @blur="pickerBoxHide"
            >
                <div class="p-picker-main-item-box">
                    <div :class="['p-picker-main-input', format?'p-picker-main-double-time':'p-picker-main-double']">
                        <section class="p-picker-main-tip-double">
                            <article
                                    :class="['p-picker-main-values', (yearSelectedStart&&monthSelectedStart&&daySelectedStart)&&'p-picker-main-values-selected']"
                            >{{(yearSelectedStart&&monthSelectedStart&&daySelectedStart)?`${yearSelectedStart}.${monthSelectedStart}.${daySelectedStart}${format?(' '+timeStart):''}`:'开始日期'}}</article>
                            <article class="p-picker-input-tip-to">至</article>
                            <article
                                    :class="['p-picker-main-values', (yearSelectedEnd&&monthSelectedEnd&&daySelectedEnd)&&'p-picker-main-values-selected']"
                            >{{(yearSelectedEnd&&monthSelectedEnd&&daySelectedEnd)?`${yearSelectedEnd}.${monthSelectedEnd}.${daySelectedEnd}${format?(' '+timeEnd):''}`:'结束日期'}}</article>
                        </section>
                    </div>
                    <div class="p-picker-main-item">
                        <SingleYear
                                ref="singleYearStart"
                                v-show="panelYearStart"
                                date=""
                                @change="panelYearChangeDateStart"
                                @panelYearDisableArrow="panelYearDisableArrowStart"
                        />
                        <SingleMonth
                                ref="singleMonthStart"
                                v-show="panelMonthStart"
                                date=""
                                @change="panelMonthChangeDateStart"
                                @panelYearHandle="panelYearHandleStart"
                        />
                        <DaySelect
                                v-show="!panelYearStart&&!panelMonthStart"
                                :yearNow="yearNow"
                                :monthNow="monthNow"
                                :dayNow="dayNow"
                                :yearActive="yearActiveStart"
                                :monthActive="monthActiveStart"
                                :dayActive="dayActiveStart"
                                :yearSelected="yearSelectedStart"
                                :monthSelected="monthSelectedStart"
                                :daySelected="daySelectedStart"
                                :daysArray="daysArrayStart"
                                @prevYear="prevYearStart"
                                @nextYear="nextYearStart"
                                @prevMonth="prevMonthStart"
                                @nextMonth="nextMonthStart"
                                @change="changeDateStart"
                                :disableYearRight="disableYearRight"
                                :disableMonthRight="disableMonthRight"
                                @dayEnter="dayEnterStart"
                                :multiple="true"
                                @panelYearHandle="panelYearHandleStart"
                                @panelMonthHandle="panelMonthHandleStart"
                        />
                        <SingleYear
                                ref="singleYearEnd"
                                borderLeft="border-left"
                                v-show="panelYearEnd"
                                date=""
                                @change="panelYearChangeDateEnd"
                                @panelYearDisableArrow="panelYearDisableArrowEnd"
                        />
                        <SingleMonth
                                ref="singleMonthEnd"
                                v-show="panelMonthEnd"
                                borderLeft="border-left"
                                date=""
                                @change="panelMonthChangeDateEnd"
                                @panelYearHandle="panelYearHandleEnd"
                        />
                        <DaySelect
                                v-show="!panelYearEnd&&!panelMonthEnd"
                                borderLeft="border-left"
                                :yearNow="yearNow"
                                :monthNow="monthNow"
                                :dayNow="dayNow"
                                :yearActive="yearActiveEnd"
                                :monthActive="monthActiveEnd"
                                :dayActive="dayActiveEnd"
                                :yearSelected="yearSelectedEnd"
                                :monthSelected="monthSelectedEnd"
                                :daySelected="daySelectedEnd"
                                :daysArray="daysArrayEnd"
                                @prevYear="prevYearEnd"
                                @nextYear="nextYearEnd"
                                @prevMonth="prevMonthEnd"
                                @nextMonth="nextMonthEnd"
                                @change="changeDateEnd"
                                :disableYearLeft="disableYearLeft"
                                :disableMonthLeft="disableMonthLeft"
                                @dayEnter="dayEnterEnd"
                                :multiple="true"
                                @panelYearHandle="panelYearHandleEnd"
                                @panelMonthHandle="panelMonthHandleEnd"
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
    import SingleYear from '../../PickerYear/depend/singleYear';
    import SingleMonth from '../../PickerMonth/depend/singleMonth';
    import CountDay from '../../static/utils/datePicker/CountDay';

    import CountNextYear from '../../static/utils/datePicker/CountNextYear';
    import CountPrevYear from '../../static/utils/datePicker/CountPrevYear';
    import CountNextMonth from '../../static/utils/datePicker/CountNextMonth';
    import CountPrevMonth from '../../static/utils/datePicker/CountPrevMonth';

    import DaySelect from './day';
    import Button from '../../Button';

    import ClearSvg from '../../static/iconSvg/clear2.svg';
    import CalendarSvg from '../../static/iconSvg/calendar.svg';
    export default {
        name: "panelDoubleDay",
        components: {
            SingleYear,
            SingleMonth,
            DaySelect,
            Button,
            ClearSvg,
            CalendarSvg
        },
        props: {
            /**
             * 传入的时间段
             */
            date: {
                type: String,
                default: ''
            },
            // 是否显示时分秒 可选值[hms, hm]
            format: {
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

                timeStart: '', // 时分|时分秒
                timeEnd: '', // 时分|时分秒

                dateStart: '',
                dateEnd: '',

                // 当前年月日
                yearNow: '',
                monthNow: '',
                dayNow: '',

                // 活动的年月日
                yearActiveStart: '',
                monthActiveStart: '',
                dayActiveStart: '',
                yearActiveEnd: '',
                monthActiveEnd: '',
                dayActiveEnd: '',

                // 选择的年月日
                yearSelectedStart: '',
                monthSelectedStart: '',
                daySelectedStart: '',
                yearSelectedEnd: '',
                monthSelectedEnd: '',
                daySelectedEnd: '',

                daysArrayStart: [], // 日列表-开始
                daysArrayEnd: [], // 日列表-结束

                disableYearRight: false, // 禁用开始时间右箭头-年
                disableMonthRight: false, // 禁用开始时间右箭头-月
                disableYearLeft: false,  // 禁用结束时间左箭头-年
                disableMonthLeft: false,  // 禁用结束时间左箭头-月

                panelYearStart: false, // 显示年面板
                panelMonthStart: false, // 显示月面板
                panelYearEnd: false, // 显示年面板
                panelMonthEnd: false // 显示月面板
            }
        },
        watch: {
            pickerBoxStatus(n) {
                if (n) return;
                this.panelYearHandleStart(false);
                this.panelMonthHandleStart(false);
                this.panelYearHandleEnd(false);
                this.panelMonthHandleEnd(false);
            }
        },
        created() {
            this.initEnd();
        },
        methods: {
            /**
             * 改变按钮状态
             */
            changeBtnType(str) {
                if (str && str.replace(/\./, '')) this.btnType='primary';
                else this.btnType='disabled';
            },
            /**
             * 格式化传入的时间
             * @param date String '2020.02.14 08:09:10'
             */
            setSelectedDate(date) {
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
                return [sDate, time]
            },
            /**
             * 日期
             * @param date String '2019.09.30 08:09:10-2019.10.31 08:09:10'
             */
            dateFormat(date) {
                this.selectedDate=date;
                this.changeBtnType(date);
                let dateStart='', dateEnd='';
                if (date && date.includes('-')) {
                    const [ds, de]=date.split('-');
                    dateStart=ds;
                    dateEnd=de;
                }
                this.dateStart=dateStart;
                this.dateEnd=dateEnd;
                return [dateStart, dateEnd]
            },
            // 禁用箭头
            disableArrow() {
                const activeStart=this.yearActiveStart+this.monthActiveStart;
                const activeEnd=this.yearActiveEnd+this.monthActiveEnd;

                const reg=/\./g;
                const nextYear=CountNextYear([this.yearActiveStart, this.monthActiveStart, this.dayActiveStart]).replace(reg, '').substr(0, 6);
                const nextMonth=CountNextMonth([this.yearActiveStart, this.monthActiveStart, this.dayActiveStart]).replace(reg, '').substr(0, 6);
                const prevYear=CountPrevYear([this.yearActiveEnd, this.monthActiveEnd, this.dayActiveEnd]).replace(reg, '').substr(0, 6);
                const prevMonth=CountPrevMonth([this.yearActiveEnd, this.monthActiveEnd, this.dayActiveEnd]).replace(reg, '').substr(0, 6);

                this.disableYearRight = nextYear >= activeEnd;
                this.disableMonthRight = nextMonth >= activeEnd;
                this.disableYearLeft = prevYear <= activeStart;
                this.disableMonthLeft = prevMonth <= activeStart;
            },

            /**
             * 初始化日期对象
             */
            initEnd() {
                const [dateStart, dateEnd]=this.dateFormat(this.date);
                const [dateS, timeS]=this.setSelectedDate(dateStart);
                const [dateE, timeE]=this.setSelectedDate(dateEnd);
                this.dateStart=dateS;
                this.timeStart=timeS;
                this.dateEnd=dateE;
                this.timeEnd=timeE;
                this.countDayEnd=new CountDay(dateE); // 当前计算天的对象
                this.daysArrayEnd=this.countDayEnd.getDaysArray();
                const [year, month, day]=this.countDayEnd.countNowDate(); // 获取当前时间、日期
                this.yearNow=year;
                this.monthNow=month;
                this.dayNow=day;
                this.setDateEnd(this.dateEnd);
                if (dateStart && dateEnd) {
                    const sd=dateS.replace(/\./, '').substr(0, 6);
                    const ed=dateE.replace(/\./, '').substr(0, 6);
                    if (ed - sd === 0) {
                        // 初始化开始时间对象
                        const [year, month, day]=this.dateEnd.split('.'); // 获取当前时间、日期
                        this.initStart(CountPrevMonth([year, month, day]));
                        const daysArray=this.daysArrayEnd;
                        const sInd=daysArray.findIndex(d => d.flag==='n'&&(d.year+'.'+d.month+'.'+d.day)===this.dateStart);
                        const eInd=daysArray.findIndex(d => d.flag==='n'&&(d.year+'.'+d.month+'.'+d.day)===this.dateEnd);

                        this.daysArrayEnd=daysArray.map((d, i) => {
                            if (d.flag==='n') {
                                if (i===sInd || i===eInd) {
                                    d.selected='selected'
                                } else if (i>sInd && i<eInd) {
                                    d.multiple='multiple'
                                }
                            }
                            return d;
                        })
                    } else {
                        // 初始化开始时间对象
                        this.initStart(dateS);
                        const daysArray=this.daysArrayEnd;
                        const eInd=daysArray.findIndex(d => d.flag==='n'&&(d.year+'.'+d.month+'.'+d.day)===this.dateEnd);
                        this.daysArrayEnd=daysArray.map((d, i) => {
                            if (d.flag==='n') {
                                if (i===eInd) {
                                    d.selected='selected'
                                } else if (i<eInd) {
                                    d.multiple='multiple'
                                }
                            }
                            return d;
                        })
                    }
                } else {
                    // 初始化开始时间对象
                    this.initStart(CountPrevMonth([year, month, day]));
                }
            },
            /**
             * 初始化日期对象
             */
            initStart(date) {
                this.countDayStart=new CountDay(date); // 当前计算天的对象
                this.daysArrayStart=this.countDayStart.getDaysArray();
                this.setDateStart(this.dateStart);

                const [yearActive, monthActive, dayActive]=date.split('.');
                this.yearActiveStart=yearActive;
                this.monthActiveStart=monthActive;
                this.dayActiveStart=dayActive;

                if (this.date) {
                    const sd=this.dateStart.replace(/\./, '').substr(0, 6);
                    const ed=this.dateEnd.replace(/\./, '').substr(0, 6);
                    if (ed - sd > 0) {
                        const daysArray=this.daysArrayStart;
                        const sInd=daysArray.findIndex(d => d.flag==='n'&&(d.year+'.'+d.month+'.'+d.day)===this.dateStart);
                        this.daysArrayStart=daysArray.map((d, i) => {
                            if (d.flag==='n') {
                                if (i===sInd) {
                                    d.selected='selected'
                                } else if (i>sInd) {
                                    d.multiple='multiple'
                                }
                            }
                            return d;
                        })
                    }
                }

                this.disableArrow();
            },
            /**
             * 设置选择的年月日
             * @param date String 2019.10.31
             */
            setDateEnd(date) {
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

                this.yearActiveEnd=yearActive;
                this.monthActiveEnd=monthActive;
                this.dayActiveEnd=dayActive;
                this.yearSelectedEnd=year;
                this.monthSelectedEnd=month;
                this.daySelectedEnd=day;
                this.changeDaysArrayEnd({year, month, day});
            },
            /**
             * 设置选择的年月日
             * @param date String 2019.10.31
             */
            setDateStart(date) {
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

                // this.yearActiveStart=yearActive;
                // this.monthActiveStart=monthActive;
                // this.dayActiveStart=dayActive;
                this.yearSelectedStart=year;
                this.monthSelectedStart=month;
                this.daySelectedStart=day;
                this.changeDaysArrayStart({year, month, day});
            },
            /**
             * 改变选中状态
             * @param obj {year, month, day}
             * @param clearOther Boolean 清空其他
             */
            changeDaysArrayEnd({year, month, day}, clearOther) {
                this.daysArrayEnd=this.daysArrayEnd.map(d => {
                    if (d.year===year&&d.month===month&&d.day===day) {
                        d.selected='selected';
                    } else if (clearOther) {
                        d.selected='';
                        d.multiple='';
                    }
                    return d;
                })
            },
            /**
             * 改变选中状态
             * @param obj {year, month, day}
             * @param clearOther Boolean 清空其他
             */
            changeDaysArrayStart({year, month, day}, clearOther) {
                this.daysArrayStart=this.daysArrayStart.map(d => {
                    if (d.year===year&&d.month===month&&d.day===day) {
                        d.selected='selected';
                    } else if (clearOther) {
                        d.selected='';
                        d.multiple='';
                    }
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
                this.dateStart='';
                this.dateEnd='';
                this.timeStart='';
                this.timeEnd='';
                this.yearSelectedStart='';
                this.monthSelectedStart='';
                this.daySelectedStart='';
                this.yearSelectedEnd='';
                this.monthSelectedEnd='';
                this.daySelectedEnd='';
                this.$emit('change', '');
                this.pickerClearHide();
                this.changeDaysArrayStart({year: '', month: '', day: ''}, true);
                this.changeDaysArrayEnd({year: '', month: '', day: ''}, true);
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
            switchDateStart(date) {
                this.countDayStart=new CountDay(date); // 当前计算天的对象
                this.daysArrayStart=this.countDayStart.getDaysArray();
                const [yearActive, monthActive, dayActive]=date.split('.'); // 获取传入的时间、日期
                this.yearActiveStart=yearActive;
                this.monthActiveStart=monthActive;
                this.dayActiveStart=dayActive;

                this.disableArrow();

                const dateS=this.yearSelectedStart+this.monthSelectedStart+this.daySelectedStart;
                const dateE=this.yearSelectedEnd+this.monthSelectedEnd+this.daySelectedEnd;
                if (dateS > dateE) {
                    this.daysArrayStart=this.daysArrayStart.map(d => {
                        const dateC=d.year+d.month+d.day;
                        if (d.flag==='n' && dateC > dateE && dateC < dateS) d.multiple='multiple';
                        if (d.flag==='n' && dateC === dateS || dateC === dateE) d.selected='selected';
                        return d;
                    })
                } else {
                    this.daysArrayStart=this.daysArrayStart.map(d => {
                        const dateC=d.year+d.month+d.day;
                        if (d.flag==='n' && dateC > dateS && dateC < dateE) d.multiple='multiple';
                        if (d.flag==='n' && dateC === dateS || dateC === dateE) d.selected='selected';
                        return d;
                    })
                }
            },
            /**
             * 切换日期
             * @param date String '2019.10.31'
             */
            switchDateEnd(date) {
                this.countDayEnd=new CountDay(date); // 当前计算天的对象
                this.daysArrayEnd=this.countDayEnd.getDaysArray();
                const [yearActive, monthActive, dayActive]=date.split('.'); // 获取传入的时间、日期
                this.yearActiveEnd=yearActive;
                this.monthActiveEnd=monthActive;
                this.dayActiveEnd=dayActive;

                this.disableArrow();

                const dateS=this.yearSelectedStart+this.monthSelectedStart+this.daySelectedStart;
                const dateE=this.yearSelectedEnd+this.monthSelectedEnd+this.daySelectedEnd;

                if (dateS > dateE) {
                    this.daysArrayEnd=this.daysArrayEnd.map(d => {
                        const dateC=d.year+d.month+d.day;
                        if (d.flag==='n' && dateC > dateE && dateC < dateS) d.multiple='multiple';
                        if (d.flag==='n' && dateC === dateS || dateC === dateE) d.selected='selected';
                        return d;
                    })
                } else {
                    this.daysArrayEnd=this.daysArrayEnd.map(d => {
                        const dateC=d.year+d.month+d.day;
                        if (d.flag==='n' && dateC > dateS && dateC < dateE) d.multiple='multiple';
                        if (d.flag==='n' && dateC === dateS || dateC === dateE) d.selected='selected';
                        return d;
                    })
                }
            },
            /**
             * 上一年
             */
            prevYearStart() {
                const date=CountPrevYear([this.yearActiveStart, this.monthActiveStart, this.dayActiveStart]);
                this.switchDateStart(date);
            },
            /**
             * 上一年
             */
            prevYearEnd() {
                const date=CountPrevYear([this.yearActiveEnd, this.monthActiveEnd, this.dayActiveEnd]);
                this.switchDateEnd(date);
            },
            /**
             * 下一年
             */
            nextYearStart() {
                const date=CountNextYear([this.yearActiveStart, this.monthActiveStart, this.dayActiveStart]);
                this.switchDateStart(date);
            },
            /**
             * 下一年
             */
            nextYearEnd() {
                const date=CountNextYear([this.yearActiveEnd, this.monthActiveEnd, this.dayActiveEnd]);
                this.switchDateEnd(date);
            },
            /**
             * 上一月
             */
            prevMonthStart() {
                const date=CountPrevMonth([this.yearActiveStart, this.monthActiveStart, this.dayActiveStart]);
                this.switchDateStart(date);
            },
            /**
             * 上一月
             */
            prevMonthEnd() {
                const date=CountPrevMonth([this.yearActiveEnd, this.monthActiveEnd, this.dayActiveEnd]);
                this.switchDateEnd(date);
            },
            /**
             * 下一月
             */
            nextMonthStart() {
                const date=CountNextMonth([this.yearActiveStart, this.monthActiveStart, this.dayActiveStart]);
                this.switchDateStart(date);
            },
            /**
             * 下一月
             */
            nextMonthEnd() {
                const date=CountNextMonth([this.yearActiveEnd, this.monthActiveEnd, this.dayActiveEnd]);
                this.switchDateEnd(date);
            },
            /**
             * 点击日期-开始日期
             * @param obj {year, month, day}
             */
            changeDateStart({year, month, day}) {
                let clearOther=false;
                if (this.yearSelectedStart && this.yearSelectedEnd) {
                    this.yearSelectedStart=year;
                    this.monthSelectedStart=month;
                    this.daySelectedStart=day;

                    this.yearSelectedEnd='';
                    this.monthSelectedEnd='';
                    this.daySelectedEnd='';
                    clearOther=true;

                    this.changeDaysArrayEnd({year: '', month: '', day: ''}, clearOther);
                } else if (this.yearSelectedStart && !this.yearSelectedEnd) {
                    this.yearSelectedEnd=year;
                    this.monthSelectedEnd=month;
                    this.daySelectedEnd=day;
                } else {
                    this.yearSelectedStart=year;
                    this.monthSelectedStart=month;
                    this.daySelectedStart=day;
                }

                if (this.yearSelectedStart && this.yearSelectedEnd) this.btnType='primary';
                else this.btnType='disabled';

                this.changeDaysArrayStart({year, month, day}, clearOther);
            },
            /**
             * 点击日期-结束日期
             * @param obj {year, month, day}
             */
            changeDateEnd({year, month, day}) {
                let clearOther=false;
                if (this.yearSelectedStart && this.yearSelectedEnd) {
                    this.yearSelectedEnd=year;
                    this.monthSelectedEnd=month;
                    this.daySelectedEnd=day;

                    this.yearSelectedStart='';
                    this.monthSelectedStart='';
                    this.daySelectedStart='';
                    clearOther=true;

                    this.changeDaysArrayStart({year: '', month: '', day: ''}, clearOther);
                } else if (!this.yearSelectedStart && this.yearSelectedEnd) {
                    this.yearSelectedStart=year;
                    this.monthSelectedStart=month;
                    this.daySelectedStart=day;
                } else {
                    this.yearSelectedEnd=year;
                    this.monthSelectedEnd=month;
                    this.daySelectedEnd=day;
                }

                if (this.yearSelectedStart && this.yearSelectedEnd) this.btnType='primary';
                else this.btnType='disabled';

                this.changeDaysArrayEnd({year, month, day}, clearOther);
            },
            /**
             * 鼠标进入-开始日期
             * @param obj {year, month, day}
             */
            dayEnterStart({year, month, day}) {
                if ((!this.yearSelectedStart && !this.yearSelectedEnd) || (this.yearSelectedStart && this.yearSelectedEnd)) return;
                const daysArray=this.daysArrayStart;
                const dateS=this.yearSelectedStart+this.monthSelectedStart+this.daySelectedStart;
                const dateE=this.yearSelectedEnd+this.monthSelectedEnd+this.daySelectedEnd;
                const dateN=year+month+day;

                // 当前传入时间的索引
                const nInd=daysArray.findIndex(d => d.flag === 'n' && d.year===year&&d.month===month&&d.day===day);
                // 已选择的时间的索引
                const sInd=daysArray.findIndex(d => d.flag === 'n' && d.year===this.yearSelectedStart&&d.month===this.monthSelectedStart&&d.day===this.daySelectedStart);

                /* 修改开始右侧结束时间面板multiple -s */
                if (dateE) {
                    const daysArrayEnd=this.daysArrayEnd;
                    if (dateN > dateE) { // 选中的左侧面板开始时间大于当前鼠标hover的时间
                        this.daysArrayEnd=daysArrayEnd.map(d => {
                            const dateC=d.year+d.month+d.day;
                            if (d.flag === 'n' && dateC < dateN && dateC > dateE) d.multiple='multiple';
                            else d.multiple='';
                            return d;
                        })
                    } else {
                        this.daysArrayEnd=daysArrayEnd.map(d => {
                            const dateC=d.year+d.month+d.day;
                            if (d.flag === 'n' && dateC > dateN && dateC < dateE) d.multiple='multiple';
                            else d.multiple='';
                            return d;
                        })
                    }
                } else {
                    this.daysArrayEnd=this.daysArrayEnd.map(d => {
                        d.multiple='';
                        return d;
                    })
                }
                /* 修改开始右侧结束时间面板multiple -e */

                // 修改当前鼠标hover状态
                if (dateS) { // 已选择开始时间
                    if (sInd === -1) { // 不在当前面板
                        if (dateN < dateS) {
                            this.daysArrayStart=daysArray.map(d => {
                                if (d.flag === 'n' && d.year+d.month+d.day >= dateN) d.multiple='multiple';
                                else d.multiple='';
                                return d;
                            })
                        } else {
                            this.daysArrayStart=daysArray.map(d => {
                                if (d.flag === 'n' && d.year+d.month+d.day <= dateN) d.multiple='multiple';
                                else d.multiple='';
                                return d;
                            })
                        }
                    } else { // 在当前面板
                        if (nInd > sInd) {
                            this.daysArrayStart=daysArray.map(d => {
                                const dateC=d.year+d.month+d.day;
                                if (dateC <= dateN && dateC > dateS) d.multiple='multiple';
                                else d.multiple='';
                                return d;
                            })
                        } else {
                            this.daysArrayStart=daysArray.map(d => {
                                const dateC=d.year+d.month+d.day;
                                if (dateC >= dateN && dateC < dateS) d.multiple='multiple';
                                else d.multiple='';
                                return d;
                            })
                        }
                    }
                } else { // 未选择开始时间
                    this.daysArrayStart=daysArray.map(d => {
                        if (d.year+d.month+d.day >= dateN) d.multiple='multiple';
                        else d.multiple='';
                        return d;
                    })
                }
            },
            /**
             * 鼠标进入-结束日期
             * @param obj {year, month, day}
             */
            dayEnterEnd({year, month, day}) {
                if ((!this.yearSelectedStart && !this.yearSelectedEnd) || (this.yearSelectedStart && this.yearSelectedEnd)) return;
                const daysArray=this.daysArrayEnd;
                const dateS=this.yearSelectedStart+this.monthSelectedStart+this.daySelectedStart;
                const dateE=this.yearSelectedEnd+this.monthSelectedEnd+this.daySelectedEnd;
                const dateN=year+month+day;

                // 当前传入时间的索引
                const nInd=daysArray.findIndex(d => d.year===year&&d.month===month&&d.day===day);
                // 以选择的时间的索引
                const sInd=daysArray.findIndex(d => d.year===this.yearSelectedEnd&&d.month===this.monthSelectedEnd&&d.day===this.daySelectedEnd);

                /* 修改开始左侧开始时间面板multiple -s */
                if (dateS) {
                    const daysArrayStart=this.daysArrayStart;
                    if (dateN > dateS) { // 选中的左侧面板开始时间大于当前鼠标hover的时间
                        this.daysArrayStart=daysArrayStart.map(d => {
                            const dateC=d.year+d.month+d.day;
                            if (d.flag==='n' && dateC < dateN && dateC > dateS) d.multiple='multiple';
                            else d.multiple='';
                            return d;
                        })
                    } else {
                        this.daysArrayStart=daysArrayStart.map(d => {
                            const dateC=d.year+d.month+d.day;
                            if (d.flag==='n' && dateC > dateN && dateC < dateS) d.multiple='multiple';
                            else d.multiple='';
                            return d;
                        })
                    }
                } else {
                    this.daysArrayStart=this.daysArrayStart.map(d => {
                        d.multiple='';
                        return d;
                    })
                }
                /* 修改开始左侧开始时间面板multiple -e */

                // 修改当前鼠标hover状态
                if (sInd === -1) { // 不在当前面板
                    if (dateN < dateE) {
                        this.daysArrayEnd=daysArray.map(d => {
                            if (d.flag==='n' && d.year+d.month+d.day >= dateN) d.multiple='multiple';
                            else d.multiple='';
                            return d;
                        })
                    } else {
                        this.daysArrayEnd=daysArray.map(d => {
                            if (d.flag==='n' && d.year+d.month+d.day <= dateN) d.multiple='multiple';
                            else d.multiple='';
                            return d;
                        })
                    }
                } else { // 在当前面板
                    if (nInd > sInd) {
                        this.daysArrayEnd=daysArray.map(d => {
                            const dateC=d.year+d.month+d.day;
                            if (d.flag==='n' && dateC <= dateN && dateC > dateE) d.multiple='multiple';
                            else d.multiple='';
                            return d;
                        })
                    } else {
                        this.daysArrayEnd=daysArray.map(d => {
                            const dateC=d.year+d.month+d.day;
                            if (d.flag==='n' && dateC >= dateN && dateC < dateE) d.multiple='multiple';
                            else d.multiple='';
                            return d;
                        })
                    }
                }
            },

            // 清空开始日选中
            clearDaysArrayStart() {
                this.daysArrayStart=this.daysArrayStart.map(d => {
                    d.selected='';
                    d.multiple='';
                    return d;
                });
                this.btnType='disabled';
            },
            // 清空结束日选中
            clearDaysArrayEnd() {
                this.daysArrayEnd=this.daysArrayEnd.map(d => {
                    d.selected='';
                    d.multiple='';
                    return d;
                });
                this.btnType='disabled';
            },
            // 年面板显示切换-start，如果flag为true则执行禁用箭头函数
            panelYearHandleStart(status, flag) {
                this.panelYearStart=status;
                this.panelMonthStart=false;
                const y=this.$refs.singleYearEnd.yearsArray[0].year;
                // 重新计算年列表
                const yae=(y-1).toString();
                this.$refs.singleYearStart.init(yae);
                this.$refs.singleYearStart.changeYearsArray(this.yearActiveStart);
                if (flag) this.panelYearDisableArrowStart();
            },
            // 年面板显示切换-end
            panelYearHandleEnd(status, flag) {
                this.panelYearEnd=status;
                this.panelMonthEnd=false;
                const y=this.$refs.singleYearStart.yearsArray[11].year;
                // 重新计算年列表
                const yas=(Number(y)+12).toString();
                this.$refs.singleYearEnd.init(yas);
                this.$refs.singleYearEnd.changeYearsArray(this.yearActiveEnd);
                if (flag) this.panelYearDisableArrowEnd();
            },
            // 禁用箭头-start
            panelYearDisableArrowStart() {
                const sys=this.$refs.singleYearStart, sye=this.$refs.singleYearEnd;
                const yas=sys.yearsArray;
                const yae=sye.yearsArray;
                const ys=yas[11].year, ye=yae[0].year;
                if (ye - ys < 12) {
                    sys.disableYearRight = true;
                    sye.disableYearLeft = true;
                } else {
                    sys.disableYearRight = false;
                    sye.disableYearLeft = false;
                }
            },
            // 禁用箭头-end
            panelYearDisableArrowEnd() {
                const sys=this.$refs.singleYearStart, sye=this.$refs.singleYearEnd;
                const yas=sys.yearsArray;
                const yae=sye.yearsArray;
                const ys=yas[11].year, ye=yae[0].year;
                if (ye - ys < 12) {
                    sye.disableYearLeft = true;
                    sys.disableYearRight = true;
                } else {
                    sye.disableYearLeft = false;
                    sys.disableYearRight = false;
                }
            },
            // 点击年-start
            panelYearChangeDateStart(year) {
                this.panelYearHandleStart(false);
                this.yearActiveStart=year;
                this.daysArrayStart=this.countDayStart.yearChangeCountDay(year, this.monthActiveStart, this.sort);
                if (this.yearSelectedStart && this.yearSelectedEnd) this.clearDaysArrayEnd();
            },
            // 点击年-end
            panelYearChangeDateEnd(year) {
                this.panelYearHandleEnd(false);
                this.yearActiveEnd=year;
                this.daysArrayEnd=this.countDayEnd.yearChangeCountDay(year, this.monthActiveEnd, this.sort);
                if (this.yearSelectedStart && this.yearSelectedEnd) this.clearDaysArrayStart();
            },
            // 月面板的yearActive改变，改变年面板的year选中项-start
            changeYearsArrayHandleStart(year) {
                this.$refs.singleYearStart.changeYearsArray(year)
            },
            // 月面板的yearActive改变，改变年面板的year选中项-end
            changeYearsArrayHandleEnd(year) {
                this.$refs.singleYearEnd.changeYearsArray(year)
            },
            // 月面板显示切换-start
            panelMonthHandleStart(status) {
                // 计算月
                const sms=this.$refs.singleMonthStart;
                if (sms.yearActive !== this.yearActiveStart || sms.monthActive !== this.monthActiveStart) sms.init(this.yearActiveStart+'.'+this.monthActiveStart);
                this.panelMonthStart=status;

                if (this.yearActiveStart === this.yearActiveEnd) sms.setMonthsArrayRightDisable(this.monthActiveEnd);
            },
            // 月面板显示切换-end
            panelMonthHandleEnd(status) {
                // 计算月
                const sme=this.$refs.singleMonthEnd;
                if (sme.yearActive !== this.yearActiveEnd || sme.monthActive !== this.monthActiveEnd) sme.init(this.yearActiveEnd+'.'+this.monthActiveEnd);
                this.panelMonthEnd=status;

                if (this.yearActiveStart === this.yearActiveEnd) sme.setMonthsArrayLeftDisable(this.monthActiveStart);
            },
            // 点击月-start
            panelMonthChangeDateStart({year, month}) {
                this.panelMonthHandleStart(false);
                this.monthActiveStart=month;
                this.daysArrayStart=this.countDayStart.yearChangeCountDay(year, month, this.sort);
                if (this.yearSelectedStart && this.yearSelectedEnd) this.clearDaysArrayEnd();
            },
            // 点击月-end
            panelMonthChangeDateEnd({year, month}) {
                this.panelMonthHandleEnd(false);
                this.monthActiveEnd=month;
                this.daysArrayEnd=this.countDayEnd.yearChangeCountDay(year, month, this.sort);
                if (this.yearSelectedStart && this.yearSelectedEnd) this.clearDaysArrayStart();
            },
            /**
             * 确定
             */
            pickerConfirm() {
                const dateS=this.yearSelectedStart+'.'+this.monthSelectedStart+'.'+this.daySelectedStart;
                const dateE=this.yearSelectedEnd+'.'+this.monthSelectedEnd+'.'+this.daySelectedEnd;
                const selectedDate=dateS>dateE?(dateE+'-'+dateS):(dateS+'-'+dateE);
                this.selectedDate=selectedDate;
                /**
                 * 返回选择的时分秒
                 * @type Function
                 */
                this.$emit('change', selectedDate);
                this.blurStatus=false;
                this.pickerBoxStatus=false;
            }
        }
    }
</script>
