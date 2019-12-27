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
            <ClearSvg v-show="clearStatus" class="clearSvg" @click.stop="clearTime" />
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
                                    :class="[yearStartSelected&&'p-picker-input-values']"
                            >{{(yearStartSelected&&monthStartSelected)?(yearStartSelected+'.'+monthStartSelected):'开始日期'}}</article>
                            <article class="p-picker-input-solstice">至</article>
                            <article
                                    :class="[yearEndSelected&&'p-picker-input-values']"
                            >{{(yearEndSelected&&monthEndSelected)?(yearEndSelected+'.'+monthEndSelected):'结束日期'}}</article>
                        </section>
                    </div>
                    <div class="p-picker-main-item">
                        <WeekSelect
                                :yearNow="yearNow"
                                :monthNow="monthNow"
                                :yearActive="yearStartActive"
                                :monthActive="monthStartActive"
                                :monthsArray="monthsArrayStart"
                                @prevYear="prevYearStart"
                                @nextYear="nextYearStart"
                                @change="changeDateStart"
                                :disableYearRight="disableYearRight"
                                @monthEnter="monthEnterStart"
                                :multiple="true"
                        />
                        <WeekSelect
                                :yearNow="yearNow"
                                :monthNow="monthNow"
                                :yearActive="yearEndActive"
                                :monthActive="monthEndActive"
                                :monthsArray="monthsArrayEnd"
                                @prevYear="prevYearEnd"
                                @nextYear="nextYearEnd"
                                @change="changeDateEnd"
                                :disableYearLeft="disableYearLeft"
                                @monthEnter="monthEnterEnd"
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
    import CountMonth from '../../static/utils/datePicker/CountMonth';

    import WeekSelect from './week';
    import Button from '../../Button';

    import ClearSvg from '../../static/iconSvg/clear2.svg';
    export default {
        name: "panelDoubleMonth",
        components: {
            WeekSelect,
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
            },
            /**
             * 排序规则
             * 可选值【year-按照年排序（默认），month-按照月排序】
             */
            sort: {
                type: String,
                default: 'year'
            },
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

                // 活动的年月日
                yearStartActive: '',
                monthStartActive: '',
                yearEndActive: '',
                monthEndActive: '',

                // 选择的年月日
                yearStartSelected: '',
                monthStartSelected: '',
                yearEndSelected: '',
                monthEndSelected: '',

                monthsArrayStart: [], // 日列表-开始
                monthsArrayEnd: [], // 日列表-结束

                disableYearRight: false, // 禁用开始时间右箭头-年
                disableYearLeft: false  // 禁用结束时间左箭头-年
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
                if (str && str.replace(/[.-]/g, '')) this.btnType='primary';
                else this.btnType='disabled';
            },
            /**
             * 日期
             * @param date String '2019.03-2020.10'
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
                const activeStart=this.yearStartActive;
                const activeEnd=this.yearEndActive;

                const nextYear=(parseInt(activeStart)+1).toString();
                const prevYear=(parseInt(activeEnd)-1).toString();

                this.disableYearRight = nextYear >= activeEnd;
                this.disableYearLeft = prevYear <= activeStart;
            },

            /**
             * 初始化日期对象
             */
            initEnd() {
                const countMonthEnd=new CountMonth(this.dateEnd); // 当前计算年、月的对象
                this.monthsArrayEnd=countMonthEnd.getMonthsArray();
                const [year, month]=countMonthEnd.countNowMonth();
                this.yearNow=year;
                this.monthNow=month;

                this.setDateEnd(this.dateEnd);

                // 初始化开始时间对象
                this.initStart(this.dateStart);
            },
            /**
             * 初始化日期对象
             */
            initStart(date) {
                const dateStart=date?date:(this.monthsArrayEnd[0].year-1).toString();
                const countMonthStart=new CountMonth(dateStart); // 当前计算年的对象
                this.monthsArrayStart=countMonthStart.getMonthsArray();

                this.setDateStart(this.dateStart);

                this.disableArrow();
            },
            /**
             * 设置选择的年月日
             * @param date String 2019
             */
            setDateEnd(date) {
                if (date) {
                    const [year, month]=date.split('.');
                    this.yearEndSelected=year;
                    this.monthEndSelected=month;
                    this.yearEndActive=year;
                    this.monthEndActive=month;
                    // 设置默认选中状态
                    const [yearS, monthS]=this.dateStart;
                    const monthsArray=this.monthsArrayEnd;
                    const sInd=monthsArray.findIndex(d => d.year===yearS && d.month===monthS);
                    const eInd=monthsArray.findIndex(d => d.year===year && d.month===month);
                    if (this.dateEnd-this.dateStart<=12) {
                        this.monthsArrayEnd=monthsArray.map((d, i) => {
                            if ((d.year===yearS && d.month===monthS) || (d.year===year && d.month===month)) {
                                d.selected='selected';
                            } else if (i>sInd && i<eInd) {
                                d.multiple='multiple';
                            }
                            return d;
                        })
                    } else {
                        this.monthsArrayEnd=monthsArray.map((d, i) => {
                            if (d.year===year && d.month===month) {
                                d.selected='selected';
                            } else if (i<eInd) {
                                d.multiple='multiple';
                            }
                            return d;
                        })
                    }
                } else {
                    this.yearEndActive=this.yearNow;
                    this.monthEndActive=this.monthNow;
                    this.changeMonthsArrayEnd({year: '', month: ''});
                }
            },
            /**
             * 设置选择的年月日
             * @param date String 2019
             */
            setDateStart(date) {
                if (date) {
                    const [year, month]=date.split('.');
                    this.yearStartSelected=year;
                    this.monthStartSelected=month;
                    this.yearStartActive=year;
                    this.monthStartActive=month;

                    if (this.dateEnd-this.dateStart>12) {
                        // 设置默认选中状态
                        const monthsArray=this.monthsArrayStart;
                        const sInd=monthsArray.findIndex(d => d.year===year && d.month===month);
                        this.monthsArrayStart=monthsArray.map((d, i) => {
                            if (d.year===year && d.month===month) {
                                d.selected='selected';
                            } else if (i>sInd) {
                                d.multiple='multiple';
                            }
                            return d;
                        })
                    }
                } else {
                    this.yearStartActive=this.monthsArrayStart[0].year;
                    this.monthStartActive='';
                    this.changeMonthsArrayStart({year: '', month: ''});
                }
            },
            /**
             * 改变选中状态
             * @param year
             * @param month
             * @param clearOther Boolean 清空其他
             */
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
            /**
             * 改变选中状态
             * @param year
             * @param month
             * @param clearOther Boolean 清空其他
             */
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
                this.yearStartSelected='';
                this.monthStartSelected='';
                this.yearEndSelected='';
                this.monthEndSelected='';
                this.$emit('change', '');
                this.pickerClearHide();
                this.changeMonthsArrayStart({year: '', month: ''}, true);
                this.changeMonthsArrayEnd({year: '', month: ''}, true);
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
             * @param date String '2019.10'
             */
            switchDateStart(date) {
                const countMonthStart=new CountMonth(date); // 当前计算天的对象
                this.monthsArrayStart=countMonthStart.getMonthsArray();

                this.disableArrow();

                const dateS=this.yearStartSelected+this.monthStartSelected;
                const dateE=this.yearEndSelected+this.monthEndSelected;

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
            },
            /**
             * 切换日期
             * @param date String '2019.10.31'
             */
            switchDateEnd(date) {
                const countMonthEnd=new CountMonth(date); // 当前计算天的对象
                this.monthsArrayEnd=countMonthEnd.getMonthsArray();

                this.disableArrow();

                const dateS=this.yearStartSelected+this.monthStartSelected;
                const dateE=this.yearEndSelected+this.monthEndSelected;
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
            },
            /**
             * 上一年
             */
            prevYearStart() {
                const date=(this.yearStartActive-1).toString();
                this.yearStartActive=date;
                this.switchDateStart(date+'.'+this.monthStartActive);
            },
            /**
             * 上一年
             */
            prevYearEnd() {
                const date=(this.yearEndActive-1).toString();
                this.yearEndActive=date;
                this.switchDateEnd(date+'.'+this.monthEndActive);
            },
            /**
             * 下一年
             */
            nextYearStart() {
                const date=(parseInt(this.yearStartActive)+1).toString();
                this.yearStartActive=date;
                this.switchDateStart(date+'.'+this.monthStartActive);
            },
            /**
             * 下一年
             */
            nextYearEnd() {
                const date=(parseInt(this.yearEndActive)+1).toString();
                this.yearEndActive=date;
                this.switchDateEnd(date+'.'+this.monthEndActive);
            },
            /**
             * 点击日期-开始日期
             * @param year
             * @param month
             */
            changeDateStart({year, month}) {
                let clearOther=false;
                if (this.yearStartSelected && this.yearEndSelected) {
                    this.yearStartSelected=year;
                    this.monthStartSelected=month;

                    this.yearEndSelected='';
                    this.monthEndSelected='';
                    clearOther=true;

                    this.changeMonthsArrayEnd({year: '', month: ''}, clearOther);
                } else if (this.yearStartSelected && !this.yearEndSelected) {
                    this.yearEndSelected=year;
                    this.monthEndSelected=month;
                } else {
                    this.yearStartSelected=year;
                    this.monthStartSelected=month;
                }

                if (this.yearStartSelected && this.yearEndSelected) this.btnType='primary';
                else this.btnType='disabled';

                this.changeMonthsArrayStart({year, month}, clearOther);
            },
            /**
             * 点击日期-结束日期
             * @param year
             * @param month
             */
            changeDateEnd({year, month}) {
                let clearOther=false;
                if (this.yearStartSelected && this.yearEndSelected) {
                    this.yearEndSelected=year;
                    this.monthEndSelected=month;

                    this.yearStartSelected='';
                    this.monthStartSelected='';
                    clearOther=true;

                    this.changeMonthsArrayStart({year: '', month: ''}, clearOther);
                } else if (!this.yearStartSelected && this.yearEndSelected) {
                    this.yearStartSelected=year;
                    this.monthStartSelected=month;
                } else {
                    this.yearEndSelected=year;
                    this.monthEndSelected=month;
                }

                if (this.yearStartSelected && this.yearEndSelected) this.btnType='primary';
                else this.btnType='disabled';

                this.changeMonthsArrayEnd({year, month}, clearOther);
            },
            /**
             * 鼠标进入-开始日期
             * @param year
             * @param month
             */
            monthEnterStart({year, month}) {
                if ((!this.yearStartSelected && !this.yearEndSelected) || (this.yearStartSelected && this.yearEndSelected)) return;
                const monthsArray=this.monthsArrayStart;
                const dateS=this.yearStartSelected+this.monthStartSelected;
                const dateE=this.yearEndSelected+this.monthEndSelected;
                const dateN=year+month;

                // 当前传入时间的索引
                const nInd=monthsArray.findIndex(d => d.year===year && d.month===month);
                // 以选择的时间的索引
                const sInd=monthsArray.findIndex(d => d.year===this.yearStartSelected && d.month===this.monthStartSelected);

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
            /**
             * 鼠标进入-结束日期
             * @param year
             * @param month
             */
            monthEnterEnd({year, month}) {
                if ((!this.yearStartSelected && !this.yearEndSelected) || (this.yearStartSelected && this.yearEndSelected)) return;
                const monthsArray=this.monthsArrayEnd;
                const dateS=this.yearStartSelected+this.monthStartSelected;
                const dateE=this.yearEndSelected+this.monthEndSelected;
                const dateN=year+month;

                // 当前传入时间的索引
                const nInd=monthsArray.findIndex(d => d.year===year && d.month===month);
                // 以选择的时间的索引
                const sInd=monthsArray.findIndex(d => d.year===this.yearEndSelected && d.month===this.monthEndSelected);


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
            /**
             * 确定
             */
            pickerConfirm() {
                const dateS=this.yearStartSelected+'.'+this.monthStartSelected;
                const dateE=this.yearEndSelected+'.'+this.monthEndSelected;
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