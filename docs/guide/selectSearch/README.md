### SelectSearch

<template>
    <div class="selectSearchBox">
        <div>
            <h2 style="font-size: 18px;margin-bottom: 12px">一、单选</h2>
            <div style="padding-left: 24px">
                <h3 style="font-size: 16px;margin-bottom: 8px">1.单选禁用</h3>
                <SelectSearch
                        :disabled="true"
                        width="240"
                        v-model="selectId"
                        :data="selectData"
                />
                <div style="margin: 16px"></div>
                <h3 style="font-size: 16px;margin-bottom: 8px">2.单选</h3>
                <SelectSearch
                        width="240"
                        v-model="selectId"
                        :data="selectData"
                />
                <div style="margin: 16px"></div>
                <div style="margin-bottom: 200px"></div>
                <h3 style="font-size: 16px;margin-bottom: 8px">3.单选-tree</h3>
                <SelectSearch
                        width="240"
                        v-model="selectId"
                        :data="dataTreeSingle"
                />
            </div>
        </div>
        <div>
            <h2 style="font-size: 18px;margin-bottom: 12px">二、多选</h2>
            <div style="padding-left: 24px">
                <h3 style="font-size: 16px;margin-bottom: 8px">1.多选禁用</h3>
                <SelectSearch
                        :disabled="true"
                        :multiple="true"
                        width="240"
                        :selectedIds="selectedIds"
                        :data="selectData"
                        @change="selectChange"
                />
                <div style="margin: 16px"></div>
                <h3 style="font-size: 16px;margin-bottom: 8px">2.多选</h3>
                <SelectSearch
                        :multiple="true"
                        width="240"
                        :selectedIds="selectedIds"
                        :data="selectData"
                        @change="selectChange"
                />
                <div style="margin-bottom: 200px"></div>
                <h3 style="font-size: 16px;margin-bottom: 8px">3.多选-tree-联动</h3>
                <SelectSearch
                        :multiple="true"
                        width="240"
                        :selectedIds="selectedIds"
                        :data="dataTreeMultiple"
                        @change="selectChange"
                />
                <div style="margin-bottom: 200px"></div>
                <h3 style="font-size: 16px;margin-bottom: 8px">4.多选-tree-联动-不收纳</h3>
                <SelectSearch
                        :multiple="true"
                        :accept="false"
                        width="240"
                        :selectedIds="selectedIds"
                        :data="dataTreeMultiple"
                        @change="selectChange"
                />
                <div style="margin-bottom: 200px"></div>
                <h3 style="font-size: 16px;margin-bottom: 8px">5.多选-tree-不联动</h3>
                <SelectSearch
                        :multiple="true"
                        :linkage="false"
                        width="240"
                        :selectedIds="selectedIds"
                        :data="dataTreeMultiple"
                        @change="selectChange"
                />
                <div style="margin-bottom: 200px"></div>
                <h3 style="font-size: 16px;margin-bottom: 8px">6.多选-tree-不联动-不收纳</h3>
                <SelectSearch
                        :multiple="true"
                        :linkage="false"
                        :accept="false"
                        width="240"
                        :selectedIds="selectedIds"
                        :data="dataTreeMultiple"
                        @change="selectChange"
                />
                <div style="margin-bottom: 200px"></div>
            </div>
        </div>
    </div>
</template>

<script>
    const selectData=[
        {id: '100', name: '乔峰'},
        {id: '200', name: '阿三2'},
        {id: '300', name: '段誉3'},
        {id: '400', name: '阿紫4'},
        {id: '500', name: '洪七公5'},
        {id: '600', name: '慕容复6'},
    ];

    const dataTreeSingle=[
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

    const dataTreeMultiple=[
        {
            id: '0', name: '顶级顶级', open: true, checked: 'uncheck',
            children: [
                {
                    id: '1',  name: '一级1', open: false, checked: 'uncheck',
                    children: [
                        {id: '12', name: '二级2', checked: 'uncheck'},
                        {id: '121', name: '二级3', checked: 'uncheck'},
                        {id: '122', name: '二级4', checked: 'uncheck'},
                        {
                            id: '1321', name: '二级1', open: true, checked: 'uncheck',
                            children: [
                                {id: '1333', name: '三级2', checked: 'uncheck'},
                                {id: '1313', name: '三级3', checked: 'uncheck'},
                                {id: '1323', name: '三级4', checked: 'uncheck'},
                            ]
                        }
                    ]
                },
                {
                    id: '2', name: '一级2', open: false, checked: 'uncheck',
                    children: [
                        {id: '222', name: '二级20', checked: 'uncheck'},
                        {id: '2221', name: '二级21', checked: 'uncheck'},
                        {id: '2222', name: '二级22',checked: 'uncheck'}
                    ]
                },
                {
                    id: '3', name: '一级3', open: false, checked: 'uncheck',
                    children: [
                        {id: '322', name: '二级30', checked: 'uncheck'},
                        {id: '3220', name: '二级31', checked: 'uncheck'},
                        {id: '3221', name: '二级32', checked: 'uncheck'}
                    ]
                }
            ]
        }
    ];

    const dataTreeMultiple2=[
        {
            id: '0', name: '顶级顶级', open: true, checked: 'uncheck',
            children: [
                {
                    id: '1',  name: '一级1', open: false, checked: 'uncheck',
                    children: [
                        {id: '12', name: '二级2', checked: 'uncheck'},
                        {id: '121', name: '二级3', checked: 'uncheck'},
                        {id: '122', name: '二级4', checked: 'uncheck'},
                        {
                            id: '1321', name: '二级1', open: true, checked: 'uncheck',
                            children: [
                                {id: '1333', name: '三级2', checked: 'uncheck'},
                                {id: '1313', name: '三级3', checked: 'uncheck'},
                                {id: '1323', name: '三级4', checked: 'uncheck'},
                            ]
                        }
                    ]
                },
                {
                    id: '2', name: '一级2', open: false, checked: 'uncheck',
                    children: [
                        {id: '222', name: '二级20', checked: 'uncheck'},
                        {id: '2221', name: '二级21', checked: 'uncheck'},
                        {id: '2222', name: '二级22',checked: 'uncheck'}
                    ]
                },
                {
                    id: '3', name: '一级3', open: false, checked: 'uncheck',
                    children: [
                        {id: '322', name: '二级30', checked: 'uncheck'},
                        {id: '3220', name: '二级31', checked: 'uncheck'},
                        {id: '3221', name: '二级32', checked: 'uncheck'}
                    ]
                }
            ]
        }
    ];
    export default {
        name: "SelectSearchView",
        data() {
            return {
                selectId: '',
                selectData,
                // 多选选中的id
                selectedIds: [],
                dataTreeSingle,
                dataTreeMultiple,
                dataTreeMultiple2,
            }
        },
        watch: {
            selectId(n) {
                console.log('单选选中的项：', n);
            }
        },
        methods: {
            // 多选返回的id组
            selectChange(ids) {
                console.log('多选返回的id组:::', ids);
                this.selectedIds=ids;
            }
        }
    }
</script>

<style lang="stylus" scoped>
.selectSearchBox
    display flex
    justify-content space-around
    padding 16px

</style>

```vue
<template>
    <div class="selectSearchBox">
        <div>
            <h2 style="font-size: 18px;margin-bottom: 12px">一、单选</h2>
            <div style="padding-left: 24px">
                <h3 style="font-size: 16px;margin-bottom: 8px">1.单选禁用</h3>
                <SelectSearch
                        :disabled="true"
                        width="240"
                        v-model="selectId"
                        :data="selectData"
                />
                <div style="margin: 16px"></div>
                <h3 style="font-size: 16px;margin-bottom: 8px">2.单选</h3>
                <SelectSearch
                        width="240"
                        v-model="selectId"
                        :data="selectData"
                />
                <div style="margin: 16px"></div>
                <div style="margin-bottom: 200px"></div>
                <h3 style="font-size: 16px;margin-bottom: 8px">3.单选-tree</h3>
                <SelectSearch
                        width="240"
                        v-model="selectId"
                        :data="dataTreeSingle"
                />
            </div>
        </div>
        <div>
            <h2 style="font-size: 18px;margin-bottom: 12px">二、多选</h2>
            <div style="padding-left: 24px">
                <h3 style="font-size: 16px;margin-bottom: 8px">1.多选禁用</h3>
                <SelectSearch
                        :disabled="true"
                        :multiple="true"
                        width="240"
                        :selectedIds="selectedIds"
                        :data="selectData"
                        @change="selectChange"
                />
                <div style="margin: 16px"></div>
                <h3 style="font-size: 16px;margin-bottom: 8px">2.多选</h3>
                <SelectSearch
                        :multiple="true"
                        width="240"
                        :selectedIds="selectedIds"
                        :data="selectData"
                        @change="selectChange"
                />
                <div style="margin-bottom: 200px"></div>
                <h3 style="font-size: 16px;margin-bottom: 8px">3.多选-tree-联动</h3>
                <SelectSearch
                        :multiple="true"
                        width="240"
                        :selectedIds="selectedIds"
                        :data="dataTreeMultiple"
                        @change="selectChange"
                />
                <div style="margin-bottom: 200px"></div>
                <h3 style="font-size: 16px;margin-bottom: 8px">4.多选-tree-联动-不收纳</h3>
                <SelectSearch
                        :multiple="true"
                        :accept="false"
                        width="240"
                        :selectedIds="selectedIds"
                        :data="dataTreeMultiple"
                        @change="selectChange"
                />
                <div style="margin-bottom: 200px"></div>
                <h3 style="font-size: 16px;margin-bottom: 8px">5.多选-tree-不联动</h3>
                <SelectSearch
                        :multiple="true"
                        :linkage="false"
                        width="240"
                        :selectedIds="selectedIds"
                        :data="dataTreeMultiple"
                        @change="selectChange"
                />
                <div style="margin-bottom: 200px"></div>
                <h3 style="font-size: 16px;margin-bottom: 8px">6.多选-tree-不联动-不收纳</h3>
                <SelectSearch
                        :multiple="true"
                        :linkage="false"
                        :accept="false"
                        width="240"
                        :selectedIds="selectedIds"
                        :data="dataTreeMultiple"
                        @change="selectChange"
                />
                <div style="margin-bottom: 200px"></div>
            </div>
        </div>
    </div>
</template>

<script>
    const selectData=[
        {id: '100', name: '乔峰'},
        {id: '200', name: '阿三2'},
        {id: '300', name: '段誉3'},
        {id: '400', name: '阿紫4'},
        {id: '500', name: '洪七公5'},
        {id: '600', name: '慕容复6'},
    ];

    const dataTreeSingle=[
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

    const dataTreeMultiple=[
        {
            id: '0', name: '顶级顶级', open: true, checked: 'uncheck',
            children: [
                {
                    id: '1',  name: '一级1', open: false, checked: 'uncheck',
                    children: [
                        {id: '12', name: '二级2', checked: 'uncheck'},
                        {id: '121', name: '二级3', checked: 'uncheck'},
                        {id: '122', name: '二级4', checked: 'uncheck'},
                        {
                            id: '1321', name: '二级1', open: true, checked: 'uncheck',
                            children: [
                                {id: '1333', name: '三级2', checked: 'uncheck'},
                                {id: '1313', name: '三级3', checked: 'uncheck'},
                                {id: '1323', name: '三级4', checked: 'uncheck'},
                            ]
                        }
                    ]
                },
                {
                    id: '2', name: '一级2', open: false, checked: 'uncheck',
                    children: [
                        {id: '222', name: '二级20', checked: 'uncheck'},
                        {id: '2221', name: '二级21', checked: 'uncheck'},
                        {id: '2222', name: '二级22',checked: 'uncheck'}
                    ]
                },
                {
                    id: '3', name: '一级3', open: false, checked: 'uncheck',
                    children: [
                        {id: '322', name: '二级30', checked: 'uncheck'},
                        {id: '3220', name: '二级31', checked: 'uncheck'},
                        {id: '3221', name: '二级32', checked: 'uncheck'}
                    ]
                }
            ]
        }
    ];

    const dataTreeMultiple2=[
        {
            id: '0', name: '顶级顶级', open: true, checked: 'uncheck',
            children: [
                {
                    id: '1',  name: '一级1', open: false, checked: 'uncheck',
                    children: [
                        {id: '12', name: '二级2', checked: 'uncheck'},
                        {id: '121', name: '二级3', checked: 'uncheck'},
                        {id: '122', name: '二级4', checked: 'uncheck'},
                        {
                            id: '1321', name: '二级1', open: true, checked: 'uncheck',
                            children: [
                                {id: '1333', name: '三级2', checked: 'uncheck'},
                                {id: '1313', name: '三级3', checked: 'uncheck'},
                                {id: '1323', name: '三级4', checked: 'uncheck'},
                            ]
                        }
                    ]
                },
                {
                    id: '2', name: '一级2', open: false, checked: 'uncheck',
                    children: [
                        {id: '222', name: '二级20', checked: 'uncheck'},
                        {id: '2221', name: '二级21', checked: 'uncheck'},
                        {id: '2222', name: '二级22',checked: 'uncheck'}
                    ]
                },
                {
                    id: '3', name: '一级3', open: false, checked: 'uncheck',
                    children: [
                        {id: '322', name: '二级30', checked: 'uncheck'},
                        {id: '3220', name: '二级31', checked: 'uncheck'},
                        {id: '3221', name: '二级32', checked: 'uncheck'}
                    ]
                }
            ]
        }
    ];
    export default {
        name: "SelectSearchView",
        data() {
            return {
                selectId: '',
                selectData,
                // 多选选中的id
                selectedIds: [],
                dataTreeSingle,
                dataTreeMultiple,
                dataTreeMultiple2,
            }
        },
        watch: {
            selectId(n) {
                console.log('单选选中的项：', n);
            }
        },
        methods: {
            // 多选返回的id组
            selectChange(ids) {
                console.log('多选返回的id组:::', ids);
                this.selectedIds=ids;
            }
        }
    }
</script>

<style lang="stylus" scoped>
.selectSearchBox
    display flex
    justify-content space-around
    padding 16px

</style>

```
::: tip
文档待更新
:::

### Attributes

| 参数     | 说明  | 类型    | 默认值  | 必须    |
| ------- | ---- | ------ | ------- | ------ |
| disabled    | 是否禁用 | Boolean | false | no |
| width   | 宽度 | String | '88' | no |
| data    | 数据列表 | Array | [] | Yes |
| v-model    | 绑定的id | String | '' | Yes |


### 单选参数

| 参数     | 说明  | 类型    | 默认值  | 必须    |
| ------- | ---- | ------ | ------- | ------ |
| v-model    | 绑定的id | String | '' | Yes |

### 多选参数

| 参数     | 说明  | 类型    | 默认值  | 必须    |
| ------- | ---- | ------ | ------- | ------ |
| multiple    | 开启多选 | Boolean | false | no |
| linkage    | 是否联动（树形结构有效） | Boolean | true | no |
| accept    | 是否收纳 | Boolean | true | no |
| selectedIds    | 选中的id组 | Array | [] | Yes |
| @change    | 点击的回调 | Function | -- | Yes |