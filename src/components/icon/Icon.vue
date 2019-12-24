<template>
    <i class="p-icon" @click="handleClick">
        <IconClose v-if="type==='close'" />
        <IconSearch v-if="type==='search'" />
    </i>
</template>

<script>
    import IconClose from '../static/iconSvg/icon_close.svg';
    import IconSearch from '../static/iconSvg/sreach.svg';

    export default {
        name: 'Icon',
        components: { IconClose, IconSearch },
        props: {
            /**
             * icon类型
             */
            type: {
                type: String,
                default: 'close'
            }
        },
        methods: {
            handleClick() {
                /**
                 * 点击icon的回调
                 * @type {Function}
                 */
                this.$emit('click')
            }
        }
    }
</script>

<style lang="stylus">

.p-icon
    display inline-block
    width 16px
    height @width
    line-height @width
    text-align center
    cursor pointer
    font-size 0
    svg
        vertical-align middle
        path
            transition fill .3s
        &:hover
            path
                fill $blue-500

</style>
