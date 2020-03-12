<template>
    <div class="p-drop-group" @mouseenter="groupEnter">
        <section class="p-drop-group-title">
            <article class="p-drop-group-title-content">
                <!-- @slot html内容 -->
                <slot />
            </article>
            <article :class="['p-drop-group-triangle', !optionStatus && 'p-drop-group-triangle-rotate']"><Triangle /></article>
        </section>
    </div>
</template>

<script>
    import Triangle from '../static/iconSvg/triangle.svg';

    import GroupOption from './depend/groupOption';

    export default {
        name: "DropGroup",
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
        watch: {
            value(n, o) {
                if (n === o) return;
                if (this.gOption) this.gOption.value=n;
            },
            data(n, o) {
                if (n === o) return;
                if (this.gOption) this.dOption.data=n;
            }
        },
        methods: {
            groupEnter(e) {
                if (this.gOption) {
                    this.setDropdownStatus(true);
                } else {
                    // 初始化实例
                    this.gOption=GroupOption({
                        tag: e,
                        prams: {
                            value: this.value,
                            data: this.data
                        }
                    }).$on('change', (obj) => {
                        this.optionClick(obj);
                    });

                    this.gOption.$nextTick(() => {
                        this.setDropdownStatus(true);
                    });
                }
            },
            // 设置下拉状态
            setDropdownStatus(status) {
                this.optionStatus=status;
                if (this.gOption) this.gOption.optionStatus=status;
            },
            /**
             * 提交当前选择的值
             * @param obj
             *        pId parentId
             *        cId childId
             *        cName childName
             */
            optionClick(obj) {
                this.$emit('change', obj);
                this.setDropdownStatus(false);
            }
        },
        beforeDestroy() {
            // 组件销毁前重置状态表
            this.setDropdownStatus(false);
            GroupOption.remove(this.gOption)
        }
    }
</script>

<style lang="stylus">

@mport "../static/stylus/animate/selectDownUpExtend.styl"

.p-drop-group
    position relative
    display inline-block
    vertical-align middle
    font-size 0
    .p-drop-group-title
        position relative
        padding-right 16px
        cursor pointer
        z-index 10
        .p-drop-group-title-content
            font-size 14px
            color $grey-900
        .p-drop-group-triangle
            position absolute
            right 0
            top 50%
            transform translateY(-8px)
            svg
                transition transform .3s
        .p-drop-group-triangle-rotate
            svg
                transform rotate(180deg)
.p-drop-group-item
    position absolute
    top 100%
    outline none
    padding-top 4px
    padding-bottom 4px
    background-color #fff
    border 1px solid $grey-300
    border-radius 4px
    box-shadow $box-shadow-bottom
    min-width 120px
    max-width 240px
    max-height 240px
    overflow-y auto
    z-index 1000
    .p-drop-item-title
        padding-left 12px
        padding-right 12px
        height 36px
        line-height @height
        color $grey-500
        font-size 14px
        white-space nowrap
        text-overflow ellipsis
        overflow hidden
    .p-drop-group-option
        padding-left 20px
        padding-right 12px
        width 100%
        height 32px
        line-height 32px
        font-size 14px
        color $grey-900
        cursor pointer
        white-space nowrap
        text-overflow ellipsis
        overflow hidden
        &:hover
            background-color $grey-200
        &.p-drop-group-option-selected
            color $blue-500
            background-color $blue-100
        &.p-drop-group-option-disable
            color $grey-400
            cursor not-allowed
    .p-drop-option-left
        left 0
    .p-drop-option-right
        right 0

</style>
