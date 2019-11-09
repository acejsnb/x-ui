<template>
    <div class="p-tree-node">
        <div
                :class="['p-tree-node-content', !multiple&&treeItem.checked==='checked'&&'p-tree-node-content-checked']"
                :style="{paddingLeft: paddingLeft+'px'}"
        >
            <section
                    class="p-tree-svg"
                    @click="openChild"
            ><TriangleSvg :class="['svg', treeItem.open&&'rotate']" v-if="triangleShow" /></section>
            <section class="p-tree-node-check" @click="handleCheck(treeItem.id, index)">
                <i :class="['p-tree-check-box', 'p-tree-check-box-'+treeItem.checked]" v-if="multiple"></i>
                <article class="p-tree-node-title" :style="{width: (164-paddingLeft)+'px'}">
                    <span class="p-tree-node-name" @mouseenter="treeItemEnter">{{treeItem.name}}</span>
                    <span class="p-tree-checked-num" v-if="checkedNumShow">{{quantity}}/{{treeItem.children.length}}</span>
                </article>
            </section>
        </div>
        <div class="p-tree-child" v-show="treeItem.open">
            <TreeNode
                    :multiple="multiple"
                    v-for="(item, ind) in treeItem.children"
                    :key="item.id"
                    :treeItem="item"
                    :triangleShow="!!(item.children&&item.children.length)"
                    :index="`${index}-${ind}`"
                    :change="change"
            ></TreeNode>
        </div>
    </div>
</template>

<script>
    import TriangleSvg from 'icon/triangle.svg';

    export default {
        name: 'TreeNode',
        components: { TriangleSvg },
        props: {
            /**
             * 是否开启多选
             */
            multiple: {
                type: Boolean,
                default: false
            },
            /**
             * 树形结构子项数据列表
             */
            treeItem: {
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
             * 下拉三角形是否显示
             */
            triangleShow: {
                type: Boolean,
                default: false
            },
            /**
             * 索引
             */
            index: {
                type: String,
                default: ''
            }
        },
        computed: {
            // 没想左边内边距
            paddingLeft() {
                return (this.index.split('-').length-1)*16;
            },
            // 显示选中数量比
            checkedNumShow() {
                return this.multiple && this.treeItem.children && this.treeItem.children.length;
            },
            // 选中的数量
            quantity() {
                return this.treeItem.children.filter(d => d.checked==='checked' || d.checked==='notNull').length;
            }
        },
        methods: {
            // 展开/收起
            openChild() {
                this.treeItem.open=!this.treeItem.open
            },
            // 鼠标hover
            treeItemEnter(e) {
                const target=e.target;
                const {clientWidth, scrollWidth, title}=target;
                if (!title && scrollWidth > clientWidth) target.title=target.innerText;
            },
            // 选择
            handleCheck(id, index) {
                if (this.multiple) {
                    let status='';
                    const treeItem=this.treeItem;
                    const {checked, children}=treeItem;

                    if (checked === 'checked') {
                        status='uncheck';
                    } else {
                        //  if (checked === 'uncheck' || checked === 'notNull')
                        status='checked';
                    }

                    if (children && children.length) treeItem.children=this.setCheckedStatus(children, status);
                    treeItem.checked=status;
                    this.treeItem=treeItem;
                }

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

.p-tree-node
    width 100%
    .p-tree-node-content
        position relative
        display flex
        align-items center
        margin-top 4px
        margin-bottom 4px
        padding-right 16px
        height 32px
        cursor pointer
        &:hover
            background-color $grey-grey-200
        &.p-tree-node-content-checked
            background-color $primary-blue-500
            .p-tree-node-check
                .p-tree-node-title
                    .p-tree-node-name
                        color #fff
        .p-tree-svg
            //margin-left 4px
            //margin-right 4px
            width 20px
            height @width
            line-height @height
            text-align center
            //overflow hidden
            .svg
                vertical-align middle
                transition transform .3s
            .rotate
                transform rotate(90deg)
        .p-tree-node-check
            display inline-flex
            align-items center
            width 184px
            .p-tree-check-box
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
                &.p-tree-check-box-checked
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
                &.p-tree-check-box-notNull
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
            .p-tree-svg
                margin-right 4px
            .p-tree-node-title
                display flex
                align-items center
                justify-content space-between
                user-select none
                .p-tree-node-name
                    max-width 110px
                    line-height 32px
                    white-space nowrap
                    text-overflow ellipsis
                    overflow hidden
                    font-size 14px
                    color $grey-grey-900
                .p-tree-checked-num
                    font-size 12px
                    color $grey-grey-600
    .p-tree-child
        width 100%

</style>
