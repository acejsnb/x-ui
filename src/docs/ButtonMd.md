
### 代码演示
```html
<template>
    <div>
        <h1>Button组件</h1>
        <div class="btn">
            <p>size=large</p>
            <section class="list">
                <Button type="default" size="large">default</Button>
                <Button type="primary" size="large">primary</Button>
                <Button type="success" size="large">success</Button>
                <Button type="warning" size="large">warning</Button>
                <Button type="error" size="large">error</Button>
                <Button type="disabled" size="large">disabled</Button>
                <Button type="primary" :loading="true" size="large">primary-loading</Button>
            </section>
        </div>
        <div class="btn">
            <p>size=medium（默认medium）</p>
            <section class="list">
                <Button type="default">default</Button>
                <Button type="primary">primary</Button>
                <Button type="success">success</Button>
                <Button type="warning">warning</Button>
                <Button type="error">error</Button>
                <Button type="disabled">disabled</Button>
                <Button type="primary" :loading="true">primary-loading</Button>
            </section>
            <section class="list">
                <Button type="link">default</Button>
            </section>
        </div>
        <div class="btn">
            <p>size=small</p>
            <section class="list">
                <Button type="default" size="small">default</Button>
                <Button type="primary" size="small">primary</Button>
                <Button type="success" size="small">success</Button>
                <Button type="warning" size="small">warning</Button>
                <Button type="error" size="small">error</Button>
                <Button type="disabled" size="small">disabled</Button>
                <Button type="primary" :loading="true" size="small">primary-loading</Button>
            </section>
        </div>
    </div>
</template>
<script>
    export default {
        name: "ButtonView"
    }
</script>

```

### Attributes

| 参数     | 说明                                                         | 类型    | 默认值  | 必须    |
| ------- | ------------------------------------------------------------ | ------ | ------- | ------ |
| type    | 按钮类型(可选 default/primary/success/warning/error/disabled) | String | default | no     |
| size    | 按钮尺寸(可选 medium/large/small)                             | String | medium  | no     |
| loading | 是否显示loading                                              | Boolean | false  | no     |

### Methods

| 方法名 | 说明 | 参数 | 
| ---- | ---- | ---- | 
| click | 点击事件 | event对象 |
