<template>
    <div class="component component-padding">
        <h1>Tree组件</h1>
        <div class="treeCom">
            <div>
                <h3>1.单选</h3>
                <Tree
                        :data="treeData"
                        @change="change"
                />
            </div>
            <div>
                <h3>2.多选-联动</h3>
                <Tree
                        :multiple="true"
                        :data="treeData2"
                        @change="change2"
                />
            </div>
            <div>
                <h3>3.多选-不联动</h3>
                <Tree
                        :multiple="true"
                        :linkage="false"
                        :data="treeData3"
                        @change="change3"
                />
            </div>
        </div>
        <br><br><br><br><br><br><br><br><br>
    </div>
</template>

<script>
    /**
     * 参数说明
     * @id id String
     *
     * @name name String
     *
     * @checked 参数状态 String
     * uncheck 未选中
     * checked 选中
     * notNull 非空
     *
     * @open 展开子项 Boolean
     *
     * @isHide 是否隐藏 Boolean
     */
    const dataArr=[
        {
            id: '1', name: '顶级', open: true, checked: 'uncheck',
            children: [
                {id: '21', name: '二级1', checked: 'uncheck'},
                {
                    id: '22', name: '二级2', open: true, checked: 'uncheck',
                    children: [
                        {id: '221', name: '三级1', checked: 'uncheck'},
                        {
                            id: '222', name: '三级2', open: true, checked: 'uncheck',
                            children: [
                                {id: '2221', name: '四级1', checked: 'uncheck'},
                                {
                                    id: '2222', name: '四级2', checked: 'uncheck'
                                },
                                {id: '2223', name: '四级3', checked: 'uncheck'},
                                {id: '2224', name: '四级4', checked: 'uncheck'},
                                {id: '2225', name: '四级5', checked: 'uncheck'},
                            ]
                        },
                        {id: '223', name: '三级3', checked: 'uncheck'},
                        {id: '224', name: '三级4', checked: 'uncheck'},
                        {id: '225', name: '三级5', checked: 'uncheck'},
                    ]
                },
                {id: '23', name: '二级3', checked: 'uncheck'},
            ]
        }
    ];
    const dataArr2=[
        {
            id: '0', name: '顶级顶级顶级顶级顶级顶级顶级顶级顶级顶级顶级顶级', open: true, checked: 'uncheck',
            children: [
                {
                    id: '1',  name: '一级1', open: true, checked: 'uncheck',
                    children: [
                        {id: '12', name: '二级2', checked: 'uncheck'},
                        {id: '121', name: '二级3', checked: 'uncheck'},
                        {id: '122', name: '二级4', checked: 'uncheck'},
                        {
                            id: '1321', name: '二级1', open: true, checked: 'uncheck',
                            children: [
                                {id: '13', name: '三级2', checked: 'uncheck'},
                                {id: '131', name: '三级3', checked: 'uncheck'},
                                {id: '132', name: '三级4', checked: 'uncheck'},
                            ]
                        }
                    ]
                },
                {
                    id: '2', name: '一级2', open: true, checked: 'uncheck',
                    children: [
                        {id: '222', name: '二级2', checked: 'uncheck'},
                        {id: '2221', name: '二级1', checked: 'uncheck'},
                        {id: '2222', name: '二级3',checked: 'uncheck'}
                    ]
                },
                {
                    id: '3', name: '一级3', open: true, checked: 'uncheck',
                    children: [
                        {id: '322', name: '二级2', checked: 'uncheck'},
                        {id: '3220', name: '二级0', checked: 'uncheck'},
                        {id: '3221', name: '二级1', checked: 'uncheck'}
                    ]
                }
            ]
        }
    ];
    const dataArr3=[
        {
            id: '0', name: '顶级顶级顶级顶级顶级顶级顶级顶级顶级顶级顶级顶级', open: true, checked: 'uncheck',
            children: [
                {
                    id: '1',  name: '一级1', open: true, checked: 'uncheck',
                    children: [
                        {id: '12', name: '二级2', checked: 'uncheck'},
                        {id: '121', name: '二级3', checked: 'uncheck'},
                        {id: '122', name: '二级4', checked: 'uncheck'},
                        {
                            id: '1321', name: '二级1', open: true, checked: 'uncheck',
                            children: [
                                {id: '13', name: '三级2', checked: 'uncheck'},
                                {id: '131', name: '三级3', checked: 'uncheck'},
                                {id: '132', name: '三级4', checked: 'uncheck'},
                            ]
                        }
                    ]
                },
                {
                    id: '2', name: '一级2', open: true, checked: 'uncheck',
                    children: [
                        {id: '222', name: '二级2', checked: 'uncheck'},
                        {id: '2221', name: '二级1', checked: 'uncheck'},
                        {id: '2222', name: '二级3',checked: 'uncheck'}
                    ]
                },
                {
                    id: '3', name: '一级3', open: true, checked: 'uncheck',
                    children: [
                        {id: '322', name: '二级2', checked: 'uncheck'},
                        {id: '3220', name: '二级0', checked: 'uncheck'},
                        {id: '3221', name: '二级1', checked: 'uncheck'}
                    ]
                }
            ]
        }
    ];
    export default {
        name: "TreeView",
        data() {
            return {
                treeData: dataArr, // type: Array
                treeData2: dataArr2, // type: Array
                treeData3: dataArr3 // type: Array
            }
        },
        methods: {
            // 选择的项
            change({id}) {
                console.log('选择的项::::', id);
            },
            // 选择的项
            change2({id, checkedIds}) {
                console.log('选择的项::::', id, checkedIds);
            },
            // 选择的项
            change3({id, checkedIds}) {
                console.log('选择的项::::', id, checkedIds);
            },
        }
    }
</script>

<style lang="stylus" scoped>

.component-padding
    padding-bottom 200px !important
    //width 240px
    .treeCom
        display flex
        justify-content space-between
        width 600px
        > div
            width 190px
            margin-right 24px
            overflow-y auto

</style>
