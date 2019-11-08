### 示例
```vue
<template>
    <div class="component component-padding">
        <h1>Tree组件</h1>
        <Tree
                :height="500"
                :data="treeData"
                @select="selectItem"
        />
        <br><br><br><br><br><br><br><br><br>
        <Tree
                :height="500"
                :multiple="true"
                :data="treeData2"
                @select="selectItem2"
        />
    </div>
</template>

<script>
    /**
     * @id id String
     *
     * @name name String
     *
     * @selected 参数状态 String
     * uncheck 未选中
     * checked 选中
     * notNull 非空
     *
     * @open 展开子项 Boolean
     */
    const dataArr=[
        {
            id: '1', name: '顶级', open: true, selected: 'uncheck',
            children: [
                {id: '21', name: '二级1', selected: 'uncheck'},
                {
                    id: '22', name: '二级2', open: true, selected: 'uncheck',
                    children: [
                        {id: '221', name: '三级1', selected: 'uncheck'},
                        {
                            id: '222', name: '三级2', open: true, selected: 'uncheck',
                            children: [
                                {id: '2221', name: '四级1', selected: 'uncheck'},
                                {
                                    id: '2222', name: '四级2', selected: 'uncheck'
                                },
                                {id: '2223', name: '四级3', selected: 'uncheck'},
                                {id: '2224', name: '四级4', selected: 'uncheck'},
                                {id: '2225', name: '四级5', selected: 'uncheck'},
                            ]
                        },
                        {id: '223', name: '三级3', selected: 'uncheck'},
                        {id: '224', name: '三级4', selected: 'uncheck'},
                        {id: '225', name: '三级5', selected: 'uncheck'},
                    ]
                },
                {id: '23', name: '二级3', selected: 'uncheck'},
            ]
        }
    ];
    const dataArr2=[
        {
            id: '1', name: '一级1', open: true, selected: 'uncheck',
            children: [
                {id: '12', name: '二级2', open: true, selected: 'uncheck'},
                {id: '121', name: '三级1', open: false, selected: 'uncheck'},
                {id: '122', name: '三级2', open: true, selected: 'uncheck'},
                {id: '1221', name: '四级1', selected: 'uncheck'},
                {id: '1222', name: '四级2', selected: 'uncheck'},
            ]
        },
        {
            id: '2', name: '一级2', open: true, selected: 'uncheck',
            children: [
                {id: '222', name: '二级2', open: true, selected: 'uncheck'},
                {id: '2221', name: '三级1', selected: 'uncheck'},
                {id: '2222', name: '三级2', open: true, selected: 'uncheck'},
                {id: '22221', name: '四级1', selected: 'uncheck'},
                {id: '22222', name: '四级2', selected: 'uncheck'},
                {id: '2223', name: '四级3', selected: 'uncheck'},
                {id: '2224', name: '四级4', selected: 'uncheck'},
                {id: '2225', name: '四级5', selected: 'uncheck'},
                {id: '223', name: '三级3', selected: 'uncheck'},
                {id: '224', name: '三级4', selected: 'uncheck'},
                {id: '225', name: '三级5', selected: 'uncheck'},
            ]
        },
        {
            id: '3', name: '一级3', open: true, selected: 'uncheck',
            children: [
                {id: '322', name: '二级2', open: true, selected: 'uncheck'},
                {id: '3221', name: '三级1', selected: 'uncheck'},
                {id: '3222', name: '三级2', open: true, selected: 'uncheck'},
                {id: '32221', name: '四级1', selected: 'uncheck'},
                {id: '32222', name: '四级2', selected: 'uncheck'}
            ]
        }
    ];
    export default {
        name: "TreeView",
        data() {
            return {
                treeData: dataArr, // type: Array
                treeData2: dataArr2 // type: Array
            }
        },
        methods: {
            // 选择的项
            selectItem({id, index}) {
                console.log('选择的项::::', id, index);
            },
            // 选择的项
            selectItem2({id, index}) {
                console.log('选择的项::::', id, index);
            },
        }
    }
</script>

```