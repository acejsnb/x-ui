<template>
    <div class="p-select-check">
        <CheckNode
                v-for="(item, ind) in selectData"
                :key="item.id"
                :selectItem="item"
                :index="String(ind)"
                :change="change"
        />
    </div>
</template>

<script>
    import CheckNode from './depend/checkNode';

    export default {
        name: 'Selectcheck',
        components: { CheckNode },
        props: {
            /**
             * 树形结构数据列表
             */
            data: {
                type: Array,
                default: () => []
            }
        },
        computed: {
            selectData: {
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
            change(id, index) {
                // return;
                let iArr=(index.split('-')); // 拿到索引值
                iArr.pop(); // 这里不需要遍历最后一个索引的数据
                let data=this.selectData;
                this.changeParentChecked(data, iArr);
                const checkedIds=this.filterIds(this.selectData);
                /**
                 * 点击某项返回的数据
                 * @param id
                 * @param checkedIds 选择的id组，多选时才返回
                 * @type Function
                 */
                this.$emit('change', {id, checkedIds});
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
                    if (d.checked === 'checked') arr.push(d.id);
                    if (d.children && d.children.length) this.recursionIds(d.children, arr);
                });
            }
        }
    }
</script>

<style lang="stylus" scoped>

.p-select-check
    background-color #ccc
    width 100%
    //min-width 224px
    max-width 280px
    //overflow-y auto

</style>
