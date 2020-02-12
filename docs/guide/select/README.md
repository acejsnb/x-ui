### Select 下拉选择器

<template>
    <div class="Button">
        <div class="component component-padding">
            <h1>Select组件</h1>
            <div>
                <Select v-model="selVal" :data="dataSelect" width="120" />
            </div>
            <div style="font-size: 16px;">
                <br><br>
            </div>
            <div>
                <Select v-model="selVal1" :radius="true" :data="dataSelect1" width="120" />
            </div>
            <div style="font-size: 16px;">
                <br><br>
            </div>
            <div>
                <Select v-model="selVal2" title="项目：" :data="dataSelect2" width="160" />
            </div>
            <div style="font-size: 16px;">
                <br><br>
            </div>
            size=small
            <div>
                <Select size="small" v-model="selVal" :data="dataSelect" width="120" />
            </div>
        </div>
    </div>
</template>

<script>
    const data=[
        { id: 'totalEnergy', name: '总量' },
        { id: 'singleParty', name: '单平米' },
        { id: 'lowerLevel', name: '下级分项' },
        { id: 'average', name: '滑动平均', disabled: true }
    ];
    const data2=[
        { id: 'totalEnergy', name: '总量' },
        { id: 'singleParty', name: '单平米' }
    ];
    export default {
        name: 'SelectView',
        data() {
            return {
                selVal: 'totalEnergy',
                selText: '总量',
                dataSelect: data,
                selVal2: 'totalEnergy',
                dataSelect2: data2
            }
        },
        watch: {
            selVal(n, o) {
                if (n === o) return;
                this.selText=this.dataSelect.find(d => d.id === n).name
            }
        },
        methods: {
        }
    }
</script>


```vue
<template>
    <div class="Button">
        <div class="component component-padding">
            <h1>Select组件</h1>
            <div>
                <Select v-model="selVal" :data="dataSelect" width="120" />
            </div>
            <div style="font-size: 16px;">
                <br><br>
            </div>
            <div>
                <Select v-model="selVal1" :radius="true" :data="dataSelect1" width="120" />
            </div>
            <div style="font-size: 16px;">
                <br><br>
            </div>
            <div>
                <Select v-model="selVal2" title="项目：" :data="dataSelect2" width="160" />
            </div>
            <div style="font-size: 16px;">
                <br><br>
            </div>
            size=small
            <div>
                <Select size="small" v-model="selVal" :data="dataSelect" width="120" />
            </div>
        </div>
    </div>
</template>

<script>
    const data=[
        { id: 'totalEnergy', name: '总量' },
        { id: 'singleParty', name: '单平米' },
        { id: 'lowerLevel', name: '下级分项' },
        { id: 'average', name: '滑动平均', disabled: true }
    ];
    const data2=[
        { id: 'totalEnergy', name: '总量' },
        { id: 'singleParty', name: '单平米' }
    ];
    export default {
        name: 'SelectView',
        data() {
            return {
                selVal: 'totalEnergy',
                selText: '总量',
                dataSelect: data,
                selVal2: 'totalEnergy',
                dataSelect2: data2
            }
        },
        watch: {
            selVal(n, o) {
                if (n === o) return;
                this.selText=this.dataSelect.find(d => d.id === n).name
            }
        },
        methods: {
        }
    }
</script>

```

### Attributes

| 参数     | 说明  | 类型    | 默认值  | 必须    |
| ------- | ---- | ------ | ------- | ------ |
| data    | 类型（可选值：v/h） | Array | [] | Yes     |
| size    | 类型（可选值：large/small） | String | large | No     |
| v-model    | 绑定的id | String | '' | Yes     |
| width   | 宽度 | String | '88' | no     |
| title   | 标题 | String | '' | no     |
| radius   | 圆角 | Boolean | false | no     |