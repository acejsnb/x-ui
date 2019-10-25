
### 代码演示
```html
<template>
    <div>
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
        
        <Headers
            :tabId="tabId"
            :tabData="tabData"
            @selectChange="selectChange"
            :breadId="breadId"
            :breadData="breadData"
            @breadChange="breadChange"
        />
    </div>
</template>
<script>
    export default {
        name: "HeadersView"
    }
</script>

```

### Attributes

| 参数 | 说明 | 类型 | 默认值 | 必须 |
| --- | ---- | --- | ------ | ----|
| tabId | Tabs标签页绑定的id | String | '' | yes |
| tabData | Tabs数据 | Array | [] | yes |
| tabChange | Tabs点击改变id | Function | -- | no |
| selectId | Select绑定的id | String | '' | no |
| selectData | Select数据 | Array | [] | no |
| selectChange | Select点击改变id | Function | -- | no |
| btnType | 右侧按钮的类型(参考Button组件) | String | '' | no |
| btnClick | 点击右侧按钮的函数 | Function | -- | no |

