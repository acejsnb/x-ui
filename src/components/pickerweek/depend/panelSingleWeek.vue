<template>
    <div class="p-picker-child">
        <div
                class="p-picker-input"
                @click="pickerBoxShow"
                @mouseenter="pickerClearShow"
                @mouseleave="pickerClearHide"
        >
            <section
                    :class="['p-picker-input-tip', thTextSelected&&'p-picker-input-values']"
            >{{thTextSelected?thTextSelected:'请选择日期'}}</section>
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
                                    :class="[thTextSelected&&'p-picker-input-values']"
                            >{{thTextSelected?thTextSelected:'请选择日期'}}</article>
                        </section>
                    </div>
                    <div class="p-picker-main-item">
                        <WeekSelect
                                :yearNow="yearNow"
                                :yearActive="yearActive"
                                :monthNow="monthNow"
                                :monthActive="monthActive"
                                :weeksArray="weeksArray"
                                @prevYear="prevYear"
                                @nextYear="nextYear"
                                @prevMonth="prevMonth"
                                @nextMonth="nextMonth"
                                @change="changeDate"
                        />
                    </div>
                </div>

                <div class="p-picker-main-handle">
                    <Button :type="btnType" size="small" disabled @click="pickerConfirm">确定</Button>
                </div>
            </div>
        </transition>
    </div>
</template>

<script>
    import CountWeek from '../../static/utils/datePicker/CountWeek';

    import WeekSelect from './week';
    import Button from '../../Button';

    import ClearSvg from '../../static/iconSvg/clear2.svg';
    import CountPrevMonth from "../../static/utils/datePicker/CountPrevMonth";
    import CountNextMonth from "../../static/utils/datePicker/CountNextMonth";
    import CountPrevYear from "../../static/utils/datePicker/CountPrevYear";
    import CountNextYear from "../../static/utils/datePicker/CountNextYear";
    export default {
        name: "panelSingleMonth",
        components: {
            WeekSelect,
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
            },
            /**
             * 排序规则
             * 可选值【year-按照年排序（默认），month-按照月排序】
             */
            sort: {
                type: String,
                default: 'year'
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

                // 活动的年月日
                yearActive: '',
                monthActive: '',

                weeksSelected: [], // 选择的周列表
                yearSelected: '', // 选择的年
                monthSelected: '', // 选择的月
                thTextSelected: '', // 选择的第几周 String

                weeksArray: [] // 周列表
            }
        },
        created() {
            if (this.date) {
                // 初始化日期对象
                this.init();
            }
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
             * 初始化日期对象
             */
            init() {
                const date=this.date;
                const countWeek=new CountWeek({date, sort: this.sort});
                this.weeksArray=countWeek.getWeeksArray();
                const [year, month]=countWeek.countNowDate();
                this.countWeek=countWeek;
                this.yearNow=year;
                this.monthNow=month;

                this.setDate(date);
            },
            /**
             * 设置选择的年月日
             * @param date String 2019.10.31
             */
            setDate(date) {
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
            /**
             * 改变选中状态
             * @param thText
             */
            changeWeeksArray(thText) {
                this.weeksArray=this.weeksArray.map(d => {
                    if (d.thText===thText) d.selected='selected';
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
                this.weeksSelected=[];
                this.yearSelected='';
                this.monthSelected='';
                this.thTextSelected='';
                this.$emit('change', {thTextSelected: '', selectedDate: ''});
                this.pickerClearHide();
            },
            // 失去焦点
            pickerMainBlur() {
                this.$nextTick(() => {
                    this.blurStatus=false;
                    this.$refs.pickerMain.blur()
                })
            },
            // 获取焦点
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
                // 初始化日期对象
                this.init();
            },
            /**
             * 关闭时间选择盒子
             */
            pickerBoxHide() {
                if (this.pickerBoxStatus && this.blurStatus) this.pickerBoxStatus=false;
            },
            /**
             * 切换日期
             * @param Y
             * @param M
             */
            switchDate(Y, M) {
                this.yearActive=Y;
                this.monthActive=M;
                this.countWeek.setYearMonth(Y, M);
                this.weeksArray=this.countWeek.getWeeksArray();
                if (Y === this.yearSelected && M === this.monthSelected) {
                    this.changeWeeksArray(this.thTextSelected);
                }
            },
            /**
             * 上一年
             */
            prevYear() {
                const date=CountPrevYear([this.yearActive, this.monthActive, '01']);
                const [Y, M]=date.split('.');
                this.switchDate(Y, M);
            },
            /**
             * 下一年
             */
            nextYear() {
                const date=CountNextYear([this.yearActive, this.monthActive, '01']);
                const [Y, M]=date.split('.');
                this.switchDate(Y, M);
            },
            /**
             * 上一月
             */
            prevMonth() {
                const date=CountPrevMonth([this.yearActive, this.monthActive, '01']);
                const [Y, M]=date.split('.');
                this.switchDate(Y, M);
            },
            /**
             * 下一月
             */
            nextMonth() {
                const date=CountNextMonth([this.yearActive, this.monthActive, '01']);
                const [Y, M]=date.split('.');
                this.switchDate(Y, M);
            },
            /**
             * 点击日期
             * @param weeks
             * @param year
             * @param month
             * @param thText
             */
            changeDate({weeks, year, month, thText}) {
                this.weeksSelected=weeks;
                this.yearSelected=year;
                this.monthSelected=month;
                this.thTextSelected=thText;
                this.btnType='primary';
                this.changeWeeksArray(thText);
            },
            /**
             * 确定
             */
            pickerConfirm() {
                const ws=this.weeksSelected, thTextSelected=this.thTextSelected;
                const s=ws[0], e=ws[6];
                const start=s.year+'.'+s.month+'.'+s.day;
                const end=e.year+'.'+e.month+'.'+e.day;
                const selectedDate=start+'-'+end;
                this.selectedDate=selectedDate;
                this.blurStatus=false;
                this.pickerBoxStatus=false;
                /**
                 * 返回选择的日期
                 * @type Function
                 */
                this.$emit('change', {thTextSelected, selectedDate});
            }
        }
    }
</script>
