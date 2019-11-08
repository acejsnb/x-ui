<template>
    <div class="p-tree-node">
        <div
                :class="['p-tree-node-content', !multiple&&treeItem.selected==='checked'&&'p-tree-node-content-selected']"
                :style="{paddingLeft: (index.split('-').length-1)*16+'px'}"
        >
            <section
                    class="p-tree-svg"
                    @click="openChild"
                    :style="{opacity: triangleShow?1:0}"
            ><TriangleSvg :class="['svg', treeItem.open&&'rotate']" /></section>
            <section class="p-tree-node-check" @click="handleCheck(treeItem.id, index)">
                <article class="p-tree-svg" v-if="multiple">
                    <transition-group name="checkSvg">
                        <CheckedSvg class="svg" key="checkedSvg" v-if="treeItem.selected==='checked'" />
                        <UncheckSvg class="svg" key="uncheckSvg"  v-else-if="treeItem.selected==='uncheck'" />
                        <NotNullSvg class="svg" key="notNullSvg"  v-else />
                    </transition-group>
                </article>
                <article class="p-tree-node-title">
                    <span class="p-tree-node-name" @mouseenter="treeItemEnter">{{treeItem.name}}</span>
                    <span class="p-tree-selected-num" v-if="multiple && treeItem.children">{{`${selectedQuantity(treeItem.children )}/${treeItem.children.length}`}}</span>
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
                    :select="select"
            ></TreeNode>
        </div>
    </div>
</template>

<script>
    import TriangleSvg from 'icon/triangle.svg';
    import CheckedSvg from 'icon/checked.svg';
    import UncheckSvg from 'icon/uncheck.svg';
    import NotNullSvg from 'icon/not_null.svg';

    export default {
        name: 'TreeNode',
        components: { TriangleSvg, CheckedSvg, UncheckSvg, NotNullSvg },
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
            select: {
                type: Function
            },
            /**
             * 递归改变check状态
             */
            changeStatus: {
                type: Function
            },
            /**
             * 下拉三角形是否显示
             */
            triangleShow: {
                type: Boolean
            },
            /**
             * 索引
             */
            index: {
                type: String
            }
        },
        methods: {
            // 展开
            openChild() {
                this.treeItem.open=!this.treeItem.open
            },
            // 鼠标hover
            treeItemEnter(e) {
                const srcElement=e.srcElement;
                const {clientWidth, scrollWidth}=srcElement;
                if (scrollWidth > clientWidth) srcElement.title=srcElement.innerText;
            },
            // 选择
            handleCheck(id, index) {
                if (this.multiple) {
                    let status='';
                    const treeItem=this.treeItem;
                    const {selected, children}=treeItem;

                    if (selected === 'checked') { // 未选中
                        status='uncheck';
                    } else {
                        //  if (selected === 'uncheck' || selected === 'notNull')
                        status='checked';
                    }
                    setTimeout(() => {
                        treeItem.selected=status;
                        if (children && children.length) treeItem.children=this.setSelectedStatus(children, status);
                        this.treeItem=treeItem;
                    }, 0);
                }

                // 执行父级的函数
                this.select(id, index);
            },
            // 设置selected状态
            setSelectedStatus(data, status) {
                return data.map(d => {
                    d.selected=status;
                    if (d.children && d.children.length) d.children=this.setSelectedStatus(d.children, status);
                    return d;
                })
            },
            // 选择的数量
            selectedQuantity(data) {
                return data.filter(d => d.selected==='checked' || d.selected==='notNull').length;
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
        &.p-tree-node-content-selected
            background-color $primary-blue-500
            .p-tree-node-check
                .p-tree-node-title
                    .p-tree-node-name
                        color #fff
        .p-tree-svg
            margin-left 4px
            //margin-right 4px
            width 20px
            height 20px
            line-height @height
            text-align center
            overflow hidden
            .svg
                vertical-align middle
                transition transform .3s
            .rotate
                transform rotate(90deg)
        .p-tree-node-check
            display flex
            align-items center
            width 100%
            .p-tree-svg
                margin-right 4px
            .p-tree-node-title
                display flex
                align-items center
                justify-content space-between
                padding-top 2px
                width 100%
                user-select none
                .p-tree-node-name
                    max-width 110px
                    white-space nowrap
                    text-overflow ellipsis
                    overflow hidden
                    font-size 14px
                    color $grey-grey-900
                .p-tree-selected-num
                    font-size 12px
                    color $grey-grey-600
    .p-tree-child
        width 100%

@keyframes checkIn
    from
        opacity .5
        transform translate3d(0,0,0) scale(0.7)
    to
        opacity 1
        transform scale(1)
@keyframes checkOut
    from
        opacity 1
        transform translate3d(0,0,0) scale(1)
    to
        opacity .5
        transform scale(0.7)

.checkSvg-enter-active
    animation checkIn .3s
.checkSvg-leave-active
    animation checkOut .3s

</style>
