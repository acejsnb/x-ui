<template>
    <div class="p-drop" @mouseenter="dropdownShow" @mouseleave="dropdownHide">
        <section class="p-drop-title">
            <article>
                <!-- @slot html内容 -->
                <slot></slot>
            </article>
            <article :class="['triangle', optionStatus && 'triangleRotate']"><Triangle /></article>
        </section>
        <transition name="slideDownUp">
            <section :class="['p-drop-option', 'p-drop-option-'+position]" v-show="optionStatus">
                <article
                        :class="['option', value===item.id&&'option-selected', item.disabled&&'option-disable']"
                        v-for="item in data"
                        :key="item.id"
                        @click="optionClick(item.id, item.disabled)"
                >{{item.name}}</article>
            </section>
        </transition>
    </div>
</template>

<script>
    import Triangle from '../static/iconSvg/triangle.svg';

    export default {
        name: "Dropdown",
        components: { Triangle },
        props: {
            /**
             * 数据列表
             */
            data: {
                type: Array,
                default: [],
                require: true
            },
            /**
             * 绑定的v-model值
             */
            value: {
                type: String,
                default: ''
            },
            /**
             * 下拉菜单位置，可选值【left， right】
             */
            position: {
                type: String,
                default: 'left'
            }
        },
        data() {
            return {
                /**
                 * 下拉菜单状态
                 */
                optionStatus: false
            }
        },
        methods: {
            dropdownShow() {
                this.optionStatus=true;
            },
            dropdownHide() {
                this.optionStatus=false;
            },
            /**
             * 提交当前选择的值
             * @param v 返回值
             * @param disabled 是否禁用点击
             */
            optionClick(v, disabled) {
                if (disabled) return;
                this.$emit('input', v);
                this.dropdownHide();
            }
        }
    }
</script>

<style lang="stylus" scoped>

@import "../static/stylus/animate/slideDownUp.styl"

.p-drop
    position relative
    display inline-block
    vertical-align middle
    .p-drop-title
        position relative
        display inline-flex
        align-items center
        cursor pointer
        z-index 10
        > article
            line-height 16px
        .triangle
            margin-left 4px
            width 16px
            height @width
            svg
                transition transform .3s
        .triangleRotate
            svg
                transform rotate(90deg)
    .p-drop-option
        position absolute
        top 100%
        padding-top 4px
        padding-bottom 4px
        background-color #fff
        border 1px solid $grey-grey-300
        border-radius 4px
        box-shadow 0 5px 10px rgba(31,35,41,.1)
        min-width 120px
        max-width 240px
        max-height 138px
        z-index 1
        .option
            padding-left 12px
            padding-right 12px
            width 100%
            height 32px
            line-height @height
            font-size 14px
            color #262626
            cursor pointer
            white-space nowrap
            text-overflow ellipsis
            overflow hidden
            &:hover
                background-color $grey-grey-200
            &.option-selected
                color $primary-blue-500
                background-color $primary-blue-100
            &.option-disable
                color #c3c7cb !important
                cursor not-allowed
    .p-drop-option-left
        left 0
    .p-drop-option-right
        right 0

</style>