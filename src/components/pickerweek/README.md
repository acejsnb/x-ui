### 示例
```vue
<template>
    <div class="component component-padding">
        <h1>Pickermonth组件</h1>
        <Pickermonth :date="dateDouble" :range="true" @change="dateChangeDouble" />
        <br><br><br><br><br><br><br><br><br>
        <br><br><br><br><br><br><br><br><br>
        <br><br><br><br><br>
        <Pickermonth :date="dateSingle" @change="dateChangeSingle" />
    </div>
</template>

<script>
    export default {
        name: "PickermonthView",
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