<template>
    <div class="Button">
        <div class="component component-padding">
            <h1>Select组件</h1>
            <!--
                组件说明:
                    参数   说明           默认值   类型   是否必须   可选值
                    v-model  当前绑定的值 --   String false
                    data 下拉菜单数据列表  [] Array true
                    width 宽  'left' String false
            -->
            <div>
                <Select v-model="selVal" :data="dataSelect" width="120" />
            </div>

            <div style="font-size: 16px;">
                <br><br><br><br><br><br><br><br>
            </div>
        </div>
    </div>
</template>

<script>
    const data=[
        { id: 'totalEnergy', name: '总量' },
        { id: 'singleParty', name: '单平米' },
        { id: 'lowerLevel', name: '下级分项' },
        { id: 'average', name: '滑动平均', disabled: true }
    ];
    const data2=[
        { id: 'totalEnergy', name: '总量' },
        { id: 'singleParty', name: '单平米' }
    ];
    export default {
        name: 'SelectView',
        data() {
            return {
                selVal: 'totalEnergy',
                selText: '总量',
                dataSelect: data,
                selVal2: 'totalEnergy',
                dataSelect2: data2
            }
        },
        watch: {
            selVal(n, o) {
                if (n === o) return;
                this.selText=this.dataSelect.find(d => d.id === n).name
            }
        },
        methods: {
        }
    }
</script>

<style lang="stylus" scoped>

    .text
        font-size 14px
        color #1f2329

    .avatar
        display inline-block
        vertical-align middle
        padding-top 8px
        padding-bottom 8px
        img
            width 20px
            height @width

</style>
