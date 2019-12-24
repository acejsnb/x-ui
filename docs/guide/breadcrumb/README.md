### Breadcrumb 面包屑

<template>
    <div class="toggleView">
            <Breadcrumb :data="breadData" v-model="breadId" />
            <Breadcrumb :data="breadData" />
    </div>
</template>

<script>
    const data=[
        { id: 'totalEnergy', name: '总量' },
        { id: 'singleParty', name: '单平米' },
        { id: 'lowerLevel', name: '下级分项' },
        { id: 'average', name: '滑动平均啊啊啊啊'}
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

```vue
<template>
    <div class="toggleView">
            <Breadcrumb :data="breadData" v-model="breadId" />
            <Breadcrumb :data="breadData" />
    </div>
</template>

<script>
    const data=[
        { id: 'totalEnergy', name: '总量' },
        { id: 'singleParty', name: '单平米' },
        { id: 'lowerLevel', name: '下级分项' },
        { id: 'average', name: '滑动平均啊啊啊啊'}
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
| ------- | ---- | ------ | ------- | ------ |
| data    | 数据列表 | Array | '' | Yes     |
| v-model    | 双向绑定的值 | String | '' | no     |