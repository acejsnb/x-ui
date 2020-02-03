<template>
    <div class="p-picker">
        <PanelDoubleDay
                v-if="range"
                :date="date"
                @change="changeDouble"
        />
        <PanelSingleDay
                v-else
                :date="date"
                :calendar="calendar"
                @change="changeSingle"
        />
    </div>
</template>

<script>
    import PanelSingleDay from './depend/panelSingleDay';
    import PanelDoubleDay from './depend/panelDoubleDay';


    export default {
        name: "PickerDay",
        components: {
            PanelSingleDay,
            PanelDoubleDay
        },
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
            // 是否显示日历图标
            calendar: {
                type: Boolean,
                default: false
            }
        },
        methods: {
            /**
             * 点击日期
             * @param date String
             */
            changeSingle(date) {
                this.$emit('change', date)
            },
            /**
             * 点击日期
             * @param date String
             */
            changeDouble(date) {
                this.$emit('change', date)
            }
        }
    }
</script>

<style lang="stylus">
    @import "../static/stylus/datePicker/pickerMain.styl"
    @import "../static/stylus/datePicker/pickerInput.styl"

</style>