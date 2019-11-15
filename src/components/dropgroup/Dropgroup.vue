<template>
    <div class="p-drop-group" @mouseenter="dropdownShow" @mouseleave="dropdownHide">
        <section class="p-drop-group-title">
            <article>
                <!-- @slot html内容 -->
                <slot></slot>
            </article>
            <article :class="['triangle', optionStatus && 'triangleRotate']"><Triangle /></article>
        </section>
        <transition name="slideDownUp">
            <div class="p-drop" v-show="optionStatus">
                <div v-for="group in data" :key="group.id">
                    <section class="p-drop-item-title">{{group.name}}</section>
                    <section :class="['p-drop-option', 'p-drop-option-'+position]">
                        <article
                                :class="['option', value===item.id&&'option-selected', item.disabled&&'option-disable']"
                                v-for="item in group.children"
                                :key="item.id"
                                @click="optionClick(group.id, item.id, item.name, item.disabled)"
                        >{{item.name}}</article>
                    </section>
                </div>
            </div>
        </transition>
    </div>
</template>

<script>
    import Triangle from '../static/iconSvg/triangle.svg';

    export default {
        name: "DropGroup",
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
             * @param pId parentId
             * @param cId childId
             * @param cName childName
             * @param disabled 是否禁用点击
             */
            optionClick(pId, cId, cName, disabled) {
                if (disabled) return;
                this.$emit('change', {cId, cName, pId});
                this.dropdownHide();
            }
        }
    }
</script>

<style lang="stylus" scoped>

@import "../static/stylus/animate/slideDownUp.styl"

.p-drop-group
    position relative
    display inline-block
    vertical-align middle
    .p-drop-group-title
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
    .p-drop
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
        max-height 240px
        overflow-y auto
        z-index 1
        .p-drop-item-title
            padding-left 12px
            padding-right 12px
            height 36px
            line-height @height
            color $grey-grey-500
            font-size 14px
        .option
            padding-left 20px
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