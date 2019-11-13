<template>
    <div class="p-select-check-node">
        <div class="p-select-check-node-content">
            <div class="p-select-check-node-check" @click="handleCheck(selectItem.id, index)">
                <i :class="['p-select-check-check-box', 'p-select-check-check-box-'+selectItem.checked]"></i>
                <section class="p-select-check-node-title">
                    <article
                            class="p-select-check-node-name"
                            @mouseenter="selectItemEnter"
                    >{{selectItem.name}}</article>
                </section>
            </div>
        </div>
        <div class="p-select-check-child">
            <CheckNode
                    v-for="(item, ind) in selectItem.children"
                    :key="item.id"
                    :selectItem="item"
                    :index="`${index}-${ind}`"
                    :change="change"
            ></CheckNode>
        </div>
    </div>
</template>

<script>
    import TriangleSvg from 'icon/triangle.svg';

    export default {
        name: 'CheckNode',
        components: { TriangleSvg },
        props: {
            /**
             * 树形结构子项数据列表
             */
            selectItem: {
                type: Object,
                default: {}
            },
            /**
             * 点击某项
             */
            change: {
                type: Function,
                default: () => false
            },
            /**
             * 索引
             */
            index: {
                type: String,
                default: ''
            }
        },
        methods: {
            // 鼠标hover
            selectItemEnter(e) {
                const target=e.target;
                const {clientWidth, scrollWidth, title}=target;
                if (!title && scrollWidth > clientWidth) target.title=target.innerText;
            },
            // 选择
            handleCheck(id, index) {
                let status='';
                const selectItem=this.selectItem;
                const {checked, children}=selectItem;

                if (checked === 'checked') {
                    status='uncheck';
                } else {
                    //  if (checked === 'uncheck' || checked === 'notNull')
                    status='checked';
                }

                if (children && children.length) selectItem.children=this.setCheckedStatus(children, status);
                selectItem.checked=status;
                this.selectItem=selectItem;

                // 执行父级的函数
                this.change(id, index);
            },
            // 设置checked状态
            setCheckedStatus(data, status) {
                return data.map(d => {
                    d.checked=status;
                    if (d.children && d.children.length)
                        d.children=this.setCheckedStatus(d.children, status);
                    return d;
                })
            }
        }
    }
</script>

<style lang="stylus" scoped>
@import '~stylus/tools.styl'

.p-select-check-node
    width 100%
    .p-select-check-node-content
        position relative
        display flex
        align-items center
        margin-top 4px
        margin-bottom 4px
        height 32px
        cursor pointer
        &:hover
            background-color $grey-grey-200
        .p-select-check-node-check
            display inline-flex
            align-items center
            width 85%
            .p-select-check-check-box
                position relative
                display inline-block
                margin-right 4px
                background-color #fff
                border 1px solid $grey-grey-200
                border-radius 2px
                width 16px
                height @width
                &::after
                    position absolute
                    background none
                    transition transform .2s ease-in-out
                    transform rotate(0deg) scale(0)
                    z-index 1
                    content ''
                &.p-select-check-check-box-checked
                    background-color $primary-blue-500
                    border-color $primary-blue-500
                    &::after
                        top 2px
                        left 5px
                        border-right 2px solid #fff
                        border-bottom 2px solid #fff
                        width 4px
                        height 8px
                        transform rotate(45deg) scale(1)
                &.p-select-check-check-box-notNull
                    background-color $primary-blue-500
                    border-color $primary-blue-500
                    &::after
                        display block
                        top 6px
                        left 3px
                        background-color #fff
                        width 8px
                        height 2px
                        transform scale(1)
            .p-select-check-node-title
                position relative
                user-select none
                width 86%
                .p-select-check-node-name
                    -ms-transform translateY(3px)
                    width 100%
                    max-width 160px
                    height 32px
                    line-height @height
                    white-space nowrap
                    text-overflow ellipsis
                    overflow hidden
                    font-size 14px
                    color $grey-grey-900
    .p-select-check-child
        padding-left 20px
        width 100%

</style>
