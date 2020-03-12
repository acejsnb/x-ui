<template>
    <div class="p-drop" @mouseenter="dropEnter">
        <section class="p-drop-title">
            <article class="p-drop-title-content">
                <!-- @slot html内容 -->
                <slot />
            </article>
            <article :class="['p-drop-triangle', !optionStatus && 'p-drop-triangle-rotate']"><Triangle /></article>
        </section>
    </div>
</template>

<script>
    import Triangle from '../static/iconSvg/triangle.svg';

    import DropOption from './depend/dropOption';

    export default {
        name: "Dropdown",
        components: { Triangle },
        props: {
            /**
             * 数据列表
             */
            data: {
                type: Array,
                default: () => [],
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
                 * 三角形状态
                 */
                optionStatus: false
            }
        },
        watch: {
            value(n, o) {
                if (n === o) return;
                if (this.dOption) this.dOption.value=n;
            },
            data(n, o) {
                if (n === o) return;
                if (this.dOption) this.dOption.data=n;
            }
        },
        methods: {
            dropEnter(e) {
                if (this.dOption) {
                    this.setDropdownStatus(true);
                } else {
                    // 初始化实例
                    this.dOption=DropOption({
                        tag: e,
                        prams: {
                            value: this.value,
                            data: this.data,
                            position: this.position
                        }
                    }).$on('change', (id) => {
                        this.optionClick(id);
                    });

                    this.dOption.$nextTick(() => {
                        this.setDropdownStatus(true);
                    });
                }
            },
            // 设置下拉状态
            setDropdownStatus(status) {
                this.optionStatus=status;
                if (this.dOption) this.dOption.optionStatus=status;
            },
            /**
             * 提交当前选择的值
             * @param id 返回值
             */
            optionClick(id) {
                this.$emit('input', id);
                this.setDropdownStatus(false);
            }
        },
        beforeDestroy() {
            // 组件销毁前重置状态表
            this.setDropdownStatus(false);
            DropOption.remove(this.dOption)
        }
    }
</script>

<style lang="stylus">

@import "../static/stylus/animate/selectDownUpExtend.styl"

.p-drop
    position relative
    display inline-block
    vertical-align middle
    font-size 0
    .p-drop-title
        position relative
        padding-right 16px
        cursor pointer
        z-index 10
        .p-drop-title-content
            font-size 14px
            color $grey-900
        .p-drop-triangle
            position absolute
            right 0
            top 50%
            transform translateY(-8px)
            svg
                transition transform .3s
        .p-drop-triangle-rotate
            svg
                transform rotate(180deg)
.p-drop-option
    position absolute
    outline none
    padding-top 4px
    padding-bottom 4px
    background-color #fff
    border 1px solid $grey-300
    border-radius 4px
    box-shadow 0 5px 10px rgba(31,35,41,.1)
    min-width 120px
    max-width 240px
    max-height 138px
    overflow-y auto
    z-index 1000
    .p-drop-option-item
        padding-left 12px
        padding-right 12px
        width 100%
        height 32px
        font-size 14px
        color $grey-900
        cursor pointer
        white-space nowrap
        text-overflow ellipsis
        overflow hidden
        .p-drop-option-svg
            margin-right 8px
            svg
                vertical-align middle
        span
            vertical-align middle
            line-height 32px
        &:hover
            background-color $grey-200
        &.option-selected
            color $blue-500
            background-color $blue-100
            .p-drop-option-svg
                svg
                    path
                        fill $blue-500
        &.p-drop-option-disable
            color $grey-400
            cursor not-allowed
.p-drop-option-left
    left 0
.p-drop-option-right
    right 0

</style>
