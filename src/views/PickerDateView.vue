<template>
    <div class="component component-padding">
        <h1>PickerDate组件</h1>
        <PickerDate :date="dateSingleNull" @change="dateChangeSingleNull" />
    </div>
</template>

<script>
    export default {
        name: "PickerDateView",
        data() {
            return {
                dateSingleNull: '',
            }
        },
        methods: {
            dateChangeSingleNull(date) {
                console.log('选择的日期::::', date);
                this.dateSingleNull=date;
            },
        }
    }
</script>

<style lang="stylus" scoped>

.component-padding
    padding-bottom 200px !important
    width 240px

</style>