<template>
    <div class="ComponentLists">
        <List :data="listData" />
    </div>
</template>

<script>
    import List from './List'
    export default {
        name: 'ComponentLists',
        components: { List },
        data() {
            return {
                listData: [
                    {title: 'Button', more: '按钮', url: 'buttonView'},
                    {title: 'Modal', more: '弹窗', url: 'ModalView'},
                    {title: 'Drawer', more: '抽屉', url: 'drawerView'},
                    {title: 'Toggle', more: '开关', url: 'toggleView'},
                    {title: 'Dropdown', more: '下拉菜单', url: 'dropdownView'},
                    {title: 'DropGroup', more: '下拉菜单组', url: 'dropGroupView'},
                    {title: 'Select', more: '下拉列表', url: 'selectView'},
                    {title: 'Badge', more: '徽标', url: 'badgeView'},
                    {title: 'Divider', more: '分割线', url: 'dividerView'},
                    {title: 'Carouseltext', more: '文字轮播', url: 'carouseltextView'},
                    {title: 'TabsView', more: '标签页', url: 'tabsView'},
                    {title: 'BreadcrumbView', more: '面包屑', url: 'breadcrumbView'},
                    {title: 'Pickertime', more: '时分秒选择', url: 'pickertimeView'},
                    {title: 'Pickerday', more: '日选择', url: 'pickerdayView'},

                    {title: 'HeadersView', more: '头部title', url: 'headersView'},

                    {title: 'Message', more: '信息提示', url: 'messageView'}
                ],
            }
        }
    }
</script>

<style lang="stylus" scoped>
</style>
