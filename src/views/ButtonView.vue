<template>
    <div class="Button">
        <div class="component component-padding">
            <h1>Button组件</h1>
            <div class="btn">
                <h2>size=large</h2>
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
                <h2>size=medium（默认medium）</h2>
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
                <h2>size=small</h2>
                <section class="list">
                    <Button type="default" size="small">default</Button>
                    <Button type="primary" size="small">primary</Button>
                    <Button type="success" size="small">success</Button>
                    <Button type="warning" size="small">warning</Button>
                    <Button type="error" size="small">error</Button>
                    <Button type="disabled" size="small">disabled</Button>
                    <Button type="primary" :loading="true" size="small">primary-loading</Button>
                </section>
                <section class="list">
                </section>
            </div>

            <VueMarkdown v-highlight>{{html}}</VueMarkdown>
        </div>
    </div>
</template>

<script>
    import VueMarkdown from 'vue-markdown';
    import ButtonMd from 'ButtonMd';

    export default {
        name: "ButtonView",
        components: { VueMarkdown },
        data() {
            return {
                html: ButtonMd
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
    margin-bottom 8px

</style>
