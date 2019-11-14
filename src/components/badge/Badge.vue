<template>
    <div class="p-badge" @click="handleClick">
        <section>
            <!-- @slot html内容 -->
            <slot></slot>
        </section>
        <sup
             v-if="count || typeof dot==='string'"
             :class="['p-badge-normal', typeof dot==='string'?'p-badge-dot':'p-badge-text']"
             :style="{backgroundColor: bgColor}"
        >{{countVal}}</sup>
    </div>
</template>

<script>
    export default {
        name: "Badge",
        props: {
            /**
             * 右上角显示内容
             */
            count: {
                type: Number | String,
                default: ''
            },
            /**
             * 是否显示圆点
             */
            dot: {
                type: String
            },
            /**
             * 背景颜色
             */
            bgColor: {
                type: String,
                default: '#f54e45'
            }
        },
        computed: {
            /**
             * 当传入的count大于等于100
             * @returns {string|default.props.count|{default, type}}
             */
            countVal() {
                if (typeof this.count==='number' && this.count>=100) return '99+';
                else return this.count;
            }
        },
        methods: {
            handleClick() {
                /**
                 * 点击事件
                 * @type Function
                 */
                this.$emit('click')
            }
        }
    }
</script>

<style lang="stylus" scoped>

@import "~stylus/tools.styl"

.p-badge
    position relative
    display inline-block
    cursor pointer
    &+.p-badge
        margin-left 20px
    .p-badge-normal
        position absolute
        top 0
        right 0
        transform translate(50%, -50%)
        //background-color $error-red-500
        border-radius 9px
        text-align center
        color #fff
        font-size 12px
        z-index 10
    .p-badge-text
        padding-left 4px
        padding-right 4px
        min-width 18px
        height 18px
        line-height @height
    .p-badge-dot
        padding 0
        min-width 8px
        height 8px

</style>