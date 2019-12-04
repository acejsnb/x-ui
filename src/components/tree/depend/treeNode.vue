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
            ><ArrowTriangle :class="['p-tree-icon-svg', treeItem.open&&'p-tree-icon-rotate']" v-if="triangleShow&&triangleStatus" /></section>
            <div class="p-tree-node-check" @click="handleCheck(treeItem, index)">
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
                    :linkage="linkage"
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
             * 是否联动选择
             */
            linkage: {
                type: Boolean,
                default: true
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
        data() {
            return {
                triangleStatus: true // 三角形是否显示
            }
        },
        computed: {
            // 左边内边距
            paddingLeft() {
                return (this.index.split('-').length-1)*24+8;
            }
        },
        watch: {
            // 监听treeItem数据变化-设置当前项是否显示三角形按钮
            treeItem: {
                handler(n, o) {
                    if (n === o) return;
                    if (n.children && n.children.length) {
                        let arrShow=[]; // 判断显示的数据
                        this.filterData(n.children, arrShow);
                        this.triangleStatus = arrShow.length === 0;
                    }
                },
                deep: true
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
            handleCheck(obj, index) {
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
                    if (this.linkage && children && children.length) treeItem.children=this.setCheckedStatus(children, status);

                    treeItem.checked=status;
                    this.treeItem=treeItem;
                }

                // 执行父级的函数
                this.change(obj, index);
            },
            // 判断children是否是全部隐藏状态
            filterData(arr, arrShow) {
                return arr.map(d => {
                    if (d.children && d.children.length) {
                        const c=this.filterData(d.children, arrShow);
                        d.children=c;
                        d.isHide=c.every(d2 => d2.isHide===true);
                    }
                    setTimeout(() => {
                        if (!d.isHide) arrShow.push(d);
                    }, 0);
                    return d;
                })
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
