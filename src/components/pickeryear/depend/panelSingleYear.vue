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
                            >{{yearSelected?yearSelected:'请选择日期'}}</article>
                        </section>
                    </div>
                    <div class="p-picker-main-item">
                        <YearSelect
                                :yearNow="yearNow"
                                :yearActive="yearActive"
                                :yearsArray="yearsArray"
                                @prevYear="prevYear"
                                @nextYear="nextYear"
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
    import CountYear from '../../static/utils/datePicker/CountYear';

    import YearSelect from './year';
    import Button from '../../Button';

    import ClearSvg from '../../static/iconSvg/clear2.svg';
    export default {
        name: "panelSingleYear",
        components: {
            YearSelect,
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

                // 活动的年月日
                yearActive: '',

                yearSelected: '', // 选择的年

                yearsArray: [] // 日列表
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
                if (str) this.btnType='primary';
                else this.btnType='disabled';
            },
            /**
             * 初始化日期对象
             */
            init() {
                this.countYear=new CountYear(this.date); // 当前计算年的对象
                this.yearsArray=this.countYear.getYearsArray();
                this.yearNow=this.countYear.countNowYear(); // 获取当前年

                this.setDate(this.date);
            },
            /**
             * 设置选择的年月日
             * @param date String 2019.10.31
             */
            setDate(date) {
                this.changeBtnType(date);
                this.setYearActive(this.yearsArray);
                this.selectedDate=date;
                this.yearSelected=date;
                this.changeYearsArray(date);
            },
            /**
             * 改变选中状态
             * @param year
             */
            changeYearsArray(year) {
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
                this.yearSelected='';
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
             * 设置yearActive
             */
            setYearActive(arr) {
                const ly=arr[0].year, ry=arr[arr.length-1].year;
                this.yearActive=ly+'年'+' - '+ry+'年';
            },
            /**
             * 切换日期
             * @param date String '2019'
             */
            switchDate(date) {
                this.countYear=new CountYear(date); // 当前计算天的对象
                this.yearsArray=this.countYear.getYearsArray().map(d => {
                    if (d.year===this.yearSelected) d.selected='selected';
                    return d;
                });
                this.setYearActive(this.yearsArray);
            },
            /**
             * 上一组年
             */
            prevYear() {
                const date=(this.yearsArray.shift().year-1).toString();
                this.switchDate(date);
            },
            /**
             * 下一组年
             */
            nextYear() {
                const date=(parseInt(this.yearsArray.pop().year)+12).toString();
                this.switchDate(date);
            },
            /**
             * 点击日期
             * @param year
             */
            changeDate(year) {
                this.yearSelected=year;
                this.btnType='primary';
                this.changeYearsArray(year);
            },
            /**
             * 确定
             */
            pickerConfirm() {
                const selectedDate=this.yearSelected;
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