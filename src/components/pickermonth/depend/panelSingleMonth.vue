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
                                    :class="[yearSelected&&'p-picker-input-values']"
                            >{{yearSelected?(yearSelected+'.'+monthSelected):'请选择日期'}}</article>
                        </section>
                    </div>
                    <div class="p-picker-main-item">
                        <MonthSelect
                                :yearNow="yearNow"
                                :yearActive="yearActive"
                                :monthNow="monthNow"
                                :monthActive="monthActive"
                                :monthsArray="monthsArray"
                                @prevYear="prevYear"
                                @nextYear="nextYear"
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
    import CountMonth from '../../static/utils/datePicker/CountMonth';

    import MonthSelect from './month';
    import Button from '../../button';

    import ClearSvg from '../../static/iconSvg/clear2.svg';
    export default {
        name: "panelSingleMonth",
        components: {
            MonthSelect,
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

                // 活动的年月日
                yearActive: '',
                monthActive: '',

                yearSelected: '', // 选择的年
                monthSelected: '', // 选择的年

                monthsArray: [] // 日列表
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
                if (str && str.replace(/\./, '')) this.btnType='primary';
                else this.btnType='disabled';
            },
            /**
             * 初始化日期对象
             */
            init() {
                const countMonth=new CountMonth(this.date);
                this.monthsArray=countMonth.getMonthsArray();
                const [year, month]=countMonth.countNowMonth();
                this.yearNow=year;
                this.monthNow=month;

                this.setDate(this.date);
            },
            /**
             * 设置选择的年月日
             * @param date String 2019.10.31
             */
            setDate(date) {
                this.selectedDate=date;
                this.changeBtnType(date);
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
            /**
             * 改变选中状态
             * @param year
             * @param month
             */
            changeMonthsArray({year, month}) {
                this.monthsArray=this.monthsArray.map(d => {
                    if (d.year===year && d.month===month) d.selected='selected';
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
                this.yearSelected='';
                this.monthSelected='';
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
             * @param date String '2019.03'
             */
            switchDate(date) {
                this.yearActive=date;
                const countMonth=new CountMonth(date);
                this.monthsArray=countMonth.getMonthsArray().map(d => {
                    if (d.year===this.yearSelected && d.month===this.monthSelected) d.selected='selected';
                    return d;
                });
            },
            /**
             * 上一组年
             */
            prevYear() {
                const date=(this.yearActive-1).toString();
                this.switchDate(date);
            },
            /**
             * 下一组年
             */
            nextYear() {
                const date=(parseInt(this.yearActive)+1).toString();
                this.switchDate(date);
            },
            /**
             * 点击日期
             * @param year
             * @param month
             */
            changeDate({year, month}) {
                this.yearSelected=year;
                this.monthSelected=month;
                this.btnType='primary';
                this.changeMonthsArray({year, month});
            },
            /**
             * 确定
             */
            pickerConfirm() {
                const selectedDate=this.yearSelected+'.'+this.monthSelected;
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