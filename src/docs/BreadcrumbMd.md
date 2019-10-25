
### 代码演示
```html
<template>
    <div>    
        <Breadcrumb :data="breadData" v-model="breadId" />
        <Breadcrumb :data="breadData" />
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
        name: "BreadcrumbView",
        data() {
            return {
                breadData: data,
                breadId: 'average'
            }
        }
    }
</script>

```

### Attributes

| 参数     | 说明  | 类型    | 默认值  | 必须    |
| ------- | ----- | ------ | ------- | ------ |
| data    | Breadcrumb数据 | Array | [] | yes  |
| v-model    | 绑定的面包屑的值，若有绑定了该值，表示可点击 | String | ''  | no     |

