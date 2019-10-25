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