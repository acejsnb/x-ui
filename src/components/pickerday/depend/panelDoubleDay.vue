<template>
    <div class="p-picker-child">
        <div
                class="p-picker-input"
                @click="pickerBoxShow"
                @mouseover="pickerClearShow"
                @mouseout="pickerClearHide"
        >
            <section
                    :class="['p-picker-input-tip', selectedDate&&'p-picker-input-values']"
            >{{selectedDate?selectedDate:'请选择日期'}}</section>
            <ClearSvg v-show="clearStatus" class="p-picker-clear-svg" @click.stop="clearTime" />
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
                                    :class="[(yearSelectedStart&&monthSelectedStart&&daySelectedStart)&&'p-picker-input-values']"
                            >{{(yearSelectedStart&&monthSelectedStart&&daySelectedStart)?`${yearSelectedStart}.${monthSelectedStart}.${daySelectedStart}`:'开始日期'}}</article>
                            <article class="p-picker-input-solstice">至</article>
                            <article
                                    :class="[(yearSelectedEnd&&monthSelectedEnd&&daySelectedEnd)&&'p-picker-input-values']"
                            >{{(yearSelectedEnd&&monthSelectedEnd&&daySelectedEnd)?`${yearSelectedEnd}.${monthSelectedEnd}.${daySelectedEnd}`:'结束日期'}}</article>
                        </section>
                    </div>
                    <div class="p-picker-main-item">
                        <DaySelect
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
                        />
                        <DaySelect
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
    import CountDay from '../../static/utils/datePicker/CountDay';

    import CountNextYear from '../../static/utils/datePicker/CountNextYear';
    import CountPrevYear from '../../static/utils/datePicker/CountPrevYear';
    import CountNextMonth from '../../static/utils/datePicker/CountNextMonth';
    import CountPrevMonth from '../../static/utils/datePicker/CountPrevMonth';

    import DaySelect from './day';
    import Button from '../../Button';

    import ClearSvg from '../../static/iconSvg/clear2.svg';
    export default {
        name: "panelDoubleDay",
        components: {
            DaySelect,
            Button,
            ClearSvg
        },
        props: {
            /**
             * 传入的时间段
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
            }
        },
        created() {
            this.dateFormat(this.date);

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
             * 日期
             * @param date String '2019.09.30-2019.10.31'
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
                this.countDayEnd=new CountDay(this.dateEnd); // 当前计算天的对象
                this.daysArrayEnd=this.countDayEnd.getDaysArray();
                const [year, month, day]=this.countDayEnd.countNowDate(); // 获取当前时间、日期
                this.yearNow=year;
                this.monthNow=month;
                this.dayNow=day;
                this.setDateEnd(this.dateEnd);
                if (this.date) {
                    const sd=this.dateStart.replace(/\./, '').substr(0, 6);
                    const ed=this.dateEnd.replace(/\./, '').substr(0, 6);
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
                        this.initStart(this.dateStart);
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

<style lang="stylus">

</style>