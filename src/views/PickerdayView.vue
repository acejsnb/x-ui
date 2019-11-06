<template>
    <div class="component component-padding">
        <h1>Pickerday组件</h1>
        <Pickerday :date="dateDouble" :range="true" @change="dateChangeDouble" />
        <br><br><br><br><br><br><br><br><br>
        <br><br><br><br><br><br><br><br><br>
        <br><br><br><br><br>
        <Pickerday :date="dateSingle" @change="dateChangeSingle" />
    </div>
</template>

<script>
    export default {
        name: "PickertimeView",
        data() {
            return {
                // dateSingle: '2020.02.29',
                dateSingle: '',
                // dateDouble: '2007.08.16-2020.02.29'
                dateDouble: '2020.02.14-2020.02.29'
                // dateDouble: ''
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