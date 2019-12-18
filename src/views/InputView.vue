<template>
    <div class="input">
        <h3>1.不带icon</h3>
        <Input v-model="inputVal" placeholder="请搜索" />
        <h3>2.带icon</h3>
        <Input iconType="search" v-model="inputVal2" />
        <Button type="primary" @click="ceshi">测试</Button>
    </div>
</template>

<script>
    export default {
        name: "RadioView",
        data() {
            return {
                inputVal: '',
                inputVal2: '123',
            }
        },
        watch: {
            inoutVal(n, o) {
                if (n === o) return;
                console.log('输入的值：：：', n);
            }
        },
        methods: {
            ceshi() {
                this.inputVal2='';
            }
        }
    }
</script>

<style lang="stylus" scoped>
.input
    padding 16px
    h3
        margin 12px

</style>