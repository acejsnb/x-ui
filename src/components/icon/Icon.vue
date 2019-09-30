<template>
    <i class="p-icon p-icon-close" @click="handleClick">
        <IconClose v-if="type==='close'" />
    </i>
</template>

<script>
    import IconClose from 'icon/icon_close.svg';

    export default {
        name: 'Icon',
        components: { IconClose },
        props: {
            type: {
                type: String,
                default: 'close'
            }
        },
        methods: {
            handleClick() {
                this.$emit('click')
            }
        }
    }
</script>

<style lang="stylus">
@import "~stylus/tools.styl"

.p-icon
  display inline-block
  width 24px
  height @width
  line-height @width
  text-align center
  cursor pointer
  svg
    vertical-align middle
.p-icon-close:hover
  svg
    path
      fill #0091ff

</style>
