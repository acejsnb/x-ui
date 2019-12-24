### Dropdown 下拉菜单

<template>
    <div class="Button">
        <div class="component component-padding">
            <h1>Dropdown组件</h1>
            <div>
                <Dropdown v-model="selVal" :data="dataSelect">
                    <span class="text">{{selText}}</span>
                </Dropdown>
            </div>
            <div style="font-size: 16px;">
                <br>
            </div>
            <div style="margin-left: 200px">
                <Dropdown v-model="selVal2" :data="dataSelect2" position="right">
                    <span class="avatar">
                        <img src="http://upload.jianshu.io/users/upload_avatars/11576163/f8c67791-cf2f-42ef-86dc-68a974830f8f.png?imageMogr2/auto-orient/strip|imageView2/1/w/120/h/120" alt="">
                    </span>
                </Dropdown>
            </div>
            <div style="font-size: 16px;">
                <br><br>
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
        name: 'DropdownView',
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
        }
    }
</script>

```vue
<template>
    <div class="Button">
        <div class="component component-padding">
            <h1>Dropdown组件</h1>
            <div>
                <Dropdown v-model="selVal" :data="dataSelect">
                    <span class="text">{{selText}}</span>
                </Dropdown>
            </div>

            <div style="font-size: 16px;">
                <br>
            </div>
            <div>
                <Dropdown v-model="selVal2" :data="dataSelect2" position="right">
                    <span class="avatar">
                        <img src="http://upload.jianshu.io/users/upload_avatars/11576163/f8c67791-cf2f-42ef-86dc-68a974830f8f.png?imageMogr2/auto-orient/strip|imageView2/1/w/120/h/120" alt="">
                    </span>
                </Dropdown>
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
        name: 'DropdownView',
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
        }
    }
</script>


```

### Attributes

| 参数     | 说明  | 类型    | 默认值  | 必须    |
| ------- | ---- | ------ | ------- | ------ |
| data    | 数据列表 | Array | [] | no     |
| v-model    | 绑定的id值 | String | ‘’ | no     |