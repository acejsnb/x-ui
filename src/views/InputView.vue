<template>
    <div class="input">
        <h3>1.不带icon</h3>
        <Input v-model="inoutVal" placeholder="请搜索" />
        <h3>2.带icon</h3>
        <Input iconType="search" v-model="inoutVal2" />
    </div>
</template>

<script>
    export default {
        name: "RadioView",
        data() {
            return {
                inoutVal: '',
                inoutVal2: '',
            }
        },
        watch: {
            inoutVal(n, o) {
                if (n === o) return;
                console.log('输入的值：：：', n);
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