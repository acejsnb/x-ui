<template>
    <div>
        <PanelDoubleYear
                v-if="range"
                :date="date"
                @change="changeDouble"
        />
        <PanelSingleYear
                v-else
                :date="date"
                @change="changeSingle"
        />
    </div>
</template>

<script>
    import PanelSingleYear from './depend/panelSingleYear';
    import PanelDoubleYear from './depend/panelDoubleYear';


    export default {
        name: "PickerYear",
        components: {
            PanelSingleYear,
            PanelDoubleYear
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
    @import "../static/stylus/animate/opacityScale.styl"
    @import "../static/stylus/datePicker/pickerInput.styl"
    @import "../static/stylus/datePicker/pickerMain.styl"

</style>