<template>
    <div class="toggleView">
        <div class="component component-padding">
            <h1>Stick组件</h1>
            <Stick :data="stickData"/>
            <Stick :data="stickData1"/>
            <Stick :data="stickData2"/>
            <Stick :data="stickData3"/>
            <Stick :data="stickData4"/>
        </div>
    </div>
</template>

<script>
    export default {
        name: "StickView",
        data() {
            return {
                stickData: [
                    {
                        type: 'default',
                        text: '当前无报警'
                    },
                    {
                        type: 'error',
                        text: '实时报警：10个（0个未处理）风险等级：低'
                    },
                    {
                        type: 'warning',
                        text: '实时报警：10个（0个未处理）风险等级：低'
                    },
                    {
                        type: 'info',
                        text: '今天有报告尚未查看：月能耗日志 年能耗日志'
                    }
                ],
                stickData1: [
                    {
                        type: 'default',
                        text: '当前无报警'
                    }
                ],
                stickData2: [
                    {
                        type: 'error',
                        text: '实时报警：10个（0个未处理）风险等级：低'
                    }
                ],
                stickData3: [
                    {
                        type: 'warning',
                        text: '实时报警：10个（0个未处理）风险等级：低'
                    }
                ],
                stickData4: [
                    {
                        type: 'info',
                        text: '今天有报告尚未查看：月能耗日志 年能耗日志'
                    }
                ]
            }
        }
    }
</script>

<style lang="stylus" scoped>
.p-stick
    margin-bottom 12px

</style>
