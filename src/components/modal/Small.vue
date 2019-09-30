<template>
    <div class="p-modal-main p-modal-main-small">
        <div class="p-modal-title" v-if="title">
            <section class="p-title-text">{{title}}</section>
        </div>
        <div class="p-modal-content">
            <div class="p-modal-content-main" ref="modalContentMain">
                <slot name="small"></slot>
            </div>
        </div>
        <slot name="handle"></slot>
    </div>
</template>

<script>

    export default {
        name: 'Small',
        props: {
            title: {
                type: String,
                default: ''
            }
        }
    }
</script>

<style lang="stylus">
.p-modal-main-small
  top 120px
  left 50%
  margin-left -210px
  border-radius 4px
  width 420px
  .p-modal-title
    border 0
    height 40px
  .p-modal-content
    min-height auto

</style>
