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
                                    :class="[yearSelected&&'p-picker-input-values']"
                            >{{yearSelected?(yearSelected+'.'+monthSelected):'请选择日期'}}</article>
                        </section>
                    </div>
                    <div class="p-picker-main-item">
                        <SingleYear
                                ref="singleYear"
                                v-show="panelYear"
                                date=""
                                @change="panelYearChangeDate"
                        />
                        <SingleMonth
                                ref="singleMonth"
                                v-show="!panelYear"
                                :date="date"
                                @change="changeDate"
                                @panelYearHandle="panelYearHandle"
                                @changeYearsArrayHandle="changeYearsArrayHandle"
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

    import SingleYear from '../../PickerYear/depend/singleYear';
    import SingleMonth from './singleMonth';
    import Button from '../../Button';

    import ClearSvg from '../../static/iconSvg/clear2.svg';
    export default {
        name: "panelSingleMonth",
        components: {
            SingleYear,
            SingleMonth,
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

                yearSelected: '', // 选择的年
                monthSelected: '', // 选择的年
                panelYear: false // 显示年面板
            }
        },
        watch: {
            date(n, o) {
                if (n === o) return;
                this.dateFormat(n);
            },
            pickerBoxStatus(n) {
                if (n) return;
                this.panelYearHandle(false);
            }
        },
        created() {
            // 初始化日期对象
            this.dateFormat(this.date);
        },
        methods: {
            dateFormat(date) {
                this.selectedDate=date;
                if (date && date.includes('.')) {
                    const [year, month]=date.split('.');
                    this.yearSelected=year;
                    this.monthSelected=month;
                }
                this.changeBtnType(date);
            },
            /**
             * 改变按钮状态
             */
            changeBtnType(str) {
                if (str && str.replace(/\./, '')) this.btnType='primary';
                else this.btnType='disabled';
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
                this.changeYearsArrayHandle('');
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
             * 点击月
             * @param year
             * @param month
             */
            changeDate({year, month}) {
                this.yearSelected=year;
                this.monthSelected=month;
                this.btnType='primary';
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
            },

            // 年面板显示切换
            panelYearHandle(status) {
                this.panelYear=status
            },
            // 点击年
            panelYearChangeDate(year) {
                this.panelYearHandle(false);
                this.$refs.singleMonth.switchDate(year)
            },
            // 月面板的yearActive改变，改变年面板的year选中项
            changeYearsArrayHandle(year) {
                this.$refs.singleYear.changeYearsArray(year)
            }
        }
    }
</script>

<style lang="stylus">

</style>