### TreeStage - 两种特殊形势的tree

<template>
    <div class="component component-padding">
        <h1>Tree组件</h1>
        <div class="treeCom">
            <div>
                <h3>1.多选-选择父级控制子级选中并禁用子级</h3>
                <TreeStage
                        :data="treeData2"
                        @change="change2"
                />
            </div>
            <div>
                <h3>2.多选-只能选择末级</h3>
                <TreeStage
                        :lastStage="true"
                        :data="treeData3"
                        @change="change3"
                />
            </div>
        </div>
    </div>
</template>

<script>
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
        name: "TreeStageView",
        data() {
            return {
                treeData2: dataArr2, // type: Array
                treeData3: dataArr3 // type: Array
            }
        },
        methods: {
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

```vue
<template>
    <div class="component component-padding">
        <h1>Tree组件</h1>
        <div class="treeCom">
            <div>
                <h3>1.多选-选择父级控制子级选中并禁用子级</h3>
                <TreeStage
                        :data="treeData2"
                        @change="change2"
                />
            </div>
            <div>
                <h3>2.多选-只能选择末级</h3>
                <TreeStage
                        :lastStage="true"
                        :data="treeData3"
                        @change="change3"
                />
            </div>
        </div>
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
     */
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
        name: "TreeStageView",
        data() {
            return {
                treeData2: dataArr2, // type: Array
                treeData3: dataArr3 // type: Array
            }
        },
        methods: {
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


```

### Attributes

| 参数     | 说明  | 类型    | 默认值  | 必须    |
| ------- | ---- | ------ | ------- | ------ |
| data    | 数据列表 | Array | [] | Yes     |
| @change   | 点击回调 | Function | -- | Yes     |
| lastStage  | 只能选择末级 | Boolean | false | no     |

### data参数说明

| 参数     | 说明  | 类型    | 默认值  | 必须    |
| ------- | ---- | ------ | ------- | ------ |
| id    | id | String | '' | Yes     |
| name   | name | String | '' | Yes     |
| open   | 是否展开子项 | Boolean | false | Yes     |
| checked   | 是否选中（可选值：uncheck/checked/notNull） | String | uncheck | Yes     |

::: tip
checked:
<br>
uncheck-未选中
<br>
checked-选中
<br>
notNull-半选状态
<br>
:::

::: tip
在多选情况下返回选中的id也就是checked的id，半选状态notNull不会返回
:::