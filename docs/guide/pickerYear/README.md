### PickerYear 年选择 示例-开发中...

<template>
    <div class="component component-padding">
        <h1>PickerYear组件</h1>
        <PickerYear :date="dateDouble" :range="true" @change="dateChangeDouble" />
        <PickerYear :date="dateSingle" @change="dateChangeSingle" />
    </div>
</template>

<script>
    export default {
        name: "PickerYearView",
        data() {
            return {
                // dateSingle: '2020',
                dateSingle: '',
                // dateDouble: ''
                dateDouble: '2015-2020'
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

```vue
<template>
    <div class="component component-padding">
        <h1>PickerYear组件</h1>
        <PickerYear :date="dateDouble" :range="true" @change="dateChangeDouble" />
        <PickerYear :date="dateSingle" @change="dateChangeSingle" />
    </div>
</template>

<script>
    export default {
        name: "PickerYearView",
        data() {
            return {
                // dateSingle: '2020',
                dateSingle: '',
                // dateDouble: ''
                dateDouble: '2015-2020'
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

```