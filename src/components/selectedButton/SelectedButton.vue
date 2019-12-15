<template>
    <div class="p-selected-button">
        div.p-selected-button
    </div>
</template>

<script>
    export default {
        name: "SelectedButton",
        props: {
            // 选择内容后的title
            text: {
                type: String,
                default: ''
            },
            // 占位符
            placeholder: {
                type: String,
                default: '请选择'
            }
        }
    }
</script>

<style lang="stylus">
.p-selected-button
    display inline-block

</style>