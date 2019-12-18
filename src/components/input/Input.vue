<template>
    <div :class="['p-input', focus&&'p-input-focus']">
        <span class="p-input-icon" v-if="iconType"><Icon :type="iconType" /></span>
        <label class="p-input-label">
            <span class="p-input-normal p-placeholder" v-if="!inputVal">{{placeholder}}</span>
            <input
                    class="p-input-normal p-input-text"
                    type="text"
                    v-model="inputVal"
                    @focus="inputFocus"
                    @blur="inputBlur"
            >
        </label>
    </div>
</template>

<script>
    import Icon from '../icon';
    export default {
        name: "Input",
        components: { Icon },
        props: {
            value: {
                type: String,
                default: ''
            },
            iconType: {
                type: String,
                default: ''
            },
            placeholder: {
                type: String,
                default: 'Please enter'
            }
        },
        data() {
            return {
                focus: false, // 输入框获取焦点
                inputVal: '' // 监听是否正在输入
            }
        },
        watch: {
            value(n, o) {
                if (n === o) return;
                this.inputVal=n;
            },
            inputVal(n, o) {
                if (n === o) return;
                this.$emit('input', n);
            }
        },
        created() {
            const v=this.value;
            if (v) this.inputVal=v;
        },
        methods: {
            // 输入框获取焦点
            inputFocus() {
                this.focus=true;
            },
            // 输入框失去焦点
            inputBlur() {
                this.focus=false;
            }
        }
    }
</script>

<style lang="stylus">

.p-input
    display inline-flex
    align-items center
    border 1px solid $grey-400
    border-radius 4px
    width 100%
    height 32px
    transition border .3s, box-shadow .3s
    &:hover
        border-color $blue-500
    &.p-input-focus
        border-color $blue-500
        box-shadow 0 0 0 2px rgba(0,145,255,.2)
    .p-input-icon
        display inline-block
        padding-left 8px
        width 24px
        height 30px
        line-height @height
        text-align center
        z-index 1
    .p-input-label
        position relative
        width calc(100% - 30px)
    .p-input-normal
        display inline-block
        background none
        width 100%
        height 30px
        line-height @height
        font-size 14px
    .p-placeholder
        position absolute
        left 8px
        top 0
        color $grey-400
        z-index 1
    .p-input-text
        position relative
        padding-left 8px
        outline none
        border 0
        color $grey-900
        z-index 2

</style>