<template>
    <div class="ComponentLists">
        <List :data="listData" />
    </div>
</template>

<script>
    export default {
        name: 'ComponentLists',
        data() {
            return {
                listData: [
                    {title: 'Button', more: '按钮', url: 'buttonView'},
                    {title: 'Modal', more: '弹窗', url: 'ModalView'},
                    {title: 'Drawer', more: '抽屉', url: 'drawerView'},
                    {title: 'Toggle', more: '开关', url: 'toggleView'},

                    {title: 'Message', more: '信息提示', url: 'messageView'},
                    {title: 'List', more: '列表', url: 'listView'},
                ],
            }
        }
    }
</script>

<style lang="stylus" scoped>
</style>
