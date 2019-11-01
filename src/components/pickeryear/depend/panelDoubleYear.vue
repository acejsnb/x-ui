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
                                    :class="[yearStartSelected&&'p-picker-input-values']"
                            >{{yearStartSelected?yearStartSelected:'开始日期'}}</article>
                            <article class="p-picker-input-solstice">至</article>
                            <article
                                    :class="[yearEndSelected&&'p-picker-input-values']"
                            >{{yearEndSelected?yearEndSelected:'结束日期'}}</article>
                        </section>
                    </div>
                    <div class="p-picker-main-item">
                        <DaySelect
                                :yearNow="yearNow"
                                :yearActive="yearActiveStart"
                                :yearsArray="yearsArrayStart"
                                @prevYear="prevYearStart"
                                @nextYear="nextYearStart"
                                @change="changeDateStart"
                                :disableYearRight="disableYearRight"
                                @yearEnter="yearEnterStart"
                                :multiple="true"
                        />
                        <DaySelect
                                :yearNow="yearNow"
                                :yearActive="yearActiveEnd"
                                :yearsArray="yearsArrayEnd"
                                @prevYear="prevYearEnd"
                                @nextYear="nextYearEnd"
                                @change="changeDateEnd"
                                :disableYearLeft="disableYearLeft"
                                @yearEnter="yearEnterEnd"
                                :multiple="true"
                        />
                    </div>
                </div>

                <div class="p-picker-main-handle">
                    <Button type="primary" size="small" @click="pickerConfirm">确定</Button>
                </div>
            </div>
        </transition>
    </div>
</template>

<script>
    import CountYear from 'datePicker/CountYear';

    import DaySelect from './year';
    import Button from 'button/Button';

    import ClearSvg from 'icon/clear2.svg';
    export default {
        name: "panelDouble",
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
                pickerBoxStatus: false, // 显示选择时间框
                blurStatus: false, // 是否可执行blur
                clearStatus: false, // 关闭按钮
                selectedDate: '', // 选中的时间

                dateStart: '',
                dateEnd: '',

                // 当前年月日
                yearNow: '',

                // 活动的年月日
                yearActiveStart: '',
                yearActiveEnd: '',

                // 选择的年月日
                yearStartSelected: '',
                yearEndSelected: '',

                yearsArrayStart: [], // 日列表-开始
                yearsArrayEnd: [], // 日列表-结束

                disableYearRight: false, // 禁用开始时间右箭头-年
                disableYearLeft: false  // 禁用结束时间左箭头-年
            }
        },
        watch: {
            /**
             * 监听传入的日期改变
             */
            date(n, o) {
                if (n === o) return;
                this.dateFormat(n);
                this.setDateEnd(this.dateEnd);
                this.setDateStart(this.dateStart);
            }
        },
        created() {
            this.dateFormat(this.date);

            this.initEnd();
        },
        methods: {
            /**
             * 日期
             * @param date String '2019-2020'
             */
            dateFormat(date) {
                this.selectedDate=date;
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
                const reg=/ |年/g;
                const activeStart=this.yearActiveStart.replace(reg, '').split('-')[1];
                const activeEnd=this.yearActiveEnd.replace(reg, '').split('-')[0];

                const nextYear=(parseInt(this.yearsArrayStart[this.yearsArrayStart.length-1].year)+1).toString();
                const prevYear=(parseInt(this.yearsArrayEnd[0].year)-1).toString();

                this.disableYearRight = nextYear >= activeEnd;
                this.disableYearLeft = prevYear <= activeStart;
            },

            /**
             * 初始化日期对象
             */
            initEnd() {
                this.countYearEnd=new CountYear(this.dateEnd); // 当前计算年的对象
                this.yearsArrayEnd=this.countYearEnd.getYearsArray();
                this.yearNow=this.countYearEnd.countNowYear(); // 获取当前年
                this.setDateEnd(this.dateEnd);

                // 初始化开始时间对象
                this.initStart((this.yearsArrayEnd[0].year-1).toString());
            },
            /**
             * 初始化日期对象
             */
            initStart(date) {
                this.countYearStart=new CountYear(date); // 当前计算年的对象
                this.yearsArrayStart=this.countYearStart.getYearsArray();
                this.setDateStart(this.dateStart);

                this.disableArrow();
            },
            /**
             * 设置选择的年月日
             * @param date String 2019
             */
            setDateEnd(date) {
                this.setYearActiveEnd(this.yearsArrayEnd);
                this.yearEndSelected=date;
                if (this.date) {
                    // 设置默认选中状态
                    const yearsArray=this.yearsArrayEnd;
                    const sInd=yearsArray.findIndex(d => d.year===this.dateStart);
                    const eInd=yearsArray.findIndex(d => d.year===this.dateEnd);
                    if (this.dateEnd-this.dateStart<=12) {
                        this.yearsArrayEnd=yearsArray.map((d, i) => {
                            if (d.year===this.dateStart || d.year===this.dateEnd) {
                                d.selected='selected';
                            } else if (i>sInd && i<eInd) {
                                d.multiple='multiple';
                            }
                            return d;
                        })
                    } else {
                        this.yearsArrayEnd=yearsArray.map((d, i) => {
                            if (d.year===this.dateEnd) {
                                d.selected='selected';
                            } else if (i<eInd) {
                                d.multiple='multiple';
                            }
                            return d;
                        })
                    }
                } else {
                    this.changeYearsArrayEnd(date);
                }
            },
            /**
             * 设置选择的年月日
             * @param date String 2019
             */
            setDateStart(date) {
                this.setYearActiveStart(this.yearsArrayStart);
                this.yearStartSelected=date;
                if (this.date && this.dateEnd-this.dateStart>12) {
                    // 设置默认选中状态
                    const yearsArray=this.yearsArrayStart;
                    const sInd=yearsArray.findIndex(d => d.year===this.dateStart);
                    this.yearsArrayStart=yearsArray.map((d, i) => {
                        if (d.year===this.dateStart) {
                            d.selected='selected';
                        } else if (i>sInd) {
                            d.multiple='multiple';
                        }
                        return d;
                    })
                } else {
                    this.changeYearsArrayStart(date);
                }
            },
            /**
             * 改变选中状态
             * @param year
             * @param clearOther Boolean 清空其他
             */
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
            /**
             * 改变选中状态
             * @param year
             * @param clearOther Boolean 清空其他
             */
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
                this.yearStartSelected='';
                this.yearEndSelected='';
                this.$emit('change', '');
                this.pickerClearHide();
                this.changeYearsArrayStart('', true);
                this.changeYearsArrayEnd('', true);
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
             * 设置yearActiveStart
             */
            setYearActiveStart(arr) {
                const ly=arr[0].year, ry=arr[arr.length-1].year;
                this.yearActiveStart=ly+'年'+' - '+ry+'年';
            },
            /**
             * 设置yearActiveEnd
             */
            setYearActiveEnd(arr) {
                const ly=arr[0].year, ry=arr[arr.length-1].year;
                this.yearActiveEnd=ly+'年'+' - '+ry+'年';
            },
            /**
             * 切换日期
             * @param date String '2019.10.31'
             */
            switchDateStart(date) {
                this.countYearStart=new CountYear(date); // 当前计算天的对象
                this.yearsArrayStart=this.countYearStart.getYearsArray();
                this.setYearActiveStart(this.yearsArrayStart);

                this.disableArrow();

                // 如果选择了开始时间
                if (this.yearStartSelected && this.yearEndSelected) {
                    const dateS=this.yearStartSelected;
                    const dateE=this.yearEndSelected;
                    const sInd=this.yearsArrayStart.findIndex(d => d.year===this.yearStartSelected);
                    const eInd=this.yearsArrayStart.findIndex(d => d.year===this.yearEndSelected);
                    if (eInd === -1) { // 开始结束时间不在同一面板
                        if (dateS > dateE) {
                            this.yearsArrayStart=this.yearsArrayStart.map((d, i) => {
                                if (d.year===this.yearStartSelected) {
                                    if (i < sInd) d.multiple='multiple';
                                    if (i === sInd) d.selected='selected';
                                }
                                return d;
                            })
                        } else {
                            this.yearsArrayStart=this.yearsArrayStart.map((d, i) => {
                                if (d.year===this.yearStartSelected) {
                                    if (i > sInd) d.multiple='multiple';
                                    if (i === sInd) d.selected='selected';
                                }
                                return d;
                            })
                        }
                    } else { // 开始结束时间在同一面板
                        if (sInd > eInd) {
                            this.yearsArrayStart=this.yearsArrayStart.map((d, i) => {
                                if (d.year===this.yearStartSelected) {
                                    if (i < sInd && i > eInd) d.multiple='multiple';
                                    if (i === sInd || i === eInd) d.selected='selected';
                                }
                                return d;
                            })
                        } else {
                            this.yearsArrayStart=this.yearsArrayStart.map((d, i) => {
                                if (d.year===this.yearStartSelected) {
                                    if (i > sInd && i < eInd) d.multiple='multiple';
                                    if (i === sInd || i === eInd) d.selected='selected';
                                }
                                return d;
                            })
                        }
                    }
                } else if (this.yearStartSelected && !this.yearEndSelected) {
                    this.yearsArrayStart=this.yearsArrayStart.map(d => {
                        if (d.year===this.yearStartSelected) {
                            d.selected='selected'
                        }
                        return d;
                    })
                }
            },
            /**
             * 切换日期
             * @param date String '2019.10.31'
             */
            switchDateEnd(date) {
                this.countYearEnd=new CountYear(date); // 当前计算天的对象
                this.yearsArrayEnd=this.countYearEnd.getYearsArray();
                this.setYearActiveEnd(this.yearsArrayEnd);

                this.disableArrow();

                // 如果选择了结束时间
                if (this.yearStartSelected && this.yearEndSelected) {
                    const dateS=this.yearStartSelected;
                    const dateE=this.yearEndSelected;
                    const sInd=this.yearsArrayEnd.findIndex(d => d.year===this.yearStartSelected);
                    const eInd=this.yearsArrayEnd.findIndex(d => d.year===this.yearEndSelected);
                    if (sInd === -1) { // 开始结束时间不在同一面板
                        if (dateS < dateE) {
                            this.yearsArrayEnd=this.yearsArrayEnd.map((d, i) => {
                                if (d.year===this.yearEndSelected) {
                                    if (i < eInd) d.multiple='multiple';
                                    if (i === eInd) d.selected='selected';
                                }
                                return d;
                            })
                        } else {
                            this.yearsArrayEnd=this.yearsArrayEnd.map((d, i) => {
                                if (d.year===this.yearEndSelected) {
                                    if (i > eInd) d.multiple='multiple';
                                    if (i === eInd) d.selected='selected';
                                }
                                return d;
                            })
                        }
                    } else { // 开始结束时间在同一面板
                        if (sInd < eInd) {
                            this.yearsArrayEnd=this.yearsArrayEnd.map((d, i) => {
                                if (d.year===this.yearEndSelected) {
                                    if (i > sInd && i < eInd) d.multiple='multiple';
                                    if (i === sInd || i === eInd) d.selected='selected';
                                }
                                return d;
                            })
                        } else {
                            this.yearsArrayEnd=this.yearsArrayEnd.map((d, i) => {
                                if (d.year===this.yearEndSelected) {
                                    if (i < sInd && i > eInd) d.multiple='multiple';
                                    if (i === sInd || i === eInd) d.selected='selected';
                                }
                                return d;
                            })
                        }
                    }
                } else if (!this.yearStartSelected && this.yearEndSelected) {
                    this.yearsArrayEnd=this.yearsArrayEnd.map(d => {
                        if (d.year===this.yearEndSelected) {
                            d.selected='selected'
                        }
                        return d;
                    })
                }
            },
            /**
             * 上一组年
             */
            prevYearStart() {
                const date=(this.yearsArrayStart.shift().year-1).toString();
                this.switchDateStart(date);
            },
            /**
             * 上一组年
             */
            prevYearEnd() {
                const date=(this.yearsArrayEnd.shift().year-1).toString();
                this.switchDateEnd(date);
            },
            /**
             * 下一组年
             */
            nextYearStart() {
                const date=(parseInt(this.yearsArrayStart.pop().year)+12).toString();
                this.switchDateStart(date);
            },
            /**
             * 下一组年
             */
            nextYearEnd() {
                const date=(parseInt(this.yearsArrayEnd.pop().year)+12).toString();
                this.switchDateEnd(date);
            },
            /**
             * 点击日期-开始日期
             * @param year
             */
            changeDateStart(year) {
                let clearOther=false;
                if (this.yearStartSelected && this.yearEndSelected) {
                    this.yearStartSelected=year;

                    this.yearEndSelected='';
                    clearOther=true;

                    this.changeYearsArrayEnd('', clearOther);
                } else if (this.yearStartSelected && !this.yearEndSelected) {
                    this.yearEndSelected=year;
                } else {
                    this.yearStartSelected=year;
                }

                this.changeYearsArrayStart(year, clearOther);
            },
            /**
             * 点击日期-结束日期
             * @param year
             */
            changeDateEnd(year) {
                let clearOther=false;
                if (this.yearStartSelected && this.yearEndSelected) {
                    this.yearEndSelected=year;

                    this.yearStartSelected='';
                    clearOther=true;

                    this.changeYearsArrayStart('', clearOther);
                } else if (!this.yearStartSelected && this.yearEndSelected) {
                    this.yearStartSelected=year;
                } else {
                    this.yearEndSelected=year;
                }

                this.changeYearsArrayEnd(year, clearOther);
            },
            /**
             * 鼠标进入-开始日期
             * @param year
             */
            yearEnterStart(year) {
                if (!this.yearStartSelected && !this.yearEndSelected) return;
                if (this.yearStartSelected && this.yearEndSelected) return;
                const yearsArray=this.yearsArrayStart;
                const dateS=this.yearStartSelected;
                const dateE=this.yearEndSelected;
                const dateN=year;

                /* 修改开始右侧结束时间面板multiple -s */
                if (this.yearEndSelected) {
                    const yearsArrayEnd=this.yearsArrayEnd;
                    if (dateE > dateN) { // 选中的左侧面板开始时间大于当前鼠标hover的时间
                        const sInd=yearsArrayEnd.findIndex(d => d.year===this.yearEndSelected);
                        this.yearsArrayEnd=yearsArrayEnd.map((d, i) => {
                            if (i < sInd) {
                                d.multiple='multiple'
                            } else {
                                d.multiple=''
                            }
                            return d;
                        })
                    } else {
                        const sInd=yearsArrayEnd.findIndex(d => d.year===this.yearEndSelected);
                        this.yearsArrayEnd=yearsArrayEnd.map((d, i) => {
                            if (i > sInd) {
                                d.multiple='multiple'
                            } else {
                                d.multiple=''
                            }
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

                // 当前传入时间的索引
                const nInd=yearsArray.findIndex(d => d.year===year);
                // 以选择的时间的索引
                const sInd=yearsArray.findIndex(d => d.year===this.yearStartSelected);

                if (dateS) { // 选择了开始时间
                    if (nInd > sInd) {
                        this.yearsArrayStart=yearsArray.map((d, i) => {
                            if (i > sInd && i <= nInd) {
                                d.multiple='multiple'
                            } else {
                                d.multiple=''
                            }
                            return d;
                        })
                    } else {
                        this.yearsArrayStart=yearsArray.map((d, i) => {
                            if (i < sInd && i >= nInd) {
                                d.multiple='multiple'
                            } else {
                                d.multiple=''
                            }
                            return d;
                        })
                    }
                } else { // 选择了结束时间
                    const len=yearsArray.length;
                    if (dateN > dateE) {
                        this.yearsArrayStart=yearsArray.map((d, i) => {
                            if (i > 0 && i <= nInd) {
                                d.multiple='multiple'
                            } else {
                                d.multiple=''
                            }
                            return d;
                        })
                    } else {
                        this.yearsArrayStart=yearsArray.map((d, i) => {
                            if (i < len && i >= nInd) {
                                d.multiple='multiple'
                            } else {
                                d.multiple=''
                            }
                            return d;
                        })
                    }
                }
            },
            /**
             * 鼠标进入-结束日期
             * @param year
             */
            yearEnterEnd(year) {
                if (!this.yearStartSelected && !this.yearEndSelected) return;
                if (this.yearStartSelected && this.yearEndSelected) return;
                const yearsArray=this.yearsArrayEnd;
                const dateS=this.yearStartSelected;
                const dateE=this.yearEndSelected;
                const dateN=year;

                /* 修改左侧开始时间面板multiple -s */
                if (this.yearStartSelected) {
                    const yearsArrayStart=this.yearsArrayStart;
                    if (dateS > dateN) { // 选中的左侧面板开始时间大于当前鼠标hover的时间
                        const sInd=yearsArrayStart.findIndex(d => d.year===this.yearStartSelected);
                        this.yearsArrayStart=yearsArrayStart.map((d, i) => {
                            if (i < sInd) {
                                d.multiple='multiple'
                            } else {
                                d.multiple=''
                            }
                            return d;
                        })
                    } else {
                        const sInd=yearsArrayStart.findIndex(d => d.year===this.yearStartSelected);
                        this.yearsArrayStart=yearsArrayStart.map((d, i) => {
                            if (i > sInd) {
                                d.multiple='multiple'
                            } else {
                                d.multiple=''
                            }
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

                // 当前传入时间的索引
                const nInd=yearsArray.findIndex(d => d.year===year);
                // 以选择的时间的索引
                const sInd=yearsArray.findIndex(d => d.year===this.yearEndSelected);

                if (dateE) {
                    // 向前选择
                    if (nInd > sInd) {
                        this.yearsArrayEnd=yearsArray.map((d, i) => {
                            if (i > sInd && i <= nInd) {
                                d.multiple='multiple'
                            } else {
                                d.multiple=''
                            }
                            return d;
                        })
                    } else {
                        this.yearsArrayEnd=yearsArray.map((d, i) => {
                            if (i < sInd && i >= nInd) {
                                d.multiple='multiple'
                            } else {
                                d.multiple=''
                            }
                            return d;
                        })
                    }
                } else {
                    const len=yearsArray.length;
                    if (dateN > dateS) {
                        this.yearsArrayEnd=yearsArray.map((d, i) => {
                            if (i <= nInd) {
                                d.multiple='multiple'
                            } else {
                                d.multiple=''
                            }
                            return d;
                        })
                    } else {
                        this.yearsArrayEnd=yearsArray.map((d, i) => {
                            if (i < len && i >= nInd) {
                                d.multiple='multiple'
                            } else {
                                d.multiple=''
                            }
                            return d;
                        })
                    }
                }
            },
            /**
             * 确定
             */
            pickerConfirm() {
                const dateS=this.yearStartSelected;
                const dateE=this.yearEndSelected;
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