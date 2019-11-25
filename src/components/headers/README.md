### 示例
```vue
<template>
    <div class="toggleView">
        <div class="component component-padding">
            <h1>Headers组件</h1>
            <div>
                <h2 style="font-size: 14px">·说明</h2>
                <pre style="font-size: 14px;color: red;line-height: 20px;">
                    Headers组件分为左中右三块内容，使用具名插槽;
                    插槽那么分别为left、middle、right
                </pre>
            </div>
            
            <h3 style="font-size: 14px">4.其他 + 标题</h3>
            <div style="margin: 20px"></div>
            <h3 style="font-size: 14px">5.标题</h3>
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
                    { id: '4', name: '第4模块' }
                ]
            }
        },
        methods: {
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