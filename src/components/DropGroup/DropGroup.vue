<template>
    <div class="p-drop-group" @mouseenter="dropdownShow" @mouseleave="dropdownHide">
        <section class="p-drop-group-title">
            <article class="p-drop-group-title-content">
                <!-- @slot html内容 -->
                <slot></slot>
            </article>
            <article :class="['p-drop-group-triangle', !optionStatus && 'p-drop-group-triangle-rotate']"><Triangle /></article>
        </section>
        <transition name="slideDownUpUi">
            <div class="p-drop-group-item" v-show="optionStatus">
                <div v-for="group in data" :key="group.id">
                    <section class="p-drop-item-title">{{group.name}}</section>
                    <article
                            :class="['p-drop-group-option', value===item.id&&'p-drop-group-option-selected', item.disabled&&'p-drop-group-option-disable']"
                            v-for="item in group.children"
                            :key="item.id"
                            @click="optionClick(group.id, item.id, item.name, item.disabled)"
                            @mouseenter="optionEnter"
                    >{{item.name}}</article>
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
            // 子项鼠标移入
            optionEnter(e) {
                const target=e.target;
                const {clientWidth, scrollWidth, title}=target;
                if (!title && scrollWidth > clientWidth) target.title=target.innerText;
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

<style lang="stylus">

    @import "../static/stylus/animate/slideDownUpUi.styl"

    .p-drop-group
        position relative
        display inline-block
        vertical-align middle
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
            padding-top 4px
            padding-bottom 4px
            background-color #fff
            border 1px solid $grey-300
            border-radius 4px
            box-shadow 0 5px 10px rgba(31,35,41,.1)
            min-width 120px
            max-width 240px
            max-height 240px
            overflow-y auto
            z-index 11
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
                padding 5px 12px 5px 20px
                //width 100%
                //height 32px
                line-height 22px
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
                    color #c3c7cb !important
                    cursor not-allowed
            .p-drop-option-left
                left 0
            .p-drop-option-right
                right 0

</style>
