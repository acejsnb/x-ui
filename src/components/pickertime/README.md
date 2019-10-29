### 示例
```vue
<template>
    <div class="component component-padding">
        <h1>Pickertime组件</h1>
        <h3>format="hms"</h3>
        <Pickertime :time="time1" format="hms" :range="true" @change="timeChange1" />
        <br><br><br><br><br>
        <h3>format="hm"</h3>
        <Pickertime :time="time2" format="hm" @change="timeChange2" />
    </div>
</template>

<script>
    export default {
        name: "PickertimeView",
        data() {
            return {
                time1: '',
                time2: '',
            }
        },
        methods: {
            timeChange1(time) {
                console.log('选择的时分秒::::', time);
                this.time1=time;
            },
            timeChange2(time) {
                console.log('选择的时分秒::::', time);
                this.time2=time;
            }
        }
    }
</script>

```