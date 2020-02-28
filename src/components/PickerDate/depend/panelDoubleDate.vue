<template>
    <div class="p-picker-child">
        <div
            :class="[
                'p-picker-input', format?'p-picker-input-double-max':'p-picker-input-double',
                quickSwitch?'p-picker-input-triangle':'p-picker-input-normal'
                ]"
            @mouseover="pickerClearShow"
            @mouseleave="pickerClearHide"
        >
            <i
                    v-if="quickSwitch"
                    :class="['p-picker-triangle', 'p-picker-triangle-left', !selectedDate&&'p-picker-triangle-disabled']"
                    @click="quickSort('left')"
            ><TrianglePickerLeft /></i>
            <section
                    :class="['p-picker-input-double-tip', selectedDate?'p-picker-input-values':'p-picker-input-tip']"
                    @click="pickerBoxShow"
            >
                <article class="p-picker-input-tip-values p-picker-ellipsis"
                         @mouseenter="pickerEllipsis"
                >{{(tabKey==='week'&&thTextSelectedStart)?thTextSelectedStart:(selectedDateStart?selectedDateStart:'开始日期')}}</article>
                <article :class="['p-picker-input-tip-to', (selectedDateStart&&format)&&'p-picker-left-box-shadow']">至</article>
                <article class="p-picker-input-tip-values p-picker-ellipsis"
                         @mouseenter="pickerEllipsis"
                >{{(tabKey==='week'&&thTextSelectedEnd)?thTextSelectedEnd:(selectedDateEnd?selectedDateEnd:'结束日期')}}</article>
            </section>
            <section v-if="!quickSwitch" :class="['p-picker-svg-box', (selectedDateEnd&&format)&&'p-picker-left-box-shadow']">
                <ClearSvg class="p-picker-clear-svg" v-if="clearStatus" @click.stop="clearTime" />
                <CalendarSvg v-else />
            </section>
            <i v-if="quickSwitch"
               :class="[
                   'p-picker-triangle', 'p-picker-triangle-right', (selectedDate&&format)&&'p-picker-left-box-shadow',
                    !selectedDate&&'p-picker-triangle-disabled'
               ]"
               @click="quickSort('right')"
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
                        <section :class="['p-picker-input-alert', (clickSelectedDateEnd&&format)&&'p-picker-input-alert-shadow']">
                            <article
                                    :class="['p-picker-input-alert-tip', clickSelectedDateStart?'p-picker-input-values':'p-picker-input-tip', 'p-picker-ellipsis']"
                                    @mouseenter="pickerEllipsis"
                            >{{(tabKey==='week'&&clickThTextSelectedStart)?clickThTextSelectedStart:(clickSelectedDateStart?clickSelectedDateStart:'开始日期')}}</article>
                            <article :class="['p-picker-input-tip-to', (clickSelectedDateStart&&format)&&'p-picker-left-box-shadow']">至</article>
                            <article
                                    :class="['p-picker-input-alert-tip', clickSelectedDateEnd?'p-picker-input-values':'p-picker-input-tip', 'p-picker-ellipsis']"
                                    @mouseenter="pickerEllipsis"
                            >{{(tabKey==='week'&&clickThTextSelectedEnd)?clickThTextSelectedEnd:(clickSelectedDateEnd?clickSelectedDateEnd:'开始日期')}}</article>
                        </section>
                        <TabDate v-model="tabKey" />
                    </div>
                    <div class="p-picker-main-item">
                        <!-- 开始时间-s -->
                        <div class="p-picker-child-select-box">
                            <div class="p-picker-child-select-box-title" v-show="tabKey !== 'time'">
                                <section class="p-picker-child-select-box-icon">
                                    <article
                                            class="p-picker-child-select-box-icon-svg p-picker-child-select-box-icon-svg-left"
                                            @click="prevYearStart"
                                    >
                                        <ArrowRightDoubleSvg />
                                    </article>
                                    <article
                                            class="p-picker-child-select-box-icon-svg p-picker-child-select-box-icon-svg-left"
                                            @click="prevMonthStart"
                                            v-if="(tabKey==='day'||tabKey==='week')&&!panelYearStart&&!panelMonthStart"
                                    >
                                        <ArrowRightSvg />
                                    </article>
                                </section>
                                <section class="p-picker-child-select-box-title-text">
                                    <article class="p-picker-active-title" @click="yearActiveClickStart">{{(tabKey==='year'||panelYearStart)?(`${yearActiveStartLeft}-${yearActiveStartRight}`):yearActiveStart}}年</article>
                                    <article v-show="(tabKey==='day'||tabKey==='week')&&!panelYearStart&&!panelMonthStart" class="p-picker-active-title" @click="monthActiveClickStart">{{monthActiveStart}}月</article>
                                </section>
                                <section class="p-picker-child-select-box-icon">
                                    <article
                                            class="p-picker-child-select-box-icon-svg"
                                            @click="nextMonthStart"
                                            v-if="(tabKey==='day'||tabKey==='week')&&!panelYearStart&&!panelMonthStart&&!disableMonthRight"
                                    >
                                        <ArrowRightSvg />
                                    </article>
                                    <article
                                            v-if="!disableYearRight"
                                            class="p-picker-child-select-box-icon-svg"
                                            @click="nextYearStart"
                                    >
                                        <ArrowRightDoubleSvg />
                                    </article>
                                </section>
                            </div>
                            <div class="p-picker-child-title" v-if="(tabKey==='day'||tabKey==='week')&&!panelYearStart&&!panelMonthStart">
                                <section
                                        class="p-picker-child-title-item"
                                        v-for="wt in weekText"
                                        :key="'wts-'+wt"
                                >{{wt}}</section>
                            </div>

                            <template>
                                <Day
                                        v-if="tabKey==='day' && !panelYearStart && !panelMonthStart"
                                        :yearNow="yearNow"
                                        :monthNow="monthNow"
                                        :dayNow="dayNow"
                                        :multiple="true"
                                        :daysArray="daysArrayStart"
                                        @change="dayChangeStart"
                                        @enter="dayEnterStart"
                                />
                                <Week
                                        v-else-if="tabKey==='week' && !panelYearStart && !panelMonthStart"
                                        :multiple="true"
                                        :weeksArray="weeksArrayStart"
                                        @change="weekChangeStart"
                                        @enter="weekEnterStart"
                                />
                                <Month
                                        v-else-if="(tabKey==='month' || panelMonthStart) && !panelYearStart"
                                        :multiple="true"
                                        :monthsArray="monthsArrayStart"
                                        @change="monthChangeStart"
                                        @enter="monthEnterStart"
                                />
                                <Year
                                        v-else-if="tabKey==='year' || panelYearStart"
                                        :multiple="true"
                                        :yearsArray="yearsArrayStart"
                                        @change="yearChangeStart"
                                        @enter="yearEnterStart"
                                />
                                <Time
                                        v-else
                                        ref="timeSelectStart"
                                        class="p-picker-main-item-time-date"
                                        :multiple="true"
                                        :time="timeStart"
                                        :format="format"
                                        @change="timeChangeStart"
                                />
                            </template>
                        </div>
                        <!-- 开始时间-e -->
                        <!-- 结束时间-s -->
                        <div class="p-picker-child-select-box p-picker-child-select-box-border-left">
                            <div class="p-picker-child-select-box-title" v-show="tabKey !== 'time'">
                                <section class="p-picker-child-select-box-icon">
                                    <article
                                            v-if="!disableYearLeft"
                                            class="p-picker-child-select-box-icon-svg p-picker-child-select-box-icon-svg-left"
                                            @click="prevYearEnd"
                                    >
                                        <ArrowRightDoubleSvg />
                                    </article>
                                    <article
                                            class="p-picker-child-select-box-icon-svg p-picker-child-select-box-icon-svg-left"
                                            @click="prevMonthEnd"
                                            v-if="(tabKey==='day'||tabKey==='week')&&!panelYearEnd&&!panelMonthEnd&&!disableMonthLeft"
                                    >
                                        <ArrowRightSvg />
                                    </article>
                                </section>
                                <section class="p-picker-child-select-box-title-text">
                                    <article class="p-picker-active-title" @click="yearActiveClickEnd">{{(tabKey==='year'||panelYearEnd)?(`${yearActiveEndLeft}-${yearActiveEndRight}`):yearActiveEnd}}年</article>
                                    <article v-show="(tabKey==='day'||tabKey==='week')&&!panelYearEnd&&!panelMonthEnd" class="p-picker-active-title" @click="monthActiveClickEnd">{{monthActiveEnd}}月</article>
                                </section>
                                <section class="p-picker-child-select-box-icon">
                                    <article
                                            class="p-picker-child-select-box-icon-svg"
                                            @click="nextMonthEnd"
                                            v-if="(tabKey==='day'||tabKey==='week')&&!panelYearEnd&&!panelMonthEnd"
                                    >
                                        <ArrowRightSvg />
                                    </article>
                                    <article
                                            class="p-picker-child-select-box-icon-svg"
                                            @click="nextYearEnd"
                                    >
                                        <ArrowRightDoubleSvg />
                                    </article>
                                </section>
                            </div>
                            <div class="p-picker-child-title" v-if="(tabKey==='day'||tabKey==='week')&&!panelYearEnd&&!panelMonthEnd">
                                <section
                                        class="p-picker-child-title-item"
                                        v-for="wt in weekText"
                                        :key="'wts-'+wt"
                                >{{wt}}</section>
                            </div>

                            <template>
                                <Day
                                        v-if="tabKey==='day' && !panelYearEnd && !panelMonthEnd"
                                        :yearNow="yearNow"
                                        :monthNow="monthNow"
                                        :dayNow="dayNow"
                                        :multiple="true"
                                        :daysArray="daysArrayEnd"
                                        @change="dayChangeEnd"
                                        @enter="dayEnterEnd"
                                />
                                <Week
                                        v-else-if="tabKey==='week' && !panelYearEnd && !panelMonthEnd"
                                        :multiple="true"
                                        :weeksArray="weeksArrayEnd"
                                        @change="weekChangeEnd"
                                        @enter="weekEnterEnd"
                                />
                                <Month
                                        v-else-if="(tabKey==='month' || panelMonthEnd) && !panelYearEnd"
                                        :multiple="true"
                                        :monthsArray="monthsArrayEnd"
                                        @change="monthChangeEnd"
                                        @enter="monthEnterEnd"
                                />
                                <Year
                                        v-else-if="tabKey==='year' || panelYearEnd"
                                        :multiple="true"
                                        :yearsArray="yearsArrayEnd"
                                        @change="yearChangeEnd"
                                        @enter="yearEnterEnd"
                                />
                                <Time
                                        v-else
                                        ref="timeSelectEnd"
                                        class="p-picker-main-item-time-date"
                                        :multiple="true"
                                        :time="timeEnd"
                                        :format="format"
                                        @change="timeChangeEnd"
                                />
                            </template>
                        </div>
                        <!-- 结束时间-e -->
                    </div>
                </div>

                <div class="p-picker-main-handle">
                    <span
                            v-if="format&&tabKey==='day'"
                            :class="['p-picker-handle-time', (daySelectedStart&&daySelectedEnd)?'p-picker-handle-time-disabled':'p-picker-handle-time-normal']"
                            @click="panelTimeOpen"
                    >选择时间</span>
                    <template>
                        <Button v-if="format&&tabKey==='time'" type="primary" size="small" @click="panelTimeClose">确定</Button>
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
    import LeapYear from '../../static/utils/datePicker/LeapYear';

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
    import CountStartOrEndDate from "../../static/utils/datePicker/CountStartOrEndDate";
    export default {
        name: "PanelDoubleDate",
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
            }
        },
        data() {
            return {
                btnType: 'disabled', // 按钮状态
                pickerBoxStatus: false, // 显示选择时间框
                blurStatus: false, // 是否可执行blur
                clearStatus: false, // 关闭按钮
                selectedDate: '', // 选中的时间
                selectedDateStart: '', // 选中的时间-s
                selectedDateEnd: '', // 选中的时间-e
                clickSelectedDateStart: '', // 选中的时间-弹窗
                clickSelectedDateEnd: '', // 选中的时间-弹窗

                timeStart: '', // 时分|时分秒
                timeEnd: '', // 时分|时分秒

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

                // 年面板-活动的年段
                yearActiveStartLeft: '',
                yearActiveStartRight: '',
                yearActiveEndLeft: '',
                yearActiveEndRight: '',

                // 选择的年月日-s
                yearSelectedStart: '',
                monthSelectedStart: '',
                daySelectedStart: '',
                // 点击-选择的年月日-s
                clickYearSelectedStart: '',
                clickMonthSelectedStart: '',
                clickDaySelectedStart: '',

                // 选择的年月日-e
                yearSelectedEnd: '',
                monthSelectedEnd: '',
                daySelectedEnd: '',
                // 点击-选择的年月日-e
                clickYearSelectedEnd: '',
                clickMonthSelectedEnd: '',
                clickDaySelectedEnd: '',

                thTextSelectedStart: '', // 选择的第几周 String
                thTextSelectedEnd: '', // 选择的第几周 String
                clickThTextSelectedStart: '', // 当前点击选择的第几周 String
                clickThTextSelectedEnd: '', // 当前点击选择的第几周 String
                weeksSelectedStart: [], // 选择的周列表
                weeksSelectedEnd: [], // 选择的周列表

                daysArrayStart: [], // 日列表-开始
                daysArrayEnd: [], // 日列表-结束
                weeksArrayStart: [], // 周列表
                weeksArrayEnd: [], // 周列表
                monthsArrayStart: [], // 月列表
                monthsArrayEnd: [], // 月列表
                yearsArrayStart: [], // 年列表
                yearsArrayEnd: [], // 年列表

                disableYearRight: false, // 禁用开始时间右箭头-年
                disableMonthRight: false, // 禁用开始时间右箭头-月
                disableYearLeft: false,  // 禁用结束时间左箭头-年
                disableMonthLeft: false,  // 禁用结束时间左箭头-月

                panelYearStart: false, // 显示年面板
                panelYearEnd: false, // 显示年面板
                panelMonthStart: false, // 显示月面板
                panelMonthEnd: false, // 显示月面板
                panelTimeStart: false, // 显示时分(秒)面板
                panelTimeEnd: false, // 显示时分(秒)面板
                tabKey: 'day' // 日周月年切换显示
            }
        },
        computed: {
            weekText() {
                return ['一', '二', '三', '四', '五', '六', '日']
            }
        },
        watch: {
            pickerBoxStatus(n) {
                if (n) return;
            },
            // 监听日期改变
            date(n, o) {
                if (n === o) return;
                // if (n) {
                //     let ys=this.yearSelectedStart, ms=this.monthSelectedStart, ds=this.daySelectedStart;
                //     let ye=this.yearSelectedEnd, me=this.monthSelectedEnd, de=this.daySelectedEnd;
                //     this.clickYearSelectedStart=ys;
                //     this.clickMonthSelectedStart=ms;
                //     this.clickDaySelectedStart=ds;
                //     this.clickYearSelectedEnd=ye;
                //     this.clickMonthSelectedEnd=me;
                //     this.clickDaySelectedEnd=de;
                // }
                this.paramsChange(this.tabKey, n);
            },
            // 日周月年切换显示
            tabKey(n, o) {
                if (n === o || o === 'time') return;
                this.panelYear=false;
                this.panelMonth=false;
                let dateS='', dateE='';
                let ys=this.yearActiveStart, ms=this.monthActiveStart, ds=this.dayActiveStart, ts=this.timeStart;
                let ye=this.yearActiveEnd, me=this.monthActiveEnd, de=this.dayActiveEnd, te=this.timeEnd;

                if (this.selectedDate) {
                    const ys=this.yearSelectedStart, ms=this.monthSelectedStart, ds=this.daySelectedStart;
                    const ye=this.yearSelectedEnd, me=this.monthSelectedEnd, de=this.daySelectedEnd;
                    this.clickYearSelectedStart=ys;
                    this.clickMonthSelectedStart=ms;
                    this.clickDaySelectedStart=ds;
                    this.clickYearSelectedEnd=ye;
                    this.clickMonthSelectedEnd=me;
                    this.clickDaySelectedEnd=de;
                } else {
                    this.clickYearSelectedStart='';
                    this.clickMonthSelectedStart='';
                    this.clickDaySelectedStart='';
                    this.clickYearSelectedEnd='';
                    this.clickMonthSelectedEnd='';
                    this.clickDaySelectedEnd='';
                }

                if (ms === '02' && Number(ds) >= 29) {
                    if (LeapYear(ys)) {
                        ds='29';
                    } else {
                        ds='28';
                    }
                }
                if (me === '02' && Number(de) >= 29) {
                    if (LeapYear(ys)) {
                        de='29';
                    } else {
                        de='28';
                    }
                }
                dateS=ys+'.'+ms+'.'+ds+(n==='day'&&this.format&&ts?(' '+ts):'');
                dateE=ye+'.'+me+'.'+de+(n==='day'&&this.format&&te?(' '+te):'');

                this.paramsChange(n, dateS+'-'+dateE);
            }
        },
        created() {
            // 初始化日期对象
            this.paramsChange(this.tabKey, this.date, true);
        },
        methods: {
            // 文字超出显示省略号
            pickerEllipsis(e) {
                // if (!this.format) return;
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

            // 参数改变设置面板初始化 init-表示是否初次渲染
            paramsChange(params, date, init) {
                if (params === 'time') return;
                if (date && init) {
                    this.selectedDate=date;
                    const [start, end]=this.dateFormat(date);
                    this.selectedDateStart=start;
                    this.selectedDateEnd=end;
                    this.clickSelectedDateStart=start;
                    this.clickSelectedDateEnd=end;
                } else {
                    // this.selectedDateStart='';
                    // this.selectedDateEnd='';
                    // this.clickSelectedDateStart='';
                    // this.clickSelectedDateEnd='';
                    // this.clickThTextSelectedStart='';
                    // this.clickThTextSelectedEnd='';
                }

                this.changeBtnType(this.date);

                switch (params) {
                    case 'day':
                        this.dayInitEnd(date, init);
                        break;
                    case 'week':
                        this.weekInitEnd(date);
                        break;
                    case 'month':
                        this.monthInitEnd(date);
                        break;
                    case 'year':
                        this.yearInitEnd(date);
                        break;
                    default:
                        break;
                }
            },

            /**
             * 格式化传入的时间
             * @param date String '2020.02.14 08:09:10'
             */
            setSelectedDay(date) {
                let sDate='', time='';
                if (date) {
                    if (date.includes(':')) {
                        const [d, t]=date.split(' ');
                        sDate=d;
                        time=t;
                    } else {
                        sDate=date;
                    }
                }
                return [sDate, time]
            },
            setSelectedWeek() {},
            setSelectedMonth() {},
            setSelectedYear() {},
            /**
             * 日
             * @param date String '2019.09.30 08:09:10-2019.10.31 08:09:10'
             */
            dateFormat(date) {
                const reg=/[.:\- ]/g;
                let dateStart='', dateEnd='';
                if (date && date.replace(reg, '')) {
                    const [ds, de]=date.split('-');
                    dateStart=ds;
                    dateEnd=de;
                }

                return [dateStart, dateEnd]
            },
            // 禁用箭头
            disableArrow() {
                const tabKey=this.tabKey;
                switch (tabKey) {
                    case 'day':
                    case 'week':
                        (() => {
                            const yas=this.yearActiveStart, yae=this.yearActiveEnd;
                            const mas=this.monthActiveStart, mae=this.monthActiveEnd;
                            const das=this.dayActiveStart, dae=this.dayActiveEnd;
                            const activeStart=yas+mas;
                            const activeEnd=yae+mae;

                            const reg=/\./g;
                            const nextYear=CountNextYear([yas, mas, das]).replace(reg, '').substr(0, 6);
                            const nextMonth=CountNextMonth([yas, mas, das]).replace(reg, '').substr(0, 6);
                            const prevYear=CountPrevYear([yae, mae, dae]).replace(reg, '').substr(0, 6);
                            const prevMonth=CountPrevMonth([yae, mae, dae]).replace(reg, '').substr(0, 6);

                            this.disableYearRight = nextYear >= activeEnd;
                            this.disableMonthRight = nextMonth >= activeEnd;
                            this.disableYearLeft = prevYear <= activeStart;
                            this.disableMonthLeft = prevMonth <= activeStart;
                        })();
                        break;
                    case 'month':
                        (() => {
                            const activeStart=this.yearActiveStart, activeEnd=this.yearActiveEnd;

                            this.disableYearRight = (activeEnd-1) <= activeStart;
                            this.disableYearLeft = (activeEnd-1) <= activeStart;
                        })();
                        break;
                    case 'year':
                        (() => {
                            const yearStartRight=this.yearActiveStartRight, yearEndLeft=this.yearActiveEndLeft;

                            this.disableYearRight = (yearEndLeft-1) <= yearStartRight;
                            this.disableYearLeft = (yearEndLeft-1) <= yearStartRight;
                        })();
                        break;
                    default:
                        break;
                }
            },

            /**
             * 初始化日期对象
             * @param date
             * @param init -表示是否初次渲染
             */
            dayInitEnd(date, init) {
                const [dateStart, dateEnd]=this.dateFormat(date);
                const [dateS, timeS]=this.setSelectedDay(dateStart);
                const [dateE, timeE]=this.setSelectedDay(dateEnd);
                this.timeStart=timeS;
                this.timeEnd=timeE;
                const countDayEnd=new CountDay(dateE); // 当前计算天的对象
                this.daysArrayEnd=countDayEnd.getDaysArray();
                this.countDayEnd=countDayEnd;
                const [year, month, day]=this.countDayEnd.countNowDate(); // 获取当前时间、日期
                if (init) {
                    this.yearNow=year;
                    this.monthNow=month;
                    this.dayNow=day;
                    this.yearActiveEnd=year;
                    this.monthActiveEnd=month;
                    this.dayActiveEnd=day;
                    // 初始化开始时间对象
                    this.dayInitStart(CountPrevMonth([year, month, day]), init);
                } else {
                    this.dayInitStart(dateS, init);
                }

                if (this.date) {
                    const dateS=this.selectedDateStart, dateE=this.selectedDateEnd;
                    this.setDayEnd(dateE);

                    const sd=dateS.replace(/\./g, '').substr(0, 6);
                    const ed=dateE.replace(/\./g, '').substr(0, 6);
                    if (sd === ed) { // 开始结束时间是否在同一月
                        const daysArray=this.daysArrayEnd;
                        const sInd=daysArray.findIndex(d => d.flag==='n'&&(d.year+'.'+d.month+'.'+d.day)===dateS);
                        const eInd=daysArray.findIndex(d => d.flag==='n'&&(d.year+'.'+d.month+'.'+d.day)===dateE);

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
                        const daysArray=this.daysArrayEnd;
                        const eInd=daysArray.findIndex(d => d.flag==='n'&&(d.year+'.'+d.month+'.'+d.day)===dateE);
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
                }
            },
            /**
             * 初始化日期对象
             * @param date
             * @param init -表示是否初次渲染
             */
            dayInitStart(date, init) {
                const countDayStart=new CountDay(date); // 当前计算天的对象
                const daysArray=countDayStart.getDaysArray();
                this.countDayStart=countDayStart;
                this.daysArrayStart=daysArray;

                if (init) {
                    const [yearActive, monthActive, dayActive]=date.split('.');
                    this.yearActiveStart=yearActive;
                    this.monthActiveStart=monthActive;
                    this.dayActiveStart=dayActive;
                }

                if (this.date) {
                    const dateS=this.selectedDateStart.substr(0, 10);
                    const dateE=this.selectedDateEnd.substr(0, 10);
                    this.setDayStart(dateS);
                    const sd=dateS.replace(/\./g, '').substr(0, 6);
                    const ed=dateE.replace(/\./g, '').substr(0, 6);
                    if (ed - sd > 0) {
                        const sInd=daysArray.findIndex(d => d.flag==='n'&&(d.year+'.'+d.month+'.'+d.day)===dateS);
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
            weekInitEnd(date) {
                const[dateStart, dateEnd]=this.dateFormat(date);
                const countWeek=new CountWeek({date: dateEnd, sort: this.sort});
                this.countWeekEnd=countWeek;
                this.weeksArrayEnd=countWeek.getWeeksArray();

                this.weekInitStart(dateStart);

                if (this.selectedDateEnd) this.setWeekEnd(this.yearSelectedEnd, this.monthSelectedEnd, this.daySelectedEnd);
            },
            weekInitStart(date) {
                const countWeek=new CountWeek({date: date, sort: this.sort});
                this.countWeekStart=countWeek;
                this.weeksArrayStart=countWeek.getWeeksArray();

                if (this.selectedDateStart) this.setWeekStart(this.yearSelectedStart, this.monthSelectedStart, this.daySelectedStart);
            },
            monthInitEnd(date) {
                const[dateStart, dateEnd]=this.dateFormat(date);
                const dateS=dateStart.substr(0, 10);
                const dateE=dateEnd.substr(0, 10);
                const countMonthEnd=new CountMonth(dateE); // 当前计算年、月的对象
                const monthsArrayEnd=countMonthEnd.getMonthsArray();
                this.monthsArrayEnd=monthsArrayEnd;

                if (this.selectedDateEnd) this.setMonthEnd(this.yearSelectedEnd, this.monthSelectedEnd);

                // 初始化开始时间对象
                const [ys]=dateS.split('.'), [ye]=dateE.split('.');
                if (ye===ys) {
                    const year=String(monthsArrayEnd[0].year-1);
                    this.yearActiveStart=year;
                    this.monthInitStart(year+'.01.01');
                } else {
                    this.monthInitStart(dateS);
                }
            },
            monthInitStart(date) {
                const countMonthStart=new CountMonth(date); // 当前计算年的对象
                this.monthsArrayStart=countMonthStart.getMonthsArray();

                if (this.selectedDateStart) this.setMonthStart(this.yearSelectedStart, this.monthSelectedStart);

                this.disableArrow();
            },
            yearInitEnd(date, panel) {
                let dateEnd='';
                if (panel) {
                    dateEnd=date;
                } else {
                    const[DS, DE]=this.dateFormat(date);
                    dateEnd=DE;
                }
                const dateE=dateEnd.substr(0, 4);
                const countYearEnd=new CountYear(dateE); // 当前计算年的对象
                const yearsArrayEnd=countYearEnd.getYearsArray();
                this.yearsArrayEnd=yearsArrayEnd;
                this.yearActiveEndLeft=yearsArrayEnd[0].year;
                this.yearActiveEndRight=yearsArrayEnd[11].year;
                if (this.selectedDateEnd) this.setYearEnd(this.yearSelectedEnd);

                // 初始化开始时间对象
                if (!panel) this.yearInitStart((yearsArrayEnd[0].year-1).toString());
            },
            yearInitStart(date) {
                const countYearStart=new CountYear(date); // 当前计算年的对象
                const yearsArrayStart=countYearStart.getYearsArray();
                this.yearsArrayStart=yearsArrayStart;
                this.yearActiveStartLeft=yearsArrayStart[0].year;
                this.yearActiveStartRight=yearsArrayStart[11].year;
                if (this.selectedDateStart) this.setYearStart(this.yearSelectedStart);

                this.disableArrow();
            },
            /**
             * 设置选择的年月日
             * @param date String 2019.10.31
             */
            setDayEnd(date) {
                if (!date) return;
                const [year, month, day]=date.split('.'); // 获取传入的时间、日期

                this.yearSelectedEnd=year;
                this.monthSelectedEnd=month;
                this.daySelectedEnd=day;
                this.changeDaysArrayEnd({year, month, day});
            },
            /**
             * 设置选择的年月日
             * @param date String 2019.10.31
             */
            setDayStart(date) {
                if (!date) return;
                const [year, month, day]=date.split('.'); // 获取传入的时间、日期

                this.yearSelectedStart=year;
                this.monthSelectedStart=month;
                this.daySelectedStart=day;
                this.changeDaysArrayStart({year, month, day});
            },
            setWeekEnd(Y, M, D) {
                const reg=/[.第周]/g;
                const YS=this.yearSelectedStart, MS=this.monthSelectedStart, DS=this.daySelectedStart;
                const YE=Y, ME=M, DE=D;
                const wa=this.weeksArrayEnd;

                // 结束时间
                const obj=wa.find(d => d.weeks.some(d2 => d2.year===YE && d2.month===ME && d2.day===DE));
                console.log('setWeekEnd:::', obj);
                let weeks2=[], thText2='';
                if (obj && obj.hasOwnProperty('weeks')) {
                    const {weeks, thText}=obj;
                    weeks2=weeks;
                    thText2=thText;
                }
                this.weeksSelectedEnd=weeks2;
                this.thTextSelectedEnd=thText2;
                this.clickThTextSelectedEnd=thText2;
                const dateE=thText2.replace(reg, '');
                if (YS===YE && MS===ME) { // 开始结束在同一月
                    // 开始时间
                    const {weeks, thText}=wa.find(d => d.weeks.some(d2 => d2.year===YS && d2.month===MS && d2.day===DS));
                    this.weeksSelectedStart=weeks;
                    this.thTextSelectedStart=thText;
                    this.clickThTextSelectedStart=thText;

                    const dateS=thText.replace(reg, '');
                    this.thTextSelected=thText+'-'+thText2;

                    this.weeksArrayEnd=wa.map(d => {
                        if (d.flag === 'n') {
                            const dateC=d.thText.replace(reg, '');
                            if (dateC === dateS || dateC === dateE) {
                                d.selected='selected';
                            } else if ((dateC > dateS && dateC < dateE) || (dateC < dateS && dateC > dateE)) {
                                d.multiple='multiple';
                            }
                        }
                        return d;
                    });
                } else {
                    this.weeksArrayEnd=wa.map(d => {
                        if (d.flag === 'n') {
                            const dateC=d.thText.replace(reg, '');
                            if (dateC === dateE) {
                                d.selected='selected';
                            } else if (dateC < dateE) {
                                d.multiple='multiple';
                            }
                        }
                        return d;
                    });
                }
            },
            setWeekStart(Y, M, D) {
                const reg=/[.第周]/g;
                const YS=Y, MS=M, DS=D;
                const YE=this.yearSelectedEnd, ME=this.monthSelectedEnd, DE=this.daySelectedEnd;
                if (YS===YE && MS===ME) return;
                const wa=this.weeksArrayStart;

                let weeks2=[], thText2='';
                const obj=wa.find(d => d.weeks.some(d2 => d2.year===YS && d2.month===MS && d2.day===DS));
                if (obj && obj.hasOwnProperty('weeks')) {
                    const {weeks, thText}=obj;
                    weeks2=weeks;
                    thText2=thText;
                }
                this.weeksSelectedStart=weeks2;
                this.thTextSelectedStart=thText2;
                this.clickThTextSelectedStart=thText2;
                const dateS=thText2.replace(reg, '');

                this.weeksArrayStart=wa.map(d => {
                    if (d.flag === 'n') {
                        const dateC=d.thText.replace(reg, '');
                        if (dateC===dateS) d.selected='selected';
                        else if (dateC>dateS) d.multiple='multiple';
                    }
                    return d;
                });
            },
            setMonthEnd(Y, M) {
                const dateS=this.yearSelectedStart+this.monthSelectedStart;
                const dateE=Y+M;
                this.yearSelectedEnd=Y;
                this.monthSelectedEnd=M;
                this.clickSelectedDateEnd=Y+'.'+M;
                // 设置默认选中状态
                const monthsArray=this.monthsArrayEnd;
                if (dateE-dateS<=12) {
                    this.monthsArrayEnd=monthsArray.map(d => {
                        const dateC=d.year+d.month;
                        if (dateC===dateS || dateC===dateE) d.selected='selected';
                        else if (dateC>dateS && dateC<dateE) d.multiple='multiple';
                        return d;
                    })
                } else {
                    this.monthsArrayEnd=monthsArray.map(d => {
                        const dateC=d.year+d.month;
                        if (dateC===dateE) d.selected='selected';
                        else if (dateC<dateE) d.multiple='multiple';
                        return d;
                    })
                }
            },
            setMonthStart(Y, M) {
                const dateS=Y+M;
                const dateE=this.yearSelectedEnd+this.monthSelectedEnd;
                this.yearSelectedStart=Y;
                this.monthSelectedStart=M;
                this.clickSelectedDateStart=Y+'.'+M;

                if (dateE-dateS>12) {
                    // 设置默认选中状态
                    const monthsArray=this.monthsArrayStart;
                    this.monthsArrayStart=monthsArray.map(d => {
                        const dateC=d.year+d.month;
                        if (dateC===dateS) d.selected='selected';
                        else if (dateC>dateS) d.multiple='multiple';
                        return d;
                    })
                }
            },
            setYearEnd(Y) {
                this.clickSelectedDateEnd=Y;
                const yearsArray=this.yearsArrayEnd, ys=this.yearSelectedStart, ye=this.yearSelectedEnd;
                if (ye-ys<=12) {
                    this.yearsArrayEnd=yearsArray.map(d => {
                        if (d.year===ys || d.year===ye) d.selected='selected';
                        else if (d.year>ys && d.year<ye) d.multiple='multiple';
                        return d;
                    })
                } else {
                    this.yearsArrayEnd=yearsArray.map(d => {
                        if (d.year===ye) d.selected='selected';
                        else if (d.year<ye) d.multiple='multiple';
                        return d;
                    })
                }
            },
            setYearStart(Y) {
                this.clickSelectedDateStart=Y;
                const yearsArray=this.yearsArrayStart, ys=this.yearSelectedStart, ye=this.yearSelectedEnd;
                this.yearsArrayStart=yearsArray.map(d => {
                    if (d.year===ys) {
                        d.selected='selected';
                    } else if (d.year>ye) {
                        d.multiple='multiple';
                    }
                    return d;
                })
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
             * 改变选中状态
             * @param thText
             * @param clearOther Boolean 清空其他
             */
            changeWeeksArrayEnd(thText, clearOther) {
                const reg=/[.第周]/g;
                const dateE=thText.replace(reg, '');
                const dateS=this.clickThTextSelectedStart.replace(reg, '');
                this.weeksArrayEnd=this.weeksArrayEnd.map(d => {
                    if (d.flag === 'n') {
                        const dateC=d.thText.replace(reg, '');
                        if ((this.clickYearSelectedStart+'.'+this.clickMonthSelectedStart) === (this.clickYearSelectedEnd+'.'+this.clickMonthSelectedEnd)) {
                            if (d.thText===thText || d.thText === this.clickThTextSelectedStart) {
                                d.selected='selected';
                            } else if ((dateC < dateE && dateC > dateS) || (dateC > dateE && dateC < dateS)) {
                                d.multiple='multiple';
                            } else if (clearOther) {
                                d.selected='';
                                d.multiple='';
                            }
                        } else {
                            if (d.thText===thText) {
                                d.selected='selected';
                            } else if (dateS && dateC < dateE) {
                                d.multiple='multiple';
                            } else if (clearOther) {
                                d.selected='';
                                d.multiple='';
                            }
                        }
                    }
                    return d;
                })
            },
            /**
             * 改变选中状态
             * @param thText
             * @param clearOther Boolean 清空其他
             */
            changeWeeksArrayStart(thText, clearOther) {
                const reg=/[.第周]/g;
                const dateS=thText.replace(reg, '');
                const dateE=this.clickThTextSelectedEnd.replace(reg, '');
                this.weeksArrayStart=this.weeksArrayStart.map(d => {
                    if (d.flag === 'n') {
                        const dateC=d.thText.replace(reg, '');
                        if ((this.clickYearSelectedStart+'.'+this.clickMonthSelectedStart) === (this.clickYearSelectedEnd+'.'+this.clickMonthSelectedEnd)) {
                            if (d.thText===thText || d.thText === this.clickThTextSelectedEnd) {
                                d.selected='selected';
                            } else if ((dateC < dateE && dateC > dateS) || (dateC > dateE && dateC < dateS)) {
                                d.multiple='multiple';
                            } else if (clearOther) {
                                d.selected='';
                                d.multiple='';
                            }
                        } else {
                            if (d.thText===thText) {
                                d.selected='selected';
                            } else if (dateE && dateC > dateS) {
                                d.multiple='multiple';
                            } else if (clearOther) {
                                d.selected='';
                                d.multiple='';
                            }
                        }
                    }
                    return d;
                })
            },
            changeMonthsArrayEnd({year, month}, clearOther) {
                this.monthsArrayEnd=this.monthsArrayEnd.map(d => {
                    if (d.year===year && d.month===month) {
                        d.selected='selected';
                    } else if (clearOther) {
                        d.selected='';
                        d.multiple='';
                    }
                    return d;
                })
            },
            changeMonthsArrayStart({year, month}, clearOther) {
                this.monthsArrayStart=this.monthsArrayStart.map(d => {
                    if (d.year===year && d.month===month) {
                        d.selected='selected';
                    } else if (clearOther) {
                        d.selected='';
                        d.multiple='';
                    }
                    return d;
                })
            },
            changeYearsArrayEnd(year, clearOther) {
                this.yearsArrayEnd=this.yearsArrayEnd.map(d => {
                    if (d.year===year) {
                        d.selected='selected';
                    } else if (clearOther) {
                        d.selected='';
                        d.multiple='';
                    }
                    return d;
                })
            },
            changeYearsArrayStart(year, clearOther) {
                this.yearsArrayStart=this.yearsArrayStart.map(d => {
                    if (d.year===year) {
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
                this.selectedDateStart='';
                this.selectedDateEnd='';
                this.clickSelectedDateStart='';
                this.clickSelectedDateEnd='';
                this.timeStart='';
                this.timeEnd='';
                this.yearSelectedStart='';
                this.monthSelectedStart='';
                this.daySelectedStart='';
                this.clickYearSelectedStart='';
                this.clickMonthSelectedStart='';
                this.clickDaySelectedStart='';
                this.yearSelectedEnd='';
                this.monthSelectedEnd='';
                this.daySelectedEnd='';
                this.clickYearSelectedEnd='';
                this.clickMonthSelectedEnd='';
                this.clickDaySelectedEnd='';
                this.thTextSelectedStart='';
                this.thTextSelectedEnd='';
                this.clickThTextSelectedStart='';
                this.clickThTextSelectedEnd='';
                this.weeksSelectedStart=[];
                this.weeksSelectedEnd=[];
                this.$emit('change', '');
                this.pickerClearHide();
                this.btnType='disabled';
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
            switchDayStart(date) {
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
            switchDayEnd(date) {
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
            switchWeekStart(Y, M) {
                this.yearActiveStart=Y;
                this.monthActiveStart=M;
                this.countWeekStart.setYearMonth(Y, M);
                this.weeksArrayStart=this.countWeekStart.getWeeksArray();
                this.changeWeeksArrayStart(this.thTextSelectedStart, false);
                this.disableArrow();
            },
            switchWeekEnd(Y, M) {
                this.yearActiveEnd=Y;
                this.monthActiveEnd=M;
                this.countWeekEnd.setYearMonth(Y, M);
                this.weeksArrayEnd=this.countWeekEnd.getWeeksArray();
                this.changeWeeksArrayEnd(this.thTextSelectedEnd, false);
                this.disableArrow();
            },
            switchMonthStart(date) {
                const countMonthStart=new CountMonth(date); // 当前计算天的对象
                this.monthsArrayStart=countMonthStart.getMonthsArray();

                const dateS=this.yearSelectedStart+this.monthSelectedStart;
                const dateE=this.yearSelectedEnd+this.monthSelectedEnd;

                if (dateS > dateE) {
                    this.monthsArrayStart=this.monthsArrayStart.map(d => {
                        const dateC=d.year+d.month;
                        if (dateC > dateE && dateC < dateS) d.multiple='multiple';
                        if (dateC === dateS || dateC === dateE) d.selected='selected';
                        return d;
                    })
                } else {
                    this.monthsArrayStart=this.monthsArrayStart.map(d => {
                        const dateC=d.year+d.month;
                        if (dateC > dateS && dateC < dateE) d.multiple='multiple';
                        if (dateC === dateS || dateC === dateE) d.selected='selected';
                        return d;
                    })
                }

                this.disableArrow();
            },
            switchMonthEnd(date) {
                const countMonthEnd=new CountMonth(date); // 当前计算天的对象
                this.monthsArrayEnd=countMonthEnd.getMonthsArray();
                const dateS=this.yearSelectedStart+this.monthSelectedStart;
                const dateE=this.yearSelectedEnd+this.monthSelectedEnd;
                if (dateS > dateE) {
                    this.monthsArrayEnd=this.monthsArrayEnd.map(d => {
                        const dateC=d.year+d.month;
                        if (dateC > dateE && dateC < dateS) d.multiple='multiple';
                        if (dateC === dateS || dateC === dateE) d.selected='selected';
                        return d;
                    })
                } else {
                    this.monthsArrayEnd=this.monthsArrayEnd.map(d => {
                        const dateC=d.year+d.month;
                        if (dateC > dateS && dateC < dateE) d.multiple='multiple';
                        if (dateC === dateS || dateC === dateE) d.selected='selected';
                        return d;
                    })
                }

                this.disableArrow();
            },
            switchYearStart(date) {
                this.countYearStart=new CountYear(date); // 当前计算天的对象
                const yearsArrayStart=this.countYearStart.getYearsArray();
                this.yearsArrayStart=yearsArrayStart;
                this.yearActiveStartLeft=yearsArrayStart[0].year;
                this.yearActiveStartRight=yearsArrayStart[yearsArrayStart.length-1].year;

                const dateS=this.yearSelectedStart;
                const dateE=this.yearSelectedEnd;

                if (dateS > dateE) {
                    this.yearsArrayStart=this.yearsArrayStart.map(d => {
                        if (d.year > dateE && d.year < dateS) d.multiple='multiple';
                        if (d.year === dateS || d.year === dateE) d.selected='selected';
                        return d;
                    })
                } else {
                    this.yearsArrayStart=this.yearsArrayStart.map(d => {
                        if (d.year > dateS && d.year < dateE) d.multiple='multiple';
                        if (d.year === dateS || d.year === dateE) d.selected='selected';
                        return d;
                    })
                }

                this.disableArrow();
            },
            switchYearEnd(date) {
                this.countYearEnd=new CountYear(date); // 当前计算天的对象
                const yearsArrayEnd=this.countYearEnd.getYearsArray();
                this.yearsArrayEnd=yearsArrayEnd;
                this.yearActiveEndLeft=yearsArrayEnd[0].year;
                this.yearActiveEndRight=yearsArrayEnd[yearsArrayEnd.length-1].year;

                const dateS=this.yearSelectedStart;
                const dateE=this.yearSelectedEnd;
                if (dateS > dateE) {
                    this.yearsArrayEnd=this.yearsArrayEnd.map(d => {
                        if (d.year > dateE && d.year < dateS) d.multiple='multiple';
                        if (d.year === dateS || d.year === dateE) d.selected='selected';
                        return d;
                    })
                } else {
                    this.yearsArrayEnd=this.yearsArrayEnd.map(d => {
                        if (d.year > dateS && d.year < dateE) d.multiple='multiple';
                        if (d.year === dateS || d.year === dateE) d.selected='selected';
                        return d;
                    })
                }

                this.disableArrow();
            },

            /**
             * 上一年
             */
            prevYearStart() {
                const tabKey=this.tabKey;

                switch (tabKey) {
                    case 'day':
                        (() => {
                            const date=CountPrevYear([this.yearActiveStart, this.monthActiveStart, this.dayActiveStart]);
                            this.switchDayStart(date);
                        })();
                        break;
                    case 'week':
                        (() => {
                            const date=CountPrevYear([this.yearActiveStart, this.monthActiveStart, '01']);
                            const [Y, M]=date.split('.');
                            this.switchWeekStart(Y, M);
                        })();
                        break;
                    case 'month':
                        (() => {
                            const date=(this.yearActiveStart-1).toString();
                            this.yearActiveStart=date;
                            this.switchMonthStart(date+'.'+this.monthActiveStart);
                        })();
                        break;
                    case 'year':
                        (() => {
                            const date=(this.yearsArrayStart.shift().year-1).toString();
                            this.switchYearStart(date);
                        })();
                        break;
                    default:
                        break;
                }
            },
            /**
             * 上一年
             */
            prevYearEnd() {
                const tabKey=this.tabKey;

                switch (tabKey) {
                    case 'day':
                        (() => {
                            const date=CountPrevYear([this.yearActiveEnd, this.monthActiveEnd, this.dayActiveEnd]);
                            this.switchDayEnd(date);
                        })();
                        break;
                    case 'week':
                        (() => {
                            const date=CountPrevYear([this.yearActiveEnd, this.monthActiveEnd, '01']);
                            const [Y, M]=date.split('.');
                            this.switchWeekEnd(Y, M);
                        })();
                        break;
                    case 'month':
                        (() => {
                            const date=(this.yearActiveEnd-1).toString();
                            this.yearActiveEnd=date;
                            this.switchMonthEnd(date+'.'+this.monthActiveEnd);
                        })();
                        break;
                    case 'year':
                        (() => {
                            const date=(this.yearsArrayEnd.shift().year-1).toString();
                            this.switchYearEnd(date);
                        })();
                        break;
                    default:
                        break;
                }
            },
            /**
             * 下一年
             */
            nextYearStart() {
                const tabKey=this.tabKey;

                switch (tabKey) {
                    case 'day':
                        (() => {
                            const date=CountNextYear([this.yearActiveStart, this.monthActiveStart, this.dayActiveStart]);
                            this.switchDayStart(date);
                        })();
                        break;
                    case 'week':
                        (() => {
                            const date=CountNextYear([this.yearActiveStart, this.monthActiveStart, '01']);
                            const [Y, M]=date.split('.');
                            this.switchWeekStart(Y, M);
                        })();
                        break;
                    case 'month':
                        (() => {
                            const date=(parseInt(this.yearActiveStart)+1).toString();
                            this.yearActiveStart=date;
                            this.switchMonthStart(date+'.'+this.monthActiveStart);
                        })();
                        break;
                    case 'year':
                        (() => {
                            const date=(parseInt(this.yearsArrayStart.pop().year)+12).toString();
                            this.switchYearStart(date);
                        })();
                        break;
                    default:
                        break;
                }
            },
            /**
             * 下一年
             */
            nextYearEnd() {
                const tabKey=this.tabKey;

                switch (tabKey) {
                    case 'day':
                        (() => {
                            const date=CountNextYear([this.yearActiveEnd, this.monthActiveEnd, this.dayActiveEnd]);
                            this.switchDayEnd(date);
                        })();
                        break;
                    case 'week':
                        (() => {
                            const date=CountNextYear([this.yearActiveEnd, this.monthActiveEnd, '01']);
                            const [Y, M]=date.split('.');
                            this.switchWeekEnd(Y, M);
                        })();
                        break;
                    case 'month':
                        (() => {
                            const date=(parseInt(this.yearActiveEnd)+1).toString();
                            this.yearActiveEnd=date;
                            this.switchMonthEnd(date+'.'+this.monthActiveEnd);
                        })();
                        break;
                    case 'year':
                        (() => {
                            const date=(parseInt(this.yearsArrayEnd.pop().year)+12).toString();
                            this.switchYearEnd(date);
                        })();
                        break;
                    default:
                        break;
                }
            },
            /**
             * 上一月
             */
            prevMonthStart() {
                const tabKey=this.tabKey;

                switch (tabKey) {
                    case 'day':
                        (() => {
                            const date=CountPrevMonth([this.yearActiveStart, this.monthActiveStart, this.dayActiveStart]);
                            this.switchDayStart(date);
                        })();
                        break;
                    case 'week':
                        (() => {
                            const date=CountPrevMonth([this.yearActiveStart, this.monthActiveStart, '01']);
                            const [Y, M]=date.split('.');
                            this.switchWeekStart(Y, M);
                        })();
                        break;
                    default:
                        break;
                }
            },
            /**
             * 上一月
             */
            prevMonthEnd() {
                const tabKey=this.tabKey;

                switch (tabKey) {
                    case 'day':
                        (() => {
                            const date=CountPrevMonth([this.yearActiveEnd, this.monthActiveEnd, this.dayActiveEnd]);
                            this.switchDayEnd(date);
                        })();
                        break;
                    case 'week':
                        (() => {
                            const date=CountPrevMonth([this.yearActiveEnd, this.monthActiveEnd, '01']);
                            const [Y, M]=date.split('.');
                            this.switchWeekEnd(Y, M);
                        })();
                        break;
                    default:
                        break;
                }
            },
            /**
             * 下一月
             */
            nextMonthStart() {
                const tabKey=this.tabKey;

                switch (tabKey) {
                    case 'day':
                        (() => {
                            const date=CountNextMonth([this.yearActiveStart, this.monthActiveStart, this.dayActiveStart]);
                            this.switchDayStart(date);
                        })();
                        break;
                    case 'week':
                        (() => {
                            const date=CountNextMonth([this.yearActiveStart, this.monthActiveStart, '01']);
                            const [Y, M]=date.split('.');
                            this.switchWeekStart(Y, M);
                        })();
                        break;
                    default:
                        break;
                }
            },
            /**
             * 下一月
             */
            nextMonthEnd() {
                const tabKey=this.tabKey;

                switch (tabKey) {
                    case 'day':
                        (() => {
                            const date=CountNextMonth([this.yearActiveEnd, this.monthActiveEnd, this.dayActiveEnd]);
                            this.switchDayEnd(date);
                        })();
                        break;
                    case 'week':
                        (() => {
                            const date=CountNextMonth([this.yearActiveEnd, this.monthActiveEnd, '01']);
                            const [Y, M]=date.split('.');
                            this.switchWeekEnd(Y, M);
                        })();
                        break;
                    default:
                        break;
                }
            },

            // 点击active的年，去选择active的年
            yearActiveClickStart() {
                if (this.tabKey==='year') return;
                let year=this.yearActiveStart;
                if (this.panelYearEnd) year=String(this.yearActiveEndLeft-1);
                this.yearInitStart(year, true);
                this.panelYearStart=true;
            },
            yearActiveClickEnd() {
                if (this.tabKey==='year') return;
                let year=String(Number(this.yearActiveStart)+12);
                if (this.panelYearStart) year=String(Number(this.yearActiveStartRight)+12);
                this.yearInitEnd(year, true);
                this.panelYearEnd=true;
            },
            // 点击active的月，去选择active的月
            monthActiveClickStart() {
                if (this.tabKey==='month') return;
                this.monthInit(this.yearActiveStart+'.'+this.monthActiveStart, true);
                this.panelMonthStart=true;
            },
            monthActiveClickEnd() {
            },
            /**
             * 点击日期-开始日期
             * @param obj {year, month, day}
             */
            dayChangeStart({year, month, day}) {
                let clearOther=false;
                if (this.clickYearSelectedStart && this.clickYearSelectedEnd) {
                    this.clickYearSelectedStart=year;
                    this.clickMonthSelectedStart=month;
                    this.clickDaySelectedStart=day;
                    this.clickSelectedDateStart=year+'.'+month+'.'+day+(this.format&&this.timeStart?' '+this.timeStart:'');

                    this.clickYearSelectedEnd='';
                    this.clickMonthSelectedEnd='';
                    this.clickDaySelectedEnd='';
                    this.clickSelectedDateEnd='';
                    clearOther=true;

                    this.changeDaysArrayEnd({year: '', month: '', day: ''}, clearOther);
                } else if (this.clickYearSelectedStart && !this.clickYearSelectedEnd) {
                    this.clickYearSelectedEnd=year;
                    this.clickMonthSelectedEnd=month;
                    this.clickDaySelectedEnd=day;
                    this.clickSelectedDateEnd=year+'.'+month+'.'+day+(this.format&&this.timeEnd?' '+this.timeEnd:'');
                } else {
                    this.clickYearSelectedStart=year;
                    this.clickMonthSelectedStart=month;
                    this.clickDaySelectedStart=day;
                    this.clickSelectedDateStart=year+'.'+month+'.'+day+(this.format&&this.timeStart?' '+this.timeStart:'');
                }

                if (this.clickYearSelectedStart && this.clickYearSelectedEnd) this.btnType='primary';
                else this.btnType='disabled';

                this.changeDaysArrayStart({year, month, day}, clearOther);
            },
            /**
             * 点击日期-结束日期
             * @param obj {year, month, day}
             */
            dayChangeEnd({year, month, day}) {
                let clearOther=false;
                if (this.clickYearSelectedStart && this.clickYearSelectedEnd) {
                    this.clickYearSelectedEnd=year;
                    this.clickMonthSelectedEnd=month;
                    this.clickDaySelectedEnd=day;
                    this.clickSelectedDateEnd=year+'.'+month+'.'+day+(this.format&&this.timeEnd?' '+this.timeEnd:'');

                    this.clickYearSelectedStart='';
                    this.clickMonthSelectedStart='';
                    this.clickDaySelectedStart='';
                    this.clickSelectedDateStart='';
                    clearOther=true;

                    this.changeDaysArrayStart({year: '', month: '', day: ''}, clearOther);
                } else if (!this.yearSelectedStart && this.yearSelectedEnd) {
                    this.clickYearSelectedStart=year;
                    this.clickMonthSelectedStart=month;
                    this.clickDaySelectedStart=day;
                    this.clickSelectedDateStart=year+'.'+month+'.'+day+(this.format&&this.timeStart?' '+this.timeStart:'');
                } else {
                    this.clickYearSelectedEnd=year;
                    this.clickMonthSelectedEnd=month;
                    this.clickDaySelectedEnd=day;
                    this.clickSelectedDateEnd=year+'.'+month+'.'+day+(this.format&&this.timeEnd?' '+this.timeEnd:'');
                }

                if (this.clickYearSelectedStart && this.clickYearSelectedEnd) this.btnType='primary';
                else this.btnType='disabled';

                this.changeDaysArrayEnd({year, month, day}, clearOther);
            },
            /**
             * 点击日期-开始日期
             * @param obj {weeks, year, month, thText}
             */
            weekChangeStart({weeks, year, month, thText}) {
                let clearOther=false;
                if (this.clickThTextSelectedStart && this.clickThTextSelectedEnd) {
                    this.weeksSelectedStart=weeks;
                    this.clickYearSelectedStart=year;
                    this.clickMonthSelectedStart=month;
                    this.clickThTextSelectedStart=thText;
                    this.clickSelectedDateStart=year+'.'+month;

                    this.weeksSelectedEnd=[];
                    this.clickYearSelectedEnd='';
                    this.clickMonthSelectedEnd='';
                    this.clickThTextSelectedEnd='';
                    this.clickSelectedDateEnd='';
                    clearOther=true;
                    this.changeWeeksArrayEnd(thText, clearOther);
                } else if (this.clickThTextSelectedStart && !this.clickThTextSelectedEnd) {
                    this.weeksSelectedEnd=weeks;
                    this.clickYearSelectedEnd=year;
                    this.clickMonthSelectedEnd=month;
                    this.clickThTextSelectedEnd=thText;
                    this.clickSelectedDateEnd=year+'.'+month;
                } else {
                    this.weeksSelectedStart=weeks;
                    this.clickYearSelectedStart=year;
                    this.clickMonthSelectedStart=month;
                    this.clickThTextSelectedStart=thText;
                    this.clickSelectedDateStart=year+'.'+month;
                }

                if (this.clickThTextSelectedStart && this.clickThTextSelectedEnd) this.btnType='primary';
                else this.btnType='disabled';
                this.changeWeeksArrayStart(thText, clearOther);
            },
            /**
             * 点击日期-结束日期
             * @param obj {weeks, year, month, thText}
             */
            weekChangeEnd({weeks, year, month, thText}) {
                let clearOther=false;
                if (this.clickThTextSelectedStart && this.clickThTextSelectedEnd) {
                    this.weeksSelectedEnd=weeks;
                    this.clickYearSelectedEnd=year;
                    this.clickMonthSelectedEnd=month;
                    this.clickThTextSelectedEnd=thText;
                    this.clickSelectedDateEnd=year+'.'+month;

                    this.weeksSelectedStart=[];
                    this.clickYearSelectedStart='';
                    this.clickMonthSelectedStart='';
                    this.clickThTextSelectedStart='';
                    this.clickSelectedDateStart='';
                    clearOther=true;
                    this.changeWeeksArrayStart(thText, clearOther);
                } else if (!this.clickThTextSelectedStart && this.clickThTextSelectedEnd) {
                    this.weeksSelectedStart=weeks;
                    this.clickYearSelectedStart=year;
                    this.clickMonthSelectedStart=month;
                    this.clickThTextSelectedStart=thText;
                    this.clickSelectedDateStart=year+'.'+month;
                } else {
                    this.weeksSelectedEnd=weeks;
                    this.clickYearSelectedEnd=year;
                    this.clickMonthSelectedEnd=month;
                    this.clickThTextSelectedEnd=thText;
                    this.clickSelectedDateEnd=year+'.'+month;
                }

                if (this.clickThTextSelectedStart && this.clickThTextSelectedEnd) this.btnType='primary';
                else this.btnType='disabled';
                this.changeWeeksArrayEnd(thText, clearOther);
            },
            /**
             * 点击日期-结束日期-月
             * @param obj {year, month}
             */
            monthChangeStart({year, month}) {
                let clearOther=false;
                if (this.clickYearSelectedStart && this.clickYearSelectedEnd) {
                    this.clickYearSelectedStart=year;
                    this.clickMonthSelectedStart=month;
                    this.clickSelectedDateStart=year+'.'+month;

                    this.clickYearSelectedEnd='';
                    this.clickMonthSelectedEnd='';
                    this.clickSelectedDateEnd='';
                    clearOther=true;

                    this.changeMonthsArrayEnd({year: '', month: ''}, clearOther);
                } else if (this.clickYearSelectedStart && !this.clickYearSelectedEnd) {
                    this.clickYearSelectedEnd=year;
                    this.clickMonthSelectedEnd=month;
                    this.clickSelectedDateEnd=year+'.'+month;
                } else {
                    this.clickYearSelectedStart=year;
                    this.clickMonthSelectedStart=month;
                    this.clickSelectedDateStart=year+'.'+month;
                }

                if (this.clickYearSelectedStart && this.clickYearSelectedEnd) this.btnType='primary';
                else this.btnType='disabled';

                this.changeMonthsArrayStart({year, month}, clearOther);
            },
            /**
             * 点击日期-结束日期-月
             * @param obj {year, month}
             */
            monthChangeEnd({year, month}) {
                let clearOther=false;
                if (this.clickYearSelectedStart && this.clickYearSelectedEnd) {
                    this.clickYearSelectedEnd=year;
                    this.clickMonthSelectedEnd=month;
                    this.clickSelectedDateEnd=year+'.'+month;

                    this.clickYearSelectedStart='';
                    this.clickMonthSelectedStart='';
                    this.clickSelectedDateStart='';
                    clearOther=true;

                    this.changeMonthsArrayStart({year: '', month: ''}, clearOther);
                } else if (!this.clickYearSelectedStart && this.clickYearSelectedEnd) {
                    this.clickYearSelectedStart=year;
                    this.clickMonthSelectedStart=month;
                    this.clickSelectedDateStart=year+'.'+month;
                } else {
                    this.clickYearSelectedEnd=year;
                    this.clickMonthSelectedEnd=month;
                    this.clickSelectedDateEnd=year+'.'+month;
                }

                if (this.clickYearSelectedStart && this.clickYearSelectedEnd) this.btnType='primary';
                else this.btnType='disabled';

                this.changeMonthsArrayEnd({year, month}, clearOther);
            },
            yearChangeStart(year) {
                let clearOther=false;
                if (this.panelYearStart) {
                    this.yearActiveStart=year;
                    switch (this.tabKey) {
                        case 'day':
                            this.dayInitStart(year+'.'+this.monthActiveStart+'.'+this.dayActiveStart);
                            break;
                        case 'week':
                            this.weekInitStart(year);
                            break;
                        case 'month':
                            this.monthInitStart(year);
                            break;
                        default:
                            break;
                    }
                    this.panelYearStart=false;
                } else {
                    if (this.clickYearSelectedStart && this.clickYearSelectedEnd) {
                        this.clickYearSelectedStart=year;
                        this.clickSelectedDateStart=year;

                        this.clickYearSelectedEnd='';
                        this.clickSelectedDateEnd='';
                        clearOther=true;

                        this.changeYearsArrayEnd('', clearOther);
                    } else if (this.clickYearSelectedStart && !this.clickYearSelectedEnd) {
                        this.clickYearSelectedEnd=year;
                        this.clickSelectedDateEnd=year;
                    } else {
                        this.clickYearSelectedStart=year;
                        this.clickSelectedDateStart=year;
                    }

                    if (this.clickYearSelectedStart && this.clickYearSelectedEnd) this.btnType='primary';
                    else this.btnType='disabled';
                }

                this.changeYearsArrayStart(year, clearOther);
            },
            yearChangeEnd(year) {
                let clearOther=false;
                if (this.panelYearEnd) {
                    this.yearActiveEnd=year;
                    switch (this.tabKey) {
                        case 'day':
                            this.dayInitEnd(
                                year+'.'+this.monthActiveStart+'.'+this.dayActiveStart+(this.format&&this.timeStart?' '+this.timeStart:'')
                                +'-'+
                                year+'.'+this.monthActiveEnd+'.'+this.dayActiveEnd+(this.format&&this.timeEnd?' '+this.timeEnd:'')
                            );
                            break;
                        case 'week':
                            this.weekInitEnd(year);
                            break;
                        case 'month':
                            this.monthInitEnd(year);
                            break;
                        default:
                            break;
                    }
                    this.panelYearEnd=false;
                } else {
                    if (this.clickYearSelectedStart && this.clickYearSelectedEnd) {
                        this.clickYearSelectedEnd=year;
                        this.clickSelectedDateEnd=year;

                        this.clickYearSelectedStart='';
                        this.clickSelectedDateStart='';
                        clearOther=true;

                        this.changeYearsArrayStart('', clearOther);
                    } else if (!this.clickYearSelectedStart && this.clickYearSelectedEnd) {
                        this.clickYearSelectedStart=year;
                        this.clickSelectedDateStart=year;
                    } else {
                        this.clickYearSelectedEnd=year;
                        this.clickSelectedDateEnd=year;
                    }

                    if (this.clickYearSelectedStart && this.clickYearSelectedEnd) this.btnType='primary';
                    else this.btnType='disabled';
                }

                this.changeYearsArrayEnd(year, clearOther);
            },
            timeChangeStart() {},
            timeChangeEnd() {},
            /**
             * 鼠标进入-开始日期-日
             * @param obj {year, month, day}
             */
            dayEnterStart({year, month, day}) {
                if ((!this.clickYearSelectedStart && !this.clickYearSelectedEnd) || (this.clickYearSelectedStart && this.clickYearSelectedEnd)) return;
                const daysArray=this.daysArrayStart;
                const dateS=this.clickYearSelectedStart+this.clickMonthSelectedStart+this.clickDaySelectedStart;
                const dateE=this.clickYearSelectedEnd+this.clickMonthSelectedEnd+this.clickDaySelectedEnd;
                const dateN=year+month+day;

                // 当前传入时间的索引
                const nInd=daysArray.findIndex(d => d.flag === 'n' && d.year===year&&d.month===month&&d.day===day);
                // 已选择的时间的索引
                const sInd=daysArray.findIndex(d => d.flag === 'n' && d.year===this.clickYearSelectedStart&&d.month===this.clickMonthSelectedStart&&d.day===this.clickDaySelectedStart);

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
                        if (d.flag==='n'&&d.year+d.month+d.day >= dateN) d.multiple='multiple';
                        else d.multiple='';
                        return d;
                    })
                }
            },
            /**
             * 鼠标进入-结束日期-日
             * @param obj {year, month, day}
             */
            dayEnterEnd({year, month, day}) {
                if ((!this.clickYearSelectedStart && !this.clickYearSelectedEnd) || (this.clickYearSelectedStart && this.clickYearSelectedEnd)) return;
                const daysArray=this.daysArrayEnd;
                const dateS=this.clickYearSelectedStart+this.clickMonthSelectedStart+this.clickDaySelectedStart;
                const dateE=this.clickYearSelectedEnd+this.clickMonthSelectedEnd+this.clickDaySelectedEnd;
                const dateN=year+month+day;

                // 当前传入时间的索引
                const nInd=daysArray.findIndex(d => d.year===year&&d.month===month&&d.day===day);
                // 以选择的时间的索引
                const sInd=daysArray.findIndex(d => d.year===this.clickYearSelectedEnd&&d.month===this.clickMonthSelectedEnd&&d.day===this.clickDaySelectedEnd);

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
             * 鼠标进入-开始日期-周
             * @param obj {thText}
             */
            weekEnterStart({thText}) {
                if ((!this.clickYearSelectedStart && !this.clickYearSelectedEnd) || (this.clickYearSelectedStart && this.clickYearSelectedEnd)) return;
                const reg=/[.第周]/g;
                const weeksArray=this.weeksArrayStart;
                const dateS=this.clickThTextSelectedStart.replace(reg, '');
                const dateE=this.clickThTextSelectedEnd.replace(reg, '');
                const dateN=thText.replace(reg, '');

                // 当前传入时间的索引
                const nInd=weeksArray.findIndex(d => d.thText===thText);
                // 已选择的时间的索引
                const sInd=weeksArray.findIndex(d => d.thText===this.clickThTextSelectedStart);

                /* 修改开始右侧结束时间面板multiple -s */
                if (dateE) {
                    const weeksArrayEnd=this.weeksArrayEnd;
                    if (dateN > dateE) { // 选中的左侧面板开始时间大于当前鼠标hover的时间
                        this.weeksArrayEnd=weeksArrayEnd.map(d => {
                            if (d.flag === 'n') {
                                const dateC=d.thText.replace(reg, '');
                                if (dateC < dateN && dateC > dateE) d.multiple='multiple';
                                else d.multiple='';
                            }
                            return d;
                        })
                    } else {
                        this.weeksArrayEnd=weeksArrayEnd.map(d => {
                            if (d.flag === 'n') {
                                const dateC=d.thText.replace(reg, '');
                                if (dateC > dateN && dateC < dateE) d.multiple='multiple';
                                else d.multiple='';
                            }
                            return d;
                        })
                    }
                } else {
                    this.weeksArrayEnd=this.weeksArrayEnd.map(d => {
                        d.multiple='';
                        return d;
                    })
                }
                /* 修改开始右侧结束时间面板multiple -e */

                // 修改当前鼠标hover状态
                if (dateS) { // 已选择开始时间
                    if (sInd === -1) { // 不在当前面板
                        if (dateN < dateS) {
                            this.weeksArrayStart=weeksArray.map(d => {
                                if (d.flag === 'n') {
                                    const dateC=d.thText.replace(reg, '');
                                    if (dateC >= dateN) d.multiple='multiple';
                                    else d.multiple='';
                                }
                                return d;
                            })
                        } else {
                            this.weeksArrayStart=weeksArray.map(d => {
                                if (d.flag === 'n') {
                                    const dateC=d.thText.replace(reg, '');
                                    if (dateC <= dateN) d.multiple='multiple';
                                    else d.multiple='';
                                }
                                return d;
                            })
                        }
                    } else { // 在当前面板
                        if (nInd > sInd) {
                            this.weeksArrayStart=weeksArray.map(d => {
                                if (d.flag === 'n') {
                                    const dateC=d.thText.replace(reg, '');
                                    if (dateC <= dateN && dateC > dateS) d.multiple='multiple';
                                    else d.multiple='';
                                }
                                return d;
                            })
                        } else {
                            this.weeksArrayStart=weeksArray.map(d => {
                                if (d.flag === 'n') {
                                    const dateC=d.thText.replace(reg, '');
                                    if (dateC >= dateN && dateC < dateS) d.multiple='multiple';
                                    else d.multiple='';
                                }
                                return d;
                            })
                        }
                    }
                } else { // 未选择开始时间
                    this.weeksArrayStart=weeksArray.map(d => {
                        if (d.flag === 'n') {
                            const dateC=d.thText.replace(reg, '');
                            if (dateC >= dateN) d.multiple='multiple';
                            else d.multiple='';
                        }
                        return d;
                    })
                }
            },
            /**
             * 鼠标进入-开始日期-周
             * @param obj {thText}
             */
            weekEnterEnd({thText}) {
                if ((!this.clickYearSelectedStart && !this.clickYearSelectedEnd) || (this.clickYearSelectedStart && this.clickYearSelectedEnd)) return;
                const reg=/[.第周]/g;
                const weeksArray=this.weeksArrayEnd;
                const dateS=this.clickThTextSelectedStart.replace(reg, '');
                const dateE=this.clickThTextSelectedEnd.replace(reg, '');
                const dateN=thText.replace(reg, '');

                // 当前传入时间的索引
                const nInd=weeksArray.findIndex(d => d.thText===thText);
                // 已选择的时间的索引
                const sInd=weeksArray.findIndex(d => d.thText===this.clickThTextSelectedEnd);


                /* 修改左侧开始时间面板multiple -s */
                if (dateS) {
                    const weeksArrayStart=this.weeksArrayStart;
                    if (dateN > dateS) { // 选中的左侧面板开始时间大于当前鼠标hover的时间
                        this.weeksArrayStart=weeksArrayStart.map(d => {
                            if (d.flag === 'n') {
                                const dateC=d.thText.replace(reg, '');
                                if (dateC < dateN && dateC > dateS) d.multiple='multiple';
                                else d.multiple='';
                            }
                            return d;
                        })
                    } else {
                        this.weeksArrayStart=weeksArrayStart.map(d => {
                            if (d.flag === 'n') {
                                const dateC=d.thText.replace(reg, '');
                                if (dateC > dateN && dateC < dateS) d.multiple='multiple';
                                else d.multiple='';
                            }
                            return d;
                        })
                    }
                } else {
                    this.weeksArrayStart=this.weeksArrayStart.map(d => {
                        d.multiple='';
                        return d;
                    })
                }
                /* 修改开始左侧开始时间面板multiple -e */

                // 修改当前鼠标hover状态
                if (sInd === -1) { // 不在当前面板
                    if (dateN < dateE) {
                        this.weeksArrayEnd=weeksArray.map(d => {
                            if (d.flag === 'n') {
                                const dateC=d.thText.replace(reg, '');
                                if (dateC >= dateN) d.multiple='multiple';
                                else d.multiple='';
                            }
                            return d;
                        })
                    } else {
                        this.weeksArrayEnd=weeksArray.map(d => {
                            if (d.flag === 'n') {
                                const dateC=d.thText.replace(reg, '');
                                if (dateC <= dateN) d.multiple='multiple';
                                else d.multiple='';
                            }
                            return d;
                        })
                    }
                } else { // 在当前面板
                    if (nInd > sInd) {
                        this.weeksArrayEnd=weeksArray.map(d => {
                            if (d.flag === 'n') {
                                const dateC=d.thText.replace(reg, '');
                                if (dateC <= dateN && dateC > dateE) d.multiple='multiple';
                                else d.multiple='';
                            }
                            return d;
                        })
                    } else {
                        this.weeksArrayEnd=weeksArray.map(d => {
                            if (d.flag === 'n') {
                                const dateC=d.thText.replace(reg, '');
                                if (dateC >= dateN && dateC < dateE) d.multiple='multiple';
                                else d.multiple='';
                            }
                            return d;
                        })
                    }
                }
            },
            monthEnterStart({year, month}) {
                if ((!this.clickYearSelectedStart && !this.clickYearSelectedEnd) || (this.clickYearSelectedStart && this.clickYearSelectedEnd)) return;
                const monthsArray=this.monthsArrayStart;
                const dateS=this.clickYearSelectedStart+this.clickMonthSelectedStart;
                const dateE=this.clickYearSelectedEnd+this.clickMonthSelectedEnd;
                const dateN=year+month;

                // 当前传入时间的索引
                const nInd=monthsArray.findIndex(d => d.year===year && d.month===month);
                // 以选择的时间的索引
                const sInd=monthsArray.findIndex(d => d.year===this.clickYearSelectedStart && d.month===this.clickMonthSelectedStart);

                /* 修改开始右侧结束时间面板multiple -s */
                if (dateE) {
                    const monthsArrayEnd=this.monthsArrayEnd;
                    if (dateN > dateE) { // 选中的左侧面板开始时间大于当前鼠标hover的时间
                        this.monthsArrayEnd=monthsArrayEnd.map(d => {
                            const dateC=d.year+d.month;
                            if (dateC < dateN && dateC > dateE) d.multiple='multiple';
                            else d.multiple='';
                            return d;
                        })
                    } else {
                        this.monthsArrayEnd=monthsArrayEnd.map(d => {
                            const dateC=d.year+d.month;
                            if (dateC > dateN && dateC < dateE) d.multiple='multiple';
                            else d.multiple='';
                            return d;
                        })
                    }
                } else {
                    this.monthsArrayEnd=this.monthsArrayEnd.map(d => {
                        d.multiple='';
                        return d;
                    })
                }
                /* 修改开始右侧结束时间面板multiple -e */

                // 修改当前鼠标hover状态
                if (dateS) { // 已选择开始时间
                    if (sInd === -1) { // 不在当前面板
                        if (dateN < dateS) {
                            this.monthsArrayStart=monthsArray.map(d => {
                                if (d.year+d.month >= dateN) d.multiple='multiple';
                                else d.multiple='';
                                return d;
                            })
                        } else {
                            this.monthsArrayStart=monthsArray.map(d => {
                                if (d.year+d.month <= dateN) d.multiple='multiple';
                                else d.multiple='';
                                return d;
                            })
                        }
                    } else { // 在当前面板
                        if (nInd > sInd) {
                            this.monthsArrayStart=monthsArray.map(d => {
                                const dateC=d.year+d.month;
                                if (dateC <= dateN && dateC > dateS) d.multiple='multiple';
                                else d.multiple='';
                                return d;
                            })
                        } else {
                            this.monthsArrayStart=monthsArray.map(d => {
                                const dateC=d.year+d.month;
                                if (dateC >= dateN && dateC < dateS) d.multiple='multiple';
                                else d.multiple='';
                                return d;
                            })
                        }
                    }
                } else { // 未选择开始时间
                    this.monthsArrayStart=monthsArray.map(d => {
                        if (d.year+d.month >= dateN) d.multiple='multiple';
                        else d.multiple='';
                        return d;
                    })
                }
            },
            monthEnterEnd({year, month}) {
                if ((!this.clickYearSelectedStart && !this.clickYearSelectedEnd) || (this.clickYearSelectedStart && this.clickYearSelectedEnd)) return;
                const monthsArray=this.monthsArrayEnd;
                const dateS=this.clickYearSelectedStart+this.clickMonthSelectedStart;
                const dateE=this.clickYearSelectedEnd+this.clickMonthSelectedEnd;
                const dateN=year+month;

                // 当前传入时间的索引
                const nInd=monthsArray.findIndex(d => d.year===year && d.month===month);
                // 以选择的时间的索引
                const sInd=monthsArray.findIndex(d => d.year===this.clickYearSelectedEnd && d.month===this.clickMonthSelectedEnd);


                /* 修改左侧开始时间面板multiple -s */
                if (dateS) {
                    const monthsArrayStart=this.monthsArrayStart;
                    if (dateN > dateS) { // 选中的左侧面板开始时间大于当前鼠标hover的时间
                        this.monthsArrayStart=monthsArrayStart.map(d => {
                            const dateC=d.year+d.month;
                            if (dateC < dateN && dateC > dateS) d.multiple='multiple';
                            else d.multiple='';
                            return d;
                        })
                    } else {
                        this.monthsArrayStart=monthsArrayStart.map(d => {
                            const dateC=d.year+d.month;
                            if (dateC > dateN && dateC < dateS) d.multiple='multiple';
                            else d.multiple='';
                            return d;
                        })
                    }
                } else {
                    this.monthsArrayStart=this.monthsArrayStart.map(d => {
                        d.multiple='';
                        return d;
                    })
                }
                /* 修改开始左侧开始时间面板multiple -e */

                // 修改当前鼠标hover状态
                if (sInd === -1) { // 不在当前面板
                    if (dateN < dateE) {
                        this.monthsArrayEnd=monthsArray.map(d => {
                            if (d.year+d.month >= dateN) d.multiple='multiple';
                            else d.multiple='';
                            return d;
                        })
                    } else {
                        this.monthsArrayEnd=monthsArray.map(d => {
                            if (d.year+d.month <= dateN) d.multiple='multiple';
                            else d.multiple='';
                            return d;
                        })
                    }
                } else { // 在当前面板
                    if (nInd > sInd) {
                        this.monthsArrayEnd=monthsArray.map(d => {
                            const dateC=d.year+d.month;
                            if (dateC <= dateN && dateC > dateE) d.multiple='multiple';
                            else d.multiple='';
                            return d;
                        })
                    } else {
                        this.monthsArrayEnd=monthsArray.map(d => {
                            const dateC=d.year+d.month;
                            if (dateC >= dateN && dateC < dateE) d.multiple='multiple';
                            else d.multiple='';
                            return d;
                        })
                    }
                }
            },
            yearEnterStart(year) {
                if ((!this.clickYearSelectedStart && !this.clickYearSelectedEnd) || (this.clickYearSelectedStart && this.clickYearSelectedEnd)) return;
                const yearsArray=this.yearsArrayStart;
                const dateS=this.clickYearSelectedStart;
                const dateE=this.clickYearSelectedEnd;
                const dateN=year;

                // 当前传入时间的索引
                const nInd=yearsArray.findIndex(d => d.year===year);
                // 以选择的时间的索引
                const sInd=yearsArray.findIndex(d => d.year===this.clickYearSelectedStart);

                /* 修改开始右侧结束时间面板multiple -s */
                if (dateE) {
                    const yearsArrayEnd=this.yearsArrayEnd;
                    if (dateN > dateE) { // 选中的左侧面板开始时间大于当前鼠标hover的时间
                        this.yearsArrayEnd=yearsArrayEnd.map(d => {
                            if (d.year < dateN && d.year > dateE) d.multiple='multiple';
                            else d.multiple='';
                            return d;
                        })
                    } else {
                        this.yearsArrayEnd=yearsArrayEnd.map(d => {
                            if (d.year > dateN && d.year < dateE) d.multiple='multiple';
                            else d.multiple='';
                            return d;
                        })
                    }
                } else {
                    this.yearsArrayEnd=this.yearsArrayEnd.map(d => {
                        d.multiple='';
                        return d;
                    })
                }
                /* 修改开始右侧结束时间面板multiple -e */

                // 修改当前鼠标hover状态
                if (dateS) { // 已选择开始时间
                    if (sInd === -1) { // 不在当前面板
                        if (dateN < dateS) {
                            this.yearsArrayStart=yearsArray.map(d => {
                                if (d.year >= dateN) d.multiple='multiple';
                                else d.multiple='';
                                return d;
                            })
                        } else {
                            this.yearsArrayStart=yearsArray.map(d => {
                                if (d.year <= dateN) d.multiple='multiple';
                                else d.multiple='';
                                return d;
                            })
                        }
                    } else { // 在当前面板
                        if (nInd > sInd) {
                            this.yearsArrayStart=yearsArray.map(d => {
                                if (d.year <= dateN && d.year > dateS) d.multiple='multiple';
                                else d.multiple='';
                                return d;
                            })
                        } else {
                            this.yearsArrayStart=yearsArray.map(d => {
                                if (d.year >= dateN && d.year < dateS) d.multiple='multiple';
                                else d.multiple='';
                                return d;
                            })
                        }
                    }
                } else { // 未选择开始时间
                    this.yearsArrayStart=yearsArray.map(d => {
                        if (d.year >= dateN) d.multiple='multiple';
                        else d.multiple='';
                        return d;
                    })
                }
            },
            yearEnterEnd(year) {
                if ((!this.clickYearSelectedStart && !this.clickYearSelectedEnd) || (this.clickYearSelectedStart && this.clickYearSelectedEnd)) return;
                const yearsArray=this.yearsArrayEnd;
                const dateS=this.clickYearSelectedStart;
                const dateE=this.clickYearSelectedEnd;
                const dateN=year;

                // 当前传入时间的索引
                const nInd=yearsArray.findIndex(d => d.year===year);
                // 以选择的时间的索引
                const sInd=yearsArray.findIndex(d => d.year===this.clickYearSelectedEnd);

                /* 修改左侧开始时间面板multiple -s */
                if (dateS) {
                    const yearsArrayStart=this.yearsArrayStart;
                    if (dateN > dateS) { // 选中的左侧面板开始时间大于当前鼠标hover的时间
                        this.yearsArrayStart=yearsArrayStart.map(d => {
                            if (d.year < dateN && d.year > dateS) d.multiple='multiple';
                            else d.multiple='';
                            return d;
                        })
                    } else {
                        this.yearsArrayStart=yearsArrayStart.map(d => {
                            if (d.year > dateN && d.year < dateS) d.multiple='multiple';
                            else d.multiple='';
                            return d;
                        })
                    }
                } else {
                    this.yearsArrayStart=this.yearsArrayStart.map(d => {
                        d.multiple='';
                        return d;
                    })
                }
                /* 修改开始左侧开始时间面板multiple -e */

                // 修改当前鼠标hover状态
                if (sInd === -1) { // 不在当前面板
                    if (dateN < dateE) {
                        this.yearsArrayEnd=yearsArray.map(d => {
                            if (d.year >= dateN) d.multiple='multiple';
                            else d.multiple='';
                            return d;
                        })
                    } else {
                        this.yearsArrayEnd=yearsArray.map(d => {
                            if (d.year <= dateN) d.multiple='multiple';
                            else d.multiple='';
                            return d;
                        })
                    }
                } else { // 在当前面板
                    if (nInd > sInd) {
                        this.yearsArrayEnd=yearsArray.map(d => {
                            if (d.year <= dateN && d.year > dateE) d.multiple='multiple';
                            else d.multiple='';
                            return d;
                        })
                    } else {
                        this.yearsArrayEnd=yearsArray.map(d => {
                            if (d.year >= dateN && d.year < dateE) d.multiple='multiple';
                            else d.multiple='';
                            return d;
                        })
                    }
                }
            },

            // 打开时间选择器
            panelTimeOpen() {
                this.panelTime=true;
                this.panelYearStart=false;
                this.panelMonthStart=false;
                this.panelYearEnd=false;
                this.panelMonthEnd=false;

                setTimeout(() => {
                    this.$refs.timeSelectStart.setTimeDom();
                    this.$refs.timeSelectEnd.setTimeDom();
                })
            },
            // 关闭时间选择器
            panelTimeClose() {
                this.panelTime=false;
            },

            // 快速选择-设置时间 flat可选值【left，right】
            setQuickDay(flag) {
                const y1=this.yearSelectedStart, m1=this.monthSelectedStart, d1=this.daySelectedStart,
                    y2=this.yearSelectedEnd, m2=this.monthSelectedEnd, d2=this.daySelectedEnd;
                let sy, sm, sd // 计算后的开始年月日
                    ,ey, em, ed; // 计算后的结束年月日
                // 天差值
                const diff=(new Date(y2, m2-1, d2).getTime() - new Date(y1, m1-1, d1).getTime()) / (1000*60*60*24);
                if (flag === 'min') {
                    // 计算结束时间
                    const [ey1, em1, ed1]=CountBeforeOrAfterDay(y1, m1, d1, -1);
                    ey=ey1;
                    em=em1;
                    ed=ed1;
                    // 计算开始时间
                    const [sy1, sm1, sd1]=CountBeforeOrAfterDay(ey, em, ed, -diff);
                    sy=sy1;
                    sm=sm1;
                    sd=sd1;
                } else {
                    // 计算开始时间
                    const [sy1, sm1, sd1]=CountBeforeOrAfterDay(y2, m2, d2, 1);
                    sy=sy1;
                    sm=sm1;
                    sd=sd1;
                    // 计算结束时间
                    const [ey1, em1, ed1]=CountBeforeOrAfterDay(sy, sm, sd, diff);
                    ey=ey1;
                    em=em1;
                    ed=ed1;
                }

                const dateStart=sy+'.'+sm+'.'+sd+`${this.format?' '+this.timeStart:''}`,
                    dateEnd=ey+'.'+em+'.'+ed+`${this.format?' '+this.timeStart:''}`;

                this.selectedDateStart=dateStart;
                this.selectedDateEnd=dateEnd;
                this.yearSelectedStart=sy;
                this.monthSelectedStart=sm;
                this.daySelectedStart=sd;
                this.clickYearSelectedStart=sy;
                this.clickMonthSelectedStart=sm;
                this.clickDaySelectedStart=sd;
                this.yearSelectedEnd=ey;
                this.monthSelectedEnd=em;
                this.daySelectedEnd=ed;
                this.clickYearSelectedEnd=ey;
                this.clickMonthSelectedEnd=em;
                this.clickDaySelectedEnd=ed;
                const selectedDate=dateStart+'-'+dateEnd;
                this.selectedDate=selectedDate;
                this.$emit('change', selectedDate);
            },
            setQuickWeek() {},
            setQuickMonth() {},
            setQuickYear() {},
            // 快速选择 flag可选值【left，right】
            quickSort(flag) {
                if (!this.selectedDate) return;

                switch (this.tabKey) {
                    case 'day':
                        this.setQuickDay(flag);
                        break;
                    case 'week':
                        this.setQuickWeek(flag);
                        break;
                    case 'month':
                        this.setQuickMonth(flag);
                        break;
                    case 'year':
                        this.setQuickYear(flag);
                        break;
                    default:break;
                }
            },
            /**
             * 确定
             */
            pickerConfirm() {
                const tabKey=this.tabKey;
                let dateStart, dateEnd;
                switch (tabKey) {
                    case 'day':
                        (() => {
                            const format=this.format;
                            const y1=this.clickYearSelectedStart, m1=this.clickMonthSelectedStart, d1=this.clickDaySelectedStart, ts=this.timeStart,
                                y2=this.clickYearSelectedEnd, m2=this.clickMonthSelectedEnd, d2=this.clickDaySelectedEnd, te=this.timeEnd;
                            if (y1+m1+d1 > y2+m2+d2) {
                                this.yearSelectedStart=y2;this.monthSelectedStart=m2;this.daySelectedStart=d2;
                                this.yearSelectedEnd=y1;this.monthSelectedEnd=m1;this.daySelectedEnd=d1;
                                dateStart=y2+'.'+m2+'.'+d2+`${format&&ts?' '+ts:''}`;
                                dateEnd=y1+'.'+m1+'.'+d1+`${format&&te?' '+te:''}`;
                            } else {
                                this.yearSelectedStart=y1;this.monthSelectedStart=m1;this.daySelectedStart=d1;
                                this.yearSelectedEnd=y2;this.monthSelectedEnd=m2;this.daySelectedEnd=d2;
                                dateStart=y1+'.'+m1+'.'+d1+`${format&&ts?' '+ts:''}`;
                                dateEnd=y2+'.'+m2+'.'+d2+`${format&&te?' '+te:''}`;
                            }
                        })();
                        break;
                    case 'week':
                        (() => {
                            const wks=this.weeksSelectedStart, wke=this.weeksSelectedEnd;
                            const {year: y1, month: m1, day: d1}=wks[0], {year: y2, month: m2, day: d2}=wke[6];
                            if (y1+m1+d1 > y2+m2+d2) {
                                this.yearSelectedStart=y2;this.monthSelectedStart=m2;this.daySelectedStart=d2;
                                this.yearSelectedEnd=y1;this.monthSelectedEnd=m1;this.daySelectedEnd=d1;
                                this.thTextSelectedStart=this.clickThTextSelectedEnd;
                                this.thTextSelectedEnd=this.clickThTextSelectedStart;
                                dateStart=y2+'.'+m2+'.'+d2;
                                dateEnd=y1+'.'+m1+'.'+d1;
                            } else {
                                this.yearSelectedStart=y1;this.monthSelectedStart=m1;this.daySelectedStart=d1;
                                this.yearSelectedEnd=y2;this.monthSelectedEnd=m2;this.daySelectedEnd=d2;
                                this.thTextSelectedStart=this.clickThTextSelectedStart;
                                this.thTextSelectedEnd=this.clickThTextSelectedEnd;
                                dateStart=y1+'.'+m1+'.'+d1;
                                dateEnd=y2+'.'+m2+'.'+d2;
                            }
                        })();
                        break;
                    case 'month':
                        (() => {
                            const y1=this.clickYearSelectedStart, m1=this.clickMonthSelectedStart,
                                y2=this.clickYearSelectedEnd, m2=this.clickMonthSelectedEnd;
                            if (y1+m1 > y2+m2) {
                                this.yearSelectedStart=y2;this.monthSelectedStart=m2;
                                this.yearSelectedEnd=y1;this.monthSelectedEnd=m1;
                                dateStart=y2+'.'+m2;
                                dateEnd=y1+'.'+m1;
                            } else {
                                this.yearSelectedStart=y1;this.monthSelectedStart=m1;
                                this.yearSelectedEnd=y2;this.monthSelectedEnd=m2;
                                dateStart=y1+'.'+m1;
                                dateEnd=y2+'.'+m2;
                            }
                        })();
                        break;
                    case 'year':
                        (() => {
                            const y1=this.clickYearSelectedStart,
                                y2=this.clickYearSelectedEnd;
                            this.yearSelectedStart=y1;
                            this.yearSelectedEnd=y2;
                            if (y1 > y2) {
                                this.yearSelectedStart=y2;
                                this.yearSelectedEnd=y1;
                                dateStart=y2;
                                dateEnd=y1;
                            } else {
                                this.yearSelectedStart=y1;
                                this.yearSelectedEnd=y2;
                                dateStart=y1;
                                dateEnd=y2;
                            }
                        })();
                        break;
                    default:
                        break;
                }
                console.log('dateStart:::', dateStart);
                console.log('dateEnd:::', dateEnd);

                this.selectedDateStart=dateStart;
                this.selectedDateEnd=dateEnd;
                const selectedDate=dateStart+'-'+dateEnd;
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
