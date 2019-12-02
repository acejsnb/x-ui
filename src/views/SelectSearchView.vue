<template>
    <div style="padding: 16px">
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
        <div style="margin: 16px"></div>
        <div style="margin-bottom: 200px"></div>
        <h3 style="font-size: 16px;margin-bottom: 8px">4.多选禁用</h3>
        <SelectSearch
                :disabled="true"
                :multiple="true"
                width="240"
                :selectedIds="selectedIds"
                :data="selectData"
                @change="selectChange"
        />
        <div style="margin: 16px"></div>
        <h3 style="font-size: 16px;margin-bottom: 8px">5.多选</h3>
        <SelectSearch
                :multiple="true"
                width="240"
                :selectedIds="selectedIds"
                :data="selectData"
                @change="selectChange"
        />
        <div style="margin-bottom: 200px"></div>
        <h3 style="font-size: 16px;margin-bottom: 8px">6.多选-tree</h3>
        <SelectSearch
                :multiple="true"
                width="240"
                :selectedIds="selectedIds"
                :data="dataTreeMultiple"
                @change="selectChange"
        />
        <div style="margin-bottom: 200px"></div>
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
                    id: '1',  name: '一级1', open: true, checked: 'uncheck',
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
        name: "SelectSearchView",
        data() {
            return {
                selectId: '',
                selectData,
                // 多选选中的id
                selectedIds: [],
                dataTreeSingle,
                dataTreeMultiple,
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

<style scoped>

</style>