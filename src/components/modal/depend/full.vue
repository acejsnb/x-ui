<template>
    <div class="p-modal-main p-modal-main-full">
        <div class="p-modal-title">
            <section class="p-title-text">{{title}}</section>
            <Icon type="close" class="p-modal-title-icon" @click="$emit('close')" />
        </div>
        <div class="p-modal-content">
            <div class="p-modal-content-main" ref="modalContentMain">
                <slot></slot>
            </div>
        </div>
    </div>
</template>

<script>
    import Icon from '../../Icon';

    export default {
        name: 'Full',
        components: { Icon },
        props: {
            title: {
                type: String,
                default: '',
                require: true
            }
        }
    }
</script>

<style lang="stylus">
.p-modal-main-full
  .p-modal-content
    height calc(100% - 57px)
    overflow auto

</style>
