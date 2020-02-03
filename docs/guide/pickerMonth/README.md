### PickerMonth 月选择 示例-开发中...

<template>
    <div class="component component-padding">
        <h1>PickerMonth组件</h1>
        <PickerMonth :date="dateDouble" :range="true" @change="dateChangeDouble" />
        <PickerMonth :date="dateSingle" @change="dateChangeSingle" />
    </div>
</template>

<script>
    export default {
        name: "PickerMonthView",
        data() {
            return {
                // dateSingle: '2020.03',
                dateSingle: '',
                // dateDouble: ''
                // dateDouble: '2007.05-2017.10'
                dateDouble: '2020.02-2020.10'
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
        <h1>PickerMonth组件</h1>
        <PickerMonth :date="dateDouble" :range="true" @change="dateChangeDouble" />
        <PickerMonth :date="dateSingle" @change="dateChangeSingle" />
    </div>
</template>

<script>
    export default {
        name: "PickerMonthView",
        data() {
            return {
                // dateSingle: '2020.03',
                dateSingle: '',
                // dateDouble: ''
                // dateDouble: '2007.05-2017.10'
                dateDouble: '2020.02-2020.10'
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