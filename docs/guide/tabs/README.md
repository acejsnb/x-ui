### Tabs 标签页

<template>
    <div class="toggleView">
        <div class="component component-padding">
            <div class="display-panel">
                <h5>一级页签</h5>
                <Tabs type="first-nav" :data="tabData" :tab-id="tabId"/>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "TabsView",
        data() {
            return {
                tabId: 0,
                tabData:[
                    {name: '一' },
                    {name: '弟二' },
                    {name: '第三个' },
                    {name: '第四个字' },
                    {name: '五个字字字' },
                    {name: '六个字的情况' },
                ]
            }
        }
    }
</script>


```vue
<template>
    <div class="toggleView">
        <div class="component component-padding">
            <div class="display-panel">
                <h5>一级页签</h5>
                <Tabs type="first-nav" :data="tabData" :tab-id="tabId"/>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "TabsView",
        data() {
            return {
                tabId: 0,
                tabData:[
                    {name: '一' },
                    {name: '弟二' },
                    {name: '第三个' },
                    {name: '第四个字' },
                    {name: '五个字字字' },
                    {name: '六个字的情况' },
                ]
            }
        }
    }
</script>

```

### Attributes

| 参数     |    说明     | 类型    | 默认值  | 必须    |
| -------  |   ----     | ------  | -------| ------ |
| data     |  数据列表   | Array   | []     | Yes     |
| tabId    |  默认选中项 | String  |  0     | Yes     |




