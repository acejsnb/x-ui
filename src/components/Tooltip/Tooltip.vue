 
<template>
    <transition name="fadeDownUpUi">
        <div  class="p-tooltip-box">
        </div>
    </transition>
</template>
<script>
export default {
    data () {
        return {
        }
    }
}
</script>
<style lang="stylus">
    @import "../static/stylus/animate/fadeDownUpUi.styl"
    .p-tooltip-box 
        position fixed
        padding 4px
        white-space:nowrap
        border 1px solid #E4E5E7
        border-radius 2px
        box-shadow $box-shadow-bottom
        background-color white
        color #1F2329
        font-size 12px
        pointer-events none

</style>
