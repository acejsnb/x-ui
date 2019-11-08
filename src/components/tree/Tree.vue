<template>
    <div class="p-tree" :style="{height: height+'px'}">
        <TreeNode
                :multiple="multiple"
                v-for="(item, ind) in treeData"
                :key="item.id"
                :treeItem="item"
                :triangleShow="!!(item.children&&item.children.length)"
                :index="String(ind)"
                :select="select"
        ></TreeNode>
    </div>
</template>

<script>
    import TreeNode from './depend/treeNode';

    export default {
        name: 'Tree',
        components: {
            TreeNode
        },
        props: {
            /**
             * 树形结构的高
             */
            height: {
                type: Number,
                default: 0
            },
            /**
             * 是否开启多选
             */
            multiple: {
                type: Boolean,
                default: false
            },
            /**
             * 树形结构数据列表
             */
            data: {
                type: Array,
                default: []
            }
        },
        computed: {
            treeData: {
                get() {
                    return this.data;
                },
                set(newData) {
                    return newData;
                }
            }
        },
        methods: {
            /**
             * 点击某项
             * @param id
             * @param index 索引串
             */
            select(id, index) {
                setTimeout(() => {
                    if (this.multiple) {
                        let iArr=index.split('-');
                        this.treeData=this.changeParent(this.treeData, iArr);
                        const selectedIds=this.filterIds(this.treeData);
                        /**
                         * 点击某项返回的数据
                         * @param id
                         * @param selectedIds 选择的id组
                         */
                        this.$emit('select', {id, selectedIds});
                    } else {
                        this.treeData=this.changeSelectedItem(this.treeData, id);
                        this.$emit('select', {id});
                    }
                });
            },
            /**
             * 单选改变状态
             * @param data
             * @param id
             * @return {*}
             */
            changeSelectedItem(data, id) {
                return data.map(d => {
                    if (d.id === id) {
                        d.selected='checked';
                    } else {
                        d.selected='uncheck';
                    }
                    if (d.children && d.children.length) d.children=this.changeSelectedItem(d.children, id);
                    return d;
                });
            },
            /**
             * 修改状态
             * @param data
             * @return {string}
             */
            changeStatus(data) {
                let selected='';
                const everyChecked=data.every(d => d.selected==='checked');
                const everyUncheck=data.every(d => d.selected==='uncheck');
                // const someNotNull=data.some(d => d.selected==='notNull');
                if (everyChecked) {
                    selected = 'checked';
                } else if (everyUncheck) {
                    selected = 'uncheck';
                } else {
                    selected = 'notNull';
                }

                return selected;
            },
            /**
             * 递归改变check状态
             * @param data
             * @param iArr
             * @return {*}
             */
            changeParent(data, iArr) {
                return data.map((d, i) => {
                    if (d.children && d.children.length) {
                        if (iArr && iArr.length && i===Number(iArr.shift())) {
                            d.children=this.changeParent(d.children, iArr);
                            d.selected=this.changeStatus(d.children);
                        }
                    }

                    return d;
                })
            },
            /**
             *  筛选选中的id
             */
            filterIds(data) {
                let arr=[];
                this.recursionIds(data, arr);

                return arr;
            },
            /**
             * 筛选选中的id
             * @param data
             * @param arr
             */
            recursionIds(data, arr) {
                data.forEach(d => {
                    if (d.selected === 'checked') arr.push(d.id);
                    if (d.children && d.children.length) this.recursionIds(d.children, arr);
                });
            }
        }
    }
</script>

<style lang="stylus" scoped>

.p-tree
  //background-color #ccc
  width 224px
  overflow-y auto

</style>
