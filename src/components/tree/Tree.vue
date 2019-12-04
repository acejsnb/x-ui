<template>
    <div class="p-tree">
        <TreeNode
                :multiple="multiple"
                :linkage="linkage"
                v-for="(item, ind) in treeData"
                :key="item.id+'-'+ind"
                :treeItem="item"
                :triangleShow="!!(item.children&&item.children.length)"
                :index="String(ind)"
                :change="change"
        />
    </div>
</template>

<script>
    import TreeNode from './depend/treeNode';

    export default {
        name: 'Tree',
        components: { TreeNode },
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
             * 树形结构数据列表
             */
            data: {
                type: Array,
                default: () => []
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
             * @param obj
             * @param index 索引串
             */
            change(obj, index) {
                // return;
                const { id }=obj;
                if (this.multiple) {
                    let iArr=(index.split('-')); // 拿到索引值
                    iArr.pop(); // 这里不需要遍历最后一个索引的数据
                    let data=this.treeData;
                    if (this.linkage) this.changeParentChecked(data, iArr);
                    const checkedObj=this.filterIds(data);
                    const checkedIds=checkedObj.map(d => d.id);
                    /**
                     * 点击某项返回的数据
                     * @param id
                     * @param checkedIds 选择的id组，多选时才返回
                     * @param obj 选择的当前对象，多选时才返回
                     * @param checkedObj 选择的对象组，多选时才返回
                     * @type Function
                     */
                    this.$emit('change', {id, checkedIds, obj, checkedObj});
                } else {
                    this.treeData=this.changeCheckedItem(this.treeData, id);
                    /**
                     * 点击某项返回的数据
                     * @param id
                     * @type Function
                     */
                    this.$emit('change', obj);
                }
            },
            /**
             * 单选改变状态
             * @param data
             * @param id
             * @return {*}
             */
            changeCheckedItem(data, id) {
                return data.map(d => {
                    if (d.id === id) {
                        d.checked='checked';
                    } else {
                        d.checked='uncheck';
                    }
                    if (d.children && d.children.length) d.children=this.changeCheckedItem(d.children, id);
                    return d;
                });
            },
            /**
             * 多选修改状态
             * @param data
             * @return {string}
             */
            changeStatus(data) {
                let checked='';
                if (data.every(d => d.checked==='checked')) {
                    checked = 'checked';
                } else if (data.every(d => d.checked==='uncheck')) {
                    checked = 'uncheck';
                } else {
                    checked = 'notNull';
                }

                return checked;
            },
            /**
             * 改变被筛选到的数据的状态
             * @param data
             * @param iArr
             */
            changeParentChecked(data, iArr) {
                // 当前筛选的数据
                const curr=[];
                this.currentData(data, iArr, curr);

                curr.forEach(d => {
                    d.checked=this.changeStatus(d.children);
                });
            },
            /**
             * 递归筛选子项有选中的数据
             * @param data
             * @param iArr
             * @param curr 筛选到的数据放入数组
             */
            currentData(data, iArr, curr) {
                let ind=iArr.shift();
                data.forEach((d, i) => {
                    if (ind && i===Number(ind)) {
                        curr.unshift(d);
                        if (d.children && d.children.length) this.currentData(d.children, iArr, curr);
                    }
                });
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
                    if (d.checked === 'checked') arr.push(d);
                    if (d.children && d.children.length) this.recursionIds(d.children, arr);
                });
            }
        }
    }
</script>

<style lang="stylus">
@import "../static/stylus/tree/tree.styl"

</style>
