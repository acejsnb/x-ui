### 示例-开发中...
```vue
<template>
    <div class="component component-padding">
        <h1>PickerTime组件</h1>
        <h3>format="hms"</h3>
        <PickerTime :time="time1" format="hms" :range="true" @change="timeChange1" />
        <br><br><br><br><br>
        <h3>format="hm"</h3>
        <PickerTime :time="time2" format="hm" @change="timeChange2" />
    </div>
</template>

<script>
    export default {
        name: "PickerTimeView",
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

<style lang="stylus">

.component-padding
    padding-bottom 200px !important
    width 240px

</style>

```