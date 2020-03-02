### Tag-标签

<template>
    <div class="toggleView">
        <div class="component component-padding">
            <h1>Tag组件</h1>
            <div class="display-panel">
                <h3>1.big</h3>
                <Tag v-for="(color, i1) in tagBgColors" :key="'big'+color+i1" size='big' :color="color">大标签</Tag>
            </div>
            <div class="display-panel">
                <h3>2.small</h3>
                <Tag v-for="(color, i2) in tagBgColors" :key="'small'+color+i2" size='small' :color="color">小标签</Tag>
            </div>
            <div class="display-panel">
                <h3>3.status</h3>
                <Tag v-for="(status, i3) in statusList" :key="'status'+status+i3"  :status="status" type="circular">状态标签</Tag>
            </div>
            <div class="display-panel">
                <h3>4.dot</h3>
                <Tag v-for="(dot, i4) in statusList" :key="'status'+dot+i4"   :status="dot" type="dot">状态标签</Tag>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "TagView",
        data () {
            return {
                tagBgColors: ['#E1F2FF' , '#D5F6F2', '#D9F5D6', '#FAF1D1', '#FEEAD2', '#FDE3E2', '#FDDDEF', '#ECE2FE' ,'#B2E6F2', '#EFF0F1'],
                statusList : ['processing', 'error', 'completed', 'rejected','remove']
            }
        }
    }
</script>

```vue

<template>
    <div class="toggleView">
        <div class="component component-padding">
            <h1>Tag组件</h1>
            <div class="display-panel">
                <h3>1.big</h3>
                <Tag v-for="(color, i1) in tagBgColors" :key="'big'+color+i1" size='big' :color="color">大标签</Tag>
            </div>

            <div class="display-panel">
                <h3>2.small</h3>
                <Tag v-for="(color, i2) in tagBgColors" :key="'small'+color+i2" size='small' :color="color">小标签</Tag>
            </div>

            <div class="display-panel">
                <h3>3.status</h3>
                <Tag v-for="(status, i3) in statusList" :key="'status'+status+i3"  :status="status" type="circular">状态标签</Tag>
            </div>

            <div class="display-panel">
                <h3>4.dot</h3>
                <Tag v-for="(dot, i4) in statusList" :key="'status'+dot+i4"   :status="dot" type="dot">状态标签</Tag>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "TagView",
        data () {
            return {
                tagBgColors: ['#E1F2FF' , '#D5F6F2', '#D9F5D6', '#FAF1D1', '#FEEAD2', '#FDE3E2', '#FDDDEF', '#ECE2FE' ,'#B2E6F2', '#EFF0F1'],
                statusList : ['processing', 'error', 'completed', 'rejected','remove']
            }
        }
    }
</script>

```


### Attributes

| 参数     | 说明    | 类型    | 默认值   | 必须  |
| ------- | ----    | ------  | ------- | ------|
| size    | 标签大小 | String | big     | no     |
| type    | 标签类型 | String | null    | no     |
| color   | 标签颜色 | String | #E1F2FF | no     |
| status  | 标签状态 | String | processing | no     |


### size

| 可选值  | 类型    | 默认值  | 必须    |
| ---- | ------ | ------- | ------ |
| big/small | String | big | no     |

### type   

| 可选值  | 类型    | 默认值  | 必须    |
| ---- | ------ | ------- | ------ |
| circular | dot | no     |

### color

| 可选值  | 类型    | 默认值  | 必须    |
| ---- | ------ | ------- | ------ |
| #E1F2FF #D5F6F2 #D9F5D6 #FAF1D1 #FEEAD2 #FDE3E2 #FDDDEF #ECE2FE #B2E6F2 #EFF0F1 | String | #E1F2FF | no |

### status    

| 可选值  | 类型    | 默认值  | 必须    |
| ---- | ------ | ------- | ------ |
|processing error completed rejected remove | String | processing | no |