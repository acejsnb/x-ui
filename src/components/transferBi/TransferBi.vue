<template>
    <div class="p-transfer-bi">
        <div class="p-transfer-bi-main">
            <div class="p-transfer-bi-left"></div>
            <div class="p-transfer-bi-right"></div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "TransferBi"
    }
</script>

<style lang="stylus">

.p-transfer-bi
    display inline-block
    .p-transfer-bi main
        background-color #fff
        border-radius 4px
        box-shadow 0 20px 30px 0 rgba(31,35,41,.15)
        width 600px
        height 480px

</style>