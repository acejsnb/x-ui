### PickerWeek 周选择 示例-开发中...
```vue
<template>
    <div class="component component-padding">
        <h1>PickerMonth组件</h1>
        <PickerMonth :date="dateDouble" :range="true" @change="dateChangeDouble" />
        <br><br><br><br><br><br><br><br><br>
        <br><br><br><br><br><br><br><br><br>
        <br><br><br><br><br>
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

```