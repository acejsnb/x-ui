<template>
    <div class="p-picker-day">
        <div class="weeks">
            <ul>
                <li class="week" v-for="wt in weekText" :key="'wt'+wt">{{wt}}</li>
            </ul>
        </div>
        <div class="days">
            <ul>
                <li class="day"></li>
            </ul>
        </div>
    </div>
</template>

<script>
    import CountNumber from 'datePicker/CountNumber';
    import CountNowDate from 'datePicker/CountNowDate';
    export default {
        name: "Pickerday",
        computed: {
            weekText() {
                return ['一', '二', '三', '四', '五', '六', '七']
            }
        }
    }
</script>

<style lang="stylus" scoped>

@import "~stylus/tools.styl"

@import "~stylus/datePicker/pickerInput.styl"

.p-picker-day
    ul
        > li
            width 24px
            height @width
            font-size 14px
        .week
            color $grey-grey-500
        .day
            color $grey-grey-400

</style>