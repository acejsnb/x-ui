<template>
    <div class="component component-padding">
        <h1>PickerDate组件</h1>
        <PickerDate :date="dateSingleNull" format="hm" @change="dateChangeSingleNull" />
        <PickerDate :date="dateSingle" format="hm" @change="dateChangeSingle" />
    </div>
</template>

<script>
    export default {
        name: "PickerDateView",
        data() {
            return {
                dateSingleNull: '',
                dateSingle: '2020.02.24 12:12',
            }
        },
        methods: {
            dateChangeSingleNull(date) {
                console.log('选择的日期::::', date);
                this.dateSingleNull=date;
            },
            dateChangeSingle(date) {
                console.log('选择的日期::::', date);
                this.dateSingle=date;
            },
        }
    }
</script>

<style lang="stylus" scoped>

.component-padding
    padding-bottom 200px !important
    width 240px

</style>