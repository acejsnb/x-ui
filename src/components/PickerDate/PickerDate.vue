<template>
    <div class="p-picker">
        <PanelDoubleDate
                v-if="range"
                :date="date"
                :format="format"
                :sort="sort"
                :quickSwitch="quickSwitch"
                @change="changeDate"
        />
        <PanelSingleDate
                v-else
                :date="date"
                :format="format"
                :sort="sort"
                :quickSwitch="quickSwitch"
                @change="changeDate"
        />
    </div>
</template>

<script>
    import PanelSingleDate from './depend/panelSingleDate';
    import PanelDoubleDate from './depend/panelDoubleDate';

    export default {
        name: "PickerDate",
        components: { PanelSingleDate, PanelDoubleDate },
        props: {
            /**
             * 设置时间
             */
            date: {
                type: String,
                default: ''
            },
            /**
             * 时间段
             * @value 【false-时间点（默认值），true-时间段】
             */
            range: {
                type: Boolean,
                default: false
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
        methods: {
            /**
             * 点击日期
             * @param date String
             */
            changeDate(date) {
                this.$emit('change', date)
            }
        }
    }
</script>

<style lang="stylus">
    @import "../static/stylus/datePicker/pickerInput.styl"
    @import "../static/stylus/datePicker/pickerMain.styl"

    .p-picker-main-item-time-date
        margin-top 22px
        margin-bottom 22px

</style>