<template>
    <div class="toggleView">
        <div class="component component-padding">
            <h1>Stick组件</h1>
            <Stick type="default" text="当前无报警" />
            <Stick type="error" text="实时报警：10个（0个未处理）风险等级：低" />
            <Stick type="warning" text="实时报警：10个（0个未处理）风险等级：低" />
            <Stick type="info" text="今天有报告尚未查看：月能耗日志   年能耗日志" />
        </div>
    </div>
</template>

<script>
    export default {
        name: "StickView"
    }
</script>

<style lang="stylus" scoped>

</style>
