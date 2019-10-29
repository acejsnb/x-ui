<template>
    <div class="component component-padding">
        <h1>Pickertime组件</h1>
        <Pickerday :time="time" @change="timeChange" />
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

<style lang="stylus" scoped>

.component-padding
    padding-bottom 200px !important

</style>