### Button 按钮
<template>
    <div class="Button">
        <div class="component component-padding">
            <h1>Button组件</h1>
            <div class="btn">
                <h2>size=large</h2>
                <section class="list">
                    <Button @click="tap" type="default" size="large">default</Button>
                    <Button @click="tap" type="primary" size="large" :text.sync="text2">primary</Button>
                    <Button @click="tap" type="error" size="large" :text.sync="text3">error</Button>
                    <Button @click="tap" type="disabled" size="large" :text.sync="text4">disabled</Button>
                    <Button @click="tap" type="primary" :loading="true" size="large" :text.sync="text5">primary-loading</Button>
                    <Button @click="tap" type="text" icon-type="edit" size="large">text</Button>
                    <Button @click="tap" type="text" icon-type="edit" :disabled="true" size="large">text</Button>
                    <Button @click="tap" type="icon-border" icon-type="edit" size="large" :text.sync="text4">text</Button>
                    <Button @click="tap" type="icon-border" icon-type="edit" :disabled="true" size="large" :text.sync="text4">text</Button>
                    <Button @click="tap" type="icon" icon-type="edit" size="large" :text.sync="text4">text</Button>
                    <Button @click="tap" type="icon" icon-type="edit" :disabled="true" size="large" :text.sync="text4">text</Button>
                    <Button @click="tap" type="icon-text" icon-type="plus" size="large">icon-text</Button>
                    <Button @click="tap" type="icon-text" icon-type="plus" :disabled="true" size="large">icon-text</Button>
                </section>
            </div>
            <div class="btn">
                <h2>size=medium（默认medium）</h2>
                <section class="list">
                    <Button @click="tap" type="default" >default</Button>
                    <Button @click="tap" type="primary" :text.sync="text2">primary</Button>
                    <Button @click="tap" type="error" :text.sync="text3">error</Button>
                    <Button @click="tap" type="disabled" :text.sync="text4">disabled</Button>
                    <Button @click="tap" type="primary" :loading="true" :text.sync="text5">primary-loading</Button>
                    <Button @click="tap" type="text" icon-type="edit">text</Button>
                    <Button @click="tap" type="text" icon-type="edit" :disabled="true">text</Button>
                    <Button @click="tap" type="icon-border" icon-type="edit" :text.sync="text4">text</Button>
                    <Button @click="tap" type="icon-border" icon-type="edit" :disabled="true" :text.sync="text4">text</Button>
                    <Button @click="tap" type="icon" icon-type="edit" :text.sync="text4">text</Button>
                    <Button @click="tap" type="icon" icon-type="edit" :disabled="true" :text.sync="text4">text</Button>
                    <Button @click="tap" type="icon-text" icon-type="plus">icon-text</Button>
                    <Button @click="tap" type="icon-text" icon-type="plus" :disabled="true">icon-text</Button>
                </section>
                <section class="list">
                    <Button @click="tap" type="text-blue">text</Button>
                    <Button @click="tap" type="text-red">text</Button>
                </section>
            </div>
            <div class="btn">
                <h2>size=small</h2>
                <section class="list">
                    <Button @click="tap" type="default" size="small">default</Button>
                    <Button @click="tap" type="primary" size="small" :text.sync="text2">primary</Button>
                    <Button @click="tap" type="error" size="small" :text.sync="text3">error</Button>
                    <Button @click="tap" type="disabled" size="small" :text.sync="text4">disabled</Button>
                    <Button @click="tap" type="primary" :loading="true" size="small" :text.sync="text5">primary-loading</Button>
                    <Button @click="tap" type="text" icon-type="edit" size="small">text</Button>
                    <Button @click="tap" type="text" icon-type="edit" size="small" :disabled="true">text</Button>
                    <Button @click="tap" type="icon-border" icon-type="edit" size="small" :text.sync="text4">text</Button>
                    <Button @click="tap" type="icon-border" icon-type="edit" :disabled="true" size="small" :text.sync="text4">text</Button>
                    <Button @click="tap" type="icon" icon-type="edit" size="small" :text.sync="text4">text</Button>
                    <Button @click="tap" type="icon" icon-type="edit" :disabled="true" size="small" :text.sync="text4">text</Button>
                    <Button @click="tap" type="icon-text" icon-type="plus" size="small">icon-text</Button>
                    <Button @click="tap" type="icon-text" icon-type="plus" :disabled="true" size="small">icon-text</Button>
                </section>
                <section class="list">
                </section>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "ButtonView",
        data () {
            return {
                text: 'default',
                text2: 'primary',
                text3: 'error',
                text4: 'disabled',
                text5: 'primary-loading'
            }
        },
        methods: {
            tap () {
                console.log('click')
            }
        }
    }
</script>

<style lang="stylus" scoped>
.btn
  margin-bottom 16px
  p
    font-size 16px
    margin-bottom 8px
  .list
    font-size 0

</style>

```vue
<template>
    <div class="Button">
        <div class="component component-padding">
            <h1>Button组件</h1>
            <div class="btn">
                <h2>size=large</h2>
                <section class="list">
                    <Button @click="tap" type="default" size="large">default</Button>
                    <Button @click="tap" type="primary" size="large" :text.sync="text2">primary</Button>
                    <Button @click="tap" type="error" size="large" :text.sync="text3">error</Button>
                    <Button @click="tap" type="disabled" size="large" :text.sync="text4">disabled</Button>
                    <Button @click="tap" type="primary" :loading="true" size="large" :text.sync="text5">primary-loading</Button>
                    <Button @click="tap" type="text" icon-type="edit" size="large">text</Button>
                    <Button @click="tap" type="text" icon-type="edit" :disabled="true" size="large">text</Button>
                    <Button @click="tap" type="icon-border" icon-type="edit" size="large" :text.sync="text4">text</Button>
                    <Button @click="tap" type="icon-border" icon-type="edit" :disabled="true" size="large" :text.sync="text4">text</Button>
                    <Button @click="tap" type="icon" icon-type="edit" size="large" :text.sync="text4">text</Button>
                    <Button @click="tap" type="icon" icon-type="edit" :disabled="true" size="large" :text.sync="text4">text</Button>
                    <Button @click="tap" type="icon-text" icon-type="plus" size="large">icon-text</Button>
                    <Button @click="tap" type="icon-text" icon-type="plus" :disabled="true" size="large">icon-text</Button>
                </section>
            </div>
            <div class="btn">
                <h2>size=medium（默认medium）</h2>
                <section class="list">
                    <Button @click="tap" type="default" >default</Button>
                    <Button @click="tap" type="primary" :text.sync="text2">primary</Button>
                    <Button @click="tap" type="error" :text.sync="text3">error</Button>
                    <Button @click="tap" type="disabled" :text.sync="text4">disabled</Button>
                    <Button @click="tap" type="primary" :loading="true" :text.sync="text5">primary-loading</Button>
                    <Button @click="tap" type="text" icon-type="edit">text</Button>
                    <Button @click="tap" type="text" icon-type="edit" :disabled="true">text</Button>
                    <Button @click="tap" type="icon-border" icon-type="edit" :text.sync="text4">text</Button>
                    <Button @click="tap" type="icon-border" icon-type="edit" :disabled="true" :text.sync="text4">text</Button>
                    <Button @click="tap" type="icon" icon-type="edit" :text.sync="text4">text</Button>
                    <Button @click="tap" type="icon" icon-type="edit" :disabled="true" :text.sync="text4">text</Button>
                    <Button @click="tap" type="icon-text" icon-type="plus">icon-text</Button>
                    <Button @click="tap" type="icon-text" icon-type="plus" :disabled="true">icon-text</Button>
                </section>
                <section class="list">
                    <Button @click="tap" type="text-blue">text</Button>
                    <Button @click="tap" type="text-red">text</Button>
                </section>
            </div>
            <div class="btn">
                <h2>size=small</h2>
                <section class="list">
                    <Button @click="tap" type="default" size="small">default</Button>
                    <Button @click="tap" type="primary" size="small" :text.sync="text2">primary</Button>
                    <Button @click="tap" type="error" size="small" :text.sync="text3">error</Button>
                    <Button @click="tap" type="disabled" size="small" :text.sync="text4">disabled</Button>
                    <Button @click="tap" type="primary" :loading="true" size="small" :text.sync="text5">primary-loading</Button>
                    <Button @click="tap" type="text" icon-type="edit" size="small">text</Button>
                    <Button @click="tap" type="text" icon-type="edit" size="small" :disabled="true">text</Button>
                    <Button @click="tap" type="icon-border" icon-type="edit" size="small" :text.sync="text4">text</Button>
                    <Button @click="tap" type="icon-border" icon-type="edit" :disabled="true" size="small" :text.sync="text4">text</Button>
                    <Button @click="tap" type="icon" icon-type="edit" size="small" :text.sync="text4">text</Button>
                    <Button @click="tap" type="icon" icon-type="edit" :disabled="true" size="small" :text.sync="text4">text</Button>
                    <Button @click="tap" type="icon-text" icon-type="plus" size="small">icon-text</Button>
                    <Button @click="tap" type="icon-text" icon-type="plus" :disabled="true" size="small">icon-text</Button>
                </section>
                <section class="list">
                </section>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "ButtonView",
        data () {
            return {
                text: 'default',
                text2: 'primary',
                text3: 'error',
                text4: 'disabled',
                text5: 'primary-loading'
            }
        },
        methods: {
            tap () {
                console.log('click')
            }
        }
    }
</script>

```

### Attributes

| 参数     | 说明  | 类型    | 默认值  | 必须    |
| ------- | ---- | ------ | ------- | ------ |
| type    | 类型（可选值：default/primary/error/disabled/text/text-blue/text-red/icon/icon-text/icon-border） | String | default | Yes     |
| size   | 大小（可选值：large/medium/small） | String | medium | no     |
| loading   | loading | Boolean | false | no     |
| :text.sync   | 按钮文本 | String | '' | no   |
| disabled   | 是否禁用 | Boolean | false | no   |
