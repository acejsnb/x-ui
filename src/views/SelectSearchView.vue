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
        {id: '100', name: '乔峰', selected: false},
        {id: '200', name: '阿三2', selected: false},
        {id: '300', name: '段誉3', selected: false},
        {id: '400', name: '阿紫4', selected: false},
        {id: '500', name: '洪七公5', selected: false},
        {id: '600', name: '慕容复6', selected: false}
    ];

    const dataTree=[
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
                dataTreeSingle: dataTree,
                dataTreeMultiple: JSON.parse(JSON.stringify(dataTree)),
                dataTreeMultiple2: JSON.parse(JSON.stringify(dataTree)),
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