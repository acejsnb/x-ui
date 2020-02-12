<template>
    <div class="Button">
        <div class="component component-padding">
            <h1>Select组件</h1>
            <div>
                <Select v-model="selVal" :data="dataSelect" width="120" />
            </div>
            <div style="font-size: 16px;">
                <br><br>
            </div>
            <div>
                <Select v-model="selVal1" :radius="true" :data="dataSelect1" width="120" />
            </div>
            <div style="font-size: 16px;">
                <br><br>
            </div>
            <div>
                <Select v-model="selVal2" title="项目：" :data="dataSelect2" width="160" />
            </div>
            <div style="font-size: 16px;">
                <br><br>
            </div>
            size=small
            <div>
                <Select size="small" v-model="selVal" :data="dataSelect" width="120" />
            </div>
        </div>
    </div>
</template>

<script>
    const data=[
        { id: 'totalEnergy', name: '总量' },
        { id: 'singleParty', name: '单平米' },
        { id: 'lowerLevel', name: '下级分项' },
        { id: 'average', name: '滑动平均滑动平均', disabled: true }
    ];
    const data2=[
        { id: 'totalEnergy', name: '总量' },
        { id: 'singleParty', name: '单平米' }
    ];
    export default {
        name: 'SelectView',
        data() {
            return {
                selVal: '',
                dataSelect: data,
                selVal1: 'totalEnergy',
                dataSelect1: JSON.parse(JSON.stringify(data)),
                selVal2: 'singleParty',
                dataSelect2: data2
            }
        },
        mounted() {
            setTimeout(() => {
                this.selVal='totalEnergy'
            }, 3000)
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
