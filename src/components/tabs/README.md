### 示例
```vue
<template>
    <div class="toggleView">
        <div class="component component-padding">
            <h1>Tabs组件</h1>
            <Tabs :data="tabData" v-model="tabId" />
        </div>
    </div>
</template>

<script>
    export default {
        name: "TabsView",
        data() {
            return {
                tabId: '1'
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
        }
    }
</script>

```