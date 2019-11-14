<template>
    <div class="component component-padding">
        <h1>PickerWeek组件</h1>
<!--        <PickerWeek :date="dateDouble" sort="year" :range="true" @change="dateChangeDouble" />-->
        <br><br><br><br><br><br><br><br><br>
        <br><br><br><br><br><br><br><br><br>
        <br><br><br><br><br>
        <PickerWeek :date="dateSingle" sort="year" @change="dateChangeSingle" />
    </div>
</template>

<script>
    export default {
        name: "PickerWeekView",
        data() {
            return {
                // dateSingle: '2020.03',
                dateSingle: '',
                dateDouble: ''
                // dateDouble: '2007.05-2020.03'
            }
        },
        methods: {
            dateChangeSingle(date) {
                console.log('选择的日期::::', date);
                this.dateSingle=date;
            },
            dateChangeDouble(date) {
                console.log('选择的日期::::', date);
                this.dateDouble=date;
            }
        }
    }
</script>

<style lang="stylus" scoped>

.component-padding
    padding-bottom 200px !important
    width 240px

</style>