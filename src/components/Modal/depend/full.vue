<template>
    <div class="p-modal-main p-modal-main-full">
        <div class="p-modal-title">
            <section class="p-title-text">{{title}}</section>
			<i class="p-modal-title-icon">
				<Close @click="$emit('close')" />
			</i>
        </div>
        <div class="p-modal-content">
            <div class="p-modal-content-main" ref="modalContentMain">
                <slot />
            </div>
        </div>
    </div>
</template>

<script>
    import Close from '../../static/iconSvg/icon_close.svg';

    export default {
        name: 'Full',
        components: { Close },
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
