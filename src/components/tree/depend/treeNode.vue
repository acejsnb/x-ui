<template>
    <div class="p-tree-node">
        <div
                v-show="!treeItem.isHide"
                :class="['p-tree-node-content', !multiple&&treeItem.checked==='checked'&&'p-tree-node-content-checked']"
                :style="{paddingLeft: paddingLeft+'px'}"
        >
            <section
                    class="p-tree-svg"
                    @click="openChild"
            ><ArrowTriangle :class="['p-tree-icon-svg', treeItem.open&&'p-tree-icon-rotate']" v-if="triangleShow" /></section>
            <div class="p-tree-node-check" @click="handleCheck(treeItem.id, index)">
                <i :class="['p-tree-check-box', 'p-tree-check-box-'+treeItem.checked]" v-if="multiple"></i>
                <section class="p-tree-node-title">
                    <article
                            class="p-tree-node-name"
                            @mouseenter="treeItemEnter"
                            v-html="treeItem.name"
                    ></article>
                </section>
            </div>
        </div>
        <div class="p-tree-child" v-show="treeItem.open">
            <TreeNode
                    :multiple="multiple"
                    v-for="(item, ind) in treeItem.children"
                    :key="item.id+'-'+ind"
                    :treeItem="item"
                    :triangleShow="!!(item.children&&item.children.length)"
                    :index="`${index}-${ind}`"
                    :change="change"
            ></TreeNode>
        </div>
    </div>
</template>

<script>
    import ArrowTriangle from '../../static/iconSvg/arrow_triangle.svg';

    export default {
        name: 'TreeNode',
        components: { ArrowTriangle },
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
                return (this.index.split('-').length-1)*24+8;
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

<style lang="stylus">
</style>
