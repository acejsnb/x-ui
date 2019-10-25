```vue
<template>
    <div class="toggleView">
        <div class="component component-padding">
            <h1>Headers组件</h1>
            <Headers
                    :tabId="tabId"
                    :tabData="tabData"
                    @tabChange="tabChange"
                    :selectId="selectId"
                    :selectData="selectData"
                    @selectChange="selectChange"
                    :breadId="breadId"
                    :breadData="breadData"
                    @breadChange="breadChange"
                    btnType="default"
                    @btnClick="btnClick"
            />
            <div style="margin: 20px"></div>
            <Headers
                    :tabId="tabId"
                    :tabData="tabData"
                    @selectChange="selectChange"
                    :breadId="breadId"
                    :breadData="breadData"
                    @breadChange="breadChange"
            />
        </div>
    </div>
</template>

<script>
    const data=[
        { id: 'totalEnergy', name: '总量' },
        { id: 'singleParty', name: '单平米' },
        { id: 'lowerLevel', name: '下级分项' },
        { id: 'average', name: '滑动平均啊啊啊啊', disabled: true }
    ];

    export default {
        name: "HeadersView",
        data() {
            return {
                tabId: '1', // 下拉列表绑定的值
                selectId: 'totalEnergy', // 下拉列表绑定的值
                selectData: data, // 下拉列表数据
                breadId: 'average', // 面包屑id
                breadData: data, // 面包屑数据
            }
        },
        computed: {
            tabData() {
                return [
                    { id: '1', name: '第1模块' },
                    { id: '2', name: '第2模块' },
                    { id: '3', name: '第3模块' },
                    { id: '4', name: '第4模块' },
                    { id: '5', name: '第5模块' },
                ]
            }
        },
        methods: {
            // tab改变
            tabChange(id) {
                console.log('********tabChange:::', id);
                this.tabId=id;
            },
            // 下拉列表改变
            selectChange(id) {
                console.log('********selectChange:::', id);
                this.selectId=id;
            },
            // 面包屑改变
            breadChange(id) {
                console.log('********breadChange:::', id);
                this.breadId=id;
            },
            // 面包屑改变
            btnClick() {
                console.log('********btnClick:::');
            }
        }
    }
</script>

```