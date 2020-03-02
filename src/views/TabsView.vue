 
<template>
    <div class="toggleView">
        <div class="component component-padding">
            <h1 class="main-title">Tabs组件</h1>
            <div class="display-box">
                <div class="display-panel">
                    <h5>一级页签</h5>
                    <Tabs type="first-nav" :data="tabData"  :tabId="1"/>
                </div>
            
                <div class="display-panel">
                    <h5>二级页签</h5>
                    <Tabs type="second-nav" :data="tabData" :tabId="2"/>
                </div>
            
                <div class="display-panel">
                    <h5>卡片页签</h5>
                    <Tabs type="card" :data="tabData" :tabId="3"/>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        name: "TabsView",
        data() {
            return {
                tabId: 0,
            }
        },
        computed: {
            tabData() {   
                return [
                    {name: '一' },
                    {name: '弟二' },
                    {name: '第三个' },
                    {name: '第四个字' },
                    {name: '五个字字字' },
                    {name: '六个字的情况' },
                ]
            }
        },
        watch: {
            
        },
        mounted() {
          
        },
        methods:{
        }
    }
</script>

<style lang="stylus" scoped>
.component 
    .main-title
        margin-bottom 30px
        border-bottom 1px solid #ddd
        padding-bottom 12px
    .display-box 
        padding 20px
        .display-panel
            margin-bottom 60px
            h5 
                margin-bottom 10px

</style>
