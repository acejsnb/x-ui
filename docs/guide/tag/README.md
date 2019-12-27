### Tag-标签

<template>
    <div class="toggleView">
        <div class="component component-padding">
            <h1>Tag组件</h1>
            <div>
                <h3>1.big</h3>
                <Tag size="big" type="blue">属性标签-大标签</Tag>
                <Tag size="big" type="cyan">大标签</Tag>
                <Tag size="big" type="turquoise">大标签</Tag>
                <Tag size="big" type="green">大标签</Tag>
                <Tag size="big" type="lime">大标签</Tag>
                <Tag size="big" type="yellow">大标签</Tag>
                <Tag size="big" type="orange">大标签</Tag>
                <Tag size="big" type="red">大标签</Tag>
                <Tag size="big" type="carmine">大标签</Tag>
                <Tag size="big" type="purple">大标签</Tag>
                <Tag size="big" type="grey">大标签</Tag>
            </div>
            <div>
                <h3>2.small</h3>
                <Tag size="small" type="blue">属性标签-小标签</Tag>
                <Tag size="small" type="cyan">小标签</Tag>
                <Tag size="small" type="turquoise">小标签</Tag>
                <Tag size="small" type="green">小标签</Tag>
                <Tag size="small" type="lime">小标签</Tag>
                <Tag size="small" type="yellow">小标签</Tag>
                <Tag size="small" type="orange">小标签</Tag>
                <Tag size="small" type="red">小标签</Tag>
                <Tag size="small" type="carmine">小标签</Tag>
                <Tag size="small" type="purple">小标签</Tag>
                <Tag size="small" type="grey">小标签</Tag>
            </div>
            <div>
                <h3>3.better</h3>
                <Tag size="big" type="blue-better">属性标签-小标签</Tag>
                <Tag size="big" type="cyan-better">小标签</Tag>
                <Tag size="big" type="turquoise-better">小标签</Tag>
                <Tag size="big" type="green-better">小标签</Tag>
                <Tag size="big" type="lime-better">小标签</Tag>
                <Tag size="big" type="yellow-better">小标签</Tag>
                <Tag size="big" type="orange-better">小标签</Tag>
                <Tag size="big" type="red-better">小标签</Tag>
                <Tag size="big" type="carmine-better">小标签</Tag>
                <Tag size="big" type="purple-better">小标签</Tag>
                <Tag size="big" type="grey-better">小标签</Tag>
            </div>
            <div>
                <h3>4.weak</h3>
                <Tag size="small" type="blue-weak">属性标签-小标签</Tag>
                <Tag size="small" type="cyan-weak">小标签</Tag>
                <Tag size="small" type="turquoise-weak">小标签</Tag>
                <Tag size="small" type="green-weak">小标签</Tag>
                <Tag size="small" type="lime-weak">小标签</Tag>
                <Tag size="small" type="yellow-weak">小标签</Tag>
                <Tag size="small" type="orange-weak">小标签</Tag>
                <Tag size="small" type="red-weak">小标签</Tag>
                <Tag size="small" type="carmine-weak">小标签</Tag>
                <Tag size="small" type="purple-weak">小标签</Tag>
                <Tag size="small" type="grey-weak">小标签</Tag>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "TagView"
    }
</script>

<style lang="stylus" scoped>

    .component
        h3
            padding 8px
            font-size 16px

</style>

```vue
<template>
    <div class="toggleView">
        <div class="component component-padding">
            <h1>Tag组件</h1>
            <div>
                <h3>1.big</h3>
                <Tag size="big" type="blue">属性标签-大标签</Tag>
                <Tag size="big" type="cyan">大标签</Tag>
                <Tag size="big" type="turquoise">大标签</Tag>
                <Tag size="big" type="green">大标签</Tag>
                <Tag size="big" type="lime">大标签</Tag>
                <Tag size="big" type="yellow">大标签</Tag>
                <Tag size="big" type="orange">大标签</Tag>
                <Tag size="big" type="red">大标签</Tag>
                <Tag size="big" type="carmine">大标签</Tag>
                <Tag size="big" type="purple">大标签</Tag>
                <Tag size="big" type="grey">大标签</Tag>
            </div>
            <div>
                <h3>2.small</h3>
                <Tag size="small" type="blue">属性标签-小标签</Tag>
                <Tag size="small" type="cyan">小标签</Tag>
                <Tag size="small" type="turquoise">小标签</Tag>
                <Tag size="small" type="green">小标签</Tag>
                <Tag size="small" type="lime">小标签</Tag>
                <Tag size="small" type="yellow">小标签</Tag>
                <Tag size="small" type="orange">小标签</Tag>
                <Tag size="small" type="red">小标签</Tag>
                <Tag size="small" type="carmine">小标签</Tag>
                <Tag size="small" type="purple">小标签</Tag>
                <Tag size="small" type="grey">小标签</Tag>
            </div>
            <div>
                <h3>3.better</h3>
                <Tag size="big" type="blue-better">属性标签-大标签</Tag>
                <Tag size="big" type="cyan-better">大标签</Tag>
                <Tag size="big" type="turquoise-better">大标签</Tag>
                <Tag size="big" type="green-better">大标签</Tag>
                <Tag size="big" type="lime-better">大标签</Tag>
                <Tag size="big" type="yellow-better">大标签</Tag>
                <Tag size="big" type="orange-better">大标签</Tag>
                <Tag size="big" type="red-better">大标签</Tag>
                <Tag size="big" type="carmine-better">大标签</Tag>
                <Tag size="big" type="purple-better">大标签</Tag>
                <Tag size="big" type="grey-better">大标签</Tag>
            </div>
            <div>
                <h3>4.weak</h3>
                <Tag size="small" type="blue-weak">属性标签-小标签</Tag>
                <Tag size="small" type="cyan-weak">小标签</Tag>
                <Tag size="small" type="turquoise-weak">小标签</Tag>
                <Tag size="small" type="green-weak">小标签</Tag>
                <Tag size="small" type="lime-weak">小标签</Tag>
                <Tag size="small" type="yellow-weak">小标签</Tag>
                <Tag size="small" type="orange-weak">小标签</Tag>
                <Tag size="small" type="red-weak">小标签</Tag>
                <Tag size="small" type="carmine-weak">小标签</Tag>
                <Tag size="small" type="purple-weak">小标签</Tag>
                <Tag size="small" type="grey-weak">小标签</Tag>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "TagView"
    }
</script>

```


### Attributes

| 参数     | 说明  | 类型    | 默认值  | 必须    |
| ------- | ---- | ------ | ------- | ------ |
| size    | 标签大小 | String | big | no     |
| type    | 标签类型 | String | grey | no     |


### size

| 可选值  | 类型    | 默认值  | 必须    |
| ---- | ------ | ------- | ------ |
| big/small | String | big | no     |

### type

| 可选值  | 类型    | 默认值  | 必须    |
| ---- | ------ | ------- | ------ |
| blue cyan turquoise green lime yellow orange red carmine purple grey | String | grey | no     |

### type-better

| 可选值  | 类型    | 默认值  | 必须    |
| ---- | ------ | ------- | ------ |
| blue-better cyan-better turquoise-better green-better lime-better yellow-better orange-better red-better carmine-better purple-better grey-better | String | grey-better | no     |

### type-weak

| 可选值  | 类型    | 默认值  | 必须    |
| ---- | ------ | ------- | ------ |
| blue-weak cyan-weak turquoise-weak green-weak lime-weak yellow-weak orange-weak red-weak carmine-weak purple-weak grey-weak | String | grey-weak | no     |