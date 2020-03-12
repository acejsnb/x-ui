<template>
    <div class="toggleView">
        <div class="component component-padding">
            <h1>Tag组件</h1>
            <div class="display-panel">
                <h3>1.big</h3>
                <Tag v-for="(color, i1) in tagBgColors" :key="'big'+color+i1" size='big' :color="color">大标签</Tag>
            </div>

            <div class="display-panel">
                <h3>2.small</h3>
                <Tag v-for="(color, i2) in tagBgColors" :key="'small'+color+i2" size='small' :color="color">小标签</Tag>
            </div>

            <div class="display-panel">
                <h3>3.status</h3>
                <Tag v-for="(status, i3) in statusList" :key="'status'+status+i3"  :status="status" type="circular"></Tag>
            </div>

            <div class="display-panel">
                <h3>4.dot</h3>
                <Tag v-for="(dot, i4) in statusList" :key="'status'+dot+i4"   :status="dot" type="dot"></Tag>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "TagView",
        data () {
            return {
                tagBgColors: ['#E1F2FF' , '#D5F6F2', '#D9F5D6', '#FAF1D1', '#FEEAD2', '#FDE3E2', '#FDDDEF', '#ECE2FE' ,'#B2E6F2', '#EFF0F1'],
                statusList : ['processing', 'error', 'completed', 'rejected','remove'],
                statusText : ['进行中', '错误', '已完成', '已拒绝','删除']
            }
        }
    }
</script>

<style lang="stylus" scoped>

    .component
        .display-panel
            margin-bottom 40px
        h3
            padding 8px
            font-size 16px

</style>
