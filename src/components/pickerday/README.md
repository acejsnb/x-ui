### 示例
```vue
<template>
    <div class="component component-padding">
        <h1>Pickertime组件</h1>
        <Pickertime :time="time" @change="timeChange" />
        <br><br><br><br><br><br><br><br><br><br><br>
    </div>
</template>

<script>
    export default {
        name: "PickertimeView",
        data() {
            return {
                time: ''
            }
        },
        methods: {
            timeChange(time) {
                console.log('选择的时分秒::::', time);
                this.time=time;
            }
        }
    }
</script>

```