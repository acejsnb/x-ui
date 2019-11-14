<template>
    <div>
        <PanelDoubleDay
                v-if="range"
                :date="date"
                @change="changeDouble"
        />
        <PanelSingleDay
                v-else
                :date="date"
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
    @import "~stylus/tools.styl"
    @import "~stylus/animate/opacityScale.styl"
    @import "~stylus/datePicker/pickerInput.styl"
    @import "~stylus/datePicker/pickerMain.styl"

</style>