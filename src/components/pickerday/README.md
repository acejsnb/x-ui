### 示例-开发中...
```vue
<template>
    <div class="component component-padding">
        <h1>PickerDay组件</h1>
        <PickerDay :date="dateDouble" :range="true" @change="dateChangeDouble" />
        <br><br><br><br><br><br><br><br><br>
        <br><br><br><br><br><br><br><br><br>
        <br><br><br><br><br>
        <PickerDay :date="dateSingle" @change="dateChangeSingle" />
    </div>
</template>

<script>
    export default {
        name: "PickerDayView",
        data() {
            return {
                // dateSingle: '2020.02.29',
                dateSingle: '',
                dateDouble: ''
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