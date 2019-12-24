### TransferSelectModal 弹窗穿梭框选择器

<template>
    <div class="transferSelect">
        <div class="transferSelectList">
            <Button type="primary" @click="handleModalShow">1.一维结构</Button>
            <TransferSelectModal
                    :modalShow="modalShow"
                    title="已选设备"
                    unit="个"
                    placeholder="添加设备"
                    :linkage="false"
                    :lastStage="true"
                    height="300"
                    :data="selectData"
                    @cancel="treeCancel"
                    @confirm="treeConfirm"
            />
        </div>
        <div class="transferSelectList">
            <Button type="primary" @click="handleModalShow2">2.树形结构</Button>
            <TransferSelectModal
                    :modalShow="modalShow2"
                    title="已选设备"
                    unit="个"
                    placeholder="添加设备"
                    :data="treeData"
                    @cancel="treeCancel"
                    @confirm="treeConfirm"
            />
        </div>
        <div class="transferSelectList">
            <Button type="primary" @click="handleModalShow3">3.树形结构-上下级不联动</Button>
            <TransferSelectModal
                    :modalShow="modalShow3"
                    title="已选设备"
                    unit="个"
                    placeholder="添加设备"
                    :linkage="false"
                    :data="treeData2"
                    @cancel="treeCancel"
                    @confirm="treeConfirm"
            />
        </div>
        <div class="transferSelectList">
            <Button type="primary" @click="handleModalShow4">4.树形结构-只能选择末级</Button>
            <TransferSelectModal
                    :modalShow="modalShow4"
                    title="已选设备"
                    unit="个"
                    placeholder="添加设备"
                    :linkage="false"
                    :lastStage="true"
                    :data="treeData3"
                    @cancel="treeCancel"
                    @confirm="treeConfirm"
            />
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
        {id: '600', name: '慕容复6', selected: false},
        {id: '700', name: '慕容复7', selected: false},
        {id: '800', name: '慕容复8', selected: false},
        {id: '900', name: '慕容复9', selected: false},
        {id: '1000', name: '慕容复10', selected: false},
        {id: '1100', name: '慕容复11', selected: false},
        {id: '1200', name: '慕容复12', selected: false},
        {id: '1300', name: '慕容复13', selected: false},
    ];
    const dataArr=[
        {
            id: '0', name: '顶级', open: true, checked: 'uncheck',
            children: [
                {
                    id: '1',  name: '一级1', open: true, checked: 'uncheck',
                    children: [
                        {id: '12', name: '一二级2', checked: 'uncheck'},
                        {id: '121', name: '一二级3', checked: 'uncheck'},
                        {id: '122', name: '一二级4', checked: 'uncheck'},
                        {
                            id: '1321', name: '二级1', open: true, checked: 'uncheck',
                            children: [
                                {id: '13', name: '二三级2', checked: 'uncheck'},
                                {id: '131', name: '二三级3', checked: 'uncheck'},
                                {id: '132', name: '二三级4', checked: 'uncheck'},
                            ]
                        }
                    ]
                },
                {
                    id: '2', name: '一级2', open: true, checked: 'uncheck',
                    children: [
                        {id: '222', name: '二二级2', checked: 'uncheck'},
                        {id: '2221', name: '二二级1', checked: 'uncheck'},
                        {id: '2222', name: '二二级3',checked: 'uncheck'}
                    ]
                },
                {
                    id: '3', name: '一级3', open: true, checked: 'uncheck',
                    children: [
                        {id: '3220', name: '三二级0', checked: 'uncheck'},
                        {id: '3221', name: '三二级1', checked: 'uncheck'},
                        {id: '322', name: '三二级2', checked: 'uncheck'}
                    ]
                }
            ]
        }
    ];
    export default {
        name: "TransferSelectModalView",
        data() {
            return {
                modalShow: false,
                modalShow2: false,
                modalShow3: false,
                modalShow4: false,
                selectData, // type: Array
                treeData: dataArr, // type: Array
                treeData2: JSON.parse(JSON.stringify(dataArr)), // type: Array
                treeData3: JSON.parse(JSON.stringify(dataArr)), // type: Array
            }
        },
        methods: {
            treeConfirm(ids) {
                console.log('确定：：：', ids);
            },
            treeCancel() {
                this.modalShow=false;
                this.modalShow2=false;
                this.modalShow3=false;
                this.modalShow4=false;
            },
            handleModalShow() {
                this.modalShow=true;
            },
            handleModalShow2() {
                this.modalShow2=true;
            },
            handleModalShow3() {
                this.modalShow3=true;
            },
            handleModalShow4() {
                this.modalShow4=true;
            }
        }
    }
</script>

<style lang="stylus" scoped>
.transferSelect
    padding 16px
    .transferSelectList
        margin-bottom 16px
        width 300px
    h3
        font-size 16px
        margin 12px

</style>

```vue
<template>
    <div class="transferSelect">
        <div class="transferSelectList">
            <Button type="primary" @click="handleModalShow">1.一维结构</Button>
            <TransferSelectModal
                    :modalShow="modalShow"
                    title="已选设备"
                    unit="个"
                    placeholder="添加设备"
                    :linkage="false"
                    :lastStage="true"
                    height="300"
                    :data="selectData"
                    @cancel="treeCancel"
                    @confirm="treeConfirm"
            />
        </div>
        <div class="transferSelectList">
            <Button type="primary" @click="handleModalShow2">2.树形结构</Button>
            <TransferSelectModal
                    :modalShow="modalShow2"
                    title="已选设备"
                    unit="个"
                    placeholder="添加设备"
                    :data="treeData"
                    @cancel="treeCancel"
                    @confirm="treeConfirm"
            />
        </div>
        <div class="transferSelectList">
            <Button type="primary" @click="handleModalShow3">3.树形结构-上下级不联动</Button>
            <TransferSelectModal
                    :modalShow="modalShow3"
                    title="已选设备"
                    unit="个"
                    placeholder="添加设备"
                    :linkage="false"
                    :data="treeData2"
                    @cancel="treeCancel"
                    @confirm="treeConfirm"
            />
        </div>
        <div class="transferSelectList">
            <Button type="primary" @click="handleModalShow4">4.树形结构-只能选择末级</Button>
            <TransferSelectModal
                    :modalShow="modalShow4"
                    title="已选设备"
                    unit="个"
                    placeholder="添加设备"
                    :linkage="false"
                    :lastStage="true"
                    :data="treeData3"
                    @cancel="treeCancel"
                    @confirm="treeConfirm"
            />
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
        {id: '600', name: '慕容复6', selected: false},
        {id: '700', name: '慕容复7', selected: false},
        {id: '800', name: '慕容复8', selected: false},
        {id: '900', name: '慕容复9', selected: false},
        {id: '1000', name: '慕容复10', selected: false},
        {id: '1100', name: '慕容复11', selected: false},
        {id: '1200', name: '慕容复12', selected: false},
        {id: '1300', name: '慕容复13', selected: false},
    ];
    const dataArr=[
        {
            id: '0', name: '顶级', open: true, checked: 'uncheck',
            children: [
                {
                    id: '1',  name: '一级1', open: true, checked: 'uncheck',
                    children: [
                        {id: '12', name: '一二级2', checked: 'uncheck'},
                        {id: '121', name: '一二级3', checked: 'uncheck'},
                        {id: '122', name: '一二级4', checked: 'uncheck'},
                        {
                            id: '1321', name: '二级1', open: true, checked: 'uncheck',
                            children: [
                                {id: '13', name: '二三级2', checked: 'uncheck'},
                                {id: '131', name: '二三级3', checked: 'uncheck'},
                                {id: '132', name: '二三级4', checked: 'uncheck'},
                            ]
                        }
                    ]
                },
                {
                    id: '2', name: '一级2', open: true, checked: 'uncheck',
                    children: [
                        {id: '222', name: '二二级2', checked: 'uncheck'},
                        {id: '2221', name: '二二级1', checked: 'uncheck'},
                        {id: '2222', name: '二二级3',checked: 'uncheck'}
                    ]
                },
                {
                    id: '3', name: '一级3', open: true, checked: 'uncheck',
                    children: [
                        {id: '3220', name: '三二级0', checked: 'uncheck'},
                        {id: '3221', name: '三二级1', checked: 'uncheck'},
                        {id: '322', name: '三二级2', checked: 'uncheck'}
                    ]
                }
            ]
        }
    ];
    export default {
        name: "TransferSelectModalView",
        data() {
            return {
                modalShow: false,
                modalShow2: false,
                modalShow3: false,
                modalShow4: false,
                selectData, // type: Array
                treeData: dataArr, // type: Array
                treeData2: JSON.parse(JSON.stringify(dataArr)), // type: Array
                treeData3: JSON.parse(JSON.stringify(dataArr)), // type: Array
            }
        },
        methods: {
            treeConfirm(ids) {
                console.log('确定：：：', ids);
            },
            treeCancel() {
                this.modalShow=false;
                this.modalShow2=false;
                this.modalShow3=false;
                this.modalShow4=false;
            },
            handleModalShow() {
                this.modalShow=true;
            },
            handleModalShow2() {
                this.modalShow2=true;
            },
            handleModalShow3() {
                this.modalShow3=true;
            },
            handleModalShow4() {
                this.modalShow4=true;
            }
        }
    }
</script>

```

### Attributes

| 参数     | 说明  | 类型    | 默认值  | 必须    |
| ------- | ---- | ------ | ------- | ------ |
| modalShow    | 控制模态框显示 | Boolean | false | No     |
| placeholder    | 占位符 | String | 请选择 | Yes     |
| tipPlace    | 当鼠标hover时，显示tip的位置 | String | bottom | Yes     |
| data    | 数据列表 | Array | [] | Yes     |
| linkage    | 树形结构上下级是否联动 | Boolean | true | No     |
| lastStage    | 树形结构是否只能选择最后一级 | Boolean | false | No     |
| @confirm    | 确定回调，返回选中的id组 | Function | -- | Yes     |

### tipPlace - 参数说明

| 参数     | 说明  | 类型    | 必须    |
| ------- | ---- | ------ | ------ |
| top    | 显示在顶部 | String | Yes     |
| bottom    | 显示在底部 | String | Yes     |
| left    | 显示在左边 | String | Yes     |
| right    | 显示在右边 | String | Yes     |